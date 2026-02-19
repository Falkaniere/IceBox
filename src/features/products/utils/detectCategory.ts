import { ProductCategory } from '@/features/fridge/model/fridgeItem';

export function detectCategory(name: string): ProductCategory {
  const lower = name.toLowerCase();

  if (/(apple|banana|orange|mango|grape)/.test(lower)) return 'fruit';

  if (/(broccoli|carrot|lettuce|onion)/.test(lower)) return 'vegetable';

  if (/(milk|cheese|yogurt|butter)/.test(lower)) return 'dairy';

  if (/(chicken|beef|pork|steak)/.test(lower)) return 'meat';

  if (/(juice|soda|water|coke)/.test(lower)) return 'drink';

  if (/(pizza|ice|frozen)/.test(lower)) return 'frozen';

  if (/(cookie|chips|snack)/.test(lower)) return 'snack';

  return 'other';
}
