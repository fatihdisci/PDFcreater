document.getElementById('downloadBtn').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Register a font that supports Turkish characters
  if (typeof DEJAVU_SERIF !== 'undefined') {
    doc.addFileToVFS('DejaVuSerif.ttf', DEJAVU_SERIF);
    doc.addFont('DejaVuSerif.ttf', 'DejaVuSerif', 'normal');
    doc.setFont('DejaVuSerif', 'normal');
  }

  const text = document.getElementById('textInput').value;

  const pageWidth = doc.internal.pageSize.getWidth() - 30; // 15mm margins
  const pageHeight = doc.internal.pageSize.getHeight() - 30;
  const lineHeight = 10;
  const lines = doc.splitTextToSize(text, pageWidth);

  let cursorY = 20;
  lines.forEach((line) => {
    if (cursorY > pageHeight) {
      doc.addPage();
      cursorY = 20;
    }
    doc.text(line, 15, cursorY);
    cursorY += lineHeight;
  });

  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'metin.pdf';
  a.click();
  URL.revokeObjectURL(url);
});
