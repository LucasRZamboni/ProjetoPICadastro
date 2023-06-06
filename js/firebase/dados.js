/**
 * obtemDados.
 * Obtem dados da collection a partir do Firebase.
 * @param {string} collection - Nome da collection no Firebase
 * @return {object} - Uma tabela com os dados obtidos
 */
async function obtemDados(collection) {
  let spinner = document.getElementById('carregandoDados')
  let tabela = document.getElementById('tabelaDados')
  await firebase.database().ref(collection).orderByChild('nome').on('value', (snapshot) => {
    tabela.innerHTML = ''
    let cabecalho = tabela.insertRow()
    cabecalho.className = 'bg-primary text-light'
    cabecalho.insertCell().textContent = 'Nome'
    cabecalho.insertCell().textContent = 'Email'
    cabecalho.insertCell().textContent = 'Telefone'
    cabecalho.insertCell().textContent = 'RG'
    cabecalho.insertCell().textContent = 'CPF'
    cabecalho.insertCell().textContent = 'Estado Civil'
    cabecalho.insertCell().innerHTML = 'Ações'

    snapshot.forEach(item => {
      // Dados do Firebase
      let db = item.ref._delegate._path.pieces_[0] //collection
      let id = item.ref._delegate._path.pieces_[1] //id do registro   
      //Criando as novas linhas na tabela
      let novaLinha = tabela.insertRow()
      novaLinha.insertCell().innerHTML = '<small>' + item.val().nome + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().email + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().telefone + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().rg + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().cpf + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().civil + '</small>'
      novaLinha.insertCell().innerHTML = `<button class='btn btn-sm btn-danger' onclick=remover('${db}','${id}') title="Excluir">✖️</button>
      <button class='btn btn-sm btn-warning' onclick=carregaDadosAlteracao('${db}','${id}');alterar(event, 'inquilinos') title="Editar">🔨</button>`

    })
    let rodape = tabela.insertRow()
    rodape.className = 'bg-primary'
    rodape.insertCell().colSpan = "6"
    rodape.insertCell().innerHTML = totalRegistros(collection)

  })
  spinner.classList.add('d-none') //oculta o carregando...
}

/**
 * obtemDados.
 * Obtem dados da collection a partir do Firebase.
 * @param {string} db - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {object} - Os dados do registro serão vinculados aos inputs do formulário.
 */

async function carregaDadosAlteracao(db, id) {
  await firebase.database().ref(db + '/' + id).on('value', (snapshot) => {
    document.getElementById('id').value = id
    document.getElementById('nome').value = snapshot.val().nome
    document.getElementById('email').value = snapshot.val().email
    document.getElementById('telefone').value = snapshot.val().telefone
    document.getElementById('rg').value = snapshot.val().rg
    document.getElementById('cpf').value = snapshot.val().cpf
    document.getElementById('estadoCivil').value = snapshot.val().civil
  })

  document.getElementById('nome').focus() //Definimos o foco no campo nome
}



/**
 * incluir.
 * Inclui os dados do formulário na collection do Firebase.
 * @param {object} event - Evento do objeto clicado
 * @param {string} collection - Nome da collection no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */

function salvar(event, collection) {
  event.preventDefault() // evita que o formulário seja recarregado
  //Verifica os campos obrigatórios


  // alert(document.getElementById('estadoCivil').value)
  if (document.getElementById('nome').value === '') { alerta('😑 É obrigatório informar o nome!', 'warning') }
  else if (document.getElementById('email').value === '') { alerta('😐 É obrigatório informar o email!', 'warning') }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { alerta('😒 O email informado é inválido!', 'warning') }
  else if (document.getElementById('telefone').value === '') { alerta('😵 É obrigatório informar o telefone!', 'warning') }
  else if (document.getElementById('rg').value === '') { alerta('🙁 É obrigatório informar o rg!', 'warning') }
  else if (document.getElementById('cpf').value === '') { alerta('😧 É obrigatório informar o cpf!', 'warning') }
  else if (!/^([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})$/.test(cpf.value)) { alerta('😒 O CPF informado é inválido!', 'warning') }
  else if (document.getElementById('estadoCivil').value === '') { alerta('😏 É obrigatório informar o estado civil!', 'warning') }
  else if (document.getElementById('id').value !== '') { alterar(event, collection) }
  else { incluir(event, collection) }
  // setTimeout(function () {
  //   location.reload(true);
  // }, 3000);
}

