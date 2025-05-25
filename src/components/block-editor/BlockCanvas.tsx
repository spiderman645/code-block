
'use client';

import type { Block } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Trash2, Edit3, Save } from 'lucide-react';
import React, { useState } from 'react';
import { BLOCK_DEFINITIONS } from '@/lib/constants';
import { cn } from "@/lib/utils"; // Added cn utility

interface BlockCanvasProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

interface EditingBlockState {
  id: string;
  content?: string;
  attributes?: Record<string, string>;
}

export function BlockCanvas({ blocks, setBlocks }: BlockCanvasProps) {
  const [editingBlock, setEditingBlock] = useState<EditingBlockState | null>(null);

  const handleDeleteBlock = (id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  const handleEditBlock = (block: Block) => {
    setEditingBlock({ id: block.id, content: block.content, attributes: { ...block.attributes } });
  };

  const handleSaveEdit = () => {
    if (!editingBlock) return;
    setBlocks(prevBlocks => prevBlocks.map(b => 
      b.id === editingBlock.id ? { ...b, content: editingBlock.content, attributes: editingBlock.attributes } : b
    ));
    setEditingBlock(null);
  };

  const handleAttributeChange = (key: string, value: string) => {
    if (!editingBlock) return;
    setEditingBlock(prev => ({
      ...prev!,
      attributes: { ...prev!.attributes, [key]: value }
    }));
  };
  
  const handleContentChange = (value: string) => {
    if (!editingBlock) return;
    setEditingBlock(prev => ({ ...prev!, content: value }));
  };

  const getBlockDefinition = (type: string) => BLOCK_DEFINITIONS.find(def => def.type === type);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">Block Canvas</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-[calc(100vh-20rem)] p-4"> {/* Adjust height as needed */}
          {blocks.length === 0 && (
            <p className="text-muted-foreground text-center py-10">
              Your canvas is empty. Add blocks from the toolbox.
            </p>
          )}
          {blocks.map((block) => {
            const definition = getBlockDefinition(block.type);
            const IconComponent = definition?.icon;
            const isEditingThisBlock = editingBlock?.id === block.id;

            return (
              <div
                key={block.id}
                className={cn(
                  "p-3 mb-2 border rounded-md shadow-sm bg-background hover:shadow-md transition-all",
                  isEditingThisBlock && "ring-2 ring-primary shadow-lg border-primary bg-muted" // Enhanced style for editing block
                )}
                data-ai-hint={block.type}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
                    <span className="font-medium text-sm capitalize">{block.type}</span>
                  </div>
                  <div className="space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditBlock(block)} title="Edit">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteBlock(block.id)} title="Delete">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {isEditingThisBlock ? (
                  <div className="space-y-2 p-2 border-t border-primary/50 mt-2"> {/* Subtle top border in edit mode */}
                    {definition?.hasContent && !definition.isVoid && (
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Content:</label>
                        <Input
                          type="text"
                          value={editingBlock?.content || ''}
                          onChange={(e) => handleContentChange(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    )}
                    {Object.keys(editingBlock?.attributes || {}).length > 0 && (
                       Object.keys(editingBlock!.attributes!).map(attrKey => (
                        <div key={attrKey}>
                          <label className="text-xs font-medium text-muted-foreground capitalize">{attrKey}:</label>
                          <Input
                            type="text"
                            value={editingBlock?.attributes?.[attrKey] || ''}
                            onChange={(e) => handleAttributeChange(attrKey, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      ))
                    )}
                     <Button onClick={handleSaveEdit} size="sm" className="mt-2">
                      <Save className="w-4 h-4 mr-2"/> Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="pt-1"> {/* Added some padding for non-editing display */}
                    {block.content && <p className="text-sm text-foreground truncate">Content: {block.content}</p>}
                    {block.attributes && Object.entries(block.attributes).map(([key, val]) => (
                       <p key={key} className="text-xs text-muted-foreground truncate">{key}: {val}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
