import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// React Icons
import { MdAddBusiness } from "react-icons/md";
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
        <div className="fixed right-10 bottom-12 sm:right-4 sm:z-[-1] md:right-6 md:z-[-1]">
          <MdAddBusiness className="text-5xl cursor-pointer text-green-400 hover:text-green-500 sm:text-3xl md:text-4xl" />
          {/* <MdAddChart /> */}
          {/* <MdLibraryAdd /> */}
          {/* <AiOutlineAppstoreAdd /> */}
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
          className="fixed right-10 bottom-12 bg-blue-50 rounded-sm cursor-pointer hover:bg-blue-100 sm:right-4 sm:z-[-1] md:right-6 md:z-[-1]"
        >
          <RiArrowUpSLine className="text-5xl cursor-pointer text-blue-400 sm:text-4xl md:text-4xl" />
        </div>
      )}
    </>
  );
};
