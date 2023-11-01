import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// React Icons
import {
  AiOutlineLogin,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  // Track Locations of the Pages
  const location = useLocation();

  // Refs
  const ref = useRef();

  // Function for getting the pages path
  const selectMenu = (menu) => {
    if (location.pathname === menu) {
      return true;
    }
  };

  // Menu & Menu Icon
  const [menuIconDisplay, setMeniIconDisplay] = useState(false);
  const [menuType, setMenuType] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [initialScroll, setInitialScroll] = useState(0);

  // Hooks
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setMenuType(true);
      } else {
        setMenuType(false);
      }
    });
  });

  // Functions

  // Change menu icon
  function handleMenuIcon(e) {
    setMeniIconDisplay(!e);
  }

  // show/hide menu
  function handleMenu() {
    setMeniIconDisplay(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // activate/deactivate search bar
  function handleSearch() {
    setDisplaySearch((e) => !e);
    ref.current.focus();
  }

  // Even Listenders
  // Show and hide menu bar and bottom menu on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > initialScroll) {
      setInitialScroll(window.scrollY);
      setShowMenu(false);
    } else if (window.scrollY < initialScroll) {
      setShowMenu(true);
    }
  });

  return (
    <div
      className={`${
        menuType ? "bg-blue-100 shadow z-30" : "bg-white"
      } fixed w-full text-blue-400 sm:bg-blue-200 sm:text-gray-600 sm:h-14 sm:fixed sm:shadow-md ${
        showMenu ? "sm:top-0 sm:opacity-100" : "sm:-top-14 sm:opacity-0"
      } sm:shadow-sm sm:transition-all sm:duration-[.75s] sm:ease-in-out md:bg-blue-200 md:text-gray-600 md:h-16 md:border-b-4 md:border-b-white md:fixed`}
    >
      <div className="flex justify-between items-center w-[95%] mx-auto py-3  sm:block sm:w-full sm:py-3 sm:z-20">
        <div className="hidden sm:block sm:absolute sm:left-2 sm:top-3 sm:text-3xl cursor-pointer md:block md:absolute md:left-4 md:top-4 md:text-3xl">
          {menuIconDisplay ? null : (
            <AiOutlineMenuUnfold
              onClick={() => handleMenuIcon(menuIconDisplay)}
            />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-3xl sm:text-2xl sm:absolute sm:left-[50%] sm:translate-x-[-50%] sm:top-2 md:text-3xl md:absolute md:left-[50%] md:translate-x-[-50%] md:top-3">
            <Link to="/">
              AfghanBazaar
              <span className="text-orange-500 font-extrabold">24</span>
            </Link>
          </h3>
        </div>
        <div>
          <div
            className={`${
              menuIconDisplay
                ? `sm:absolute sm:left-0 sm:top-0 transition-all duration-[.4s] ease-in-out md:absolute md:left-0 md:top-16`
                : `sm:absolute sm:-left-full sm:top-0 transition-all duration-[.4s] ease-in-out md:absolute md:-left-full md:top-14`
            } sm:bg-blue-200 sm:w-[70%] sm:h-screen sm:z-[3]  md:bg-blue-200 md:w-[50%] md:h-screen md:z-[3]`}
          >
            <div className="hidden sm:block sm:absolute sm:left-2 sm:top-3 sm:text-3xl cursor-pointer md:block md:absolute md:left-4 md:top-4 md:text-3xl">
              {menuIconDisplay ? (
                <AiOutlineMenuFold
                  onClick={() => handleMenuIcon(menuIconDisplay)}
                />
              ) : null}
            </div>
            <div className="hidden sm:block">
              <h3 className="font-semibold text-3xl sm:text-2xl sm:absolute sm:left-[50%] sm:translate-x-[-50%] sm:top-2 md:text-3xl md:absolute md:left-[50%] md:translate-x-[-50%] md:top-3">
                <Link to="/">
                  AfghanBazaar
                  <span className="text-orange-500 font-extrabold">24</span>
                </Link>
              </h3>
            </div>
            <ul className="flex text-xl uppercase font-semibold sm:py-14 sm:block md:block sm:text-center md:text-center">
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
            <div className="sm:cursor-pointer sm:hover:text-gray-700 sm:mr-1 sm:absolute sm:bottom-20 sm:right-4">
              <HiUser className="hidden sm:block text-3xl sm:mx-1" />
            </div>
          </div>
          {/* Over lay container */}
          <div
            onClick={() => setMeniIconDisplay(false)}
            className={`${
              menuIconDisplay &&
              "sm:bg-gray-700 sm:bg-opacity-50 sm:absolute  sm:top-0 sm:left-0 sm:right-0 sm:bottom-0 sm:z-[2] sm:h-screen md:bg-gray-700 md:bg-opacity-70 md:absolute  md:top-16 md:left-0 md:right-0 md:bottom-0 md:z-[2] md:h-screen"
            }`}
          ></div>
        </div>

        {/* Sign in container */}
        <div className="cursor-pointer hover:text-blue-500 sm:hover:text-gray-700 sm:float-right sm:mr-1">
          <p className="sm:hidden flex items-center text-xl">
            Sign in <AiOutlineLogin className="ml-2 " />
          </p>
          <div
            className={`${
              displaySearch && "sm:bg-blue-400 rounded-full"
            } hidden sm:block text-3xl sm:mx-1`}
          >
            <BiSearch
              onClick={handleSearch}
              className={`${displaySearch && "sm:px-1"}`}
            />
          </div>
        </div>

        {/* Search bar container */}
        <div
          className={`${
            displaySearch ? "scale-100" : "scale-0"
          } hidden sm:block sm:w-[88%] sm:h-[52px] sm:-mt-3 sm:absolute sm:transition-all sm:duration-300 sm:ease-in-out`}
        >
          <input
            type="text"
            className="sm:w-full sm:bg-blue-200 sm:h-full sm:outline-none sm:border-none sm:text-lg sm:pl-2"
            placeholder="Search products..."
            ref={ref}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
