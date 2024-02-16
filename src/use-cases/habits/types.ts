export interface HabitDto {
  id: string;
  name: string;
  emojiNative: string;
  quantity: number;
  step: number;
  unit?: string;
  createdAt: Date;
}

export interface CreateHabitDto {
  name: string;
  emojiNative: string;
  quantity: number;
  step: number;
  unit?: string;
}

// data-access functions
export type CreateHabit = (habit: CreateHabitDto) => Promise<void>;
export type DeleteHabit = (habitId: string) => Promise<void>;
export type GetHabit = (habitId: string) => Promise<HabitDto>;
export type GetHabits = () => Promise<HabitDto[]>;
export type UpdateHabit = (habit: HabitDto) => Promise<void>;
