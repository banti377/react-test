import React, { ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { reset, setIsEven } from '../../store/';

export const ContactsFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isEven } = useAppSelector((state) => state.contacts);

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setIsEven(e.target.checked));

  const onAllContactsClick = () => {
    dispatch(reset());
    navigate('/all-contacts');
  };

  const onUSContactsClick = () => {
    dispatch(reset());
    navigate('/us-contacts');
  };

  const onClose = () => {
    dispatch(reset());
    navigate('/');
  };

  return (
    <>
      <Checkbox
        className="me-auto d-flex justify-content-center align-items-center gap-2"
        checked={isEven}
        title="Only Even"
        onChange={onCheckboxChange}
      />
      <Button
        title="All Contacts"
        className="btn btn-a"
        disabled={location.pathname === '/all-contacts'}
        onClick={onAllContactsClick}
      />
      <Button
        title="US Contacts"
        className="btn btn-b"
        disabled={location.pathname === '/us-contacts'}
        onClick={onUSContactsClick}
      />
      <Button className="btn btn-c" onClick={onClose} title="Close" />
    </>
  );
};
