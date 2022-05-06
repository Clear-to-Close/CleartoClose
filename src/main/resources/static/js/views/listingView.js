(function (){

function requestListing(){
    console.log('here here')
    let url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?attomid=184713191";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("apikey", "2b1e86b638620bf2404521e6e9e1b19e");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }};

    xhr.send();


}


requestListing()


}) ///END OF IIFE

// $.get(url)
//     .setRequestHeader("accept", "application/json")
//     .setRequestHeader("apikey", `${ATTOM_API_KEY_CTC}`)
//     .then(function (res){
//         console.log(res)
//         return res.json
//     }).then(function (data){
//     console.log(data)
// })

