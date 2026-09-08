import { HACKATHON_CODE_SNIPPETS } from '../agent/promptTemplates.js';
import { escapeHtml } from '../utils/helpers.js';

export class ArchitectureModal {
  constructor() {
    this.modalEl = null;
    this.createModal();
  }

  createModal() {
    this.modalEl = document.createElement('div');
    this.modalEl.className = 'modal-backdrop animate-fade-in';
    this.modalEl.style.display = 'none';

    this.modalEl.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title">
            <i class="fas fa-project-diagram glowing-icon"></i> Student Project Showcase & Code Architecture
          </div>
          <button class="modal-close-btn" id="close-arch-modal"><i class="fas fa-times"></i></button>
        </div>

        <div class="modal-body">
          <div class="arch-banner">
            <h3>🎓 Flagship Student AI Project: E-Commerce Customer Support Agent</h3>
            <p>Demonstrates core Autonomous Agent capabilities: <strong>Dynamic Tool Calling (Function Calling)</strong>, <strong>Long-Term & Short-Term Memory Context</strong>, <strong>NLP Intent Routing</strong>, and <strong>Rich UI Widget Synthesis</strong>.</p>
          </div>

          <div class="arch-section-title"><i class="fas fa-sitemap"></i> High-Level Architecture Flowchart</div>
          <div class="diagram-box">
            <div class="arch-flow">
              <div class="flow-node node-user">
                <i class="fas fa-user-astronaut"></i>
                <span>Customer Input</span>
              </div>
              <div class="flow-arrow"><i class="fas fa-long-arrow-alt-right"></i></div>
              <div class="flow-node node-agent">
                <i class="fas fa-robot"></i>
                <span>Agent Router & Memory</span>
              </div>
              <div class="flow-arrow"><i class="fas fa-long-arrow-alt-right"></i></div>
              <div class="flow-node node-tool">
                <i class="fas fa-tools"></i>
                <span>Tool Execution (APIs)</span>
              </div>
              <div class="flow-arrow"><i class="fas fa-long-arrow-alt-right"></i></div>
              <div class="flow-node node-widget">
                <i class="fas fa-th-large"></i>
                <span>Rich UI Widget Output</span>
              </div>
            </div>
          </div>

          <div class="arch-section-title" style="margin-top: 1.5rem;"><i class="fas fa-code"></i> Copy Production Code Snippets</div>
          
          <div class="code-snippet-tabs">
            <button class="code-tab active" data-code="python_openai">Python (OpenAI)</button>
            <button class="code-tab" data-code="langchain">LangChain Agent</button>
            <button class="code-tab" data-code="nodejs">Node.js Function Calling</button>
          </div>

          <div class="code-snippet-box">
            <button class="copy-code-btn" id="copy-code-btn"><i class="fas fa-copy"></i> Copy Code</button>
            <pre><code id="code-snippet-display">${escapeHtml(HACKATHON_CODE_SNIPPETS.python_openai)}</code></pre>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.modalEl);
    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = this.modalEl.querySelector('#close-arch-modal');
    closeBtn.addEventListener('click', () => this.hide());

    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.hide();
    });

    const tabs = this.modalEl.querySelectorAll('.code-tab');
    const display = this.modalEl.querySelector('#code-snippet-display');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const snippetKey = tab.getAttribute('data-code');
        if (HACKATHON_CODE_SNIPPETS[snippetKey]) {
          display.textContent = HACKATHON_CODE_SNIPPETS[snippetKey];
        }
      });
    });

    const copyBtn = this.modalEl.querySelector('#copy-code-btn');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(display.textContent);
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
      }, 2000);
    });
  }

  show() {
    this.modalEl.style.display = 'flex';
  }

  hide() {
    this.modalEl.style.display = 'none';
  }
}
