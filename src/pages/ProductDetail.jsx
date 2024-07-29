import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// Getting random data from the server
import _ from "lodash";

// React Icons
import {
  FaRegHeart,
  FaHeart,
  GrShareOption,
  IoCloseSharp,
  FcTwoSmartphones,
  FaShare,
  GrFormNext,
  GrFormPrevious,
  RxCross2,
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
  FaViber,
  LuEye,
  TbHeartMinus,
  TbHeartPlus,
  FaHeartCircleMinus,
  FaHeartCirclePlus,
  SlLocationPin,
  HiOutlineSave,
  TbLink,
  TfiMoreAlt,
} from '../reactIcons';

// Sharing item on social media API
import {
  FacebookMessengerShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from 'react-share';

//Sharing item on social media icons
import {
  FacebookMessengerIcon,
  XIcon,
  ViberIcon,
  WhatsappIcon,
} from 'react-share';

// Components
import Spinner from '../components/Spinner';
import GoBack from '../components/GoBack';
import RecommendedAds from '../components/RecommendedAds';
import Map from '../components/Map';

// Pages
import Chat from './Chat';

// Getting the page current location
const urlSocialMediaPlatforms = window.location.href;

const ProductDetail = ({ updateFavorite, setUpdateFavorite }) => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatBox, setChatBox] = useState(false);
  const [displayShareSocial, setDisplayShareSocial] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [bottomAdDisplay, setBottomAdDisplay] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setProduct(result);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <div className="product-detail">
        <GoBack />
        <div className="flex sm:flex-col justify-between">
          <DetailLeftSide />
          <DetailRightSide
            product={product}
            setChatBox={setChatBox}
            urlSocialMediaPlatforms={urlSocialMediaPlatforms}
            setDisplayShareSocial={setDisplayShareSocial}
            favorite={favorite}
            setFavorite={setFavorite}
            setBottomAdDisplay={setBottomAdDisplay}
          />
        </div>
        <div className="mb-14">
          <p className="mt-6 mb-1 font-bold text-lg text-slate-700 sm:text-2xl">
            Description
          </p>
          <p className="text-slate-700 sm:text-lg">
            This is the description of the product being displayed here. This is
            the description of the product being displayed here. This is the
            description of the product being displayed here. This is the
            description of the product being displayed here.
          </p>
        </div>
        <SimilarAds product={product} />
        <RecommendedAds />
      </div>
      {displayShareSocial && (
        <ShareItemOnSocialMediaPlatforms
          setDisplayShareSocial={setDisplayShareSocial}
        />
      )}
      <Chat chatBox={chatBox} setChatBox={setChatBox} />
      {loading && <Spinner />}
      <BottomAddToFavorite
        product={product}
        favorite={favorite}
        setFavorite={setFavorite}
        updateFavorite={updateFavorite}
        setUpdateFavorite={setUpdateFavorite}
        bottomAdDisplay={bottomAdDisplay}
        setBottomAdDisplay={setBottomAdDisplay}
      />
    </>
  );
};

export default ProductDetail;

