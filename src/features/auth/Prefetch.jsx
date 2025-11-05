import { store } from "../../app/store";
import { booksApiSlice } from "../books/booksApiSlice";
import { borrowsApiSlice } from "../borrow/BorrowApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from 'react-router';

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const books = store.dispatch(booksApiSlice.endpoints.getBooks.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const borrows = store.dispatch(borrowsApiSlice.endpoints.getBorrows.initiate());

    return () => {
      console.log("unsubscribing");
      books.unsubscribe();
      users.unsubscribe();
      borrows.unsubscribe();
    };
  }, []);

  return <Outlet />
}

export default Prefetch;