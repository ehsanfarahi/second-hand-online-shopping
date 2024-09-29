import { useEffect, useReducer, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import UserSignIn from './pages/UserSignIn';
import ForgotPassword from './pages/ForgotPassword';
import Favorite from './pages/Favorite';
import ProductDetail from './pages/ProductDetail';
import Profile from './components/Profile';
import PrivateComponent from './components/PrivateComponent';
import Contact from './pages/Contact';

// Import Components
import SearchProduct from './components/SearchProduct';

// React Toastify
import 'react-toastify/dist/ReactToastify.css';
import AppLayout from './components/AppLayout';

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


  const router = createBrowserRouter([
    {
      element: <AppLayout displayStarterLogo={displayStarterLogo}
      updateFavorite={updateFavorite}
      displayAddProduct={displayAddProduct}
      displayArrowUp={displayArrowUp}
      handleArrowUp={handleArrowUp} />,
      children: [
        {
          path: '/',
          element: (
            <Home
              setUpdateFavorite={setUpdateFavorite}
              productCardDisplay={productCardDisplay}
              dispatch={dispatch}
            />
          ),
        },
        {
          path: '/contact',
          element: <Contact />,
        },
        {
          path: '/products',
          element: (
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
          ),
        },
        {
          path: '/search-products/:data',
          element: <SearchProduct setUpdateFavorite={setUpdateFavorite} />,
        },
        {
          element: <PrivateComponent />,
          children: [
            {
              path: '/add-product',
              element: <AddProduct />,
            },
          ],
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
          element: (
            <Favorite
              setUpdateFavorite={setUpdateFavorite}
              productCardDisplay={productCardDisplay}
            />
          ),
        },
        {
          path: '/product-detail/:id',
          element: (
            <ProductDetail
              updateFavorite={updateFavorite}
              setUpdateFavorite={setUpdateFavorite}
            />
          ),
        },
        {
          path: '/profile/:id',
          element: <Profile setUpdateFavorite={setUpdateFavorite} />,
        },
      ]
    }
  ]);

  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;




