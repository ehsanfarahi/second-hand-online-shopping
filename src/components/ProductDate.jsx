function ProductDate({ product }) {
	const date = new Date();
	const yesterday = date.setDate(date.getDate() - 1);
	const twoDaysAgo = date.setDate(date.getDate(yesterday) - 1);
	const threeDaysAgo = date.setDate(date.getDate(twoDaysAgo) - 1);
	const fourDaysAgo = date.setDate(date.getDate(threeDaysAgo) - 1);
	const fiveDaysAgo = date.setDate(date.getDate(fourDaysAgo) - 1);
	const sixDaysAgo = date.setDate(date.getDate(fiveDaysAgo) - 1);
	const oneWeekAgo = date.setDate(date.getDate(sixDaysAgo) - 1);
  
	return (
	  <span className="product-card--date">
		{new Date(product.date).toDateString() === new Date().toDateString()
		  ? "Today"
		  : new Date(product.date).toDateString() ===
			new Date(yesterday).toDateString()
		  ? "Yesterday"
		  : new Date(product.date).toDateString() ===
			new Date(twoDaysAgo).toDateString()
		  ? "2d ago"
		  : new Date(product.date).toDateString() ===
			new Date(threeDaysAgo).toDateString()
		  ? "3d ago"
		  : new Date(product.date).toDateString() ===
			new Date(fourDaysAgo).toDateString()
		  ? "4d ago"
		  : new Date(product.date).toDateString() ===
			new Date(fiveDaysAgo).toDateString()
		  ? "5d ago"
		  : new Date(product.date).toDateString() ===
			new Date(sixDaysAgo).toDateString()
		  ? "6d ago"
		  : new Date(product.date).toDateString() ===
			new Date(oneWeekAgo).toDateString()
		  ? "1w ago"
		  : product.date}
	  </span>
	);
  }

  export default ProductDate;