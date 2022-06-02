import createView from "../createView.js";

export default function Home() {
//language=HTML
    return `
        <div class="bg-cover content-height"
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="content-height w-full flex flex-col items-center justify-center">
                <div class="bg-slate-200 opacity-95 border-slate-300 border-2 shadow-xl rounded-md w-3/4 flex flex-col items-center justify-center p-3">
                    <div class="text-3xl font-medium text-center p-3 lg:text-4xl text-primary mb-4 mt-2">
                        Search For Your Dream Home
                    </div>
                    <form class="mx-3 w-full flex flex-col lg:flex-row mb-2">
                        <input type="text" name="search-address" id="search-address"
                               class="search-form grow bg-slate-200 mx-1 my-3 p-1 border-b-2 border-callToAction outline-0 placeholder-primary font-medium"
                               placeholder="Address">
                        <input type="text" name="search-city" id="search-city"
                               class="search-form bg-slate-200 mx-1 my-3 p-1 border-b-2 border-callToAction outline-0 placeholder-primary font-medium"
                               placeholder="City">
                        <select name="state" id="select-state"
                                class="search-form bg-slate-200 mx-1 my-3 p-1 border-b-2 border-callToAction outline-0 placeholder-primary font-medium">
                            <option disabled selected>State</option>
                            <option value="AL" >Alabama</option>
                            <option value="AK" >Alaska</option>
                            <option value="AZ" >Arizona</option>
                            <option value="AR" >Arkansas</option>
                            <option value="CA" >California</option>
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
                               class="search-form bg-slate-200 mx-1 my-3 p-1 border-b-2 border-callToAction outline-0 placeholder-primary font-medium"
                               placeholder="Zipcode">
                    </form>
                    <button type="button"
                            class="text-primary font-medium w-full lg:w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl bg-callToAction search-btn">Find My
                        Dream Home
                    </button>
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
            $('.search-btn').click();
        }
    });

    $('.search-btn').click(e => {
        e.preventDefault();
        const address = $('#search-address').val()
        const city = $('#search-city').val()
        const state = $('#select-state').val()
        const zip = $('#search-zip').val()

        if (address !== "" && city !== "" && state !== "" && zip !== "") {
            createView(`/listing/listings/searchByFullAddress?address=${address}&city=${city}&state=${state}&zip=${zip}`)
        } else if (city !== "" && state !== "") {
            createView(`/allListings/listings/search?city=${city}&state=${state}`)
        } else if (city !== "") {
            createView(`/allListings/listings/search?city=${city}`)
        } else if (state !== "") {
            createView(`/allListings/listings/search?state=${state}`)
        } else if (zip !== "") {
            createView(`/allListings/listings/search?zip=${zip}`)
        }
    });
}



