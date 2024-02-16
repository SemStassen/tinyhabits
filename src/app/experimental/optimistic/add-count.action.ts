"use server";

export async function addCountAction(count: number) {
    await new Promise((res) => setTimeout(res, 2000));
    return count + 1;
}