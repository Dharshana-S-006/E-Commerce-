import { agentEngine } from './agent/agentEngine.js';
import { ChatUI } from './components/chatUI.js';
import { BrainInspector } from './components/brainInspector.js';
import { ArchitectureModal } from './components/architectureModal.js';
import { memoryManager } from './agent/memoryManager.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Components
  const chatUI = new ChatUI('chat-messages-box', 'prompt-chips-box');
  const brainInspector = new BrainInspector('agent-brain-panel');
  const archModal = new ArchitectureModal();

  // Setup Prompt Action Chips
  const promptChips = [
    { icon: "📦", label: "Track Order #ORD-8921", prompt: "Where is my order #ORD-8921?" },
    { icon: "🎧", label: "Noise Cancelling Headphones", prompt: "Show me top noise cancelling headphones under $200" },
    { icon: "🔄", label: "Return Order #ORD-7742", prompt: "I want to return order #ORD-7742 because it is defective" },
    { icon: "✨", label: "Personalized Recs", prompt: "Recommend the best tech accessories for my profile" },
    { icon: "⌚", label: "Smartwatch Specs", prompt: "Check inventory and specs for PulseFit Horizon Smartwatch" }
  ];

  chatUI.renderChips(promptChips);

  // Bind Thought Stream & Tool Telemetry Callbacks
  agentEngine.setThoughtCallback(thought => {
    brainInspector.addThoughtStep(thought);
  });

  agentEngine.setToolCallCallback(telemetry => {
    brainInspector.addToolTelemetry(telemetry);
  });

  // Handle Form Submission
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('user-input');

  async function handleUserSend(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    chatInput.value = '';
    chatUI.appendUserMessage(trimmed);
    chatUI.appendTypingIndicator();

    try {
      const response = await agentEngine.processUserMessage(trimmed);
      chatUI.appendAssistantMessage(response);
    } catch (err) {
      console.error(err);
      chatUI.removeTypingIndicator();
      chatUI.appendAssistantMessage({
        text: "⚠️ An unexpected error occurred while running the agent pipeline. Please try again.",
        widgetType: null,
        widgetData: null
      });
    }
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSend(chatInput.value);
    });
  }

  // Handle Chip Clicks
  chatUI.setChipClickCallback(promptText => {
    handleUserSend(promptText);
  });

  // Top Nav Buttons
  const openArchBtn = document.getElementById('btn-open-arch');
  if (openArchBtn) {
    openArchBtn.addEventListener('click', () => archModal.show());
  }

  const toggleBrainBtn = document.getElementById('btn-toggle-brain');
  const brainPanel = document.getElementById('agent-brain-panel');
  if (toggleBrainBtn && brainPanel) {
    toggleBrainBtn.addEventListener('click', () => {
      brainPanel.classList.toggle('collapsed');
    });
  }

  const resetChatBtn = document.getElementById('btn-reset-chat');
  if (resetChatBtn) {
    resetChatBtn.addEventListener('click', () => {
      memoryManager.clearShortTermMemory();
      document.getElementById('chat-messages-box').innerHTML = '';
      chatUI.appendAssistantMessage({
        text: "👋 Welcome back! Conversation context has been reset. How can AuraAI assist your e-commerce journey today?",
        widgetType: null,
        widgetData: null
      });
    });
  }

  // Initial Welcome Message
  chatUI.appendAssistantMessage({
    text: "👋 **Welcome to AuraAI E-Commerce Assistant!**\n\n" +
          "I am an **Autonomous E-Commerce Support Agent** built with **Tool Calling** and **Memory Systems**. You can ask me to:\n\n" +
          "1. 📦 **Track Live Shipments**: Try *\"Where is my order #ORD-8921?\"*\n" +
          "2. 🔍 **Search Product Catalog & Specs**: Try *\"Show me wireless headphones under $200\"*\n" +
          "3. 🔄 **Process Returns & Refunds**: Try *\"Return order #ORD-7742\"*\n" +
          "4. ✨ **Get Personalized Recommendations**: Try *\"Recommend tech products for me\"*\n\n" +
          "💡 *Watch the **Agent Brain Panel** on the right for real-time function calling telemetry and user memory inspection!*",
    widgetType: null,
    widgetData: null
  });
});
