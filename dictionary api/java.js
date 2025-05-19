const button=document.querySelector(".button");
const searchbox=document.querySelector(".searchbox");
const value=document.querySelector(".bodyval");
button.addEventListener('click',(e)=>{
    e.preventDefault();
   const sinput=searchbox.value.trim();
   console.log(sinput);
   dict(sinput);
   
})
const dict=async (q)=>{
    const data= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${q}`);
    const response= await data.json();
    const sinput=searchbox.value.trim();
    value.innerHTML=`<h1>${sinput}</h1>
                   <h2>${response[0].meanings[0].definitions[0].definition}</h2>
                    <p><h2>Example:</h2>${response[0].meanings[1].definitions[0].example}</p>
                    <h2>Synonyms:</h2>${response[0].meanings[1].synonyms}`
    
    
}