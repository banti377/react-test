import { FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ContactList, Modal } from './components';
import { ContactsFooter } from './components/contactsFooter';
import { Home } from './pages';

const App: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path="/all-contacts"
            element={
              <Modal
                title="All Contacts"
                body={<ContactList />}
                footer={<ContactsFooter />}
                onClose={() => navigate('/')}
              />
            }
          />
          <Route
            path="/us-contacts"
            element={
              <Modal
                title="US Contacts"
                body={<ContactList />}
                footer={<ContactsFooter />}
                onClose={() => navigate('/')}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
