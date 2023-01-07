import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../utils';

interface State {
  contacts: any;
  isLoading: boolean;
  total: number;
  hasMore: boolean;
  page: number;
  isEven: boolean;
}

const initialState: State = {
  contacts: [],
  page: 1,
  isLoading: false,
  total: 0,
  hasMore: true,
  isEven: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = [
        ...new Map(
          [...state.contacts, ...action.payload].map((item) => [
            item['id'],
            item,
          ])
        ).values(),
      ];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
      state.hasMore = state.total > state.contacts.length;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setIsEven: (state, action) => {
      state.isEven = action.payload;
    },
    reset: (state) => {
      state.contacts = [];
      state.page = 1;
    },
  },
});

export const getContactsAsync =
  ({
    isUS = false,
    isEven = false,
    page,
    searchTerm,
  }: {
    page?: number;
    isUS?: boolean;
    isEven?: boolean;
    searchTerm?: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.get(`${BASE_URL}/contacts.json`, {
        headers: {
          Authorization: TOKEN,
        },
        params: {
          companyId: 171,
          page,
          ...(isUS && { countryId: 226 }),
          query: searchTerm,
        },
      });

      const contacts = response.data.contacts;

      const total = response.data.total;

      const getSelectedContacts = (array: number[], object: any) =>
        array.reduce(
          (r, e) => Object.assign(r, object[e] ? { [e]: object[e] } : null),
          {}
        );

      const selectedContacts = Object.values(
        getSelectedContacts(
          isEven
            ? response.data.contacts_ids.filter(
                (value: number) => value % 2 === 0
              )
            : response.data.contacts_ids,
          contacts
        )
      );

      dispatch(getContacts(selectedContacts));
      dispatch(setTotal(total));
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

export const {
  setLoading,
  setContacts: getContacts,
  setTotal,
  setPage,
  setIsEven,
  reset,
} = contactsSlice.actions;
export const contacts = (state: any) => state.contacts;
export default contactsSlice.reducer;
