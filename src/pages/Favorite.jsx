import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// React Icons
import { LuHeartOff } from "react-icons/lu";

// Components
import ProductCard from "../components/ProductCard";

const Favorite = ({ setUpdateFavorite, productCardDisplay }) => {
  const [favorites, setFavorits] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then((response) => response.json())
      .then((result) => setFavorits(result));
  }, []);

  const getFavorite = localStorage.getItem("fav24").split(",").slice(1);

  return (
    <div className="pt-24 sm:pt-[4.5rem] pb-20 sm:py-17 md:py-8 w-[70%] md:w-[95%] sm:w-[95%] mx-auto">
      <p className="font-semibold border-b-2 mb-6 sm:mb-0 text-lg w-fit">Favorite items</p>
      <div className={`home-container grid ${productCardDisplay === "grid" ? "grid-cols-5 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-2 sm:grid-cols-1 md:grid-cols-2"} gap-6 mt-3 sm:gap-2 sm:mt-4`}>
        {getFavorite.length > 0 ? getFavorite.map((favId) => {
          return favorites
            .filter((p) => p.id === favId)
            .map((fav) => (
              <ProductCard
                setUpdateFavorite={setUpdateFavorite}
                product={fav}
                key={fav.id}
                productCardDisplay={productCardDisplay}
              />
            ));
        }) : <NoFavoriteItem/>}
      </div>
    </div>
  );
};

export default Favorite;

// <ProductCard product={fav} key={fav.id} />

function NoFavoriteItem() {
  const navigate = useNavigate();
  return <div className="my-28">
    <div className="text-red-600 text-[5rem]">
    <LuHeartOff />
    </div>
    <div className="mt-10 text-slate-700">
      <p className="font-semibold text-2xl">No favorite item</p>
      <p className="text-lg mt-4"><span onClick={()=>navigate("/products")} className="underline text-blue-500 cursor-pointer">Click</span> here to emplore and add items</p>
    </div>
  </div>
}
