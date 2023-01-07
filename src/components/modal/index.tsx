import { FC, ReactNode } from 'react';
import { Button } from '../button';

interface Props {
  title: string;
  body: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

export const Modal: FC<Props> = ({ title, body, footer, onClose }) => {
  return (
    <div className="modal modal-lg fade show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <Button className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">{body}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
};
