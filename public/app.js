var loc = document.getElementById("location")
var cin_date = document.getElementById("cin-date")
var cout_date = document.getElementById("cout-date")
var adults = document.getElementById("adults")
var child = document.getElementById("child")
var submit = document.getElementById("submit")
var resultsList = document.querySelector("#results")
const form = document.querySelector('#form');

form.addEventListener("submit",getResults)

function getResults(event){
    event.preventDefault();
    console.log(loc.value)
    console.log(cin_date.value)
    console.log(cout_date.value)

    console.log(adults.value)
    console.log(child.value)


    const u = "http://localhost:3000/hotels/"+loc.value+"/"+cin_date.value+"/"+cout_date.value
    var result = document.querySelector(".result")
    fetch(u)
        .then(response=>{
            response.json().then(data=>{
                console.log(data)
                data.map(result=>{  
                    const li = document.createElement('li')
                    const img = document.createElement('img')
                    const moreDet =  document.createElement('a')
                    img.src=result.image
                    moreDet.href =  result.link
                    moreDet.textContent = "Know More"

                    li.textContent=result.name +"          Rs."+result.price
                    li.appendChild(img)
                    li.appendChild(moreDet)

                    

                    resultsList.appendChild(li)
                })
            })
        })


}


