"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { CalendarView } from "@/components/CalendarView";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ThemeToggle } from "@/components/ThemeToggle";
import { showSuccess } from "@/utils/toast";

export default function Index() {
  const [todos, setTodos] = useState<Array<{
    id: string; 
    text: string; 
    completed: boolean;
    date: Date;
  }>>([]);
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const addTodo = (text: string, date: Date = new Date()) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
      date
    };
    setTodos([...todos, newTodo]);
    showSuccess("Todo added!");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    showSuccess("Todo deleted!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Todo List</h1>
          <div className="flex gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
              className="p-2 rounded hover:bg-accent"
            >
              {view === 'list' ? 'Calendar View' : 'List View'}
            </button>
          </div>
        </div>

        {view === 'list' ? (
          <>
            <TodoForm onAdd={(text) => addTodo(text)} />
            <TodoList 
              todos={todos} 
              onToggle={toggleTodo} 
              onDelete={deleteTodo} 
            />
          </>
        ) : (
          <CalendarView 
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onAddTodo={addTodo}
            onSwitchView={() => setView('list')}
          />
        )}
        
        <MadeWithDyad />
      </div>
    </div>
  );
}