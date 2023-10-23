import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// React Icons
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RiArrowUpSLine } from "react-icons/ri";

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
      </Router>
      <AddProduct disp={displayAddProduct} />
      <ArrowUp disp={displayArrowUp} func={handleArrowUp} />
    </div>
  );
}

export default App;

const AddProduct = (props) => {
  return (
    <>
      {props.disp && (
        <div className="fixed right-10 bottom-12 sm:right-4 md:right-6">
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
          className="fixed right-10 bottom-12 bg-blue-50 rounded-sm cursor-pointer hover:bg-blue-100 sm:right-4 md:right-6"
        >
          <RiArrowUpSLine className="text-5xl cursor-pointer text-blue-400 sm:text-4xl md:text-4xl" />
        </div>
      )}
    </>
  );
};
