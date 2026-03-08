# Aktif Bağlam (Active Context)

## Mevcut Çalışma Odak Noktası
Şu anki odak noktası, yeni takipçiler eklendikçe evreni daha da genişletmektir. Yaratıcı, topluluk büyümesinin henüz erken aşamalarındadır ve yeni insanlar katıldıkça listeleri (örneğin `genesisFollowers`) manuel olarak güncellemektedir. Burada, geliştiricinin motivasyonunu korumak için daha hızlı büyüme umut ettiği duygusal bir bağlam da bulunmaktadır.

## Son Değişiklikler
- `Memory Core` (Hafıza Çekirdeği) hologram sisteminin entegre edilmesi.
- Farklı takipçi seviyelerini (ör. Kral, VIP kademeleri, standart Casper/Astronot modelleri) temsil etmek için özel `GLB` modellerinin eklenmesi.
- Genesis (Cennet) gezegeninde takipçilerin karmaşık hiyerarşik yerleşiminin düzenlenmesi.
- Zengin parçacık efektlerinin (Kar fırtınaları, Kül fırtınaları, Ateş böcekleri) entegrasyonu.

## Sonraki Adımlar
- Kitle büyümeye devam ettikçe JSON dosyalarına (`src/data/*.json`) yeni takipçiler eklemeye devam etmek.
- Yeni kullanıcıları ekleme sürecini daha da kolaylaştırmak (örneğin JSON dosyalarını güncellemek için bir sunucu veya arayüz kullanmak).
- Mevcut olanlar kapasite sınırlarına ulaştığında yeni ortamlar veya gezegenler oluşturmak.

## Aktif Kararlar ve Değerlendirmeler
- **Performans:** Takipçi sayısı arttıkça yüzlerce veya binlerce `GLTF` modelinin oluşturulması performansı etkileyecektir. Yakında R3F içindeki örneklendirme (Instancing - `<Instances>`) veya detay seviyesi (LOD) gibi tekniklere ihtiyaç duyulabilir.
- **Veri Yönetimi:** Takipçi listeleri artık `src/data` dizinindeki JSON dosyalarından çekilmektedir. Bu, kodu daha temiz tutar ve yeni takipçi eklemeyi kolaylaştırır.
