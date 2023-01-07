import { ChangeEvent, FC } from 'react';

interface Props {
  title?: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Checkbox: FC<Props> = ({
  title,
  checked,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <input
        className="form-check-input mt-0"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {title}
    </div>
  );
};
