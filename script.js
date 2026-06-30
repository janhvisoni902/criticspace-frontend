/**
 * Vanar Vision Agency — Frontend Interactive Core Logic
 * Renders data model dynamically and coordinates advanced scroll, video, and animation observers.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if dynamic data is loaded
    const data = window.VANAR_DATA;
    if (!data) {
        console.error("VANAR_DATA configuration not found.");
        return;
    }

    // ----------------------------------------------------
    // 1. DYNAMIC ELEMENT RENDERERS
    // ----------------------------------------------------

    // Header & Mobile Drawer Navigation Links
    const navMenu = document.getElementById('nav-menu');
    const mobileNav = document.getElementById('mobile-nav');
    if (navMenu && mobileNav) {
        data.navigation.forEach(item => {
            const linkHTML = `<a href="${item.anchor}">${item.label}</a>`;
            navMenu.insertAdjacentHTML('beforeend', linkHTML);
            mobileNav.insertAdjacentHTML('beforeend', linkHTML);
        });
    }

    // Creator Logo Marquee Renderer (Generates duplicated elements for seamless loop)
    const renderMarquee = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        let marqueeContentHTML = '<div class="vv-marquee-wrapper">';
        
        // Loop twice to create seamless infinite scrolling wrappers
        for (let i = 0; i < 2; i++) {
            data.marqueeItems.forEach(item => {
                marqueeContentHTML += `
                    <div class="vv-marquee-card" onclick="window.open('${item.link}', '_blank')">
                        <div class="vv-marquee-avatar">${item.initials}</div>
                        <div class="vv-marquee-info">
                            <strong>${item.name}</strong> 
                            <span class="vv-marquee-audience">${item.audience}</span>${item.suffix}
                        </div>
                        <span class="vv-marquee-label">${item.label}</span>
                    </div>
                `;
            });
        }
        marqueeContentHTML += '</div>';
        container.innerHTML = marqueeContentHTML;
    };
    renderMarquee('marquee-1');
    renderMarquee('marquee-2');

    // Stats Section Renderer
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
        data.stats.forEach(stat => {
            statsContainer.insertAdjacentHTML('beforeend', `
                <div class="vv-stat-card vv-glass-card vv-reveal">
                    <div class="vv-stat-number vv-counter vv-gradient-text" 
                         data-target="${stat.count}" 
                         data-prefix="${stat.prefix}" 
                         data-suffix="${stat.suffix}">
                         0
                    </div>
                    <span class="vv-stat-label">${stat.label}</span>
                    <p class="vv-stat-desc">${stat.desc}</p>
                </div>
            `);
        });
    }

    // Trust Secondary Stats Renderer
    const trustStatsContainer = document.getElementById('trust-stats-container');
    if (trustStatsContainer) {
        data.trustStats.forEach(stat => {
            trustStatsContainer.insertAdjacentHTML('beforeend', `
                <div class="vv-trust-stat-box">
                    <span class="vv-trust-stat-val">${stat.value}</span>
                    <span class="vv-trust-stat-lbl">${stat.label}</span>
                </div>
            `);
        });
    }

    // Press/News List Renderer
    const pressGrid = document.getElementById('press-grid');
    if (pressGrid) {
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

    // Showcase Video Grids Renderer (Vertical 9:16)
    const renderVideoGrid = (containerId, videosList) => {
        const grid = document.getElementById(containerId);
        if (!grid) return;

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
    // Grid 1
    renderVideoGrid('portfolio-grid', data.portfolioVideos);
    // Grid 2 (reordered for visual variance)
    const reorderedVideos = [...data.portfolioVideos].reverse();
    renderVideoGrid('portfolio-grid-2', reorderedVideos);

    // Testimonial Video Grid Renderer (8 cards)
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (testimonialsGrid) {
        data.testimonialVideos.forEach(vid => {
            testimonialsGrid.insertAdjacentHTML('beforeend', `
                <div class="vv-video-card vv-reveal">
                    <span class="vv-video-badge-status">⭐ 5.0 Rating</span>
                    <video class="vv-video-element vv-autoplay-video" 
                           data-src="${vid.videoUrl}" 
                           poster="${vid.posterUrl}" 
                           loop muted playsinline preload="none">
                    </video>
                    <div class="vv-video-card-overlay">
                        <h4 class="vv-video-title">${vid.client}</h4>
                        <span class="vv-video-desc">${vid.role}</span>
                        <p class="vv-video-client-quote">"${vid.quote}"</p>
                    </div>
                </div>
            `);
        });
    }

    // Process Timeline Renderer (9 Steps)
    const stepsContainer = document.getElementById('steps-cards-container');
    const dotsContainer = document.getElementById('stepper-dots-container');
    if (stepsContainer && dotsContainer) {
        data.timelineSteps.forEach((step, index) => {
            // Render Step Cards
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
            // Render Progress Nav Dots
            dotsContainer.insertAdjacentHTML('beforeend', `
                <div class="vv-stepper-dot ${index === 0 ? 'is-active' : ''}" 
                     data-index="${index}" 
                     title="${step.title}">
                </div>
            `);
        });
    }

    // Pricing Plans Cards Renderer
    const pricingGrid = document.getElementById('pricing-grid');
    if (pricingGrid) {
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

    // Bento Grid Benefits Renderer (6 asymmetric items)
    const bentoContainer = document.getElementById('bento-grid-container');
    if (bentoContainer) {
        data.benefits.forEach((b, index) => {
            bentoContainer.insertAdjacentHTML('beforeend', `
                <div class="vv-bento-card vv-glass-card ${b.sizeClass} vv-reveal">
                    <h3>${b.title}</h3>
                    <p>${b.desc}</p>
                </div>
            `);
        });
    }

    // FAQ Accordion Renderer (11 items)
    const faqContainer = document.getElementById('faq-accordion-container');
    if (faqContainer) {
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

    // Footer Menus & Context Renderer
    const footerServices = document.getElementById('footer-services-menu');
    if (footerServices) {
        data.navigation.slice(3).forEach(item => {
            footerServices.insertAdjacentHTML('beforeend', `<li><a href="${item.anchor}">${item.label}</a></li>`);
        });
        footerServices.insertAdjacentHTML('beforeend', `<li><a href="#portfolio">Our Videos</a></li>`);
    }

    const footerCompany = document.getElementById('footer-company-menu');
    if (footerCompany) {
        data.navigation.slice(0, 3).forEach(item => {
            footerCompany.insertAdjacentHTML('beforeend', `<li><a href="${item.anchor}">${item.label}</a></li>`);
        });
        footerCompany.insertAdjacentHTML('beforeend', `<li><a href="#faq">FAQ</a></li>`);
        footerCompany.insertAdjacentHTML('beforeend', `<li><a href="#contact-section">Contact Us</a></li>`);
    }

    const footerLocation = document.getElementById('footer-location');
    if (footerLocation) footerLocation.textContent = data.contactLocation;

    const footerTel = document.getElementById('footer-tel');
    if (footerTel) {
        footerTel.href = `tel:${data.contactPhone.replace(/\s+/g, '')}`;
        footerTel.textContent = data.contactPhone;
    }

    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) {
        footerEmail.href = `mailto:${data.contactEmail}`;
        footerEmail.textContent = data.contactEmail;
    }


    // ----------------------------------------------------
    // 2. NAV STICKY & ACTIVE SECTION SPY
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const headerNavLinks = document.querySelectorAll('.vv-nav-menu a, .vv-mobile-nav a');

    window.addEventListener('scroll', () => {
        // Sticky Header scroll trigger
        if (window.scrollY > 50) {
            navbar.classList.add('is-scrolled');
        } else {
            navbar.classList.remove('is-scrolled');
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

    const toggleDrawer = () => {
        const isOpen = drawer.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
        hamburger.classList.toggle('is-active');
        hamburger.setAttribute('aria-expanded', isOpen);
        // Lock background scroll
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (hamburger) hamburger.addEventListener('click', toggleDrawer);
    if (overlay) overlay.addEventListener('click', toggleDrawer);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (drawer.classList.contains('is-active')) {
                toggleDrawer();
            }
        });
    });


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
        const duration = 2000; // 2 seconds animation
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // easeOutQuad curve
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

                    // If it contains a counter element, fire the animation
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
        // Fallback for older browsers
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

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    // Lazy load video source on approach
                    if (video.dataset.src && !video.src) {
                        video.src = video.dataset.src;
                        video.load();
                    }
                    
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                            // Fallback if browser blocks autoplay (e.g. power-saving modes)
                            video.muted = true;
                            video.play().catch(e => {
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
        }, { threshold: 0.5 }); // Fire when 50% visible

        autoplayVideos.forEach(vid => videoObserver.observe(vid));
    } else {
        // Fallback
        autoplayVideos.forEach(vid => {
            if (vid.dataset.src) vid.src = vid.dataset.src;
            vid.setAttribute('autoplay', 'true');
        });
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
            
            // Toggle active classes
            if (!isExpanded) {
                pressContent.style.display = 'block';
                // Trigger grid template rows rendering
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
    // 8. INTERACTIVE TIMELINE / PROCESS STEPPER
    // ----------------------------------------------------
    const stepCards = document.querySelectorAll('.vv-step-card');
    const progressFill = document.getElementById('stepper-progress-fill');
    const progressText = document.getElementById('stepper-progress-text');
    const dots = document.querySelectorAll('.vv-stepper-dot');

    const totalSteps = stepCards.length;

    const updateStepperProgress = (activeIndex) => {
        // Calculate progress percentage
        const progressPercent = ((activeIndex + 1) / totalSteps) * 100;
        if (progressFill) progressFill.style.width = `${progressPercent}%`;

        // Update numerical progress text
        if (progressText && data.timelineSteps[activeIndex]) {
            progressText.textContent = `Progress ${activeIndex + 1}/${totalSteps} — ${data.timelineSteps[activeIndex].title}`;
        }

        // Toggle dot indicators
        dots.forEach((dot, idx) => {
            if (idx <= activeIndex) {
                dot.classList.add('is-active');
            } else {
                dot.classList.remove('is-active');
            }
        });

        // Highlight step cards
        stepCards.forEach((card, idx) => {
            if (idx === activeIndex) {
                card.classList.add('is-active');
            } else {
                card.classList.remove('is-active');
            }
        });
    };

    // Dot Clicks
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(dot.getAttribute('data-index'));
            const targetCard = document.getElementById(`step-card-${index}`);
            if (targetCard) {
                // Scroll card center
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                updateStepperProgress(index);
            }
        });
    });

    // Step Card scrollspy observer
    if ('IntersectionObserver' in window && stepCards.length > 0) {
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
            rootMargin: '-20% 0px -40% 0px', // Trigger when card enters the viewport middle-zone
            threshold: 0.1
        });

        stepCards.forEach(card => stepCardObserver.observe(card));
    }


    // ----------------------------------------------------
    // 9. FAQ ACCORDION COMPONENT
    // ----------------------------------------------------
    const faqTriggers = document.querySelectorAll('.vv-accordion-trigger');
    const faqPanels = document.querySelectorAll('.vv-accordion-panel');

    faqTriggers.forEach((trigger, idx) => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close other open FAQ accordion items
            faqTriggers.forEach((otherTrigger, otherIdx) => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherTrigger.classList.remove('is-active');
                    if (faqPanels[otherIdx]) {
                        faqPanels[otherIdx].style.display = 'none';
                    }
                }
            });

            // Toggle current accordion state
            trigger.setAttribute('aria-expanded', !isExpanded);
            trigger.classList.toggle('is-active', !isExpanded);
            
            const panel = faqPanels[idx];
            if (panel) {
                panel.style.display = isExpanded ? 'none' : 'block';
            }
        });
    });


    // ----------------------------------------------------
    // 10. LEAD & QUOTE SUBMISSIONS (PREVENT LAYS)
    // ----------------------------------------------------
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            alert(`Thanks, ${name}! Your growth strategy session request has been simulated. In production, this pushes to vanarvision@gmail.com or CRM webhooks.`);
            leadForm.reset();
        });
    }

    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('quote-name').value;
            
            // Gather checkboxes
            const selectedAddons = [];
            document.querySelectorAll('input[name="addons"]:checked').forEach(cb => {
                selectedAddons.push(cb.value);
            });

            alert(`Thanks, ${name}! Your custom quote request for upgrades [${selectedAddons.join(', ')}] was submitted successfully.`);
            quoteForm.reset();
        });
    }

    // Scroll reveal initialization delay fix
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 200);
});
