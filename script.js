/**
 * CRITICSPACE & VANAR VISION — Hybrid Interactivity Script
 * Supports both dynamic data-driven rendering and fully static HTML structures.
 */

document.addEventListener('DOMContentLoaded', () => {
    const data = window.VANAR_DATA || window.CRITICSPACE_DATA || null;

    // Helper to check if a container exists and is empty before rendering dynamically
    const shouldRender = (containerId) => {
        const el = document.getElementById(containerId);
        return el && el.children.length === 0 && data;
    };

    // ----------------------------------------------------
    // 1. DYNAMIC ELEMENT RENDERERS (Only runs if data is present and containers are empty)
    // ----------------------------------------------------
    if (data) {
        // Navigation links
        const navMenu = document.getElementById('nav-menu');
        const mobileNav = document.getElementById('mobile-nav');
        if (navMenu && navMenu.children.length === 0 && data.navigation) {
            data.navigation.forEach(item => {
                const linkHTML = `<a href="${item.anchor}">${item.label}</a>`;
                navMenu.insertAdjacentHTML('beforeend', linkHTML);
                if (mobileNav) mobileNav.insertAdjacentHTML('beforeend', linkHTML);
            });
        }

        // Initialize Vertical Marquees if functions are enqueued
        if (typeof window.initVerticalMarquee === 'function') {
            const creatorsMarquee = document.getElementById('vertical-marquee-creators');
            if (creatorsMarquee && creatorsMarquee.children.length === 0 && data.marqueeItems) {
                window.initVerticalMarquee('#vertical-marquee-creators', {
                    data: data.marqueeItems,
                    columns: 3,
                    cardType: 'avatar',
                    minDuration: 22,
                    maxDuration: 30
                });
            }

            const testimonialsMarquee = document.getElementById('vertical-marquee-testimonials');
            if (testimonialsMarquee && testimonialsMarquee.children.length === 0 && data.testimonialVideos) {
                window.initVerticalMarquee('#vertical-marquee-testimonials', {
                    data: data.testimonialVideos,
                    columns: 4,
                    cardType: 'testimonial',
                    minDuration: 25,
                    maxDuration: 38
                });
            }
        }

        // Stats Section
        if (shouldRender('stats-container') && data.stats) {
            const statsContainer = document.getElementById('stats-container');
            data.stats.forEach(stat => {
                statsContainer.insertAdjacentHTML('beforeend', `
                    <div class="vv-stat-card vv-glass-card vv-reveal">
                        <div class="vv-stat-number vv-counter vv-gradient-text" 
                             data-target="${stat.count}" 
                             data-prefix="${stat.prefix || ''}" 
                             data-suffix="${stat.suffix || ''}">
                             0
                        </div>
                        <span class="vv-stat-label">${stat.label}</span>
                        <p class="vv-stat-desc">${stat.desc}</p>
                    </div>
                `);
            });
        }

        // Secondary Stats
        if (shouldRender('trust-stats-container') && data.trustStats) {
            const trustStatsContainer = document.getElementById('trust-stats-container');
            data.trustStats.forEach(stat => {
                trustStatsContainer.insertAdjacentHTML('beforeend', `
                    <div class="vv-trust-stat-box">
                        <span class="vv-trust-stat-val">${stat.value}</span>
                        <span class="vv-trust-stat-lbl">${stat.label}</span>
                    </div>
                `);
            });
        }

        // Press dropdown list
        if (shouldRender('press-grid') && data.featuredNews) {
            const pressGrid = document.getElementById('press-grid');
            data.featuredNews.forEach(news => {
                pressGrid.insertAdjacentHTML('beforeend', `
                    <div class="vv-press-card vv-glass-card">
                        <span class="vv-press-pub">${news.publication} — ${news.date}</span>
                        <h4>${news.title}</h4>
                        <p class="vv-press-blurb">${news.blurb}</p>
                    </div>
                `);
            });
        }

        // Showcase Video Grids
        const renderVideoGrid = (containerId, videosList) => {
            const grid = document.getElementById(containerId);
            if (!grid || grid.children.length > 0) return;
            videosList.forEach(vid => {
                grid.insertAdjacentHTML('beforeend', `
                    <div class="vv-video-card vv-reveal">
                        <span class="vv-video-badge-status">${vid.category}</span>
                        <video class="vv-video-element vv-autoplay-video" 
                                data-src="${vid.videoUrl}" 
                                poster="${vid.posterUrl}" 
                                loop muted playsinline preload="none">
                        </video>
                        <div class="vv-video-card-overlay">
                            <h4 class="vv-video-title">${vid.title}</h4>
                            <span class="vv-video-desc">Engineered Organic Growth</span>
                        </div>
                    </div>
                `);
            });
        };
        if (data.portfolioVideos) {
            renderVideoGrid('portfolio-grid', data.portfolioVideos);
            renderVideoGrid('portfolio-grid-2', [...data.portfolioVideos].reverse());
        }

        // Process Stepper Cards & Dots
        if (shouldRender('steps-cards-container') && data.timelineSteps) {
            const stepsContainer = document.getElementById('steps-cards-container');
            const dotsContainer = document.getElementById('stepper-dots-container');
            data.timelineSteps.forEach((step, index) => {
                stepsContainer.insertAdjacentHTML('beforeend', `
                    <div class="vv-step-card vv-glass-card vv-reveal" id="step-card-${index}">
                        <div class="vv-step-badge-col">
                            <span class="vv-step-emoji">${step.icon}</span>
                            <span class="vv-step-badge">${step.badge}</span>
                        </div>
                        <div class="vv-step-content-col">
                            <h3>${step.title}</h3>
                            <p>${step.desc}</p>
                        </div>
                    </div>
                `);
                if (dotsContainer) {
                    dotsContainer.insertAdjacentHTML('beforeend', `
                        <div class="vv-stepper-dot ${index === 0 ? 'is-active' : ''}" 
                             data-index="${index}" 
                             title="${step.title}">
                        </div>
                    `);
                }
            });
        }

        // Pricing Cards
        if (shouldRender('pricing-grid') && data.pricingPlans) {
            const pricingGrid = document.getElementById('pricing-grid');
            data.pricingPlans.forEach(plan => {
                let featuresHTML = '';
                plan.features.forEach(f => {
                    const itemClass = f.included ? 'is-included' : 'is-excluded';
                    const icon = f.included ? '✓' : '✗';
                    featuresHTML += `<li class="${itemClass}"><span class="icon">${icon}</span> ${f.text}</li>`;
                });

                const cardClass = plan.isHighlighted ? 'vv-pricing-card vv-glass-card is-featured vv-reveal' : 'vv-pricing-card vv-glass-card vv-reveal';
                pricingGrid.insertAdjacentHTML('beforeend', `
                    <div class="${cardClass}">
                        <div class="vv-price-content-block">
                            <div class="vv-price-header">
                                <h3>${plan.name}</h3>
                                <p class="tagline">${plan.tagline}</p>
                                <div class="vv-price-row">
                                    <span class="val">${plan.price}</span>
                                    <span class="period">${plan.period}</span>
                                </div>
                            </div>
                            <ul class="vv-price-features">
                                ${featuresHTML}
                            </ul>
                        </div>
                        <a href="${plan.ctaLink}" class="vv-btn ${plan.isHighlighted ? 'vv-btn-primary' : 'vv-btn-outline'} vv-btn-block">${plan.ctaText}</a>
                    </div>
                `);
            });
        }

        // Bento Grid
        if (shouldRender('bento-grid-container') && data.benefits) {
            const bentoContainer = document.getElementById('bento-grid-container');
            data.benefits.forEach(b => {
                bentoContainer.insertAdjacentHTML('beforeend', `
                    <div class="vv-bento-card vv-glass-card ${b.sizeClass} vv-reveal">
                        <h3>${b.title}</h3>
                        <p>${b.desc}</p>
                    </div>
                `);
            });
        }

        // Accordion Accord
        if (shouldRender('faq-accordion-container') && data.faqs) {
            const faqContainer = document.getElementById('faq-accordion-container');
            data.faqs.forEach(faq => {
                faqContainer.insertAdjacentHTML('beforeend', `
                    <div class="vv-accordion-item vv-reveal">
                        <button class="vv-accordion-trigger" 
                                id="faq-trigger-${faq.num}" 
                                aria-expanded="false" 
                                aria-controls="faq-panel-${faq.num}">
                            <span>${faq.num}. ${faq.q}</span>
                            <span class="chevron">▼</span>
                        </button>
                        <div class="vv-accordion-panel" 
                             id="faq-panel-${faq.num}" 
                             role="region" 
                             aria-labelledby="faq-trigger-${faq.num}">
                            <p>${faq.a}</p>
                        </div>
                    </div>
                `);
            });
        }
    }

    // ----------------------------------------------------
    // 2. NAV STICKY & ACTIVE SECTION SPY
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const headerNavLinks = document.querySelectorAll('.vv-nav-menu a, .vv-mobile-nav a');

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('is-scrolled');
            } else {
                navbar.classList.remove('is-scrolled');
            }
        }

        // Active Section Scroll Spy
        let currentSectionId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        if (currentSectionId) {
            headerNavLinks.forEach(link => {
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('is-active');
                } else {
                    link.classList.remove('is-active');
                }
            });
        }
    });

    // ----------------------------------------------------
    // 3. HAMBURGER MENU & DRAWER TOGGLES
    // ----------------------------------------------------
    const hamburger = document.getElementById('hamburger-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const mobileLinks = document.querySelectorAll('.vv-mobile-nav a');

    if (hamburger && drawer && overlay) {
        const toggleDrawer = () => {
            const isOpen = drawer.classList.toggle('is-active');
            overlay.classList.toggle('is-active');
            hamburger.classList.toggle('is-active');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleDrawer);
        overlay.addEventListener('click', toggleDrawer);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (drawer.classList.contains('is-active')) {
                    toggleDrawer();
                }
            });
        });
    }

    // ----------------------------------------------------
    // 4. ANIMATED COUNTERS (stat count-up via RAF)
    // ----------------------------------------------------
    const formatNumber = (num, decimals = 0) => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    const runCountUp = (el) => {
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const duration = 2000;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress * (2 - progress);
            const currentValue = easeProgress * target;

            el.textContent = prefix + formatNumber(currentValue) + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = prefix + formatNumber(target) + suffix;
            }
        };

        window.requestAnimationFrame(step);
    };

    // ----------------------------------------------------
    // 5. INTERSECTION OBSERVER FOR FADE-IN REVEALS & STATS
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.vv-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('is-visible');

                    const counter = target.querySelector('.vv-counter');
                    if (counter && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        runCountUp(counter);
                    }

                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => {
            el.classList.add('is-visible');
            const counter = el.querySelector('.vv-counter');
            if (counter) {
                const target = counter.getAttribute('data-target');
                const p = counter.getAttribute('data-prefix');
                const s = counter.getAttribute('data-suffix');
                counter.textContent = p + parseFloat(target).toLocaleString('en-US') + s;
            }
        });
    }

    // ----------------------------------------------------
    // 6. VIDEO PLAYPORT INTERSECTION OBSERVER
    // ----------------------------------------------------
    const autoplayVideos = document.querySelectorAll('.vv-autoplay-video');

    if ('IntersectionObserver' in window && autoplayVideos.length > 0) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    if (video.dataset.src && !video.src) {
                        video.src = video.dataset.src;
                        video.load();
                    }
                    
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                            video.muted = true;
                            video.play().catch(() => {
                                video.setAttribute('controls', 'true');
                            });
                        });
                    }
                } else {
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        }, { threshold: 0.5 });

        autoplayVideos.forEach(vid => videoObserver.observe(vid));
    }

    // ----------------------------------------------------
    // 7. TRUST NEWS COLLAPSIBLE TOGGLE
    // ----------------------------------------------------
    const pressToggle = document.getElementById('press-toggle');
    const pressContent = document.getElementById('press-content');

    if (pressToggle && pressContent) {
        pressToggle.addEventListener('click', () => {
            const isExpanded = pressToggle.getAttribute('aria-expanded') === 'true';
            pressToggle.setAttribute('aria-expanded', !isExpanded);
            pressContent.setAttribute('aria-hidden', isExpanded);
            
            if (!isExpanded) {
                pressContent.style.display = 'block';
                setTimeout(() => {
                    pressContent.style.gridTemplateRows = '1fr';
                }, 10);
            } else {
                pressContent.style.gridTemplateRows = '0fr';
                const transitionEndHandler = () => {
                    if (pressToggle.getAttribute('aria-expanded') === 'false') {
                        pressContent.style.display = 'none';
                    }
                    pressContent.removeEventListener('transitionend', transitionEndHandler);
                };
                pressContent.addEventListener('transitionend', transitionEndHandler);
            }
        });
    }

    // ----------------------------------------------------
    // 8. INTERACTIVE PROCESS TIMELINE / STEPPER
    // ----------------------------------------------------
    const stepCards = document.querySelectorAll('.vv-step-card');
    const progressFill = document.getElementById('stepper-progress-fill');
    const progressText = document.getElementById('stepper-progress-text');
    const dots = document.querySelectorAll('.vv-stepper-dot');

    if (stepCards.length > 0) {
        const totalSteps = stepCards.length;

        const updateStepperProgress = (activeIndex) => {
            const progressPercent = ((activeIndex + 1) / totalSteps) * 100;
            if (progressFill) progressFill.style.width = `${progressPercent}%`;

            if (progressText) {
                if (data && data.timelineSteps && data.timelineSteps[activeIndex]) {
                    progressText.textContent = `Progress ${activeIndex + 1}/${totalSteps} — ${data.timelineSteps[activeIndex].title}`;
                } else {
                    progressText.textContent = `Progress ${activeIndex + 1}/${totalSteps}`;
                }
            }

            dots.forEach((dot, idx) => {
                dot.classList.toggle('is-active', idx <= activeIndex);
            });

            stepCards.forEach((card, idx) => {
                card.classList.toggle('is-active', idx === activeIndex);
            });
        };

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                const targetCard = document.getElementById(`step-card-${index}`);
                if (targetCard) {
                    targetCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    updateStepperProgress(index);
                }
            });
        });

        if ('IntersectionObserver' in window) {
            const stepCardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cardId = entry.target.getAttribute('id');
                        const index = parseInt(cardId.replace('step-card-', ''));
                        if (!isNaN(index)) {
                            updateStepperProgress(index);
                        }
                    }
                });
            }, {
                root: null,
                rootMargin: '-20% 0px -40% 0px',
                threshold: 0.1
            });

            stepCards.forEach(card => stepCardObserver.observe(card));
        }
    }

    // ----------------------------------------------------
    // 9. FAQ ACCORDION COMPONENT
    // ----------------------------------------------------
    const faqTriggers = document.querySelectorAll('.vv-accordion-trigger');
    const faqPanels = document.querySelectorAll('.vv-accordion-panel');

    if (faqTriggers.length > 0) {
        faqTriggers.forEach((trigger, idx) => {
            trigger.addEventListener('click', () => {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                
                faqTriggers.forEach((otherTrigger, otherIdx) => {
                    if (otherTrigger !== trigger) {
                        otherTrigger.setAttribute('aria-expanded', 'false');
                        otherTrigger.classList.remove('is-active');
                        if (faqPanels[otherIdx]) {
                            faqPanels[otherIdx].style.display = 'none';
                        }
                    }
                });

                trigger.setAttribute('aria-expanded', !isExpanded);
                trigger.classList.toggle('is-active', !isExpanded);
                
                const panel = faqPanels[idx];
                if (panel) {
                    panel.style.display = isExpanded ? 'none' : 'block';
                }
            });
        });
    }

    // ----------------------------------------------------
    // 10. LEAD FORM SUBMISSION
    // ----------------------------------------------------
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            alert(`Thanks, ${name}! Your growth consultation request has been submitted successfully. In production, this forwards to contact@criticspace.com or connects to your CRM.`);
            leadForm.reset();
        });
    }

    // ----------------------------------------------------
    // ----------------------------------------------------
    // NEW: Expert Solutions premium interaction START
    // ----------------------------------------------------
    const servicesSection = document.getElementById('services');
    const bentoGrid = document.querySelector('.vv-bento-grid');
    const bentoCards = document.querySelectorAll('.vv-bento-card');
    
    // Check if motion preferences allow animations and if device has pointing precision (mouse)
    const isMotionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (isMotionAllowed) {
        // Activate float animation classes by default
        bentoCards.forEach((card, index) => {
            card.classList.add(`is-floating-${index + 1}`);
        });

        if (isFinePointer && servicesSection && bentoGrid && bentoCards.length > 0) {
            let activeCard = null;
            let mouseSectionX = 0; // Mouse coordinate normalized relative to section center (-1 to 1)
            let mouseSectionY = 0;
            
            let cardTiltX = 0; // Normalized cursor coordinate inside active card (-1 to 1)
            let cardTiltY = 0;
            
            let currentTiltX = 0;
            let currentTiltY = 0;
            let currentParallaxX = 0;
            let currentParallaxY = 0;
            
            let animationFrameId = null;

            // Definition of base offsets and parallax coefficients for each card on desktop
            const cardData = [
                { baseRotation: -1.5, parallaxFactorX: 25,  parallaxFactorY: 15  }, // Card 1
                { baseRotation: 1,    parallaxFactorX: -20, parallaxFactorY: 25  }, // Card 2
                { baseRotation: -2,   parallaxFactorX: 30,  parallaxFactorY: -15 }, // Card 3
                { baseRotation: 1.5,  parallaxFactorX: -15, parallaxFactorY: -20 }, // Card 4
                { baseRotation: -1,   parallaxFactorX: 20,  parallaxFactorY: 30  }, // Card 5
                { baseRotation: 2,    parallaxFactorX: -25, parallaxFactorY: -25 }  // Card 6
            ];

            const updateComposition = () => {
                // Easing interpolations
                currentParallaxX += (mouseSectionX - currentParallaxX) * 0.08;
                currentParallaxY += (mouseSectionY - currentParallaxY) * 0.08;
                
                currentTiltX += (cardTiltX - currentTiltX) * 0.15;
                currentTiltY += (cardTiltY - currentTiltY) * 0.15;

                bentoCards.forEach((card, index) => {
                    const data = cardData[index];
                    const px = currentParallaxX * data.parallaxFactorX;
                    const py = currentParallaxY * data.parallaxFactorY;
                    
                    if (card === activeCard) {
                        // Hovered card: raise up, scale, rotate towards cursor, ignore floating animations
                        const rX = currentTiltY * -7; // Max 7 deg tilt
                        const rY = currentTiltX * 7;
                        
                        card.style.transform = `translate3d(${px}px, ${py - 12}px, 50px) scale(1.05) rotateX(${rX}deg) rotateY(${rY}deg) rotate(${data.baseRotation}deg)`;
                    } else {
                        // Ambient card response: subtle parallax, slide away slightly from hovered card if nearby
                        let slideX = 0;
                        let slideY = 0;
                        
                        if (activeCard) {
                            const rect = card.getBoundingClientRect();
                            const activeRect = activeCard.getBoundingClientRect();
                            
                            const dx = (rect.left + rect.width / 2) - (activeRect.left + activeRect.width / 2);
                            const dy = (rect.top + rect.height / 2) - (activeRect.top + activeRect.height / 2);
                            const dist = Math.hypot(dx, dy);
                            
                            if (dist < 400 && dist > 0) {
                                // Push ambient cards slightly away from the elevated active card
                                const push = (1 - dist / 400) * 15;
                                slideX = (dx / dist) * push;
                                slideY = (dy / dist) * push;
                            }
                        }
                        
                        // Combine parallax and push offset with base transforms
                        card.style.transform = `translate3d(${px + slideX}px, ${py + slideY}px, 0px) rotate(${data.baseRotation}deg)`;
                    }
                });

                animationFrameId = requestAnimationFrame(updateComposition);
            };

            servicesSection.addEventListener('mousemove', (e) => {
                const rect = servicesSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Global normalized coordinates relative to center
                mouseSectionX = (x / rect.width) * 2 - 1;
                mouseSectionY = (y / rect.height) * 2 - 1;
                
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(updateComposition);
                }
            });

            servicesSection.addEventListener('mouseleave', () => {
                mouseSectionX = 0;
                mouseSectionY = 0;
                activeCard = null;
                cardTiltX = 0;
                cardTiltY = 0;
                
                bentoCards.forEach(card => {
                    card.classList.remove('is-hovered');
                    card.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s';
                });
            });

            bentoCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Local normalized coordinates relative to card center
                    cardTiltX = (x / rect.width) * 2 - 1;
                    cardTiltY = (y / rect.height) * 2 - 1;
                    
                    if (activeCard !== card) {
                        if (activeCard) {
                            activeCard.classList.remove('is-hovered');
                        }
                        activeCard = card;
                        card.classList.add('is-hovered');
                        
                        // Disable standard floating keyframe class while tracking 3D hover
                        card.style.transition = 'none';
                    }
                });

                card.addEventListener('mouseleave', () => {
                    if (activeCard === card) {
                        activeCard = null;
                        cardTiltX = 0;
                        cardTiltY = 0;
                        card.classList.remove('is-hovered');
                        // Restore transition and floating keyframe animation smoothly
                        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s, border-color 0.6s';
                    }
                });
            });
        }
    }

    // Staggered fade entrance animation using custom trigger
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const bentoStaggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const cards = target.querySelectorAll('.vv-bento-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, index * 100); // 100ms staggered delay
                });
                bentoStaggerObserver.unobserve(target);
            }
        });
    }, observerOptions);

    if (servicesSection) {
        bentoStaggerObserver.observe(servicesSection);
    }
    // NEW: Expert Solutions premium interaction END

    // NEW: Expert Solutions premium interaction END

    // NEW: Testimonials 3D Carousel START
    window.initTestimonials3DCarousel = function (data) {
        const viewport = document.getElementById('vv-carousel-viewport');
        const track = document.getElementById('vv-carousel-track');
        const pagination = document.getElementById('vv-carousel-pagination');
        const prevBtn = document.getElementById('vv-carousel-btn-prev');
        const nextBtn = document.getElementById('vv-carousel-btn-next');
        
        if (!viewport || !track || !pagination || !data || data.length === 0) return;

        // Life cycle cleanup of previous event handlers and timers to prevent memory leaks
        if (window.cleanupTestimonials3DCarousel) {
            window.cleanupTestimonials3DCarousel();
        }

        let currentIndex = 0;
        let autoplayTimer = null;
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        let dragProgress = 0;
        
        const total = data.length;
        const cardElements = [];

        // Build dynamically
        track.innerHTML = '';
        pagination.innerHTML = '';

        data.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'vv-testimonial-card';
            card.setAttribute('role', 'group');
            card.setAttribute('aria-roledescription', 'slide');
            card.setAttribute('aria-label', `Testimonial ${index + 1} of ${total}`);
            
            // Format semantic titles
            let quoteHtml = item.quote.replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/_(.*?)_/g, '<em>$1</em>');
            const designationHtml = item.role ? `<span class="vv-testimonial-author-role">${item.role}</span>` : '';

            card.innerHTML = `
                <div class="vv-testimonial-quote-icon">“</div>
                <div class="vv-testimonial-text-container">
                    <p class="vv-testimonial-text">${quoteHtml}</p>
                    <button class="vv-carousel-read-more" aria-label="Read more testimonial text">Read More</button>
                </div>
                <div class="vv-testimonial-author">
                    <span class="vv-testimonial-author-name">${item.client}</span>
                    ${designationHtml}
                </div>
            `;
            
            track.appendChild(card);
            cardElements.push(card);

            // Pagination dot
            const dot = document.createElement('button');
            dot.className = 'vv-carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) dot.classList.add('is-active');
            pagination.appendChild(dot);
        });

        // Trigger dynamic check for overflow clamp button
        setTimeout(() => {
            cardElements.forEach(card => {
                const textEl = card.querySelector('.vv-testimonial-text');
                const readMoreBtn = card.querySelector('.vv-carousel-read-more');
                if (textEl && readMoreBtn) {
                    if (textEl.scrollHeight > textEl.clientHeight) {
                        readMoreBtn.style.display = 'inline-block';
                    }
                }
            });
        }, 150);

        // Accessibility Modal manager
        let modalOverlay = document.getElementById('vv-carousel-modal-overlay');
        if (!modalOverlay) {
            modalOverlay = document.createElement('div');
            modalOverlay.id = 'vv-carousel-modal-overlay';
            modalOverlay.className = 'vv-carousel-modal-overlay';
            modalOverlay.setAttribute('aria-hidden', 'true');
            modalOverlay.innerHTML = `
                <div class="vv-carousel-modal" role="dialog" aria-modal="true" aria-labelledby="vv-carousel-modal-title">
                    <button class="vv-carousel-modal-close" aria-label="Close modal">&times;</button>
                    <div class="vv-carousel-modal-content">
                        <p class="vv-carousel-modal-quote" id="vv-carousel-modal-quote"></p>
                        <div class="vv-testimonial-author">
                            <span class="vv-testimonial-author-name" id="vv-carousel-modal-name"></span>
                            <span class="vv-testimonial-author-role" id="vv-carousel-modal-role"></span>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modalOverlay);
        }

        const modalCloseBtn = modalOverlay.querySelector('.vv-carousel-modal-close');
        let triggerElement = null;

        const trapModalFocus = (e) => {
            if (e.key === 'Tab') {
                const focusables = modalOverlay.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === first) {
                        last.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === last) {
                        first.focus();
                        e.preventDefault();
                    }
                }
            } else if (e.key === 'Escape') {
                closeModal();
            }
        };

        const openModal = (item, triggerEl) => {
            triggerElement = triggerEl;
            
            const quoteEl = modalOverlay.querySelector('#vv-carousel-modal-quote');
            const nameEl = modalOverlay.querySelector('#vv-carousel-modal-name');
            const roleEl = modalOverlay.querySelector('#vv-carousel-modal-role');

            quoteEl.innerHTML = item.quote.replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/_(.*?)_/g, '<em>$1</em>');
            nameEl.textContent = item.client;
            roleEl.textContent = item.role || '';

            modalOverlay.classList.add('is-active');
            modalOverlay.setAttribute('aria-hidden', 'false');
            document.addEventListener('keydown', trapModalFocus);
            document.body.style.overflow = 'hidden';

            pauseAutoplay();

            setTimeout(() => {
                modalCloseBtn.focus();
            }, 50);
        };

        const closeModal = () => {
            modalOverlay.classList.remove('is-active');
            modalOverlay.setAttribute('aria-hidden', 'true');
            document.removeEventListener('keydown', trapModalFocus);
            document.body.style.overflow = '';
            
            if (triggerElement) {
                triggerElement.focus();
            }
            resumeAutoplay();
        };

        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        // Event delegation for cards clicks/Read Mores
        const handleTrackClick = (e) => {
            const readMoreBtn = e.target.closest('.vv-carousel-read-more');
            if (readMoreBtn) {
                const card = readMoreBtn.closest('.vv-testimonial-card');
                const cardIdx = cardElements.indexOf(card);
                if (cardIdx !== -1) {
                    openModal(data[cardIdx], readMoreBtn);
                }
            }
        };
        track.addEventListener('click', handleTrackClick);

        // Core 3D transformations engine
        const isMotionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        const updateTransforms = (progressOffset = 0) => {
            const centerIdx = currentIndex - progressOffset;
            
            cardElements.forEach((card, index) => {
                let diff = index - centerIdx;

                // Handle circular mathematical boundary wrap-arounds cleanly
                if (diff < -total / 2) {
                    diff += total;
                } else if (diff > total / 2) {
                    diff -= total;
                }

                const absDiff = Math.abs(diff);
                let transform = '';
                let opacity = 0;
                let zIndex = 0;
                let isPointerEventEnabled = 'none';

                // Responsive sizing bounds
                let spacing = 180;
                if (window.innerWidth <= 768) {
                    spacing = 0; // Mobile shows center card only
                } else if (window.innerWidth <= 1024) {
                    spacing = 110; // Tablet peeks side elements slightly closer
                }

                if (absDiff < 1.5 && (window.innerWidth > 768 || absDiff < 0.5)) {
                    /* UPDATED: increased side-card visibility */
                    const scale = isMotionAllowed ? (1 - absDiff * 0.1) : 1;
                    const translateX = diff * spacing;
                    const translateZ = isMotionAllowed ? (absDiff * -100) : 0;
                    const rotateY = isMotionAllowed ? (diff * -20) : 0;

                    transform = `translate3d(${translateX}px, 0px, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`;
                    opacity = 1 - absDiff * 0.35; // 65% opacity on side cards (absDiff === 1)
                    zIndex = Math.round(10 - absDiff * 5);
                    
                    if (absDiff < 0.5) {
                        isPointerEventEnabled = 'auto';
                    }
                } else {
                    // Out-of-bounds items hidden out of viewport safely
                    transform = `translate3d(${diff > 0 ? 500 : -500}px, 0px, -500px) scale(0.5) rotateY(${diff > 0 ? -45 : 45}deg)`;
                    opacity = 0;
                    zIndex = 0;
                }

                card.style.transform = transform;
                card.style.opacity = opacity;
                card.style.zIndex = zIndex;
                card.style.pointerEvents = isPointerEventEnabled;

                // Stacking glows and active attributes
                if (absDiff < 0.5) {
                    card.classList.add('is-active');
                    card.setAttribute('aria-hidden', 'false');
                    card.removeAttribute('tabindex');
                } else {
                    card.classList.remove('is-active');
                    card.setAttribute('aria-hidden', 'true');
                    card.setAttribute('tabindex', '-1');
                }
            });

            // Update pagination indicators
            const dots = pagination.querySelectorAll('.vv-carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('is-active', index === currentIndex);
            });
        };

        const navigate = (direction) => {
            currentIndex = (currentIndex + direction + total) % total;
            updateTransforms(0);
        };

        // Navigation controls clicks
        const handlePrevClick = () => { navigate(-1); restartAutoplay(); };
        const handleNextClick = () => { navigate(1); restartAutoplay(); };

        prevBtn.addEventListener('click', handlePrevClick);
        nextBtn.addEventListener('click', handleNextClick);

        // Dot index clicks
        const handleDotClick = (e) => {
            const dot = e.target.closest('.vv-carousel-dot');
            if (dot) {
                const dots = Array.from(pagination.querySelectorAll('.vv-carousel-dot'));
                const index = dots.indexOf(dot);
                if (index !== -1) {
                    currentIndex = index;
                    updateTransforms(0);
                    restartAutoplay();
                }
            }
        };
        pagination.addEventListener('click', handleDotClick);

        // Pointer Drag & Swipe physics mapping
        const handlePointerDown = (e) => {
            if (e.target.closest('.vv-carousel-modal') || e.target.closest('.vv-carousel-btn') || e.target.closest('.vv-carousel-dot') || e.target.closest('.vv-carousel-read-more')) return;
            isDragging = true;
            startX = e.clientX || (e.touches && e.touches[0].clientX);
            currentX = startX;
            dragProgress = 0;
            
            // Suspend transition timing on active drags
            cardElements.forEach(card => {
                card.style.transition = 'none';
            });
            pauseAutoplay();
        };

        const handlePointerMove = (e) => {
            if (!isDragging) return;
            currentX = e.clientX || (e.touches && e.touches[0].clientX);
            const deltaX = currentX - startX;
            const width = viewport.clientWidth || 500;
            dragProgress = deltaX / width;

            // GPU-accelerated requestAnimationFrame update loops
            requestAnimationFrame(() => {
                updateTransforms(dragProgress);
            });
        };

        const handlePointerUp = () => {
            if (!isDragging) return;
            isDragging = false;

            // Restore smooth transitions
            cardElements.forEach(card => {
                card.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s, border-color 0.8s, box-shadow 0.8s';
            });

            const width = viewport.clientWidth || 500;
            const threshold = 60 / width;

            if (dragProgress > threshold) {
                navigate(-1);
            } else if (dragProgress < -threshold) {
                navigate(1);
            } else {
                updateTransforms(0);
            }
            resumeAutoplay();
        };

        viewport.addEventListener('mousedown', handlePointerDown);
        viewport.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('mouseup', handlePointerUp);

        viewport.addEventListener('touchstart', handlePointerDown, { passive: true });
        viewport.addEventListener('touchmove', handlePointerMove, { passive: true });
        viewport.addEventListener('touchend', handlePointerUp);

        // Throttled mouse wheel scroll hook
        let wheelTimer = null;
        const handleWheel = (e) => {
            if (Math.abs(e.deltaX) < 15) return;
            e.preventDefault();
            if (wheelTimer) return;

            if (e.deltaX > 0) {
                navigate(1);
            } else {
                navigate(-1);
            }
            restartAutoplay();

            wheelTimer = setTimeout(() => {
                wheelTimer = null;
            }, 600); // 600ms debounce
        };
        viewport.addEventListener('wheel', handleWheel, { passive: false });

        // Autoplay controller
        const resumeAutoplay = () => {
            if (!isMotionAllowed) return; // Disable autoplay if prefers-reduced-motion
            if (autoplayTimer) clearInterval(autoplayTimer);
            autoplayTimer = setInterval(() => {
                navigate(1);
            }, 6000);
        };

        const pointerEventsCleanup = () => {
            pauseAutoplay();
        };

        const pauseAutoplay = () => {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        };

        const restartAutoplay = () => {
            pauseAutoplay();
            resumeAutoplay();
        };

        // Pause autoplay on mouse hovers and keyboard focus states
        viewport.addEventListener('mouseenter', pauseAutoplay);
        viewport.addEventListener('mouseleave', resumeAutoplay);
        
        // Pause on focus within outer wrapper elements
        const outerWrapper = document.querySelector('.vv-carousel-outer-wrapper');
        const handleFocusIn = () => {
            pauseAutoplay();
        };
        const handleFocusOut = () => {
            resumeAutoplay();
        };
        if (outerWrapper) {
            outerWrapper.addEventListener('focusin', handleFocusIn);
            outerWrapper.addEventListener('focusout', handleFocusOut);
        }

        // Keyboard arrow triggers
        const handleKeyDownNav = (e) => {
            if (e.key === 'ArrowLeft') {
                navigate(-1);
                restartAutoplay();
            } else if (e.key === 'ArrowRight') {
                navigate(1);
                restartAutoplay();
            }
        };
        viewport.setAttribute('tabindex', '0'); // Make carousel wrapper keyboard focusable
        viewport.addEventListener('keydown', handleKeyDownNav);

        // Resize responsive listener
        const handleResize = () => {
            updateTransforms(0);
        };
        window.addEventListener('resize', handleResize);

        // Initialize state
        updateTransforms(0);
        resumeAutoplay();

        // Lifecycle cleanup registrar to prevent memory leak states
        window.cleanupTestimonials3DCarousel = () => {
            pauseAutoplay();
            
            prevBtn.removeEventListener('click', handlePrevClick);
            nextBtn.removeEventListener('click', handleNextClick);
            pagination.removeEventListener('click', handleDotClick);
            track.removeEventListener('click', handleTrackClick);
            
            viewport.removeEventListener('mousedown', handlePointerDown);
            viewport.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);

            viewport.removeEventListener('touchstart', handlePointerDown);
            viewport.removeEventListener('touchmove', handlePointerMove);
            viewport.removeEventListener('touchend', handlePointerUp);

            viewport.removeEventListener('wheel', handleWheel);
            viewport.removeEventListener('mouseenter', pauseAutoplay);
            viewport.removeEventListener('mouseleave', resumeAutoplay);
            viewport.removeEventListener('keydown', handleKeyDownNav);

            if (outerWrapper) {
                outerWrapper.removeEventListener('focusin', handleFocusIn);
                outerWrapper.removeEventListener('focusout', handleFocusOut);
            }

            window.removeEventListener('resize', handleResize);
            modalCloseBtn.removeEventListener('click', closeModal);
            modalOverlay.removeEventListener('click', closeModal);
        };
    };

    // Scroll reveal initialization delay fix
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 200);
});