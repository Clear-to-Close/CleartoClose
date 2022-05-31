
const BASE_URI = `http://${BACKEND_HOST}:${PORT}`;
export function uploadDocuments(path, id, file){
         let formData = new FormData();

        formData.append('file', file.files[0])

        const uploadRequest = {
            method: 'POST',
            body: formData
        }

        fetch(`${BASE_URI}/api/s3/${path}/${id}`, uploadRequest)
            .then(results => console.log(results))
}

export function getLoggedInUser(){
    const token = localStorage.getItem(("access_token"))
    if (token) {
        return JSON.parse(atob(token.split(".")[1])).user_name
    } else {
        return null;
    }
}
