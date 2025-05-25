'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { BlockToolbox } from '@/components/block-editor/BlockToolbox';
import { BlockCanvas } from '@/components/block-editor/BlockCanvas';
import { TextEditorArea } from '@/components/text-editor/TextEditorArea';
import { LivePreviewPane } from '@/components/preview/LivePreviewPane';
import { AiAssistantPanel } from '@/components/ai-assistant/AiAssistantPanel';
import { ExercisesPanel } from '@/components/exercises/ExercisesPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Block } from '@/lib/types';
import { blocksToHtml, generateId, normalizeHtmlForComparison } from '@/lib/utils';
import { BLOCK_DEFINITIONS, GUIDED_EXERCISES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";


export default function HomePage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [activeEditor, setActiveEditor] = useState<'blocks' | 'text'>('blocks');
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [completedExerciseIds, setCompletedExerciseIds] = useState<string[]>([]);
  const { toast } = useToast();

  // Sync HTML code when blocks change
  useEffect(() => {
    const newHtmlCode = blocksToHtml(blocks);
    setHtmlCode(newHtmlCode);
  }, [blocks]);

  // Check for exercise completion
  useEffect(() => {
    if (activeExerciseId && htmlCode) {
      const exercise = GUIDED_EXERCISES.find(ex => ex.id === activeExerciseId);
      if (exercise && !completedExerciseIds.includes(activeExerciseId)) {
        const currentNormalized = normalizeHtmlForComparison(htmlCode);
        const targetNormalized = normalizeHtmlForComparison(exercise.targetHtmlSnippet);

        if (currentNormalized === targetNormalized) {
          toast({
            title: "🎉 Congratulations! 🎉",
            description: `You've completed "${exercise.title}"!`,
            variant: "default",
            duration: 5000,
          });
          setCompletedExerciseIds(prev => [...prev, activeExerciseId]);
          // Optionally, you could clear the active exercise or move to the next one
          // setActiveExerciseId(null); 
        }
      }
    }
  }, [htmlCode, activeExerciseId, completedExerciseIds, toast]);

  const handleAddBlock = useCallback((blockType: string) => {
    const definition = BLOCK_DEFINITIONS.find(def => def.type === blockType);
    if (!definition) return;

    const newBlock: Block = {
      id: generateId(),
      type: blockType,
      content: definition.hasContent && !definition.isVoid ? `Sample ${definition.name}` : undefined,
      attributes: definition.defaultAttributes ? { ...definition.defaultAttributes } : undefined,
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    toast({ title: "Block Added", description: `<${blockType}> block added to the canvas.` });
  }, [toast]);

  const handleHtmlContentChange = (newContent: string) => {
    setHtmlCode(newContent);
    // Note: For simplicity, text editor changes don't sync back to blocks in this scaffold.
    // A more advanced version would parse HTML to update the block structure.
    if (activeEditor === 'text') {
      toast({
        title: "HTML Updated",
        description: "Live preview and AI assistant will use the new code. Block view may be out of sync.",
        variant: "default"
      });
    }
  };
  
  const handleExport = () => {
    if (!htmlCode) {
      toast({ title: "Nothing to Export", description: "The HTML code is empty.", variant: "destructive" });
      return;
    }
    const blob = new Blob([`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Block2Web Export</title>\n</head>\n<body>\n${htmlCode}\n</body>\n</html>`], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'block2web_export.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast({ title: "Export Successful", description: "HTML file downloaded." });
  };

  const handlePreviewInTab = () => {
    if (!htmlCode) {
      toast({ title: "Nothing to Preview", description: "The HTML code is empty.", variant: "destructive" });
      return;
    }
    const previewWindow = window.open();
    if (previewWindow) {
      previewWindow.document.write(`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Block2Web Preview</title>\n</head>\n<body>\n${htmlCode}\n</body>\n</html>`);
      previewWindow.document.close();
    } else {
      toast({ title: "Popup Blocked", description: "Please allow popups for this site to preview the HTML.", variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <AppHeader onExport={handleExport} onPreviewInTab={handlePreviewInTab} />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1 border-t">
        {/* Left Sidebar: Toolbox & Exercises */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <aside className="h-full p-1 md:p-2 flex flex-col overflow-y-auto">
            <Tabs defaultValue="toolbox" className="flex-1 flex flex-col">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="toolbox">Toolbox</TabsTrigger>
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
              </TabsList>
              <TabsContent value="toolbox" className="flex-1 mt-2">
                <BlockToolbox onAddBlock={handleAddBlock} />
              </TabsContent>
              <TabsContent value="exercises" className="flex-1 mt-2">
                <ExercisesPanel 
                  activeExerciseId={activeExerciseId}
                  completedExerciseIds={completedExerciseIds}
                  onSelectExercise={setActiveExerciseId}
                />
              </TabsContent>
            </Tabs>
          </aside>
        </ResizablePanel>
        
        <ResizableHandle withHandle />

        {/* Main Workspace: Editor (Block/Text) */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <main className="h-full p-1 md:p-2 flex flex-col overflow-y-auto">
            <Tabs value={activeEditor} onValueChange={(value) => setActiveEditor(value as 'blocks' | 'text')} className="flex-1 flex flex-col">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="blocks">Block Editor</TabsTrigger>
                <TabsTrigger value="text">Text Editor</TabsTrigger>
              </TabsList>
              <TabsContent value="blocks" className="flex-1 mt-2">
                <BlockCanvas blocks={blocks} setBlocks={setBlocks} />
              </TabsContent>
              <TabsContent value="text" className="flex-1 mt-2">
                <TextEditorArea htmlContent={htmlCode} onHtmlContentChange={handleHtmlContentChange} />
              </TabsContent>
            </Tabs>
          </main>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Sidebar: Preview & AI Assistant */}
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <aside className="h-full p-1 md:p-2 flex flex-col overflow-y-auto">
            <Tabs defaultValue="preview" className="flex-1 flex flex-col">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="flex-1 mt-2">
                <LivePreviewPane htmlContent={htmlCode} />
              </TabsContent>
              <TabsContent value="ai" className="flex-1 mt-2">
                <AiAssistantPanel currentHtml={htmlCode} />
              </TabsContent>
            </Tabs>
          </aside>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
