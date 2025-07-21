# PDF Oluşturucu

İstemci tarafında çalışan bu küçük uygulama, yazdığınız metni ayarlanabilir seçeneklerle PDF dosyasına dönüştürür. Herhangi bir sunucu kodu bulunmaz; GitHub Pages üzerinden kolayca yayınlanabilir.

## Özellikler
- Panodan yapıştırma, otomatik odaklanan metin alanı
- Yazarken canlı karakter ve kelime sayacı
- LocalStorage ile otomatik kaydetme ve geri yükleme
- Kenar boşluğu, yazı boyutu ve satır aralığı seçebilme
- Her sayfaya tarihli numaralandırma içeren altbilgi
- Işık/koyu tema geçişi, varsayılan DejaVu Sans yazı tipi
- Web Share API ile oluşturulan PDF’yi paylaşabilme
- jsPDF metadata bilgileri
- Lorem ipsum, Türkçe test ve 5 sayfalık örnek metin butonları
- Sağ altta sürüm bilgisi: **v0.4 (21‑07‑2025)**

## Yerel Geliştirme
1. Depoyu klonlayın ve dizine girin.
2. Bir statik sunucu başlatın veya `index.html` dosyasını doğrudan açın.
3. Değişikliklerinizi kaydedip tarayıcıda sayfayı yenileyin.

## GitHub Pages Yayınlama
1. Projeyi GitHub’da yeni bir depo olarak oluşturup dosyaları gönderin.
2. `Settings > Pages` menüsünden kaynak olarak **GitHub Actions**'ı seçin.
3. Ana dalda yapılan her push, `pages.yml` iş akışıyla siteyi otomatik olarak yayına alır.
