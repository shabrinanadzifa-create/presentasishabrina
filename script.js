document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideIndicator = document.getElementById('slideIndicator');
    const progressBar = document.getElementById('progressBar');
    const dotsNav = document.getElementById('dotsNav');
    const btnFullscreen = document.getElementById('btnFullscreen');

    let currentSlide = 0;
    const totalSlides = slides.length;

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot-btn');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsNav.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot-btn');

    function updatePresentation() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index < currentSlide) {
                slide.classList.add('prev');
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        slideIndicator.textContent = `Slide ${currentSlide + 1} / ${totalSlides}`;
        const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressPercent}%`;

        prevBtn.disabled = currentSlide === 0;
        nextBtn.textContent = currentSlide === totalSlides - 1 ? 'Ulangi ↺' : 'Selanjutnya →';
    }

    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            updatePresentation();
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft') {
            if (currentSlide > 0) goToSlide(currentSlide - 1);
        }
    });

    btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Gagal fullscreen: ${err.message}`);
            });
            btnFullscreen.textContent = '✕ Keluar Fullscreen';
        } else {
            document.exitFullscreen();
            btnFullscreen.textContent = '⛶ Fullscreen';
        }
    });

    updatePresentation();
});