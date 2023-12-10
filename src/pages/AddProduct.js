import { useEffect, useState } from "react";

const AddProduct = () => {
  // Get Data from DB
  const [categories, setCategories] = useState([]);
  const [categoriesTypes, setCategoriesTypes] = useState([]);
  const [discount, setDiscount] = useState(false);
  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [enableDiscount, setEnableDiscount] = useState(true);

  // Displays
  const [displayType, setDisplayType] = useState(false);

  const [getType, setGetType] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => response.json())
      .then((result) => setCategories(result));
  }, []);

  // Functions
  function handleCategory(e) {
    switch (e.target.value) {
      case "Electronics":
        catType("electronics");
        break;
      case "Furniture":
        catType("furnitures");
        break;
      case "Vehicles":
        catType("vehicles");
        break;
      default:
        break;
    }
  }

  // Get products types by category
  function catType(ct) {
    setDisplayType(true);
    setGetType(ct);
    fetch(`http://localhost:3000/${ct}Types`)
      .then((response) => response.json())
      .then((result) => setCategoriesTypes(result));
  }

  function handleDiscountedPrice(e) {
    const percent = e.target.value;
    const discountedPrice = (price / 100) * percent;
    setDiscountedPrice(price - discountedPrice);
  }

  return (
    <div className="py-[8rem] max-w-[50%] mx-auto sm:max-w-[90%] sm:py-[5rem] md:max-w-[70%] md:py-[6rem]">
      <h2 className="bg-blue-50 py-2 text-center shadow-md text-gray-700">
        Publishing a product
      </h2>
      <form>
        <div className="flex justify-between mt-7 text-lg text-gray-700 sm:block sm:mt-4">
          <div
            className={`flex flex-col ${
              displayType ? "w-[49%] sm:w-full" : "w-[100%]"
            }`}
          >
            <label className="pb-2  font-semibold">Category</label>
            <select
              onChange={handleCategory}
              className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300"
            >
              <option>Choose category</option>
              {categories.map((cat) => {
                return (
                  <option value={cat.cat} key={cat.id}>
                    {cat.cat}
                  </option>
                );
              })}
            </select>
          </div>
          {displayType && (
            <div className="flex flex-col w-[49%] sm:w-full sm:mt-3">
              <label className="pb-2  font-semibold">Type</label>
              <select className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300">
                <option>Choose {getType} types</option>
                {categoriesTypes.map((et) => {
                  return (
                    <option value={et.type} key={et.id}>
                      {et.type}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-7 text-lg text-gray-700 sm:block sm:mt-3">
          <div className="flex flex-col w-[49%] sm:w-full">
            <label className="pb-2  font-semibold">Title</label>
            <input
              type="text"
              className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
              placeholder="Enter product's title"
            />
          </div>
          <div className="flex flex-col w-[49%] sm:w-full sm:mt-3">
            <label className="pb-2  font-semibold">Company</label>
            <input
              type="text"
              className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
              placeholder="Enter product's company"
            />
          </div>
        </div>
        {getType === "vehicles" && (
          <div className="flex justify-between mt-7 text-lg text-gray-700 sm:mt-3">
            <div className="flex flex-col w-[49%]">
              <label className="pb-2  font-semibold">Model</label>
              <input
                type="text"
                className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
                placeholder="Enter product's model"
              />
            </div>
            <div className="flex flex-col w-[49%]">
              <label className="pb-2  font-semibold">Color</label>
              <input
                type="text"
                className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
                placeholder="Enter product's color"
              />
            </div>
          </div>
        )}

        <div
          className={`${
            discount && "sm:block md:block"
          } flex justify-between mt-7 text-lg text-gray-700 sm:mt-3`}
        >
          <div
            className={`grid grid-cols-${discount ? "3" : "1"} ${
              discount && "sm:w-full md:w-full"
            } w-[49%]`}
          >
            <div className="flex flex-col">
              <label className="pb-2  font-semibold">Price</label>
              <input
                type="number"
                min={1}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (e.target.value > 0) {
                    setEnableDiscount(false);
                  } else {
                    setEnableDiscount(true);
                  }
                }}
                className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
                placeholder="Price $"
              />
            </div>
            {discount && (
              <>
                <div className="flex flex-col mx-2">
                  <label className="pb-2  font-semibold ">Percentage</label>
                  <input
                    type="number"
                    onChange={handleDiscountedPrice}
                    max={100}
                    min={1}
                    disabled={enableDiscount}
                    className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
                    placeholder="%"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="pb-2  font-semibold">Disc. price</label>
                  <input
                    type="text"
                    className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
                    disabled
                    placeholder={discountedPrice}
                  />
                </div>
              </>
            )}
          </div>
          <div
            className={`flex flex-col w-[49%] ${
              discount && "sm:mt-3 sm:w-full md:w-full"
            }`}
          >
            <label className="pb-2  font-semibold">Discount</label>
            <div className="flex justify-between">
              <input
                type="button"
                value="YES"
                onClick={() => setDiscount((e) => !e)}
                className={`${
                  discount ? "bg-slate-300" : "white"
                } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] mr-1`}
              />
              <input
                type="button"
                value="NO"
                onClick={() => setDiscount((e) => !e)}
                className={`${
                  discount ? "bg-white" : "bg-slate-300"
                } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] ml-1`}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-7 text-lg text-gray-700 sm:block sm:mt-3">
          <div className="flex flex-col w-[49%] sm:w-full">
            <label className="pb-2  font-semibold">Location</label>
            <input
              type="text"
              className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
              placeholder="Enter product's location"
            />
          </div>
          <div className="flex flex-col w-[49%] sm:w-full sm:mt-3">
            <label className="pb-2  font-semibold">Image</label>
            <input
              type="file"
              className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
            />
          </div>
        </div>
        <div className="bg-slate-200 mt-7 py-2 text-center font-bold cursor-pointer hover:bg-slate-300">
          <button>Publish</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
