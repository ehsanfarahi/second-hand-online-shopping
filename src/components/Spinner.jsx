import spinner from "../assets/svg/spinner.svg"

const Spinner = () => {
    return <div className="">
        <div className="bg-black z-[10] fixed left-0 top-0 right-0 bottom-0 opacity-50">
        </div>
        <img src={spinner} alt="loading..." className="h-24 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
    </div>
}

export default Spinner;