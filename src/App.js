import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

// React Icons
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RiArrowUpSLine } from "react-icons/ri";
import { FaShoppingBasket } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";

// Import Pages
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import UserSignIn from "./pages/UserSignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Favorite from "./pages/Favorite";

// Import Components
import Header from "./components/Header";
import SearchProduct from "./components/SearchProduct";

function App() {
  const [displayAddProduct, setDisplayAddProduct] = useState(true);
  const [displayArrowUp, setDisplayArrowUp] = useState(false);

  // React Hooks
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 1500) {
        setDisplayAddProduct(false);
        setDisplayArrowUp(true);
      } else {
        setDisplayAddProduct(true);
        setDisplayArrowUp(false);
      }
    });
  }, []);

  const handleArrowUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-products/:data" element={<SearchProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/user-signin" element={<UserSignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
        <MenuBottom />
        <AddProductIcon disp={displayAddProduct} />
      </Router>
      <ArrowUp disp={displayArrowUp} func={handleArrowUp} />
    </div>
  );
}

export default App;

const MenuBottom = () => {
  const [displayMenuBottom, setDisplayMenuBottom] = useState(true);
  const [initialScroll, setInitialScroll] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  window.addEventListener("scroll", () => {
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
        displayMenuBottom ? "bottom-0 opacity-100" : "-bottom-14 opacity-0"
      } hidden sm:flex justify-between items-center px-2 fixed bg-blue-200 h-14 z-20 w-full text-gray-600 transition-all duration-[.75s] ease-in-out`}
    >
      {/* <RiShoppingCartLine /> */}
      {/* <FiShoppingCart /> */}
      {/* <IoMdCart /> */}
      {/* <TiShoppingCart /> */}

      {/* <LiaShoppingBagSolid /> */}
      <div
        className={`relative ${
          selectMenuBottom("/favorite")
            ? " border-orange-500 text-gray-700 rounded-t"
            : "text-gray-500"
        }  h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <FaShoppingBasket
          onClick={() => navigate("/favorite")}
          className="text-3xl hover:text-gray-700 cursor-pointer"
        />
        <span className="absolute bg-orange-500 text-white font-semibold px-1 leading-none  rounded-full -top-[6px] -right-[10px] mt-2">
          0
        </span>
      </div>
      <div
        className={`${
          selectMenuBottom("/user-signin")
            ? "border-orange-500 text-gray-700 rounded-t"
            : "text-gray-500"
        } h-full pt-2 border-t-[4px] border-blue-200 px-2`}
      >
        <HiOutlineUser
          onClick={() => navigate("/user-signin")}
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
    navigate("/add-product");
  }
  return (
    <>
      {props.disp && (
        <div className="fixed right-10 bottom-16 z-20 sm:right-4 md:right-6">
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
