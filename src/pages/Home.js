import { useEffect, useState } from "react";

// Get random recommended ads
import _ from "lodash";

// React Icons
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { IoCarOutline } from "react-icons/io5";
import { MdOutlinePhonelink } from "react-icons/md";
import { TbArmchair2 } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";
import { FaChild } from "react-icons/fa6";
import { BiSolidDog } from "react-icons/bi";
import { MdMiscellaneousServices } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";


// Components
import Spinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";
import PopupProductDetail from "../components/PopupProductDetail";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import Error from "../components/Error";
import NetworkError from "../components/NetworkError";

// API
const api = "http://localhost:3000/products";

// Variables
const errorMessage = "Something went wrong while fetching data";


const Home = ({ setUpdateFavorite }) => {
  const numProductDisplay = 10;

  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [popupDetail, setPopupDetail] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [loadingRecommended, setLoadingRecommended] = useState(false);
  const [loadingForYou, setLoadingForYou] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(numProductDisplay);
  const [displayPopupProDetail, setDisplayPopupProDetail] = useState(false);
  const [error, setError] = useState("");

  // Fetching featured ads
  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;
   
   async function fetchData() {
    try {
    setLoadingFeatured(true);
    setError("");

    const response = await fetch(`${api}?featured=1&_limit=${displayLimit}`, {signal});

    if(!response.ok) throw new Error(`${errorMessage}`);
    
    const result = await response.json();

      const sortedData = result.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFeaturedProducts(sortedData);
      
      setError("");
    } catch (error) {
      if(error.name !== "AbortError") setError(error instanceof TypeError ? <NetworkError/> : error.message)
      
    } finally {
      setLoadingFeatured(false);
    }
   }  
   fetchData();

   return () => controller.abort();
  }, [displayLimit]); 

  // Fetching recommended ads
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoadingRecommended(true);
     try {
      const response = await fetch(`${api}?featured=0&_limit=10`, {signal});

      if(!response.ok) throw new Error(`${errorMessage}`);

      const result = await response.json();

       // Get random recommended ads
  const limit = 10;
  const randomRecommendedAds = _.sampleSize(result, limit);

      setRecommendedProducts(randomRecommendedAds);
      
     } catch (error) {
      if(error.name !== "AbortError") setError(error instanceof TypeError ? <NetworkError/> : error.message); 
     } finally {
      setLoadingRecommended(false); 
     }
    }
    fetchData();

    return () => controller.abort();
  }, []);

  // Fetching all ads
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
   const fetchData = async () => {
      try {
        setLoadingForYou(true);

        const response = await fetch(`${api}?featured=0&_limit=${displayLimit}`, {signal});
        if(!response.ok) throw new Error(`${errorMessage}`);
        const result = await response.json();
        
          const sortedData = result.sort((a, b) => new Date(b.date) - new Date(a.date));
          setProducts(sortedData);

      } catch (error) {
        if(error.name !== "AbortError") setError(error instanceof TypeError ? <NetworkError/> : error.message);
      } finally {
        setLoadingForYou(false);
      }
   }
   fetchData();

   return () => controller.abort();
  }, [displayLimit]);

  function handleLoadMore() {
    setDisplayLimit((num) => num + numProductDisplay);
  }

  function getPopupDetail(id) {
    fetch(`http://localhost:3000/products/${id}`)
    .then((response) => response.json())
    .then((result) => {
      setPopupDetail(result);
    });
  }

  return (
    <div className="py-20 sm:py-8 md:py-8 w-[70%] md:w-[95%] sm:w-[95%] mx-auto">
      <Categories/>
      <AdsDisplayCategory
        products={featuredProducts}
        loading={loadingFeatured}
        numProductDisplay={numProductDisplay}
        setUpdateFavorite={setUpdateFavorite}
        handleLoadMore={handleLoadMore}
        getPopupDetail={getPopupDetail}
        setDisplayPopupProDetail={setDisplayPopupProDetail}
        error={error}
      >
        Featured Ads
      </AdsDisplayCategory>
      <AdsDisplayCategory
        products={recommendedProducts}
        loading={loadingRecommended}
        numProductDisplay={numProductDisplay}
        setUpdateFavorite={setUpdateFavorite}
        handleLoadMore={handleLoadMore}
        loadMore={false}
        getPopupDetail={getPopupDetail}
        setDisplayPopupProDetail={setDisplayPopupProDetail}
        extraStyle="pt-16"
        error={error}
      >
        Recommended Ads
      </AdsDisplayCategory>
      <AdsDisplayCategory
        products={products}
        loading={loadingForYou}
        numProductDisplay={numProductDisplay}
        setUpdateFavorite={setUpdateFavorite}
        handleLoadMore={handleLoadMore}
        getPopupDetail={getPopupDetail}
        setDisplayPopupProDetail={setDisplayPopupProDetail}
        extraStyle="pt-16"
        error={error}
      >
        For you
      </AdsDisplayCategory>

      {/* Mobile size product detail popup display */}
      {displayPopupProDetail && <PopupProductDetail detail={popupDetail} setDisplayPopupProDetail={setDisplayPopupProDetail} />}
    </div>
  );
};

