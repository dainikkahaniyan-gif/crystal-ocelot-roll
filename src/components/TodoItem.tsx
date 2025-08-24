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
    <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          checked={completed} 
          onCheckedChange={() => onToggle(id)}
        />
        <div>
          <span className={completed ? "line-through text-gray-500" : ""}>
            {text}
          </span>
          {date && (
            <div className="text-xs text-gray-500">
              {format(date, 'MMM d, yyyy')}
            </div>
          )}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onDelete(id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};