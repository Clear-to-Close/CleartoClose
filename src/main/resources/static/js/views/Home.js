export default function Home() {
//language=HTML
    return `
        <div class="bg-cover h-[calc(100vh-75px)]" style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"
             >
            <div class="h-full w-full bg-gray-500 flex items-center justify-center bg-opacity-50">
                <input type="text" name="search" id="searchListings" class="my-1 w-3/4" placeholder="Search For Your Dream Home">
            </div>
        </div>
    `
}

