'use client';

import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

interface AppHeaderProps {
  onExport: () => void;
  onPreviewInTab: () => void;
}

export function AppHeader({ onExport, onPreviewInTab }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card shadow-sm">
      <h1 className="text-2xl font-bold text-primary">Block2Web</h1>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPreviewInTab}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export HTML
        </Button>
      </div>
    </header>
  );
}
