import createView from "../createView.js";

const HOME_URI = `http://${BACKEND_HOST}:${PORT}/api/listings`;

export default function Home() {
//language=HTML
    return `
        <div class="bg-cover min-h-[calc(100vh-90px)]"
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="min-h-[calc(100vh-90px)] w-full flex items-center bg-gray-500 bg-opacity-50">
                <form class="mx-3 w-full flex flex-col md:flex-row">
                    <input type="text" name="search-address" id="search-address"
                           class="search-form py-2 mx-1 my-2 rounded-sm p-1 flex md:w-1/2"
                           placeholder="Search an address">
                    <input type="text" name="search-city" id="search-city"
                           class="search-form py-2 mx-1 my-2 rounded-sm p-1 flex md:w-1/6"
                           placeholder="City">
                    <select name="state" id="select-state" class="search-form py-2 mx-1 my-2 rounded-sm p-1 flex md:w-1/6">
                        <option disabled selected>State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <input type="text" name="search-zip" id="search-zip"
                           class="search-form py-2 mx-1 my-2 rounded-sm p-1 flex  md:w-1/6"
                           placeholder="Zipcode">
                    <button type="submit" id="search-btn" class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Go!</button>
                </form>
            </div>
        </div>
    `
}


export function HomeEvents() {
submitForm();
}

function submitForm() {


    $('.search-form').on('keyup',  function (e) {
        let enterKey = e.key;
        if (enterKey === 'Enter') {
            e.preventDefault();
            $('#search-btn').click(function () {
                console.log('This button was clicked by pressing enter!');
            });
        }
    });

    $('#search-btn').on('click', function (e) {
        e.preventDefault();
        const listingData = {
            address: $('#search-address').val(),
            city: $('#search-city').val(),
            state: $('#select-state').val(),
            zip: $('#search-zip').val()
        }
        const {address, city, state, zip} = listingData;

        let request = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(`${HOME_URI}/searchByAddressAndZipCode?address=${address}&zipCode=${zip}`, request)
            .then(response => {
                response.json().then(address => createView(`/listing/${address.id}`))
            }).catch(error => {
            console.log(error.status);
        });
    });

}



