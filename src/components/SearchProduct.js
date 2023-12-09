import { useEffect, useState } from "react";

// React Icons
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineShoppingBag } from "react-icons/md";
import { PiSmileySadThin } from "react-icons/pi";

import { useParams } from "react-router";

const SearchProduct = () => {
  const [searchData, setSearchData] = useState([]);
  const [productFound, setProductFound] = useState(false);

  const { data } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/products?company=${data}`)
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

  const date = new Date();
  const yesterday = date.setDate(date.getDate() - 1);
  const twoDaysAgo = date.setDate(date.getDate(yesterday) - 1);
  const threeDaysAgo = date.setDate(date.getDate(twoDaysAgo) - 1);
  const fourDaysAgo = date.setDate(date.getDate(threeDaysAgo) - 1);
  const fiveDaysAgo = date.setDate(date.getDate(fourDaysAgo) - 1);
  const sixDaysAgo = date.setDate(date.getDate(fiveDaysAgo) - 1);
  const oneWeekAgo = date.setDate(date.getDate(sixDaysAgo) - 1);

  return (
    <div className="py-20 sm:py-17 md:py-8">
      <div className="grid grid-cols-6 gap-6 mt-[7rem] mx-10 sm:grid-cols-1 sm:gap-0 sm:mt-0 sm:mx-4 md:grid-cols-3 md:mt-36 md:mx-4">
        {productFound ? (
          searchData.map((product) => {
            return (
              <div
                key={product.id}
                className="h-[28rem] rounded overflow-hidden shadow-lg relative hover:outline hover:outline-blue-300 hover:scale-[1.02] z-10 cursor-pointer sm:mb-6"
              >
                {new Date(product.date).toDateString() ===
                  new Date().toDateString() && (
                  <span className="absolute bg-blue-300 text-white font-bold text-lg px-2 py-1 shadow top-4">
                    New
                  </span>
                )}
                <img
                  className="w-full h-56 shadow"
                  src="../pictures/car1.jpg"
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-3">
                  <p className="text-gray-700 text-base text-center whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {product.company} {product.model}
                  </p>
                  <div className="font-bold text-xl mb-2 text-center w-min mx-auto font-mono">
                    <p
                      className={`${
                        product.discount &&
                        "text-red-400 relative font-medium text-lg before:content-[''] before:block before:w-full before:border-red-400 before:border-t-2 before:h-3 before:absolute before:bottom-[2px] before:left-0 before:rotate-[-6deg] px-1"
                      }`}
                    >
                      ${product.price.toFixed(2)}
                    </p>
                    {product.discount ? (
                      <div className="relative flex">
                        <p className="text-green-700 text-2xl">
                          {product.discount === 100
                            ? "Free"
                            : `$${(
                                product.price -
                                (product.discount / 100) * product.price
                              ).toFixed(2)}`}
                        </p>{" "}
                        <span className="absolute right-[-55px] top-[-10px] text-orange-400">
                          -{product.discount}%
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="px-6 pt-0 pb-1 flex justify-between">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 whitespace-nowrap overflow-hidden">
                    {product.location}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 whitespace-nowrap">
                    {new Date(product.date).toDateString() ===
                    new Date().toDateString()
                      ? "Today"
                      : new Date(product.date).toDateString() ===
                        new Date(yesterday).toDateString()
                      ? "Yesterday"
                      : new Date(product.date).toDateString() ===
                        new Date(twoDaysAgo).toDateString()
                      ? "2d ago"
                      : new Date(product.date).toDateString() ===
                        new Date(threeDaysAgo).toDateString()
                      ? "3d ago"
                      : new Date(product.date).toDateString() ===
                        new Date(fourDaysAgo).toDateString()
                      ? "4d ago"
                      : new Date(product.date).toDateString() ===
                        new Date(fiveDaysAgo).toDateString()
                      ? "5d ago"
                      : new Date(product.date).toDateString() ===
                        new Date(sixDaysAgo).toDateString()
                      ? "6d ago"
                      : new Date(product.date).toDateString() ===
                        new Date(oneWeekAgo).toDateString()
                      ? "1w ago"
                      : product.date}
                  </span>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <button className="w-full border-2 border-blue-400 font-semibold py-2 flex justify-center items-center">
                    <AiOutlineHeart className="text-lg mr-2" /> Add to favorite
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="absolute top-[15rem] left-[50%] translate-x-[-50%] sm:w-auto sm:top-[10rem]">
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
