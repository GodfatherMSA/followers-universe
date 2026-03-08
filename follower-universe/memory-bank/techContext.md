# Teknik Bağlam (Technical Context)

## Kullanılan Teknolojiler
- **Önyüz (Frontend) Çerçevesi:** React (v19.2.0)
- **Derleme Aracı:** Vite (v7.3.1)
- **3D Motoru:** Three.js (v0.183.1)
- **React 3D Bağlayıcısı:** @react-three/fiber (v9.5.0)
- **3D Yardımcıları:** @react-three/drei (v10.7.7)
- **Stillendirme:** CSS (`App.css`, `index.css`)
- **Kod Analizi (Linting):** ESLint

## Geliştirme Ortamı
- Hızlı HMR (Sıcak Modül Değişimi - Hot Module Replacement) için `vite` kullanır.
- Yerel geliştirme sunucusunu başlatmak için `npm run dev` komutu çalıştırılır.
- Standart bir ES Modül uygulaması olarak derlenir (`"type": "module"`).

## Teknik Kısıtlamalar
- **Performans:** Eşzamanlı olarak çok sayıda 3 boyutlu nesne (takipçiler) oluşturmak hesaplama açısından oldukça maliyetlidir (yüklüdür). Uygulama şu anda standart `<group>` ve `<Clone>` ayarlarına dayanmaktadır, ancak kullanıcı sayısı binlere ulaştığında daha fazla optimizasyon (InstancedMesh gibi) gerekebilir.
- **Veri Yönetimi:** Takipçi verileri dışa aktarılmış JSON dosyalarından yönetilmektedir. Bir API'ye kıyasla statiktir, ancak `App.jsx` içerisine gömülü (hardcoded) olmasından çok daha modülerdir.
- **Varlık (Asset) Boyutları:** Harici `.glb` modellerine yüksek bağımlılık, model boyutlarına bağlı olarak ilk yükleme süresinin önemli ölçüde uzayabileceği anlamına gelir.

## Bağımlılıklar (Dependencies)
- UI için standart React ekosistemi.
- Tüm görsel deneyimin omurgasını oluşturan `@react-three/fiber` ve `@react-three/drei`.
- Hata ayıklama için yüklenmiş gibi görünen, ancak çok az kullanılan veya artık kullanılmayan `leva` paketi.
