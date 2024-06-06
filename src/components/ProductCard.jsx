import { useState } from "react";
import { useNavigate } from "react-router";

// Components
import ProductDate from "./ProductDate";

// React Icons
import { AiOutlineHeart } from "react-icons/ai";
import { IoHeart } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function ProductCard({
  product,
  setUpdateFavorite,
  getPopupDetail,
  setDisplayPopupProDetail,
  featured = true,
  productCardDisplay,
}) {
  const navigate = useNavigate();
  function handleProductDetail(id) {
    navigate(`/product-detail/${id}`);
  }

  const getFavId = localStorage.getItem('fav24')?.split(',');

  const [fav, setFav] = useState(false);

  function handlePopupDetail(id) {
    getPopupDetail(id);
    setDisplayPopupProDetail(true);
  }

  return (
    <>
      {productCardDisplay === 'grid' && (
        <ProductGridDisplay
          product={product}
          featured={featured}
          handleProductDetail={handleProductDetail}
          handlePopupDetail={handlePopupDetail}
          fav={fav}
          getFavId={getFavId}
          setFav={setFav}
          setUpdateFavorite={setUpdateFavorite}
        />
      )}
      {productCardDisplay === 'list' && (
        <ProductListDisplay
          product={product}
          featured={featured}
          handleProductDetail={handleProductDetail}
          fav={fav}
          getFavId={getFavId}
          setFav={setFav}
          setUpdateFavorite={setUpdateFavorite}
		  productCardDisplay={productCardDisplay}
        />
      )}
    </>
  );
}

export default ProductCard;

function ProductGridDisplay({
  product,
  featured,
  handleProductDetail,
  handlePopupDetail,
  fav,
  getFavId,
  setFav,
  setUpdateFavorite,
}) {
  return (
    <div className="product-card-container">
      <div>
        {new Date(product.date).toDateString() === new Date().toDateString() &&
          !product.featured && <span className="product-card--new">New</span>}
        {featured && product.featured && (
          <span className="product-card--featured">Featured</span>
        )}
        <img
          onClick={() => handleProductDetail(product.id)}
          className="w-full h-[10rem] sm:h-auto sm:aspect-square shadow"
          src="pictures/car1.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-3 sm:px-2 sm:py-1 sm:flex sm:justify-between sm:items-center">
          <p
            onClick={() => handleProductDetail(product.id)}
            className="product-card--model"
          >
            {product.title}
          </p>
          <div
            onClick={() => handleProductDetail(product.id)}
            className="sm:hidden"
          >
            <ProductPrice product={product} />
          </div>
          <div
            className="hidden sm:inline text-lg"
            onClick={() => handlePopupDetail(product.id)}
          >
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div
          onClick={() => handleProductDetail(product.id)}
          className="px-6 pt-0 flex justify-between sm:px-2"
        >
          <ProductLocation product={product} />
          <ProductDate product={product} />
        </div>
      </div>
      <div className="sm:flex sm:justify-between sm:items-center">
        <div className="hidden sm:inline">
          <ProductPrice product={product} />
        </div>
        {fav ? (
          getFavId?.includes(product.id) ? (
            <RemoveFromFavorite
              productId={product.id}
              setFav={setFav}
              setUpdateFavorite={setUpdateFavorite}
            />
          ) : (
            <AddToFavorite
              productId={product.id}
              setFav={setFav}
              setUpdateFavorite={setUpdateFavorite}
            />
          )
        ) : getFavId?.includes(product.id) ? (
          <RemoveFromFavorite
            productId={product.id}
            setFav={setFav}
            setUpdateFavorite={setUpdateFavorite}
          />
        ) : (
          <AddToFavorite
            productId={product.id}
            setFav={setFav}
            setUpdateFavorite={setUpdateFavorite}
          />
        )}
      </div>
    </div>
  );
}

function ProductListDisplay({
  product,
  featured,
  handleProductDetail,
  fav,
  getFavId,
  setFav,
  setUpdateFavorite,
  productCardDisplay
}) {
  return (
    <div className="h-[12rem] md:h-[10rem] sm:h-[10rem] rounded overflow-hidden shadow-lg relative hover:outline hover:outline-blue-300 hover:scale-[1.02] z-10 cursor-pointer flex items-center sm:border sm:border-gray-200">
      <div className="w-[35%] h-full">
        {new Date(product.date).toDateString() === new Date().toDateString() &&
          !product.featured && <span className="product-card--new">New</span>}
        {featured && product.featured && (
          <span className="product-card--featured">Featured</span>
        )}
        <img
          onClick={() => handleProductDetail(product.id)}
          className="w-full aspect-square md:aspect-auto h-full shadow"
          src="pictures/car1.jpg"
          alt="Sunset in the mountains"
        />
      </div>
      <div className="w-[65%] flex justify-between items-center h-full p-4">
        <div className="flex flex-col h-full justify-between">
          <div className="">
            <p
              onClick={() => handleProductDetail(product.id)}
              className="text-gray-700 text-base whitespace-nowrap overflow-hidden overflow-ellipsis"
            >
              {product.title}
            </p>
          </div>
          <div onClick={() => handleProductDetail(product.id)} className="">
            <ProductPrice product={product} productCardDisplay={productCardDisplay} />
          </div>
          <div
            onClick={() => handleProductDetail(product.id)}
            className="flex justify-between"
          >
            <ProductLocation product={product} />
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          {fav ? (
            getFavId?.includes(product.id) ? (
              <RemoveFromFavoriteListDisplay
                productId={product.id}
                setFav={setFav}
                setUpdateFavorite={setUpdateFavorite}
              />
            ) : (
              <AddToFavoriteListDisplay
                productId={product.id}
                setFav={setFav}
                setUpdateFavorite={setUpdateFavorite}
              />
            )
          ) : getFavId?.includes(product.id) ? (
            <RemoveFromFavoriteListDisplay
              productId={product.id}
              setFav={setFav}
              setUpdateFavorite={setUpdateFavorite}
            />
          ) : (
            <AddToFavoriteListDisplay
              productId={product.id}
              setFav={setFav}
              setUpdateFavorite={setUpdateFavorite}
            />
          )}
          <ProductDate product={product} />
        </div>
      </div>
    </div>
  );
}

