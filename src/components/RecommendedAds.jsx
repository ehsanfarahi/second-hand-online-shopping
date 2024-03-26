import { useState, useEffect } from "react"
import { useNavigate } from "react-router";

// Get random recommended ads
import _ from "lodash";

const RecommendedAds = ({setUpdateFavorite}) => {

    // Variables
    const limit = 12;

    // States
    const [recommendedAds, setRecommendedAds] = useState([]);

     // Fetching recommended ads
  useEffect(() => {
    fetch(`http://localhost:3000/products?featured=0&_limit=${limit}`)
      .then((response) => response.json())
      .then((result) => {
        setRecommendedAds(result);
      });
  }, [limit]); 


   // Get random recommended ads
   const randomRecommendedAds = _.sampleSize(recommendedAds, limit);

   const navigate = useNavigate();

function handleRecProductDetail(id) {
    navigate(`/product-detail/${id}`)
}

    return  <div className="mt-14 md:mt-20 sm:mt-12 mb-[10rem]">
    <p className="font-bold pb-3 text-xl">Recommended Ads</p>
    <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4 sm:gap-3 cursor-pointer">
    {randomRecommendedAds.map(recProduct => {
        return <div key={recProduct.id} onClick={()=>handleRecProductDetail(recProduct.id)} className="w-fit shadow-md rounded hover:scale-[1.03] hover:border-2 hover:border-blue-400">
        <img src="../pictures/car1.jpg" alt="product" className="h-[10rem]" />
        <p className="pt-4 px-1 font-bold">{recProduct.title} {recProduct.model}</p>
        <div className="mt-1 px-1 flex justify-between">
            <p>${recProduct.price}</p>
            <p>{recProduct.sellerLocation}</p>
        </div>
    </div>
    })}
    </div>
</div>
}

export default RecommendedAds;