import { renderSimpleMarkdown, formatCurrency } from '../utils/helpers.js';

export class ChatUI {
  constructor(chatContainerId, promptChipsContainerId) {
    this.chatContainer = document.getElementById(chatContainerId);
    this.chipsContainer = document.getElementById(promptChipsContainerId);
    this.onChipClick = null;
  }

  setChipClickCallback(cb) {
    this.onChipClick = cb;
  }

  renderChips(chips) {
    if (!this.chipsContainer) return;
    this.chipsContainer.innerHTML = chips.map(chip => `
      <button class="prompt-chip" data-prompt="${chip.prompt}">
        <span class="chip-icon">${chip.icon}</span>
        <span class="chip-text">${chip.label}</span>
      </button>
    `).join('');

    this.chipsContainer.querySelectorAll('.prompt-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-prompt');
        if (this.onChipClick) this.onChipClick(prompt);
      });
    });
  }

  appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message message-user animate-fade-in';
    msgDiv.innerHTML = `
      <div class="message-content">
        <div class="message-text">${renderSimpleMarkdown(text)}</div>
        <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div class="avatar avatar-user">
        <i class="fas fa-user"></i>
      </div>
    `;
    this.chatContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }

  appendTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator-msg';
    typingDiv.className = 'chat-message message-assistant animate-fade-in';
    typingDiv.innerHTML = `
      <div class="avatar avatar-ai glowing">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        <div class="typing-bubbles">
          <span class="bubble"></span>
          <span class="bubble"></span>
          <span class="bubble"></span>
        </div>
        <span class="typing-text">AuraAI is calling tools & reasoning...</span>
      </div>
    `;
    this.chatContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const el = document.getElementById('typing-indicator-msg');
    if (el) el.remove();
  }

  appendAssistantMessage(result) {
    this.removeTypingIndicator();

    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message message-assistant animate-fade-in';

    let toolCallBadge = '';
    if (result.toolCallInfo) {
      toolCallBadge = `
        <div class="tool-call-badge" title="Click to view tool telemetry in Agent Brain panel">
          <i class="fas fa-bolt"></i> Tool Triggered: <code>${result.toolCallInfo.name}()</code>
          <span class="execution-time">${result.toolCallInfo.duration}ms</span>
        </div>
      `;
    }

    let widgetHtml = '';
    if (result.widgetType && result.widgetData) {
      widgetHtml = this.renderWidget(result.widgetType, result.widgetData);
    }

    msgDiv.innerHTML = `
      <div class="avatar avatar-ai">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        ${toolCallBadge}
        <div class="message-text">${renderSimpleMarkdown(result.text)}</div>
        ${widgetHtml}
        <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    `;

    this.chatContainer.appendChild(msgDiv);
    this.bindWidgetEvents(msgDiv);
    this.scrollToBottom();
  }

  renderWidget(type, data) {
    if (type === 'product_list') {
      const items = Array.isArray(data) ? data : [data];
      return `
        <div class="widget-container widget-products-grid">
          ${items.map(p => `
            <div class="product-card">
              <div class="product-image-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'">
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
              </div>
              <div class="product-body">
                <div class="product-category">${p.category} • ${p.subcategory || ''}</div>
                <h4 class="product-title">${p.name}</h4>
                <p class="product-desc">${p.description}</p>
                
                ${p.specs ? `
                  <div class="product-specs-pill">
                    ${Object.entries(p.specs).slice(0, 2).map(([k, v]) => `<span><strong>${k}:</strong> ${v}</span>`).join('')}
                  </div>
                ` : ''}

                <div class="product-footer">
                  <div class="product-price">
                    <span class="current-price">${formatCurrency(p.price)}</span>
                    ${p.originalPrice ? `<span class="old-price">${formatCurrency(p.originalPrice)}</span>` : ''}
                  </div>
                  <button class="btn-action-small product-query-btn" data-query="Tell me detailed specs for ${p.name}">
                    <i class="fas fa-info-circle"></i> Details
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (type === 'order_timeline') {
      const o = data;
      return `
        <div class="widget-container widget-order-tracker">
          <div class="tracker-header">
            <div class="order-id-tag">
              <i class="fas fa-box-open"></i> Order ${o.orderId}
            </div>
            <span class="status-pill status-${o.statusCode.toLowerCase()}">${o.status}</span>
          </div>

          <div class="tracker-timeline">
            ${o.timeline.map((step, idx) => `
              <div class="timeline-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}">
                <div class="step-icon">
                  ${step.completed ? '<i class="fas fa-check"></i>' : (step.active ? '<i class="fas fa-truck-moving"></i>' : idx + 1)}
                </div>
                <div class="step-info">
                  <div class="step-title">${step.status}</div>
                  <div class="step-date">${step.date}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="tracker-details">
            <div class="detail-item">
              <span class="label">Carrier</span>
              <span class="val">${o.carrier} (${o.trackingNumber})</span>
            </div>
            <div class="detail-item">
              <span class="label">Est. Delivery</span>
              <span class="val accent-green">${o.estimatedDelivery}</span>
            </div>
          </div>
        </div>
      `;
    }

    if (type === 'return_label') {
      const r = data;
      return `
        <div class="widget-container widget-return-ticket">
          <div class="return-ticket-header">
            <i class="fas fa-receipt"></i>
            <div>
              <div class="ticket-title">Return Authorization Ticket</div>
              <div class="ticket-sub">Order ${r.orderId}</div>
            </div>
          </div>
          <div class="return-ticket-body">
            <div class="rma-box">
              <span class="rma-label">RMA Tracking Code</span>
              <code class="rma-code">${r.rmaCode}</code>
            </div>
            <div class="refund-box">
              <span>Estimated Refund Amount:</span>
              <strong class="refund-amount">${formatCurrency(r.refundAmount)}</strong>
            </div>
            ${r.qrUrl ? `
              <div class="qr-code-wrapper">
                <img src="${r.qrUrl}" alt="Return QR Code" class="qr-img">
                <span class="qr-caption">Scan at Dropoff Location</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    return '';
  }

  bindWidgetEvents(container) {
    container.querySelectorAll('.product-query-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const queryText = btn.getAttribute('data-query');
        if (this.onChipClick) this.onChipClick(queryText);
      });
    });
  }

  scrollToBottom() {
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }
}
