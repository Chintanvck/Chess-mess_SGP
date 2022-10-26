import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SignIn from './components/SignIn/SignIn';
import ProductScreen from './Pages/ProductScreen';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './components/UserProfile/UserProfile';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AdminRoute from './components/AdminRoute/AdminRoute';
import DashboardScreen from './Admin/DashboardScreen';
import ProductListScreen from './Admin/ProductListScreen';
import ProductEditScreen from './Admin/ProductEditScreen';
import UserListScreen from './Admin/UserListScreen';
import UserEditScreen from './Admin/UserEditScreen';
import SearchPage from './Pages/SearchPage';
import SearchScreen from './Pages/SearchScreen';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='bottom-center' limit={1} />
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path="/product/:rname" element={<ProductScreen />} />
        <Route
            path="/search/:name/:price/:rating/:page"
            element={<SearchScreen />}
          ></Route>
          <Route
            path="/search"
            element={<SearchScreen />}
          ></Route>
          <Route
            path="/search/:name"
            element={<SearchScreen />}
          ></Route>
        <Route path='/profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        {/*Admin Route*/}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductListScreen />
            </AdminRoute>
          }
        ></Route>
        <Route path='/admin/product/:id' element={<AdminRoute><ProductEditScreen /></AdminRoute>} />
        <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
