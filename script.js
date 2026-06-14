// =============================================================
// FUNGSI NAVIGASI UTAMA (MAJU SCREEN)
// =============================================================
function nextScreen(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(screenId);
    
    if (!targetScreen) {
        console.error("Gagal pindah halaman: ID '" + screenId + "' tidak ditemukan!");
        return;
    }

    if (currentScreen) {
        currentScreen.classList.remove('active');
        currentScreen.classList.add('slide-out');
        
        setTimeout(() => {
            currentScreen.classList.remove('slide-out');
        }, 600); // Menyesuaikan durasi CSS (0.6s)
    }
    
    targetScreen.classList.add('active');

    // JALANKAN EFEK BUNGA & LOVE JATUH JIKA MENUJU SCREEN BIRTHDAY
    if (screenId === 'screen-birthday') {
        buatEfekBungaGugur();
    }
}

// =============================================================
// FUNGSI NAVIGASI UTAMA BARU (MUNDUR / UNDO SCREEN KAPANPUN)
// =============================================================
function mundurScreen(targetId) {
    const currentScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(targetId);
    const musik = document.getElementById('bg-music');

    if (!targetScreen) return;

    // KONDISI KHUSUS: Jika mundur sampai ke halaman Kado, reset total musik dan kado
    if (targetId === 'screen-gift') {
        // Stop musik dan kembalikan ke detik 0
        if (musik) {
            musik.pause();
            musik.currentTime = 0;
        }

        // Matikan paksa sisa efek mengetik surat yang sedang berjalan
        if (timerKetik) clearTimeout(timerKetik);

        // Pasang ulang animasi kado tertutup agar bisa diklik lagi
        const kadoMain = document.querySelector('.gift-main');
        const kadoLid = document.querySelector('.gift-lid');
        const kadoRibbonH = document.querySelector('.gift-ribbon-h');
        if (kadoLid) kadoLid.style.transform = 'translateY(0) rotate(0)';
        if (kadoRibbonH) kadoRibbonH.style.transform = 'translateY(0)';
        if (kadoMain) kadoMain.classList.remove('gift-opened');

        const giftTitle = document.getElementById('gift-title-text');
        const giftSubtitle = document.getElementById('gift-subtitle-text');
        if(giftTitle) giftTitle.innerText = "🎁 Hadiah Spesial Buat Oni"; 
        if(giftSubtitle) giftSubtitle.innerText = "Coba ketuk kadonya deh... ✨";
    }

    // KONDISI KHUSUS: Jika mundur dari halaman ucapan akhir ke galeri, matikan interval bunga
    if (currentScreen && currentScreen.id === 'screen-birthday') {
        // Jika ada logic pembersihan efek bunga, bisa ditaruh di sini
    }

    // Eksekusi perpindahan mundur secara visual
    if (currentScreen) {
        currentScreen.classList.remove('active');
    }
    targetScreen.classList.add('active');

    // KONDISI KHUSUS: Jika mundur dari galeri kembali ke surat, ketikan harus otomatis ter-skip biar teksnya langsung utuh
    if (targetId === 'screen-message') {
        skipKetikSurat();
    }
}

// =============================================================
// LOGIKA GENERATOR KELOPAK BUNGA & LOVE JATUH
// =============================================================
function buatEfekBungaGugur() {
    const container = document.getElementById('flowers-container');
    if (!container) return;

    container.innerHTML = ''; 
    const listKarakter = ['🌸', '✨', '💖', '🌹', '💗']; 

    setInterval(() => {
        const screenBirthday = document.getElementById('screen-birthday');
        if (!screenBirthday || !screenBirthday.classList.contains('active')) return;

        const element = document.createElement('div');
        element.className = 'falling-element';
        
        element.innerText = listKarakter[Math.floor(Math.random() * listKarakter.length)];
        element.style.left = Math.random() * 100 + '%';
        
        const ukuranAcak = Math.random() * 12 + 12; 
        element.style.fontSize = ukuranAcak + 'px';
        element.style.animationDuration = Math.random() * 3 + 4 + 's'; 
        
        container.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, 7000);
    }, 350); 
}

// =============================================================
// LOGIKA PEMBUKAAN KADO (HENING & MEMICU SURAT DI SINI)
// =============================================================
function bukaKado() {
    const kadoMain = document.querySelector('.gift-main');
    const kadoLid = document.querySelector('.gift-lid');
    
    if (kadoMain.classList.contains('gift-opened')) return;

    // Animasi tutup kado terbuka
    if (kadoLid) kadoLid.style.transform = 'translateY(-60px) rotate(-10deg)';
    kadoMain.classList.add('gift-opened');

    // MENGELUARKAN SURAT TERBANG
    const surat = document.createElement('div');
    surat.innerHTML = '💌'; // Bisa diganti dengan gambar surat
    surat.style.fontSize = '80px';
    surat.style.position = 'absolute';
    surat.style.zIndex = '999';
    surat.className = 'surat-terbang';
    
    // Tambahkan surat ke kontainer kado
    document.querySelector('.gift-container-box').appendChild(surat);

    // Setelah animasi selesai, pindah ke halaman surat
    setTimeout(() => {
        nextScreen('screen-message');
        mulaiEfekKetik();
        surat.remove(); // Hapus elemen surat setelah selesai
    }, 1200);
}

