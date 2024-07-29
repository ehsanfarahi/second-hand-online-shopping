function Button({children, extraStyle, onClick}) {
	return <button onClick={onClick} className={`block cursor-pointer text-slate-200 py-1 px-2 rounded ${extraStyle}`}>{children}</button>
}

 export default Button; 