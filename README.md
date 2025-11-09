# Laporan React Query – Praktikum Performance Optimization

## 🧠 Perbandingan Waktu Respons
- **Tanpa React Query:** sekitar **150–200 ms** (filter manual setiap input).
- **Dengan React Query:** sekitar **20–40 ms** (cache otomatis digunakan).
- Pengujian dilakukan menggunakan **DevTools → Network dan Profiler tab**.

## 📸 Screenshot DevTools (Cache Hit)
![React Query Cache Hit](images/reactjs-cachehit.jpg)

## 💡 Penjelasan
React Query mengelola cache secara **otomatis di memori** dan hanya melakukan **refetch** bila data dianggap kadaluarsa atau invalid.  
Saat pengguna melakukan pencarian yang sama, React Query akan **menampilkan hasil langsung dari cache**, sehingga **waktu respons menjadi sangat cepat**.

## 🤔 Apakah Cache atau LocalStorage Membuat Aplikasi Lebih Baik?
✅ **Ya, sangat membantu.**  
Cache (baik manual maupun dari React Query) membuat aplikasi:
- Menghemat waktu load
- Mengurangi permintaan fetch berulang
- Membuat pengalaman pengguna lebih lancar

Namun, **React Query lebih unggul** karena:
- Cache otomatis disegarkan saat dibutuhkan
- Tidak perlu mengatur validasi atau penyimpanan secara manual
- Integrasi dengan DevTools untuk debugging mudah

## 🧩 Kesimpulan
Penggunaan React Query memberikan peningkatan performa signifikan dibanding cache manual.  
Aplikasi menjadi **lebih efisien, modern, dan scalable**, sesuai praktik terbaik industri web modern.

---

**Disusun oleh:**  
👨‍💻 Bryan Yogie Saputra  
📚 D3 Teknik Informatika – Universitas Sebelas Maret