export default Home;

function Categories() {
  return <div className="flex justify-center sm:justify-start gap-2 sm:gap-0 md:overflow-x-auto sm:overflow-x-auto">
  <ProductCategory category="Accomodation" bg="bg-green-500">
    <MdOutlineMapsHomeWork />
  </ProductCategory>
  <ProductCategory category="Vehicles" bg="bg-red-400">
    <IoCarOutline />
  </ProductCategory>
  <ProductCategory category="Electronics" bg="bg-blue-400">
    <MdOutlinePhonelink />
  </ProductCategory>
  <ProductCategory category="Furniture" bg="bg-purple-400">
    <TbArmchair2 />
  </ProductCategory>
  <ProductCategory category="Fashion" bg="bg-orange-400">
    <GiClothes />
  </ProductCategory>
  <ProductCategory category="Kids" bg="bg-pink-400">
  <FaChild />
  </ProductCategory>
  <ProductCategory category="Pets" bg="bg-teal-400">
  <BiSolidDog />
  </ProductCategory>
  <ProductCategory category="Services" bg="bg-indigo-400">
  <MdMiscellaneousServices />
  </ProductCategory>
  <ProductCategory category="Other" bg="bg-slate-400">
  <BsThreeDots />
  </ProductCategory>
</div>
}

function AdsDisplayCategory({
  children,
  products,
  loading,
  numProductDisplay,
  setUpdateFavorite,
  handleLoadMore,
  loadMore = true,
  extraStyle,
  getPopupDetail,
  setDisplayPopupProDetail,
  error,
}) {

  return (
    <div className={`${extraStyle}`}>
      <p className="font-bold text-xl mt-5 text-slate-700">{children}</p>
      <div className="home-container">
        {loading ? <>{Array.from({length: numProductDisplay}, (_, i) => <LoadingPlaceholder key={i} />)}</> : !loading && !error && <>{products.map((product) => {
          return ( 
            <ProductCard
              setUpdateFavorite={setUpdateFavorite}
              product={product}
              getPopupDetail={getPopupDetail}
              setDisplayPopupProDetail={setDisplayPopupProDetail}
              key={product.id}
            />
          );
        })}</>}
      </div>

      {error && <Error error={error} />}
      
      {loadMore && (
        <>
          {" "}
          {products.length >= numProductDisplay && (
            <LoadMore handleLoadMore={handleLoadMore} />
          )}
          {/* {loading && <Spinner />} */}
        </>
      )}


    </div>
  );
}

function LoadMore({ handleLoadMore }) {
  return (
    <div
      onClick={handleLoadMore}
      className="w-fit mx-auto mt-12 cursor-pointer"
    >
      <div className="load-more">
        <Spinner type="5" wWidth="w-[3rem] sm:w-[2rem]" applyStyle={false} />
        <p className="text-lg pr-1">Load more</p>
      </div>
    </div>
  );
}

function ProductCategory({ children, category, bg }) {
  const [hoverEffect, setHoverEffect] = useState(false);
  return (
    <div
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
      className={`md:mt-14 mt-14 flex flex-col items-center cursor-pointer px-4 sm:px-2 ${
        hoverEffect && "scale-[1.1]"
      }`}
    >
      <div
        className={`text-4xl sm:text-3xl ${bg} shadow-md rounded-full text-white p-6 sm:p-4`}
      >
        {children}
      </div>
      <div className="mt-1">
        <p
          className={`font-semibold sm:font-bold rounded p-1 text-[0.8rem] sm:text-[0.7rem] ${
            hoverEffect && "bg-orange-100"
          }`}
        >
          {category}
        </p>
      </div>
    </div>
  );
}



