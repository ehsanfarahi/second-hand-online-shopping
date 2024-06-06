import Spinner from "./Spinner";

function LoadMore({dispatch, numProductDisplay}) {
    function handleLoadMore() {
        dispatch({type: "addDisplayLimit", payload: numProductDisplay});
      }
    return (
      <div
        onClick={handleLoadMore}
        className="w-fit mx-auto mt-12 cursor-pointer"
      >
        <div className="load-more">
          <Spinner type="5" wWidth="w-[3rem] sm:w-[2rem]" applyStyle={false} />
          <p className="text-lg pr-1">Load more</p>
        </div>
      </div>
    );
  }  

  export default LoadMore;