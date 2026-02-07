import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import type { Event } from "@/drizzle/schema";

export function useEvents(startDate?: Date, endDate?: Date) {
  const { data: events, isLoading, refetch } = trpc.events.list.useQuery({
    startDate,
    endDate,
  });

  const getNextEvent = (): Event | null => {
    if (!events || events.length === 0) return null;
    
    const now = new Date();
    const upcoming = events.filter((e: Event) => new Date(e.startDate) > now);
    return upcoming.length > 0 ? upcoming[0] : null;
  };

  return {
    events: events || [],
    nextEvent: getNextEvent(),
    isLoading,
    refetch,
  };
}
