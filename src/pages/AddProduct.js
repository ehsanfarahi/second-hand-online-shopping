import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AddProduct = () => {
  // Get Data from DB
  const [categories, setCategories] = useState([]);
  const [categoriesTypes, setCategoriesTypes] = useState([]);
  const [chooseCategory, setChooseCategory] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [enableDiscount, setEnableDiscount] = useState(true);
  const [descriptionCount, setDescriptionCount] = useState(0);

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
        setChooseCategory(true);
        break;
      case "Furniture":
        catType("furnitures");
        setChooseCategory(true);
        break;
      case "Vehicles":
        catType("vehicles");
        setChooseCategory(true);
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

  function handleDescription(e) {
    const count = e.target.value;
    setDescriptionCount(count.length);
  }

  return (
    <div className="add-product-container">
      <h2 className="add-product-container--header">
        Publishing a product
      </h2>
      <form>
        <div className="add-product-container--form-control">
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
       
         {chooseCategory && <>
          <FormControlDouble children1="Brand" children2="Ad title" placeholder1="Enter product's brand" placeholder2="Enter product's title" conExtraStyle2="sm:mt-3" />
          <div className="flex justify-between mt-7 text-lg text-gray-700 sm:mt-3">
            <div className="flex flex-col w-[100%]"> 
            <label className="pb-2  font-semibold">Description</label>
            <textarea maxLength={500} onChange={handleDescription} className="resize-none border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2" />
            <div className="text-sm flex justify-between">
              <p>Write a description of the product</p>
            <p><span className={`${descriptionCount >= 450 && "text-red-500"}`}>{descriptionCount}</span> / 500</p>
            </div>
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
            className={`flex justify-between ${
              discount && "sm:w-full md:w-full sm:block"
            } w-[49%]`}
          >
            <div className={`flex flex-col ${discount ? "w-[32%] sm:w-[100%]" : "w-[100%]"}`}>
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
                <div className={`flex flex-col ${discount ? "w-[32%] sm:w-[100%]" : "w-[100%]"} sm:mt-3`}>
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
                <div className={`flex flex-col ${discount ? "w-[32%] sm:w-[100%]" : "w-[100%]"} sm:mt-3`}>
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

        <FormControlDouble children1="Location" children2="Image" type2="file" placeholder1="Enter product's location" conExtraStyle2="sm:mt-3" />

        <div className="publish-btn hover:cursor-not-allowed">
          <button disabled className="hover:cursor-not-allowed">Publish</button>
        </div>
         </>}
        
      </form>
    </div>
  );
};

export default AddProduct;

FormControlSingle.propTypes = {
  conStyle: PropTypes.number,
  }

function FormControlSingle({children, conStyle="flex flex-col w-[49%] sm:w-full", conExtraStyle, labStyle="pb-2  font-semibold", inStyle="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2", type="text", placeholder}) {
  return <div className={`${conStyle} ${conExtraStyle}`}>
  <label className={`${labStyle}`}>{children}</label>
    <input
    type={type}
    className={`${inStyle}`}
    placeholder={placeholder}
  />
</div>
}

function FormControlDouble({children1, conStyle1, conExtraStyle1, labStyle1, inStyle1, type1, placeholder1, children2, conStyle2, conExtraStyle2, labStyle2, inStyle2, type2, placeholder2}) {
  return  <div className="flex justify-between mt-7 text-lg text-gray-700 sm:block sm:mt-3">
  <FormControlSingle conStyle={conStyle1} conExtraStyle={conExtraStyle1} labStyle={labStyle1} inStyle={inStyle1} type={type1} placeholder={placeholder1}>{children1}</FormControlSingle>
  <FormControlSingle conStyle={conStyle2} conExtraStyle={conExtraStyle2} labStyle={labStyle2} inStyle={inStyle2} type={type2} placeholder={placeholder2}>{children2}</FormControlSingle>
</div>
}
