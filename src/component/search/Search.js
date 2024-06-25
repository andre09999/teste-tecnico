import './Search.css';



function Search({filter, setFilter}) {
  return (
      <div className='search-container' >
       <input value={filter} type="search" placeholder='Pesquisar' onChange={(a) => setFilter(a.target.value)}/>
      </div>

  );
}

export default Search;
