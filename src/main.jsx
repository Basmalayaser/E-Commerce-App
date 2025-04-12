import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import CartContextProvider from './Context/Cartcontext.jsx';
import TokenContextProvider from './Context/TokenContext.jsx';
import CategoryContextProvider from './Context/CategoryContext.jsx';
import ProductContextProvider from './Context/RelatedProductContext.jsx';
import WishListProvider from './Context/WishListContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <TokenContextProvider>
      <ProductContextProvider>
        <CategoryContextProvider>
          <CartContextProvider>
            <WishListProvider>
              <StrictMode>
                <NextUIProvider>
                  <App />
                </NextUIProvider>
              </StrictMode>
            </WishListProvider>
          </CartContextProvider>
        </CategoryContextProvider>
      </ProductContextProvider>
    </TokenContextProvider>
  </QueryClientProvider>
);
