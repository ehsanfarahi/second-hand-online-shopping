import { useEffect, useState } from "react";

// React Icons
import { MdOutlineShoppingBag } from "react-icons/md";
import { PiSmileySadThin } from "react-icons/pi";

import { useParams } from "react-router";

// Import Components
import ProductCard from "./ProductCard";

const SearchProduct = ({setUpdateFavorite}) => {
  const [searchData, setSearchData] = useState([]);
  const [productFound, setProductFound] = useState(false);

  const { data } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/products?title=${data}`)
      .then((response) => response.json())
      .then((result) => {
        setSearchData(result);
        if (result.length > 0) {
          setProductFound(true);
        } else {
          setProductFound(false);
        }
      });
  }, [data]);

  return (
    <div className="py-20 sm:py-8 md:py-8 w-[70%] md:w-[95%] sm:w-[95%] mx-auto">
      <div className="grid grid-cols-5 gap-6 mt-[7rem] sm:grid-cols-2 sm:gap-2 sm:mt-[2rem] sm:mx-4 md:grid-cols-3 md:mt-36 md:mx-4">
        {productFound ? (
          searchData.map((product) => {
            return (
              <ProductCard
            setUpdateFavorite={setUpdateFavorite} 
              product={product}
             
          
              key={product.id}
            />    
            );
          })
        ) : (
          <div className="sm:w-auto">
            <div className="flex items-center">
              <div>
                <MdOutlineShoppingBag className="text-[8rem] text-blue-300 sm:text-[6rem]" />
                <PiSmileySadThin className="text-[3rem] absolute top-[3.5rem] left-[2.5rem] text-orange-400 sm:text-[2.6rem] sm:top-[2.5rem] sm:left-[1.7rem]" />
              </div>
              <div>
                <p className="text-blue-400">Result for: {data}</p>
                <p className="text-orange-400 font-bold text-2xl sm:text-[1.2rem]">
                  Oops!
                </p>
                <p className="text-2xl text-blue-400 font-semibold sm:text-[1.2rem] whitespace-nowrap">
                  No products found...
                </p>
              </div>
            </div>
          </div>  
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
