// React Icons
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProducts(result);
      });
  }, []);
  return (
    <div className="py-20">
      <div className="inline-flex flex-wrap justify-around mt-12">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="max-w-[18%] h-[28rem] rounded overflow-hidden shadow-lg relative sm:max-w-[90%] sm:mb-6 z-[-1]"
            >
              {product.newUpload && (
                <span className="absolute bg-blue-300 text-white font-bold text-lg px-2 py-1 shadow top-4">
                  New
                </span>
              )}
              <img
                className="w-full h-56 shadow"
                src="pictures/car1.jpg"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base text-center">
                  {product.company} {product.model}
                </p>
                <div className="font-bold text-xl mb-2 text-center">
                  ${product.price}
                </div>
              </div>
              <div className="px-6 pt-0 pb-2 flex justify-between">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {product.location}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {product.date}
                </span>
              </div>
              <div className="px-6 pt-4 pb-2">
                <button className="w-full border-2 border-blue-400 font-semibold py-2 flex justify-center items-center">
                  <AiOutlineHeart className="text-lg mr-2" /> Add to favorite
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
