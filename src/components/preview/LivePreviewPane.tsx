'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LivePreviewPaneProps {
  htmlContent: string;
}

export function LivePreviewPane({ htmlContent }: LivePreviewPaneProps) {
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    // Force re-render of iframe by changing key when htmlContent changes
    setRenderKey(prevKey => prevKey + 1);
  }, [htmlContent]);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">Live Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <iframe
          key={renderKey} // Add key here
          srcDoc={htmlContent}
          title="Live Preview"
          className="w-full h-full border-0 rounded-b-md"
          sandbox="allow-scripts allow-same-origin" // Adjust sandbox as needed
          data-ai-hint="webpage preview"
        />
      </CardContent>
    </Card>
  );
}
