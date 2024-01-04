import { ZodError, z } from "zod";

type ValidatedFields = "name" | "emojiNative" | "quantity" | "step";
export class HabitEntityValidationError extends Error {
  private errors: Record<ValidatedFields, string | undefined>;

  constructor(errors: Record<ValidatedFields, string | undefined>) {
    super("An error occured validating a habit entity");
    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}

export class HabitEntity {
  private id?: number;
  private name: string;
  private emojiNative: string;
  private quantity: number;
  private step: number;
  private unit?: string;
  private createdAt?: Date;

  constructor({
    id,
    name,
    emojiNative,
    quantity,
    step,
    unit,
    createdAt,
  }: {
    id?: number;
    name: string;
    emojiNative: string;
    quantity: number;
    step: number;
    unit?: string;
    createdAt?: Date;
  }) {
    this.id = id;
    this.name = name;
    this.emojiNative = emojiNative;
    this.quantity = quantity;
    this.step = step;
    this.unit = unit;
    this.createdAt = createdAt;

    this.validate();
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmojiNative() {
    return this.emojiNative;
  }

  getQuantity() {
    return this.quantity;
  }

  getStep() {
    return this.step;
  }

  getUnit() {
    return this.unit;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  addStep() {
    this.quantity += this.step;
  }

  removeStep() {
    this.quantity -= this.step;

    if (this.quantity < 0) {
      this.quantity = 0;
    }
  }

  private validate() {
    const habitSchema = z.object({
      name: z.string().min(1).max(255),
      emojiNative: z.string().min(1).max(255),
      quantity: z.number().int().min(0),
      step: z.number().int().min(1),
    });

    try {
      habitSchema.parse(this);
    } catch (err) {
      const error = err as ZodError;
      const errors = error.flatten().fieldErrors;
      throw new HabitEntityValidationError({
        name: errors.name?.[0],
        emojiNative: errors.emojiNative?.[0],
        quantity: errors.quantity?.[0],
        step: errors.step?.[0],
      });
    }
  }
}
