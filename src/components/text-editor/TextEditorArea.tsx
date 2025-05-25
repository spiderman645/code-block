'use client';

import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TextEditorAreaProps {
  htmlContent: string;
  onHtmlContentChange: (newContent: string) => void;
}

export function TextEditorArea({ htmlContent, onHtmlContentChange }: TextEditorAreaProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">HTML Code Editor</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <Textarea
          value={htmlContent}
          onChange={(e) => onHtmlContentChange(e.target.value)}
          placeholder="Write your HTML code here..."
          className="w-full h-full min-h-[calc(100vh-20rem)] resize-none border-0 rounded-none font-mono text-sm p-4 focus:ring-0 focus-visible:ring-0"
        />
      </CardContent>
    </Card>
  );
}
