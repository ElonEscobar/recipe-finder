const myCheckbox = document.getElementById("theme-checkbox");
const searchBtn = document.getElementById("search-btn")
const mealList = document.getElementById("meal")
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

//event listeners

//trigger dark-theme
myCheckbox.addEventListener("click",()=>{
    document.body.classList.toggle("darkTheme")

})

searchBtn.addEventListener("click",getMeal)
function getMeal(){
    let searchInput = document.getElementById("search-input").value.trim()
    console.log(searchInput)
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`
    async function getFood(){
        const responce = await fetch(apiUrl)
        const json = await(responce.json())
        console.log(json.meals)
        let html = ""
        if(json.meals){
            json.meals.forEach((meal)=>{
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            })
            mealList.classList.remove("notFound")
        }
        else{
            html = "Sorry We don\'t have that by the moment";
            mealList.classList.add("notFound")
        }
        mealList.innerHTML = html;

    }
    getFood()
}

//
mealList.addEventListener("click", findMealRecipe)
function findMealRecipe(e){
    e.preventDefault()
    console.log(e.target)
    if(e.target.classList.contains("recipe-btn")){
        let mealElement = e.target.parentElement.parentElement
        console.log(mealElement)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealElement.dataset.id}`)
        .then(responce => responce.json())
        .then(data => recipeModal(data.meals))
    }
}

function recipeModal(meal){
    console.log(meal)
    meal = meal[0]
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3 class = "recipe-instruct">Procedure:</h3>
            <p class = "instructions">${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>

    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('revealRecipe');
}

//
recipeCloseBtn.addEventListener("click",closeRecipe)
function closeRecipe(){
    const toRemove = document.querySelector(".meal-details")
    toRemove.classList.remove('revealRecipe')
    
}