'use client';

import { GUIDED_EXERCISES } from '@/lib/constants';
import type { Exercise } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Play } from 'lucide-react';

interface ExercisesPanelProps {
  activeExerciseId: string | null;
  completedExerciseIds: string[];
  onSelectExercise: (exerciseId: string) => void;
}

export function ExercisesPanel({ activeExerciseId, completedExerciseIds, onSelectExercise }: ExercisesPanelProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">Guided Exercises</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-full p-4">
          <Accordion type="single" collapsible className="w-full">
            {GUIDED_EXERCISES.map((exercise: Exercise) => {
              const isCompleted = completedExerciseIds.includes(exercise.id);
              const isActive = activeExerciseId === exercise.id;

              return (
                <AccordionItem value={exercise.id} key={exercise.id}>
                  <AccordionTrigger 
                    className={`text-sm font-medium hover:no-underline ${isCompleted ? 'text-green-600' : isActive ? 'text-primary' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                       {isCompleted ? <CheckCircle className="w-4 h-4 text-green-500" /> : isActive ? <Play className="w-4 h-4 text-primary fill-primary" /> : <Circle className="w-4 h-4 text-muted-foreground" />}
                      {exercise.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CardDescription className="mb-2 text-sm">{exercise.description}</CardDescription>
                    <p className="text-xs font-semibold mb-1">Target HTML:</p>
                    <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                      <code>{exercise.targetHtmlSnippet}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant={isActive && !isCompleted ? "default" : "outline"}
                      onClick={() => onSelectExercise(exercise.id)}
                      disabled={isCompleted}
                      className="mt-3 w-full"
                    >
                      {isCompleted ? (
                        <> <CheckCircle className="mr-2 h-4 w-4" /> Completed!</>
                      ) : isActive ? (
                        <> <Play className="mr-2 h-4 w-4" /> Actively Working </>
                      ) : (
                        <> <Play className="mr-2 h-4 w-4" /> Start Exercise </>
                      )}
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
