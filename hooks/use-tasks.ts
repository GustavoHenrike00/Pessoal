import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import type { Task } from "@/drizzle/schema";

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  progress: number;
}

export function useTasks(date?: Date) {
  const { data: tasks, isLoading, refetch } = trpc.tasks.list.useQuery({
    date: date || new Date(),
  });

  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    progress: 0,
  });

  useEffect(() => {
    if (tasks) {
      const completed = tasks.filter((t: Task) => t.isCompleted).length;
      const total = tasks.length;
      setStats({
        total,
        completed,
        pending: total - completed,
        progress: total > 0 ? (completed / total) * 100 : 0,
      });
    }
  }, [tasks]);

  return {
    tasks: tasks || [],
    stats,
    isLoading,
    refetch,
  };
}
