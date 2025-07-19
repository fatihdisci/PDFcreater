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
  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, 15, 20);
  doc.save('metin.pdf');
});
