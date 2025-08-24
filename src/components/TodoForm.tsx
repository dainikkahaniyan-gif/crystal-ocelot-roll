"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showError } from "@/utils/toast";
import { Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, setHours, setMinutes } from "date-fns";

interface TodoFormProps {
  onAdd: (text: string, date: Date) => void;
}

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [text, setText] = useState("");
  const [time, setTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      showError("Todo cannot be empty");
      return;
    }
    
    const dueDate = time || new Date();
    onAdd(text, dueDate);
    setText("");
    setTime(null);
  };

  const handleTimeSelect = (hours: number, minutes: number) => {
    const now = new Date();
    const selectedTime = setMinutes(setHours(now, hours), minutes);
    setTime(selectedTime);
    setShowTimePicker(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      
      <Popover open={showTimePicker} onOpenChange={setShowTimePicker}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={time ? "default" : "outline"}
            size="icon"
          >
            <Clock className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 24 }).map((_, hour) => (
              <Button
                key={hour}
                variant="ghost"
                size="sm"
                onClick={() => handleTimeSelect(hour, 0)}
                className={time?.getHours() === hour ? "bg-accent" : ""}
              >
                {`${hour}:00`}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Button type="submit">Add</Button>
    </form>
  );
};