'use server';

/**
 * @fileOverview This file defines a Genkit flow for improving HTML code based on best practices.
 *
 * - improveHtmlCode - A function that takes HTML code as input and returns improved HTML code with suggestions.
 * - ImproveHtmlCodeInput - The input type for the improveHtmlCode function.
 * - ImproveHtmlCodeOutput - The return type for the improveHtmlCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveHtmlCodeInputSchema = z.object({
  htmlCode: z
    .string()
    .describe('The HTML code to be improved.'),
});
export type ImproveHtmlCodeInput = z.infer<typeof ImproveHtmlCodeInputSchema>;

const ImproveHtmlCodeOutputSchema = z.object({
  improvedHtmlCode: z.string().describe('The improved HTML code with suggestions.'),
});
export type ImproveHtmlCodeOutput = z.infer<typeof ImproveHtmlCodeOutputSchema>;

export async function improveHtmlCode(input: ImproveHtmlCodeInput): Promise<ImproveHtmlCodeOutput> {
  return improveHtmlCodeFlow(input);
}

const improveHtmlCodePrompt = ai.definePrompt({
  name: 'improveHtmlCodePrompt',
  input: {schema: ImproveHtmlCodeInputSchema},
  output: {schema: ImproveHtmlCodeOutputSchema},
  prompt: `You are an AI assistant that helps improve HTML code based on best practices.

  Analyze the following HTML code and suggest improvements to make it cleaner, more efficient, and adhere to HTML best practices. Provide the improved code along with explanations for the changes.

  HTML Code:
  \`\`\`html
  {{{htmlCode}}}
  \`\`\`

  Improved HTML Code with Suggestions:`,
});

const improveHtmlCodeFlow = ai.defineFlow(
  {
    name: 'improveHtmlCodeFlow',
    inputSchema: ImproveHtmlCodeInputSchema,
    outputSchema: ImproveHtmlCodeOutputSchema,
  },
  async input => {
    const {output} = await improveHtmlCodePrompt(input);
    return output!;
  }
);
