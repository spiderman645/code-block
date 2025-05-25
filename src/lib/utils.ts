import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Block } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function blocksToHtml(blocks: Block[]): string {
  return blocks
    .map((block) => {
      let attrs = '';
      if (block.attributes) {
        attrs = Object.entries(block.attributes)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ');
      }
      
      const openTag = `<${block.type}${attrs ? ' ' + attrs : ''}>`;

      // Handle self-closing (void) elements
      if (['img', 'br', 'hr', 'input', 'link', 'meta'].includes(block.type.toLowerCase())) {
        return openTag;
      }
      
      const closeTag = `</${block.type}>`;
      // For simplicity, children are not handled here yet.
      // If a block can have children (e.g. div, ul), this logic would need to be recursive.
      // For now, content is assumed to be text or empty.
      return `${openTag}${block.content || ''}${closeTag}`;
    })
    .join('\\n');
}

export const generateId = (): string => Math.random().toString(36).substring(2, 11);

export function normalizeHtmlForComparison(html: string): string {
  // Remove HTML comments, then collapse multiple whitespace chars (including newlines) into a single space,
  // remove spaces between tags, and finally trim leading/trailing whitespace.
  return html
    .replace(/<!--.*?-->/gs, '') // Remove HTML comments
    .replace(/\s+/g, ' ')        // Collapse multiple whitespace/newlines to a single space
    .replace(/>\s+</g, '><')     // Remove whitespace between tags
    .trim();
}
