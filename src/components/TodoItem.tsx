"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  date?: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ id, text, completed, date, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-background rounded-lg border hover:bg-accent/50 transition-colors">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <Checkbox 
          checked={completed} 
          onCheckedChange={() => onToggle(id)}
          className="h-5 w-5 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {text}
          </p>
          {date && (
            <p className="text-xs text-muted-foreground">
              {format(date, 'h:mm a')}
            </p>
          )}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onDelete(id)}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};