import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// React Icons
import { FaUpload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [enableDiscount, setEnableDiscount] = useState(true);
  const [descriptionCount, setDescriptionCount] = useState(0);

  // Form Data
  const [category, setCatecategory] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");  
  const [discountPercentage, setDiscountPercentage] = useState(""); 
  

  const [sellerInfo, setSellerInfo] = useState({
    sellerFullName: "",
    sellerPhoneNumber: "",
    sellerLocation: "",
  })

  const {sellerFullName, sellerPhoneNumber, sellerLocation} = sellerInfo;

  // Displays
  const [displayType, setDisplayType] = useState(false);
  const [getType, setGetType] = useState("");
  const [addProductMessage, setAddProductMessage] = useState(false);

  // function getCurrentDate() {
  //   const date = new Date();

  //   const yyyy = date.getFullYear();
  //   const mm = date.getMonth() + 1;
  //   const dd = date.getDate();

  //   return `${mm}/${dd}/${yyyy}`;
  // }

  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => response.json())
      .then((result) => setCategories(result));
  }, []);

  // Functions
  function handleCategory(e) {
    setCatecategory(e.target.value);
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
        case "Accommodation":
          catType("accommodation");
          break;
          case "Kids":
            catType("kids");
            break;
            case "Pets":
              catType("pets");
              break;
              case "Services":
                catType("services");
                break;
                case "Other":
                  catType("other");
                  break;
      default:
        break;
    }
  }

  function handleType(e) {
    setType(e.target.value);
    if (e.target.value) {
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

  function handlePrice(e) {
    const inputValue = e.target.value;
      setPrice(inputValue.startsWith(0) ? "" : inputValue);
      if (inputValue > 0) {
        setEnableDiscount(false);
       if(discountPercentage > 0) {
        const discountedPrice = (inputValue / 100) * discountPercentage;
        setDiscountedPrice((inputValue - discountedPrice).toFixed(2));
       }
      } else {
        setEnableDiscount(true);
        setDiscountPercentage(""); 
        setDiscountedPrice(0); 
      }
  }  

  function handleDiscountedPrice(e) {
    const percent = e.target.value;
    

    if (percent === '' || parseInt(percent, 10) <= 100) {
      setDiscountPercentage(percent.startsWith(0) ? "" : percent);
      const discountedPrice = (price / 100) * percent;
      setDiscountedPrice((price - discountedPrice).toFixed(2));
    }  
  }
 
  function handleDescription(e) {
    const count = e.target.value;
    setDescriptionCount(count.length);
    setDescription(e.target.value);
  }

  function generateUniqueId() {
    const randomId = Math.floor(Math.random() * 9000000000000);
    return randomId;
  }

  async function handlePublish(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/products`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: generateUniqueId,
        category,
        type,
        title,
        brand,
        description,
        price,
        discount,
        discountPercentage,
        image: "pictures/car1.jpg",
        date: getCurrentDateTime(), 
        sellerFullName,
        sellerPhoneNumber,
        sellerLocation,
        sellerId: JSON.parse(localStorage.getItem("24UserLoginData")) || JSON.parse(sessionStorage.getItem("24UserLoginData")),
        featured: false, 
      }),
    });

    const data = response.json();
    if (data) {
      setAddProductMessage(true);
    }
  }

  function handlePublishAnotherAd() {
    setAddProductMessage(false);
    setTitle("");
    setBrand("");
    setDescription("");
    setPrice(0);
    setDiscountPercentage(0);
    setDiscount(false);
    setDisplayType(false);
    setChooseType(false);
  }

  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, `0`);
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }


  return (
    <div className="add-product-container">
      <h2 className="add-product-container--header">Publishing an ad</h2>
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
              <select
                onChange={handleType}
                className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300"
              >
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

        {chooseType && (
          <>
            <FormControlDouble
              children1="Ad title"
              children2="Brand (Optional)"
              placeholder1="Enter product's title"
              placeholder2="Enter product's brand"
              conExtraStyle2="sm:mt-3"
              onChange1={(e) => setTitle(e.target.value)}
              onChange2={(e) => setBrand(e.target.value)}
              value1={title}
              value2={brand}
            />
            {getType === "vehicles" && (
              <>
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

                <FormControlDouble
                  children1="Year"
                  children2="KM driven"
                  type1="number"
                  type2="number"
                  placeholder1="Enter vehicle's model"
                  placeholder2="Enter KM driven"
                  conExtraStyle2="sm:mt-3"
                />

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
                      {fuels.map((f, i) => (
                        <FuelButton
                          value={f}
                          key={i}
                          fuel={fuel}
                          setFuel={setFuel}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between mt-7 text-lg text-gray-700 sm:mt-3">
              <div className="flex flex-col w-[100%]">
                <label className="pb-2  font-semibold">Description</label>
                <textarea
                  value={description}
                  maxLength={500}
                  onChange={handleDescription}
                  className="resize-none h-40 border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
                />
                <div className="text-sm flex justify-between">
                  <p>Write a description of the product</p>
                  <p>
                    <span
                      className={`${descriptionCount >= 450 && "text-red-500"}`}
                    >
                      {descriptionCount}
                    </span>{" "}
                    / 500
                  </p>
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
                <div
                  className={`flex flex-col ${
                    discount ? "w-[32%] sm:w-[100%]" : "w-[100%]"
                  }`}
                >
                  <label className="pb-2  font-semibold">Price $</label>
                  <input
                    type="number"
                    min={1}
                    value={price} 
                    onChange={handlePrice} 
                    className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
                    placeholder="0"
                  />
                </div>
                {discount && (
                  <>
                    <div
                      className={`flex flex-col ${
                        discount ? "w-[32%] sm:w-[100%]" : "w-[100%]"
                      } sm:mt-3`}
                    >
                      <label className="pb-2  font-semibold ">Percentage</label>
                      <input
                        type="number"
                        value={discountPercentage}
                        onChange={handleDiscountedPrice}
                        max={100} 
                        min={1}
                        disabled={enableDiscount}
                        className="border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2"
                        placeholder="%"
                      />
                    </div>
                    <div
                      className={`flex flex-col ${
                        discount ? "w-[32%] sm:w-[100%]" : "w-[100%]"
                      } sm:mt-3`}
                    >
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
                    onClick={() => setDiscount(true)}
                    className={`${
                      discount ? "bg-slate-300" : "white"
                    } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] mr-1`}
                  />
                  <input
                    type="button"
                    value="NO"
                    onClick={() => setDiscount(false)}
                    className={`${
                      discount ? "bg-white" : "bg-slate-300"
                    } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] ml-1`}
                  />
                </div>
              </div>
            </div>

            <UploadImages />

            <SellerDataReview
              setSellerFullName={setSellerInfo}
              setSellerPhoneNumber={setSellerInfo}
              setSellerLocation={setSellerInfo}
              sellerPhoneNumber={sellerPhoneNumber}
              sellerFullName={sellerFullName}
              sellerLocation={sellerLocation}
            />

            <div className="publish-btn hover:cursor-not-allowed">
              <button
                onClick={handlePublish}
                className="hover:cursor-not-allowed"
              >
                Publish
              </button>
            </div>
          </>
        )}
      </form>
      {addProductMessage && (
        <AddProductMessage handlePublishAnotherAd={handlePublishAnotherAd} />
      )}
    </div>
  );
};

export default AddProduct;

function AddProductMessage({ handlePublishAnotherAd }) {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-100 fixed top-[10rem] left-[50%] translate-x-[-50%] text-slate-700 rounded p-6">
      <p className="flex items-center text-green-600 text-xl">
        <span className="mr-2">
          <FaCheck />
        </span>{" "}
        Ad published successfully!
      </p>
      <div className="flex justify-between pt-8 text-white">
        <button
          onClick={() => navigate("/products")}
          className="rounded font-semibold bg-slate-700 px-2 py-1 cursor-pointer mr-2 hover:bg-slate-800"
        >
          Go to ads
        </button>
        <button
          onClick={handlePublishAnotherAd}
          className="rounded font-semibold bg-slate-700 px-2 py-1 cursor-pointer hover:bg-slate-800"
        >
          Publish another ad
        </button>
      </div>
    </div>
  );
}

FormControlSingle.propTypes = {
  conStyle: PropTypes.number,
};

function FormControlSingle({
  children,
  conStyle = "flex flex-col w-[49%] sm:w-full",
  conExtraStyle,
  labStyle = "pb-2  font-semibold",
  inStyle = "border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-blue-300 pl-2",
  type = "text",
  placeholder,
  onChange,
  value,
}) {
  return (
    <div className={`${conStyle} ${conExtraStyle}`}>
      <label className={`${labStyle}`}>{children}</label>
      <input
        onChange={onChange}
        type={type}
        className={`${inStyle}`}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

function UploadImages() {
  const [imgSrc1, setImgSrc1] = useState("");
  const [imgSrc2, setImgSrc2] = useState("");
  const [imgSrc3, setImgSrc3] = useState("");
  const [imgSrc4, setImgSrc4] = useState("");
  const [img1, setImg1] = useState(true);
  const [img2, setImg2] = useState(false);
  const [img3, setImg3] = useState(false);
  const [img4, setImg4] = useState(false);
  const [displayImages, setDisplayImages] = useState(false);

  function handleImage(e, num) {
    const fileInput = e.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (num === 1) {
          setImgSrc1(e.target.result);
          if (img1 && !img2) setImg2(true);
          setDisplayImages(true);
        } else if (num === 2) {
          setImgSrc2(e.target.result);
          setImg2(false);
          if (img1 && !img3) setImg3(true);
        } else if (num === 3) {
          setImgSrc3(e.target.result);
          setImg3(false);
          if (img1 && !img4) setImg4(true);
        } else if (num === 4) {
          setImgSrc4(e.target.result);
          setImg4(false);
          setImg1(false);
        }
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
    console.log(num);
    console.log(e);
  }

  function handleDelete(e, num) {
    e.preventDefault();
    if (num === 1) {
      setImgSrc1("");
      setImg1(true);
    } else if (num === 2) {
      setImgSrc2("");
      setImg2(true);
    } else if (num === 3) {
      setImgSrc3("");
      setImg3(true);
    } else if (num === 4) {
      setImgSrc4("");
      setImg4(true);
    }
  }

  return (
    <div className="mt-7 sm:mt-3 flex flex-col">
      <div className="pb-2">
        <label className="font-semibold text-lg">Image</label>{" "}
        <span className="text-gray-500 text-sm pl-3">(Max. 4 images)</span>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded p-6 flex justify-between items-center">
        <div className="flex flex-col">
          {displayImages ? (
            <div className="flex gap-1">
              {imgSrc1.length > 0 && (
                <div className="flex flex-col items-center">
                  <img src={imgSrc1} width="100" alt="img" />
                  <div className="flex items-center">
                    <MdEdit className="text-2xl cursor-pointer mt-2" />
                    <MdDeleteForever
                      onClick={(e) => handleDelete(e, 1)}
                      className="text-2xl cursor-pointer mt-2"
                    />
                  </div>
                </div>
              )}
              {imgSrc2.length > 0 && (
                <div className="flex flex-col items-center">
                  <img src={imgSrc2} width="100" alt="img" />
                  <div className="flex items-center">
                    <MdEdit className="text-2xl cursor-pointer mt-2" />
                    <MdDeleteForever
                      onClick={(e) => handleDelete(e, 2)}
                      className="text-2xl cursor-pointer mt-2"
                    />
                  </div>
                </div>
              )}
              {imgSrc3.length > 0 && (
                <div className="flex flex-col items-center">
                  <img src={imgSrc3} width="100" alt="img" />
                  <div className="flex items-center">
                    <MdEdit className="text-2xl cursor-pointer mt-2" />
                    <MdDeleteForever
                      onClick={(e) => handleDelete(e, 3)}
                      className="text-2xl cursor-pointer mt-2"
                    />
                  </div>
                </div>
              )}
              {imgSrc4.length > 0 && (
                <div className="flex flex-col items-center">
                  <img src={imgSrc4} width="100" alt="img" />
                  <div className="flex items-center">
                    <MdEdit className="text-2xl cursor-pointer mt-2" />
                    <MdDeleteForever
                      onClick={(e) => handleDelete(e, 4)}
                      className="text-2xl cursor-pointer mt-2"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <FaUpload className="text-2xl" />
                <p className="text-xl pl-3">
                  Drag and drop images here or upload
                </p>
              </div>
              <div>
                <p className="text-gray-500 pt-3 text-sm">
                  Accepted image types: JPEG, JPG, PNG
                </p>
              </div>
            </>
          )}
          <input
            onChange={(e) => handleImage(e, 1)}
            type="file"
            id="image1"
            hidden
          />
          <input
            onChange={(e) => handleImage(e, 2)}
            type="file"
            id="image2"
            hidden
          />
          <input
            onChange={(e) => handleImage(e, 3)}
            type="file"
            id="image3"
            hidden
          />
          <input
            onChange={(e) => handleImage(e, 4)}
            type="file"
            id="image4"
            hidden
          />
        </div>
        <div>
          {img2 && !img3 && !img4 ? (
            <label htmlFor="image2">Upload 2</label>
          ) : img3 && !img2 && !img4 ? (
            <label htmlFor="image3">Upload 3</label>
          ) : img4 && !img2 && !img3 ? (
            <label htmlFor="image4">Upload 4</label>
          ) : (
            img1 &&
            !img2 &&
            !img3 &&
            !img4 && <label htmlFor="image1">Upload</label>
          )}
        </div>
      </div>
    </div>
  );
}

function FormControlDouble({
  children1,
  conStyle1,
  conExtraStyle1,
  labStyle1,
  inStyle1,
  type1,
  placeholder1,
  children2,
  conStyle2,
  conExtraStyle2,
  labStyle2,
  inStyle2,
  type2,
  placeholder2,
  onChange1,
  onChange2,
  value1,
  value2,
}) {
  return (
    <div className="flex justify-between mt-7 text-lg text-gray-700 sm:block sm:mt-3">
      <FormControlSingle
        conStyle={conStyle1}
        conExtraStyle={conExtraStyle1}
        labStyle={labStyle1}
        inStyle={inStyle1}
        type={type1}
        placeholder={placeholder1}
        onChange={onChange1}
        value={value1}
      >
        {children1}
      </FormControlSingle>
      <FormControlSingle
        conStyle={conStyle2}
        conExtraStyle={conExtraStyle2}
        labStyle={labStyle2}
        inStyle={inStyle2}
        type={type2}
        placeholder={placeholder2}
        onChange={onChange2}
        value={value2}
      >
        {children2}
      </FormControlSingle>
    </div>
  );
}

function FuelButton({ value, fuel, setFuel }) {
  function handleFuel(e) {
    setFuel(e.target.value);
  }

  return (
    <input
      type="button"
      value={value}
      onClick={handleFuel}
      className={`${
        value === fuel ? "bg-slate-300" : "bg-white"
      } border-2 rounded py-2 cursor-pointer focus:outline-none focus:border-slate-400 pl-2 w-[50%] ml-1`}
    />
  );
}

function SellerDataReview({
  setSellerFullName,
  setSellerPhoneNumber,
  setSellerLocation,
  sellerFullName,
  sellerPhoneNumber,
  sellerLocation,
}) {
  const getUserId = localStorage.getItem("24UserLoginData") || sessionStorage.getItem("24UserLoginData");

  const [sellerData, setSellerData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/userSignup/${JSON.parse(getUserId)}`)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setSellerData(result);
          setSellerFullName(prevState => ({...prevState, sellerFullName: `${result.firstName} ${result.lastName}`}));
          setSellerPhoneNumber(prevState => ({...prevState, sellerPhoneNumber: result.phoneNumber}));
          setSellerLocation(prevState => ({...prevState, sellerLocation: `${result.zone}, ${result.postalCode} ${result.city}`}));
        }
      });
  }, [getUserId, setSellerFullName, setSellerLocation, setSellerPhoneNumber]);

  return (
    <div className="mt-10 border-2 rounded p-6 text-slate-700 sm:mt-6">
      <h3 className="font-semibold text-xl">Review your details</h3>
      <div className="flex justify-between items-center md:flex-col sm:flex-col">
        <SellerData data={sellerData} />
        <DetailConfirmation
          data={sellerFullName}
          onChange={setSellerFullName}
          sellerData="sellerFullName"
        >
          Confirm your full name
        </DetailConfirmation>
        <DetailConfirmation
          type="number"
          data={sellerPhoneNumber}
          onChange={setSellerPhoneNumber}
          sellerData="sellerPhoneNumber"
        >
          Confirm your phone number
        </DetailConfirmation>
        <DetailConfirmation
          data={sellerLocation} 
          onChange={setSellerLocation} 
          sellerData="sellerLocation" 
        >
          Confirm your location
        </DetailConfirmation>  
      </div>
      <small>
        This data will be posted with your ad only, the actual data will not be
        updated. To update your actual data{" "}
        <Link to="/my-account" className="text-blue-400 underline">
          click here
        </Link>
        .
      </small>
    </div>
  );
}

function SellerData({ data }) {
  return (
    <div className="mt-4  flex items-center">
      <div className="mr-4 bg-orange-400 rounded-full w-[4rem] h-[4rem]">  
        <p className="text-4xl flex h-full justify-center items-center">
          <span>{data?.firstName?.slice(0, 1)}</span>
          <span>{data?.lastName?.slice(0, 1)}</span>
        </p>
      </div>
    </div>
  );
}

function DetailConfirmation({ children, type = "text", data, onChange, sellerData }) {
  return (
    <div className="my-6 md:w-full sm:w-full sm:my-3">
      <p className="text-lg mb-2">{children}</p>
      <input
        value={data}
        onChange={(e) => onChange(prevState => ({...prevState, [sellerData]: e.target.value}))}
        className="border-2 rounded outline-none p-2 text-xl md:w-full sm:w-full"
        type={type} 
      />
    </div>
  );
}
