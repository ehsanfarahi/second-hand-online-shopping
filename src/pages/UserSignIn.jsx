import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// React Icons
import { FaFacebookF, FaLinkedinIn, FaCheck } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CgLock, CgLockUnlock } from "react-icons/cg";
import { IoLogoGoogleplus } from "react-icons/io";
import { HiUser } from "react-icons/hi2";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";

// Custom Hooks
import { useGetGeoLocation } from "../customHooks/useGetGeoLocation";
import { useGetAddress } from "../customHooks/useGetAddress";

// Loader
import Spinner from "../components/Spinner";

// React Toasts
import { ToastContainer, toast } from 'react-toastify';
import Map from "../components/Map";
import Button from "../components/Button";

const UserSignIn = () => {
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    window.scrollTo({
        top: 0,
    });
}, [])
 
  return (
    <>
      <SignInUpForms setLoading={setLoading} />
      <MobileSignInUpForms />
      {loading && <Spinner />}
      <ToastContainer
position="top-center"
autoClose={500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover={false}
theme="light"
/>
    </> 
  );
};

export default UserSignIn;

function MobileSignInUpForms() {
  const [mobileSigninupForm, setMobileSigninupForm] = useState(true);
  const [mobileShowPassword, setMobileShowPassword] = useState(false);
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 hidden sm:block">
      <div className="py-[2rem] flex justify-between h-full">
        <MobileSignin
          mobileSigninupForm={mobileSigninupForm}
          setMobileSigninupForm={setMobileSigninupForm}
          mobileShowPassword={mobileShowPassword}
          setMobileShowPassword={setMobileShowPassword}
        />
        <MobileSignup
          mobileSigninupForm={mobileSigninupForm}
          setMobileSigninupForm={setMobileSigninupForm}
          mobileShowPassword={mobileShowPassword}
          setMobileShowPassword={setMobileShowPassword}
        />
      </div>
    </div>
  );
}

