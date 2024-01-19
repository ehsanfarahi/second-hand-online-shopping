import spinner from "../assets/svg/spinner.svg"
import spinner2 from "../assets/svg/spinner2.svg"
import spinner3 from "../assets/svg/spinner3.svg"
import spinner4 from "../assets/svg/spinner4.svg"
import spinner5 from "../assets/svg/spinner5.svg"

const Spinner = ({type = "1", wWidth = "w-[6rem]", applyStyle = true}) => {
    return <div className="">
        <div className={`${applyStyle && "bg-black z-[10] fixed left-0 top-0 right-0 bottom-0 opacity-50"}`}>
        </div>
        <img src={type === "1" ? spinner : type === "2" ? spinner2 : type === "3" ? spinner3 : type === "4" ? spinner4 : type === "5" ? spinner5 : ""} alt="loading..." className={`${applyStyle && "h-24 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"} ${wWidth}`} />
    </div>
}

export default Spinner;