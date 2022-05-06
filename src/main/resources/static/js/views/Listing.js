import createView from "../createView.js";



const LISTINGS_URL = "http://localhost:8080/api/listings";



export default function ListingIndex(props){
    // HTML
    return `
        <header>
            <h1>Listings Page</h1>
        </header>
        <main>
        <div class="container-fluid" >
                <div id = "allListingsDiv">
                    ${props.home.map(post => `<h3 id = "title-${home.id}">${home.address}</h3>
                     <p id = "address-${home.id}">${home.address}</p>
                     <p id = "home-city-${home.id}">${home.city}</p
                </div>`
          ).join('')} 
        </div>
        </div>
        </main>
   
`;}

export function ListingEvent() {
    submitNewListing();
    grabListingToEdit();

}///CLOSE LISTINGEVENT FUNCTION



    $.ajax("/data/homes.json")
        .done(onSuccess)
        .fail(onFail)
        .always(stopLoadingAnimation);

    function onSuccess(data, status, jqXhr) {
        console.log("successful load of information");
        data.forEach(function (home) {
            var listings = `
					<div class="card-body">
						<div class="homeAddress col-12">${home.address}</div>
						<div class="city col-12">${home.city}</div>
						<div class="state col-12">${home.state}</div>
						<div class="zipcode col-12">${home.zipcode}</div>
						<div class="footer d-flex justify-content-evenly">

						</div>
					</div>
</div>


`;
            $('#listings').append(listings);
        })


    }




////CODE BELOW RETURNS 200 FOR API CALL ON ATTOM API
    // var url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?attomid=164898522";
    //
    // function requestListing() {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open("GET", url);
    //
    //     xhr.setRequestHeader("accept", "application/json");
    //     xhr.setRequestHeader("apikey", "2b1e86b638620bf2404521e6e9e1b19e");
    //     xhr.responseType = 'json';
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === 4) {
    //             console.log(xhr.status);
    //             console.log(xhr.response);
    //         }};
    //
    //     xhr.send();
    // }
    // requestListing();
