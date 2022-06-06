import fetchData from "./fetchData.js";

export const uploadDocuments = (path, id, file) => {
         let formData = new FormData();

        formData.append('file', file.files[0])

        const uploadRequest = {
            method: 'POST',
            body: formData
        }

        fetchData({ state: `/api/s3/${path}/${id}` }, uploadRequest)
            .then(response => {console.log(response)})
}

export const getLoggedInUser = _ => {
    const token = localStorage.getItem(("access_token"))
    if (token) {
        return JSON.parse(atob(token.split(".")[1])).user_name
    } else {
        return null;
    }
}

export const getMessage = (message, messageType) => {
    const $messageType =  $(`#${messageType}`);
    $messageType.hide();
    $messageType.html(`<div class="${messageType}">${message}</div>`);
    $messageType.slideDown(200).delay(4000).slideUp(200);
}

export const normalizeWords = word => {
    return word === undefined ? null : word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export const normalizeSentence = sentence => {
    if (sentence === undefined) {
        return null;
    } else {
        let normalizedSentence = [];
        sentence.split(" ").forEach(word => normalizedSentence.push(word[0].toUpperCase() + word.substring(1).toLowerCase()))
        return normalizedSentence.join(" ");
    }
}

export function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function standardDateFormat(sqlDate) {
    let month = sqlDate.substring(5,7);
    let day = sqlDate.substring(8,10);
    let year = sqlDate.substring(0,4);
    return `${month}/${day}/${year}`;
}
