"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ThemeToggle } from "@/components/ThemeToggle";
import { showSuccess } from "@/utils/toast";

export default function Index() {
  const [todos, setTodos] = useState<Array<{id: string; text: string; completed: boolean}>>([]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
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
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Todo List</h1>
          <ThemeToggle />
        </div>
        <TodoForm onAdd={addTodo} />
        <TodoList 
          todos={todos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
        />
        <MadeWithDyad />
      </div>
    </div>
  );
}