export default function Home() {
//language=HTML
    return `
        <div class="bg-cover h-[calc(100vh-75px)] "
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="h-full w-full flex items-center justify-center bg-gray-500 bg-opacity-50">
                <form class="p-3 w-3/4 grid grid-cols-1 gap-1 flex items-center justify-center">
                  
                        <input type="text" name="search-address" id="search-address" class="py-2 my-2 rounded-sm p-1"
                               placeholder="Search an address">
                   
                  
                        <input type="text" name="search-city" id="search-city" class="py-2 my-2 rounded-sm p-1"
                               placeholder="City">
                   
                    
                        <input type="text" name="state" id="search-state" class="py-2 my-2 rounded-sm p-1"
                               placeholder="Select your state">
              
                    
                        <input type="text" name="search-zip" id="search-zip" class="py-2 my-2 rounded-sm p-1"
                               placeholder="Zipcode">
                 
                </form>
            </div>
        </div>
    `
}
