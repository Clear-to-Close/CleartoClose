import fetchData from "../fetchData.js";
import {getLoggedInUser} from "../utility.js";
import {getHeaders} from "../auth.js";
import createView from "../createView.js";
import {validatePassword} from "./Register.js";


export function updateUserProfile() {
    $("#btnUpdateProfile").click(function (e) {
        //langauge=HTML
        fetchData({
            state: `/api/users/searchByEmail?email=${getLoggedInUser()}`
        }, getHeaders())
            .then(user => {
                //language=HTML
                const updateHTML =
                    `
						<div  class="w-full flex  flex-col justify-center justify-items-center items-center">
							<div id="profile-form" class="flex w-3/4 flex-col m-4 justify-items-center bg-cover content-height border-slate-300 border-2 shadow-xl rounded-md w-11/12 overflow-auto lg:w-1/2">
								<label for="firstname"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       id="firstname" value="${user.state.firstName}">

								<label for="lastname"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       id="lastname" value="${user.state.lastName}">

								<label for="email"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 control"
								       id="email" value="${user.state.email}">

								<label for="phone-number"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       id="phone-number" value="${user.state.phoneNumber}">


								<label for="newStreet"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       id="newStreet" placeholder="Street" value="${user.state.userAddress?.address ?? ""}">

								<label for="suite"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       id="suite" placeholder="Apt" value="${user.state.userAddress?.apartmentNumber ?? ""}">

								<label for="newCity"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       id="newCity" value="${user.state.userAddress?.city ?? ""}">


								<label for="newState"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       id="newState" value="${user.state.userAddress?.state ?? ""}">

								<label for="newZip"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       id="newZip" value="${user.state.userAddress?.zipCode ?? ""}">

								<label for="current-password" class="hidden"></label>
								<input id="current-password"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       name="current-password" type="password" placeholder="Current Password"/>

								<label for="password" class="hidden"></label>
								<input id="password"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       name="password" type="password"
								       pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{8,}$"
								       placeholder="Password"/>

								<div id="message" class="hidden font-medium">
									<h3>Password must contain the following:</h3>
									<p id="letter" class="invalid">A <b>lowercase</b> letter</p>
									<p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
									<p id="number" class="invalid">A <b>number</b></p>
									<p id="specialCharacter" class="invalid">A <b>special character</b></p>
									<p id="length" class="invalid">Minimum <b>8 characters</b></p>
								</div>

								<label for="confirm-password" class="hidden"></label>
								<input id="confirm-password"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-auto my-3 p-1 "
								       name="confirm-password" type="password" placeholder="Confirm Password"/>
                                
                                <div id="error-message" class=" w=3/4 justify-center text-primary bg-callToAction font-medium text-center"></div>

								<div class="flex flex-row flex-wrap justify-around" >
									<button id="save-profile-btn" type="button" data-id="${user.state.id}"
									        class="w-5/12 p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction font-medium">
										Save Profile
									</button>
									<button id="save-password-btn" type="button"
									        class="w-5/12 p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction font-medium">
										Update Password
									</button>
									<button id="cancel-btn" type="button" data-id="${user.state.id}"
									        class="w-full p-2 mx-2 my-2 rounded-md shadow-xl text-primary bg-callToAction font-medium">
										Cancel
									</button>
								</div>
								
							</div>
						</div>`
                $("#profileOffers").addClass("hidden")
                $("#updateProfileForm").html("").append(updateHTML);
            })
    })
    saveProfileUpdate();
    updatePassword();
    passwordInputHandler();
}

const passwordInputHandler = _ => { $('#password').keypress(_ => validatePassword())}

function saveProfileUpdate() {
    $("#updateProfileForm").click(function (e) {
        console.log("update clicked");
        if (e.target.getAttribute("id") === "cancel-btn") {
            location.reload()
        } else if (e.target.getAttribute("id") === "save-profile-btn") {

             let userToUpdate = $("#save-profile-btn").data("id")

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

            fetchData({server: `/api/users/editUser/${userToUpdate}`}, request)
                .then(response => {
                    console.log(response);
                    createView({profile: {profile: `/api/users/${userToUpdate}`}})
                })
        }
    })
}

function updatePassword (){
    $("#updateProfileForm").click(function (e) {

        if(e.target.getAttribute('id')=== 'save-password-btn'){
            console.log("save password clicked")

            let currentPassword = $('#current-password').val();
            let newPassword = $('#password').val();
            let confirmPassword = $('#confirm-password').val();

            if(newPassword === confirmPassword){

                let passwordRequest = {
                    method: "PUT",
                    headers: getHeaders(),
                }

                fetchData({server: `/api/users/update_password?currentPassword=${currentPassword}&newPassword=${newPassword}`}, passwordRequest)
                    .then(response => {
                        console.log(response);
                    createView({logout: {logout: `/api/login`}})
                });

            }else {
                $("#error-message").html("Passwords Do Not Match.")
            }

        }

    })
}
