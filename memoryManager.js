export class MemoryManager {
  constructor() {
    this.listeners = [];
    this.shortTermMemory = [
      { role: "system", content: "You are AuraAI, an intelligent E-commerce Customer Support Agent equipped with real-time tool calling and user context memory." }
    ];
    this.longTermMemory = {
      user_id: "USER-7091",
      customer_name: "Alex Rivera",
      email: "alex.rivera@example.com",
      tier: "VIP Gold Member",
      preferred_category: "Electronics & Audio",
      budget_tier: "Mid to High ($100 - $300)",
      past_orders_count: 14,
      total_spent: 1480.50,
      active_cart_item: "None",
      recent_interests: ["Noise Cancelling Headphones", "Smartwatches"],
      support_sentiment: "Neutral / Inquiring"
    };
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb({
      shortTerm: this.shortTermMemory,
      longTerm: this.longTermMemory,
      estimatedTokens: this.getEstimatedTokens()
    }));
  }

  addMessage(role, content, toolCalls = null, toolName = null) {
    const msg = {
      id: "MSG-" + Date.now(),
      role,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    if (toolCalls) msg.toolCalls = toolCalls;
    if (toolName) msg.toolName = toolName;
    this.shortTermMemory.push(msg);
    this.notify();
    return msg;
  }

  updateProfileKey(key, value) {
    this.longTermMemory[key] = value;
    this.notify();
  }

  addInterest(interest) {
    if (!this.longTermMemory.recent_interests.includes(interest)) {
      this.longTermMemory.recent_interests.unshift(interest);
      if (this.longTermMemory.recent_interests.length > 5) {
        this.longTermMemory.recent_interests.pop();
      }
      this.notify();
    }
  }

  getEstimatedTokens() {
    let charCount = JSON.stringify(this.shortTermMemory).length + JSON.stringify(this.longTermMemory).length;
    return Math.round(charCount / 4);
  }

  clearShortTermMemory() {
    this.shortTermMemory = [
      { role: "system", content: "You are AuraAI, an intelligent E-commerce Customer Support Agent equipped with real-time tool calling and user context memory." }
    ];
    this.notify();
  }
}

export const memoryManager = new MemoryManager();
