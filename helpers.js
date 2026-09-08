export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function generateId(prefix = 'ID') {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

export function renderSimpleMarkdown(text) {
  if (!text) return '';
  let html = escapeHtml(text);

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Code snippets
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Bullet points
  html = html.replace(/^\s*[\-\*]\s+(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul class="chat-markdown-list">$1</ul>');

  // Line breaks
  html = html.replace(/\n/g, '<br>');

  return html;
}
