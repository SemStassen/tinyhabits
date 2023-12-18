export interface createHabitDto {
  name: string;
}

export type createHabit = (habit: createHabitDto) => Promise<void>;
