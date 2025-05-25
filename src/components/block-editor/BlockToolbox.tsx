'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BLOCK_DEFINITIONS } from '@/lib/constants';
import type { BlockDefinition } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlockToolboxProps {
  onAddBlock: (blockType: string) => void;
}

export function BlockToolbox({ onAddBlock }: BlockToolboxProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">HTML Blocks</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-full p-4">
          <div className="grid grid-cols-2 gap-2">
            {BLOCK_DEFINITIONS.map((def: BlockDefinition) => (
              <Button
                key={def.type}
                variant="outline"
                className="flex flex-col items-center justify-center h-20 p-2 text-center hover:bg-accent hover:text-accent-foreground"
                onClick={() => onAddBlock(def.type)}
                title={`Add <${def.type}> block`}
              >
                <def.icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{def.name}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
