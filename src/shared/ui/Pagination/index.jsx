import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

const SIBLING_COUNT = 1;

const getPageItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(currentPage - SIBLING_COUNT, 2);
  const rightSibling = Math.min(currentPage + SIBLING_COUNT, totalPages - 1);
  const items = [1];

  if (leftSibling > 2) {
    items.push('left-ellipsis');
  }

  for (let pageNumber = leftSibling; pageNumber <= rightSibling; pageNumber += 1) {
    items.push(pageNumber);
  }

  if (rightSibling < totalPages - 1) {
    items.push('right-ellipsis');
  }

  items.push(totalPages);

  return items;
};

const Pagination = ({ page, totalPages, onPageChange, className }) => {
  const pageCount = Math.max(1, totalPages || 1);
  const pageItems = getPageItems(page, pageCount);
  const canGoPrevious = page > 1;
  const canGoNext = page < pageCount;

  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav className={cn('flex items-center justify-center gap-2', className)} aria-label="Pagination">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Previous page"
        disabled={!canGoPrevious}
        onClick={() => onPageChange(page - 1)}
      >
        {'<'}
      </Button>

      {pageItems.map((item) =>
        typeof item === 'number' ? (
          <Button
            type="button"
            key={item}
            variant={item === page ? 'secondary' : 'ghost'}
            size="icon"
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ) : (
          <span
            key={item}
            className="flex size-10 items-center justify-center text-sm text-muted-foreground"
            aria-hidden="true"
          >
            ...
          </span>
        ),
      )}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Next page"
        disabled={!canGoNext}
        onClick={() => onPageChange(page + 1)}
      >
        {'>'}
      </Button>
    </nav>
  );
};

export default Pagination;
