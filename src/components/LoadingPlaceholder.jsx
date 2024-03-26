const LoadingPlaceholder = () => {
    return <div className="h-[23rem] top-[5rem] right-10 border border-gray-300 shadow rounded-md max-w-sm w-full mx-auto">
      <div className="animate-pulse w-full h-[10rem] bg-gray-400">
  
      </div>
      <div className="p-4 animate-pulse">
      <div className="h-4 mb-3 bg-gray-400 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-400 rounded"></div>
          <div className="h-4 bg-gray-400 rounded w-5/6"></div>
        </div>
      </div>
      <div className="p-4 animate-pulse">
      <div className="h-4 mb-3 bg-gray-400 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-400 rounded"></div>
          <div className="h-4 bg-gray-400 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  }

  export default LoadingPlaceholder;