function MobileSignin({
  mobileSigninupForm,
  setMobileSigninupForm,
  mobileShowPassword,
  setMobileShowPassword,
}) {
  const [mobileEmptyEmailPassword, setMobileEmptyEmailPassword] =
    useState(false);
  const [mobileEmptyEmail, setMobileEmptyEmail] = useState(false);
  const [mobileEmptyPassword, setMobileEmptyPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);

  function handleMobileSignin() {
    if (mobileSigninupForm === false) {
      setMobileSigninupForm((e) => !e);
    }
  }

  function handleMobileSigninForm() {
    if (email.length < 1) {
      setMobileEmptyEmail(true);
    }
    if (password.length < 1) {
      setMobileEmptyPassword(true);
    }
    if (email.length < 1 && password.length < 1) {
      setMobileEmptyEmailPassword(true);
    }

    fetch(
      `http://localhost:3000/userSignup?email=${email}&password=${password}`
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 0) {
          console.log(result);
          setErrorLogin(false);
        } else {
          setErrorLogin(true);
        }
      });
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    setMobileEmptyEmail(false);
    setMobileEmptyEmailPassword(false);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setMobileEmptyPassword(false);
    setMobileEmptyEmailPassword(false);
  }

  return (
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
            : "text-lg rotate-[90deg] whitespace-nowrap flex justify-center items-center h-full font-semibold transition-all duration-700 ease-in-out"
        } `}
      >
        Sign in
      </h3>
      {errorLogin && (
        <small className="text-red-500 block text-center pt-1">
          Incorrect email or password. Please try again.
        </small>
      )}
      {mobileEmptyEmailPassword && (
        <small className="text-red-500 block text-center pt-1">
          Empty email and password fields
        </small>
      )}
      {!mobileEmptyEmailPassword && mobileEmptyEmail ? (
        <small className="text-red-500 block text-center pt-1">
          Empty email field
        </small>
      ) : (
        ""
      )}
      {!mobileEmptyEmailPassword && mobileEmptyPassword ? (
        <small className="text-red-500 block text-center pt-1">
          Empty password field
        </small>
      ) : (
        ""
      )}
      {mobileSigninupForm && (
        <div className="mt-6 px-8">
          <div className="text-lg">
            <label>Email or Username</label>
            <div className="bg-gray-100 rounded-2xl mt-1 shadow-sm relative">
              <input
                onChange={handleEmail}
                type="email"
                placeholder="Enter email"
                className={` ${
                  mobileEmptyEmail || mobileEmptyEmailPassword
                    ? "border border-1 border-red-500 rounded-2xl"
                    : "border-none"
                }  outline-none h-10 w-full bg-transparent px-2`}
              />
              <HiUser className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
            </div>
          </div>
          <div className="mt-6 text-lg">
            <label>Password</label>
            <div className="bg-gray-100 rounded-xl mt-1 shadow-sm relative">
              <input
                onChange={handlePassword}
                type={mobileShowPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`${
                  mobileEmptyPassword || mobileEmptyEmailPassword
                    ? "border border-1 border-red-500 rounded-2xl"
                    : "border-none"
                } outline-none h-10 w-full bg-transparent px-2`}
              />
              {mobileShowPassword ? (
                <BsFillUnlockFill
                  onClick={() => setMobileShowPassword((e) => !e)}
                  className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                />
              ) : (
                <BsFillLockFill
                  onClick={() => setMobileShowPassword((e) => !e)}
                  className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between mt-12">
            <div className="flex">
              <input type="checkbox" className="mr-2" />
              <p>Remember me</p>
            </div>
            <p className="text-blue-400 font-semibold cursor-pointer">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </div>
          <button
            onClick={handleMobileSigninForm}
            className="bg-blue-400 rounded w-full my-8 text-white font-semibold py-2 hover:bg-blue-500 cursor-pointer"
          >
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
  );
}

function MobileSignup({
  mobileSigninupForm,
  setMobileSigninupForm,
  mobileShowPassword,
  setMobileShowPassword,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorAgreeTerms, setErrorAgreeTerms] = useState(false);
  const [mobileShowConfirmPassword, setMobileShowConfirmPasswprd] =
    useState(false);

  function handleMobileSignup() {
    if (mobileSigninupForm === true) {
      setMobileSigninupForm((e) => !e);
    }
  }

  async function handleMobileSignupForm() {
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
    if (agreeTerms) {
      setErrorAgreeTerms(false);
    } else {
      setErrorAgreeTerms(true);
    }

    if (
      firstName.length >= 3 &&
      lastName.length >= 3 &&
      email.includes("@") &&
      password.length >= 6 &&
      password === confirmPassword &&
      agreeTerms === true
    ) {
      let data = await fetch("http://localhost:3000/userSignup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });

      data = await data.json();
      if (data) {
        alert("Signed up successfully!");
      }
    } else {
      alert("Something went wrong!");
    }
  }

  return (
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
            ? "text-lg rotate-[90deg] whitespace-nowrap h-fit absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-semibold transition-all duration-700"
            : "text-2xl text-center uppercase"
        } `}
      >
        Sign up
      </h3>
      {errorFirstName ||
      errorLastName ||
      errorEmail ||
      errorPassword ||
      errorConfirmPassword ? (
        <small className="sm:block hidden text-red-500 text-center pt-1">
          Required fileds cannot be empty
        </small>
      ) : (
        ""
      )}
      {errorAgreeTerms ? (
        <small className="sm:block hidden text-red-500 text-center pt-1">
          To continue, you must agree with our terms and conditions.
        </small>
      ) : (
        ""
      )}
      {!mobileSigninupForm && (
        <div className="mt-4 px-8">
          <div className="text-lg">
            <label>First name</label>
            <div className="bg-gray-100 rounded-2xl mt-1 shadow-sm relative">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter first name *"
                className={`${
                  errorFirstName
                    ? "border border-1 border-red-500 rounded-2xl"
                    : "border-none"
                } outline-none h-10 w-full bg-transparent px-2`}
              />
              <HiUser className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-lg">
            <label>Last name</label>
            <div className="bg-gray-100 rounded-2xl mt-1 shadow-sm relative">
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter last name *"
                className={`${
                  errorLastName
                    ? "border border-1 border-red-500 rounded-2xl"
                    : "border-none"
                } outline-none h-10 w-full bg-transparent px-2`}
              />
              <HiUser className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-lg">
            <label>Email or Username</label>
            <div className="bg-gray-100 rounded-2xl mt-1 shadow-sm relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email *"
                className={`${
                  errorEmail
                    ? "border border-1 border-red-500 rounded-2xl"
                    : "border-none"
                } outline-none h-10 w-full bg-transparent px-2`}
              />
              <HiUser className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-lg">
            <label>Password</label>
            <div className="bg-gray-100 rounded-xl mt-1 shadow-sm relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={mobileShowPassword ? "text" : "password"}
                placeholder="Enter password *"
                className={`${
                  errorPassword
                    ? "border border-1 border-red-500 rounded-2xl"
                    : "border-none"
                } outline-none h-10 w-full bg-transparent px-2`}
              />
              {mobileShowPassword ? (
                <BsFillUnlockFill
                  onClick={() => setMobileShowPassword((e) => !e)}
                  className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                />
              ) : (
                <BsFillLockFill
                  onClick={() => setMobileShowPassword((e) => !e)}
                  className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                />
              )}
            </div>
          </div>
          <div className="mt-4 text-lg">
            <label>Confirm password</label>
            <div className="bg-gray-100 rounded-xl mt-1 shadow-sm relative">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={mobileShowConfirmPassword ? "text" : "password"}
                placeholder="Confirm password *"
                className={`${
                  errorConfirmPassword
                    ? "border border-1 border-red-500 rounded-2xl"
                    : "border-none"
                } outline-none h-10 w-full bg-transparent px-2`}
              />
              {mobileShowConfirmPassword ? (
                <BsFillUnlockFill
                  onClick={() => setMobileShowConfirmPasswprd((e) => !e)}
                  className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                />
              ) : (
                <BsFillLockFill
                  onClick={() => setMobileShowConfirmPasswprd((e) => !e)}
                  className="absolute right-1 top-[50%] translate-y-[-50%] text-xl"
                />
              )}
            </div>
          </div>
          <div className="mt-10 inline-flex">
            <input
              onChange={() => setAgreeTerms((e) => !e)}
              type="checkbox"
              className="mr-2"
              id="conditions"
            />
            <label htmlFor="conditions" className="text-sm cursor-pointer">
              Agree with{" "}
              <Link className="font-semibold underline text-blue-400">
                terms and conditions
              </Link>
            </label>
          </div>
          <button
            onClick={handleMobileSignupForm}
            className="bg-blue-400 rounded w-full my-8 text-white font-semibold py-2 hover:bg-blue-500 cursor-pointer"
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
}

function SignInUpForms({ setLoading }) {
  const [signinupForm, setSigninupForm] = useState(false);
  return (
    <div className="w-[50%] mx-auto pt-[15%] mb-[30rem]  py sm:hidden md:w-[80%] md:pt-[15%]">
      <div className="relative bg-blue-200">
        <div className="flex justify-between">
          <div className="px-8 py-12 w-[40%] md:pl-6 md:pr-10 md:py-8 md:w-[40%]">
            <h3 className="text-2xl font-thin">Don't have an account?</h3>
            <SignInUpButtons setSigninupForm={setSigninupForm}>
              Sign up
            </SignInUpButtons>
          </div>
          <div className="px-8 py-12 w-[40%] md:pl-10 md:pr-6 md:py-8 md:w-[40%]">
            <h3 className="text-2xl font-thin">Already have an account?</h3>
            <SignInUpButtons setSigninupForm={setSigninupForm}>
              Sign in
            </SignInUpButtons>
          </div>
        </div>
       
        <div
          className={`absolute ${
            signinupForm ? "move-left left-[1.5rem]" : "move-right right-[1.5rem]"
          } top-[-2rem] w-[60%]  bg-white border-2 border-blue-200 px-8 py-10`}
        >
          {signinupForm ? <Signup setSigninupForm={setSigninupForm} /> : <Signin setLoading={setLoading} />}
        </div>
      </div>
    </div>
  );
}

function SignInUpButtons({ setSigninupForm, children }) {
  return (
    <button
      onClick={() => setSigninupForm((e) => !e)}
      className={`border-2 border-slate-600 rounded px-4 py-1 mt-10 hover:bg-slate-600 hover:text-white`}
    >
      {children}
    </button>
  );
}

function Signin({ setLoading }) {
  const [lock, setLock] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorUser, setErrorLogin] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Functions
  function handleSigninFormLaptop() {
    try {
      if (email.length < 1) {
        setErrorEmail(false);
      } else {
        if(!email.includes("@")) {
          setInvalidEmail(false)
          setErrorEmail(true);
        } else {
          setInvalidEmail(true);
        }
      }
      if (password.length < 1) {
        setErrorPassword(false);
      } else {
        setErrorPassword(true);
      }
  
      setLoading(true);
  
      fetch(
        `http://localhost:3000/userSignup?email=${email}&password=${password}`
      )
        .then((response) => {
          if(!response.ok) throw new Error("Failed to fetch data");
          return response.json();
         } 
        )
        .then((result) => {
          console.log(result)
          if (result?.length > 0 && result?.length < 2) {
            setErrorLogin(false);

            if(rememberMe) {
              localStorage.setItem(
                "24UserLoginData",
                JSON.stringify(result[0].id)
              );
            } else {
              sessionStorage.setItem(
                "24UserLoginData",
                JSON.stringify(result[0].id)
              );
            } 
  
            const redirectUrl = sessionStorage.getItem("redirectUrl");
            if (redirectUrl) {
              sessionStorage.removeItem("redirectUrl");
              window.location.href = redirectUrl;
            } else {
              window.location.href = "/";
            }
  
            setLoading(false);
          } else {
            if(email.length > 0 && password.length > 0) {
              setErrorLogin(true);
            } else {
              setErrorLogin(false); 
            }
            setLoading(false);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  function handleEmail(e) {
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
      <small
        className={`${errorUser ? "block" : "hidden"} text-center text-red-500`}
      >
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

        
            <MdOutlineEmail className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl" />
          
        </div>
        <small className={`text-red-500 ${invalidEmail && "hidden"}`}>
          Invalid email. 
        </small>
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
            <CgLock
              onClick={() => setLock((e) => !e)}
              className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
            />
          ) : (
            <CgLockUnlock
              onClick={() => setLock((e) => !e)}
              className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
            />
          )}
        </div>
        <small className={`text-red-500 ${errorPassword && "hidden"}`}>
          Password cannot be empty.
        </small>
      </div>
      <div className="flex my-4 text-md">
        <input onClick={()=>setRememberMe(e=>!e)} type="checkbox" id="remember-me" className="mr-2" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-blue-400 font-semibold cursor-pointer">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
        <button
        type="button"
          onClick={handleSigninFormLaptop}
          className="bg-orange-400 text-white font-semibold text-xl px-6 py-1 rounded-md hover:bg-orange-500"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

function Signup({setSigninupForm}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    state: "",
    city: "",
    zone: "",
    postalCode: "",
  });
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phoneNumber,
    state,
    city,
    zone,
    postalCode,
  } = formData;
  const [emailIcon, setEmailIcon] = useState(true);
  const [lock, setLock] = useState(true);
  const [confirmLock, setConfirmLock] = useState(true);
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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [displayTermsMsg, setDisplayTermsMsg] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorZone, setErrorZone] = useState(false);
  const [errorPostalCode, setErrorPostalCode] = useState(false);
  const [step, setStep] = useState(1);
  const {geolocation, getGeolocation} = useGetGeoLocation();
  const {address, getAddress} = useGetAddress()

  // get current date
  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, `0`);
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  // Functions
  function handleEmail(e) {
    const event = e.target.value;
    setFormData(prevState=>({...prevState, email: event }));
    setErrorEmail(false);
  }

  function handlePassword(e) {
    const event = e.target.value;
    setFormData(prevState=>({...prevState, password: event }));
    setPasswordContain(true);

    if (event.length >= 6) {
      setChars(true);
    } else {
      setChars(false);
    }

    if (
      event.includes("A") ||
      event.includes("B") ||
      event.includes("C") ||
      event.includes("D") ||
      event.includes("E") ||
      event.includes("F") ||
      event.includes("G") ||
      event.includes("H") ||
      event.includes("I") ||
      event.includes("J") ||
      event.includes("K") ||
      event.includes("L") ||
      event.includes("M") ||
      event.includes("N") ||
      event.includes("O") ||
      event.includes("P") ||
      event.includes("Q") ||
      event.includes("R") ||
      event.includes("S") ||
      event.includes("T") ||
      event.includes("U") ||
      event.includes("V") ||
      event.includes("W") ||
      event.includes("X") ||
      event.includes("Y") ||
      event.includes("Z")
    ) {
      setCapital(true);
    } else {
      setCapital(false);
    }

    if (
      event.includes(0) ||
      event.includes(1) ||
      event.includes(2) ||
      event.includes(3) ||
      event.includes(4) ||
      event.includes(5) ||
      event.includes(6) ||
      event.includes(7) ||
      event.includes(8) ||
      event.includes(9)
    ) {
      setNum(true);
    } else {
      setNum(false);
    }

    if (
      event.includes(",") ||
      event.includes(";") ||
      event.includes("'") ||
      event.includes("/") ||
      event.includes("<") ||
      event.includes(">") ||
      event.includes("?") ||
      event.includes(":") ||
      event.includes("|") ||
      event.includes("!") ||
      event.includes("@") ||
      event.includes("#") ||
      event.includes("$") ||
      event.includes("%") ||
      event.includes("^") ||
      event.includes("&") ||
      event.includes("*") ||
      event.includes("(") ||
      event.includes(")") ||
      event.includes("_") ||
      event.includes("-") ||
      event.includes("=") ||
      event.includes("+") ||
      event.includes("`") ||
      event.includes("~")
    ) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }

    if (event.length >= 1) {
      setWeak(true);
    } else {
      setWeak(false);
    }
    if (event.length >= 4) {
      setMeduim(true);
      setWeak(false);
    } else {
      setMeduim(false);
    }
    if (event.length >= 6) {
      setStrong(true);
      setMeduim(false);
    } else {
      setStrong(false);
    }
    if (event.length >= 7) {
      setVeryStrong(true);
      setStrong(false);
    } else {
      setVeryStrong(false);
    }
  }

  function handleConfirmPassword(e) {
    setFormData(prevState=>({...prevState, confirmPassword: e.target.value }));
    setErrorPasswordMatch(false);
  }

  function handleNext() {
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

    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setErrorPasswordMatch(true);
    } else {
      setErrorPasswordMatch(false);
    }

    if (
      firstName.length >= 3 &&
      lastName.length >= 3 &&
      email.includes("@") &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      setStep((step) => step + 1);
    }
  }

  async function handleSignupFormLaptop() {
    if (phoneNumber.length < 1) {
      setErrorPhoneNumber(true);
    } else {
      setErrorPhoneNumber(false);
    }
    if (state.length < 1) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
    if (city.length < 1) {
      setErrorCity(true);
    } else {
      setErrorCity(false);
    }
    if (zone.length < 1) {
      setErrorZone(true);
    } else {
      setErrorZone(false);
    }
    if (postalCode.length < 1) {
      setErrorPostalCode(true);
    } else {
      setErrorPostalCode(false);
    }

    if (agreeTerms === false) {
      setDisplayTermsMsg(true);
    } else {
      setDisplayTermsMsg(false);
    }

    if (
      phoneNumber.length >= 11 &&
      state.length >= 3 &&
      city.length >= 3 &&
      zone.length >= 3 &&
      postalCode.length >= 4 &&
      agreeTerms === true
    ) {
      let data = await fetch("http://localhost:3000/userSignup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          phoneNumber,
          state,
          city,
          zone,
          postalCode,
          date: getCurrentDateTime(),
          online: false,
        }),
      });

      data = await data.json();
      if (data) {
        toast("Signed up successfully!");
        setSigninupForm(false);
      }
    } else {
      alert("Something went wrong!");
    }
    setEmailIcon(true);
  }

  return (
    <div className="">
      <h2 className="text-3xl font-semibold text-orange-500">Sign up</h2>
      {step === 1 ? (
        <>
          <div className="flex flex-col mt-10">
            <div className="flex  justify-between p-1 text-lg relative">
              <div>
                <div className="border-b-2 border-blue-100">
                  <Input
                    onChange={(e) => setFormData(prevState=>({...prevState, firstName: e.target.value }))}
                    type="text"
                    value={firstName}
                  >
                    First name *
                  </Input>
                </div>
                {errorFirstName && (
                  <small className="text-red-500">First name is required</small>
                )}
              </div>

              <div>
                <div className="border-b-2 border-blue-100">
                  <Input
                    onChange={(e) => setFormData(prevState=>({...prevState, lastName: e.target.value }))}
                    type="text"
                    value={lastName}
                  >
                    Last name *
                  </Input>
                </div>
                {errorLastName && (
                  <small className="text-red-500">Last name is required</small>
                )}
              </div>
            </div>

            <div className="border-b-2 border-blue-100 p-1 text-lg mt-4 relative flex justify-center items-center">
              <Input onChange={handleEmail} type="email" value={email}>
                Email *
              </Input>
              {emailIcon && <MdOutlineEmail className=" text-2xl ml-1" />}
            </div>
            {errorEmail && (
              <small className="text-red-500">Email is required</small>
            )}
            {invalidEmail && (
              <small className="text-red-500">Invalid email</small>
            )}
            <div className="border-b-2 border-blue-100 p-1 text-lg focus:outline-2 focus:outline-blue-300  mt-4 relative">
              <Input
                onChange={handlePassword}
                value={password}
                type={lock ? "password" : "text"}
              >
                Password *
              </Input>
              {lock ? (
                <CgLock
                  onClick={() => setLock((e) => !e)}
                  className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
                />
              ) : (
                <CgLockUnlock
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
                    className={`flex items-center font-semibold ${
                      chars ? "text-green-700" : "text-slate-600"
                    }`}
                  >
                    <FaCheck className="mr-2" /> At least 6 characters
                  </p>
                  <p
                    className={` ${
                      capital ? "text-green-700" : "text-slate-600"
                    } flex items-center font-semibold`}
                  >
                    <FaCheck className="mr-2" /> Contain capital letter
                  </p>
                  <p
                    className={` ${
                      num ? "text-green-700" : "text-slate-600"
                    } flex items-center font-semibold`}
                  >
                    <FaCheck className="mr-2" /> Contain number
                  </p>
                  <p
                    className={` ${
                      specialChar ? "text-green-700" : "text-slate-600"
                    } flex items-center font-semibold`}
                  >
                    <FaCheck className="mr-2" /> Contain special character
                  </p>
                </small>
                <div className="flex justify-between w-[50%] h-fit">
                  <div
                    className={`${
                      weak || meduim || strong || veryStrong
                        ? "bg-red-500"
                        : "bg-white"
                    } mr-1 mt-2 h-1 w-[25%]`}
                  ></div>
                  <div
                    className={`${
                      meduim || strong || veryStrong
                        ? "bg-orange-400"
                        : "bg-white"
                    } mr-1 mt-2 h-1 w-[25%]`}
                  ></div>
                  <div
                    className={`${
                      strong || veryStrong ? "bg-green-400" : "bg-white"
                    } mr-1 mt-2 h-1 w-[25%]`}
                  ></div>
                  <div
                    className={`${
                      veryStrong ? "bg-green-600" : "bg-white"
                    } mr-1 mt-2 h-1 w-[25%]`}
                  ></div>

                  <small className="w-[25%] whitespace-nowrap font-semibold">
                    {weak && <p className="text-red-500">Weak</p>}
                    {meduim && <p className="text-orange-500">Medium</p>}
                    {strong && <p className="text-green-400">Strong</p>}
                    {veryStrong && (
                      <p className="text-green-600">Very strong</p>
                    )}
                  </small>
                </div>
              </div>
            )}

            <div className="border-b-2 border-blue-100 p-1 text-lg focus:outline-2 focus:outline-blue-300  mt-4 relative">
              <input
                onChange={handleConfirmPassword}
                value={confirmPassword}
                onClick={() => setPasswordContain(false)}
                type={confirmLock ? "password" : "text"}
                placeholder="Confirm password *"
                className="w-full outline-none border-none"
              />
              {confirmLock ? (
                <CgLock
                  onClick={() => setConfirmLock((e) => !e)}
                  className="absolute right-1 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
                />
              ) : (
                <CgLockUnlock
                  onClick={() => setConfirmLock((e) => !e)}
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
          <div className="text-right mt-[3rem]">
            <button
              onClick={handleNext}
              className="bg-orange-400 text-white font-semibold text-xl px-6 py-1 rounded-md hover:bg-orange-500 whitespace-nowrap"
            >
              Next
            </button>
          </div>
        </>
      ) : step === 2 ? (
        <>
        <div className="text-center">
        {displayTermsMsg && (
              <small className="text-red-500 mb-2">
                To continue, you must agree to our terms and conditions.
              </small>
            )}
        </div>
          <div className="border-b-2 border-blue-100 p-1 text-lg mt-4 relative flex justify-center items-center">
            <Input
              onChange={(e) => setFormData(prevState=>({...prevState, phoneNumber: e.target.value }))}
              value={phoneNumber}
              type="number"
            >
              Phone number *
            </Input>
            {emailIcon && <MdOutlineEmail className=" text-2xl ml-1" />}
          </div>
          {errorPhoneNumber && (
            <small className="text-red-500">Phone number is required</small>
          )}
          <div className="flex  justify-between p-1 text-lg relative mt-4">
            <div>
              <div className="border-b-2 border-blue-100">
                <Input
                  onChange={(e) => setFormData(prevState=>({...prevState, state: e.target.value }))}
                  type="text"
                  value={address?.principalSubdivision || state}
                >
                  State *
                </Input>
              </div>
              {errorState && (
                <small className="text-red-500">State is required</small>
              )}
            </div>

            <div>
              <div className="border-b-2 border-blue-100">
                <Input
                  onChange={(e) => setFormData(prevState=>({...prevState, city: e.target.value }))}
                  type="text"
                  value={address?.city || city}
                >
                  City *
                </Input>
              </div>
              {errorCity && (
                <small className="text-red-500">City is required</small>
              )}
            </div>
          </div>
          <div className="flex  justify-between p-1 text-lg relative mt-4">
            <div>
              <div className="border-b-2 border-blue-100">
                <Input
                  onChange={(e) => setFormData(prevState=>({...prevState, zone: e.target.value }))}
                  type="text"
                  value={zone}
                >
                  Zone *
                </Input>
              </div>
              {errorZone && (
                <small className="text-red-500">Zone is required</small>
              )}
            </div>

            <div>
              <div className="border-b-2 border-blue-100">
                <Input
                  onChange={(e) => setFormData(prevState=>({...prevState, postalCode: e.target.value }))}
                  type="text"
                  value={address?.postcode || postalCode}
                >
                  Postal code *
                </Input>
              </div>
              {errorPostalCode && (
                <small className="text-red-500">Postal code is required</small>
              )}
            </div>
          </div>
          <Button onClick={()=>{
            getGeolocation(); 
            getAddress()
          }} extraStyle="bg-blue-200 text-slate-700 font-semibold mt-3 hover:bg-blue-300">Get my location</Button>
          <Map mapStyle="w-full h-[8rem] border-2 mt-1" position={geolocation} address={address} />
          
          <button >Get my location</button>
          <div className="flex justify-between items-center mt-[3rem]">
            <div className="flex items-center">
              <input
                id="terms"
                className="mr-2 cursor-pointer w-4 h-4 accent-orange-400/25"
                onChange={() => setAgreeTerms((e) => !e)}
                type="checkbox"
              />
              <label htmlFor="terms" className="text-sm cursor-pointer">
                Agree with{" "}
                <Link className="font-semibold underline text-blue-400">
                  terms and conditions
                </Link>
              </label>
            </div>
            <div className="flex">
              <button
                onClick={() => setStep((step) => step - 1)}
                className="bg-orange-400 text-white font-semibold text-xl px-6 py-1 mr-1 rounded-md hover:bg-orange-500 whitespace-nowrap"
              >
                Back
              </button>
              <button
                onClick={handleSignupFormLaptop}
                className="bg-orange-400 text-white font-semibold text-xl px-6 py-1 rounded-md hover:bg-orange-500 whitespace-nowrap"
              >
                Sign up
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

function Input({ onChange, type, children, value }) {
  return (
    <input
      onChange={onChange}
      type={type}
      value={value}
      placeholder={children}
      className="w-full outline-none border-none"
    />
  );
}
