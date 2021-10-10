const useDataApi = (initialUrl, initialData) => {
    const { useState, useEffect } = React;
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
  
        try {
          const result = await axios(url);
  
          setData(result.data);
        } catch (error) {
          setIsError(true);
        }
  
        setIsLoading(false);
      };
  
      fetchData();
    }, [url]);
  
    return [{ data, isLoading, isError }, setUrl];
  };
  
  function App() {
    const { Fragment, useState, useEffect } = React;
    const [query, setQuery] = useState("");
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
      "https://pokeapi.co/api/v2/pokemon/1/",
      {
        abilities: [],
        moves: [],
        sprites: [],
        types: []
      }
    );
      // Takes the first 5 moves to be rendered
let sliced = data.moves.slice(0,5);
      //Styling the grid
const myStyle = {
    border: '1px solid black'
}
const sprite = {
    backgroundImage: `url(${data.sprites.front_default})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize:'contain',
    border: '1px solid black',
    height:'250px'
    };
      //search bar for pokemon
    return (
      <Fragment>
          <h2>{data.name} ID.{data.id}</h2>
        <form
          onSubmit={(event) => {
            doFetch(`https://pokeapi.co/api/v2/pokemon/${query}/`);
  
            event.preventDefault();
          }}
        >
          <input
          placeholder='Pokemon name or id'
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      {/* error handling */}
        {isError && <div style={{color:'red'}}>Invalid name or pokemon id ...</div>}
  
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
      // the grid where data from the api is rendered
            <div className="container" style={myStyle}>
  <div className="row justify-content-md-center">
    <div className="col col-lg-2" style={myStyle}> 
    {`Base experience: ${data.base_experience}`}
   
    </div>
    <div className="col-md-auto" style={myStyle}>
   
    {`Weight: ${data.weight}`}

    </div>
    <div className="col col-lg-2" style={myStyle}>
    Types:
        <ul>
          {data.types.map((item) => (
            <li key={item.type.name}>
           {item.type.name}
            </li>
          ))}
        </ul>

    </div>
  </div>
  <div className="row" >
    <div className="col"  style={myStyle}>
    Abilites:
        <ul>
          {data.abilities.map((item) => (
            <li key={item.ability.name}>
           {item.ability.name}
            </li>
          ))}
        </ul>
    </div>
    <div className="col-md-auto" style={myStyle}>
    Moves:
        <ul>
          {sliced.map((item, index) => (
            <li key={index}>
           {item.move.name}
            </li>
          ))}
        </ul>  
    </div>
    <div className="col col-lg-2" style={sprite}>
    </div>
  </div>
</div>
        )}
      </Fragment>
    );
  }
  ReactDOM.render(<App />, document.getElementById("root"));
  