import fetchData from "./fetchData.js";
import {getLoggedInUser} from "./utility.js";
import {getHeaders} from "./auth.js";
import createView from "./createView.js";

export function updateUserProfile() {
    $("#btnUpdateProfile").click(function (e) {
        e.preventDefault();
        //langauge=HTML
        $("#saveProfile-btn").removeClass("hidden")
        $("#cancel-btn").removeClass("hidden")
        $("#profileOffers").addClass("hidden")
        const userId = localStorage.getItem("accessToken");
        fetchData({
            state: `/api/users/searchByEmail?email=${getLoggedInUser()}`
        }, getHeaders())
            .then(user => {
                console.log(user);
                // populateUpdateForm(res);
                const updateHTML =
                    `<div>
                        <div class="text-center mx-1 my-2" >
            			<label for="firstname"></label>
            			<input type="text" class="form-control" id="firstname" value="${user.state.firstName}">
            		    </div>
            		    <div class="text-center mx-1 my-2" id="offerId">
            			<label for="lastname"></label>
            			<input type="text" class="form-control" id="lastname" value="${user.state.lastName}">
            		    </div>
            		     <div class="text-center mx-1 my-2" id="offerId">
            			<label for="email"></label>
            			<input type="text" class="form-control" id="email" value="${user.state.email}">
            		    </div>
            		     <div class="text-center mx-1 my-2" id="offerId">
            			<label for="phone-number"></label>
            			<input type="text" class="form-control" id="phone-number" value="${user.state.phoneNumber}">
            		    </div>
            		    <label for="newStreet"></label>
            			<input type="text" class="form-control" id="newStreet" value="${user.state.userAddress?.address ?? ""}">
            		    </div>
            		    <label for="suite"></label>
            			<input type="text" class="form-control" id="suite" value="${user.state.userAddress?.apartmentNumber ?? ""}">
            		    </div>
            		    <label for="newCity"></label>
            			<input type="text" class="form-control" id="newCity" value="${user.state.userAddress?.city ?? ""}">
            		    </div>
            		    <label for="newState"></label>
            			<input type="text" class="form-control" id="newState" value="${user.state.userAddress?.state ?? ""}">
            		    </div>
            		    <label for="newZip"></label>
            			<input type="text" class="form-control" id="newZip" value="${user.state.userAddress?.zipCode ?? ""}">
            		    </div>
                    </div>`

                $("#updateProfileForm").html("").append(updateHTML);
            })
    })
    saveProfileUpdate();
}

function saveProfileUpdate() {
    $("#saveProfile-btn").click(function (e) {
        e.preventDefault();
        console.log("Profile updated")
        const updatedUser = {
            firstName: $("#firstname").val(),
            lastName: $("#lastname").val(),
            email: $("#email").val(),
            phoneNumber: $("#phone-number").val(),

            userAddress: {
                address: $("#newStreet").val(),
                apartmentNumber: $("#suite").val(),
                city: $("#newCity").val(),
                state: $("#newState").val(),
                zipCode: $("#newZip").val(),
            }
        }
        let request = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedUser)
        }
        fetch(`http://${BACKEND_HOST}:${PORT}/api/users/create`, request)
            .then(response => {
                console.log(response.status);
                createView("/");
            })
    })

    $("#cancel-btn").click(function () {
        location.reload()
        console.log("cancel button clicked");
    })

}
