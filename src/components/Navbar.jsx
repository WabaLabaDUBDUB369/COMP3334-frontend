import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles/styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

import { AuthContext } from '../context/AuthContext';
import Cookies from 'js-cookie';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    Cookies.remove('token');
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex">
          <Link
            to="/"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img class="w-8 h-8 mr-2" src="../../house.png" alt="logo" />
            The Property Palace
          </Link>
        </div>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? 'text-white' : 'text-secondary'
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              {user && nav.id === 'my-profile' ? (
                <Link
                  to="/userDetails"
                  className=""
                  onClick={() => {
                    setActive('');
                    window.scrollTo(0, 0);
                  }}
                >
                  <p className="text-white text-[18px] font-bold cursor-pointer flex">
                    Welcome &nbsp;
                    <span className="sm:block hidden"> | {user.username}</span>
                  </p>
                </Link>
              ) : !user && nav.id === 'my-profile' ? (
                <></>
              ) : user && nav.id === 'sign-in' ? (
                <></> 
              ) : !user && nav.id === 'sign-out' ? (
                <></>
              ) : user && nav.id === 'sign-out' ? (
                <div onClick={() => handleLogout()}>{nav.title}</div>
              ) : (
                <a href={`${nav.id}`}>{nav.title}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
