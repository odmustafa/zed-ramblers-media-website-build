import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all published pages
export const getPublishedPages = query({
    args: {},
    handler: async (ctx: any) => {
        return await ctx.db
            .query("pages")
            .withIndex("by_published", (q: any) => q.eq("published", true))
            .collect();
    },
});

// Get a page by slug
export const getPageBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx: any, args: any) => {
        const page = await ctx.db
            .query("pages")
            .withIndex("by_slug", (q: any) => q.eq("slug", args.slug))
            .first();

        if (!page || !page.published) {
            return null;
        }

        return page;
    },
});

// Create or update a page (admin only)
export const upsertPage = mutation({
    args: {
        slug: v.string(),
        title: v.string(),
        content: v.string(),
        metaDescription: v.string(),
        metaTitle: v.string(),
        published: v.boolean(),
    },
    handler: async (ctx: any, args: any) => {
        const existingPage = await ctx.db
            .query("pages")
            .withIndex("by_slug", (q: any) => q.eq("slug", args.slug))
            .first();

        const now = Date.now();

        if (existingPage) {
            await ctx.db.patch(existingPage._id, {
                ...args,
                updatedAt: now,
            });
            return existingPage._id;
        } else {
            return await ctx.db.insert("pages", {
                ...args,
                updatedAt: now,
            });
        }
    },
});

