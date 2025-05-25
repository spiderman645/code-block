import type { LucideIcon } from 'lucide-react';

export interface Block {
  id: string;
  type: string; // e.g., 'p', 'h1', 'img', 'div'
  content?: string; // For text content
  attributes?: Record<string, string>; // For attributes like src, alt, href
  // children?: Block[]; // Nesting deferred for initial scaffold
}

export interface BlockDefinition {
  type: string;
  name: string;
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  defaultAttributes?: Record<string, string>;
  hasContent?: boolean;
  isVoid?: boolean; // For self-closing tags like img, br
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  targetHtmlSnippet: string;
}
