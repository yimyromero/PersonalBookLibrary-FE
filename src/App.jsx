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
import EditBook from './features/books/EditBook';
import NewBorrow from './features/borrow/NewBorrow';
import EditBorrow from './features/borrow/EditBorrow';
import RequireAuth from './features/auth/requireAuth';
import PersistLogin from './features/auth/PersistLogin';
import { ROLES } from './config/roles';
//import './App.css'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Layout />}>
      {/* public routes */}
      <Route index element={<Public />} />
      <Route path='login' element={<Login />} />
      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route element={<Prefetch />}>
            <Route path='dash' element={<DashLayout />}>
              <Route index element={<Welcome />} />
              <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]}/>}>
                <Route path='users'>
                  <Route index element={<UsersList />} />
                  <Route path=':id' element={<EditUser />} />
                  <Route path='new' element={<NewUser />} />
                </Route>
              </Route>
              <Route path='books'>
                <Route index element={<BooksList />} />
                <Route path=':id' element={<EditBook />} />
                <Route path='new' element={<NewBook />} />
              </Route>
              <Route path='borrows'>
                <Route index element={<BorrowList/>}/>
                <Route path=':id' element={<EditBorrow />} />
                <Route path='new' element={<NewBorrow />}/>
              </Route>
            </Route> { /* End Dash */}
          </Route>
        </Route>
      </Route> {/* End protected routes */}
    </Route>
   </Routes>
  );
}

export default App
