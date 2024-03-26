// React Icons
import { RxCross2 } from "react-icons/rx";

// Components
import ProductDate from "./ProductDate";

const PopupProductDetail = ({detail, setDisplayPopupProDetail}) => {

	return <div className="fixed bottom-0 z-[30] left-0 right-0 top-0">
		<div onClick={()=>setDisplayPopupProDetail(false)} className="bg-black opacity-30 h-full"></div>
		<div className="bg-white absolute bottom-0 left-0 right-0 rounded-tr-md rounded-tl-md">
		<div className="p-1">
		  <div className="px-2 py-1 flex justify-between items-center">
			<p className="font-semibold text-lg">
			  {detail.title} 
			</p>
			<div className="hidden sm:inline text-xl cursor-pointer">
			<RxCross2 onClick={()=>setDisplayPopupProDetail(false)} />
			</div>
		  </div>
		  <div className="">
			<ProductPrice product={detail} />
			</div>
		  <div className="px-6 pt-0 flex justify-between sm:px-2">
			<ProductLocation product={detail} />
			<ProductDate product={detail} />
		  </div>
		</div>
		</div>
	</div>
}

export default PopupProductDetail;

function ProductPrice({ product }) {
	return (
	  <div className="font-bold text-xl text-center w-min mx-auto font-mono my-6">
		<p className={`${product.discount && "text-red-400 w-fit mx-auto relative font-medium text-lg before:content-[''] before:block before:w-full before:border-red-400 before:border-t-2 before:h-3 before:absolute before:bottom-[2px] before:left-0 before:rotate-[-6deg] px-1"}`}> 
		  ${Number(product.price).toFixed(2)}
		</p>
		{product.discount ? (
		  <div className="relative">
			<p className="text-green-700 text-2xl">
			  {Number(product.discountPercentage) === 100
				? "Free"
				: `$${(
					product.price -
					(Number(product.discountPercentage) / 100) * product.price
				  ).toFixed(2)}`}
			</p>{" "}
			<span className="absolute right-[-55px] top-[-10px] text-orange-400">
			  -{Number(product.discountPercentage)}%
			</span>
		  </div>
		) : (
		  ""
		)}
	  </div>
	);
  }

function ProductLocation({ product }) {
	return <span className="product-card--location">{product.sellerLocation}</span>;
  }
  
  