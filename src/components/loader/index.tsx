import { FC } from 'react';

interface Props {
  isLoading: boolean;
}

export const Loader: FC<Props> = ({ isLoading }) => {
  return isLoading ? (
    <div className="d-flex m-2 justify-content-center">
      <div className="spinner-border text-center align-center" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <></>
  );
};
