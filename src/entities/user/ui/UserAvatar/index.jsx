import { useState } from 'react';
import UserIcon from '@/assets/icons/user.svg?react';
import { cn } from '@/shared/lib/cn';

const UserAvatar = ({ src, alt, className }) => {
  const [failedSrc, setFailedSrc] = useState(null);
  const canShowImage = Boolean(src) && failedSrc !== src;

  if (canShowImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn('shrink-0 rounded-full object-cover', className)}
        onError={() => setFailedSrc(src)}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={alt}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border bg-muted text-muted-foreground',
        className,
      )}
    >
      <UserIcon className="size-1/2" aria-hidden="true" />
    </span>
  );
};

export default UserAvatar;
