import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import User from './features/users/User';
import UsersList from './features/users/UsersList';
import BooksList from './features/books/BooksList';
import BorrowList from './features/borrow/BorrowList';
import EditUser from './features/users/EditUser';
import NewUser from './features/users/NewUser';
import Prefetch from './features/auth/Prefetch';
import NewBook from './features/books/NewBook';
//import './App.css'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Public />} />
      <Route path='login' element={<Login />} />
      <Route element={<Prefetch />}>
        <Route path='dash' element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path='users'>
            <Route index element={<UsersList />} />
            <Route path=':id' element={<EditUser />} />
            <Route path='new' element={<NewUser />} />
          </Route>
          <Route path='books'>
            <Route index element={<BooksList />} />
            {/* <Route path=':id' element={<EditBook />} /> */}
            <Route path='new' element={<NewBook />} />
          </Route>
          <Route path='borrows' element={<BorrowList />} />
        </Route> { /* End Dash */}
      </Route>
    </Route>
   </Routes>
  );
}

export default App
