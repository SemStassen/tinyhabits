import { z } from "zod";

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
    } catch (error) {
      console.log(error);
    }
  }
}
