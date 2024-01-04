export interface HabitDto {
  id: number;
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
export type DeleteHabit = (habitId: number) => Promise<void>;
export type GetHabit = (habitId: number) => Promise<HabitDto>;
export type GetHabits = () => Promise<HabitDto[]>;
export type UpdateHabit = (habit: HabitDto) => Promise<void>;
