/**
 * alerta.
 * Cria um alerta no padrão do Bootstrap 5
 * @param {string} mensagem Mensagem de Alerta
 * @param {string} tipo Tipo do Alerta do Bootstrap
 * @return {string} Retorna uma div com o conteúdo do alerta
 */
function alerta(mensagem, tipo) {
  let mensagemAlerta = document.getElementById("msgAlerta");
  let wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    tipo +
    ' alert-dismissible mt-2" role="alert">' +
    mensagem +
    '<button type="button" class="btn btn-outline-primary fechar" data-bs-dismiss="alert">' +
    '<ion-icon name="close-outline" class="text-info"></ion-icon>' +
    "</button></div>";
  mensagemAlerta.append(wrapper);
}

// -------------------------------------

// function alerta(mensagem, tipo) {
//   let mensagemAlerta = document.getElementById("msgAlerta");
//   let wrapper = document.createElement("div");
//   wrapper.innerHTML =
//     '<div class="modal fade" id="erroLoginModal" tabindex="-1" role="dialog" aria-labelledby="erroLoginLabel" aria-hidden="true">' +
//     '<div class="modal-dialog modal-dialog-centered" role="document">' +
//     '<div class="modal-content bg-dark">'
//     +
//     '<div class="modal-header">' +
//     '<h4 class="modal-title text-danger" id="erroLoginLabel"> <ion-icon name="sad-outline"></ion-icon>'
//     +
//     tipo 
//     +
//     '<div class="modal-body"><img src="images/erro.png" alt="imagem erro" class="rounded-5 erro"/>' +
//     '<br />' +
//     '<h5 class="text-info" style="text-align:center;">' 
//     +
//     mensagem 
//     +
//     '</h5> </div>' +
//     '<div class="modal-footer"><button type="button" class="btn btn-outline-primary text-white" data-bs-dismiss="modal">' +
//     '<ion-icon name="close-outline" class="text-danger"></ion-icon>' +
//     '"Fechar"' +
//     '</button></div></div></div></div>'
//   mensagemAlerta.append(wrapper);
// }
