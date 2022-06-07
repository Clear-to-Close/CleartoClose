module.exports = {
    important: true,
    content: ["./src/main/resources/static/index.html",
        "./src/main/resources/static/js/views/Login.js",
        "./src/main/resources/static/js/views/RealtorListing.js",
        "./src/main/resources/static/js/views/Listing.js",
        "./src/main/resources/static/js/views/Offers.js",
        "./src/main/resources/static/js/views/Home.js",
        "./src/main/resources/static/js/views/Profile.js",
        "./src/main/resources/static/js/views/Loading.js",
        "./src/main/resources/static/js/views/AllListings.js",
        "./src/main/resources/static/js/views/Error404.js",
        "./src/main/resources/static/js/views/MakeOffer.js",
        "./src/main/resources/static/js/views/Register.js",
        "./src/main/resources/static/js/views/partials/Footer.js",
        "./src/main/resources/static/js/views/updateProfile.js",
        "./src/main/resources/static/js/views/partials/Navbar.js"],
    theme: {
        extend: {
            width: {
                'input-width-sm' : '200px',
                'input-width-lg' : '300px'
            },
            colors: {
                'primary' : '#002254',
                'callToAction' : '#FFCA36',
                'navLink' : 'rgba(255,255,255,.55)',
            },
        },
    },
    plugins: [],
}
