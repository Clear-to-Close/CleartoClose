export default function About() {
    //language=html
    return `
        <div class="bg-cover content-height"
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="content-height w-full flex flex-col items-center justify-center">
                <div class="bg-slate-200 opacity-95 border-slate-300 border-2 shadow-xl rounded-md w-3/4 h-full flex flex-col items-center justify-center p-3 my-3">
                    <div class="text-3xl font-medium text-center p-3 lg:text-4xl text-primary mb-4 mt-2">
                        About Clear to Close
                    </div>
                    <div id="about-body-1" class="flex justify-start text-lg m-3">
                        <p>Searching for a new home is hard in a seller's market. The frustration of taking the time away from work and waiting to hear back from realtors takes it toll when you lose out that contract of your ideal home. We've been there too.</p>
                    </div>
                    <div id="about-body-2" class="flex justify-start text-lg m-3">
                        <p>We went through that enough to decide to do something about it, so we developed an application design to optimize the buyer experience. Clear to Close allow you to search for your dream home and make offers on real listings with immediate feedback when a listing status has changed. Buyers and sellers can negotiate agreements through anonymous offers and counter offers all while staying in the know.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}