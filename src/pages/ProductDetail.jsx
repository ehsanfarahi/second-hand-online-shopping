import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

// React Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { FcTwoSmartphones } from "react-icons/fc";

// Components
import Spinner from "../components/Spinner";

// Pages
import Chat from "./Chat";

const ProductDetail = () => {
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatBox, setChatBox] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`).then(response => {
            return response.json();
        }).then(result => {
            setProduct(result);
            setLoading(false);
        });
    }, [id])
return (
    <>
    <div className="absolute top-[20%] md:top-[15%] sm:top-[4.5rem] left-[50%] translate-x-[-50%] w-[70%] md:w-[90%] sm:w-[93%]">
       <div className="flex sm:flex-col justify-between">
       <DetailLeftSide/>
        <DetailRightSide product={product} setChatBox={setChatBox} />
       </div>
       <SimilarAds product={product} />
    </div>
    <Chat chatBox={chatBox} setChatBox={setChatBox}/>
    {loading && <Spinner/>}
    </>
)
}

export default ProductDetail;

function DetailLeftSide() {
    return  <div className="w-[50%] sm:w-[100%]">
    <img src="../pictures/car1.jpg" alt="product" className="w-[100%]" />
    <div className="mt-3 flex justify-between">
    <img src="../pictures/car1.jpg" alt="product" className="w-[32%]" />
    <img src="../pictures/car1.jpg" alt="product" className="w-[32%]" />
    <img src="../pictures/car1.jpg" alt="product" className="w-[32%]" />
    </div>
</div>
}

function DetailRightSide({product, setChatBox}) {
    const [favorite, setFavorite] = useState(false);
    const [callSeller, setCallSeller] = useState(false);

    return <div className="w-[50%] sm:w-[100%] sm:mt-6">
    <div className="ml-3 sm:ml-0">
        <div className="flex justify-between">
        <p className="text-slate-500 font-bold sm:font-semibold sm:text-2xl">Product detail</p>
        <div className="flex justify-between items-center">
            <span className="pr-6 sm:pr-4 text-4xl md:text-3xl sm:text-3xl cursor-pointer"><GrShareOption /></span>
        <span className="border-2 p-1 rounded-full border-slate-500 sm:border-white">{favorite ? <FaHeart onClick={()=>setFavorite(e=>!e)} className="text-4xl md:text-2xl cursor-pointer" /> : <FaRegHeart onClick={()=>setFavorite(e=>!e)} className="text-4xl md:text-2xl cursor-pointer" />}</span>
        
        </div>
        </div>
        <h2 className="mt-2 text-2xl sm:text-3xl md:text-xl font-semibold text-orange-500">{product.company}</h2>
        <p className="text-slate-400 mt-1 sm:text-xl">{product.model}</p>
        <p className="mt-6 text-slate-700 sm:text-lg">This is the description of the product being displayed here. This is the description of the product being displayed here. This is the description of the product being displayed here. This is the description of the product being displayed here.</p>
        <p className="mt-4">👁 20 persons have seen it</p>
        <p className="mt-4 font-bold text-lg sm:text-2xl text-slate-700">${product.price}</p>
        <div className="flex justify-between sm:flex-col">
        { callSeller ? <ShowSellerNumber callSeller={callSeller} setCallSeller={setCallSeller} /> : <button onClick={()=>setCallSeller(e=>!e)} className="mt-6 w-[49%] sm:w-[100%] bg-orange-400 cursor-pointer rounded text-white text-lg font-bold md:font-semibold py-2 hover:bg-orange-500">Call seller</button>}
        <button onClick={()=>setChatBox(e=>!e)} className="mt-6 sm:mt-3 w-[49%] sm:w-[100%] bg-orange-400 cursor-pointer rounded text-white text-lg font-bold md:font-semibold py-2 hover:bg-orange-500">Chat with seller</button>
        </div>
    </div>
</div>
}

function ShowSellerNumber({callSeller, setCallSeller}) {
    return <div className={`flex justify-between items-center border-2 border-orange-400 mt-6 w-[49%] sm:w-[100%] ${callSeller ? "opacity-100" : "opacity-0"} transition duration-[3s] ease-in-out rounded text-lg md:text-sm sm:text-xl py-2`}>
    <FcTwoSmartphones className="mx-1 text-2xl md:text-xl sm:text-3xl" />
    <p>+00 123 4567 8923</p>
    <IoCloseSharp onClick={()=>setCallSeller(e=>!e)} className="mx-1 text-2xl md:text-xl sm:text-3xl cursor-pointer" />
    </div>
}

function SimilarAds({product}) {
    const [similarProduct, setSimilarProduct] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/products?company=${product.company}&location=${product.location}&_limit=6`).then(response => {
            return response.json();
        })
.then(result => {
    setSimilarProduct(result);
});    }, [product.company, product.location])

const navigate = useNavigate();

function handleSimProductDetail(id) {
    navigate(`/product-detail/${id}`)
}



const randomNumber = Math.floor(Math.random(similarProduct) * similarProduct.length);


    return (
        <div className="mt-28 md:mt-20 sm:mt-12 mb-12">
            <p className="font-bold pb-3 text-xl">Similar posts</p>
            <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4 sm:gap-3 cursor-pointer">
            {similarProduct.map(simProduct => {
                return <div key={simProduct.id} onClick={()=>handleSimProductDetail(simProduct.id)} className="w-fit shadow-md rounded hover:scale-[1.03] hover:border-2 hover:border-blue-400">
                <img src="../pictures/car1.jpg" alt="product" className="h-[10rem]" />
                <p className="pt-4 px-1 font-bold">{simProduct.company} {simProduct.model}</p>
                <div className="mt-1 px-1 flex justify-between">
                    <p>${simProduct.price}</p>
                    <p>{simProduct.location}</p>
                </div>
            </div>
            })}
            </div>
        </div>
    )
}