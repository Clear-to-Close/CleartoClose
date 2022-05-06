(function (){

        var url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?attomid=164898522";

        function requestListing() {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);

            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("apikey", "2b1e86b638620bf2404521e6e9e1b19e");
            xhr.responseType = 'json';
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    console.log(xhr.status);
                    console.log(xhr.response);
                }};

            xhr.send();
        }

        requestListing();

})();


