import { useState } from "react";

// React Icons
import { FaFacebookF, FaLinkedinIn, FaCheck } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock, CiUnlock } from "react-icons/ci";
import { IoLogoGoogleplus } from "react-icons/io";
import { HiUser } from "react-icons/hi2";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const UserSignIn = () => {
  const [signinupForm, setSigninupForm] = useState(false);
  const [mobileSigninupForm, setMobileSigninupForm] = useState(true);
  const [mobileShowPassword, setMobileShowPasswprd] = useState(false);

  // Functions
  function handleMobileSignin() {
    if (mobileSigninupForm === false) {
      setMobileSigninupForm((e) => !e);
    }
  }

  function handleMobileSignup() {
    if (mobileSigninupForm === true) {
      setMobileSigninupForm((e) => !e);
    }
  }

  return (
    <>
      <div className="absolute w-[50%] left-[50%] translate-x-[-50%] top-[25%]  py-8 sm:hidden">
        <div className="bg-blue-200">
          <div className="flex justify-between">
            <div className="px-8 py-12">
              <h3 className="text-2xl font-thin">Don't have an account?</h3>
              <button
                onClick={() => setSigninupForm((e) => !e)}
                className={`border-2 border-slate-600 rounded px-4 py-1 mt-10 hover:bg-slate-600 hover:text-white`}
              >
                Sign up
              </button>
            </div>
            <div className="px-8 py-12">
              <h3 className="text-2xl font-thin">Already have an account?</h3>
              <button
                onClick={() => setSigninupForm((e) => !e)}
                className="border-2 border-slate-600 rounded px-4 py-1 mt-10 hover:bg-slate-600 hover:text-white"
              >
                Sign in
              </button>
            </div>
          </div>
          <div
            className={`absolute transition-all duration-500 ease-in-out  ${
              signinupForm && "left-8"
            } top-0 w-[60%] right-8 bg-white border-2 border-blue-200 px-8 py-10`}
          >
            {signinupForm ? <Signup /> : <Signin />}
          </div>
        </div>
      </div>

      {/* Login Form Mobile Size */}
      <div className="absolute top-0 bottom-0 left-0 right-0 hidden sm:block">
        <div className="py-[2rem] flex justify-between h-full">
          <div
            onClick={handleMobileSignin}
            className={`${
              mobileSigninupForm
                ? "w-[90%] bg-white"
                : "w-[10%] bg-slate-200 cursor-pointer"
            } pt-[3rem] transition-all duration-700 ease-in-out`}
          >
            <h3
              className={`${
                mobileSigninupForm
                  ? "text-2xl text-center uppercase"
                  : "text-lg rotate-[90deg] whitespace-nowrap flex justify-center items-center h-full font-semibold"
              } transition-all duration-700 ease-in-out`}
            >
              Sign in
            </h3>
            {mobileSigninupForm && (
              <div className="mt-6 px-8">
                <div className="text-lg">
                  <label>Email or Username</label>
                  <div className="bg-gray-100 rounded-2xl mt-1 shadow-sm relative">
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="border-none outline-none h-10 w-full bg-transparent px-2"
                    />
                    <HiUser className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
                  </div>
                </div>
                <div className="mt-6 text-lg">
                  <label>Password</label>
                  <div className="bg-gray-100 rounded-xl mt-1 shadow-sm relative">
                    <input
                      type={mobileShowPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="border-none outline-none h-10 w-full bg-transparent px-2"
                    />
                    {mobileShowPassword ? (
                      <BsFillUnlockFill
                        onClick={() => setMobileShowPasswprd((e) => !e)}
                        className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                      />
                    ) : (
                      <BsFillLockFill
                        onClick={() => setMobileShowPasswprd((e) => !e)}
                        className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-12">
                  <div className="flex">
                    <input type="radio" checke10 className="mr-2" />
                    <p>Remember me</p>
                  </div>
                  <p className="text-blue-400 font-semibold cursor-pointer">
                    Forgot password?
                  </p>
                </div>
                <button className="bg-blue-400 rounded w-full my-8 text-white font-semibold py-2 hover:bg-blue-500 cursor-pointer">
                  Sign in
                </button>
                <div className="relative">
                  <p className="text-center mb-6 before:content-[''] before:bg-blue-300 before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-[30%] before:h-[1px] after:content-[''] after:bg-blue-300 after:absolute after:right-0 after:top-[50%] after:translate-y-[-50%] after:w-[30%] after:h-[1px]">
                    Or log in with
                  </p>
                </div>
                <div className="flex justify-center text-3xl">
                  <FaFacebookF className="cursor-pointer bg-blue-700 text-white rounded-full p-1" />
                  <IoLogoGoogleplus className="mx-4 cursor-pointer bg-red-500 text-white rounded-full p-1" />
                  <FaLinkedinIn className="cursor-pointer bg-blue-400 text-white rounded-full p-1" />
                </div>
              </div>
            )}
          </div>
          <div
            onClick={handleMobileSignup}
            className={`${
              mobileSigninupForm
                ? "w-[10%] bg-slate-200 h-full cursor-pointer relative"
                : "w-[90%] bg-white"
            } pt-[3rem] transition-all duration-700 ease-in-out`}
          >
            <h3
              className={`${
                mobileSigninupForm
                  ? "text-lg rotate-[90deg] whitespace-nowrap h-fit absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-semibold"
                  : "text-2xl text-center uppercase"
              } transition-all duration-700`}
            >
              Sign up
            </h3>
            {!mobileSigninupForm && (
              <div className="mt-6 px-8">
                <div className="text-lg">
                  <label>Email or Username</label>
                  <div className="bg-gray-100 rounded-2xl mt-1 shadow-sm relative">
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="border-none outline-none h-10 w-full bg-transparent px-2"
                    />
                    <HiUser className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
                  </div>
                </div>
                <div className="mt-6 text-lg">
                  <label>Password</label>
                  <div className="bg-gray-100 rounded-xl mt-1 shadow-sm relative">
                    <input
                      type={mobileShowPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="border-none outline-none h-10 w-full bg-transparent px-2"
                    />
                    {mobileShowPassword ? (
                      <BsFillUnlockFill
                        onClick={() => setMobileShowPasswprd((e) => !e)}
                        className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                      />
                    ) : (
                      <BsFillLockFill
                        onClick={() => setMobileShowPasswprd((e) => !e)}
                        className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-12">
                  <div className="flex">
                    <input type="radio" checke10 className="mr-2" />
                    <p>Remember me</p>
                  </div>
                  <p className="text-blue-400 font-semibold cursor-pointer">
                    Forgot password?
                  </p>
                </div>
                <button className="bg-blue-400 rounded w-full my-8 text-white font-semibold py-2 hover:bg-blue-500 cursor-pointer">
                  Sign in
                </button>
                <div className="relative">
                  <p className="text-center mb-6 before:content-[''] before:bg-blue-300 before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-[30%] before:h-[1px] after:content-[''] after:bg-blue-300 after:absolute after:right-0 after:top-[50%] after:translate-y-[-50%] after:w-[30%] after:h-[1px]">
                    Or log in with
                  </p>
                </div>
                <div className="flex justify-center text-3xl">
                  <FaFacebookF className="cursor-pointer bg-blue-700 text-white rounded-full p-1" />
                  <IoLogoGoogleplus className="mx-4 cursor-pointer bg-red-500 text-white rounded-full p-1" />
                  <FaLinkedinIn className="cursor-pointer bg-blue-400 text-white rounded-full p-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignIn;

function Signin() {
  const [emailIcon, setEmailIcon] = useState(true);
  const [lock, setLock] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);

  // Functions
  function handleSigninFormLaptop() {
    if (email.length < 1) {
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }
    if (password.length < 1) {
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  }

  function handleEmail(e) {
    if (e.target.value.length > 0) {
      setEmailIcon(false);
    } else {
      setEmailIcon(true);
    }
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="">
      <h2 className="text-3xl font-semibold text-orange-500">Sign in</h2>
      <p className="text-center pt-4 pb-4">Sign in using social networks</p>
      <div className="flex justify-center text-[2.7rem]">
        <FaFacebookF className="cursor-pointer bg-blue-700 text-white rounded-full p-1" />
        <IoLogoGoogleplus className="mx-4 cursor-pointer bg-red-500 text-white rounded-full p-1" />
        <FaLinkedinIn className="cursor-pointer bg-blue-400 text-white rounded-full p-1" />
      </div>
      <div className="relative">
        <p className="text-center py-8 before:content-[''] before:bg-blue-300 before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-[45%] before:h-[1px] after:content-[''] after:bg-blue-300 after:absolute after:right-0 after:top-[50%] after:translate-y-[-50%] after:w-[45%] after:h-[1px]">
          OR
        </p>
      </div>
      <small className="block text-center text-red-500 hidden">
        Incorrect email or password. Please try again.
      </small>
      <div className="flex flex-col">
        <div className="border-b-2 border-blue-100 p-1 text-lg rounded relative">
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
        <div className="border-b-2 border-blue-100 p-1 text-lg focus:outline-2 focus:outline-blue-300 rounded mt-4 relative">
          <input
            onChange={handlePassword}
            type={lock ? "password" : "text"}
            placeholder="password"
            className="w-full outline-none border-none"
          />
          {lock ? (
            <CiLock
              onClick={() => setLock((e) => !e)}
              className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
            />
          ) : (
            <CiUnlock
              onClick={() => setLock((e) => !e)}
              className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
            />
          )}
        </div>
        <small className={`text-red-500 ${errorPassword && "hidden"}`}>
          Password cannot be empty.
        </small>
      </div>
      <div className="flex my-4 text-lg">
        <p>Remember me</p>
        <input type="checkbox" className="ml-2" />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-blue-400 font-semibold cursor-pointer">
          Forgot password?
        </p>
        <button
          onClick={handleSigninFormLaptop}
          className="bg-orange-400 text-white font-semibold text-xl px-6 py-1 rounded-md hover:bg-orange-500"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

function Signup() {
  const [emailIcon, setEmailIcon] = useState(true);
  const [lock, setLock] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [chars, setChars] = useState(false);
  const [capital, setCapital] = useState(false);
  const [num, setNum] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [weak, setWeak] = useState(false);
  const [meduim, setMeduim] = useState(false);
  const [strong, setStrong] = useState(false);
  const [veryStrong, setVeryStrong] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [passwordContain, setPasswordContain] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorPasswordMatch, setErrorPasswordMatch] = useState(false);

  // Functions
  function handleEmail(e) {
    if (e.target.value.length > 0) {
      setEmailIcon(false);
    } else {
      setEmailIcon(true);
    }
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setPasswordContain(true);

    if (e.target.value.length >= 6) {
      setChars(true);
    } else {
      setChars(false);
    }

    if (
      e.target.value.includes("A") ||
      e.target.value.includes("B") ||
      e.target.value.includes("C") ||
      e.target.value.includes("D") ||
      e.target.value.includes("E") ||
      e.target.value.includes("F") ||
      e.target.value.includes("G") ||
      e.target.value.includes("H") ||
      e.target.value.includes("I") ||
      e.target.value.includes("J") ||
      e.target.value.includes("K") ||
      e.target.value.includes("L") ||
      e.target.value.includes("M") ||
      e.target.value.includes("N") ||
      e.target.value.includes("O") ||
      e.target.value.includes("P") ||
      e.target.value.includes("Q") ||
      e.target.value.includes("R") ||
      e.target.value.includes("S") ||
      e.target.value.includes("T") ||
      e.target.value.includes("U") ||
      e.target.value.includes("V") ||
      e.target.value.includes("W") ||
      e.target.value.includes("X") ||
      e.target.value.includes("Y") ||
      e.target.value.includes("Z")
    ) {
      setCapital(true);
    } else {
      setCapital(false);
    }

    if (
      e.target.value.includes(0) ||
      e.target.value.includes(1) ||
      e.target.value.includes(2) ||
      e.target.value.includes(3) ||
      e.target.value.includes(4) ||
      e.target.value.includes(5) ||
      e.target.value.includes(6) ||
      e.target.value.includes(7) ||
      e.target.value.includes(8) ||
      e.target.value.includes(9)
    ) {
      setNum(true);
    } else {
      setNum(false);
    }

    if (
      e.target.value.includes(",") ||
      e.target.value.includes(";") ||
      e.target.value.includes("'") ||
      e.target.value.includes("/") ||
      e.target.value.includes("<") ||
      e.target.value.includes(">") ||
      e.target.value.includes("?") ||
      e.target.value.includes(":") ||
      e.target.value.includes("|") ||
      e.target.value.includes("!") ||
      e.target.value.includes("@") ||
      e.target.value.includes("#") ||
      e.target.value.includes("$") ||
      e.target.value.includes("%") ||
      e.target.value.includes("^") ||
      e.target.value.includes("&") ||
      e.target.value.includes("*") ||
      e.target.value.includes("(") ||
      e.target.value.includes(")") ||
      e.target.value.includes("_") ||
      e.target.value.includes("-") ||
      e.target.value.includes("=") ||
      e.target.value.includes("+") ||
      e.target.value.includes("`") ||
      e.target.value.includes("~")
    ) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }

    if (e.target.value.length >= 1) {
      setWeak(true);
    } else {
      setWeak(false);
    }
    if (e.target.value.length >= 4) {
      setMeduim(true);
      setWeak(false);
    } else {
      setMeduim(false);
    }
    if (e.target.value.length >= 6) {
      setStrong(true);
      setMeduim(false);
    } else {
      setStrong(false);
    }
    if (e.target.value.length >= 7) {
      setVeryStrong(true);
      setStrong(false);
    } else {
      setVeryStrong(false);
    }
  }

  function handleSignupFormLaptop() {
    if (firstName.length < 1) {
      setErrorFirstName(true);
    } else {
      setErrorFirstName(false);
    }
    if (lastName.length < 1) {
      setErrorLastName(true);
    } else {
      setErrorLastName(false);
    }
    if (email.length < 1) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
    if (password.length < 1) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    if (confirmPassword.length < 1) {
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }

    if (email.length > 1 && !email.includes("@")) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  }

  return (
    <div className="">
      <h2 className="text-3xl font-semibold text-orange-500">Sign up</h2>

      <div className="flex flex-col mt-10">
        <div className="flex  justify-between p-1 text-lg relative">
          <div className="border-b-2 border-blue-100">
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First name *"
              className="w-full outline-none border-none"
            />
          </div>

          <div className="border-b-2 border-blue-100">
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last name *"
              className="w-full outline-none border-none"
            />
          </div>
        </div>
        {errorFirstName && (
          <small className="text-red-500">First name is required</small>
        )}
        {errorLastName && (
          <small className="text-red-500">Last name is required</small>
        )}
        <div className="border-b-2 border-blue-100 p-1 text-lg mt-4 relative">
          <input
            onChange={handleEmail}
            type="email"
            placeholder="Email *"
            className="w-full outline-none border-none"
          />{" "}
          {emailIcon && (
            <MdOutlineEmail className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
          )}
        </div>
        {errorEmail && (
          <small className="text-red-500">Email is required</small>
        )}
        {invalidEmail && <small className="text-red-500">Invalid email</small>}
        <div className="border-b-2 border-blue-100 p-1 text-lg focus:outline-2 focus:outline-blue-300  mt-4 relative">
          <input
            onChange={handlePassword}
            type={lock ? "password" : "text"}
            placeholder="Password *"
            className="w-full outline-none border-none"
          />
          {lock ? (
            <CiLock
              onClick={() => setLock((e) => !e)}
              className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
            />
          ) : (
            <CiUnlock
              onClick={() => setLock((e) => !e)}
              className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
            />
          )}
        </div>
        {errorPassword && (
          <small className="text-red-500">Password is required</small>
        )}
        {passwordContain && (
          <div className="flex justify-between">
            <small>
              <p
                className={`flex items-center ${
                  chars ? "text-green-600" : "text-slate-600"
                }`}
              >
                <FaCheck className="mr-2" /> At least 6 characters
              </p>
              <p
                className={` ${
                  capital ? "text-green-600" : "text-slate-600"
                } flex items-center`}
              >
                <FaCheck className="mr-2" /> Contain capital letter
              </p>
              <p
                className={` ${
                  num ? "text-green-600" : "text-slate-600"
                } flex items-center`}
              >
                <FaCheck className="mr-2" /> Contain number
              </p>
              <p
                className={` ${
                  specialChar ? "text-green-600" : "text-slate-600"
                } flex items-center`}
              >
                <FaCheck className="mr-2" /> Contain special character
              </p>
            </small>
            <small>
              {weak && <p className="text-red-500">Weak</p>}
              {meduim && <p className="text-orange-500">Medium</p>}
              {strong && <p className="text-green-400">Strong</p>}
              {veryStrong && <p className="text-green-600">Very strong</p>}
            </small>
          </div>
        )}

        <div className="border-b-2 border-blue-100 p-1 text-lg focus:outline-2 focus:outline-blue-300  mt-4 relative">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={lock ? "password" : "text"}
            placeholder="Confirm password *"
            className="w-full outline-none border-none"
          />
          {lock ? (
            <CiLock
              onClick={() => setLock((e) => !e)}
              className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
            />
          ) : (
            <CiUnlock
              onClick={() => setLock((e) => !e)}
              className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
            />
          )}
        </div>
        {errorConfirmPassword && (
          <small className="text-red-500">Password must be confirmed</small>
        )}
        {errorPasswordMatch && (
          <small className="text-red-500">Passwords do not match</small>
        )}
      </div>
      <div className="flex justify-between items-center mt-[3rem]">
        <div className="flex items-center">
          <input className="mr-2" type="checkbox" />
          <p className="text-sm cursor-pointer">
            Agree with <Link>terms and conditions</Link>
          </p>
        </div>
        <button
          onClick={handleSignupFormLaptop}
          className="bg-orange-400 text-white font-semibold text-xl px-6 py-1 rounded-md hover:bg-orange-500"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