async function incluir(event, collection) {
  let usuarioAtual = firebase.auth().currentUser
  let botaoSalvar = document.getElementById('btnSalvar')
  botaoSalvar.innerText = 'Aguarde...'
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref(collection).push({
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    rg: document.getElementById('rg').value,
    cpf: document.getElementById('cpf').value,
    civil: document.getElementById('estadoCivil').value,
    usuarioInclusao: {
      uid: usuarioAtual.uid,
      nome: usuarioAtual.displayName,
      urlImagem: usuarioAtual.photoURL,
      email: usuarioAtual.email,
      dataInclusao: new Date()
    }
  })
    .then(() => {
      alerta(`😎 Registro incluído com sucesso!`, 'success')
      document.getElementById('cadastroForm').reset() //limpa o form
      //Limpamos o avatar do cliente
      botaoSalvar.innerHTML = '🚑 Salvar'
    })
    .catch(error => {
      alerta('😖 Falha ao incluir: ' + error.message, 'danger')
    })

}

async function alterar(event, collection) {
  let usuarioAtual = firebase.auth().currentUser
  let botaoSalvar = document.getElementById('btnSalvar')
  botaoSalvar.innerText = 'Aguarde...'
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref().child(collection + '/' + values.id).update({
  //  nome: values.nome,
  //  email: values.email,
  //  rg: values.rg,
  //  cpf: values.cpf,
  //  civil: values.civil,
    
    //-------------------------------------------------teste
     nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    rg: document.getElementById('rg').value,
    cpf: document.getElementById('cpf').value,
    civil: document.getElementById('estadoCivil').value,
    
    
    usuarioInclusao: {
      uid: usuarioAtual.uid,
      nome: usuarioAtual.displayName,
      urlImagem: usuarioAtual.photoURL,
      email: usuarioAtual.email,
      dataInclusao: new Date()
    }
  })
    .then(() => {
      alerta('🤔 Registro alterado com sucesso!', 'success')
      document.getElementById('cadastroForm').reset()
      document.getElementById('id').value = ''
      botaoSalvar.innerHTML = '🚑 Salvar'
    })
    .catch(error => {
      console.error(error.code)
      console.error(error.message)
      alerta('😖 Falha ao alterar: ' + error.message, 'danger')
    })
}

/**
 * remover.
 * Remove os dados da collection a partir do id passado.
 * @param {string} db - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */
async function remover(db, id) {
  if (window.confirm(' 😟 Confirma a exclusão do registro?')) {
    let dadoExclusao = await firebase.database().ref().child(db + '/' + id)
    dadoExclusao.remove()
      .then(() => {
        alerta('😓 Registro removido com sucesso!', 'warning')
        //Location.reload()
      })
      .catch(error => {
        console.error(error.code)
        console.error(error.message)
        alerta('😡 Falha ao excluir: ' + error.message, 'danger')
        //Location.reload()
      })
  }
}


/**
 * totalRegistros
 * Retornar a contagem do total de registros da collection informada
 * @param {string} collection - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */

function totalRegistros(collection) {
  var retorno = '...'
  firebase.database().ref(collection).on('value', (snap) => {
    if (snap.numChildren() === 0) {
      retorno = '😕 Ainda não tem ninguem cadastrado por aqui!'
    } else {
      retorno = `Total: <span class="badge bg-secondary"> ${snap.numChildren()} </span>`
    }
  })
  return retorno
}

/**
 * Formata o valor do campo de CPF com pontos e traço enquanto o usuário digita os dados.
 *
 * @param {object} campo - O campo de entrada do CPF.
 */
function formatarCPF(campo) {
  // Remove caracteres não numéricos
  var cpf = campo.value.replace(/\D/g, '');

  // Adiciona pontos e traço conforme o usuário digita
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  // Atualiza o valor do campo
  campo.value = cpf;
}

function formatarRG(campo) {
  // Remove caracteres não numéricos
  var rg = campo.value.replace(/\D/g, '');

  // Adiciona pontos e traço conforme o usuário digita
  rg = rg.replace(/(\d{2})(\d)/, '$1.$2');
  rg = rg.replace(/(\d{3})(\d)/, '$1.$2');
  rg = rg.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  // Verifica se o último dígito é X e adiciona a string de retorno
  if (campo.value.charAt(campo.value.length - 1).toUpperCase() === 'X') {
    rg += '-X';
  }

  // Atualiza o valor do campo
  campo.value = rg;
}

// function formatarRG(campo) {
//   let rg = campo.value.replace(/\D/g, '');

//   if (rg.length >= 8 && rg.length <= 9) {
//     rg = rg.replace(/^(\d{2})(\d{3})(\d{3})(\d|[Xx])$/, '$1.$2.$3-$4');
//   }

//   campo.value = rg;
// }


function formatarTel(campo) {
  // Remove caracteres não numéricos
  var tel = campo.value.replace(/\D/g, '');

  // Adiciona pontos e traço conforme o usuário digita
  tel = tel.replace(/(\d{2})(\d)/, '($1)$2');
  tel = tel.replace(/(\d{5})(\d)/, '$1-$2');
  tel = tel.replace(/(\d{4})(\d)/, '$1$2');


  // Atualiza o valor do campo
  campo.value = tel;
}
