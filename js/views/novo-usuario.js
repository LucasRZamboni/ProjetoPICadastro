
// Atalhos para os elementos DOM - Document Object Model
const formNovoUsuario = document.getElementById('formCadastro')

//Adiciona um Listener no formulário
formNovoUsuario.addEventListener('submit', (event) => {
 const email = document.getElementById('emailCadastro').value
 const senha = document.getElementById('confirm-password').value
 event.preventDefault()
novoUsuario(email, senha)
}
)