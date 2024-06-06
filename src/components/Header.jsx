import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// React Icons
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { BsArrowUpLeftCircle } from "react-icons/bs";
import { MdOutlineAutoDelete } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiMagnifyingGlassMinusDuotone } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineLanguage } from "react-icons/md";
import { RxCross2 } from 'react-icons/rx';

// React Components
import Button from './Button';
import { useFetchGet } from "../useFetchGet";

const Header = ({ updateFavorite }) => {
  // Track Locations of the Pages
  const location = useLocation();

  document.title =
    location.pathname === '/' ? 'AfghanBazaar24' : location.pathname.slice(1);

  const getUserLoginData =
    localStorage.getItem('24UserLoginData') ||
    sessionStorage.getItem('24UserLoginData');

  // Refs
  const ref = useRef();
  // Large screen
  const reff = useRef();

  // Function for getting the pages path
  const selectMenu = (menu) => {
    if (location.pathname === menu) {
      return true;
    }
  };

  // React Router Dom
  const navigate = useNavigate();

  // Menu & Menu Icon
  const [menuIconDisplay, setMeniIconDisplay] = useState(false);
  const [menuType, setMenuType] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [initialScroll, setInitialScroll] = useState(0);
  const [displaySearchContainer, setDisplaySearchContainer] = useState(false);
  const [displaySearchClose, setDisplaySearchClose] = useState(false);

  const [displaySearchHistoryContainer, setDisplaySearchHistoryContainer] =
    useState(false);
  const [displayProductType, setDisplayProductType] = useState(false);
  const [displayUserSignedIn, setDisplayUserSignedIn] = useState(false);
  const [signedInUserData, setSignedInUserData] = useState([]);
  const [displayAllCat, setDisplayAllCat] = useState(false);

  // Hooks
  useEffect(() => {
    window.addEventListener('scroll', () => {
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
    setDisplayAllCat(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // activate/deactivate search bar
  function handleSearch(e) {
    setDisplaySearch((e) => !e);
    ref.current.focus();
    searchProducts();
  }

  // Large screen search bar
  function handleSearchDisplay() {
    setDisplaySearchContainer((e) => !e);
    reff.current.focus();
    clearSearch();
    setDisplaySearchHistoryContainer(false);
    setDisplayAllCat(false);
  }

  const [searchData, setSearchData] = useState('');
  function handleSearchOnChange(e) {
    setSearchData(e.target.value);

    if (e.target.value.length > 0) {
      setDisplaySearchClose(true);
    } else {
      setDisplaySearchClose(false);
    }

    if (localStorage.getItem('afgBazSearchHistry')) {
      setDisplaySearchHistoryContainer(true);
    }
  }

  function clearSearch() {
    setSearchData('');
    setDisplaySearchClose(false);
  }

  const saveHistory = [];

  const getSaveHistory =
    JSON.parse(localStorage.getItem('afgBazSearchHistry')) || '';

  function searchProducts() {
    navigate(`/search-products/${searchData}`);
    setDisplaySearchHistoryContainer(false);
    saveHistory.push(searchData);
    localStorage.setItem(
      'afgBazSearchHistry',
      JSON.stringify([...getSaveHistory, saveHistory])
    );
  }

  function searchBySearchHistory(data) {
    navigate(`/search-products/${data}`);
    setDisplaySearchHistoryContainer(false);
  }

  function deleteSearchHistory() {
    localStorage.removeItem('afgBazSearchHistry');
    setDisplaySearchHistoryContainer(false);
  }

  // Event Listenders
  // Show and hide menu bar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > initialScroll) {
      setInitialScroll(window.scrollY);
      setShowMenu(false);
    } else if (window.scrollY < initialScroll) {
      setShowMenu(true);
    }
  });

  const searchHistory = localStorage.getItem('afgBazSearchHistry')?.split(',');

  const signedInUserId =
    JSON.parse(localStorage.getItem('24UserLoginData')) ||
    JSON.parse(sessionStorage.getItem('24UserLoginData'));

  function handleUserSignedIn() {
    setDisplayUserSignedIn((i) => !i);

    fetch(`http://localhost:3000/userSignup/${signedInUserId}`)
      .then((response) => response.json())
      .then((result) => setSignedInUserData(result));
  }

  return (
    <>
    <div
      className={`${
        menuType ? 'bg-blue-100 shadow' : 'bg-white'
      } fixed w-full text-blue-400 z-40 sm:bg-blue-200 sm:text-gray-600 sm:h-14 sm:fixed sm:shadow-md shadow ${
        showMenu
          ? 'sm:top-0 sm:opacity-100'
          : menuIconDisplay
          ? 'sm:top-0 sm:opacity-100'
          : 'sm:-top-14 sm:opacity-0'
      } sm:shadow-sm sm:transition-all sm:duration-[.75s] sm:ease-in-out md:bg-blue-200 md:text-gray-600 md:h-16 md:fixed`}
    >
      <div className="flex justify-between items-center w-[70%] md:w-full mx-auto py-3  sm:block sm:w-full sm:py-3 sm:z-20">
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
              {menuIconDisplay ? (
                ''
              ) : (
                <>
                  FarahiBazaar
                  <span className="text-orange-500 font-extrabold">24</span>
                </>
              )}
            </Link>
          </h3>
        </div>
        <div>
          <div
            className={`${
              menuIconDisplay
                ? `sm:absolute sm:left-0 sm:top-0 transition-all duration-[.4s] ease-in-out md:absolute md:left-0 md:top-0`
                : `sm:absolute sm:-left-full sm:top-0 transition-all duration-[.4s] ease-in-out md:absolute md:-left-full md:top-0`
            } sm:bg-blue-200 sm:w-[70%] sm:h-screen sm:z-[3]  md:bg-blue-200 md:w-[55%] md:h-screen md:z-[3]`}
          >
            <div className="hidden sm:block sm:absolute sm:left-2 sm:top-3 sm:text-3xl cursor-pointer md:block md:absolute md:left-4 md:top-4 md:text-3xl">
              {menuIconDisplay ? (
                <AiOutlineMenuFold
                  onClick={() => handleMenuIcon(menuIconDisplay)}
                />
              ) : null}
            </div>
            <div className="hidden sm:block md:block">
              <h3 className="font-semibold text-3xl sm:text-2xl sm:absolute sm:left-[50%] sm:translate-x-[-50%] sm:top-2 md:text-3xl md:absolute md:left-[50%] md:translate-x-[-50%] md:top-3">
                <Link to="/">
                  AfghanBazaar
                  <span className="text-orange-500 font-extrabold">24</span>
                </Link>
              </h3>
            </div>
            <ul className="flex text-xl uppercase font-semibold sm:py-14 sm:block md:py-16 md:block sm:text-center md:text-center">
              <li className="sm:py-4 md:py-4">
                <Link
                  onClick={handleMenu}
                  className={`mx-5 ${
                    selectMenu('/') &&
                    `text-blue-500 border-b-[3px] border-orange-500 sm:text-gray-700 md:text-gray-700`
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li
                onMouseEnter={() => setDisplayProductType(true)}
                onMouseLeave={() => setDisplayProductType(false)}
                className="sm:py-4 md:py-4"
              >
                <Link
                  onClick={handleMenu}
                  className={`mx-5 sm:inline-flex ${
                    selectMenu('/products') &&
                    `text-blue-500 border-b-[3px] border-orange-500 sm:text-gray-700 md:text-gray-700`
                  }`}
                  to="/products"
                >
                  Products
                </Link>
                {/*{displayProductType && <ProductsTypes />}*/}
              </li>
              <li className="sm:py-4 md:py-4">
                <Link
                  onClick={() => {
                    setDisplayAllCat((e) => !e);
                    setMeniIconDisplay(false);
                  }}
                  className={`mx-5 ${
                    displayAllCat &&
                    `text-blue-500 border-b-[3px] border-orange-500 sm:text-gray-700 md:text-gray-700`
                  }`}
                >
                  Category
                </Link>
              </li>
              <li className="sm:py-4 md:py-4">
                <Link
                  onClick={handleMenu}
                  className={`mx-5 ${
                    selectMenu('/contact') &&
                    `text-blue-500 border-b-[3px] border-orange-500 sm:text-gray-700 md:text-gray-700`
                  }`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Over lay container */}
          <div
            onClick={() => setMeniIconDisplay(false)}
            className={`${
              menuIconDisplay &&
              'sm:bg-gray-700 sm:bg-opacity-50 sm:absolute  sm:top-0 sm:left-0 sm:right-0 sm:bottom-0 sm:z-[2] sm:h-screen md:bg-gray-700 md:bg-opacity-70 md:absolute  md:top-0 md:left-0 md:right-0 md:bottom-0 md:z-[2] md:h-screen'
            }`}
          ></div>
        </div>

        {/* Sign in container */}
        <div className="cursor-pointer sm:float-right sm:mr-1 md:mr-4">
          <div className="flex items-center">
            <span className="sm:hidden text-3xl mr-4 hover:text-blue-500 sm:hover:text-gray-700">
              <AiOutlineSearch onClick={handleSearchDisplay} />
            </span>
            <div
              onClick={() => navigate('/favorite')}
              className="sm:hidden text-2xl mr-6 relative hover:text-blue-500 sm:hover:text-gray-700"
            >
              <FaRegHeart />{' '}
              {updateFavorite > 0 && (
                <span
                  className={`text-[1rem] font-semibold absolute text-orange-500 bg-orange-200 rounded-full leading-none px-[0.3rem] py-[0.1rem] top-[-0.5rem] right-[-0.6rem]`}
                >
                  {updateFavorite}
                </span>
              )}
            </div>
            {getUserLoginData ? (
              <>
                <div
                  onClick={handleUserSignedIn}
                  className="flex items-center mr-4 hover:text-blue-500 sm:hover:text-gray-700 sm:hidden"
                >
                  <FaUser className="text-2xl" />
                  <IoIosArrowDown
                    className={`text-3xl transition duration-500 ${
                      displayUserSignedIn && 'rotate-180'
                    }`}
                  />
                </div>
              </>
            ) : (
              <p
                onClick={() => navigate('/user-signin')}
                className="sm:hidden flex items-center text-xl hover:text-blue-500 sm:hover:text-gray-700"
              >
                Sign in <AiOutlineLogin className="ml-2 mr-4" />
              </p>
            )}
            <div className="sm:hidden flex items-end hover:text-blue-500 sm:hover:text-gray-700">
              <MdOutlineLanguage className="text-[1.7rem]" />{' '}
              <span className="text-[1.1rem] pl-[0.05rem]">EN</span>
            </div>
          </div>
          {/* Mobile size search */}
          <div
            className={`${
              displaySearch && 'sm:bg-blue-400 rounded-full'
            } hidden sm:block text-3xl sm:mx-1`}
          >
            <BiSearch
              onClick={handleSearch}
              className={`${displaySearch && 'sm:px-1'}`}
            />
          </div>
        </div>

        {/* mobile size Search bar container */}
        <div
          className={`${
            displaySearch ? 'scale-100' : 'scale-0'
          } hidden sm:block sm:w-[88%] sm:h-[52px] sm:-mt-3 sm:absolute sm:transition-all sm:duration-300 sm:ease-in-out`}
        >
          <input
            type="text"
            className="sm:w-full sm:bg-blue-200 sm:h-full sm:outline-none sm:border-none sm:text-lg sm:pl-2"
            placeholder="Search products..."
            ref={ref}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>
      {/* Laptop view search bar container */}
      <div
        className={`absolute top-15 md:top-16 -z-10 ${
          displaySearchContainer ? 'scale-1 opacity-100' : 'scale-0 opacity-0'
        } bg-blue-300 flex justify-center items-center w-full h-28 shadow transition-all duration-[.4s] ease-linear sm:hidden md:h-24`}
      >
        <div className="w-[50%] bg-white rounded-lg flex items-center md:w-[60%]">
          <BiSearch
            onClick={searchProducts}
            className="text-2xl cursor-pointer m-2"
          />
          <input
            ref={reff}
            type="text"
            value={searchData}
            placeholder="Search"
            className="text-lg w-full font-semibold outline-none"
            onChange={handleSearchOnChange}
          />
          {displaySearchClose && (
            <RxCrossCircled
              onClick={clearSearch}
              className="text-2xl cursor-pointer m-2"
            />
          )}
        </div>
        {/* Search History Container Start */}
        {displaySearchHistoryContainer && (
          <div className="absolute top-[5rem] md:top-[4.5rem] left-[50%] w-[50%] md:w-[60%] -translate-x-[50%] bg-white rounded-lg shadow">
            <div className="mb-[2.5rem]">
              <p className="ml-3 mt-2 bg-blue-100 absolute px-2 rounded-xl text-blue-400">
                Recent searches
              </p>

              <MdOutlineAutoDelete
                onClick={deleteSearchHistory}
                className="mt-2 absolute text-blue-400 right-2 cursor-pointer text-[1.7rem]"
              />
            </div>

            {JSON.parse(searchHistory)
              .sort((a, b) => b - a)
              .slice(0, 5)
              .map((s, i) => (
                <div
                  onClick={() => searchBySearchHistory(s)}
                  className="w-full flex items-center md:w-[60%] border-t cursor-pointer hover:bg-blue-200"
                  key={i}
                >
                  <BiSearch className="text-2xl cursor-pointer m-2" />
                  <p>{s}</p>
                  <BsArrowUpLeftCircle className="text-xl cursor-pointer m-2 absolute right-1" />
                </div>
              ))}
          </div>
        )}
        {/* Search Hostory Container End */}
        <IoCloseSharp
          onClick={handleSearchDisplay}
          className="text-white text-3xl absolute right-[18%] top-[1rem] cursor-pointer hover:text-orange-400 md:right-[10%]"
        />
      </div>
      {displayUserSignedIn && (
        <div className="absolute right-[16%]">
          <UserSignedIn
            signedInUserData={signedInUserData}
            setDisplayUserSignedIn={setDisplayUserSignedIn}
          />
        </div>
      )}
      {displayAllCat && (
       <div className="sm:hidden">
         <DisplayAllCategories
          displayAllCat={displayAllCat}
          setDisplayAllCat={setDisplayAllCat}
        />
       </div>
      )}
    </div>
    <div>

    {displayAllCat && (
        <DisplayAllCategories
          displayAllCat={displayAllCat}
          setDisplayAllCat={setDisplayAllCat}
        />
      )}
    </div>
    </>
  );
};

export default Header;

// const ProductsTypes = () => {
//   return (
//     <div className="absolute w-[23rem] top-[2.8rem] bg-blue-50 p-5 sm:hidden">
//       <div className="absolute left-[0] -top-[0.2rem] w-[1.8rem] h-[1.8rem] bg-blue-50 rotate-[45deg]"></div>
//       <p>All products</p>
//     </div>
//   );
// };

function UserSignedIn({ setDisplayUserSignedIn, signedInUserData }) {
  const navigate = useNavigate();

  // get signed in user id
  const userId =
    JSON.parse(localStorage.getItem('24UserLoginData')) ||
    JSON.parse(sessionStorage.getItem('24UserLoginData'));

  async function userSignOut() {
    localStorage.removeItem('24UserLoginData');
    sessionStorage.removeItem('24UserLoginData');
    navigate('/user-signin');

    // get user offline
    await fetch(`http://localhost:3000/userSignup/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        online: false,
      }),
    });
  }

  return (
    <div className="shadow bg-white rounded">
      <div className="border-t border-slate-300 p-2">
        <p className="sm:hidden flex items-center text-xl">
          <FiUser className="mr-2" /> {signedInUserData.firstName}{' '}
          {signedInUserData.lastName}
        </p>
      </div>
      <div className="p-2 mt-2">
        <Button
          onClick={() => setDisplayUserSignedIn(false)}
          extraStyle="w-full"
        >
          View Profile
        </Button>
      </div>
      <div
        onClick={() => setDisplayUserSignedIn(false)}
        className="border-t border-slate-300 p-2 hover:bg-orange-50 cursor-pointer"
      >
        <p
          onClick={userSignOut}
          className="sm:hidden flex items-center text-xl"
        >
          <RiLogoutBoxLine className="mr-2" /> Sign out
        </p>
      </div>
    </div>
  );
}

