 const searchbox=document.querySelector(".searchbox");
const searchbtn=document.querySelector("#butt");
let body=document.querySelector("body");
const recipeDetailsContent=document.querySelector(".recipe-details-content");
const recipeclosebtn=document.querySelector(".recipe-close-btn");

const recipecontainer= document.querySelector(".recipe-container");
const fetchrecipe=async (q)=>{
    recipecontainer.innerHTML=' Fetching data.........';
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
    const responce= await data.json();
  console.log(responce);
    recipecontainer.innerHTML='';
    responce.meals.forEach(meal=>{
        const recipediv=document.createElement('div');
        recipediv.classList.add('recipe');
    
        recipediv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><i>${meal.strArea} ${meal.strCategory}</i></p>
        `
        const button= document.createElement('button');
        button.textContent="View Recipe";
        button.classList.add("on");
        recipediv.appendChild(button);

        button.addEventListener('click',()=>{
            openrecipe(meal);
        })
        console.log(meal);
        recipecontainer.appendChild(recipediv);
    })
}

const  openrecipe =(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
    <div>
       <h3>Intructions:</h3>
       <p class="recipeInstruction">${meal.strInstructions}</p>
    `
    recipeDetailsContent.parentElement.style.display="block";
}


const fetchIngredients=(meal)=>{
    let ingre="";
    for(let i=1;i<=20;i++){
        const ing=meal[`strIngredient${i}`];
        if(ing){
            const measure=meal[`strMeasure${i}`];
            ingre+=`<li>${measure} ${ing}</li>`
        }
        else{
            break;
        }
    }
    return ingre;
}

recipeclosebtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
})


searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchinput=searchbox.value.trim();
    fetchrecipe(searchinput);

})
 