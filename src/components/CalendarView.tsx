"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";
import { TodoItem } from "./TodoItem";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarViewProps {
  todos: Array<{id: string; text: string; completed: boolean; date: Date}>;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddTodo: (text: string, date: Date) => void;
  onSwitchView: () => void;
}

export const CalendarView = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onAddTodo,
  onSwitchView
}: CalendarViewProps) => {
  const [date, setDate] = useState<Value>(new Date());
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodoText.trim() && date instanceof Date) {
      onAddTodo(newTodoText, date);
      setNewTodoText("");
    }
  };

  const todosForSelectedDate = todos.filter(todo => 
    date instanceof Date && isSameDay(todo.date, date)
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Calendar View</h2>
        <Button variant="outline" onClick={onSwitchView}>
          <List className="mr-2 h-4 w-4" /> Switch to List
        </Button>
      </div>
      
      <Calendar 
        onChange={setDate} 
        value={date}
        className="rounded-md border"
        tileClassName={({ date, view }) => 
          view === 'month' && todos.some(todo => isSameDay(todo.date, date)) 
            ? 'bg-blue-100 dark:bg-blue-900' 
            : null
        }
      />

      {date instanceof Date && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">
            Tasks for {format(date, 'MMMM d, yyyy')}
          </h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Add a task for this date..."
              className="flex-1 p-2 border rounded"
              onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <Button onClick={handleAddTodo}>Add</Button>
          </div>
          {todosForSelectedDate.length > 0 ? (
            <div className="space-y-2">
              {todosForSelectedDate.map(todo => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tasks for this date</p>
          )}
        </div>
      )}
    </div>
  );
};