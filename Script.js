var api= "https://restcountries.com/v3.1/all";
var DATA
var c = document.getElementById("country")
let searchInputTxt = document.getElementById('search-input').value.trim();
async function printData(DATA){
    var Header = document.querySelector("#Header");
    var country = document.querySelector("#country");
    var Res = await fetch(api);
    var DATA=await Res.json();
    var unique = [];
    var distinct = [];
    for(var i = 0;i<10;i++){
        if(!unique[DATA[i].region]){
            distinct.push(DATA[i].region);
            unique[DATA[i].region]=1;
        }
        console.log(DATA);
    }
    console.log(distinct);
    document.getElementById("lst").innerHTML = `
    <select class="lst mr-sm-2"  onchange="getSelect(this.value)"
        <option>Please Select </option>
        ${distinct.map(country => `<option>${country} </option>` )}
    </select>
    `
    
}
var img = document.getElementById("count")
async function Get(reg){
    var i = 0;
    var Response = await fetch(api);
    DATA = await Response.json();
    var lst = []
    for(i=0; i<250;i++){      
        if(DATA[i].region == reg){  
            lst.push(DATA[i])
        }
    }
    var random =  Math.floor(Math.random() * lst.length-8);
    if(random<0){
        random =0
    }
    for(j=random ; j<random + 8 ; j++){
        var obj = lst[j].currencies;
        if(obj == null)
        {
            document.getElementById("currencies").innerHTML = 'not have'
        }   
        c.innerHTML += `
        <div class="col-12 col-md-6 col-lg-3 box" >
            <a href="#"> <img src ="${lst[j].flags.png}" alt="country" ></a>   
            <div class="contentt " >
                <h4>${lst[j].name.common} </h4>
                <p>${lst[j].capital} - ${lst[j].region}</p>          
                <p id="currencies">${obj[Object.keys(obj)[0]].name}(${obj[Object.keys(obj)[0]].symbol}) </p>
            </div>
        </div>
        `;
    }
   printData(DATA)
    console.log(DATA[0].region)
    // console.log("ok")
}
Get("Asia")
async function getSelect(e){
    var response = await fetch(`https://restcountries.com/v3.1/region/${e}`);
    var data = await response.json();
    c.innerHTML = ""
    Get(e);
    
}