function BottomAddToFavorite({
  product,
  favorite,
  updateFavorite,
  setFavorite,
  setUpdateFavorite,
  bottomAdDisplay,
  setBottomAdDisplay,
}) {
  const getFavId = localStorage.getItem('fav24')?.split(',');

  function handleAddToFavorite() {
    const getFavId = localStorage.getItem('fav24');
    const favId = [getFavId];
    if (!getFavId.includes(product.id)) {
      localStorage.setItem('fav24', [...favId, product.id]);
    }

    setUpdateFavorite(
      localStorage.getItem('fav24')?.split(',').slice(1).length
    );

    setFavorite(false);
  }

  function handleRemoveFromFavorite() {
    const getFavId = localStorage.getItem('fav24');
    const uniqueId = getFavId.split(',').filter((fId) => fId !== product.id);
    localStorage.setItem('fav24', [uniqueId]);

    setUpdateFavorite(
      localStorage.getItem('fav24')?.split(',').slice(1).length
    );

    setFavorite(true);
  }
  return (
    <div className="bottomAddToFav-container">
      <div
        className={`${
          bottomAdDisplay ? 'flex' : 'hidden'
        } justify-between items-center py-3 px-8`}
      >
        <div className="flex items-center">
          <div>
            <img
              className="bottomAddToFav-img"
              src="../pictures/car1.jpg"
              alt="product"
            />
          </div>
          <div className="pl-4">
            <p className="font-semibold text-xl">{product.company}</p>
            <p>{product.model}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="pr-6 text-2xl">
            $
            {product.discount
              ? product.price -
                (product.discountPercentage / 100) * product.price
              : Number(product.price)?.toFixed(2)}
          </p>
          {!favorite && getFavId?.includes(product.id) ? (
            <button
              onClick={handleRemoveFromFavorite}
              className="bottomAddToFav-btn"
            >
              Remove from favorite ({updateFavorite})
            </button>
          ) : (
            <button
              onClick={handleAddToFavorite}
              className="bottomAddToFav-btn"
            >
              Add to favorite ({updateFavorite || 0})
            </button>
          )}
        </div>
      </div>
      <div
        className={`border-2 w-fit border-slate-700 cursor-pointer rounded-[50%] p-1 absolute left-[50%] translate-x-[-50%] ${
          bottomAdDisplay ? 'top-[1.2rem]' : 'top-[-3.55rem]'
        } `}
      >
        {bottomAdDisplay && getFavId?.includes(product.id) ? (
          <FaHeartCircleMinus
            onClick={() => setBottomAdDisplay((e) => !e)}
            className="text-3xl"
          />
        ) : bottomAdDisplay && !favorite ? (
          <TbHeartMinus
            onClick={() => setBottomAdDisplay((e) => !e)}
            className="text-3xl"
          />
        ) : getFavId?.includes(product.id) ? (
          <FaHeartCirclePlus
            onClick={() => setBottomAdDisplay((e) => !e)}
            className="text-3xl"
          />
        ) : (
          <TbHeartPlus
            onClick={() => setBottomAdDisplay((e) => !e)}
            className="text-3xl"
          />
        )}
      </div>
    </div>
  );
}

function ShareItemOnSocialMediaPlatforms({
  urlSocialMediaPlatforms,
  setDisplayShareSocial,
}) {
  return (
    <div className="w-full h-full">
      <div
        onClick={() => setDisplayShareSocial(false)}
        className="bg-black fixed w-full h-full opacity-50"
      ></div>
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-blue-300 px-2 py-2 w-[20rem] h-[12rem] after:w-[20rem] after:h-[12rem] after:bg-white after:absolute after:left-[-0.5rem] after:top-[-0.5rem] z-20 after:-z-10">
        <FaShare className="absolute left-[50%] top-[-1.8rem] translate-x-[-50%] border-[3px] text-blue-400 border-black border-opacity-50 rounded-[50%] text-5xl p-1 bg-white" />
        <div className="font-semibold pt-4">Volkswagen new model 2023</div>
        <p className="w-fit mx-auto mt-4 mb-6 font-bold border-b-4 border-blue-200">
          Share on
        </p>
        <div className="flex justify-between pr-4">
          <FacebookMessengerShareButton url={urlSocialMediaPlatforms}>
            <FacebookMessengerIcon size={40} round={true} />
          </FacebookMessengerShareButton>
          <TwitterShareButton url={urlSocialMediaPlatforms}>
            <XIcon size={40} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton url={urlSocialMediaPlatforms}>
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
          <ViberShareButton url={urlSocialMediaPlatforms}>
            <ViberIcon size={40} round={true} />
          </ViberShareButton>
        </div>
      </div>
    </div>
  );
}

