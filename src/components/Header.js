import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// React Icons
import {
  AiOutlineLogin,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
} from "react-icons/ai";

const Header = () => {
  // Trac Locations of the Pages
  const location = useLocation();

  // Function for getting the pages path
  const selectMenu = (menu) => {
    if (location.pathname === menu) {
      return true;
    }
  };

  // Menu Icon
  const [menuIconDisplay, setMeniIconDisplay] = useState(false);

  function handleMenuIcon(e) {
    setMeniIconDisplay(!e);
  }

  return (
    <div className="bg-white w-full text-blue-400 sm:bg-blue-200 sm:text-gray-700 sm:h-14">
      <div className="flex justify-between items-center w-[95%] mx-auto py-4 sm:block sm:w-full">
        <div className="hidden sm:block sm:absolute sm:left-2 sm:top-4 sm:text-3xl cursor-pointer">
          {menuIconDisplay ? (
            <AiOutlineMenuUnfold
              onClick={() => handleMenuIcon(menuIconDisplay)}
            />
          ) : (
            <AiOutlineMenuFold
              onClick={() => handleMenuIcon(menuIconDisplay)}
            />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-3xl sm:text-2xl sm:absolute sm:left-[50%] sm:translate-x-[-50%] sm:top-3">
            AfghanBazaar24
          </h3>
        </div>
        <div
          className={`${
            menuIconDisplay ? `sm:block` : `sm:hidden`
          } sm:absolute sm:left-0 sm:top-14 sm:bg-blue-200 sm:w-[70%]`}
        >
          <ul className="flex text-xl uppercase font-semibold sm:block">
            <li
              className={`mx-5 ${
                selectMenu("/") &&
                `text-blue-500 border-b-[3px] border-orange-500`
              }`}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`mx-5 ${
                selectMenu("/products") &&
                `text-blue-500 border-b-[3px] border-orange-500`
              }`}
            >
              <Link to="/products">Products</Link>
            </li>
            <li
              className={`mx-5 ${
                selectMenu("/about") &&
                `text-blue-500 border-b-[3px] border-orange-500`
              }`}
            >
              <Link to="/about">About</Link>
            </li>
            <li
              className={`mx-5 ${
                selectMenu("/contact") &&
                `text-blue-500 border-b-[3px] border-orange-500`
              }`}
            >
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="sm:hidden">
          <p className="flex items-center text-xl">
            Sign in <AiOutlineLogin className="ml-2 " />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
