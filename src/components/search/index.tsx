import {
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from '../../hooks';

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export const Search: FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const [value, setValue] = useState(searchTerm);
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    setSearchTerm(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchTerm(value);
    }
  };

  return (
    <div className="input-group mb-3">
      <span className="input-group-text btn-search">&#128269;</span>
      <input
        type="text"
        className="form-control"
        placeholder="Search Contact"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
