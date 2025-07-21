# PDF Oluşturucu

İstemci tarafında çalışan bu küçük uygulama, yazdığınız metni ayarlanabilir seçeneklerle PDF dosyasına dönüştürür. Herhangi bir sunucu kodu bulunmaz; GitHub Pages üzerinden kolayca yayınlanabilir.

## Özellikler
- Panodan yapıştırma, otomatik odaklanan metin alanı
- Yazarken canlı karakter ve kelime sayacı
- LocalStorage ile otomatik kaydetme ve geri yükleme
- PDF çıktısı Times New Roman 11 pt, 1.5 satır aralığı ve 2.5 cm kenar boşluğu
- Her sayfanın altında "– X –" biçiminde numaralandırma
- Işık/koyu tema geçişi
- Web Share API ile oluşturulan PDF’yi paylaşabilme
- jsPDF metadata bilgileri
- Sağ altta sürüm bilgisi: **v0.4 (21‑07‑2025)**

## Yerel Geliştirme
1. Depoyu klonlayın ve dizine girin.
2. Bir statik sunucu başlatın veya `index.html` dosyasını doğrudan açın.
3. Değişikliklerinizi kaydedip tarayıcıda sayfayı yenileyin.

## GitHub Pages Yayınlama
1. Projeyi GitHub’da yeni bir depo olarak oluşturup dosyaları gönderin.
2. `Settings > Pages` menüsünden kaynak olarak **GitHub Actions**'ı seçin.
3. Ana dalda yapılan her push, `pages.yml` iş akışıyla siteyi otomatik olarak yayına alır.
