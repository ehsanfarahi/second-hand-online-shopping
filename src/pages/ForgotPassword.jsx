import { useState } from "react";
import { Link } from "react-router-dom";

// React Icons
import { MdOutlineEmail } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailIcon, setEmailIcon] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);

  function handleEmail(e) {
    setEmail(e.target.value);
    setErrorEmail(true);
  }

  function handleSubmit() {
    if (email.length < 1) {
      setErrorEmail(false);
    }
  }
  return (
    <div className="w-[30%] mx-auto pt-[10%] mb-[30rem]  py sm:hidden md:w-[50%] md:pt-[15%] sm:w-[95%]">
      <div className="p-4 border-2 border-blue-200">
        <h2 className="text-2xl font-semibold text-orange-500 sm:text-xl">
          Forgot password
        </h2>
        {invalidEmail && (
          <small className={`text-red-500`}>
            Invalid email, please try again!
          </small>
        )}
        <div className="mb-[1.5rem]">
          <div className="border-b-2 border-blue-100 p-1 text-lg rounded relative mt-[2rem]">
            <input
              onChange={handleEmail}
              type="email"
              placeholder="Email"
              className="w-full outline-none border-none"
            />

            {emailIcon && (
              <MdOutlineEmail className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
            )}
          </div>
          <small className={`text-red-500 ${errorEmail && "hidden"}`}>
            Email cannot be empty.
          </small>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-blue-400 font-semibold cursor-pointer">
            <Link to="/user-signin">Sign up instead!</Link>
          </p>
          <button
            onClick={handleSubmit}
            className="bg-orange-400 text-white font-semibold text-xl px-6 py-1 rounded-md hover:bg-orange-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
