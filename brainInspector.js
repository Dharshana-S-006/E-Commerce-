import { memoryManager } from '../agent/memoryManager.js';
import { toolDeclarations } from '../agent/tools.js';
import { escapeHtml } from '../utils/helpers.js';

export class BrainInspector {
  constructor(panelContainerId) {
    this.panel = document.getElementById(panelContainerId);
    this.thoughtListContainer = null;
    this.telemetryListContainer = null;
    this.memoryContainer = null;
    this.toolsContainer = null;

    this.setupUI();
    this.bindMemorySubscription();
  }

  setupUI() {
    if (!this.panel) return;

    this.panel.innerHTML = `
      <div class="brain-header">
        <div class="brain-title">
          <i class="fas fa-brain glowing-icon"></i> Agent Brain & Inspector
        </div>
        <div class="token-meter" id="token-meter-box">
          <span class="token-label">Tokens:</span>
          <div class="token-bar-wrap">
            <div class="token-bar-fill" id="token-bar-fill" style="width: 15%;"></div>
          </div>
          <span class="token-val" id="token-count-val">240</span>
        </div>
      </div>

      <div class="brain-tabs">
        <button class="brain-tab active" data-tab="tab-telemetry">
          <i class="fas fa-terminal"></i> Telemetry & Tools
        </button>
        <button class="brain-tab" data-tab="tab-memory">
          <i class="fas fa-database"></i> Memory Store
        </button>
        <button class="brain-tab" data-tab="tab-schemas">
          <i class="fas fa-code"></i> Tool Schemas
        </button>
      </div>

      <div class="brain-content">
        <!-- Tab 1: Telemetry & Chain of Thought -->
        <div class="tab-pane active" id="tab-telemetry">
          <div class="section-title"><i class="fas fa-stream"></i> Chain-of-Thought Stream</div>
          <div class="thought-stream-box" id="thought-stream-box">
            <div class="thought-item empty-state">Waiting for user query... Agent thoughts will stream here.</div>
          </div>

          <div class="section-title"><i class="fas fa-microchip"></i> Function Call Logs</div>
          <div class="telemetry-log-box" id="telemetry-log-box">
            <div class="telemetry-item empty-state">No tools invoked yet.</div>
          </div>
        </div>

        <!-- Tab 2: Memory Inspector -->
        <div class="tab-pane" id="tab-memory">
          <div class="memory-section">
            <div class="section-title"><i class="fas fa-user-circle"></i> Long-Term User Profile Memory</div>
            <p class="memory-help">Evaluators can edit values below to test live personalization!</p>
            <div class="memory-fields-grid" id="memory-fields-grid"></div>
          </div>

          <div class="memory-section" style="margin-top: 1.5rem;">
            <div class="section-title"><i class="fas fa-history"></i> Short-Term Memory Buffer</div>
            <div class="short-term-box" id="short-term-box"></div>
            <button class="btn-secondary-sm" id="clear-memory-btn" style="margin-top: 10px;">
              <i class="fas fa-trash-alt"></i> Clear Context History
            </button>
          </div>
        </div>

        <!-- Tab 3: Tool Schemas -->
        <div class="tab-pane" id="tab-schemas">
          <div class="section-title"><i class="fas fa-layer-group"></i> Registered Tool Schemas</div>
          <div class="schemas-list-box" id="schemas-list-box"></div>
        </div>
      </div>
    `;

    this.thoughtListContainer = this.panel.querySelector('#thought-stream-box');
    this.telemetryListContainer = this.panel.querySelector('#telemetry-log-box');
    this.memoryContainer = this.panel.querySelector('#memory-fields-grid');
    this.toolsContainer = this.panel.querySelector('#schemas-list-box');

    this.bindTabEvents();
    this.renderToolSchemas();
    this.renderMemoryFields();

    const clearBtn = this.panel.querySelector('#clear-memory-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        memoryManager.clearShortTermMemory();
        this.addThoughtStep({ message: "Short-term conversation context cleared.", phase: "SYSTEM" });
      });
    }
  }

  bindTabEvents() {
    const tabs = this.panel.querySelectorAll('.brain-tab');
    const panes = this.panel.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetPane = this.panel.querySelector(`#${targetId}`);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  addThoughtStep({ message, phase, timestamp }) {
    if (!this.thoughtListContainer) return;
    const emptyState = this.thoughtListContainer.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    const item = document.createElement('div');
    item.className = `thought-item phase-${phase.toLowerCase()}`;
    item.innerHTML = `
      <div class="thought-header">
        <span class="phase-tag">${phase}</span>
        <span class="thought-time">${timestamp || new Date().toLocaleTimeString()}</span>
      </div>
      <div class="thought-msg">${escapeHtml(message)}</div>
    `;
    this.thoughtListContainer.appendChild(item);
    this.thoughtListContainer.scrollTop = this.thoughtListContainer.scrollHeight;
  }

  addToolTelemetry(data) {
    if (!this.telemetryListContainer) return;
    const emptyState = this.telemetryListContainer.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    const item = document.createElement('div');
    item.className = 'telemetry-item animate-fade-in';
    item.innerHTML = `
      <div class="telemetry-header">
        <span class="tool-name-tag"><i class="fas fa-bolt"></i> ${data.toolName}</span>
        <span class="telemetry-time">${data.executionTimeMs}ms</span>
      </div>
      <div class="json-block">
        <div class="json-label">Arguments:</div>
        <pre><code>${JSON.stringify(data.args, null, 2)}</code></pre>
        <div class="json-label">Return Payload:</div>
        <pre><code>${JSON.stringify(data.result, null, 2)}</code></pre>
      </div>
    `;
    this.telemetryListContainer.prepend(item);
  }

  bindMemorySubscription() {
    memoryManager.subscribe(data => {
      this.updateTokenMeter(data.estimatedTokens);
      this.renderMemoryFields(data.longTerm);
      this.renderShortTermMemory(data.shortTerm);
    });
  }

  updateTokenMeter(tokens) {
    const valEl = this.panel.querySelector('#token-count-val');
    const fillEl = this.panel.querySelector('#token-bar-fill');
    if (valEl) valEl.textContent = tokens;
    if (fillEl) {
      const pct = Math.min(100, Math.round((tokens / 4000) * 100));
      fillEl.style.width = `${pct}%`;
    }
  }

  renderMemoryFields(longTermData) {
    if (!this.memoryContainer) return;
    const data = longTermData || memoryManager.longTermMemory;

    this.memoryContainer.innerHTML = Object.entries(data).map(([key, val]) => {
      const isArray = Array.isArray(val);
      const displayVal = isArray ? val.join(', ') : val;
      return `
        <div class="memory-field-item">
          <label class="mem-label">${key.replace(/_/g, ' ')}</label>
          <input type="text" class="mem-input" data-key="${key}" value="${escapeHtml(String(displayVal))}">
        </div>
      `;
    }).join('');

    this.memoryContainer.querySelectorAll('.mem-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const key = e.target.getAttribute('data-key');
        let newVal = e.target.value;
        if (key === 'recent_interests') {
          newVal = newVal.split(',').map(s => s.trim());
        }
        memoryManager.updateProfileKey(key, newVal);
      });
    });
  }

  renderShortTermMemory(history) {
    const box = this.panel.querySelector('#short-term-box');
    if (!box) return;
    const msgs = history || memoryManager.shortTermMemory;
    box.innerHTML = msgs.slice(-5).map(m => `
      <div class="short-msg-item role-${m.role}">
        <span class="role-badge">${m.role}</span>
        <span class="short-text">${escapeHtml(m.content.slice(0, 70))}${m.content.length > 70 ? '...' : ''}</span>
      </div>
    `).join('');
  }

  renderToolSchemas() {
    if (!this.toolsContainer) return;
    this.toolsContainer.innerHTML = toolDeclarations.map(t => `
      <div class="schema-card">
        <div class="schema-name"><i class="fas fa-cube"></i> ${t.name}</div>
        <div class="schema-desc">${t.description}</div>
        <pre class="schema-json"><code>${JSON.stringify(t.parameters, null, 2)}</code></pre>
      </div>
    `).join('');
  }
}
