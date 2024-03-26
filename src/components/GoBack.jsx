import { useNavigate } from "react-router"; 

// React Icons
import { BiArrowBack } from "react-icons/bi";

function GoBack() {
    const navigate = useNavigate();

    // Functions
    function handleGoBack() {
        navigate(-1);
    }

    return <div onClick={handleGoBack} className="go-back-arrow">
    <BiArrowBack className="text-2xl" />
    <p className="pl-2 font-bold">Go back</p>
    </div>
}

export default GoBack;