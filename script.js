document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       INTRO SCREEN (iPhone Hello Effect)
    ========================================================================= */
    const introScreen = document.getElementById('intro-screen');
    const introGreeting = document.getElementById('intro-greeting');
    const greetings = ["Hello", "Hola", "Bonjour", "Ciao", "Namaste", "こんにちは", "Привет", "مرحبا", "Hi"];
    let greetingIndex = 0;

    if (introScreen && introGreeting) {
        // Prevent scrolling while intro is active
        document.body.style.overflow = 'hidden';

        // Initial fade in for the first word
        setTimeout(() => {
            introGreeting.style.opacity = 1;
        }, 300);

        const playIntro = () => {
            if (greetingIndex < greetings.length - 1) {
                // Fade out current word
                introGreeting.style.opacity = 0;
                
                setTimeout(() => {
                    greetingIndex++;
                    introGreeting.textContent = greetings[greetingIndex];
                    // Fade in new word
                    introGreeting.style.opacity = 1;
                    
                    // Wait before repeating cycle
                    setTimeout(playIntro, 1200);
                }, 800); // Wait for CSS fade out (800ms) to finish
                
            } else {
                // Sequence finished, slide screen up out of the way
                setTimeout(() => {
                    introScreen.classList.add('hidden');
                    setTimeout(() => {
                        document.body.style.overflow = 'visible';
                        introScreen.style.display = 'none';
                    }, 1200); // Matches CSS screen slide duration
                }, 1000);
            }
        };

        // Start the sequence after first word has been displayed a bit
        setTimeout(playIntro, 1500);
    }

    /* =========================================================================
       CUSTOM CURSOR EFFECT
    ========================================================================= */
    const cursorGlow = document.getElementById('cursor-glow');
    
    // Only apply custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for smoother tracking
            requestAnimationFrame(() => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
        });

        // Add hover effects for interactive elements
        const iteractives = document.querySelectorAll('a, button, input, textarea, .project-card, .bento-box');
        iteractives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorGlow.style.background = 'radial-gradient(circle at center, rgba(79, 172, 254, 0.2), rgba(138, 43, 226, 0.1), transparent 60%)';
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorGlow.style.background = 'radial-gradient(circle at center, rgba(138, 43, 226, 0.15), rgba(79, 172, 254, 0.1), transparent 60%)';
            });
        });
    }

    /* =========================================================================
       NAVBAR SCROLL EFFECT
    ========================================================================= */
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    /* =========================================================================
       SCROLL REVEAL (Intersection Observer)
    ========================================================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
        revealObserver.observe(element);
    });

    /* =========================================================================
       CONTACT FORM SUBMIT (Mock)
    ========================================================================= */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Sending...';
            btn.disabled = true;

            // Mock submission delay
            setTimeout(() => {
                btn.innerHTML = '<i class="ri-check-line"></i> Sent Successfully';
                btn.style.background = '#28a745';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    /* =========================================================================
       MODAL PREVIEW LOGIC
    ========================================================================= */
    const openBtns = document.querySelectorAll('.open-preview-btn');
    const closeBtns = document.querySelectorAll('.close-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetModal = document.querySelector(targetId);
            if (targetModal) {
                targetModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // prevent background scrolling
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'visible'; // restore scrolling
            }
        });
    });

    // Close on clicking outside content
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }
        });
    });

    // Run Project Error Logic
    const runBtns = document.querySelectorAll('.run-project-btn');
    runBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const errorMsg = btn.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('run-error-msg')) {
                errorMsg.classList.toggle('hidden');
            }
        });
    });

});
