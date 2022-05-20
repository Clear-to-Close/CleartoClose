import createView from "../createView.js";

const LISTINGS_URL = "http://localhost:8080/api/users";

//Grab user id from login??

export default function ProfilePage(props) {
    //language=html
    console.log(props);
    return `
        
		<div class="h-1/4 w-1/3 bg-primary border-2 rounded-md border-secondary">
			<div class="m-1 pb-1 text-center">${props.loggedInUser.username}</div>
			<div class="m-1 pb-1 text-center">${props.loggedInUser.phoneNumber}</div>
			<div class="m-1 pb-1 text-center">
				${props.loggedInUser.userAddress.address} ${props.loggedInUser.userAddress.city}
				${props.loggedInUser.userAddress.state} ${props.loggedInUser.userAddress.zipCode}
			</div>
			<div class="m-1 pb-1 text-center">${props.loggedInUser.email}</div>
            <button id="btnUpdateProfile" type="submit" class="mx-1 my-2 rounded-sm shadow-xl text-white bg-callToAction">Update Profile</button>
		</div>`


}///END OF PROFILE FUNCTION


export function ProfileEvents() {
// grabBuyerOffers();
}///END OF PROFILE EVENTS

function grabBuyerOffers (){

createView("/findOffersByUser/{userId}")


}