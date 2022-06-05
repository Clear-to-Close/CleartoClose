import fetchData from "../fetchData.js";
import {getLoggedInUser} from "../utility.js";
import {getHeaders} from "../auth.js";
import createView from "../createView.js";

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
						<div class="w-full">
							<div class="flex  flex-col justify-center items-center bg-cover content-height">
								<label for="firstname"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
								       id="firstname" value="${user.state.firstName}">

								<label for="lastname"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
								       id="lastname" value="${user.state.lastName}">

								<label for="email"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 control"
								       id="email" value="${user.state.email}">

								<label for="phone-number"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
								       id="phone-number" value="${user.state.phoneNumber}">


								<label for="newStreet"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
								       id="newStreet" value="${user.state.userAddress?.address ?? ""}">

								<label for="suite"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
								       id="suite" value="${user.state.userAddress?.apartmentNumber ?? ""}">

								<label for="newCity"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
								       id="newCity" value="${user.state.userAddress?.city ?? ""}">


								<label for="newState"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
								       id="newState" value="${user.state.userAddress?.state ?? ""}">

								<label for="newZip"></label>
								<input type="text"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
								       id="newZip" value="${user.state.userAddress?.zipCode ?? ""}">

								<label for="password" class="px-[10px] my-auto"></label>
								<input id="password"
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
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
								       class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 "
								       name="confirm-password" type="password" placeholder="Confirm Password"/>

								<div class="flex">
									<button id="saveProfile-btn" type="button" data-id="${user.state.id}"
									        class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction font-medium">
										Save Profile
									</button>
									<button id="cancel-btn" type="button"
									        class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction font-medium">
										Update Password
									</button>
									<button id="cancel-btn"
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
}

function saveProfileUpdate() {
    $("#updateProfileForm").click(function (e) {
        if (e.target.getAttribute("id") === "cancel-btn") {
            location.reload()
        } else if (e.target.getAttribute("id") === "saveProfile-btn") {

            const userToUpdate = $("#saveProfile-btn").data("id")

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
                    createView(`/profile/api/users/${userToUpdate}`);
                })
        }
    })
}
