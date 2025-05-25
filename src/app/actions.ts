// This file needs to be a server component to use server actions
// However, the Genkit flow itself is already marked 'use server'
// So we can directly import and use it.
// For clarity, we'll create a wrapper action.
'use server';

import { improveHtmlCode as improveHtmlCodeFlow, ImproveHtmlCodeInput, ImproveHtmlCodeOutput } from '@/ai/flows/improve-html-code';

export async function analyzeAndImproveHtml(htmlCode: string): Promise<ImproveHtmlCodeOutput> {
  try {
    const input: ImproveHtmlCodeInput = { htmlCode };
    const result = await improveHtmlCodeFlow(input);
    return result;
  } catch (error) {
    console.error("Error in AI code improvement:", error);
    // Consider returning a more structured error
    return { improvedHtmlCode: `// Error improving code: ${error instanceof Error ? error.message : String(error)}\n\n${htmlCode}` };
  }
}
