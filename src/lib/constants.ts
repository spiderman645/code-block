import type { BlockDefinition, Exercise } from '@/lib/types';
import {
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  LayoutDashboard,
  Link as LinkIcon,
  List,
  ListOrdered,
  MousePointerSquareDashed, // Changed from MousePointerSquare
  Pilcrow,
  Type,
  WrapText,
  Minus,
} from 'lucide-react';

export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  { type: 'div', name: 'Division', icon: LayoutDashboard, hasContent: true },
  { type: 'p', name: 'Paragraph', icon: Pilcrow, hasContent: true },
  { type: 'h1', name: 'Heading 1', icon: Heading1, hasContent: true },
  { type: 'h2', name: 'Heading 2', icon: Heading2, hasContent: true },
  { type: 'h3', name: 'Heading 3', icon: Heading3, hasContent: true },
  {
    type: 'img',
    name: 'Image',
    icon: ImageIcon,
    defaultAttributes: { src: 'https://placehold.co/100x100.png', alt: 'placeholder image' },
    isVoid: true,
  },
  { type: 'a', name: 'Link', icon: LinkIcon, defaultAttributes: { href: '#' }, hasContent: true },
  { type: 'button', name: 'Button', icon: MousePointerSquareDashed, hasContent: true }, // Changed from MousePointerSquare
  { type: 'ul', name: 'Unordered List', icon: List, hasContent: true }, // Content will be <li>
  { type: 'li', name: 'List Item', icon: Minus, hasContent: true },
  { type: 'span', name: 'Span', icon: Type, hasContent: true },
  { type: 'br', name: 'Line Break', icon: WrapText, isVoid: true },
];

export const GUIDED_EXERCISES: Exercise[] = [
  {
    id: 'ex1',
    title: 'Exercise 1: Basic Page Structure',
    description: 'Create a simple webpage with a main heading and a paragraph of text.',
    targetHtmlSnippet: `<h1>My First Webpage</h1>\n<p>Welcome to my first block-coded HTML page!</p>`,
  },
  {
    id: 'ex2',
    title: 'Exercise 2: Adding an Image',
    description: 'Add an image to your page below the paragraph. You can use the default placeholder or change its src.',
    targetHtmlSnippet: `<img src="https://placehold.co/300x200.png" alt="A sample image">`,
  },
  {
    id: 'ex3',
    title: 'Exercise 3: Creating a Link',
    description: 'Create a link that says "Learn More" and points to "https://example.com".',
    targetHtmlSnippet: `<a href="https://example.com">Learn More</a>`,
  },
];
