import createView from "../createView.js";

const HOME_URI = `http://${BACKEND_HOST}:${PORT}/api/listings`;

export default function Home() {
//language=HTML
    return `
        <div class="bg-cover min-h-[calc(100vh-90px)] relative"
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <ul class="nav nav-pills mb-3 absolute top-[35vh] left-0 w-full mx-4" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-searchByAddress-tab" data-bs-toggle="pill" data-bs-target="#searchFullAddress"
                            type="button" role="tab" aria-controls="pills-searchByAddress-tab" aria-selected="true">Address
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-searchByCity-tab" data-bs-toggle="pill" data-bs-target="#searchByCity" type="button" role="tab"
                            aria-controls="pills-searchByCity-tab" aria-selected="false">City
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-searchByState-tab" data-bs-toggle="pill" data-bs-target="#searchByState" type="button"
                            role="tab" aria-controls="pills-searchByState-tab" aria-selected="false">State
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-searchByZip-tab" data-bs-toggle="pill" data-bs-target="#searchByZip" type="button" role="tab"
                            aria-controls="pills-searchByZip-tab" aria-selected="false">Zip
                    </button>
                </li>
            </ul>

            <div class="tab-content min-h-[calc(100vh-90px)] w-full" id="pills-tabContent">
                <div id="searchFullAddress" role="tabpanel" class="tab-pane fade show active min-h-[calc(100vh-90px)]">
                    <div class="w-full min-h-[calc(100vh-90px)] flex items-center justify-center">
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

                <div id="searchByCity" role="tabpanel" class="tab-pane fade min-h-[calc(100vh-90px)] w-full">
                    <div class="w-full min-h-[calc(100vh-90px)] flex items-center justify-center">
                            <input type="text" name="search-by-city" id="search-by-city"
                                   class="search-form py-2 mx-1 my-2 md:flex-row rounded-sm p-1 flex w-1/2"
                                   placeholder="Search By City">
                            <button type="submit" id="search-btn" class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction w-1/4">Go!</button>
                        </form>
                    </div>
                </div>

                <div id="searchByState" role="tabpanel" class="tab-pane fade min-h-[calc(100vh-90px)] w-full">
                    <div class="w-full min-h-[calc(100vh-90px)] flex items-center justify-center">
                        <form class="mx-3 w-full flex flex-col md:flex-row">
                            <input type="text" name="search-by-state" id="search-by-state"
                                   class="search-form py-2 mx-1 my-2 md:flex-row rounded-sm p-1 flex w-1/2"
                                   placeholder="Search By State">
                            <button type="submit" id="search-btn" class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction w-1/4">Go!</button>
                        </form>
                    </div>
                </div>

                <div id="searchByZip" role="tabpanel" class="tab-pane fade min-h-[calc(100vh-90px)] w-full">
                    <div class="w-full min-h-[calc(100vh-90px)] flex items-center justify-center">
                        <form class="mx-3 w-full flex flex-col md:flex-row">
                            <input type="text" name="search-by-zip" id="search-by-zip"
                                   class="search-form py-2 mx-1 my-2 md:flex-row rounded-sm p-1 flex w-1/2"
                                   placeholder="Search By Zip Code">
                            <button type="submit" id="search-btn" class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction w-1/4">Go!</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
}


export function HomeEvents() {
    submitForm();
}

function submitForm() {


    $('.search-form').on('keyup', function (e) {
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
        const {address, city, state, zip} = listingData

        let request = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(`${HOME_URI}/searchByAddress?address=${address}&city=${city}&state=${state}&zip=${zip}`, request)
            .then(response => {
                response.json().then(address => createView(`/listing/${address.id}`))
            }).catch(error => {
            console.log(error.status);
        });
    });

}



