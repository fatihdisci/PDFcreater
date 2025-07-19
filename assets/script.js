document.getElementById('downloadBtn').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const text = document.getElementById('textInput').value;
  const lines = doc.splitTextToSize(text, 180);
  doc.setFont('Helvetica', '');
  doc.text(lines, 15, 20);
  doc.save('metin.pdf');
});
