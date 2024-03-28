// React Icons
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
	return (
		<div className="bg-blue-200 mt-16 sm:bg-blue-100 text-slate-700 shadow">
			<div className="footer-container--top">
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
		<p className="pb-2">FarahiBazaar24 helps you sell your used products, and let's you buy used products.</p>
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
	return <div className="footer-socialMedia">
	<FaFacebookF className="cursor-pointer" />
	<FaInstagram className="cursor-pointer" />
	<FaXTwitter className="cursor-pointer" />
	<FaLinkedinIn className="cursor-pointer" />
	<FaTiktok className="cursor-pointer" />
	</div>
}

function FooterHeading() {
	return <div className="w-full mx-auto text-center ">
		<h3 className="text-2xl font-semibold">FarahiBazaar<span className="font-extrabold">24</span></h3>
	</div>
}

function FooterCopyRight() {
	const date = new Date();
	const currentYear = date.getFullYear();

	return <div className="w-full mx-auto text-sm text-center my-4">
		<p className="font-semibold">Copyright &copy; {currentYear} www.farahibazaar24.com</p>
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