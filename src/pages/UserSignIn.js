import { useState } from "react";

// React Icons
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock, CiUnlock } from "react-icons/ci";
import { IoLogoGoogleplus } from "react-icons/io";
import { HiUser } from "react-icons/hi2";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";

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
        <div className="py-[3.5rem] flex justify-between h-full">
          <div
            onClick={handleMobileSignin}
            className={`${
              mobileSigninupForm ? "w-[92%] bg-white" : "w-[8%] bg-slate-200"
            } mt-[3rem]`}
          >
            <h3
              className={`${
                mobileSigninupForm
                  ? "text-2xl text-center uppercase"
                  : "text-lg rotate-[90deg] whitespace-nowrap flex justify-center items-center h-full font-semibold"
              }`}
            >
              Sign in
            </h3>
            {mobileSigninupForm && (
              <div className="mt-12 px-8">
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
                  <p className="text-blue-400 font-semibold">
                    Forgot password?
                  </p>
                </div>
                <button className="bg-blue-400 rounded w-full my-8 text-white font-semibold py-2 hover:bg-blue-500 cursor-pointer">
                  Sign in
                </button>
                <div className="relative">
                  <p className="text-center mb-6 before:content-[''] before:bg-blue-300 before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-[35%] before:h-[1px] after:content-[''] after:bg-blue-300 after:absolute after:right-0 after:top-[50%] after:translate-y-[-50%] after:w-[35%] after:h-[1px]">
                    Or login with
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
              mobileSigninupForm ? "w-[8%] bg-slate-200" : "w-[92%] bg-white"
            }  h-full`}
          >
            <h3
              className={`${
                mobileSigninupForm
                  ? "text-lg rotate-[90deg] whitespace-nowrap flex justify-center items-center font-semibold"
                  : "text-2xl text-center uppercase"
              }`}
            >
              Sign up
            </h3>
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

  // Functions
  function handleEmail(e) {
    if (e.target.value.length > 0) {
      setEmailIcon(false);
    } else {
      setEmailIcon(true);
    }
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
      <div className="flex flex-col">
        <div className="border-b-2 border-blue-100 p-1 text-lg rounded relative">
          <input
            onChange={handleEmail}
            type="email"
            placeholder="Email"
            className="w-full outline-none border-none"
          />{" "}
          {emailIcon && (
            <MdOutlineEmail className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
          )}
        </div>
        <div className="border-b-2 border-blue-100 p-1 text-lg focus:outline-2 focus:outline-blue-300 rounded mt-4 relative">
          <input
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
      </div>
      <div className="flex my-4 text-lg">
        <p>Remember me</p>
        <input type="checkbox" className="ml-2" />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-blue-400 font-semibold cursor-pointer">
          Forgot password?
        </p>
        <button className="bg-orange-400 text-white font-semibold text-xl px-6 py-1 rounded-md hover:bg-orange-500">
          Sign in
        </button>
      </div>
    </div>
  );
}

function Signup() {
  const [emailIcon, setEmailIcon] = useState(true);
  const [lock, setLock] = useState(true);

  // Functions
  function handleEmail(e) {
    if (e.target.value.length > 0) {
      setEmailIcon(false);
    } else {
      setEmailIcon(true);
    }
  }

  return (
    <div className="">
      <h2 className="text-3xl font-semibold text-orange-500">Sign up</h2>
      <p className="text-center pt-4 pb-4">Sign up using social networks</p>
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
      <div className="flex flex-col">
        <div className="border-b-2 border-blue-100 p-1 text-lg rounded relative">
          <input
            onChange={handleEmail}
            type="email"
            placeholder="Email"
            className="w-full outline-none border-none"
          />{" "}
          {emailIcon && (
            <MdOutlineEmail className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
          )}
        </div>
        <div className="border-b-2 border-blue-100 p-1 text-lg focus:outline-2 focus:outline-blue-300 rounded mt-4 relative">
          <input
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
      </div>
      <div className="flex my-4 text-lg">
        <p>Remember me</p>
        <input type="checkbox" className="ml-2" />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-blue-400 font-semibold cursor-pointer">
          Forgot password?
        </p>
        <button className="bg-orange-400 text-white font-semibold text-xl px-6 py-1 rounded-md hover:bg-orange-500">
          Sign up
        </button>
      </div>
    </div>
  );
}
