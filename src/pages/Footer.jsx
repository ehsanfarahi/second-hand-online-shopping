// React Icons
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
	return (
		<div className="bg-blue-200 text-slate-700">
			<div className="grid grid-cols-4 md:grid-cols-5 sm:grid-cols-2 gap-20 sm:gap-10 md:gap-6 justify-between w-[92%] sm:w-[95%] md:w-[97%] mx-auto pt-10 sm:pb-6 md:pb-4 md:pt-8">
				<div className="sm:col-start-1 sm:col-span-2"><WhatWeDo /></div>
				<div><About /></div>
				<div><Suport /></div>
				<div className="sm:col-start-1 sm:col-span-2 md:col-span-2"><StayConnected /></div>
			</div>
			<FooterSocialMedial/>
			<FooterHeading/>
			<FooterCopyRight/>
			<FooterPolicies/>
		</div>
	)
}

export default Footer;

function WhatWeDo() {
	return <div>
		<p className="font-semibold text-lg pb-3">What we do</p>
		<p className="pb-2">AfghanBazaar24 helps you sell your used products, and let's you buy used products.</p>
	</div>
}

function About() {
	return <div>
		<p className="font-semibold text-lg pb-3">About</p>
		<p className="pb-2 cursor-pointer">Who are we?</p>
		<p className="pb-2 cursor-pointer">Guides and Reviews</p>
	</div>
}

function Suport() {
	return <div>
		<p className="font-semibold text-lg pb-3">Support</p>
		<p className="pb-2 cursor-pointer">Customer Support</p>
		<p className="pb-2 cursor-pointer">Contact Us</p>
	</div>
}

function StayConnected() {
	return <div>
		<p className="font-semibold text-lg pb-3">Stay Connected</p>
		<p className="pb-2">Be part of our family and receive updates, notifications about the product of your interes and product discounts.</p>
		<input type="email" placeholder="Enter email" className="border-2 outline-none mt-4 p-2 w-full border-slate-400 bg-transparent" />
		<button className="block mt-3 cursor-pointer bg-slate-700 text-slate-200 py-2 px-4 rounded">Sign up</button>
	</div>
}

function FooterSocialMedial () {
	return <div className="flex items-center my-10 gap-8 sm:gap-4 w-[95%] mx-auto justify-center text-2xl sm:text-3xl before:h-[2px] before:w-[40%] sm:before:w-[35%] before:bg-slate-500 after:h-[2px] after:w-[40%] sm:after:w-[35%] after:bg-slate-500">
	<FaFacebookF className="cursor-pointer" />
	<FaInstagram className="cursor-pointer" />
	<FaXTwitter className="cursor-pointer" />
	<FaLinkedinIn className="cursor-pointer" />
	<FaTiktok className="cursor-pointer" />
	</div>
}

function FooterHeading() {
	return <div className="w-full mx-auto text-center ">
		<h3 className="text-2xl font-semibold">AfghanBazaar<span className="font-extrabold">24</span></h3>
	</div>
}

function FooterCopyRight() {
	const date = new Date();
	const currentYear = date.getFullYear();

	return <div className="w-full mx-auto text-sm text-center my-4">
		<p className="font-semibold">Copyright &copy; {currentYear} www.afghanbazaar24.com</p>
	</div>
}

function FooterPolicies() {
	return <div className="font-semibold text-sm pb-8 flex justify-center gap-5 sm:gap-2">
		<p className="border-r-2 pr-5 sm:pr-2 underline cursor-pointer border-slate-500 w-fit sm:text-center">Privacy Policy</p>
		<p className="border-r-2 pr-5 sm:pr-2 underline cursor-pointer border-slate-500 w-fit sm:text-center">Terms & Conditions</p>
		<p className="border-r-2 pr-5 sm:pr-2 underline cursor-pointer border-slate-500 w-fit sm:text-center">Security</p>
		<p className="border-r-2 pr-5 sm:pr-2 underline cursor-pointer border-slate-500 w-fit sm:text-center">Data Protection</p>
		<p className="underline w-fit cursor-pointer sm:text-center">Manage Cookies</p>
	</div>
}