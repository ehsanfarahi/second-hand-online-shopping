const LoadingPlaceholder = ({length = 5}) => {  
    return <>
      {Array.from({length}).map((_, index) => <PlaceholderContainer key={index} />)}
    </>;
  } 

  export default LoadingPlaceholder;

  function PlaceholderContainer() {
    const placeholderContainerStyle = "h-[23rem] top-[5rem] right-10 border border-gray-300 shadow rounded-md max-w-sm w-full mx-auto";

    return <div className={placeholderContainerStyle}>
    <div className="animate-pulse w-full h-[10rem] bg-gray-400" />
    <Bars />
    <Bars />
  </div>
  } 

  function Bars() {
    return <div className="p-4 animate-pulse">
    <Bar extraStyle="w-3/4 mb-3" />
      <div className="space-y-2">
        <Bar />
        <Bar extraStyle="w-5/6" />
      </div>
    </div>
  }

  function Bar({extraStyle}) {
    return <div className={`h-4 bg-gray-400 rounded ${extraStyle}`}/>
  }