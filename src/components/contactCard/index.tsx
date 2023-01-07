import { FC } from 'react';

interface Props {
  contact: any;
}

export const ContactCard: FC<Props> = ({
  contact: {
    first_name,
    last_name,
    phone_number,
    country: { phonecode, iso },
    birthday,
    email,
    address,
  },
}) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Name: {first_name ? `${first_name} ${last_name}}` : ''}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Phone Number:{' '}
            {phone_number ? `+${phonecode} - ${phone_number}` : '-'}
          </h6>
          <p className="card-text">Address: {address ?? '-'}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Email: {email ?? '-'}</li>
          <li className="list-group-item">Birthday: {birthday ?? '-'}</li>
          <li className="list-group-item">Country: {iso ?? '-'}</li>
        </ul>
      </div>
    </div>
  );
};
