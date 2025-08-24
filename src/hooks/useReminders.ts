"use client";

import { useEffect, useState } from "react";
import { showSuccess } from "@/utils/toast";
import alarmSound from "@/assets/alarm.mp3";

export function useReminders(todos: Array<{id: string; text: string; date: Date}>) {
  const [activeReminders, setActiveReminders] = useState<Set<string>>(new Set());
  const [audio] = useState(() => new Audio(alarmSound));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newActiveReminders = new Set<string>();

      todos.forEach(todo => {
        if (todo.date <= now && !activeReminders.has(todo.id)) {
          newActiveReminders.add(todo.id);
          showSuccess(`Reminder: ${todo.text}`);
          audio.play().catch(e => console.error("Audio playback failed:", e));
        }
      });

      if (newActiveReminders.size > 0) {
        setActiveReminders(prev => new Set([...prev, ...newActiveReminders]));
      }
    }, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, [todos, activeReminders, audio]);

  const dismissReminder = (id: string) => {
    setActiveReminders(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  return { activeReminders, dismissReminder };
}