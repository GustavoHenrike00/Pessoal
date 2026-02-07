import { View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";

interface CalendarPickerProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export function CalendarPicker({ onDateSelect, selectedDate }: CalendarPickerProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days: (number | null)[] = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDaySelect = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect?.(newDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <View className="gap-4">
      {/* Month/Year Header */}
      <View className="flex-row items-center justify-between px-4">
        <Pressable onPress={handlePrevMonth} className="p-2">
          <Text className="text-lg text-primary">‹</Text>
        </Pressable>
        <Text className="text-lg font-semibold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <Pressable onPress={handleNextMonth} className="p-2">
          <Text className="text-lg text-primary">›</Text>
        </Pressable>
      </View>

      {/* Day names */}
      <View className="flex-row justify-between px-4 gap-1">
        {dayNames.map((day) => (
          <View key={day} className="flex-1 items-center">
            <Text className="text-xs font-semibold text-muted">{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View className="px-4 gap-2">
        {Array.from({ length: Math.ceil(days.length / 7) }).map((_: unknown, weekIndex: number) => (
          <View key={weekIndex} className="flex-row justify-between gap-1">
            {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
              <Pressable
                key={dayIndex}
                onPress={() => day && handleDaySelect(day)}
                className={`flex-1 aspect-square rounded-lg items-center justify-center ${
                  day ? (isToday(day) ? "bg-primary" : "bg-surface") : "bg-transparent"
                }`}
              >
                <Text className={`text-sm font-medium ${
                  day ? (isToday(day) ? "text-background" : "text-foreground") : ""
                }`}>
                  {day}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
