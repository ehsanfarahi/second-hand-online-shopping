import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// React Icons
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RiArrowUpSLine } from "react-icons/ri";
import { FaShoppingBasket } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";

// Import Pages
import Home from "./pages/Home";

// Import Components
import Header from "./components/Header";
import { useEffect, useState } from "react";

function App() {
  const [displayAddProduct, setDisplayAddProduct] = useState(true);
  const [displayArrowUp, setDisplayArrowUp] = useState(false);

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
        </Routes>
        <MenuBottom />
      </Router>
      <AddProduct disp={displayAddProduct} />
      <ArrowUp disp={displayArrowUp} func={handleArrowUp} />
    </div>
  );
}

export default App;

const MenuBottom = () => {
  const [displayMenuBottom, setDisplayMenuBottom] = useState(true);
  const [initialScroll, setInitialScroll] = useState(0);

  window.addEventListener("scroll", () => {
    if (window.scrollY > initialScroll) {
      setInitialScroll(window.scrollY);
      setDisplayMenuBottom(false);
    } else if (window.scrollY < initialScroll) {
      setDisplayMenuBottom(true);
    }
  });

  return (
    <div
      className={`${
        displayMenuBottom ? "bottom-0 opacity-100" : "-bottom-14 opacity-0"
      } hidden sm:flex justify-between items-center px-2 fixed bg-blue-200 h-14 z-30 w-full text-gray-600 transition-all duration-[.75s] ease-in-out`}
    >
      {/* <RiShoppingCartLine /> */}
      {/* <FiShoppingCart /> */}
      {/* <IoMdCart /> */}
      {/* <TiShoppingCart /> */}

      {/* <LiaShoppingBagSolid /> */}
      <div className="relative">
        <FaShoppingBasket className="text-3xl hover:text-gray-700 cursor-pointer" />
        <span className="absolute bg-orange-500 text-white font-semibold px-1 leading-none  rounded-full -top-[6px] -right-[10px]">
          0
        </span>
      </div>
      <HiOutlineUser className="text-3xl hover:text-gray-700 cursor-pointer" />
    </div>
  );
};

const AddProduct = (props) => {
  return (
    <>
      {props.disp && (
        <div className="fixed right-10 bottom-16 z-30 sm:right-4 md:right-6">
          <AiOutlineAppstoreAdd className="text-5xl cursor-pointer text-orange-400 hover:text-orange-500 sm:text-3xl md:text-4xl" />
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
          className="fixed right-10 bottom-16 bg-blue-50 rounded-sm cursor-pointer hover:bg-blue-100 z-30 sm:right-4 md:right-6"
        >
          <RiArrowUpSLine className="text-5xl cursor-pointer text-blue-400 sm:text-4xl md:text-4xl" />
        </div>
      )}
    </>
  );
};
