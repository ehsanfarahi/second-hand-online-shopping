import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// React Icons
import {
  AiOutlineLogin,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { HiUser } from "react-icons/hi";

const Header = () => {
  // Track Locations of the Pages
  const location = useLocation();

  // Function for getting the pages path
  const selectMenu = (menu) => {
    if (location.pathname === menu) {
      return true;
    }
  };

  // Menu & Menu Icon
  const [menuIconDisplay, setMeniIconDisplay] = useState(false);

  function handleMenuIcon(e) {
    setMeniIconDisplay(!e);
  }

  function handleMenu() {
    setMeniIconDisplay(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="bg-white w-full text-blue-400 sm:bg-blue-200 sm:text-gray-600 sm:h-14 sm:border-b-4 sm:border-b-white sm:fixed md:bg-blue-200 md:text-gray-600 md:h-16 md:border-b-4 md:border-b-white md:fixed">
      <div className="flex justify-between items-center w-[95%] mx-auto py-4 sm:block sm:w-full sm:py-3">
        <div className="hidden sm:block sm:absolute sm:left-2 sm:top-3 sm:text-3xl cursor-pointer md:block md:absolute md:left-4 md:top-4 md:text-3xl">
          {menuIconDisplay ? (
            <AiOutlineMenuFold
              onClick={() => handleMenuIcon(menuIconDisplay)}
            />
          ) : (
            <AiOutlineMenuUnfold
              onClick={() => handleMenuIcon(menuIconDisplay)}
            />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-3xl sm:text-2xl sm:absolute sm:left-[50%] sm:translate-x-[-50%] sm:top-3 md:text-3xl md:absolute md:left-[50%] md:translate-x-[-50%] md:top-3">
            <Link to="/">
              AfghanBazaar
              <span className="text-orange-500 font-extrabold">24</span>
            </Link>
          </h3>
        </div>
        <div>
          <div
            className={`${
              menuIconDisplay ? `sm:block md:block` : `sm:hidden md:hidden`
            } sm:absolute sm:left-0 sm:top-14 sm:bg-blue-200 sm:w-[70%] sm:h-screen sm:z-[3] md:absolute md:left-0 md:top-16 md:bg-blue-200 md:w-[50%] md:h-screen md:z-[3]`}
          >
            <ul className="flex text-xl uppercase font-semibold sm:block md:block sm:text-center md:text-center">
              <li className="sm:py-4 md:py-4">
                <Link
                  onClick={handleMenu}
                  className={`mx-5 ${
                    selectMenu("/") &&
                    `text-blue-500 border-b-[3px] border-orange-500 sm:text-gray-700 md:text-gray-700`
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="sm:py-4 md:py-4">
                <Link
                  onClick={handleMenu}
                  className={`mx-5 ${
                    selectMenu("/products") &&
                    `text-blue-500 border-b-[3px] border-orange-500 sm:text-gray-700 md:text-gray-700`
                  }`}
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li className="sm:py-4 md:py-4">
                <Link
                  onClick={handleMenu}
                  className={`mx-5 ${
                    selectMenu("/about") &&
                    `text-blue-500 border-b-[3px] border-orange-500 sm:text-gray-700 md:text-gray-700`
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="sm:py-4 md:py-4">
                <Link
                  onClick={handleMenu}
                  className={`mx-5 ${
                    selectMenu("/contact") &&
                    `text-blue-500 border-b-[3px] border-orange-500 sm:text-gray-700 md:text-gray-700`
                  }`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`${
              menuIconDisplay &&
              "sm:bg-gray-700 sm:bg-opacity-70 sm:absolute  sm:top-14 sm:left-0 sm:right-0 sm:bottom-0 sm:z-[2] sm:h-screen md:bg-gray-700 md:bg-opacity-70 md:absolute  md:top-16 md:left-0 md:right-0 md:bottom-0 md:z-[2] md:h-screen"
            }`}
          ></div>
        </div>
        <div className="cursor-pointer hover:text-blue-500 sm:hover:text-gray-700 sm:float-right sm:mr-1">
          <p className="sm:hidden flex items-center text-xl">
            Sign in <AiOutlineLogin className="ml-2 " />
          </p>
          <HiUser className="hidden sm:block text-3xl sm:mx-1" />
        </div>
      </div>
    </div>
  );
};

export default Header;
