module.exports = {
    important: true,
    content: ["./src/main/resources/static/index.html",
        "./src/main/resources/static/js/views/Login.js",
        "./src/main/resources/static/js/views/RealtorListing.js",
        "./src/main/resources/static/js/views/Listing.js",
        "./src/main/resources/static/js/views/Offers.js",
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
                'non-photo-blue' : '#9ad5e7',
                'blue-ncs' : '#0592cd',
                'primary' : '#b1becd',
                'secondary' : '#9ab1c2',
                'callToAction' : '#8080d8'
            },
            backgroundImage: {
                'homeImage': "url('/src/main/resources/images/homeImage.jpeg"
            }
        },
    },
    plugins: [],
}
