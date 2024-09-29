import { useEffect, useReducer, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  createBrowserRouter,
} from 'react-router-dom';

// React Icons
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { RiArrowUpSLine } from 'react-icons/ri';
import { TbHeart } from 'react-icons/tb';
import { HiOutlineUser } from 'react-icons/hi';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdNotificationsNone } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

// Import Pages
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import UserSignIn from './pages/UserSignIn';
import ForgotPassword from './pages/ForgotPassword';
import Favorite from './pages/Favorite';
import ProductDetail from './pages/ProductDetail';
import Profile from './components/Profile';
import Footer from './pages/Footer';
import PrivateComponent from './components/PrivateComponent';
import Contact from './pages/Contact';

// Import Components
import StarterLogo from './components/StarterLogo';
import Header from './components/Header';
import SearchProduct from './components/SearchProduct';

// React Toastify
import 'react-toastify/dist/ReactToastify.css';

const NUM_PRODUCT_DISPLAY = 20;

const initialState = {
  productCardDisplay: 'grid',
  displayLimit: NUM_PRODUCT_DISPLAY,
  selectedCity: null,
  selectedCategory: null,
  selectedSubCategory: null,
  selectedMinPrice: null,
  selectedMaxPrice: null,
  showFilter: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'grid':
      return {
        ...state,
        productCardDisplay: action.payload,
      };
    case 'list':
      return {
        ...state,
        productCardDisplay: action.payload,
      };
    case 'addDisplayLimit':
      return {
        ...state,
        displayLimit: state.displayLimit + action.payload,
      };
    case 'selectedCity':
      return {
        ...state,
        selectedCity: action.payload,
      };
    case 'deleteSelectedCity':
      return {
        ...state,
        selectedCity: null,
      };
    case 'selectedCategory':
      return {
        ...state,
        selectedCategory: action.payload,
        selectedSubCategory: null,
      };
    case 'deleteSelectedCategory':
      return {
        ...state,
        selectedCategory: null,
      };
    case 'selectedSubCategory':
      return {
        ...state,
        selectedSubCategory: action.payload,
        selectedCategory: null,
      };
    case 'deleteSelectedSubCategory':
      return {
        ...state,
        selectedSubCategory: null,
      };
    case 'selectedMinPrice':
      return {
        ...state,
        selectedMinPrice: action.payload,
      };
    case 'selectedMaxPrice':
      return {
        ...state,
        selectedMaxPrice: action.payload,
      };
    case 'selectedPrice':
      return {
        ...state,
        selectedMinPrice: action.payload.price1,
        selectedMaxPrice: action.payload.price2,
      };
    case 'deleteSelectedPrice':
      return {
        ...state,
        selectedMinPrice: null,
        selectedMaxPrice: null,
      };
    case 'clearAllFilters':
      return {
        ...state,
        selectedCity: null,
        selectedCategory: null,
        selectedSubCategory: null,
        selectedMinPrice: null,
        selectedMaxPrice: null,
      };
    case 'showFilter':
      return {
        ...state,
        showFilter: !state.showFilter,
      };
    default:
      throw new Error('Action unknown');
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/search-products/:data',
    element: <SearchProduct />,
  },
  {
    path: '/add-product',
    element: <AddProduct />,
  },
  {
    path: '/user-signin',
    element: <UserSignIn />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/favorite',
    element: <Favorite />,
  },
  {
    path: '/product-detail/:id',
    element: <ProductDetail />,
  },
  {
    path: '/profile/:id',
    element: <Profile />,
  },
]);

function App() {
  const [displayAddProduct, setDisplayAddProduct] = useState(true);
  const [displayArrowUp, setDisplayArrowUp] = useState(false);

  const [
    {
      productCardDisplay,
      displayLimit,
      selectedCity,
      selectedCategory,
      selectedSubCategory,
      selectedMinPrice,
      selectedMaxPrice,
      showFilter,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // React Hooks
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 1500) {
        setDisplayAddProduct(false);
        setDisplayArrowUp(true);
      } else {
        setDisplayAddProduct(true);
        setDisplayArrowUp(false);
      }
    });
  }, []);

  // get signed in user id
  const userId = JSON.parse(localStorage.getItem('24UserLoginData'));

  // get user online
  async function userOnline() {
    const controller = new AbortController();
    const signal = controller.signal;

    const id = JSON.parse(localStorage.getItem('24UserLoginData'));

    try {
      await fetch(`http://localhost:3000/userSignup/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          online: true,
        }),
        signal,
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Error:', error);
      }
    }

    setTimeout(() => {
      userOffline();
    }, 5 * 60 * 1000);
  }

  // get user offline
  async function userOffline() {
    await fetch(`http://localhost:3000/userSignup/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        online: false,
      }),
    });
  }

  // window.addEventListener("scroll", userOnline);
  if (userId) window.addEventListener('keydown', userOnline);

  // window.addEventListener("mouseover", userOnline);

  const handleArrowUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [updateFavorite, setUpdateFavorite] = useState(
    localStorage.getItem('fav24')?.split(',').slice(1).length
  );

  const [displayStarterLogo, setDisplayStarterLogo] = useState(true);

  const getLogoStatus = sessionStorage.getItem('StarterLogo');
  useEffect(() => {
    if (getLogoStatus) {
      setDisplayStarterLogo(false);
    } else {
      setDisplayStarterLogo(true);
      setTimeout(() => {
        setDisplayStarterLogo(false);
        sessionStorage.setItem('StarterLogo', true);
      }, 2000);
    }
  }, [getLogoStatus]);

  return (
    <div className="App">
      {displayStarterLogo && <StarterLogo />}
      <Router>
        <Header updateFavorite={updateFavorite} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setUpdateFavorite={setUpdateFavorite}
                productCardDisplay={productCardDisplay}
                dispatch={dispatch}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/products"
            element={
              <Products
                setUpdateFavorite={setUpdateFavorite}
                productCardDisplay={productCardDisplay}
                dispatch={dispatch}
                displayLimit={displayLimit}
                selectedCity={selectedCity}
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                selectedMinPrice={selectedMinPrice}
                selectedMaxPrice={selectedMaxPrice}
                showFilter={showFilter}
                NUM_PRODUCT_DISPLAY={NUM_PRODUCT_DISPLAY}
              />
            }
          />
          <Route
            path="/search-products/:data"
            element={<SearchProduct setUpdateFavorite={setUpdateFavorite} />}
          />
          <Route element={<PrivateComponent />}>
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
          <Route path="/user-signin" element={<UserSignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/favorite"
            element={
              <Favorite
                setUpdateFavorite={setUpdateFavorite}
                productCardDisplay={productCardDisplay}
              />
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <ProductDetail
                updateFavorite={updateFavorite}
                setUpdateFavorite={setUpdateFavorite}
              />
            }
          />
          <Route
            path="/profile/:id"
            element={<Profile setUpdateFavorite={setUpdateFavorite} />}
          />
        </Routes>
        <Footer />
        <MenuBottom updateFavorite={updateFavorite} />
        <AddProductIcon disp={displayAddProduct} />
      </Router>
      <ArrowUp disp={displayArrowUp} func={handleArrowUp} />
    </div>
  );
}