function DisplayAllCategories({ displayAllCat, setDisplayAllCat }) {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    async function getCat() {
      try {
        const response = await fetch(`http://localhost:3000/categories`);
        if (!response.ok) throw new Error('Failed to fetch data...');
        const result = await response.json();
        setCat(result);
      } catch (err) {
        console.error(err);
      }
    }

    getCat();
  }, []);

  const url = `http://localhost:3000/products`;
  const {data} = useFetchGet(url);

  return (
    <div
      className={`absolute md:fixed md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:z-[40] sm:z-[40] sm:fixed sm:overflow-y-scroll sm:w-full md:translate-y-[-50%] bg-white ${
        displayAllCat && 'allCat-max'
      } z-[-1] shadow w-[70.1%] left-[50%] translate-x-[-50%]`}
    >
      <RxCross2
        onClick={() => setDisplayAllCat(false)}
        className="absolute cursor-pointer right-3 top-3 text-3xl hidden md:block sm:block"
      />
      <div className="grid grid-cols-4 sm:grid-cols-2 p-10 gap-10">
        {cat.map((c) => (
          <div key={c.cat}>
            <p className="font-semibold cursor-pointer">{c.cat} ({data.filter(cat => cat.category === c.cat).length})</p>
            {c.types?.map((type) => (
              <p key={type} className="cursor-pointer text-[15px] pl-1">
                {type} ({data.filter(t => t.type === type).length})
              </p> 
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
