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
                            <label for="firstname"></label>
                            <input type="text" class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 " id="firstname" value="${user.state.firstName}">

                            <label for="lastname"></label>
                            <input type="text" class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 " id="lastname" value="${user.state.lastName}">

                            <label for="email"></label>
                            <input type="text" class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 control" id="email" value="${user.state.email}">

                            <label for="phone-number"></label>
                            <input type="text" class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 " id="phone-number" value="${user.state.phoneNumber}">


                            <label for="newStreet"></label>
                            <input type="text" class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 " id="newStreet" value="${user.state.userAddress?.address ?? ""}">

                            <label for="suite"></label>
                            <input type="text" class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 " id="suite" value="${user.state.userAddress?.apartmentNumber ?? ""}">

                            <label for="newCity"></label>
                            <input type="text" class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 " id="newCity" value="${user.state.userAddress?.city ?? ""}">


                            <label for="newState"></label>
                            <input type="text" class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 " id="newState" value="${user.state.userAddress?.state ?? ""}">

                            <label for="newZip"></label>
                            <input type="text" class="bg-white border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full md:w-1/2 mx-1 my-3 p-1 " id="newZip" value="${user.state.userAddress?.zipCode ?? ""}">

                            <div class="flex justify-between">
                                <button id="saveProfile-btn" type="button" data-id="${user.state.id}"
                                        class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction">Save
                                </button>
                                <button id="cancel-btn" type="button"
                                        class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-primary bg-callToAction">Cancel
                                </button>
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
