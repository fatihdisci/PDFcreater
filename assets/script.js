document.addEventListener('DOMContentLoaded', () => {
  const ta = document.getElementById('textInput');
  const charCount = document.getElementById('charCount');
  const wordCount = document.getElementById('wordCount');
  const downloadBtn = document.getElementById('downloadBtn');

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

  

  function addFooter(doc, page, margin) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text(`\u2013 ${page} \u2013`, pageWidth / 2, pageHeight - margin / 2, { align: 'center' });
  }

  function createPdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    if (typeof DEJAVU_SERIF !== 'undefined') {
      doc.addFileToVFS('TimesNewRoman.ttf', DEJAVU_SERIF);
      doc.addFont('TimesNewRoman.ttf', 'TimesNewRoman', 'normal');
      doc.setFont('TimesNewRoman', 'normal');
    } else {
      doc.setFont('Times', 'normal');
    }

    const MARGIN = 25; // 2.5 cm
    const FONT_SIZE = 11; // pt
    const LINE_HEIGHT = 1.5;
    const INDENT = 12.5; // mm
    const PARA_AFTER = 6 * 0.352778; // 6pt in mm
    const PT_TO_MM = 0.352778;

    doc.setFontSize(FONT_SIZE);
    doc.setProperties({ title: 'Metin', subject: 'PDF Olu\u015fturucu', author: '' });

    const lineHeightMm = FONT_SIZE * LINE_HEIGHT * PT_TO_MM;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const usableWidth = pageWidth - MARGIN * 2;

    const paragraphs = ta.value.split(/\n\s*\n/);
    let cursorY = MARGIN;

    paragraphs.forEach(para => {
      const lines = doc.splitTextToSize(para.trim(), usableWidth - INDENT);
      lines.forEach((line, idx) => {
        if (cursorY + lineHeightMm > pageHeight - MARGIN) {
          doc.addPage();
          cursorY = MARGIN;
        }
        const x = idx === 0 ? MARGIN + INDENT : MARGIN;
        const maxWidth = usableWidth - (idx === 0 ? INDENT : 0);
        doc.text(line, x, cursorY, { maxWidth, align: 'justify' });
        cursorY += lineHeightMm;
      });
      cursorY += PARA_AFTER;
    });

    const total = doc.internal.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      doc.setPage(i);
      addFooter(doc, i, MARGIN);
    }

    const url = URL.createObjectURL(doc.output('blob'));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'metin.pdf';
    link.click();
    URL.revokeObjectURL(url);
  }

  ta.addEventListener('input', () => { updateCounter(); saveText(); });
  downloadBtn.addEventListener('click', createPdf);
  loadText();
  ta.focus();
});
