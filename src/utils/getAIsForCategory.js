export function getAIsForCategory(cat, ais) {
  if (!ais) return [];
  return ais.filter(ai => {
    if (typeof ai.category === 'object' && ai.category !== null) {
      return ai.category.categoryId === cat.categoryId || ai.category._id === cat._id;
    }
    return ai.categoryId === cat.categoryId || ai.categoryId === cat._id;
  });
}
