document.addEventListener('DOMContentLoaded', () => {
  const ta = document.getElementById('textInput');
  const charCount = document.getElementById('charCount');
  const wordCount = document.getElementById('wordCount');
  const themeToggle = document.getElementById('themeToggle');
  const pasteBtn = document.getElementById('pasteBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const shareBtn = document.getElementById('shareBtn');

  function updateCounter() {
    const text = ta.value;
    charCount.textContent = text.length;
    wordCount.textContent = (text.trim().match(/\S+/g) || []).length;
  }

  function saveText() {
    localStorage.setItem('pdf_text', ta.value);
  }

  function loadText() {
    const saved = localStorage.getItem('pdf_text');
    if (saved) ta.value = saved;
    updateCounter();
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      ta.value = text;
      updateCounter();
      saveText();
    } catch (e) {
      console.error(e);
    }
  }

  function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  }

  function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }

  function addFooter(doc, page, margin) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text(`\u2013 ${page} \u2013`, pageWidth / 2, pageHeight - margin / 2, { align: 'center' });
  }

  function createPdf(share) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 25; // 2.5 cm
    const fontSize = 11;
    const lineHeightMm = fontSize * 1.5 * 0.352777; // pt to mm
    const indent = 12.5;
    const paraSpace = 6 * 0.352777;
    doc.setFont('Times', '');
    doc.setFontSize(fontSize);
    doc.setProperties({ title: 'Metin', subject: 'PDF Olu\u015fturucu', author: '' });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = margin;
    const paragraphs = ta.value.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    paragraphs.forEach(p => {
      const lines = doc.splitTextToSize(p, pageWidth - margin * 2);
      lines.forEach((line, idx) => {
        if (y + lineHeightMm > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        const x = margin + (idx === 0 ? indent : 0);
        doc.text(line, x, y);
        y += lineHeightMm;
      });
      y += paraSpace;
    });

      const total = doc.internal.getNumberOfPages();
      for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        addFooter(doc, i, margin);
      }

    const blob = doc.output('blob');
    if (share) {
      window.sharePdf && window.sharePdf(blob);
    } else {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'metin.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  ta.addEventListener('input', () => { updateCounter(); saveText(); });
  pasteBtn.addEventListener('click', pasteFromClipboard);
  themeToggle.addEventListener('click', toggleTheme);
  downloadBtn.addEventListener('click', () => createPdf(false));
  shareBtn.addEventListener('click', () => createPdf(true));

  loadTheme();
  loadText();
  ta.focus();
});
