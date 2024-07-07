import './App.css';
import { useEffect, useState, useRef } from 'react';
function App() {
  const [ingredientList, updateIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const API_KEY = "7f0b126ed2cda6d591562ed55a1c3c5d";
  const APP_ID = "88ee3332";

  const search = ()=>{
    searchForRecipe(inputRef.current.value);
    inputRef.current.value ="";
  };
  
  const searchForRecipe = (query)=>{
    setLoading(true);
    let url = `search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch (url, {mode: "no-cors"})
    .then(response =>{
      return response.json();
    })
    .then(res => {
      updateIngredientList(res.hits);
      setLoading(false);
    })
    .catch(err => {console.log("error", err)
    setLoading(false);}
    );
  }
  //const [count, setCount] = useState(0);

  useEffect(()=>{
      searchForRecipe('chicken');
  }, []);

  return (
    <div className="App">
        <header className="App-header">
          <div className="InputWrapper">
            <input ref={inputRef} placeholder="Search for recipe" />
            <button style={{backgroundColor:"rgba(18, 18, 18, 0.546)", color:"white"}} onClick={search}><b>Search</b></button>
          </div>
          { loading && <p style={{color:"white"}}> Loading...</p> }
            <div className="Wrapper">
              {ingredientList.map(({recipe})=>{
                return(
                  <div key={recipe.label} className="Ingredient">
                        <span><b>{recipe.label}</b></span>
                        <img src={recipe.image} />
                      <div className="Steps">
                      {recipe.ingredientLines.map((step, index)=>{
                          return <p key={index}>{step}</p>;
                        })}
                      </div>
                  </div>
                )
              })}
            </div>
        </header>
    </div>
  );
}

export default App;
