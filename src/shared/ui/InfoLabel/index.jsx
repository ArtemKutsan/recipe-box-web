// import { cn } from '@/shared/lib/cn';

const InfoLabel = ({ icon: Icon, label, value }) => {
  if (!label) {
    return (
      <div className="flex items-center gap-2">
        <Icon className="size-4" aria-hidden="true" />
        <span className="text-sm font-medium text-muted-foreground">{value}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className="size-4" aria-hidden="true" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{value}</span>
    </div>
  );
};

export default InfoLabel;
