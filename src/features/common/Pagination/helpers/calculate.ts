export default function calculatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  DOTS: string,
): (number | string)[] {
  const totalPageNumbers = siblingCount * 2 + 5;
  const firstPage = 1;
  const lastPage = totalPages;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    return [...Array.from({ length: leftItemCount }, (_, i) => i + 1), DOTS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    return [
      firstPage,
      DOTS,
      ...Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i),
    ];
  }

  if (showLeftDots && showRightDots) {
    return [
      firstPage,
      DOTS,
      ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i),
      DOTS,
      lastPage,
    ];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}
