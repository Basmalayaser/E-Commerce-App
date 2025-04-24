
import React, { useEffect, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Badge } from "@nextui-org/react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import brandicon from "./../../assets/icon.png";
import { useContext } from 'react';
import { TokenContext } from '../../Context/TokenContext';
import { CartContext } from '../../Context/Cartcontext';
import { WishListContext } from '../../Context/WishListContext';

export default function Navbarrr() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { noOfCartItem} = useContext(CartContext);
  const { noOfWishList} = useContext(WishListContext);
  const { token, setToken } = useContext(TokenContext);


  let navigate = useNavigate();
  let location = useLocation(); // Hook to get the current location


  function handleLogOut(e) {
    e.preventDefault(); // Prevent default link behavior
    setToken(null);
    localStorage.removeItem("userToken");
    navigate("/login", { replace: true }); // Replace history entry
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred={false}
      classNames={{
        item: [
          "data-[active=true]:text-orange-500",
        ],
      }}
      className='shadow-md'
    >
      <NavbarContent>
        <NavbarBrand>
        <Link to="/" className='flex items-center'>
          <img src={brandicon} alt="brandicon" className='w-[50px] ' />
          <p className="font-bold  archivo-black-regular text-orange-500 text-xl ps-2 cursor-pointer">QuickCart</p>
        </Link>
        </NavbarBrand>
      </NavbarContent>

      {token && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={location.pathname === '/'} >
            <Link to="/" className='nav-hover'>Home</Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === '/cart'}>
            <Link to="cart" className='nav-hover'>
              <Badge content={noOfCartItem} color="primary"><span className='p-[3px]'>Cart</span></Badge>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === '/wishList'}>
            <Link to="wishList" className='nav-hover'>
              <Badge content={noOfWishList} color="primary"><span className='p-[3px]'>WishList</span></Badge>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === '/products'}>
            <Link to="products" className='nav-hover'>Products</Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === '/categories'}>
            <Link to="categories" className='nav-hover'>Categories</Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === '/brands'}>
            <Link to="brands" className='nav-hover'>Brands</Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {token ? (
          <>
            <NavbarItem className="flex">
            <a href="#" onClick={handleLogOut} className="nav-hover">LogOut</a>
            </NavbarItem>
            <NavbarItem>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="flex">
              <Link to="register" className='nav-hover'>SignUp</Link>
            </NavbarItem>
            <NavbarItem className="flex">
              <Link to="login" className='nav-hover'>Login</Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link to="/" className='nav-hover'>Home</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="cart" className='nav-hover'>
            <Badge content={noOfCartItem} color="primary"><span className='p-[3px]'>Cart</span></Badge>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="wishList"className='nav-hover'>
            <Badge content={noOfWishList} color="primary"><span className='p-[3px]'>WishList</span></Badge>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="products" className='nav-hover'>Products</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="categories" className='nav-hover'>Categories</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="brands" className='nav-hover'>Brands</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}



