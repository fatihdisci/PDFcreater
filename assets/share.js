window.sharePdf = async function(blob) {
  if (!navigator.share) {
    alert('Tarayıcınız paylaşımı desteklemiyor.');
    return;
  }
  const file = new File([blob], 'metin.pdf', { type: 'application/pdf' });
  if (navigator.canShare && !navigator.canShare({ files: [file] })) {
    alert('Paylaşım desteklenmiyor.');
    return;
  }
  try {
    await navigator.share({ files: [file], title: 'PDF', text: 'Oluşturulan PDF' });
  } catch (e) {}
};
