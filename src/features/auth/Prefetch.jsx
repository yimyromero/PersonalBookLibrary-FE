import { store } from "../../app/store";
import { booksApiSlice } from "../books/booksApiSlice";
import { borrowsApiSlice } from "../borrow/BorrowApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from 'react-router';

const Prefetch = () => {
  
  useEffect(() => {
    store.dispatch(booksApiSlice.util.prefetch('getBooks', 'bookList', { force: true }));
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'userList', { force: true }));
    store.dispatch(borrowsApiSlice.util.prefetch('getBorrows', 'borrowList', { force: true }));
  }, []);

  return <Outlet />
}

export default Prefetch;