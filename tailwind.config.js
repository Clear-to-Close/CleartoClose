module.exports = {
    important: true,
    content: ["./src/main/resources/static/index.html",
        "./src/main/resources/static/js/views/Login.js",
        "./src/main/resources/static/js/views/RealtorListing.js",
        "src/main/resources/static/js/views/Listing.js",
        "src/main/resources/static/js/views/Offers.js",
        "./src/main/resources/static/js/views/Home.js",
        "./src/main/resources/static/js/views/Profile.js",
        "./src/main/resources/static/js/views/partials/Footer.js"],
    theme: {
        extend: {
            width: {
                'input-width-sm' : '200px',
                'input-width-lg' : '300px'
            },
            colors: {
                'primary' : '#002254',
                'callToAction' : '#FFCA36'
            },
        },
    },
    plugins: [],
}
