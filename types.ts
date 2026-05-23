
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  video?: string;
  shortDescription?: string;
  description?: string;
  points?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface OrgMember {
  id: string;
  name: string;
  role: string;
  image: string;
  details: string;
  experiences: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  projectType: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export type SectionId = 'home' | 'services' | 'work' | 'team' | 'contact';
