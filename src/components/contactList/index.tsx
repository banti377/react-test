import {
  FC,
  LegacyRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Contact, Search } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getContactsAsync, reset, setPage } from '../../store/contactsSlice';
import { Loader } from '../loader';

export const ContactList: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { contacts, isLoading, hasMore, page, isEven } = useAppSelector(
    (state) => state.contacts
  );

  console.log({ contacts });

  const [searchTerm, setSearchTerm] = useState('');

  const isUS = location.pathname === '/us-contacts';

  useEffect(() => {
    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, isEven]);

  useEffect(() => {
    dispatch(getContactsAsync({ page, isUS, isEven, searchTerm }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEven, isUS, page, searchTerm]);

  // Logic for infinite scroll
  const observer: MutableRefObject<any> = useRef();
  const lastContactRef: LegacyRef<HTMLDivElement> = useCallback(
    (node: any) => {
      if (isLoading) return;
      else {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            dispatch(setPage(page + 1));
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, hasMore]
  );

  if (!contacts.length) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="list-group">
        {contacts.map((contact: any, i: number) => {
          const isLastElement = contacts.length === i + 1;
          return isLastElement ? (
            <div key={i} ref={lastContactRef}>
              <Contact key={contact.id} contact={contact} />
            </div>
          ) : (
            <Contact key={contact.id} contact={contact} />
          );
        })}
        <Loader isLoading={isLoading} />
      </div>
    </>
  );
};
