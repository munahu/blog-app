export const categories = [
  "trending",
  "technology",
  "food",
  "design",
  "travel",
] as const;

export type Category = (typeof categories)[number];
