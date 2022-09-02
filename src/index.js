
const searchBtn = document.getElementById("search-btn")
const mealList = document.getElementById("meal")
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

//add event listeners
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
