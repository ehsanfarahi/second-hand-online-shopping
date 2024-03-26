import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router"; 

// React Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";

// Components
import Spinner from "./Spinner";
import ProductDate from "./ProductDate";
import GoBack from "./GoBack";
import Button from "./Button";

const Profile = ({setUpdateFavorite}) => {
	const [errorMessage, setErrorMessage] = useState("");
		const [error, setError] = useState(false);
		const [product, setProduct] = useState([]);
		const [user, setUser] = useState([]); 

	const { id } = useParams();

	useEffect(() => {
		

		async function getProductData() {
			try {
				setError(true);
				const response = await fetch(`http://localhost:3000/products?sellerId=${id}`);

				if(!response.ok) throw new Error("Something went wrong while fetching data");

				const result = await response.json();
				
				if(result) {
					setError(false);
					setProduct(result);
				}

			} catch(err) {
				setErrorMessage(err.message);
			}
		}
		getProductData();
	}, [id])

	useEffect(() => {
		fetch(`http://localhost:3000/userSignup/${id}`).then(response => response.json()).then(result => setUser(result));
	}, [id])

	console.log(user);

	return (
		<div className="w-[60%] md:w-[95%] mx-auto pt-24 pb-10">
			<GoBack />
			<UserData user={user} />
			{error ? <Spinner/> : <UserAds product={product} setUpdateFavorite={setUpdateFavorite} />}
		</div>
	)
}

export default Profile;

function UserData({user}) {
	console.log("user", user);
	return <div className="flex">
		<div>
		<div className="mr-4 bg-orange-400 rounded-full w-[10rem] h-[10rem]">
                <p className="text-6xl flex h-full justify-center items-center text-white"><span>E</span><span>F</span></p>
            </div>
		</div>
			<div className="w-full">
				<div className="border-b-2 border-slate-700">
					<p className="font-semibold text-2xl pb-3">{user.firstName} {user.lastName}</p>
				</div>
				<div className="flex justify-between mt-3">
					<UserDetail user={user} />
					<UserAction />
				</div>
			</div>
	</div>
}

function UserDetail({user}) {
	const userLocation = `${user.state} ${user.city}, ${user.zone} ${user.postalCode}`;
	return <div className="">
	<p>online / offline</p>
	<UserSubDetail user={user.phoneNumber}><IoIosPhonePortrait/></UserSubDetail> 
	<UserSubDetail user={userLocation}><FaLocationDot/></UserSubDetail> 
	<UserSubDetail user="member since Jan 2024"><FaUser/></UserSubDetail> 
	<UserSubDetail user="12 Followes | 3 Following"><HiUsers/></UserSubDetail> 
</div>
}  

function UserSubDetail({children, user}) {
	return <p className="flex items-center"><span className="text-xl mr-2">{children}</span> {user}</p>
}

function UserAction() {
	return <div className="flex flex-col gap-2">
		<Button>Follow</Button>
		<Button>Share profile</Button>
		<Button>Report user</Button>
</div>
}

function UserAds({product, setUpdateFavorite}) {

	return (
		<div className="mt-6">
			<div className="user-ads">
				<p><span>{product.length}</span> {product.length <= 1 ? "ad" : "ads"}</p>
			</div>
			<div className="mt-4 grid grid-cols-5 gap-6">
			{product.map(pro => <AdContainer key={pro.id} product={pro} setUpdateFavorite={setUpdateFavorite} />)}
			</div>
		</div>
	)
}

function AdContainer({product, setUpdateFavorite}) {

	const navigate = useNavigate();

	return <div className="adContainer">
		<AdContainerFavorite product={product} setUpdateFavorite={setUpdateFavorite} />
		<div onClick={()=>navigate(`/product-detail/${product.id}`)}>
		<img src="../pictures/car1.jpg" alt={product.title} />
		<AdContainerDetail product={product} />
		</div>
	</div>
}

function AdContainerFavorite({product, setUpdateFavorite}) {
	const [favorite, setFavorite] = useState(false);

	const getFavId = localStorage.getItem("fav24");
	const getFavs = localStorage.getItem("fav24")?.split(",");

	useEffect(() => {
		if(getFavs.includes(product.id)) {
			setFavorite(true)
		} else {
			setFavorite(false);
		}
	}, [getFavs, product.id])

	// functions
	function addToFavorite() {
		setFavorite(e=>!e);

		const favId = [getFavId];

		localStorage.setItem("fav24", [...favId, product.id]);
		setUpdateFavorite(localStorage.getItem("fav24")?.split(",").slice(1).length);
	}

	function removeFromFavorite() {
		setFavorite(e=>!e);
		
		const uniqueId = getFavId.split(",").filter((fId) => fId !== product.id);
		localStorage.setItem("fav24", [uniqueId]);
	
		setUpdateFavorite(localStorage.getItem("fav24")?.split(",").slice(1).length);
	}

	return <div className={`absolute bg-white p-2 rounded-full right-1 top-1 opacity-[0.7] ${favorite && "opacity-[1]"} hover:opacity-[1] text-3xl`}>
	{favorite || getFavs.includes(product.id) ? <FaHeart onClick={removeFromFavorite} /> : <FaRegHeart onClick={addToFavorite} />}
	</div>
}

function AdContainerDetail({product}) {
	return <div className="p-2"> 
	<p className="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">{product.title}</p>
	<p className="text-lg">$ {Number(product.price).toFixed(2)}</p>
	<p className="text-right text-sm mt-1"><ProductDate product={product}/></p>
</div>
}