function ProductPrice({ product, productCardDisplay = "grid" }) {
  return (
    <div className={`product-card--price-container w-min ${productCardDisplay === "grid" && "text-center mx-auto"}`}>
      <p className={`${product.discount && 'product-card--discount'}`}>
        ${Number(product.price).toFixed(2)}
      </p>
      {product.discount ? (
        <div className="relative flex sm:justify-between sm:items-center">
          <p className="text-green-700 sm:text-orange-400 text-xl sm:text-[1.25rem]">
            {Number(product.discountPercentage) === 100
              ? 'Free'
              : `$${(
                  product.price -
                  (Number(product.discountPercentage) / 100) * product.price
                ).toFixed(2)}`}
          </p>{' '}
          <span className="absolute sm:relative right-[-55px] sm:right-0 top-[-10px] sm:top-0 text-orange-400 sm:border sm:border-orange-400 sm:px-1 sm:rounded sm:ml-2 sm:text-[1rem] sm:leading-none">
            -{Number(product.discountPercentage)}%
          </span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

function ProductLocation({ product }) {
  return (
    <span className="product-card--location">
      {product.sellerLocation?.split(',').at(0)}
    </span>
  );
}

function AddToFavorite({ productId, setFav, setUpdateFavorite }) {
  function handleFavorite() {
    const getFavId = localStorage.getItem('fav24');
    const favId = [getFavId];
    localStorage.setItem('fav24', [...favId, productId]);

    setUpdateFavorite(
      localStorage.getItem('fav24')?.split(',').slice(1).length
    );

    setFav((e) => !e);
  }

  return (
    <div className="px-6 pt-4 sm:pt-2 pb-2 sm:px-2">
      <button onClick={handleFavorite} className="product-card--addToFavorite">
        <AiOutlineHeart className="text-lg sm:text-2xl mr-2 sm:mr-0" />{' '}
        <span className="sm:hidden">Favorite</span>
      </button>
    </div>
  );
}

function RemoveFromFavorite({ productId, setFav, setUpdateFavorite }) {
  function handleDeleteFavorite() {
    const getFavId = localStorage.getItem('fav24');
    const uniqueId = getFavId.split(',').filter((fId) => fId !== productId);
    localStorage.setItem('fav24', [uniqueId]);

    setUpdateFavorite(
      localStorage.getItem('fav24')?.split(',').slice(1).length
    );

    setFav((e) => !e);
  }
  return (
    <div className="px-6 pt-4 sm:pt-2 pb-2 sm:px-2">
      <button
        onClick={handleDeleteFavorite}
        className="product-card--addToFavorite"
      >
        <IoHeart className="text-lg sm:text-2xl mr-2 sm:mr-0 text-red-500" />{' '}
        <span className="sm:hidden">Favorite</span>
      </button>
    </div>
  );
}

function AddToFavoriteListDisplay({ productId, setFav, setUpdateFavorite }) {
  function handleFavorite() {
    const getFavId = localStorage.getItem('fav24');
    const favId = [getFavId];
    localStorage.setItem('fav24', [...favId, productId]);

    setUpdateFavorite(
      localStorage.getItem('fav24')?.split(',').slice(1).length
    );

    setFav((e) => !e);
  }

  return (
    <div className="text-right">
      <button onClick={handleFavorite} className="hover:text-red-700">
        <AiOutlineHeart className="text-3xl sm:text-2xl" />
      </button>
    </div>
  );
}

function RemoveFromFavoriteListDisplay({
  productId,
  setFav,
  setUpdateFavorite,
}) {
  function handleDeleteFavorite() {
    const getFavId = localStorage.getItem('fav24');
    const uniqueId = getFavId.split(',').filter((fId) => fId !== productId);
    localStorage.setItem('fav24', [uniqueId]);

    setUpdateFavorite(
      localStorage.getItem('fav24')?.split(',').slice(1).length
    );

    setFav((e) => !e);
  }
  return (
    <div className="text-right">
      <button onClick={handleDeleteFavorite} className="hover:text-red-700">
        <IoHeart className="text-3xl text-red-600 sm:text-2xl" />
      </button>
    </div>
  );
}