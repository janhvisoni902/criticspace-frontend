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

    // Scroll reveal initialization delay fix
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 200);
});