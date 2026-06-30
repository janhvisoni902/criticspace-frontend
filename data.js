/**
 * Vanar Vision Agency - Dynamic Content Configuration
 * Stored as a global object to allow instant customization without CORS module restrictions.
 */

window.VANAR_DATA = {
    brandName: "Vanar Vision",
    tagline: "Strategic Video Growth Engine",
    contactEmail: "vanarvision@gmail.com",
    contactPhone: "+61 2 9876 5432",
    contactLocation: "Sydney, Australia & Mumbai, India",
    socialLinks: {
        linkedin: "https://linkedin.com",
        youtube: "https://youtube.com",
        instagram: "https://instagram.com"
    },

    // 1. Navbar Navigation Items
    navigation: [
        { label: "Home", anchor: "#hero" },
        { label: "About", anchor: "#trust" },
        { label: "Portfolio", anchor: "#portfolio" },
        { label: "Case Studies", anchor: "#testimonials" },
        { label: "Process", anchor: "#process" },
        { label: "Services", anchor: "#pricing" }
    ],

    // 2. Logo / Creator Marquee Data (8 items)
    marqueeItems: [
        { name: "Creator Alex", audience: "1.64K", suffix: "Subs", label: "Success Story", link: "#", initials: "CA" },
        { name: "Tech Vlogger B", audience: "22.8K", suffix: "Subs", label: "Success Story", link: "#", initials: "TB" },
        { name: "FitLife Channel", audience: "3.74M", suffix: "Subs", label: "Success Story", link: "#", initials: "FC" },
        { name: "Finance Wiz D", audience: "1.39M", suffix: "Subs", label: "Success Story", link: "#", initials: "FD" },
        { name: "Lifestyle Vids E", audience: "1.41M", suffix: "Subs", label: "Success Story", link: "#", initials: "LE" },
        { name: "SaaS Founder F", audience: "4.48K", suffix: "Subs", label: "Success Story", link: "#", initials: "SF" },
        { name: "Chef Master G", audience: "57K", suffix: "Subs", label: "Success Story", link: "#", initials: "CG" },
        { name: "Growth Mindset H", audience: "1.56M", suffix: "Subs", label: "Success Story", link: "#", initials: "GH" }
    ],

    // 3. Stats Data (Animate-on-scroll)
    stats: [
        { count: 2000000, prefix: "", suffix: "+", label: "Followers engaged", desc: "More than 2M Followers engaged across all major channels." },
        { count: 15000000, prefix: "", suffix: "+", label: "Views and counting", desc: "Our engineered videos have gained 15M+ organic views." },
        { count: 450000, prefix: "$", suffix: "K+", label: "Leads generated", desc: "More than $450K in inbound leads/booked pipeline generated." }
    ],

    // 4. Trust Section Secondary Stats
    trustStats: [
        { value: "120+", label: "Creators & Brands Helped" },
        { value: "98%", label: "Client Success Rate" },
        { value: "4.8★", label: "Average Rating" }
    ],

    // 5. Featured Press/News
    featuredNews: [
        {
            title: "How Visual Storytelling is Dominating Modern Organic Reach",
            publication: "Creator Ledger",
            date: "June 2026",
            blurb: "Industry breakdown on how narrative structures and retention-centric video edits outperform standard script readings by up to 240% in click-through rates.",
            link: "#"
        },
        {
            title: "Scaling Inbound Sales Pipelines Through Organic Shorts",
            publication: "SaaS Business Monthly",
            date: "May 2026",
            blurb: "A study highlighting Vanar Vision's structured 90-day growth framework for converting views into direct inbound call bookings without any paid ads spend.",
            link: "#"
        }
    ],

    // 6. Portfolio Showcase Videos (Grid #1 - vertical 9:16)
    // Using sample, fast-loading, public video assets to ensure interactive correctness.
    portfolioVideos: [
        {
            title: "Retention Hook Demo",
            category: "Short-form",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-40032-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%231f1d2b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236366F1' font-family='sans-serif' font-weight='bold' font-size='20'>Neon Hook Edit</text></svg>"
        },
        {
            title: "Scale Storytelling",
            category: "Long-form",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-keyboard-keys-glow-with-rainbow-colored-backlight-41865-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%231f1d2b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236366F1' font-family='sans-serif' font-weight='bold' font-size='20'>Narrative Pace</text></svg>"
        },
        {
            title: "B2B Lead Flow Clip",
            category: "Product Demo",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-smartphone-in-front-of-a-laptop-42171-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%231f1d2b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236366F1' font-family='sans-serif' font-weight='bold' font-size='20'>Funnel Optimization</text></svg>"
        },
        {
            title: "Viral Aesthetics Promo",
            category: "Ads",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-subway-car-interior-with-lights-glow-40763-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%231f1d2b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236366F1' font-family='sans-serif' font-weight='bold' font-size='20'>Creative Ad Edit</text></svg>"
        },
        {
            title: "Brand Elevation Script",
            category: "Short-form",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-wearing-headphones-listens-to-music-40508-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%231f1d2b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236366F1' font-family='sans-serif' font-weight='bold' font-size='20'>Brand Soundscape</text></svg>"
        }
    ],

    // 7. Video Testimonials (8 items - dynamic)
    testimonialVideos: [
        {
            client: "Ryan Sparks",
            role: "Founder, Peak SaaS",
            quote: "Vanar Vision turned our cold views into warm pipeline. Best growth system we ever used.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-in-a-coffee-shop-40177-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50%' cy='40%' r='30' fill='%236366F1'/><text x='50%' y='70%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Ryan Sparks Review</text></svg>"
        },
        {
            client: "Sarah Jenkins",
            role: "Financial Content Creator",
            quote: "My channel audience grew by 150k in two months. The scriptwriters captured my exact voice.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-happy-businesswoman-sitting-at-her-office-desk-40097-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50%' cy='40%' r='30' fill='%23a855f7'/><text x='50%' y='70%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Sarah Jenkins Review</text></svg>"
        },
        {
            client: "Dave K.",
            role: "YouTube educator",
            quote: "Their video editing keeps viewers locked in. Retention went from 38% to 54% overnight.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stream-of-neon-lights-in-blue-and-purple-tones-40033-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50%' cy='40%' r='30' fill='%233b82f6'/><text x='50%' y='70%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Dave K. Testimonial</text></svg>"
        },
        {
            client: "Dr. Alicia Vance",
            role: "Executive Coach",
            quote: "I book 3-4 high-ticket strategy consultations every week directly from our organic reels.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-typing-on-a-laptop-40176-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50%' cy='40%' r='30' fill='%23ec4899'/><text x='50%' y='70%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Dr. Alicia Vance</text></svg>"
        },
        {
            client: "Marcus Aurelius Group",
            role: "Philosophy Brand",
            quote: "They take complex long webinars and distill them into highly viral 9:16 reels. Amazing distribution.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-40032-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50%' cy='40%' r='30' fill='%2310b981'/><text x='50%' y='70%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Marcus Group</text></svg>"
        },
        {
            client: "Elena Rostova",
            role: "E-comm Growth Consultant",
            quote: "Quality can't be mass-produced, but Vanar Vision gets incredibly close. Masterclass delivery.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-wearing-headphones-listens-to-music-40508-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50%' cy='40%' r='30' fill='%23f59e0b'/><text x='50%' y='70%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Elena Rostova</text></svg>"
        },
        {
            client: "Sam O.",
            role: "Property Consultant",
            quote: "We landed three high-value buyers in a month using localized video strategies. Highly recommended.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-smartphone-in-front-of-a-laptop-42171-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50%' cy='40%' r='30' fill='%238b5cf6'/><text x='50%' y='70%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Sam O. Review</text></svg>"
        },
        {
            client: "Zara & Co.",
            role: "Aesthetic Fashion Brand",
            quote: "Our Instagram reels look like cinematic films now. Clean, fast revisions, absolute experts.",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-subway-car-interior-with-lights-glow-40763-large.mp4",
            posterUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50%' cy='40%' r='30' fill='%23ec4899'/><text x='50%' y='70%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Zara & Co.</text></svg>"
        }
    ],

    // 8. 9 Steps, 90 Days Timeline Steps
    timelineSteps: [
        {
            badge: "01",
            icon: "👋",
            title: "Onboarding",
            desc: "We start by getting on an onboarding call to learn about you, your business, niche, target audience, goals and more."
        },
        {
            badge: "02",
            icon: "🔍",
            title: "Research & Ideation",
            desc: "We analyze niche video trends and viral hooks to develop a winning strategy. By studying over 100 niche-related viral videos, we examine their hooks, topics, layouts, and other key elements."
        },
        {
            badge: "03",
            icon: "📝",
            title: "Scripting & Production",
            desc: "Our professional copywriters take the research and everything learned on the onboarding call to create viral scripts adjusted to you and your business so they're authentic."
        },
        {
            badge: "04",
            icon: "✂️",
            title: "Editing & Post-Production",
            desc: "A professional editor transforms raw footage into polished long-form and short-form videos, optimized with compelling hooks, strong visuals, consistent brand tone, and custom aesthetic."
        },
        {
            badge: "05",
            icon: "👀",
            title: "Review & Revision",
            desc: "Drafts delivered through Trello (or your preferred tool) — fast and simple. Clients give feedback and request revisions all in one centralized location."
        },
        {
            badge: "06",
            icon: "📦",
            title: "Delivery",
            desc: "Final video exports delivered in the exact formats you want. Whether you publish yourself or have the team handle it, each video goes live flawlessly."
        },
        {
            badge: "07",
            icon: "🔄",
            title: "Distribution & Repurposing",
            desc: "Post content across platforms (YouTube, Instagram, TikTok, LinkedIn). Repurpose into multiple formats for maximum reach."
        },
        {
            badge: "08",
            icon: "🧲",
            title: "Inbound Leads Integration",
            desc: "Tie content to lead-capture assets (e.g. downloadable guides) to convert views into inbound leads or booked consultations."
        },
        {
            badge: "09",
            icon: "📊",
            title: "Reporting & Dashboarding",
            desc: "Use dashboards or fortnightly reports to track KPIs such as reach, engagement, leads, and conversions. Keep clients fully aligned with progress and insights."
        }
    ],

    // 9. Pricing Plans Data (3 cards)
    pricingPlans: [
        {
            name: "Creator Core",
            price: "$1,800",
            period: "/month USD",
            tagline: "Up to 30 short videos per month + Proven Growth Roadmap",
            isHighlighted: false,
            features: [
                { text: "Competitor Research & Market Analysis", included: true },
                { text: "Creative Ideation & Scriptwriting", included: true },
                { text: "Premium Video Editing", included: true },
                { text: "Platform-Ready Exports", included: true },
                { text: "SEO Optimization (descriptions, hashtags, metadata)", included: true },
                { text: "Subtitles & Captions Included", included: true },
                { text: "Premium Creative Assets (sound FX, stock overlays)", included: true },
                { text: "Revisions Included", included: true },
                { text: "Fast & Direct Communication (Slack/WhatsApp)", included: true },
                { text: "Advanced Analytics & Reporting", included: true },
                { text: "Flexible Partnership (pause/cancel anytime)", included: true },
                { text: "Risk-Free Commitment (100% satisfaction)", included: true },
                { text: "Simple Payments", included: true },
                { text: "CTR-Optimized Thumbnail Design", included: false },
                { text: "Content-Driven Lead Flow Setup", included: false }
            ],
            ctaText: "Choose Creator Core",
            ctaLink: "#contact-section"
        },
        {
            name: "Growth Engine",
            price: "$2,800",
            period: "/month USD",
            tagline: "Up to 30 shorts and/or up to 8 long-form videos + Data-Driven Performance Blueprint",
            isHighlighted: true,
            features: [
                { text: "Competitor Research & Market Analysis", included: true },
                { text: "Creative Ideation & Scriptwriting", included: true },
                { text: "Premium Video Editing", included: true },
                { text: "Platform-Ready Exports", included: true },
                { text: "SEO Optimization", included: true },
                { text: "Subtitles & Captions Included", included: true },
                { text: "Premium Creative Assets", included: true },
                { text: "Revisions Included", included: true },
                { text: "Fast & Direct Communication", included: true },
                { text: "Advanced Analytics & Reporting", included: true },
                { text: "Flexible Partnership", included: true },
                { text: "Risk-Free Commitment", included: true },
                { text: "Simple Payments", included: true },
                { text: "CTR-Optimized Thumbnail Design", included: true },
                { text: "Multi-Platform Formatting (9:16, 16:9, 1:1)", included: true },
                { text: "Content-Driven Lead Flow Setup", included: true }
            ],
            ctaText: "Choose Growth Engine",
            ctaLink: "#contact-section"
        },
        {
            name: "Premium Add-Ons Pack",
            price: "Custom",
            period: "Pricing",
            tagline: "Add extra power to any plan with premium upgrades",
            isHighlighted: false,
            features: [
                { text: "Website Development — design built to outperform 95% of niche sites", included: true },
                { text: "On-Call Content Creation — 1 week of reels in a 1-hour Zoom session", included: true },
                { text: "Social Media Management — complete page handling & active engagement", included: true },
                { text: "Faster Turnaround Time — already built-in, no extra fee", included: true }
            ],
            ctaText: "Get Custom Quote",
            ctaLink: "#quote-form-section"
        }
    ],

    // 10. Benefits Asymmetric Bento-Grid (6 items)
    benefits: [
        {
            title: "Viral Growth",
            desc: "Engineered hooks and retention edits that trigger algorithms and multiply views organically.",
            sizeClass: "bento-medium"
        },
        {
            title: "Lead Generation Machine",
            desc: "Convert attention into booked calls. We bridge high-performance video to business assets.",
            sizeClass: "bento-large"
        },
        {
            title: "Personalised Strategies",
            desc: "We analyze over 100 niche videos. No cookie-cutter templates, everything adjusted to you.",
            sizeClass: "bento-small"
        },
        {
            title: "Guaranteed Results",
            desc: "Our 90-day results guarantee means we are as invested in your growth as you are.",
            sizeClass: "bento-small"
        },
        {
            title: "Just 1 hour/week",
            desc: "We take care of ideation, scriptwriting, editing, distribution, and reporting. You shoot for 1 hour.",
            sizeClass: "bento-large"
        },
        {
            title: "Growth Across Platforms",
            desc: "Dominate YouTube, Instagram, TikTok, and LinkedIn in parallel with modular content.",
            sizeClass: "bento-medium"
        }
    ],

    // 11. FAQ Accordion Items (11 items)
    faqs: [
        {
            num: 1,
            q: "What exactly does Vanar Vision do?",
            a: "We don't just edit videos — we engineer growth. We help creators, entrepreneurs, and brands turn content into a growth engine: strategy, scripting, top-tier editing, SEO/metadata, multi-platform distribution, and analytics, built as 90-day systems for retention, reach, and revenue."
        },
        {
            num: 2,
            q: "How is Vanar Vision different from freelancers or agencies?",
            a: "Most editors deliver clips; we deliver systems — editing, hooks, captions, SEO, distribution, strategy — backed by a 90-Day Growth Guarantee."
        },
        {
            num: 3,
            q: "What's the 90-day guarantee?",
            a: "If you follow the agreed posting schedule and guidance yet don't see measurable growth, we'll work the next month free."
        },
        {
            num: 4,
            q: "Do you also run ads?",
            a: "Our core system is 100% organic, no ad spend required. We can advise or support paid advertising strategies on top if wanted, but results do not depend on them."
        },
        {
            num: 5,
            q: "Why should we choose your service?",
            a: "A full-time senior editor costs $100K+/year; Vanar Vision delivers a full growth system (strategy, retention editing, SEO, distribution) for a fraction of the cost with no long-term commitment."
        },
        {
            num: 6,
            q: "Can I cancel anytime?",
            a: "Yes, there are no long-term contracts; cancel anytime, hassle-free."
        },
        {
            num: 7,
            q: "Why only 5 clients per month?",
            a: "We limit intake to 5 clients/month to ensure premium focus, high quality, and compounding results for our partners."
        },
        {
            num: 8,
            q: "What happens if I can't provide enough raw footage?",
            a: "Our team helps you batch-record (1–2 hours of filming generates weeks of content), repurposes archive footage (old podcasts/webinars), and keeps the pipeline consistent regardless."
        },
        {
            num: 9,
            q: "Where is Vanar Vision based? Do you work worldwide?",
            a: "We are based in Australia and India. We work with clients worldwide via async tools and communication."
        },
        {
            num: 10,
            q: "Can I see proof/results?",
            a: "Yes — our case studies show results like 1.16M reach in 30 days, 5.2M views in 90 days, and direct revenue lifts within a month, across education, finance, fitness, and B2B niches."
        },
        {
            num: 11,
            q: "What if I still have more questions?",
            a: "You can email us, send a WhatsApp message, or book a free strategy call via our Calendly calendar link."
        }
    ]
};