// =============================================================
// LOGIKA EFEK CHAT INSTAGRAM AUTOMATION
// =============================================================
function tampilkanEfekKetik(callback, durasi) {
    const typingBubble = document.getElementById('typing-bubble');
    const chatBox = document.getElementById('chat-box');
    const statusTeks = document.querySelector('.user-text small');

    if (!typingBubble || !chatBox) {
        if (typeof callback === "function") callback();
        return;
    }

    typingBubble.classList.remove('hidden');
    if (statusTeks) statusTeks.innerText = "Typing...";
    
    chatBox.appendChild(typingBubble); 
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        typingBubble.classList.add('hidden');
        if (statusTeks) statusTeks.innerText = "Active now";
        if (typeof callback === "function") callback();
    }, durasi);
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        tampilkanEfekKetik(() => {
            appendChatBubble("WOI", 'gray');
            setTimeout(() => {
                tampilkanEfekKetik(() => {
                    appendChatBubble("jwb dulu.", 'gray');
                    setTimeout(() => {
                        tampilkanEfekKetik(() => {
                            appendChatBubble("siapa lu?", 'gray');
                        }, 1200);
                    }, 1000);
                }, 1500);
            }, 1000);
        }, 1000);
    }, 500);
});

function kirimNama() {
    const inputElement = document.getElementById('chat-input');
    if (!inputElement) return;
    
    const namaUser = inputElement.value.trim();
    if (namaUser === "") return;

    appendChatBubble(namaUser, 'purple');
    inputElement.value = ""; 
    setelahKirimPesan();     

    setTimeout(() => {
        tampilkanEfekKetik(() => {
            if (namaUser.toLowerCase() === "afifah qonita") {
                appendChatBubble("halo sayanggggg", 'gray');
                setTimeout(() => {
                    tampilkanEfekKetik(() => {
                        appendChatBubble("coba tebak siapa aku", 'gray');
                        const inputBox = document.getElementById('input-box');
                        const quizBox = document.getElementById('quiz-box');
                        if (inputBox) inputBox.classList.add('hidden');
                        if (quizBox) quizBox.classList.remove('hidden');
                    }, 1500);
                }, 1000);
            } else {
                appendChatBubble("Sok Asik.", 'gray');
            }
        }, 1200);
    }, 500);
}

function pilihKuis(status) {
    if (status === 'salah') {
        tampilkanEfekKetik(() => {
            appendChatBubble("oh.", 'gray');
        }, 800);
    } else if (status === 'benar') {
        const quizBox = document.getElementById('quiz-box');
        const inputBox = document.getElementById('input-box');
        
        if (quizBox) quizBox.classList.add('hidden');
        if (inputBox) inputBox.classList.remove('hidden');

        const avatarProfil = document.getElementById('avatar-profil');
        if (avatarProfil) {
            avatarProfil.src = "assets/img/foto-profil.jpeg";
        }

        const teksOpsiBenar = "C. hafiz ganteng hebat kuat sexy dan berotot pintar jenius setia ganteng anak itb fighter terbaik calon orang sukses bukan npd";
        appendChatBubble(teksOpsiBenar, 'purple');
        
        setTimeout(() => {
            const usernameTeks = document.getElementById('chat-username');
            if (usernameTeks) usernameTeks.innerText = "SumtatBukanPantat";
            
            tampilkanEfekKetik(() => {
                appendChatBubble("Yeay bener! 🥰", 'gray');
                setTimeout(() => {
                    tampilkanEfekKetik(() => {
                        appendChatBubble("Hebat kamu", 'gray');
                        setTimeout(() => {
                            tampilkanEfekKetik(() => {
                                appendChatBubble("Aku ada sesuatu buat kamu", 'gray');
                                setTimeout(() => {
                                    tampilkanEfekKetik(() => {
                                        appendChatBubble("🎁 Ketuk hadiahnya!", 'gray');
                                        setTimeout(() => {
                                            nextScreen('screen-gift');
                                        }, 1000);
                                    }, 1200);
                                }, 1000);
                            }, 1200);
                        }, 1000);
                    }, 1200);
                }, 1000);
            }, 1500);
        }, 1000);
    }
}

function appendChatBubble(text, className) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    const bubble = document.createElement('div');
    bubble.className = `bubble ${className} animate-pop`;
    bubble.innerText = text;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

const chatInput = document.getElementById('chat-input');
const iconsRight = document.getElementById('chat-icons-right');
const sendBtn = document.getElementById('send-btn');

if (chatInput) {
    chatInput.addEventListener('input', function() {
        if (chatInput.value.trim() !== "") {
            if (iconsRight) iconsRight.classList.add('hide-elements');
            if (sendBtn) sendBtn.classList.remove('hidden-send');
        } else {
            if (iconsRight) iconsRight.classList.remove('hide-elements');
            if (sendBtn) sendBtn.classList.add('hidden-send');
        }
    });

    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') kirimNama();
    });
}

