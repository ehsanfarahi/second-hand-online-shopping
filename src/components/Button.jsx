function Button({children, extraStyle}) {
	return <button className={`block cursor-pointer bg-slate-700 text-slate-200 py-2 px-4 rounded hover:bg-slate-800 ${extraStyle}`}>{children}</button>
}

 export default Button; 