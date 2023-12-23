export interface habitDto {
  id: number;
  name: string;
}

export interface createHabitDto {
  name: string;
}

export type createHabit = (habit: createHabitDto) => Promise<void>;
export type deleteHabit = (habitId: number) => Promise<void>;
