export default function Home() {
//language=HTML
    return `
        <div class="bg-cover h-[calc(100vh-75px)] "
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="h-full w-full flex items-center  bg-gray-500 bg-opacity-50">
                <form class="mx-3 w-full flex flex-col md:flex-row">
                    <input type="text" name="search-address" id="search-address"
                           class="py-2 mx-1 my-2 rounded-sm p-1 flex md:w-1/2"
                           placeholder="Search an address">
                    <input type="text" name="search-city" id="search-city"
                           class="py-2 mx-1 my-2 rounded-sm p-1 flex md:w-1/6"
                           placeholder="City">
                    <select name="state" id="select-state" class="py-2 mx-1 my-2 rounded-sm p-1 flex md:w-1/6">
                        <option disabled selected>State</option>
                        <option value="Al">Alabama</option>
                    </select>
                    <input type="text" name="search-zip" id="search-zip"
                           class="py-2 mx-1 my-2 rounded-sm p-1 flex  md:w-1/6"
                           placeholder="Zipcode">
                </form>
            </div>
        </div>
    `
}

