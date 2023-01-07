import { FC } from 'react';

interface Props {
  className?: string;
  title?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  onClick,
  title,
  className,
  type = 'button',
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {title}
    </button>
  );
};
