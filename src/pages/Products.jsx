// Custom Hooks
import { useFetchGet } from '../useFetchGet';

// Components
import ProductCard from '../components/ProductCard';
import Error from '../components/Error';
import LoadMore from '../components/LoadMore';
import ProductDisplayNumber from '../components/ProductDisplayNumber';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import Filter from '../components/Filter';

// React Icons
import { HiOutlineViewGrid } from 'react-icons/hi';
import { TfiViewListAlt } from 'react-icons/tfi';
import { FaFilter } from "react-icons/fa6";
import { FaFilterCircleXmark } from "react-icons/fa6";

const MIN_DISPLAY_LIMIT = 20;

const Products = ({ setUpdateFavorite, productCardDisplay, dispatch, displayLimit, selectedCity, selectedCategory, selectedSubCategory, selectedMinPrice, selectedMaxPrice, showFilter, NUM_PRODUCT_DISPLAY }) => {
  
  // url
  const api = `http://localhost:3000/products?sellerLocation=${selectedCity !== null ? selectedCity : ""}&category=${selectedCategory !== null ? selectedCategory : ""}&type=${selectedSubCategory !== null ? selectedSubCategory : ""}`;

  const { data, error, isLoading } = useFetchGet(api);

  const filteredData = selectedMinPrice && selectedMaxPrice ? data.filter(item => item.price >= selectedMinPrice && item.price <= selectedMaxPrice) : data; 

  const lowestPrice = data.map(num => num.price);
  const minPrice = Math.min(...lowestPrice);

  const highestPrice = data.map(num => num.price);
  const maxPrice = Math.max(...highestPrice); 
 
  return (
    <div className={`products-container transition-all duration-700 ease-in-out relative pb-20 ${showFilter ? "pt-[13rem] md:pt-[12.5rem]" : "pt-20"}`}>
      {error && <Error error={error} />}

      <div>
        <div className={`mt-2 absolute sm:hidden top-[5rem] w-full transition duration-700 ease-in-out ${showFilter ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
          <Filter selectedCity={selectedCity} selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} selectedMinPrice={selectedMinPrice} selectedMaxPrice={selectedMaxPrice} dispatch={dispatch} minPrice={minPrice} maxPrice={maxPrice} />
        </div>
 

     <div className='hidden sm:block'>
       <Filter selectedCity={selectedCity} selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} selectedMinPrice={selectedMinPrice} selectedMaxPrice={selectedMaxPrice} dispatch={dispatch} minPrice={minPrice} maxPrice={maxPrice} showFilter={showFilter} />
       </div>

        <ProductDisplayBar data={filteredData} productCardDisplay={productCardDisplay} showFilter={showFilter} dispatch={dispatch} /> 

        <div className={`products-display-container grid ${productCardDisplay === "grid" ? "grid-cols-5 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-2 sm:grid-cols-1 md:grid-cols-2"} gap-6 mt-3 sm:gap-2 sm:mt-4`}>
          {filteredData.slice(0, displayLimit).map((product) => ( 
            <ProductCard
              product={product}
              key={product.id}
              setUpdateFavorite={setUpdateFavorite}
              featured={false}
              productCardDisplay={productCardDisplay}
            />
          ))}
          {isLoading && <LoadingPlaceholder length={10} />}
        </div>
      </div>

      <ProductDisplayNumber data={filteredData} displayLimit={displayLimit} />

      {filteredData.length > MIN_DISPLAY_LIMIT && (
        <LoadMore dispatch={dispatch} numProductDisplay={NUM_PRODUCT_DISPLAY} />
      )}
    </div>
  );
};

export default Products;

function ProductDisplayBar({ data, productCardDisplay, showFilter, dispatch }) {
  return (
    <div className="flex justify-between items-center mt-5">
      <p className="font-bold text-lg sm:text-sm text-slate-700">
        All products <span>({data.length})</span>
      </p>
      <div className="flex items-center">
      <div className='flex items-center ml-4'>
          <SortBy/>
          <FilterIcon showFilter={showFilter} dispatch={dispatch} />
        </div>
        <HiOutlineViewGrid className={`mr-1 text-2xl cursor-pointer ${productCardDisplay === "grid" && "text-orange-500"}`} onClick={()=>dispatch({type: "grid", payload: "grid"})} />
        <TfiViewListAlt className={`text-xl cursor-pointer ${productCardDisplay === "list" && "text-orange-500"}`} onClick={()=>dispatch({type: "list", payload: "list"})} />
      </div>
    </div>
  );
}

function SortBy() {
  return <div className='flex items-center mr-4 sm:hidden'>
    <p>Sort by: </p> <select className='cursor-pointer border-b-2 border-slate-300 outline-none px-1 w-[8rem]'>
      <option>Latest</option>
      <option>Price</option>
      <option>Distance</option>
    </select>
  </div>
}

function FilterIcon({showFilter, dispatch}) {
  
  return <div onClick={()=>dispatch({type: "showFilter"})} className='flex items-center mr-4 cursor-pointer'>
    <p className='mr-2'>Filter</p> {showFilter ? <FaFilterCircleXmark className='text-xl' /> : <FaFilter className='text-xl' />}
  </div>
}
 