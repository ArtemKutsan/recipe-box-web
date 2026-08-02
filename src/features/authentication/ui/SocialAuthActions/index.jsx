import { Button } from '@/shared/ui';
import FacebookIcon from '@/assets/icons/facebook-logo.svg?react';
import InstagramIcon from '@/assets/icons/instagram-logo.svg?react';
import XIcon from '@/assets/icons/x-logo.svg?react';

const socialActions = [
  { label: 'Continue with Facebook', Icon: FacebookIcon },
  { label: 'Continue with Instagram', Icon: InstagramIcon },
  { label: 'Continue with X', Icon: XIcon },
];

const SocialAuthActions = () => {
  return (
    <div className="flex items-center justify-center gap-2" aria-label="Social authentication">
      {socialActions.map(({ label, Icon }) => (
        <Button
          key={label}
          type="button"
          variant="outline"
          size="icon"
          className="border-white/70 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          aria-label={label}
          title={`${label} (coming soon)`}
        >
          <Icon aria-hidden="true" className="size-4" />
        </Button>
      ))}
    </div>
  );
};

export default SocialAuthActions;
