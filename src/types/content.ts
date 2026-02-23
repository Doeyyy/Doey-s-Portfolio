export type ContentBlock =
  | { id: string; type: "text"; content: string }
  | { id: string; type: "heading"; content: string }
  | { id: string; type: "image"; src: string; alt: string; caption?: string }
  | { id: string; type: "video"; src: string; caption?: string }
  | { id: string; type: "gallery"; images: { src: string; alt: string }[]; caption?: string };

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  description: string;
  year: string;
  image: string;
  featured: boolean;
  meta: {
    role: string;
    timeline: string;
    tools: string[];
  };
  content: ContentBlock[];
}

let nextId = 1;
export const genId = () => `block-${Date.now()}-${nextId++}`;
