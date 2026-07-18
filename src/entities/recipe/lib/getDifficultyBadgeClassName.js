const difficultyBadgeClassNames = {
  easy: 'bg-emerald-600/5 text-emerald-600',
  medium: 'bg-yellow-600/5 text-yellow-600',
  hard: 'bg-red-600/5 text-red-600',
};

// Возвращает цвет Badge по сложности рецепта. Неизвестное значение остаётся нейтральным.
export const getDifficultyBadgeClassName = (difficulty) => {
  const normalizedDifficulty = String(difficulty ?? '').toLowerCase();

  return difficultyBadgeClassNames[normalizedDifficulty] ?? '';
};
