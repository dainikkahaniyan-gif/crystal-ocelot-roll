"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";
import { TodoItem } from "./TodoItem";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar.css";

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
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <Button variant="outline" onClick={onSwitchView} className="gap-2">
          <List className="h-4 w-4" /> List View
        </Button>
      </div>
      
      <div className="bg-card rounded-lg border p-4 shadow-sm">
        <Calendar 
          onChange={setDate} 
          value={date}
          className="w-full border-none"
          tileClassName={({ date, view }) => 
            view === 'month' && todos.some(todo => isSameDay(todo.date, date)) 
              ? 'has-todo' 
              : ''
          }
        />
      </div>

      {date instanceof Date && (
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {format(date, 'EEEE, MMMM d')}
            </h3>
            <span className="text-sm text-muted-foreground">
              {todosForSelectedDate.length} {todosForSelectedDate.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Add a task for this date..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <Button onClick={handleAddTodo} className="px-4">
              Add Task
            </Button>
          </div>

          {todosForSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {todosForSelectedDate.map(todo => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  date={todo.date}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No tasks scheduled for this day
            </div>
          )}
        </div>
      )}
    </div>
  );
};