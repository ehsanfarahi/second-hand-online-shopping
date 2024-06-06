import { useState, useEffect } from 'react';

// Import Components
import SearchCombobox from './SearchCombobox';

// Constants
import { germanyCities } from '../constants';

// Custom Hooks
import { useFetchGet } from '../useFetchGet';

// React Icons
import { RiDeleteBin2Line } from 'react-icons/ri';
import { MdClose } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa6';
import { FaChevronLeft } from 'react-icons/fa';
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCheck } from 'react-icons/fa6';

export default function Filter({
  selectedCity,
  selectedCategory,
  selectedSubCategory,
  selectedMinPrice,
  selectedMaxPrice,
  showFilter,
  dispatch,
  minPrice,
  maxPrice,
}) {
  return (
    <>
      <LaptopViewFilter
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        selectedMinPrice={selectedMinPrice}
        selectedMaxPrice={selectedMaxPrice}
        dispatch={dispatch}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <MobileViewFilter
        showFilter={showFilter}
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        selectedMinPrice={selectedMinPrice}
        selectedMaxPrice={selectedMaxPrice}
        dispatch={dispatch}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </>
  );
}

function LaptopViewFilter({
  selectedCity,
  selectedCategory,
  selectedSubCategory,
  dispatch,
  selectedMinPrice,
  selectedMaxPrice,
  minPrice,
  maxPrice,
}) {
  return (
    <div className={`py-2 mb-10 sm:hidden`}>
      <div className="flex justify-between items-center gap-x-10">
        <FormControl
          type="selectCombobox"
          selectedCity={selectedCity}
          dispatch={dispatch}
        >
          Location
        </FormControl>
        <FormControl
          type="select"
          selectedCategory={selectedCategory}
          dispatch={dispatch}
        >
          Category
        </FormControl>
        <FormControl type="range">Distance</FormControl>
        <DoubleRangeFormControl
          selectedMinPrice={selectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          dispatch={dispatch}
          minPrice={minPrice}
          maxPrice={maxPrice}
        >
          Price
        </DoubleRangeFormControl>
      </div>
      <div>
        <Filters
          selectedCity={selectedCity}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          selectedMinPrice={selectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}

function MobileViewFilter({
  showFilter,
  selectedCity,
  selectedCategory,
  selectedSubCategory,
  selectedMinPrice,
  selectedMaxPrice,
  dispatch,
  minPrice,
  maxPrice,
}) {
  const [filterContainer, setFilterContainer] = useState('');
  const [filterSubContainer, setFilterSubContainer] = useState('');

  const api = `http://localhost:3000/categories`;
  const { data } = useFetchGet(api);

  return (
    <div className="z-[60] fixed hidden sm:flex">
      {showFilter && (
        <div
          onClick={() => dispatch({ type: 'showFilter' })}
          className="bg-black fixed opacity-40 top-0 left-0 right-0 bottom-0 cursor-pointer"
        ></div>
      )}
      <div
        className={`fixed transition-all duration-500 ease-in-out top-0 ${
          showFilter ? 'right-0' : 'right-[-100%]'
        } w-full h-full`}
      >
        <div
          className={`bg-white shadow w-[80%] py-2 px-4 absolute top-0 right-0 bottom-0`}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold">Filters</p>
            <MdClose
              onClick={() => dispatch({ type: 'showFilter' })}
              className="cursor-pointer text-2xl"
            />
          </div>
          <div>
            <Filters
              selectedCity={selectedCity}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              selectedMinPrice={selectedMinPrice}
              selectedMaxPrice={selectedMaxPrice}
              dispatch={dispatch}
            />
          </div>
          <div className="mt-6">
            <MobileFilterComponent setFilterContainer={setFilterContainer}>
              Location
            </MobileFilterComponent>
            <MobileFilterComponent setFilterContainer={setFilterContainer}>
              Category
            </MobileFilterComponent>
            <MobileFilterComponent setFilterContainer={setFilterContainer}>
              Distance
            </MobileFilterComponent>
            <MobileFilterComponent setFilterContainer={setFilterContainer}>
              Price
            </MobileFilterComponent>
          </div>
        </div>
      </div>
      <div>
        <MobileFilterComponentLocation
          filterContainer={filterContainer}
          setFilterContainer={setFilterContainer}
          selectedCity={selectedCity}
          dispatch={dispatch}
        />
        <MobileFilterComponentCategory
          data={data}
          filterContainer={filterContainer}
          setFilterContainer={setFilterContainer}
          filterSubContainer={filterSubContainer}
          setFilterSubContainer={setFilterSubContainer}
        />
        <MobileFilterComponentDistance
          filterContainer={filterContainer}
          setFilterContainer={setFilterContainer}
        />
        <MobileFilterComponentPrice
          filterContainer={filterContainer}
          setFilterContainer={setFilterContainer}
          selectedMinPrice={selectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          dispatch={dispatch}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
      <div>
        {data.map((c, i) => (
          <MobileFilterSubCategory
            key={i}
            data={c}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            dispatch={dispatch}
            filterSubContainer={filterSubContainer}
            setFilterSubContainer={setFilterSubContainer}
          />
        ))}
      </div>
    </div>
  );
}

function MobileFilterComponent({ children, setFilterContainer }) {
  return (
    <div
      onClick={() => setFilterContainer(children)}
      className="flex justify-between items-center border-b-2 border-slate-200 cursor-pointer text-slate-900 pb-2 mt-2"
    >
      <p>{children}</p> <FaChevronRight />
    </div>
  );
}

function MobileFilterSubComponent({ children, setFilterSubContainer }) {
  return (
    <div
      onClick={() => setFilterSubContainer(children)}
      className="flex justify-between items-center border-b-2 border-slate-200 cursor-pointer text-slate-900 pb-2 mt-2"
    >
      <p>{children}</p> <FaChevronRight />
    </div>
  );
}

function MobileFilterComponentLocation({
  filterContainer,
  setFilterContainer,
  selectedCity,
  dispatch,
}) {
  const [city, setCity] = useState('');
  const [displayCities, setDisplayCities] = useState(false);

  const filteredCities =
    city === ''
      ? germanyCities
      : germanyCities.filter((cities) => {
          return cities.toLowerCase().includes(city.toLowerCase());
        });

  return (
    <div
      className={`fixed w-[80%] bg-white transition-all duration-500 ease-in-out py-2 px-4 top-0 ${
        filterContainer === 'Location' ? 'right-0' : 'right-[-100%]'
      } h-full w-full`}
    >
      <div className="border-b-2 border-slate-200 pb-10">
        <FaChevronLeft
          onClick={() => {
            setFilterContainer('');
            setDisplayCities(false);
          }}
          className="absolute top-[.9rem] cursor-pointer"
        />
        <p className="absolute left-[50%] translate-x-[-50%] font-semibold text-lg">
          {filterContainer}
        </p>
      </div>
      <div className="h-full">
        <div onClick={() => setDisplayCities(true)}>
          <input
            value={selectedCity ? selectedCity : city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="border-2 border-gray-300
         rounded mt-8 h-[2.5rem] w-full text-slate-700 px-2 text-lg outline-none"
            placeholder={selectedCity ? selectedCity : 'All cities'}
          />
        </div>
        {displayCities && (
          <div
            className="border-2 border-gray-300
         rounded mt-1 max-h-[80%] overflow-y-scroll px-2 py-1 text-lg text-slate-700"
          >
            {filteredCities.map((city, index) => (
              <div
                className={`flex items-center ${
                  selectedCity === city && 'bg-gray-200 rounded px-1'
                }`}
                key={city}
              >
                {selectedCity === city ? (
                  <FaCheck className="mr-2" />
                ) : (
                  <FaCheck className="text-white mr-3" />
                )}{' '}
                <p
                  key={index}
                  onClick={() => {
                    dispatch({ type: 'selectedCity', payload: city });
                    setDisplayCities(false);
                  }}
                >
                  {city}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MobileFilterComponentCategory({
  data,
  filterContainer,
  setFilterContainer,
  filterSubContainer,
  setFilterSubContainer,
}) {
  return (
    <div
      className={`fixed w-[80%] bg-white transition-all duration-500 ease-in-out py-2 px-4 top-0 ${
        filterContainer === 'Category' ? 'right-0' : 'right-[-100%]'
      } h-full w-full`}
    >
      <div className="border-b-2 border-slate-200 pb-10">
        <FaChevronLeft
          onClick={() => setFilterContainer('')}
          className="absolute top-[.9rem] cursor-pointer"
        />
        <p className="absolute left-[50%] translate-x-[-50%] font-semibold text-lg">
          {filterContainer}
        </p>
      </div>
      <div className="mt-6">
        {data.map((cat, index) => (
          <MobileFilterSubComponent
            key={index}
            setFilterSubContainer={setFilterSubContainer}
          >
            {cat.cat}
          </MobileFilterSubComponent>
        ))}
      </div>
    </div>
  );
}

function MobileFilterSubCategory({
  data,
  selectedCategory,
  selectedSubCategory,
  filterSubContainer,
  setFilterSubContainer,
  dispatch,
}) {
  return (
    <div
      className={`fixed w-[80%] bg-white transition-all duration-500 ease-in-out py-2 px-4 top-0 ${
        filterSubContainer === data.cat ? 'right-0' : 'right-[-100%]'
      } h-full w-full`}
    >
      <div className="border-b-2 border-slate-200 pb-10">
        <FaChevronLeft
          onClick={() => setFilterSubContainer('')}
          className="absolute top-[.9rem] cursor-pointer"
        />
        <p className="absolute left-[50%] translate-x-[-50%] font-semibold text-lg">
          {filterSubContainer}
        </p>
      </div>
      <div className="mt-6">
        <div>
          <p
            onClick={() =>
              dispatch({ type: 'selectedCategory', payload: data.cat })
            }
            className="bg-gray-200 cursor-pointer rounded flex items-center w-fit py-1 px-2"
          >
            <span>
              {selectedCategory === data.cat && <FaCheck className="mr-2" />}
            </span>
            All {filterSubContainer}
          </p>
        </div>
        <div className="mt-6 flex items-center flex-wrap whitespace-nowrap gap-2">
          {data.types?.map((t, i) => (
            <p
              key={i}
              onClick={() =>
                dispatch({ type: 'selectedSubCategory', payload: t })
              }
              className="bg-gray-200 rounded w-fit flex items-center cursor-pointer py-1 px-2"
            >
              <span>
                {selectedSubCategory === t && <FaCheck className="mr-2" />}
              </span>
              {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileFilterComponentDistance({
  filterContainer,
  setFilterContainer,
}) {
  return (
    <div
      className={`fixed w-[80%] bg-white transition-all duration-500 ease-in-out py-2 px-4 top-0 ${
        filterContainer === 'Distance' ? 'right-0' : 'right-[-100%]'
      } h-full w-full`}
    >
      <div className="border-b-2 border-slate-200 pb-10">
        <FaChevronLeft
          onClick={() => setFilterContainer('')}
          className="absolute top-[.9rem] cursor-pointer"
        />
        <p className="absolute left-[50%] translate-x-[-50%] font-semibold text-lg">
          {filterContainer}
        </p>
      </div>
      <p>Distance</p>
    </div>
  );
}

function MobileFilterComponentPrice({
  filterContainer,
  setFilterContainer,
  selectedMinPrice,
  selectedMaxPrice,
  dispatch,
  minPrice,
  maxPrice,
}) {
  return (
    <div
      className={`fixed w-[80%] bg-white transition-all duration-500 ease-in-out py-2 px-4 top-0 ${
        filterContainer === 'Price' ? 'right-0' : 'right-[-100%]'
      } h-full w-full`}
    >
      <div className="border-b-2 border-slate-200 pb-10">
        <FaChevronLeft
          onClick={() => setFilterContainer('')}
          className="absolute top-[.9rem] cursor-pointer"
        />
        <p className="absolute left-[50%] translate-x-[-50%] font-semibold text-lg">
          {filterContainer}
        </p>
      </div>
      <div className="mt-8">
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 0, price2: 100 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            0 - 100
          </span>
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 100, price2: 200 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            100 - 200
          </span>
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 200, price2: 300 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            200 - 300
          </span>
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 300, price2: 400 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            300 - 400
          </span>
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 400, price2: 500 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            400 - 500
          </span>
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 500, price2: 700 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            500 - 700
          </span>
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 700, price2: 1000 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            700 - 1000
          </span>
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 700, price2: 1000 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            1000 - 2000
          </span>
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 700, price2: 1000 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            2000 - 5000
          </span>
          <span
            onClick={() =>
              dispatch({
                type: 'selectedPrice',
                payload: { price1: 700, price2: 1000 },
              })
            }
            className="bg-gray-200 cursor-pointer whitespace-nowrap text-slate-700 rounded py-1 px-2"
          >
            5000 - 10000
          </span>
        </div>
        <div>
          <div className="flex items-center">
            <div className="border-2 border-gray-200 rounded px-1 w-full">
              <p className="text-slate-600">min</p>
              <input
                type="text"
                className="w-full outline-none"
                placeholder="$"
                value={selectedMinPrice}
                onChange={(e) =>
                  dispatch({
                    type: 'selectedMinPrice',
                    payload: e.target.value,
                  })
                }
              />
            </div>{' '}
            <span className="px-4 text-3xl">-</span>{' '}
            <div className="border-2 border-gray-200 rounded px-1 w-full">
              <p className="text-slate-600">max</p>
              <input
                type="text"
                className="w-full outline-none"
                placeholder="$"
                value={selectedMaxPrice}
                onChange={(e) =>
                  dispatch({
                    type: 'selectedMaxPrice',
                    payload: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <DoubleRangeFormControl
              selectedMinPrice={selectedMinPrice}
              selectedMaxPrice={selectedMaxPrice}
              dispatch={dispatch}
              minPrice={minPrice}
              maxPrice={maxPrice}
            >
              Price
            </DoubleRangeFormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormControl({ children, type, selectedCity, dispatch }) {
  return (
    <div className="flex flex-col w-full">
      <label className="font-bold mb-1 text-slate-600">{children}</label>

      {type === 'selectCombobox' && (
        <SearchCombobox selectedCity={selectedCity} dispatch={dispatch} />
      )}
      {type === 'select' && (
        <select
          onChange={(e) =>
            dispatch({ type: 'selectedCategory', payload: e.target.value })
          }
          className="border-2 py-1 border-gray-300 rounded h-[2.5rem] outline-blue-200"
        >
          <option value="">All categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Vehicles">Vehicles</option>
        </select>
      )}
      {(type === 'range' || type === 'text' || type === 'number') && (
        <div className="flex flex-col leading-3 h-[2.5rem]">
          <input
            type={type}
            className="border-2 p-1 border-gray-300 rounded outline-blue-200 w-full"
          />
          <p>15 km</p>
        </div>
      )}
    </div>
  );
}

const DoubleRangeFormControl = ({
  children,
  selectedMinPrice,
  selectedMaxPrice,
  dispatch,
  minPrice,
  maxPrice,
}) => {
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), selectedMaxPrice - 5);
    dispatch({ type: 'selectedMinPrice', payload: value });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), selectedMinPrice + 5);
    dispatch({ type: 'selectedMaxPrice', payload: value });
  };

  useEffect(() => {
    const percent1 = (selectedMinPrice / 100) * 100;
    const percent2 = (selectedMaxPrice / 100) * 100;
    document.querySelector(
      '.slider-track'
    ).style.background = `linear-gradient(to right, #ddd ${percent1}%, #007bff ${percent1}%, #007bff ${percent2}%, #ddd ${percent2}%)`;
  }, [selectedMinPrice, selectedMaxPrice]);

  return (
    <div className="flex flex-col w-full sm:mt-6">
      <label className="font-bold mb-1 text-slate-600 sm:hidden">
        {children}
      </label>
      <div className="range-container flex flex-col gap-y-8 h-[2.5rem] mt-[-10px]">
        <div className="">
          <input
            type="range"
            className="range-input sm:range-input-sm"
            min={minPrice}
            max={maxPrice}
            value={selectedMinPrice}
            onChange={handleMinChange}
          />
          <input
            type="range"
            className="range-input"
            min={minPrice}
            max={maxPrice}
            value={selectedMaxPrice}
            onChange={handleMaxChange}
          />
          <div className="slider-track"></div>
        </div>
        <p className="sm:hidden">
          $ {selectedMinPrice} - $ {selectedMaxPrice}
        </p>
      </div>
    </div>
  );
};

function Filters({
  selectedCity,
  selectedCategory,
  selectedSubCategory,
  selectedMinPrice,
  selectedMaxPrice,
  clearAll,
  dispatch,
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-y-2 items-center gap-x-2">
      {selectedCity && (
        <FilterItem deleteType="deleteSelectedCity" dispatch={dispatch}>
          {selectedCity}
        </FilterItem>
      )}
      {selectedCategory && (
        <FilterItem deleteType="deleteSelectedCategory" dispatch={dispatch}>
          {selectedCategory}
        </FilterItem>
      )}

      {selectedMinPrice && selectedMaxPrice && (
        <FilterItem deleteType="deleteSelectedPrice" dispatch={dispatch}>
          {selectedMinPrice} - {selectedMaxPrice}
        </FilterItem>
      )}

      {selectedSubCategory && (
        <FilterItem deleteType="deleteSelectedSubCategory" dispatch={dispatch}>
          {selectedSubCategory}
        </FilterItem>
      )}

      {((selectedCity && selectedCategory) ||
        (selectedCity && selectedSubCategory) ||
        (selectedCategory && selectedSubCategory)) && (
        <FilterItem deleteType="clearAllFilters" dispatch={dispatch}>
          Clear all
        </FilterItem>
      )}
    </div>
  );
}

function FilterItem({ children, dispatch, deleteType }) {
  return (
    <div className="flex items-center bg-gray-200 w-fit px-2 py-1 rounded">
      <span className="pr-2">{children}</span>{' '}
      <RiDeleteBin2Line
        className="cursor-pointer"
        onClick={() => dispatch({ type: deleteType })}
      />
    </div>
  );
}
