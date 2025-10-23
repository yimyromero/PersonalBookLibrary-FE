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
//import './App.css'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Public />} />
      <Route path='login' element={<Login />} />
      <Route path='dash' element={<DashLayout />}>
        <Route index element={<Welcome />} />
        <Route path='users'>
          <Route index element={<UsersList />} />
          <Route path=':id' element={<EditUser />} />
          <Route path='new' element={<NewUser />} />
        </Route>
        <Route path='books' element={<BooksList />} />
        <Route path='borrows' element={<BorrowList />} />
      </Route>
    </Route>
   </Routes>
  );
}

export default App
