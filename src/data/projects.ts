import luminaImg from "@/assets/project-lumina.jpg";
import verdantImg from "@/assets/project-verdant.jpg";
import sonanceImg from "@/assets/project-sonance.jpg";
import type { ProjectData } from "@/types/content";

export const defaultProjects: ProjectData[] = [
  {
    slug: "lumina",
    title: "Lumina",
    category: "Web Application",
    description: "A modern analytics dashboard with real-time data visualization and intuitive controls.",
    year: "2025",
    image: luminaImg,
    featured: true,
    meta: {
      role: "Lead Developer & Designer",
      timeline: "3 months",
      tools: ["React", "TypeScript", "D3.js", "Tailwind CSS", "Node.js"],
    },
    content: [
      { id: "l1", type: "heading", content: "Overview" },
      { id: "l2", type: "text", content: "Lumina is a next-generation analytics platform that transforms complex datasets into clear, actionable insights. Built for data-driven teams who need real-time visibility into their metrics." },
      { id: "l3", type: "image", src: luminaImg, alt: "Lumina dashboard overview", caption: "The main analytics dashboard with real-time charts" },
      { id: "l4", type: "heading", content: "The Challenge" },
      { id: "l5", type: "text", content: "Traditional dashboards overwhelm users with raw data tables and unintuitive interfaces. Teams were spending hours extracting insights instead of acting on them." },
      { id: "l6", type: "heading", content: "The Solution" },
      { id: "l7", type: "text", content: "I designed a modular dashboard system with smart data visualization that automatically selects the best chart type for each metric. Real-time WebSocket connections ensure data freshness, while a custom theming engine lets teams brand their experience." },
      { id: "l8", type: "heading", content: "The Result" },
      { id: "l9", type: "text", content: "40% faster insight discovery. Adopted by 12 enterprise clients within the first quarter. User satisfaction scores averaging 4.8/5." },
    ],
  },
  {
    slug: "verdant",
    title: "Verdant",
    category: "E-Commerce",
    description: "Sustainable fashion marketplace with an immersive shopping experience.",
    year: "2024",
    image: verdantImg,
    featured: true,
    meta: {
      role: "Full-Stack Developer",
      timeline: "4 months",
      tools: ["Next.js", "Stripe", "PostgreSQL", "Framer Motion", "Python"],
    },
    content: [
      { id: "v1", type: "heading", content: "Overview" },
      { id: "v2", type: "text", content: "Verdant reimagines online fashion shopping with a focus on sustainability. Every product includes a transparency score showing its environmental impact." },
      { id: "v3", type: "image", src: verdantImg, alt: "Verdant storefront", caption: "The immersive sustainable fashion storefront" },
      { id: "v4", type: "heading", content: "The Challenge" },
      { id: "v5", type: "text", content: "Sustainable fashion brands struggle to compete with fast fashion's slick online experiences. Shoppers want eco-friendly options but expect the same level of polish and convenience." },
      { id: "v6", type: "heading", content: "The Solution" },
      { id: "v7", type: "text", content: "Built an immersive storefront with cinematic product presentations, a sustainability scoring system, and a virtual try-on feature powered by AI. The checkout flow is streamlined to reduce cart abandonment." },
      { id: "v8", type: "heading", content: "The Result" },
      { id: "v9", type: "text", content: "28% increase in conversion rate. Average session duration up 3x. Featured in Dezeen and Wired as a standout sustainable commerce experience." },
    ],
  },
  {
    slug: "sonance",
    title: "Sonance",
    category: "Mobile App",
    description: "Music discovery platform connecting independent artists with listeners worldwide.",
    year: "2024",
    image: sonanceImg,
    featured: true,
    meta: {
      role: "Frontend Developer",
      timeline: "5 months",
      tools: ["Networking", "Figma", "Aws", "Python", "Ansible", "Django"],
    },
    content: [
      { id: "s1", type: "heading", content: "Overview" },
      { id: "s2", type: "text", content: "Sonance breaks the algorithmic bubble by connecting listeners directly with independent artists through curated discovery sessions and live listening rooms." },
      { id: "s3", type: "image", src: sonanceImg, alt: "Sonance mobile app", caption: "The Sonance discovery interface on mobile" },
      { id: "s4", type: "heading", content: "The Challenge" },
      { id: "s5", type: "text", content: "Independent musicians are buried by major-label-dominated algorithms. Listeners are stuck in echo chambers, missing out on incredible undiscovered talent." },
      { id: "s6", type: "heading", content: "The Solution" },
      { id: "s7", type: "text", content: "Developed a discovery engine based on sonic fingerprinting rather than popularity metrics. Live listening rooms let fans and artists connect in real-time. A gesture-based UI makes exploration feel natural and playful." },
      { id: "s8", type: "heading", content: "The Result" },
      { id: "s9", type: "text", content: "50K+ monthly active users within 6 months. Over 8,000 independent artists onboarded. Average discovery-to-save rate of 34%." },
    ],
  },
];
