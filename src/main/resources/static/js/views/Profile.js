
const LISTINGS_URL = "http://localhost:8080/api/profile";

let userId = null;

export default function ProfilePage(props){
    return `
        <div class="h-full w-full">
            <div class="m-1 pb-1 text-center">${props.username}</div>
            <div class="m-1 pb-1 text-center" id="listing#-${listing.id}">${props.username}</div>
            <div class="m-1 pb-1 text-center">${props.username}</div>
            <div class="m-1 pb-1 text-center">${props.username}</div>
            <div class="m-1 pb-1 text-center">${props.username},${props.username}, ${props.username} </div>
            <div class="m-1 pb-1 text-center">${listing.sellerAgent.firstName} ${listing.sellerAgent.lastName}</div>
            <div class="m-1 pb-1 text-center">${props.email}</div>
          
        </div>`


}///END OF PROFILE FUNCTION


export function ProfileEvents(){

}///END OF PROFILE EVENTS