export function getMessage(message, messageType){
    $(`#${messageType}`).hide();
    $(`#${messageType}`).html(`<div class="${messageType}">${message}</div>`);
    $(`#${messageType}`).slideDown(200).delay(4000).slideUp();
}