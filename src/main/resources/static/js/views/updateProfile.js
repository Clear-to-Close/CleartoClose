import fetchData from "../fetchData.js";
import {getLoggedInUser} from "../utility.js";
import {getHeaders, getToken} from "../auth.js";
import createView from "../createView.js";

export function updateUserProfile() {
    $("#btnUpdateProfile").click(function (e) {
        e.preventDefault();
        //langauge=HTML
        $("#saveProfile-btn").removeClass("hidden")
        $("#cancel-btn").removeClass("hidden")
        $("#profileOffers").addClass("hidden")

        fetchData({
            state: `/api/users/searchByEmail?email=${getLoggedInUser()}`
        }, getHeaders())
            .then(user => {

                let userToUpdate = user.state.id;
                $("#saveProfile-btn").attr("data-id", userToUpdate);

                const updateHTML =
                    `<div>
                        <div class="text-center mx-1 my-2" >
            			<label for="firstname"></label>
            			<input type="text" class="form-control" id="firstname" value="${user.state.firstName}">
            		    </div>
            		    <div class="text-center mx-1 my-2">
            			<label for="lastname"></label>
            			<input type="text" class="form-control" id="lastname" value="${user.state.lastName}">
            		    </div>
            		     <div class="text-center mx-1 my-2">
            			<label for="email"></label>
            			<input type="text" class="form-control" id="email" value="${user.state.email}">
            		    </div>
            		     <div class="text-center mx-1 my-2">
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
    let userToUpdate = 4;

    $("#saveProfile-btn").click(function (e) {
        e.preventDefault();
        const updatedUser = {
            firstName: $("#firstname").val(),
            lastName: $("#lastname").val(),
            email: $("#email").val(),
            phoneNumber: $("#phone-number").val(),
            address: $("#newStreet").val(),
            apartmentNumber: $("#suite").val(),
            city: $("#newCity").val(),
            state: $("#newState").val(),
            zipCode: $("#newZip").val()

        }
        console.log(updatedUser);
        let request = {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(updatedUser)
        }
        fetch(`http://${BACKEND_HOST}:${PORT}/api/users/${userToUpdate}`, request)
            .then(response => {
                console.log(response.status);
                createView("/");
            })
    })


    //Pulled from Raymonds Repsitory
    const updatePassword = _ => {
        $("#change-pwd").click(e => {
            const curPass = $("#current-password").val()
            const newPass = $("#new-password").val()
            const confirmNewPass = $("#confirm-new-password").val()

            if (newPass === confirmNewPass) {
                let updatePasswordRequest = {
                    method: "PUT",
                    headers: {Authorization: getToken()}
                }
                fetch(`http://localhost:8080/api/users/updatePassword?currentPassword=${curPass}&newPassword=${newPass}`, updatePasswordRequest)
                    .then(_ => {
                        localStorage.clear();
                        createView("/")
                    })
            } else {
                $("#error-message").html("Passwords Do Not Match.")
            }
        })
    }

    $("#cancel-btn").click(function () {
        location.reload()
        console.log("cancel button clicked");
    })

}
