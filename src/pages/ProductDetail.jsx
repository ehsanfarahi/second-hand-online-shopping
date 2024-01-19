import { useEffect, useState } from "react";
import { useParams } from "react-router";

// React Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const ProductDetail = () => {
    const { id } = useParams();

    const [favorite, setFavorite] = useState(false);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`).then(response => {
            return response.json();
        }).then(result => {
            setProduct(result);
        });
    }, [id])
return (
    <div className="absolute top-[20%] left-[50%] translate-x-[-50%] w-[70%] flex justify-between">
        <div className="w-[50%]">
            <img src="../pictures/car1.jpg" alt="product" className="w-[100%]" />
            <div className="mt-3 flex justify-between">
            <img src="../pictures/car1.jpg" alt="product" className="w-[32%]" />
            <img src="../pictures/car1.jpg" alt="product" className="w-[32%]" />
            <img src="../pictures/car1.jpg" alt="product" className="w-[32%]" />
            </div>
        </div>
        <div className="w-[50%]">
            <div className="ml-3">
                <div className="flex justify-between">
                <p className="text-slate-500 font-bold">Product detail</p>
                <span className="border-2 p-2 rounded-full border-slate-500">{favorite ? <FaHeart onClick={()=>setFavorite(e=>!e)} className="text-4xl cursor-pointer" /> : <FaRegHeart onClick={()=>setFavorite(e=>!e)} className="text-4xl cursor-pointer" />}</span>
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-orange-500">{product.company}</h2>
                <p className="text-slate-400 mt-1">{product.model}</p>
                <p className="mt-6 text-slate-700">This is the description of the product being displayed here. This is the description of the product being displayed here. This is the description of the product being displayed here. This is the description of the product being displayed here.</p>
                <p className="mt-4">👁 20 persons have seen it</p>
                <p className="mt-4 font-bold text-lg text-slate-700">${product.price}</p>
                <button className="mt-6 w-[40%] bg-orange-400 cursor-pointer rounded text-white text-lg font-bold py-2 hover:bg-orange-500">Buy</button>
            </div>
        </div>
    </div>
)
}

export default ProductDetail;