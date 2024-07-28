
function Search({ inputString, handleClick, handleInput }) {
  return (
    <div className="flex justify-center items-center">
      <input type="text" 
            className="border border-white rounded-l-lg text-white text-2xl py-1"
            onChange={handleInput}
            value={inputString} />
      <button 
            className="border border-white rounded-r-lg text-2xl text-blue-200 px-5 py-1" 
            onClick={handleClick}>
        Search
      </button>
    </div>
  );
}

export default Search