import './App.css';
import { useEffect, useState } from 'react';
import video from './recipe.mp4';
import MyRecipesComponent from './MyRecipesComponent';


function App() {

  const MY_ID = "b62361c6"; 
  const MY_KEY = "71989843e94c73e0cf3f048290c1edc2";


  const [mySearch, setMySearch] = useState(''); 
  const [myRecipes, setMyRecipes] = useState([]); 
  const [wordSubmitted, setWordSubmitted] = useState('avocado'); 

  useEffect(() => {                 
    const getRecipe = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
    const data = await response.json();
    setMyRecipes(data.hits);
  }
  getRecipe(); 
}, [wordSubmitted])

const myRecipeSearch = (e) => {
  setMySearch(e.target.value)
}

const finalSearch = (e) => {
  e.preventDefault(); 
  setWordSubmitted(mySearch); 
}


  return (
    <div className="App">
    <div className='container'>
    <video autoPlay muted loop>
    <source src= {video} type="video/mp4" />  
    </video>
    <h1>Find a Recipe</h1>
    </div>

    <div className='container'> 
      <form onSubmit={finalSearch}> 
        <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}>
        </input>
      <button>
        <img src="https://img.icons8.com/fluency/48/000000/fry.png" className='icons' alt='icon'/>
      </button>
      </form>
      </div>
      
  
    {myRecipes.map((element, index) => (
      <MyRecipesComponent key={index}
      label={element.recipe.label}
      image={element.recipe.image} 
      calories={element.recipe.calories}
      ingredients={element.recipe.ingredientLines}
      />
    ))}
    </div>

</div>
    
  ); 
}

export default App;
