export const shuffleArray = (array: string[]) => (
  [...array].sort(() => (Math.random() - 0.5))
)