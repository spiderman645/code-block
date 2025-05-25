'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { analyzeAndImproveHtml } from '@/app/actions';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AiAssistantPanelProps {
  currentHtml: string;
}

export function AiAssistantPanel({ currentHtml }: AiAssistantPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [improvedCode, setImprovedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyzeCode = async () => {
    if (!currentHtml.trim()) {
      toast({
        title: "Empty Code",
        description: "There's no HTML code to analyze.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setImprovedCode(null);
    try {
      const result = await analyzeAndImproveHtml(currentHtml);
      setImprovedCode(result.improvedHtmlCode);
      toast({
        title: "Analysis Complete",
        description: "AI suggestions have been generated.",
      });
    } catch (error) {
      console.error('AI Analysis Error:', error);
      setImprovedCode(`// Error analyzing code: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast({
        title: "Analysis Failed",
        description: "Could not get AI suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">AI Code Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 p-4">
        <Button onClick={handleAnalyzeCode} disabled={isLoading}>
          <Wand2 className="mr-2 h-4 w-4" />
          {isLoading ? 'Analyzing...' : 'Analyze & Suggest Improvements'}
        </Button>
        {improvedCode && (
          <div className="flex-grow flex flex-col">
            <h3 className="text-md font-semibold mb-2">Suggested Improvements:</h3>
            <ScrollArea className="flex-grow rounded-md border h-64"> {/* Set a fixed or relative height */}
              <Textarea
                value={improvedCode}
                readOnly
                className="w-full h-full min-h-[200px] font-mono text-sm p-2 resize-none border-0"
                aria-label="Improved HTML Code"
              />
            </ScrollArea>
          </div>
        )}
         {!improvedCode && !isLoading && (
          <p className="text-muted-foreground text-center py-10">
            Click the button above to analyze your HTML and get AI-powered suggestions.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
