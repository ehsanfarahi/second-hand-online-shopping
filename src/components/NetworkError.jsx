import { PiWifiXBold } from "react-icons/pi";

function NetworkError() {
    return <div className="flex flex-col items-center">
      <div className="text-5xl"><PiWifiXBold /></div>
      <div className="mt-6 text-3xl"><p>Network error</p></div>
      <div className="font-thin mt-4"><p>Please check your internet connection, and try again!</p></div>
    </div>
  }

  export default NetworkError; 