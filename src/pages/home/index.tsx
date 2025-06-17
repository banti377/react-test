import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { useAppDispatch } from '../../hooks';
import { reset } from '../../store/contactsSlice';

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAllContactsClick = () => {
    dispatch(reset());
    navigate('/all-contacts');
  };

  const onUSContactsClick = () => {
    dispatch(reset());
    navigate('/us-contacts');
  };

  return (
    <div className="page-container d-flex align-items-center justify-content-center gap-2">
      <Button
        title="All Contacts"
        className="btn btn-a"
        onClick={onAllContactsClick}
      />
      <Button
        title="US Contacts"
        className="btn btn-b"
        onClick={onUSContactsClick}
      />
      <Outlet />
    </div>
  );
};
