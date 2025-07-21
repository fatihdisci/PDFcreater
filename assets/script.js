document.addEventListener('DOMContentLoaded', () => {
  const ta = document.getElementById('textInput');
  const charCount = document.getElementById('charCount');
  const wordCount = document.getElementById('wordCount');
  const marginInput = document.getElementById('marginInput');
  const fontSizeInput = document.getElementById('fontSizeInput');
  const lineHeightInput = document.getElementById('lineHeightInput');
  const fontSelect = document.getElementById('fontSelect');
  const themeToggle = document.getElementById('themeToggle');
  const pasteBtn = document.getElementById('pasteBtn');
  const loremBtn = document.getElementById('loremBtn');
  const turkishBtn = document.getElementById('turkishBtn');
  const fiveBtn = document.getElementById('fiveBtn');
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

  function applySample(text) {
    ta.value = text;
    updateCounter();
    saveText();
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

  function addFooter(doc, page, total, margin) {
    const date = new Date().toLocaleDateString('tr-TR');
    const text = `s. ${page} / ${total} - ${date}`;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text(text, pageWidth - margin, pageHeight - margin / 2, { align: 'right' });
  }

  function createPdf(share) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    if (typeof DEJAVU_SERIF !== 'undefined') {
      doc.addFileToVFS('DejaVuSans.ttf', DEJAVU_SERIF);
      doc.addFont('DejaVuSans.ttf', 'DejaVu', 'normal');
    }
    const margin = parseInt(marginInput.value) || 40;
    const fontSize = parseInt(fontSizeInput.value) || 12;
    const lineHeight = parseFloat(lineHeightInput.value) || 1.4;
    const font = fontSelect.value;
    doc.setFont(font === 'DejaVu' ? 'DejaVu' : font);
    doc.setFontSize(fontSize);
    doc.setProperties({ title: 'Metin', subject: 'PDF Olu\u015fturucu', author: '' });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const usableWidth = pageWidth - margin * 2;
    const lines = doc.splitTextToSize(ta.value, usableWidth);
    let cursorY = margin;
    lines.forEach(line => {
      if (cursorY + fontSize > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += fontSize * lineHeight;
    });

    const total = doc.internal.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      doc.setPage(i);
      addFooter(doc, i, total, margin);
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
  loremBtn.addEventListener('click', () => applySample(window.sampleTexts.lorem));
  turkishBtn.addEventListener('click', () => applySample(window.sampleTexts.turkish));
  fiveBtn.addEventListener('click', () => applySample(window.sampleTexts.fivePage()));
  themeToggle.addEventListener('click', toggleTheme);
  downloadBtn.addEventListener('click', () => createPdf(false));
  shareBtn.addEventListener('click', () => createPdf(true));

  loadTheme();
  loadText();
  ta.focus();
});
