const HOME_URI = 'http://localhost:8080/';

export default function Home() {
//language=HTML
    return `
        <div class="bg-cover h-[calc(100vh-75px)] "
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="h-full w-full flex items-center  bg-gray-500 bg-opacity-50">
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
                    <button type="submit" id="search-btn" class="p-2 mx-1 my-2 rounded-md border-2 border-gray-500 shadow-xl text-white bg-non-photo-blue">Go!</button>
                </form>
            </div>
        </div>
    `
}


export function HomeEvents() {
submitForm();

}

function submitForm() {

    $('#search-btn').on('click', function (e) {
        let enterKey = e.key;
        // if (enterKey === 'Enter') {

            const listingData = {
                address: $('#search-address').val(),
                city: $('#search-city').val(),
                state: $('#select-state').val(),
                zip: $('#search-zip').val()
            }

            const {address, city, state, zip} = listingData;
            console.log(address);
            console.log(city);
            console.log(state);
            console.log(zip);
        // }
    })

}



