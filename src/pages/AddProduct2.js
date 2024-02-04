import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// React Icons
import { FaUpload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

// data
const fuels = ["Diesel", "Electric", "Hybrid", "LPG", "Petrol"];

const AddProduct = () => {
  // Get Data from DB
  const [categories, setCategories] = useState([]);
  const [categoriesTypes, setCategoriesTypes] = useState([]);
  const [chooseType, setChooseType] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [transmission, setTransmission] = useState(false);
  const [fuel, setFuel] = useState("");
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
        break;
      case "Furniture":
        catType("furnitures");
        break;
      case "Vehicles":
        catType("vehicles");
        break;
        case "Fashion":
          catType("fashion");
          break;
      default:
        break;
    }
  }

  function handleType(e) {
    if(e.target.value) {
      setChooseType(true);
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
              <select onChange={handleType} className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300">
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
       
         {chooseType && <>
          <FormControlDouble children1="Brand" children2="Ad title" placeholder1="Enter product's brand" placeholder2="Enter product's title" conExtraStyle2="sm:mt-3" />
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
          <FormControlDouble children1="Year" children2="KM driven" type1="number" type2="number" placeholder1="Enter vehicle's model" placeholder2="Enter KM driven" conExtraStyle2="sm:mt-3" />
          






          <div
          className={`sm:block md:block flex justify-between mt-7 text-lg text-gray-700 sm:mt-3`}
        >
          <div
            className={`flex flex-col w-[49%] sm:mt-3 sm:w-full md:w-full`}
          >
            <label className="pb-2  font-semibold">Transmission</label>
            <div className="flex justify-between">
              <input
                type="button"
                value="Automatic"
                onClick={() => setTransmission((e) => !e)}
                className={`${
                  transmission ? "bg-slate-300" : "white"
                } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] mr-1`}
              />
              <input
                type="button"
                value="Manual"
                onClick={() => setTransmission((e) => !e)}
                className={`${
                  transmission ? "bg-white" : "bg-slate-300"
                } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] ml-1`}
              />
            </div>
          </div>
          <div
            className={`flex flex-col w-[49%] sm:mt-3 sm:w-full md:w-full`}
          >
            <label className="pb-2  font-semibold">Fuel</label>
            <div className="flex justify-between">
              {fuels.map((f, i) => <FuelButton value={f} key={i} fuel={fuel} setFuel={setFuel} />)}
            </div>
          </div>
        </div>













          
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
                onClick={() => setDiscount((e) => !discount && !e)}
                className={`${
                  discount ? "bg-slate-300" : "white"
                } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] mr-1`}
              />
              <input
                type="button"
                value="NO"
                onClick={() => setDiscount((e) => !discount && !e)}
                className={`${
                  discount ? "bg-white" : "bg-slate-300"
                } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] ml-1`}
              />
            </div>
          </div>
        </div>

        <FormControlDouble children1="Location" children2="Image" type2="file" placeholder1="Enter product's location" conExtraStyle2="sm:mt-3" />

        <UploadImages/>

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

function UploadImages() {
  const [imgSrc1, setImgSrc1] = useState("");
  const [imgSrc2, setImgSrc2] = useState("");
  const [imgSrc3, setImgSrc3] = useState("");
  const [imgSrc4, setImgSrc4] = useState("");
  const [img2, setImg2] = useState(false);
  const [img3, setImg3] = useState(false);
  const [img4, setImg4] = useState(false);
  const [displayImages, setDisplayImages] = useState(false);
 
  
  function handleImage(e, num) {

    const fileInput = e.target;
  
    if(fileInput.files && fileInput.files[0]) {
      
      const reader = new FileReader();

      reader.onload = function(e) {
       if(num === 1) {
        setImgSrc1(e.target.result);
        setImg2(true);
        setDisplayImages(true);
       } else if(num === 2) {
        setImgSrc2(e.target.result)
        setImg2(false);
        setImg3(true);
       } else if(num === 3) {
        setImgSrc3(e.target.result)
        setImg3(false);
        setImg4(true);
       }  else if(num === 4) {
        setImgSrc4(e.target.result)
       }
        
      }
      reader.readAsDataURL(fileInput.files[0])
    }
    console.log(num);
    console.log(e);
  }

  function handleDelete(e, num) {
    e.preventDefault();
    if(num === 1) {
      setImgSrc1("")
    } else if(num === 2) {
      setImgSrc2("")
    } else if(num === 3) {
      setImgSrc3("")
    } else if(num === 4) {
      setImgSrc4("")
    }
  }
  
  return <div className="mt-7 sm:mt-3 flex flex-col">
      <div className="pb-2">
    <label className="font-semibold text-lg">Image</label> <span className="text-gray-500 text-sm pl-3">(Max. 4 images)</span>
    </div>
    <div className="border-2 border-dashed border-gray-300 rounded p-6 flex justify-between items-center">
      <div className="flex flex-col">
     {displayImages ? <div className="flex gap-1">
      {imgSrc1.length > 0 && <div className="flex flex-col items-center"><img src={imgSrc1} width="100" alt="img" /><div className="flex items-center">
      <MdEdit className="text-2xl cursor-pointer mt-2" />
      <MdDeleteForever onClick={(e)=>handleDelete(e, 1)} className="text-2xl cursor-pointer mt-2" />
        </div></div>}
       {imgSrc2.length > 0 &&  <div className="flex flex-col items-center"><img src={imgSrc2} width="100" alt="img" /><MdDeleteForever onClick={(e)=>handleDelete(e, 2)} className="text-2xl cursor-pointer mt-2" /></div>}
       {imgSrc3.length > 0 &&  <div className="flex flex-col items-center"><img src={imgSrc3} width="100" alt="img" /><MdDeleteForever onClick={(e)=>handleDelete(e, 3)} className="text-2xl cursor-pointer mt-2" /></div>}
       {imgSrc4
      .length > 0 &&  <div className="flex flex-col items-center"><img src={imgSrc4} width="100" alt="img" /><MdDeleteForever onClick={(e)=>handleDelete(e, 4)} className="text-2xl cursor-pointer mt-2" /></div>}
      </div> :  <>
      <div className="flex items-center">
      <FaUpload className="text-2xl" />
      <p className="text-xl pl-3">Drag and drop images here or upload</p>
      </div>
      <div>
        <p className="text-gray-500 pt-3 text-sm">Accepted image types: JPEG, JPG, PNG</p>
      </div>
      </>}
      <input onChange={(e)=>handleImage(e, 1)} type="file" id="image1" hidden />
      <input onChange={(e)=>handleImage(e, 2)} type="file" id="image2" hidden />
      <input onChange={(e)=>handleImage(e, 3)} type="file" id="image3" hidden />
      <input onChange={(e)=>handleImage(e, 4)} type="file" id="image4" hidden />
      
    </div>
    <div>
      {img2 ? <label htmlFor="image2" className="border-2 border-slate-700 rounded py-1 px-5 text-xl cursor-pointer hover:bg-slate-700 hover:text-slate-200">Upload 2</label> : img3 ? <label htmlFor="image3" className="border-2 border-slate-700 rounded py-1 px-5 text-xl cursor-pointer hover:bg-slate-700 hover:text-slate-200">Upload 3</label> : img4 ? <label htmlFor="image4" className="border-2 border-slate-700 rounded py-1 px-5 text-xl cursor-pointer hover:bg-slate-700 hover:text-slate-200">Upload 4</label> : <label htmlFor="image1" className="border-2 border-slate-700 rounded py-1 px-5 text-xl cursor-pointer hover:bg-slate-700 hover:text-slate-200">Upload</label>}
    </div>
  </div>
  </div>
}

function FormControlDouble({children1, conStyle1, conExtraStyle1, labStyle1, inStyle1, type1, placeholder1, children2, conStyle2, conExtraStyle2, labStyle2, inStyle2, type2, placeholder2}) {
  return  <div className="flex justify-between mt-7 text-lg text-gray-700 sm:block sm:mt-3">
  <FormControlSingle conStyle={conStyle1} conExtraStyle={conExtraStyle1} labStyle={labStyle1} inStyle={inStyle1} type={type1} placeholder={placeholder1}>{children1}</FormControlSingle>
  <FormControlSingle conStyle={conStyle2} conExtraStyle={conExtraStyle2} labStyle={labStyle2} inStyle={inStyle2} type={type2} placeholder={placeholder2}>{children2}</FormControlSingle>
</div>
}

function FuelButton({value, fuel, setFuel}) {
  
  function handleFuel(e) {
    setFuel(e.target.value);
  }

  return <input
  type="button"
  value={value}
  onClick={handleFuel}
  className={`${
    value === fuel ? "bg-slate-300" : "bg-white"
  } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] ml-1`}
/>
}


