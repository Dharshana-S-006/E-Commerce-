import { toolDeclarations, toolExecutors } from './tools.js';
import { memoryManager } from './memoryManager.js';
import { SYSTEM_PROMPT } from './promptTemplates.js';

export class AgentEngine {
  constructor() {
    this.isProcessing = false;
    this.onThoughtStep = null;
    this.onToolCallExecuted = null;
  }

  setThoughtCallback(cb) {
    this.onThoughtStep = cb;
  }

  setToolCallCallback(cb) {
    this.onToolCallExecuted = cb;
  }

  async processUserMessage(userMessage) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const memory = memoryManager.longTermMemory;
    const history = memoryManager.shortTermMemory;

    // Log user message into memory
    memoryManager.addMessage("user", userMessage);

    // Step 1: Initial Agent Thinking
    this.emitThought("Analyzing user intent...", "INTENT_PARSING");
    await this.delay(400);

    const msgLower = userMessage.toLowerCase();
    let toolToCall = null;
    let toolArgs = {};
    let reasoningText = "";

    // Regex & Intent Router Rules
    const orderMatch = msgLower.match(/ord-\d+/i) || msgLower.match(/order\s*(?:#|number)?\s*([a-z0-9-]+)/i);
    
    if (msgLower.includes("return") || msgLower.includes("refund") || msgLower.includes("exchange")) {
      toolToCall = "process_return";
      const orderId = orderMatch ? (orderMatch[0].toUpperCase().startsWith("ORD-") ? orderMatch[0].toUpperCase() : "ORD-" + orderMatch[1]) : "ORD-7742";
      let reason = "Defective / Customer Request";
      if (msgLower.includes("size")) reason = "Size mismatch";
      if (msgLower.includes("broken") || msgLower.includes("damaged")) reason = "Damaged during transit";
      toolArgs = { order_id: orderId, reason: reason };
      reasoningText = `User requested return or refund for order ${orderId}. Selecting 'process_return' tool.`;
    }
    else if (orderMatch || msgLower.includes("track") || msgLower.includes("where is my order") || msgLower.includes("status of order")) {
      toolToCall = "get_order_status";
      const orderId = orderMatch ? (orderMatch[0].toUpperCase().startsWith("ORD-") ? orderMatch[0].toUpperCase() : "ORD-" + orderMatch[1]) : "ORD-8921";
      toolArgs = { order_id: orderId };
      reasoningText = `Extracted order reference ${orderId}. Invoking 'get_order_status' tool.`;
    }
    else if (msgLower.includes("recommend") || msgLower.includes("suggest") || msgLower.includes("what should i buy") || msgLower.includes("best for me")) {
      toolToCall = "get_recommendations";
      toolArgs = { category: memory.preferred_category, limit: 3 };
      reasoningText = `Personalized recommendation request detected. Using user context memory: Preferred Category '${memory.preferred_category}'.`;
    }
    else if (msgLower.includes("stock") || msgLower.includes("available") || msgLower.includes("in stock")) {
      toolToCall = "search_catalog";
      let query = "headphones";
      if (msgLower.includes("watch")) query = "smartwatch";
      if (msgLower.includes("sneaker") || msgLower.includes("shoe")) query = "sneakers";
      if (msgLower.includes("backpack") || msgLower.includes("bag")) query = "backpack";
      toolArgs = { query: query };
      reasoningText = `Inventory availability check requested for query '${query}'. Calling 'search_catalog'.`;
    }
    else {
      // General product search
      toolToCall = "search_catalog";
      let query = "";
      let maxPrice = 1000;

      if (msgLower.includes("headphone") || msgLower.includes("audio") || msgLower.includes("sound")) query = "headphones";
      else if (msgLower.includes("watch") || msgLower.includes("smartwatch") || msgLower.includes("fitness")) query = "smartwatch";
      else if (msgLower.includes("shoe") || msgLower.includes("sneaker") || msgLower.includes("footwear")) query = "sneakers";
      else if (msgLower.includes("bag") || msgLower.includes("backpack")) query = "backpack";
      else if (msgLower.includes("keyboard") || msgLower.includes("gaming")) query = "keyboard";
      else if (msgLower.includes("lamp") || msgLower.includes("light")) query = "lamp";

      // Price extraction
      const priceMatch = msgLower.match(/under\s*\$?(\d+)/i) || msgLower.match(/\$?(\d+)\s*dollars?/i);
      if (priceMatch) {
        maxPrice = parseFloat(priceMatch[1]);
      }

      toolArgs = { query: query, max_price: maxPrice };
      reasoningText = `Constructed catalog search parameters: query='${query}', max_price=${maxPrice}. Executing 'search_catalog'.`;
    }

    // Step 2: Emit Tool Decision
    this.emitThought(reasoningText, "TOOL_SELECTION");
    await this.delay(500);

    // Step 3: Execute Tool Call
    const startTime = performance.now();
    this.emitThought(`Invoking function: ${toolToCall}(${JSON.stringify(toolArgs)})`, "TOOL_EXECUTION");
    
    let toolResult = null;
    try {
      toolResult = await toolExecutors[toolToCall](toolArgs);
    } catch (err) {
      toolResult = { status: "error", message: err.message };
    }

    const duration = (performance.now() - startTime).toFixed(1);

    if (this.onToolCallExecuted) {
      this.onToolCallExecuted({
        toolName: toolToCall,
        args: toolArgs,
        result: toolResult,
        executionTimeMs: duration,
        timestamp: new Date().toLocaleTimeString()
      });
    }

    await this.delay(600);
    this.emitThought(`Tool response received (${duration}ms). Formulating response...`, "SYNTHESIS");

    // Step 4: Synthesize Final Output & Widget
    const finalOutput = this.generateResponseText(toolToCall, toolArgs, toolResult, memory);

    // Add agent response to memory
    memoryManager.addMessage("assistant", finalOutput.text, [{ name: toolToCall, args: toolArgs }], toolToCall);

    this.isProcessing = false;

    return {
      text: finalOutput.text,
      widgetType: finalOutput.widgetType,
      widgetData: finalOutput.widgetData,
      toolCallInfo: {
        name: toolToCall,
        args: toolArgs,
        result: toolResult,
        duration: duration
      }
    };
  }

  generateResponseText(toolName, args, result, memory) {
    const name = memory.customer_name || "there";

    if (toolName === "get_order_status") {
      if (result.status === "error") {
        return {
          text: `I couldn't find order **${args.order_id}** in our database. Please double-check your order ID. Sample orders you can test: **ORD-8921** (In Transit) or **ORD-7742** (Delivered).`,
          widgetType: null,
          widgetData: null
        };
      }
      const order = result.order;
      return {
        text: `Hi **${name}**, here is the live tracking status for your order **${order.orderId}**:\n\n` +
              `• **Status**: ${order.status}\n` +
              `• **Carrier**: ${order.carrier} (\`${order.trackingNumber}\`)\n` +
              `• **Estimated Delivery**: ${order.estimatedDelivery}\n` +
              `• **Shipping Address**: ${order.shippingAddress}`,
        widgetType: "order_timeline",
        widgetData: order
      };
    }

    if (toolName === "process_return") {
      if (result.status === "error") {
        return { text: `Sorry, ${result.message}`, widgetType: null, widgetData: null };
      }
      if (result.status === "ineligible") {
        return { text: `⚠️ **Return Policy Alert**: ${result.reason}`, widgetType: null, widgetData: null };
      }
      if (result.status === "already_returned") {
        return {
          text: `Return for order **${args.order_id}** is already processing under RMA code \`${result.returnRma}\`. Your total refund of **$${result.refundAmount.toFixed(2)}** is pending package scan.`,
          widgetType: "return_label",
          widgetData: { rmaCode: result.returnRma, refundAmount: result.refundAmount, orderId: args.order_id }
        };
      }
      return {
        text: `✅ **Return Authorized!** I've generated a prepaid return RMA label for order **${args.order_id}**.\n\n` +
              `• **RMA Code**: \`${result.rmaCode}\`\n` +
              `• **Refund Amount**: **$${result.refundAmount.toFixed(2)}**\n` +
              `• **Instructions**: ${result.instructions}`,
        widgetType: "return_label",
        widgetData: {
          rmaCode: result.rmaCode,
          refundAmount: result.refundAmount,
          orderId: args.order_id,
          reason: result.returnReason,
          qrUrl: result.qrUrl
        }
      };
    }

    if (toolName === "get_recommendations") {
      const items = result.recommendations;
      return {
        text: `Based on your profile preferences (**${memory.preferred_category}** & **${memory.tier}** status), here are top recommendations tailored for you, **${name}**:`,
        widgetType: "product_list",
        widgetData: items
      };
    }

    if (toolName === "search_catalog") {
      const products = result.products || [];
      if (products.length === 0) {
        return {
          text: `I searched our catalog for **"${args.query || 'products'}"** but couldn't find exact matches under your criteria. Would you like me to broaden the price range or search another category?`,
          widgetType: null,
          widgetData: null
        };
      }
      return {
        text: `I found **${products.length} product(s)** matching your query **"${args.query || 'catalog'}"**:`,
        widgetType: "product_list",
        widgetData: products
      };
    }

    return {
      text: `Processed query successfully. How else can I assist you today?`,
      widgetType: null,
      widgetData: null
    };
  }

  emitThought(message, phase) {
    if (this.onThoughtStep) {
      this.onThoughtStep({ message, phase, timestamp: new Date().toLocaleTimeString() });
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const agentEngine = new AgentEngine();
