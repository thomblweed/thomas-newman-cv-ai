import { Button } from '@/ui/components/elements/Button';

type RetryButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export const RetryButton = ({
  onClick,
  disabled,
  className
}: RetryButtonProps) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    width="normal"
    className={className}
  >
    Try again
  </Button>
);
