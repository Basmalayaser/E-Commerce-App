import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'; // Add Navigate
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import WishList from './components/WishList/WishList';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GetProductDetails from './components/GetProductDetails/GetProductDetails';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import ForgetPass from './components/ForgetPass/ForgetPass';
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode';
import ResetPass from './components/ResetPass/ResetPass';
import OrdersComponent from './components/Allorders/Allorders';

const queryClient = new QueryClient();

const routers = createBrowserRouter(
  [
    {
      path: '',
      element: (
          <Layout />
      ),
      children: [
        { index: true, element: <Home /> },
        { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: 'wishList', element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
        { path: 'productDetails/:id/:categoryId', element: <ProtectedRoutes><GetProductDetails /></ProtectedRoutes> },
        { path: 'categoryDetails/:id', element: <ProtectedRoutes><CategoryDetails /></ProtectedRoutes> },
        { path: 'allorders', element: <ProtectedRoutes><OrdersComponent /></ProtectedRoutes> },
        { path: 'checkout/:type', element: <ProtectedRoutes><Checkout /></ProtectedRoutes> },
        { path: 'products', element: <Products /> },
        { path: 'categories', element: <Categories /> },
        { path: 'brands', element: <Brands /> },
        { path: 'login', element: <ProtectedAuth><Login /></ProtectedAuth> },
        { path: 'register', element: <ProtectedAuth><Register /></ProtectedAuth> },
        { path: 'forgetPass', element: <ProtectedAuth><ForgetPass /></ProtectedAuth> },
        { path: 'verifyResetCode', element: <ProtectedAuth><VerifyResetCode /></ProtectedAuth> },
        { path: 'resetPass', element: <ProtectedAuth><ResetPass /></ProtectedAuth> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: '/E-Commerce-App' }
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers} />
      <Toaster />
    </QueryClientProvider>
  );
}