export default App;

const MenuBottom = ({ updateFavorite }) => {
  const [displayMenuBottom, setDisplayMenuBottom] = useState(true);
  const [initialScroll, setInitialScroll] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  window.addEventListener('scroll', () => {
    if (window.scrollY > initialScroll) {
      setInitialScroll(window.scrollY);
      setDisplayMenuBottom(false);
    } else if (window.scrollY < initialScroll) {
      setDisplayMenuBottom(true);
    }
  });

  // Functions
  function selectMenuBottom(menu) {
    if (location.pathname === menu) {
      return true;
    }
  }

  return (
    <div
      className={`${
        displayMenuBottom ? 'bottom-0 opacity-100' : '-bottom-14 opacity-0'
      } hidden sm:flex justify-between items-center px-2 fixed bg-blue-200 h-20 z-20 w-full text-gray-600 transition-all duration-[.75s] ease-in-out`}
    >
      <div
        className={`${
          selectMenuBottom('/products')
            ? 'border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        } h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <GoHome
          onClick={() => navigate('/products')}
          className="text-3xl hover:text-gray-700 cursor-pointer"
        />
      </div>
      <div
        className={`relative ${
          selectMenuBottom('/favorite')
            ? ' border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        }  h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <TbHeart
          onClick={() => navigate('/favorite')}
          className="text-3xl hover:text-gray-700 cursor-pointer"
        />
        <span className="absolute bg-orange-500 text-white font-semibold px-1 leading-none  rounded-full -top-[4px] right-[3px] mt-2">
          {updateFavorite}
        </span>
      </div>
      <div
        className={`relative ${
          selectMenuBottom('/add-product')
            ? ' border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        }  h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <FaCirclePlus
          onClick={() => navigate('/add-product')}
          className="text-4xl text-orange-500 hover:text-orange-600 cursor-pointer"
        />
      </div>
      <div
        className={`${
          selectMenuBottom('/notification')
            ? 'border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        } h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <MdNotificationsNone
          onClick={() => navigate('/notification')}
          className="text-3xl hover:text-gray-700 cursor-pointer"
        />
      </div>
      <div
        className={`${
          selectMenuBottom('/user-signin')
            ? 'border-orange-500 text-gray-700 rounded-t'
            : 'text-gray-500'
        } h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <HiOutlineUser
          onClick={() => navigate('/user-signin')}
          className="text-3xl hover:text-gray-700 cursor-pointer"
        />
      </div>
    </div>
  );
};

const AddProductIcon = (props) => {
  const navigate = useNavigate();
  // Functions
  function handleAddProduct() {
    navigate('/add-product');

    sessionStorage.setItem('redirectUrl', window.location.href);
  }

  return (
    <>
      {props.disp && (
        <div className="fixed right-10 bottom-16 z-20 sm:right-4 md:right-6 sm:hidden">
          <AiOutlineAppstoreAdd
            onClick={handleAddProduct}
            className="text-5xl cursor-pointer text-orange-400 hover:text-orange-500 sm:text-4xl md:text-4xl"
          />
          {/* <MdAddChart /> */}
          {/* <MdLibraryAdd /> */}
          {/* <MdAddBusiness /> */}
          {/* <BiCommentAdd /> */}
          {/* <MdAddComment /> */}
        </div>
      )}
    </>
  );
};

const ArrowUp = (props) => {
  return (
    <>
      {props.disp && (
        <div
          onClick={props.func}
          className="fixed right-10 bottom-16 bg-blue-50 rounded-sm cursor-pointer hover:bg-blue-100 z-20 sm:right-4 md:right-6"
        >
          <RiArrowUpSLine className="text-5xl cursor-pointer text-blue-400 sm:text-4xl md:text-4xl" />
        </div>
      )}
    </>
  );
};
