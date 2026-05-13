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
    // 12. Download Page-Scroll MP4 Video
    const dlBtn = document.getElementById('download-video-btn');

    dlBtn.addEventListener('click', async () => {
        dlBtn.disabled = true;
        dlBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-pastelBlue"></i>';

        Swal.fire({
            title: '🎬 Generating MP4...',
            html: `<div style="background:rgba(255,255,255,0.1);border-radius:8px;overflow:hidden;height:8px;margin-bottom:10px">
                     <div id="sw-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#B6E3E9,#FBD1D7);transition:width 0.3s"></div>
                   </div>
                   <p id="sw-txt" style="color:rgba(255,255,255,0.6);font-size:13px">Preparing...</p>`,
            allowOutsideClick: false, showConfirmButton: false,
            background: '#1a1a1a', color: '#fff'
        });

        const setProg = (p, t) => {
            const b = document.getElementById('sw-bar'), l = document.getElementById('sw-txt');
            if (b) b.style.width = p + '%';
            if (l) l.textContent = t;
        };

        try {
            if (!window.VideoEncoder || !window.VideoFrame) {
                throw new Error('WebCodecs not supported. Please use Chrome or Edge browser.');
            }

            // Temporarily fix styles for capture
            setProg(2, 'Pre-processing styles…');
            const toHide = ['music-container','scroll-progress','back-to-top','download-video-btn'];
            toHide.forEach(id => { const e = document.getElementById(id); if (e) e.style.display = 'none'; });
            
            // Force AOS elements to be fully visible and opaque
            const originalStyles = new Map();
            document.querySelectorAll('[data-aos]').forEach(el => {
                originalStyles.set(el, el.getAttribute('style') || '');
                el.style.setProperty('opacity', '1', 'important');
                el.style.setProperty('transform', 'none', 'important');
                el.style.setProperty('transition', 'none', 'important');
            });

            // Force typing animation to complete instantly for the video
            const typeEl = document.getElementById('typing-text');
            if (typeEl && typeof messageText !== 'undefined') {
                typeEl.innerHTML = messageText;
                if (typeof index !== 'undefined') index = messageText.length;
            }

            // Temporarily fix bg-clip-text for html2canvas (which makes text invisible)
            const celebrateSpan = document.querySelector('#celebrate-btn span');
            let oldSpanClasses = '';
            if (celebrateSpan) {
                oldSpanClasses = celebrateSpan.className;
                celebrateSpan.className = 'relative z-10 text-xl font-semibold text-pastelPink flex items-center space-x-3';
            }

            // html2canvas DOES NOT support CSS 'columns-X' which causes vertical squished lines.
            // Temporarily convert the gallery to a Flexbox Masonry so it captures perfectly while keeping the original layout.
            const soloGrid = document.getElementById('solo-grid');
            let oldSoloHTML = '';
            let oldSoloClasses = '';
            if (soloGrid) {
                oldSoloHTML = soloGrid.innerHTML;
                oldSoloClasses = soloGrid.className;
                
                const items = Array.from(soloGrid.children);
                const cols = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 3 : (window.innerWidth >= 640 ? 2 : 1));
                
                const colDivs = Array.from({length: cols}, () => {
                    const d = document.createElement('div');
                    d.className = 'flex flex-col gap-6 w-full';
                    return d;
                });
                
                const itemsPerCol = Math.ceil(items.length / cols);
                items.forEach((item, i) => {
                    const colIndex = Math.floor(i / itemsPerCol);
                    if (colDivs[colIndex]) {
                        colDivs[colIndex].appendChild(item.cloneNode(true));
                    } else {
                        colDivs[cols - 1].appendChild(item.cloneNode(true));
                    }
                });
                
                soloGrid.innerHTML = '';
                soloGrid.className = 'flex gap-6 items-start w-full';
                colDivs.forEach(col => soloGrid.appendChild(col));
            }

            // html2canvas bug: object-fit: cover images get stretched/distorted.
            // Temporarily replace them with background-image divs.
            const objectFitImages = document.querySelectorAll('img.object-cover');
            const replacedImages = [];
            objectFitImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                const wrapper = document.createElement('div');
                wrapper.style.width = rect.width + 'px';
                wrapper.style.height = rect.height + 'px';
                wrapper.style.backgroundImage = `url("${img.src}")`;
                wrapper.style.backgroundSize = 'cover';
                wrapper.style.backgroundPosition = 'center';
                wrapper.style.borderRadius = window.getComputedStyle(img).borderRadius;
                wrapper.className = img.className; // copy classes
                
                img.parentNode.insertBefore(wrapper, img);
                img.style.display = 'none';
                replacedImages.push({ img, wrapper });
            });

            // Hide the sweetalert popup from the screenshot
            const swalContainer = document.querySelector('.swal2-container');
            const oldSwalDisplay = swalContainer ? swalContainer.style.display : '';
            if (swalContainer) swalContainer.style.display = 'none';

            window.scrollTo(0, 0);
            await new Promise(r => setTimeout(r, 800)); // wait for layout to settle

            setProg(5, 'Capturing full page (this may take a moment)…');
            
            // Capture normal page with html2canvas
            const pageCanvas = await html2canvas(document.body, {
                scale: 1, useCORS: true, allowTaint: true, logging: false,
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight,
                windowWidth: document.documentElement.scrollWidth,
                scrollX: 0, scrollY: 0
            });

            setProg(12, 'Capturing celebration…');
            
            // Now, scroll to bottom, trigger the button to show popup and confetti!
            if (swalContainer) swalContainer.style.display = oldSwalDisplay;
            window.scrollTo(0, document.documentElement.scrollHeight);
            const celBtn = document.getElementById('celebrate-btn');
            if (celBtn) celBtn.click();
            await new Promise(r => setTimeout(r, 800)); // wait for Swal and confetti to animate in

            // Hide UI chrome again just in case
            toHide.forEach(id => { const e = document.getElementById(id); if (e) e.style.display = 'none'; });
            const popupContainer = document.querySelector('.swal2-container');
            if (popupContainer) popupContainer.style.background = 'transparent'; // keep background clean

            // Capture the popup frame (viewport only)
            const popupCanvas = await html2canvas(document.body, {
                scale: 1, useCORS: true, allowTaint: true, logging: false,
                width: window.innerWidth,
                height: window.innerHeight,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                scrollX: window.scrollX, scrollY: window.scrollY,
                y: window.scrollY
            });

            // Close Swal
            Swal.close();

            // Restore UI and Styles
            if (celebrateSpan) celebrateSpan.className = oldSpanClasses;
            if (soloGrid) {
                soloGrid.innerHTML = oldSoloHTML;
                soloGrid.className = oldSoloClasses;
            }
            replacedImages.forEach(({ img, wrapper }) => {
                if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
                img.style.display = '';
            });
            toHide.forEach(id => { const e = document.getElementById(id); if (e) e.style.display = ''; });
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.setAttribute('style', originalStyles.get(el) || '');
            });

            setProg(20, 'Setting up encoder…');

            // Video dimensions: 720p HD (Dynamically choose Portrait for Mobile or Landscape for Desktop)
            const isMobile = window.innerWidth < window.innerHeight;
            const W = isMobile ? 720 : 1280;
            const H = isMobile ? 1280 : 720;
            const FPS = 60; // 60 FPS for perfectly smooth scrolling without judder
            const PAUSE = 2.5, SCROLL = 55, TOTAL = PAUSE * 2 + SCROLL; // Exactly 60 seconds (1 minute)
            const FRAMES = TOTAL * FPS;

            // Scale captured page to fit video width
            const scaleX = W / pageCanvas.width;
            const scaledH = pageCanvas.height * scaleX;
            const maxScroll = Math.max(0, scaledH - H);

            const vCanvas = document.createElement('canvas');
            vCanvas.width = W; vCanvas.height = H;
            const vCtx = vCanvas.getContext('2d');

            // MP4 muxer
            const { Muxer, ArrayBufferTarget } = Mp4Muxer;
            const target = new ArrayBufferTarget();
            const muxer = new Muxer({
                target,
                video: { codec: 'avc', width: W, height: H },
                audio: { codec: 'aac', sampleRate: 44100, numberOfChannels: 2 },
                fastStart: 'in-memory'
            });

            // Video encoder
            const vEnc = new VideoEncoder({
                output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
                error: e => { throw e; }
            });
            vEnc.configure({
                codec: 'avc1.42001f', width: W, height: H,
                bitrate: 3_000_000, // 3 Mbps is perfect for smooth 720p playback on all devices
                framerate: FPS
            });

            // Scale for popup
            const popScaleX = W / popupCanvas.width;
            const popScaledH = popupCanvas.height * popScaleX;

            // Encode video frames (off-screen, fast loop)
            for (let f = 0; f < FRAMES; f++) {
                const sec = f / FPS;
                let scrollY = 0;
                
                vCtx.fillStyle = '#0a0a0a';
                vCtx.fillRect(0, 0, W, H);

                // Show the popup in the last 2 seconds (during the final PAUSE)
                if (sec >= PAUSE + SCROLL) {
                    vCtx.drawImage(popupCanvas, 0, 0, popupCanvas.width, popupCanvas.height, 0, 0, W, popScaledH);
                } else {
                    if (sec > PAUSE && sec < PAUSE + SCROLL) {
                        const t = (sec - PAUSE) / SCROLL;
                        // linear scroll for perfect constant speed (prevents dizzying acceleration)
                        scrollY = t * maxScroll;
                    } else if (sec >= PAUSE + SCROLL) {
                        scrollY = maxScroll;
                    }

                    // Use floating point coordinates for sub-pixel smoothness (removes "shaking" jitter)
                    const srcY = scrollY / scaleX;
                    const srcH = Math.min(pageCanvas.height - srcY, H / scaleX);
                    const destH = srcH * scaleX;
                    
                    vCtx.drawImage(pageCanvas, 0, srcY, pageCanvas.width, srcH, 0, 0, W, destH);
                }

                const frame = new VideoFrame(vCanvas, {
                    timestamp: Math.round((f / FPS) * 1e6),
                    duration: Math.round(1e6 / FPS)
                });
                while (vEnc.encodeQueueSize > 20) await new Promise(r => setTimeout(r, 30));
                vEnc.encode(frame, { keyFrame: f % (FPS * 2) === 0 });
                frame.close();

                if (f % 60 === 0) {
                    setProg(20 + Math.round((f / FRAMES) * 55), `Encoding frame ${f + 1}/${FRAMES}…`);
                    await new Promise(r => setTimeout(r, 0));
                }
            }
            await vEnc.flush();

            // Audio encoder
            setProg(78, 'Encoding audio (high quality)…');
            const audioCtx = new AudioContext({ sampleRate: 44100 });
            const resp = await fetch('assets/music/lifetime.mp3');
            const audioBuf = await audioCtx.decodeAudioData(await resp.arrayBuffer());
            await audioCtx.close();

            const aEnc = new AudioEncoder({
                output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
                error: e => { throw e; }
            });
            aEnc.configure({ codec: 'mp4a.40.2', sampleRate: 44100, numberOfChannels: 2, bitrate: 192000 });

            const SR = 44100;
            const CHUNK = 44100; // 1-second chunks to prevent encoder overload (crash)
            const totalSamples = TOTAL * SR;
            const ch0 = audioBuf.getChannelData(0);
            const ch1 = audioBuf.numberOfChannels > 1 ? audioBuf.getChannelData(1) : ch0;
            const srcLen = audioBuf.length;

            // Start audio exactly where the live background music is currently playing
            const musicEl = document.getElementById('bg-music');
            let startOffsetSamples = 0;
            if (musicEl && !musicEl.paused) {
                startOffsetSamples = Math.floor(musicEl.currentTime * SR);
            }

            // Smooth fade-out for the last 3 seconds
            const fadeOutSamples = 3 * SR;
            const fadeOutStart = totalSamples - fadeOutSamples;

            for (let i = 0; i < totalSamples; i += CHUNK) {
                const n = Math.min(CHUNK, totalSamples - i);
                const d = new Float32Array(n * 2);
                for (let s = 0; s < n; s++) {
                    const currentSample = i + s;
                    const idx = (startOffsetSamples + currentSample) % srcLen;
                    
                    let volume = 1.0;
                    if (currentSample > fadeOutStart) {
                        volume = 1.0 - ((currentSample - fadeOutStart) / fadeOutSamples);
                    }

                    d[s] = ch0[idx] * volume;
                    d[n + s] = ch1[idx] * volume;
                }
                const ad = new AudioData({ format: 'f32-planar', sampleRate: SR, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round((i / SR) * 1e6), data: d });
                while (aEnc.encodeQueueSize > 5) await new Promise(r => setTimeout(r, 50));
                aEnc.encode(ad); ad.close();
            }
            await aEnc.flush();

            setProg(95, 'Finalizing MP4…');
            muxer.finalize();

            const blob = new Blob([target.buffer], { type: 'video/mp4' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'micay-birthday.mp4';
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(url);

            dlBtn.disabled = false;
            dlBtn.innerHTML = '<i class="fa-solid fa-clapperboard text-pastelBlue"></i>';
            Swal.fire({ title: '🎉 MP4 Ready!', text: 'micay-birthday.mp4 has been downloaded!', icon: 'success', background: '#1a1a1a', color: '#fff', confirmButtonColor: '#B6E3E9' });

        } catch (err) {
            console.error(err);
            dlBtn.disabled = false;
            dlBtn.innerHTML = '<i class="fa-solid fa-clapperboard text-pastelBlue"></i>';
            const msg = err && err.message ? err.message : String(err);
            Swal.fire({ title: 'Error', html: `<p>${msg}</p><small style="opacity:.6">Use Chrome or Edge for best results.</small>`, icon: 'error', background: '#1a1a1a', color: '#fff', confirmButtonColor: '#B6E3E9' });
        }
    });
});
