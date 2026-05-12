document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // 2. Loading Screen Logic
    const loader = document.getElementById('loader');
    // Create particles for loader
    const loaderParticles = document.getElementById('loader-particles');
    if (loaderParticles) {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'loader-particle';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.width = (Math.random() * 5 + 2) + 'px';
            p.style.height = p.style.width;
            p.style.animationDuration = (Math.random() * 3 + 2) + 's';
            p.style.animationDelay = Math.random() * 5 + 's';
            loaderParticles.appendChild(p);
        }
    }

    const hideLoader = () => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            loader.style.display = 'none';
            showWelcomePopup();
        }, 1000);
    };

    // Hide loader when page is fully loaded OR after 3 seconds fallback
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 3000); // Fallback to ensure user isn't stuck

    // 3. SweetAlert2 Welcome Message
    function showWelcomePopup() {
        Swal.fire({
            title: 'Happy 22nd Birthday Micay 🎉',
            text: 'I never expected that we would become this close, but I’m truly thankful for our friendship. Soon, we’ll finally graduate together with Team Blue. Enjoy your special day and keep shining always!',
            confirmButtonText: 'Open Surprise',
            confirmButtonColor: '#B6E3E9',
            background: '#1a1a1a',
            color: '#fff',
            backdrop: `rgba(0,0,0,0.8)`,
            showClass: {
                popup: 'animate__animated animate__zoomIn'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                triggerConfetti();
                // Try to autoplay music after user interaction
                const music = document.getElementById('bg-music');
                music.play().catch(e => console.log("Autoplay prevented, waiting for user interaction."));
                updateMusicUI();
            }
        });
    }

    // 4. Confetti Logic
    function triggerConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // 5. Music Player Logic
    const music = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const musicProgress = document.getElementById('music-progress');

    function updateMusicUI() {
        if (music.paused) {
            musicIcon.classList.replace('fa-pause', 'fa-play');
        } else {
            musicIcon.classList.replace('fa-play', 'fa-pause');
        }
    }

    musicToggle.addEventListener('click', () => {
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
        updateMusicUI();
    });

    music.addEventListener('timeupdate', () => {
        const progress = (music.currentTime / music.duration) * 100;
        musicProgress.style.width = `${progress}%`;
    });

    // 6. Typing Animation
    const messageText = "Happy 22nd Birthday, Micay! Thank you for being such an amazing friend and classmate. I’m grateful for every memory, laughter, and moment we shared together. Soon, we’ll finally achieve our dreams and graduate together with Team Blue. Wishing you happiness, success, and endless blessings always.";
    const typingElement = document.getElementById('typing-text');
    let index = 0;

    function typeMessage() {
        if (index < messageText.length) {
            typingElement.textContent += messageText.charAt(index);
            index++;
            setTimeout(typeMessage, 50);
        }
    }

    // Start typing when section is visible
    const messageSection = document.getElementById('message');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeMessage();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(messageSection);

    // 7. Celebrate Button logic
    const celebrateBtn = document.getElementById('celebrate-btn');
    celebrateBtn.addEventListener('click', () => {
        triggerConfetti();
        Swal.fire({
            title: 'Happy Birthday Micay! 🎂',
            text: 'Keep shining and stay amazing. Team Blue loves you!',
            icon: 'success',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#FBD1D7',
        });
    });

    // 8. Scroll Progress & Back to Top
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;

        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(40px)';
            backToTop.style.pointerEvents = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // 10. Image Modal logic
    window.openModal = function(src) {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-img');
        modalImg.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        const modal = document.getElementById('image-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Close modal on background click
    document.getElementById('image-modal').addEventListener('click', (e) => {
        if (e.target.id === 'image-modal') closeModal();
    });


    // 11. Particles Background for Hero
    // Injecting simple floating particles for background
    const hero = document.getElementById('hero');
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'absolute bg-white rounded-full opacity-20 pointer-events-none animate-pulse';
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        hero.appendChild(star);
    }
});
