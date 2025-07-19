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
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const lines = doc.splitTextToSize(text, pageWidth - 30);

  let cursorY = 20;
  const lineHeight = 10;

  lines.forEach(line => {
    if (cursorY > pageHeight - 20) {
      doc.addPage();
      cursorY = 20;
    }
    doc.text(line, 15, cursorY);
    cursorY += lineHeight;
  });

  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'metin.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});
