
/**
 * Given an object containing all the required data for a given page, fetch all the needed data and return it as properties to pass to a view.
 * @param state
 * @param request
 * @returns {Promise<{}>}
 */
export default function fetchData(state, request) {
    localStorage.setItem("fetchStateFromLogin", JSON.stringify(state))
    const promises = [];
    //TODO: this needs to be moved to a prop file or env variable

    const baseUri = `http://${BACKEND_HOST}:${PORT}`;

    // console.log("got to fetch data");
    for (let pieceOfState of Object.keys(state)) {
        localStorage.setItem("baseUri", JSON.stringify(baseUri))
        localStorage.setItem("pieceOfState", state[pieceOfState])
        promises.push(
            fetch(baseUri + state[pieceOfState], request)
                .then(function (res) {
                    return res.json();
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