function setelahKirimPesan() {
    if (iconsRight) iconsRight.classList.remove('hide-elements');
    if (sendBtn) sendBtn.classList.add('hidden-send');
}

// =============================================================
// LOGIKA EFEK KETIKAN (TYPEWRITER) + MANAJEMEN TIMER
// =============================================================
const isiSurat = `Haloo Oni, selamat ulang tahun ya! Jujur aku bingung banget mau nulis ucapan kayak gimana biar pas, tapi intinya aku sayangggggggggggggggggggg banget sama kamu. 

Makasih banyak yaa selama ini kamu selalu ada buat aku. Kamu tuh pengertian banget, terus sabar lagi ngebujuk atau nemenin aku. Kadang kalau dipikir-pikir lucu juga, kamu jarang banget ngambek, malah kebalikannya—aku yang lebih sering ngambekan ke kamu, hahaha. Makasih ya udah selalu ngalah dan mau maklumin sifat aku yang satu itu.

Maaf ya kalau di hari ulang tahunmu ini aku belum bisa ngasih kado yang mewah atau barang-barang bagus yang kamu pengen. Aku cuma bisa bikin website sederhana ini, anggap aja tempat kecil buat ngerayain hari lahirmu. 

Di umur yang baru ini, semoga kamu sehat-sehat terus, dilancarin semua urusannya, dan bahagia selalu setiap hari. Makasih udah lahir ke dunia, dan makasih udah jadi bagian paling menyenangkan di hidup aku. 

Jangan pernah bosen jadi orang baik ya, Oni. Sekali lagi, happy birthday!`;

let indeksKarakter = 0;
let timerKetik = null; 

function mulaiEfekKetik() {
    const elemenTeks = document.getElementById('typewriter-text');
    const tombolGaleri = document.getElementById('btn-lanjut-galeri');
    const tombolSkip = document.getElementById('btn-skip-ketik');
    const musik = document.getElementById('bg-music'); 

    if (musik && musik.paused) {
        musik.volume = 0.5; 
        musik.play().catch(error => console.log("Musik tertahan browser:", error));
    }

    if (!elemenTeks) return;

    elemenTeks.innerHTML = "";
    indeksKarakter = 0;
    if (tombolGaleri) tombolGaleri.classList.add('hidden'); 
    if (tombolSkip) tombolSkip.classList.remove('hidden'); 
    elemenTeks.classList.remove('selesai');
    
    jalankanKetik();
}

function jalankanKetik() {
    const elemenTeks = document.getElementById('typewriter-text');
    const tombolGaleri = document.getElementById('btn-lanjut-galeri');
    const tombolSkip = document.getElementById('btn-skip-ketik');

    if (indeksKarakter < isiSurat.length) {
        elemenTeks.innerHTML += isiSurat.charAt(indeksKarakter);
        indeksKarakter++;
        timerKetik = setTimeout(jalankanKetik, 60); 
    } else {
        if (elemenTeks) elemenTeks.classList.add('selesai'); 
        if (tombolSkip) tombolSkip.classList.add('hidden'); 
        if (tombolGaleri) {
            tombolGaleri.classList.remove('hidden'); 
            tombolGaleri.classList.add('animate-pop');
        }
    }
}

function skipKetikSurat() {
    const elemenTeks = document.getElementById('typewriter-text');
    const tombolGaleri = document.getElementById('btn-lanjut-galeri');
    const tombolSkip = document.getElementById('btn-skip-ketik');

    if (timerKetik) clearTimeout(timerKetik);

    if (elemenTeks) {
        elemenTeks.innerHTML = isiSurat;
        elemenTeks.classList.add('selesai');
    }

    if (tombolSkip) tombolSkip.classList.add('hidden');
    if (tombolGaleri) {
        tombolGaleri.classList.remove('hidden');
        tombolGaleri.classList.add('animate-pop');
    }
}

document.querySelectorAll('.polaroid').forEach(polaroid => {
    polaroid.addEventListener('click', function() {
        const img = this.querySelector('img');

        modalImg.src = img.src;
        modalJudul.innerText = this.getAttribute('data-judul') || "Special Memory";
        modalCaption.innerText = this.getAttribute('data-caption') || "";

        modal.classList.remove('show');

        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    });
});



// Hapus semua addEventListener('click') untuk .polaroid yang lama
// Lalu gunakan satu blok ini saja di paling bawah script.js:

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalJudul = document.getElementById('modal-judul');
    const modalCaption = document.getElementById('modal-caption');

    document.querySelectorAll('.polaroid').forEach(polaroid => {
        polaroid.addEventListener('click', function() {
            const img = this.querySelector('img');
            const judul = this.getAttribute('data-judul') || "Special Memory";
            const caption = this.getAttribute('data-caption') || "";

            modalImg.src = img.src;
            modalJudul.innerText = judul;
            modalCaption.innerText = caption;

            modal.classList.add('show');
        });
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            tutupModal();
        }
    });
});

function tutupModal() {
    document.getElementById('photo-modal').classList.remove('show');
}