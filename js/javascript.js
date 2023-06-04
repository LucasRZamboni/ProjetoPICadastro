var showPasswordButton = document.getElementById("show-password-button");
var showPasswordButtonLogin = document.getElementById("show-password-buttonLogin");
var showConfirmPasswordButton = document.getElementById("show-confirm-password-button");
var passwordInput = document.getElementById("passwordCadastro");
var passwordInputLogin = document.getElementById("passwordLogin");
var confirmPasswordInput = document.getElementById("confirm-password");

showPasswordButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordButton.innerHTML = '<ion-icon name="eye-off-outline" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Ocultar senha"></ion-icon>';
    } else {
        passwordInput.type = "password";
        showPasswordButton.innerHTML = '<ion-icon name="eye-outline" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Ver senha">';
    }
});

showConfirmPasswordButton.addEventListener("click", function () {
    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        showConfirmPasswordButton.innerHTML = '<ion-icon name="eye-off-outline" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Ocultar senha"></ion-icon>';
    } else {
        confirmPasswordInput.type = "password";
        showConfirmPasswordButton.innerHTML = '<ion-icon name="eye-outline" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Ver senha">';
    }
});

showPasswordButtonLogin.addEventListener("click", function () {
    if (passwordInputLogin.type === "password") {
        passwordInputLogin.type = "text";
        showPasswordButtonLogin.innerHTML = '<ion-icon name="eye-off-outline" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Ocultar senha"></ion-icon>';
    } else {
        passwordInputLogin.type = "password";
        showPasswordButtonLogin.innerHTML = '<ion-icon name="eye-outline" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Ver senha">';
    }
});


// -----------------------------------------

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});