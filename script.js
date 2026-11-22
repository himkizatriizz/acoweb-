/* ============================================================
   Media Ajar — Interaktiv JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Progress bar & navbar ---------- */
  const progressBar = document.getElementById('progressBar');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';

    navbar.classList.toggle('scrolled', scrollTop > 40);
    backToTop.classList.toggle('show', scrollTop > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const isDecimal = target % 1 !== 0;
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        el.textContent = isDecimal ? val.toFixed(1) : Math.round(val).toLocaleString('id-ID');
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Threat cards expand/collapse ---------- */
  document.querySelectorAll('.threat-card[data-expand]').forEach(card => {
    card.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');
      document.querySelectorAll('.threat-card.expanded').forEach(c => c.classList.remove('expanded'));
      if (!wasExpanded) card.classList.add('expanded');
    });
  });

  /* ============================================================
     QUIZ ENGINE
     ============================================================ */
  const quizData = [
    {
      q: 'Manakah yang termasuk kategori data pribadi sensitif menurut UU PDP?',
      options: [
        'Alamat email',
        'Data kesehatan dan biometrik',
        'Nomor telepon',
        'Nama lengkap'
      ],
      answer: 1,
      explain: 'Data kesehatan dan biometrik termasuk data pribadi sensitif yang memerlukan perlindungan lebih ketat karena berpotensi menimbulkan diskriminasi atau bahaya serius.'
    },
    {
      q: 'Serangan yang memancing korban memberikan password atau OTP melalui email atau situs palsu yang meniru bank disebut...',
      options: ['Ransomware', 'Phishing', 'Brute force', 'Doxxing'],
      answer: 1,
      explain: 'Phishing adalah serangan social engineering yang menggunakan pesan atau situs web palsu untuk mencuri kredensial dan data sensitif.'
    },
    {
      q: 'Teknik mencoba semua kemungkinan password secara otomatis untuk membobol akun disebut...',
      options: ['Credential stuffing', 'Brute force', 'Pharming', 'Spoofing'],
      answer: 1,
      explain: 'Brute force mencoba kombinasi password secara sistematis. Credential stuffing berbeda — itu memakai username/password hasil kebocoran pada situs lain.'
    },
    {
      q: 'Pasal berapa UU ITE yang mengatur akses ilegal ke sistem elektronik?',
      options: ['Pasal 27', 'Pasal 29', 'Pasal 30', 'Pasal 32'],
      answer: 2,
      explain: 'Pasal 30 UU ITE mengatur tindak pidana akses ilegal ke sistem elektronik. Pasal 32 mengatur intersepsi dan perubahan data.'
    },
    {
      q: 'Apa tujuan utama penyerang melakukan credential stuffing?',
      options: [
        'Mengubah data korban',
        'Memanfaatkan password yang dipakai ulang di berbagai akun',
        'Mengenkripsi file korban',
        'Menyebarkan malware'
      ],
      answer: 1,
      explain: 'Credential stuffing memanfaatkan kebiasaan buruk memakai password yang sama di banyak akun — kredensial hasil bocoran dicoba di layanan lain.'
    },
    {
      q: 'Hak subjek data untuk menghapus data pribadinya dikenal sebagai...',
      options: [
        'Right to access',
        'Right to be forgotten',
        'Data portability',
        'Consent withdrawal'
      ],
      answer: 1,
      explain: 'Right to be forgotten (hak untuk dilupakan) adalah hak subjek data meminta penghapusan data pribadi yang tidak relevan atau tidak lagi diperlukan.'
    },
    {
      q: 'Langkah paling efektif untuk melindungi akun dari pencurian kredensial adalah...',
      options: [
        'Mengganti password setiap minggu',
        'Mengaktifkan autentikasi multi-faktor (MFA)',
        'Menggunakan password yang mudah diingat',
        'Hanya login dari satu perangkat'
      ],
      answer: 1,
      explain: 'MFA menambahkan lapisan verifikasi kedua sehingga password yang bocor saja tidak cukup untuk mengakses akun. Kombinasi dengan password manager lebih kuat lagi.'
    },
    {
      q: 'Manakah yang BUKAN contoh social engineering?',
      options: [
        'Telepon palsu yang mengaku dari bank',
        'Email phishing berisi tautan berbahaya',
        'Virus yang menginfeksi komputer tanpa interaksi pengguna',
        'Pesan WhatsApp mendesak "klik link ini sekarang"'
      ],
      answer: 2,
      explain: 'Virus/worm adalah serangan berbasis malware yang bersifat teknis, bukan manipulasi psikologis. Social engineering selalu melibatkan manipulasi manusia.'
    }
  ];

  const quizContainer = document.getElementById('quizContainer');
  let current = 0;
  let score = 0;
  let answers = [];

  function renderIntro() {
    quizContainer.innerHTML = `
      <div class="quiz-intro">
        <div style="font-size:3rem; margin-bottom:10px;">📝</div>
        <h3>Kuis Pemahaman Materi</h3>
        <p>Terdiri dari ${quizData.length} soal pilihan ganda. Jawab dengan jujur untuk hasil evaluasi yang akurat!</p>
        <button class="btn btn-primary quiz-start-btn" id="quizStart">Mulai Kuis</button>
      </div>`;
    document.getElementById('quizStart').addEventListener('click', startQuiz);
  }

  function startQuiz() {
    current = 0;
    score = 0;
    answers = [];
    renderQuestion();
  }

  function renderQuestion() {
    const item = quizData[current];
    const progressPct = (current / quizData.length) * 100;

    quizContainer.innerHTML = `
      <div class="quiz-question">
        <div class="quiz-progress">
          <span>Soal ${current + 1} dari ${quizData.length}</span>
          <span>Skor: ${score}</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width:${progressPct}%"></div>
        </div>
        <h4>${item.q}</h4>
        <div class="quiz-options">
          ${item.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
        <div class="quiz-nav">
          <button class="btn btn-outline" id="quizPrev" ${current === 0 ? 'disabled style="opacity:.4;cursor:default"' : ''}>← Sebelumnya</button>
          <button class="btn btn-primary" id="quizNext" disabled>Selanjutnya →</button>
        </div>
      </div>`;

    const options = quizContainer.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('quizNext');
    const prevBtn = document.getElementById('quizPrev');
    let selected = null;
    let answered = false;

    options.forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        selected = parseInt(btn.dataset.index, 10);

        options.forEach(b => {
          const idx = parseInt(b.dataset.index, 10);
          if (idx === item.answer) b.classList.add('correct');
        });

        const isCorrect = selected === item.answer;
        if (!isCorrect) {
          btn.classList.add('wrong');
        }

        answers[current] = { selected, correct: isCorrect };
        answered = true;
        if (isCorrect) score++;

        feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct-fb' : 'wrong-fb');
        feedback.innerHTML = `
          <strong>${isCorrect ? '✅ Benar!' : '❌ Belum tepat.'}</strong><br>
          ${item.explain}
        `;
        nextBtn.disabled = false;
        nextBtn.textContent = current === quizData.length - 1 ? 'Lihat Hasil 🏁' : 'Selanjutnya →';
      });
    });

    nextBtn.addEventListener('click', () => {
      if (!answered) return;
      current++;
      if (current >= quizData.length) renderResult();
      else renderQuestion();
    });

    if (prevBtn && !prevBtn.disabled) {
      prevBtn.addEventListener('click', () => {
        if (current > 0) {
          current--;
          // Recalculate score from answers array
          score = answers.slice(0, current).filter(a => a && a.correct).length;
          renderQuestion();
        }
      });
    }

    quizContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function renderResult() {
    const pct = Math.round((score / quizData.length) * 100);
    let message;
    let emoji;
    if (pct >= 85) { message = 'Luar Biasa! Anda menguasai materi dengan sangat baik.'; emoji = '🏆'; }
    else if (pct >= 70) { message = 'Bagus! Pemahaman Anda sudah kuat — tinggal sedikit lagi sempurna.'; emoji = '🎉'; }
    else if (pct >= 50) { message = 'Cukup baik. Pelajari kembali bagian yang belum tepat.'; emoji = '📖'; }
    else { message = 'Jangan menyerah! Kembali ke materi dan coba lagi.'; emoji = '💪'; }

    const reviewHtml = quizData.map((item, i) => {
      const a = answers[i];
      const isOk = a && a.correct;
      return `
        <div class="review-item ${isOk ? 'ok' : 'bad'}">
          <div class="review-q">${i + 1}. ${item.q}</div>
          <div class="review-a">
            Jawaban Anda: <strong>${a ? item.options[a.selected] : '-'}</strong> ·
            Kunci: <strong>${item.options[item.answer]}</strong><br>
            <em>${item.explain}</em>
          </div>
        </div>`;
    }).join('');

    quizContainer.innerHTML = `
      <div class="quiz-result">
        <div style="font-size:3.5rem;">${emoji}</div>
        <div class="result-score">${score}/${quizData.length}</div>
        <div style="font-size:1.2rem; font-weight:700; color:var(--primary); margin-bottom:8px;">Skor: ${pct}%</div>
        <p class="result-message">${message}</p>
        <button class="btn btn-outline" id="quizRetake" style="color:var(--text-dark);border-color:var(--border);margin-bottom:30px;">🔄 Ulangi Kuis</button>
        <div class="result-review">
          <h4 style="text-align:left; margin-bottom:16px;">📋 Review Jawaban</h4>
          ${reviewHtml}
        </div>
      </div>`;

    document.getElementById('quizRetake').addEventListener('click', startQuiz);
    quizContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- Glitch effect pada judul hero ---------- */
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    setInterval(() => {
      heroTitle.classList.add('glitching');
      setTimeout(() => heroTitle.classList.remove('glitching'), 350);
    }, 3500);
  }

  /* ---------- Init ---------- */
  renderIntro();
})();
