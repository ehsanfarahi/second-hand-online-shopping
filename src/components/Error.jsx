

function Error({error}) {
 
    return <div >
      <div className="bg-black opacity-30 fixed top-0 right-0 bottom-0 left-0">
  
      </div>
      <div className="text-2xl text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <p>{error}</p>
      </div>
    </div>
  }

  export default Error;