// Seed database with initial content
export const seedDatabase = mutation({
    args: {},
    handler: async (ctx: any) => {
        const now = Date.now();

        // Home page content
        const homeContent = `# Professional Video Production

We are a full-service video production company specializing in video advertising, music videos, and film production. From concept to final cut, we bring your vision to life with compelling storytelling and high-quality production.

## Our Expertise

Compelling storytelling and high-quality production across all formats.

## Services

From concept to final cut, we bring your vision to life with compelling storytelling.

### Video Advertising
Compelling video advertising content that drives engagement and delivers results for your brand. Performance-driven content optimized for multiple platforms.

### Music Videos
Creative music video production with high-quality cinematography and compelling visual storytelling. Artist-focused direction with professional execution.

### Film Production
Full-service film production from concept to final cut with compelling storytelling and high-quality production. Complete production services with professional post-production.

### Explain the complex fast
- 2D/3D, kinetic type, data visualization.
- Style frames and brand‑safe palettes included.
- Built for clarity and speed of understanding.

### Finish with confidence
- Color, mix, captions, QC, and exports.
- Encrypted transfer and archival options available.
- Tight version control and sign‑off workflow.

## Government Capabilities

- Punctual, background‑checked crew; strict call‑time discipline.
- SAM / UEI / CAGE placeholders (edit in markup once confirmed).
- Insurance COI on file; additional insured certificates available.
- Secure data handling: encrypted drives, signed NDAs, chain‑of‑custody.
- On‑base and facility‑friendly kit; compact footprint when required.
- Multilingual set capability (English / Spanish).
- NAICS (edit): 512110, 512191, 512199 (update as applicable).

### Why Agencies & Primes Choose Us
- **Reliability first**: on time, every time.
- **Accuracy**: we respect technical subject matter and review with SMEs.
- **Agility**: lean crew that scales up as needed.
- **Deliverables**: captioned, versioned, and QC'd files.

## Equipment

In‑house pro kit. Ready for travel. Sample inventory (edit as needed).

### Cameras
- ARRI Alexa Mini / Mini LF — ProRes / ARRIRAW
- RED (Komodo/… as applicable)
- Panasonic / Sony B‑cams for multi‑cam

### Glass
- PL primes (set) & fast zooms
- Specialty macro / tilt‑shift (optional)

### Lighting
- Kino Flo systems (Celeb/4Bank)
- LED panels & COBs with soft/spot modifiers
- Grip: C‑stands, flags, diffusion, ND, frames

### Audio
- Shotgun + lav kits, dual‑rec, timecode sync
- Mixers/recorders (32‑bit float where needed)

### Support
- Tripods, sliders, gimbal, teleprompter
- Portable backdrops; compact interview kits
- Secure DIT: on‑set backups, checksum verifies

### Delivery
- Color‑managed exports; captions & audio specs
- Encrypted cloud/file handoff

## Request a Quote

Tell us about your project timeline, location, and deliverables. We'll respond within one business day.`;

        // About page content
        const aboutContent = `# About Ramblers Media

We are a full-service video production company specializing in video advertising, music videos, and film production. From concept to final cut, we bring your vision to life with compelling storytelling and high-quality production.

Based in North Hollywood, CA, we combine creative vision with technical excellence to deliver outstanding results for our clients.

- Professional crews with extensive experience across multiple formats
- Complete production services from concept development to final delivery
- High-quality equipment and technical expertise for every project

## Experience

Agency & direct; government & corporate.

### Multi‑state
We travel light and scale on demand.

### Bilingual
English / Spanish.

### Mission‑critical
Time‑sensitive shoots with approvals and security needs.`;

        // Services content
        const servicesContent = `# Services & Equipment

### Services
- Video advertising that drives engagement and results
- Creative music video production with high-quality cinematography
- Full-service film production from concept to final cut
- Professional cinematography and visual storytelling
- Complete post-production services
- Concept development and creative direction

### Equipment
Professional cameras · High-end lenses · Professional lighting · Audio equipment · Post-production suites · Creative tools.

Need a full itemized package? Contact us and we'll tailor the build for your project.`;

        // Contact content
        const contactContent = `# Request a Quote

Tell us about your project timeline, location, and deliverables.

### Direct
- hello@ramblersmedia.com
- +1 (765) 760‑0699

### Location
Dallas‑Fort Worth, TX — available nationwide.

### Hours
Weekdays 8a–6p · After‑hours by request.`;

        // Privacy policy content
        const privacyContent = `# Privacy Policy

We collect only the information you provide via the contact form. We use this information to respond to your inquiry and for project coordination. We do not sell your data. If you wish to access or delete your information, contact us at privacy@ramblersmedia.com.

Analytics: optional privacy‑respecting analytics may be used to improve the site (no cookies by default). Media you send may be stored for the duration of a project and archived per contract terms.

Last Updated: Aug 20, 2025`;

        // Insert or update pages
        const pages = [
            {
                slug: "home",
                title: "Contractor-Grade Video Production | Ramblers Media",
                content: homeContent,
                metaDescription: "Full-service video production company specializing in video advertising, music videos, and film production. From concept to final cut, we bring your vision to life.",
                metaTitle: "Professional Video Production | Ramblers Media",
                published: true,
            },
            {
                slug: "about",
                title: "About Us | Ramblers Media",
                content: aboutContent,
                metaDescription: "North Hollywood-based video production company specializing in video advertising, music videos, and film production. Professional crews with extensive experience.",
                metaTitle: "About Us | Professional Video Production Team",
                published: true,
            },
            {
                slug: "services",
                title: "Services & Equipment | Ramblers Media",
                content: servicesContent,
                metaDescription: "Video advertising, music videos, and film production services. Professional equipment and creative expertise for every project.",
                metaTitle: "Video Production Services & Professional Equipment",
                published: true,
            },
            {
                slug: "contact",
                title: "Contact Us | Request a Quote",
                content: contactContent,
                metaDescription: "Contact Ramblers Media for professional video production services. Based in North Hollywood, CA, specializing in video advertising, music videos, and film production.",
                metaTitle: "Contact Ramblers Media | Request Video Production Quote",
                published: true,
            },
            {
                slug: "privacy",
                title: "Privacy Policy | Ramblers Media",
                content: privacyContent,
                metaDescription: "Ramblers Media privacy policy. We collect only information you provide via contact forms and use it solely for project coordination.",
                metaTitle: "Privacy Policy | Ramblers Media",
                published: true,
            },
        ];

        for (const page of pages) {
            const existingPage = await ctx.db
                .query("pages")
                .withIndex("by_slug", (q: any) => q.eq("slug", page.slug))
                .first();

            if (existingPage) {
                await ctx.db.patch(existingPage._id, {
                    ...page,
                    updatedAt: now,
                });
            } else {
                await ctx.db.insert("pages", {
                    ...page,
                    updatedAt: now,
                });
            }
        }

        return { success: true, message: "Database seeded with website content" };
    },
});

