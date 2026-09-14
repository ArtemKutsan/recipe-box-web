import { Button } from '@/shared/ui';

const ClearFiltersButton = ({ onClick }) => (
  <div className="flex items-center justify-start md:shrink-0 md:justify-end">
    <Button
      type="button"
      variant="ghost"
      className="min-h-10 px-0 hover:text-secondary md:px-3"
      onClick={onClick}
    >
      Clear filters
    </Button>
  </div>
);

export default ClearFiltersButton;
