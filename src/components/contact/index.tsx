import { useState } from 'react';
import { ContactCard } from '../contactCard';
import { Modal } from '../modal';
import './styles.scss';

export const Contact = ({ contact }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const { phone_number, id, first_name, last_name } = contact;

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <div
        onClick={onOpen}
        className="list-group-item list-group-item-action list"
        aria-current="true"
      >
        <span>ID: {id} </span>
        <span>{first_name && `Name: ${first_name} ${last_name}`}</span>
        <span>{phone_number && `Phone Number: ${phone_number}`}</span>
      </div>
      {isOpen && (
        <Modal
          title="Contact Details"
          body={<ContactCard contact={contact} />}
          onClose={onClose}
        />
      )}
    </>
  );
};
