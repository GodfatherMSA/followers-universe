# Sistem Kalıpları (System Patterns)

## Sistem Mimarisi
Uygulama, React ve Vite ile oluşturulmuş bir Tek Sayfa Uygulamasıdır (Single Page Application - SPA). Tüm 3 boyutlu ekosistem, `@react-three/fiber` (R3F) kullanılarak `App.jsx` içerisinde yapılandırılmıştır. Mimari, farklı gök cisimleri ve ortamlar için deklare edilebilir (declarative) 3 boyutlu bileşenlere dayanmaktadır.

## Temel Teknik Kararlar
- **React Three Fiber (R3F):** React state ve Three.js sahne grafiği (scene graph) arasında kusursuz bir entegrasyon sağlamak için tercih edilmiştir.
- **Prosedürel Oluşturma (Procedural Generation):** Arazi yükseklikleri, sinüs ve kosinüs matematik gürültüsü (`getElevation()`) kullanılarak tasarlanmış, dinamik ancak yeniden üretilebilir manzaralar elde edilmiştir.
- **Avatar Sistemi:** Takipçiler, `src/data` içindeki JSON dosyalarından aktarılan dizilerle eşleştirilerek belirgin 3 boyutlu modeller (`Astronaut`, VIP modelleri) olarak işlenmiştir. Konumlandırma; ya hiyerarşik podyumlar için hesaplanan matematiğe dayalı olarak ya da arazideki çarpışma kontrolleriyle rastgele sağlanmaktadır.
- **Olay Döngüsü Animasyonları (Event Loop Animations):** R3F'in `useFrame` kancası, sürekli animasyonlar (yörüngeler, ateş böcekleri, kar fırtınaları, uçan adalar) için yoğun bir şekilde kullanılmaktadır.

## Kullanılan Tasarım Kalıpları
- **Bileşen Tabanlı 3D:** Evreni izole edilmiş, yeniden kullanılabilir React bileşenlerine (`SunSystem`, `CennetGezegen`, `PlayerController`) ayırma prensibi.
- **Varlıkların Önceden Yüklenmesi (Preloading):** Çalışma sırasında görsel aksaklıkları (popping) ve gecikmeleri önlemek için GLTF modelleri ve texture'lar betiğin (script) en altında önceden yüklenmektedir.
- **Duruma Bağlı Navigasyon (State-Driven Navigation):** Kamera ve odak noktası, akıcı ve pürüzsüz kamera geçişlerini tetikleyen React stateleri (ör. `focusedTarget`) aracılığıyla kontrol edilir.

## Bileşen İlişkileri
- `Canvas` (Kök Bileşen - Root)
  - `SceneController` (Görünüm durumuna bağlı olarak ortamı/sisi kontrol eder)
  - `PlayerController` (WASD tuşlarıyla yüzeyde yürümeyi/gezinmeyi kontrol eder)
  - `SolarSystemOrbits`
    - `SunSystem`
    - `CennetGezegen` (Genesis)
    - `BuzulGezegen` (Ice)
    - `VolkanikGezegen` (Lava)
  - Takipçi Listeleri Eşleşir -> `Astronaut` / GLTF Bileşenlerine
