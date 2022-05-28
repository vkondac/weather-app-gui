console.log('client side js file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) =>{

    response.json().then((data) => {
        console.log(data)
    })

})




const weatherFrom = document.querySelector('#formid')
const search = document.querySelector('#location')

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{

    response.json().then((data) => {
        if(data.error){
            document.getElementById("info1").innerHTML = "No such location found";
            document.getElementById("info2").innerHTML = "";
        }else{
            document.getElementById("info1").innerHTML = data.location;
            document.getElementById("info2").innerHTML = data.forecast;
    }
    })

})






})