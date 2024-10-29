
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const mealResultTitle = document.querySelector(".meal-result .title");
const mainContent = document.getElementById("main-content");

function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim();
    const errorMsg = document.getElementById("error-msg"); 
    const latestRecipesSection = document.getElementById("latest-recipes");  
    const faqSection = document.getElementById("faq-section");
    const footer = document.getElementById("footer");
    if (searchInputTxt === "") {
        errorMsg.style.display = "block";  
        return;
    } else {
        errorMsg.style.display = "none";  
    }
    

    mainContent.style.display = "none"; 
    latestRecipesSection.style.display = "none";  
    faqSection.style.display = "none";
    footer.style.display = "none";

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then((response) => response.json())
        .then((data) => {
            let html = "";  

            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food" />
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove("notFound");
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add("notFound");
            }
            mealList.innerHTML = html;  
        });

    mealResultTitle.style.visibility = "visible"; 
}

function getMealRecipe(e) {
    e.preventDefault();
    
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.closest(".meal-item");

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then((response) => response.json())
            .then((data) => {
                let meal = data.meals[0]; 
                let html = `
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3>Instructions:</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="recipe-link">
                        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                    </div>
                `;
                mealDetailsContent.innerHTML = html;
                mealDetailsContent.parentElement.classList.add("showRecipe");
            });
    }
}
const subscribeBtn = document.getElementById('subscribe-btn');
const popupForm = document.getElementById('popup-form');
const closePopup = document.getElementById('close-popup');

subscribeBtn.addEventListener('click', function() {
    popupForm.style.display = 'block';
});
closePopup.addEventListener('click', function() {
    popupForm.style.display = 'none';
});

function validate(){
    let email = document.getElementById("email").value;
    if(email===""){
        alert("Please enter your email.");
    }
    else if(!email.includes("@")){
        alert("please enter valid email adress!");

    }
}

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.display = (answer.style.display === "block") ? "none" : "block";
    });
});

recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
});


const darkModeButton = document.getElementById('dark-mode-btn');
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
}
function displayDateTime() {
    const now = new Date();
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true  
    };
    const formattedDate = now.toLocaleString('en-US', options);
    document.getElementById('date-time').innerHTML = formattedDate;
}
setInterval(displayDateTime, 1000);

darkModeButton.addEventListener('click', toggleDarkMode);
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
