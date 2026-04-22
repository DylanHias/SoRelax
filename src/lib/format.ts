import type { Treatment } from "@/content/treatments";

export function formatPrice(amount: number, type: Treatment["priceType"]): string {
  const money = `€${amount}`;
  return type === "from" ? `vanaf ${money}` : money;
}
