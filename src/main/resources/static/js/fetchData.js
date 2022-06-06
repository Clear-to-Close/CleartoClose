/**
 * Given an object containing all the required data for a given page, fetch all the needed data and return it as properties to pass to a view.
 * @param state
 * @param request
 * @returns {Promise<{}>}
 * hi casey
 */
export default function fetchData(state, request) {
    const promises = [];
    //TODO: this needs to be moved to a prop file or env variable

    const baseUri = `http://${BACKEND_HOST}:${PORT}`;

    for (let pieceOfState of Object.keys(state)) {

        promises.push(
            fetch(baseUri + state[pieceOfState], request)
                .then(function (res) {
                    console.log(res.status)
                    if (res.status === 400) {
                        return res.status
                    }
                    if (request.method === "POST" && typeof request.body === "string" && request.body.includes("grant")) {
                        return res.json()
                    } else if (request.method === "POST" || request.method === "PUT" || request.method === "PATCH") {
                        console.log(res)
                        return res
                    } else {
                        return res.json()
                    }
                }));
    }

    return Promise.all(promises).then(propsData => {
        const props = {};
        Object.keys(state).forEach((key, index) => {
            props[key] = propsData[index];
        });
        return props;
    });
}