// Seed equipment inventory
export const seedEquipment = mutation({
    args: {},
    handler: async (ctx: any) => {
        const now = Date.now();

        // Equipment data based on website content
        const equipmentData = [
            // Cameras
            {
                name: "ARRI Alexa Mini",
                description: "Professional digital cinema camera with ARRIRAW recording",
                category: "Camera",
                pricePerDay: 500,
                pricePerWeek: 2500,
                pricePerMonth: 8000,
                availability: true,
                specifications: "4K resolution, ARRIRAW, ProRes, multiple lens mounts",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "ARRI Alexa Mini LF",
                description: "Large format digital cinema camera for epic productions",
                category: "Camera",
                pricePerDay: 750,
                pricePerWeek: 3750,
                pricePerMonth: 12000,
                availability: true,
                specifications: "6K resolution, ARRIRAW, large format sensor, ProRes",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "RED Komodo",
                description: "Compact cinema camera with professional features",
                category: "Camera",
                pricePerDay: 400,
                pricePerWeek: 2000,
                pricePerMonth: 6500,
                availability: true,
                specifications: "6K resolution, REDCODE RAW, compact design",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "Panasonic B-Camera Package",
                description: "Multi-camera setup for live events and interviews",
                category: "Camera",
                pricePerDay: 300,
                pricePerWeek: 1500,
                pricePerMonth: 4800,
                availability: true,
                specifications: "4K resolution, multi-unit package, timecode sync",
                createdAt: now,
                updatedAt: now,
            },

            // Lenses
            {
                name: "PL Prime Lens Set",
                description: "Professional cinema prime lenses",
                category: "Lens",
                pricePerDay: 200,
                pricePerWeek: 1000,
                pricePerMonth: 3200,
                availability: true,
                specifications: "PL mount, multiple focal lengths, cinema quality",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "Fast Zoom Lenses",
                description: "Professional zoom lenses with fast apertures",
                category: "Lens",
                pricePerDay: 150,
                pricePerWeek: 750,
                pricePerMonth: 2400,
                availability: true,
                specifications: "Fast apertures, zoom capability, PL mount",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "Macro Lens Kit",
                description: "Specialty macro lenses for detailed product shots",
                category: "Lens",
                pricePerDay: 100,
                pricePerWeek: 500,
                pricePerMonth: 1600,
                availability: true,
                specifications: "Macro capability, high detail reproduction",
                createdAt: now,
                updatedAt: now,
            },

            // Lighting
            {
                name: "Kino Flo Celeb 400",
                description: "Professional LED lighting system",
                category: "Lighting",
                pricePerDay: 150,
                pricePerWeek: 750,
                pricePerMonth: 2400,
                availability: true,
                specifications: "400W LED, soft light, flicker-free",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "Kino Flo 4-Bank System",
                description: "Multi-bank LED lighting setup",
                category: "Lighting",
                pricePerDay: 200,
                pricePerWeek: 1000,
                pricePerMonth: 3200,
                availability: true,
                specifications: "4-bank setup, tunable color, soft light",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "LED Panel Kit",
                description: "Versatile LED panels with modifiers",
                category: "Lighting",
                pricePerDay: 100,
                pricePerWeek: 500,
                pricePerMonth: 1600,
                availability: true,
                specifications: "RGB panels, soft/hard modifiers, battery powered",
                createdAt: now,
                updatedAt: now,
            },

            // Audio
            {
                name: "Shotgun Microphone Kit",
                description: "Professional shotgun microphones with recorders",
                category: "Audio",
                pricePerDay: 75,
                pricePerWeek: 375,
                pricePerMonth: 1200,
                availability: true,
                specifications: "Shotgun mics, audio recorders, wind protection",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "Lavalier Microphone Package",
                description: "Wireless lavalier microphone system",
                category: "Audio",
                pricePerDay: 50,
                pricePerWeek: 250,
                pricePerMonth: 800,
                availability: true,
                specifications: "Wireless lavs, transmitters, receivers",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "Timecode Audio Mixer",
                description: "Professional audio mixer with timecode",
                category: "Audio",
                pricePerDay: 100,
                pricePerWeek: 500,
                pricePerMonth: 1600,
                availability: true,
                specifications: "32-bit float recording, timecode sync, multiple inputs",
                createdAt: now,
                updatedAt: now,
            },

            // Support Equipment
            {
                name: "Professional Tripod System",
                description: "Heavy-duty tripod with fluid head",
                category: "Support",
                pricePerDay: 40,
                pricePerWeek: 200,
                pricePerMonth: 640,
                availability: true,
                specifications: "100mm ball head, carbon fiber legs, quick release",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "Slider and Gimbal Package",
                description: "Camera movement equipment",
                category: "Support",
                pricePerDay: 60,
                pricePerWeek: 300,
                pricePerMonth: 960,
                availability: true,
                specifications: "4ft slider, gimbal stabilizer, remote control",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "Teleprompter System",
                description: "Professional teleprompter for presentations",
                category: "Support",
                pricePerDay: 80,
                pricePerWeek: 400,
                pricePerMonth: 1280,
                availability: true,
                specifications: "15\" monitor, hood, remote control, adjustable mount",
                createdAt: now,
                updatedAt: now,
            },
            {
                name: "Secure DIT Station",
                description: "Digital imaging technician workstation",
                category: "Support",
                pricePerDay: 150,
                pricePerWeek: 750,
                pricePerMonth: 2400,
                availability: true,
                specifications: "Laptop, external drives, checksum verification, backup system",
                createdAt: now,
                updatedAt: now,
            },
        ];

        for (const equipment of equipmentData) {
            // Check if equipment already exists by querying all equipment and filtering
            const allEquipment = await ctx.db.query("equipment").collect();
            const existingEquipment = allEquipment.find((eq: any) => eq.name === equipment.name);

            if (!existingEquipment) {
                await ctx.db.insert("equipment", equipment);
            }
        }

        return { success: true, message: "Equipment inventory seeded successfully" };
    },
});