function DetailLeftSide() {
  const images = ['car1.jpg', 'car2.webp', 'car1.jpg', 'car3.jpeg'];
  const [imgCount, setImgCount] = useState(0);

  function nextImage() {
    setImgCount((prevNum) =>
      imgCount < images.length - 1 ? prevNum + 1 : imgCount
    );
  }

  function previousImage() {
    setImgCount((prevNum) => (imgCount > 0 ? prevNum - 1 : imgCount));
  }

  return (
    <div className="w-[50%] sm:w-[100%]">
      <div className="relative">
        <img
          src={`../pictures/${images.at(imgCount)}`}
          alt="product"
          className="w-[100%] aspect-video md:aspect-square"
        />
        <GrFormNext onClick={nextImage} className="detailImg-nextBtn" />
        <GrFormPrevious onClick={previousImage} className="detailImg-prevBtn" />
      </div>

      <div className="mt-2 flex justify-between">
        {images.map((img, i) => {
          return (
            <SelectedImageDisplay
              imgCount={imgCount}
              setImgCount={setImgCount}
              count={i}
              img={img}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}

function SelectedImageDisplay({ img, imgCount, setImgCount, count }) {
  function handleSelectedImage(num) {
    setImgCount(num);
  }

  return (
    <img
      onClick={() => handleSelectedImage(count)}
      src={`../pictures/${img}`}
      alt="product"
      className={`w-[24%] aspect-video md:aspect-square cursor-pointer ${
        imgCount === count ? 'border-2 border-orange-500 opacity-50' : ''
      }`}
    />
  );
}

function DetailRightSide({
  product,
  setChatBox,
  setDisplayShareSocial,
  favorite,
  setFavorite,
  setBottomAdDisplay,
}) {
  const [expandShare, setExpandShare] = useState(false);
  const [expandMobileShare, setExpandMobileShare] = useState(false);

  // onClick={()=>setDisplayShareSocial(true)}

  return (
    <div className="w-[50%] sm:w-[100%] sm:mt-6">
      <div className="ml-10 sm:ml-0">
        <div className="flex justify-between">
          <p className="text-slate-500 font-bold sm:font-semibold sm:text-2xl">
            Product detail
          </p>
          <div className="flex justify-between items-center">
            {expandShare && (
              <>
                <span
                  className={`sm:pr-4 text-4xl md:text-3xl sm:text-3xl cursor-pointer bg-orange-100 pt-2 px-2 pb-1 mr-3 rounded-[50%] ${
                    expandShare ? 'scale-100' : 'scale-0'
                  } transition duration-[2s] ease-in-out`}
                >
                  <FacebookMessengerShareButton url="">
                    <FaFacebookF />
                  </FacebookMessengerShareButton>
                </span>
                <span
                  className={`sm:pr-4 text-4xl md:text-3xl sm:text-3xl cursor-pointer bg-orange-100 pt-2 px-2 pb-1 mr-3 rounded-[50%] ${
                    expandShare ? 'scale-100' : 'scale-0'
                  } transition duration-[2s] ease-in-out`}
                >
                  <TwitterShareButton url="">
                    <FaXTwitter />
                  </TwitterShareButton>
                </span>
                <span
                  className={`sm:pr-4 text-4xl md:text-3xl sm:text-3xl cursor-pointer bg-orange-100 pt-2 px-2 pb-1 mr-3 rounded-[50%] ${
                    expandShare ? 'scale-100' : 'scale-0'
                  } transition duration-[2s] ease-in-out`}
                >
                  <TwitterShareButton url="">
                    <FaWhatsapp />
                  </TwitterShareButton>
                </span>
                <span
                  className={`sm:pr-4 text-4xl md:text-3xl sm:text-3xl cursor-pointer bg-orange-100 pt-2 px-2 pb-1 mr-3 rounded-[50%] ${
                    expandShare ? 'scale-100' : 'scale-0'
                  } transition duration-[2s] ease-in-out`}
                >
                  <TwitterShareButton url="">
                    <FaViber />
                  </TwitterShareButton>
                </span>
              </>
            )}
            <span className="hidden md:hidden sm:block mr-2 text-3xl cursor-pointer bg-orange-100 p-3 rounded-[50%]">
              <GrShareOption onClick={() => setExpandMobileShare(true)} />
            </span>
            <span className=" sm:pr-4 sm:hidden text-4xl md:text-3xl sm:text-3xl cursor-pointer bg-orange-100 p-2 rounded-[50%]">
              {expandShare ? (
                <RxCross2 onClick={() => setExpandShare((e) => !e)} />
              ) : (
                <GrShareOption onClick={() => setExpandShare((e) => !e)} />
              )}
            </span>
            <span className="hidden md:hidden sm:block p-2 text-4xl md:text-2xl rounded-full sm:border-white bg-orange-100">
              {favorite ? (
                <FaHeart
                  onClick={() => setFavorite((e) => !e)}
                  className="text-4xl md:text-2xl cursor-pointer"
                />
              ) : (
                <FaRegHeart
                  onClick={() => setFavorite((e) => !e)}
                  className="cursor-pointer"
                />
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between relative">
          <div className="flex justify-between items-center">
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-xl font-semibold text-orange-500">
              {product.title}
            </h2>
            <span>{product.date}</span>
          </div>
          <p className="text-slate-400 mt-1 sm:text-xl">{product.model}</p>
          <div className="flex items-center mt-4">
            <SlLocationPin className="mr-2" />
            <p className="text-slate-600 text-sm sm:text-xl">
              {product.sellerLocation}
            </p>
          </div>
          <div className="mt-2 flex items-center">
            <LuEye /> <p className="pl-2">20 persons have seen this ad</p>
          </div>

          <div className="mt-4 flex items-center sm:mt-8">
            <p className="font-bold text-2xl sm:text-2xl text-slate-700">
              $
              {product.discount
                ? (
                    Number(product.price) -
                    (Number(product.discountPercentage) / 100) *
                      Number(product.price)
                  ).toFixed(2)
                : Number(product.price)?.toFixed(2)}
            </p>
            {product.discount && (
              <p className="ml-4 bg-orange-100 rounded px-2 text-sm font-bold text-orange-500">
                {product.discountPercentage}%
              </p>
            )}
          </div>
          <Map product={product} mapStyle="absolute bottom-[10.5rem] right-0 w-[30%] rounded aspect-square border-2 h-fit" />
          {product.discount && (
            <p
              className={`mt-1 w-fit px-1 font-bold text-lg sm:text-xl text-gray-400 ${
                product.discount &&
                "text-gray-400 relative before:content-[''] before:block before:w-full before:border-gray-400 before:border-t-2 before:h-3 before:absolute before:bottom-[2px] before:left-0 sm:mb-4"
              }`}
            >
              ${Number(product.price)?.toFixed(2)}
            </p>
          )}
          <SellerDetail
            product={product}
            setChatBox={setChatBox}
            setBottomAdDisplay={setBottomAdDisplay}
            sellerId={product.sellerId}
          />
        </div>
      </div>
      {expandMobileShare && (
        <MobileShareOnSocialMedia setExpandMobileShare={setExpandMobileShare} />
      )}
    </div>
  );
}

function MobileShareOnSocialMedia ({setExpandMobileShare}) {
    return <div className="fixed bottom-0 left-0 top-0 right-0 z-[30] w-full h-full flex flex-col justify-between">
       <div onClick={()=>setExpandMobileShare(false)} className=" h-full opacity-30 bg-black"></div>
       <div className="absolute bottom-0 left-0 right-0 bg-white text-slate-700  rounded-tl-xl shadow rounded-tr-xl opacity-100">
       <RxCross2 onClick={()=>setExpandMobileShare(false)} className="text-2xl absolute right-2 top-2 cursor-pointer"/>
        <div className="p-4">
            <h3 className="font-bold text-center text-lg">Share with friends</h3>
            <p className="text-sm text-center">I found some great items on AfghanBazaar24!</p>
        </div>
        <div className="py-4 px-8 text-5xl flex justify-center gap-6">
            <div className="flex flex-col items-center">
            <FaWhatsapp className="bg-[#25D366] text-white rounded-full p-2" />
            <p className="text-sm mt-1">WhatsApp</p>
            </div>
            <div className="flex flex-col items-center">
            <FaViber className="bg-[#7360f2] text-white rounded-full p-2" />
            <p className="text-sm mt-1">Viber</p>
            </div>
            <div className="flex flex-col items-center">
            <FaFacebookF className="bg-[#316FF6] text-white rounded-full p-2" />
            <p className="text-sm mt-1">Facebook</p>
            </div>
            <div className="flex flex-col items-center">
            <FaXTwitter className="bg-black text-white rounded-full p-2" />
            <p className="text-sm mt-1">X</p>
            </div>
            
        </div>
        <div className="py-4 px-8 text-5xl flex justify-center gap-6">
            <div className="flex flex-col items-center">
            <TbLink className="bg-gray-200 text-slate-700 rounded-full p-2" />
            <p className="text-sm mt-1">Copy Link</p>
            </div>
            <div className="flex flex-col items-center">
            <HiOutlineSave className="bg-gray-200 text-slate-700 rounded-full p-2" />
            <p className="text-sm mt-1">Save Image</p>
            </div>
            <div className="flex flex-col items-center">
            <TfiMoreAlt className="bg-gray-200 text-slate-700 rounded-full p-2" />
            <p className="text-sm mt-1">More</p>
            </div>
            
        </div>
       </div>
    </div>
}

function SellerDetail({setChatBox, setBottomAdDisplay, sellerId, product}) {
    const [callSeller, setCallSeller] = useState(false);
    return <div>
        <h3 className="py-2 font-semibold text-xl">About seller</h3>
        <div className="border-2 border-orange-100 rounded p-2">
        <div className="flex justify-between items-center">
            <div className="flex items-center">
            <div className="mr-4 bg-orange-400 rounded-full w-[4rem] h-[4rem]">
                <p className="text-4xl flex h-full justify-center items-center text-white"><span>{product.sellerFullName?.split(" ").at(0)?.slice(0,1)}</span><span>{product.sellerFullName?.split(" ").at(1)?.slice(0,1)}</span></p>
            </div>
            <p className="text-xl">{product.sellerFullName}</p>
            </div>
            <div>
                <Link to={`/profile/${sellerId}`}><small className="cursor-pointer underline">All ads by this seller</small></Link> 
            </div>
        </div>
        <div className="flex justify-between sm:flex-col">
    { callSeller ? <ShowSellerNumber product={product} callSeller={callSeller} setCallSeller={setCallSeller} /> : <button onClick={()=>setCallSeller(e=>!e)} className="mt-6 w-[49%] sm:w-[100%] bg-orange-400 cursor-pointer rounded text-white text-lg font-bold md:font-semibold py-2 hover:bg-orange-500">Call seller</button>}
    <button onClick={()=>{
    setChatBox(e=>!e) 
    setBottomAdDisplay(false)}} className="mt-6 sm:mt-3 w-[49%] sm:w-[100%] bg-orange-400 cursor-pointer rounded text-white text-lg font-bold md:font-semibold py-2 hover:bg-orange-500">Chat with seller</button>
    </div>
    </div>
    </div>
}

function ShowSellerNumber({callSeller, setCallSeller, product}) {
    return <div className={`flex justify-between items-center border-2 border-orange-400 mt-6 w-[49%] sm:w-[100%] ${callSeller ? "opacity-100" : "opacity-0"} transition duration-[3s] ease-in-out rounded text-lg md:text-sm sm:text-xl py-2`}>
    <FcTwoSmartphones className="mx-1 text-2xl md:text-xl sm:text-3xl" />
    <p>0049 {product.sellerPhoneNumber}</p>
    <IoCloseSharp onClick={()=>setCallSeller(e=>!e)} className="mx-1 text-2xl md:text-xl sm:text-3xl cursor-pointer" />
    </div>
}

function SimilarAds({product}) {
    const [similarProduct, setSimilarProduct] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/products?title=${product.title}&sellerLocation=${product.sellerLocation}&_limit=6`).then(response => {
            return response.json();
        })
.then(result => {    
    setSimilarProduct(result);
});    }, [product.title, product.sellerLocation])

const navigate = useNavigate();

function handleSimProductDetail(id) {
    navigate(`/product-detail/${id}`)
}

// Getting random data
const limit = 6;
const randomItems = _.sampleSize(similarProduct, limit);

    return <>
    {randomItems.length > 0 && <div className="mt-14 md:mt-20 sm:mt-12">
    <p className="font-bold pb-3 text-xl">Similar posts</p>
    <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4 sm:gap-3 cursor-pointer">
    {randomItems.filter(up => up.id !== product.id).map(simProduct => {
        return <div key={simProduct.id} onClick={()=>handleSimProductDetail(simProduct.id)} className="w-fit shadow-md rounded hover:scale-[1.03] hover:border-2 hover:border-blue-400">
        <img src="../pictures/car1.jpg" alt="product" className="h-[10rem]" />
        <p className="pt-4 px-1 font-bold">{simProduct.title} {simProduct.model}</p>
        <div className="mt-1 px-1 flex justify-between">
            <p>${simProduct.price}</p>
            <p>{simProduct.sellerLocation}</p>
        </div>
    </div>
    })}
    </div>
</div>}
    </>
}