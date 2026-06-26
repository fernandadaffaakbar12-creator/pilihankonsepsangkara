// Tempat menyimpan data asli dari data.json
let semuaData = [];

// 1. Ambil data dari file data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        semuaData = data;
        // Tampilan awal saat web dibuka: Langsung balik urutan agar yang terbaru di atas
        tampilkanGaleri([...semuaData].reverse()); 
        inisialisasiFilter();       
    })
    .catch(error => console.error('Gagal memuat file data.json:', error));

// 2. Fungsi Utama untuk merakit kartu portofolio ke layar
function tampilkanGaleri(daftarKarya) {
    const container = document.getElementById('gallery-container');
    container.innerHTML = ''; // Bersihkan isi galeri lama

    if (daftarKarya.length === 0) {
        container.innerHTML = '<p style="grid-column: span 2; text-align: center; color: #888;">Tidak ada karya ditemukan.</p>';
        return;
    }

    daftarKarya.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        // Membuat elemen gambar dengan Lazy Loading
        const img = document.createElement('img');
        img.src = item.image;
        img.loading = "lazy"; 
        img.alt = item.title;

        // Membuat elemen judul
        const title = document.createElement('h2');
        title.textContent = item.title;

        // SATUKAN ELEMEN: Hanya memasukkan gambar dan judul ke dalam kartu
        // (Bagian pembuatan tombol salin sudah dihapus dari sini)
        card.appendChild(img);
        card.appendChild(title);
        
        container.appendChild(card);
    });
}

// 3. Fungsi Logika Penyortiran Kategori
function inisialisasiFilter() {
    const tombolFilter = document.querySelectorAll('.filter-btn');

    tombolFilter.forEach(tombol => {
        tombol.addEventListener('click', () => {
            tombolFilter.forEach(b => b.classList.remove('active'));
            tombol.classList.add('active');

            const kategori = tombol.getAttribute('data-category');

            if (kategori === 'semua' || kategori === 'terbaru') {
                tampilkanGaleri([...semuaData].reverse());
            } 
            else {
                const dataDisaring = semuaData.filter(item => item.category === kategori);
                tampilkanGaleri([...dataDisaring].reverse());
            }
        });
    });
}

// (Fungsi salinPrompt telah dihapus karena sudah tidak dibutuhkan)