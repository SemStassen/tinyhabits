import { ZodError, z } from "zod";

type ValidatedFields = "name";
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
  private id?: string;
  private name: string;

  constructor({ id, name }: { id?: string; name: string }) {
    this.id = id;
    this.name = name;

    this.validate();
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  private validate() {
    const habitSchema = z.object({
      name: z.string().min(1).max(255),
    });

    try {
      habitSchema.parse(this);
    } catch (err) {
      const error = err as ZodError;
      const errors = error.flatten().fieldErrors;
      throw new HabitEntityValidationError({
        name: errors.name?.[0],
      });
    }
  }
}
