(function (){

        var url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=78261&propertytype=RESIDENTIAL%20(NEC)&page=1&pagesize=10";

        function requestListing() {
            console.log('here here');
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);

            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("apikey", "2b1e86b638620bf2404521e6e9e1b19e");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    console.log(xhr.status);
                    console.log(xhr.responseText);
                }};

            xhr.send();
        }

        requestListing();

})();


