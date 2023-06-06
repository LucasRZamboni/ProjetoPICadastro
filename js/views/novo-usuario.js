
// Atalhos para os elementos DOM - Document Object Model
const formNovoUsuario = document.getElementById('formCadastro')

//Adiciona um Listener no formulário
formNovoUsuario.addEventListener('submit', (event) => {
    const email = document.getElementById('emailCadastro').value
    const senha1 = document.getElementById('passwordCadastro').value
    const senha = document.getElementById('confirm-password').value
    event.preventDefault()

    if (senha1 === senha) {
        novoUsuario(email, senha)
    }
    else {
        alerta(`🤨 Parece que a senha não é a mesma!!`, 'danger')
    }
}
)