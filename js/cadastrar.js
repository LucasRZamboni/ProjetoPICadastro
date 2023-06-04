// Função para cadastrar os dados do formulário
function cadastrarDados() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var rg = document.getElementById('rg').value;
    var cpf = document.getElementById('cpf').value;
    var estadoCivil = document.getElementById('estadoCivil').value;

    // Cria uma nova linha na tabela com os dados cadastrados
    var table = document.getElementById('dadosTabela');
    var row = table.insertRow();
    row.innerHTML = `
      <td>${nome}</td>
      <td>${email}</td>
      <td>${telefone}</td>
      <td>${rg}</td>
      <td>${cpf}</td>
      <td>${estadoCivil}</td>
      <td>
        <button type="button" class="btn btn-primary btn-sm btn-editar">🔧 Editar</button>
        <button type="button" class="btn btn-danger btn-sm btn-apagar">💣 Apagar</button>
      </td>
    `;

    // Limpa os campos do formulário
    document.getElementById('cadastroForm').reset();
  }

  // Evento de clique no botão "Cadastrar"
  document.getElementById('cadastrar').addEventListener('click', function (event) {
    event.preventDefault();
    cadastrarDados();
  });

  // Evento de clique no botão "Refazer"
  document.getElementById('refazer').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('cadastroForm').reset();
  });

  // Evento de clique nos botões "Editar" e "Apagar"
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-editar')) {
      // Lógica para editar o registro
      var row = event.target.closest('tr');
      var cells = row.getElementsByTagName('td');

      // Preencha os campos do formulário com os dados da linha selecionada
      document.getElementById('nome').value = cells[0].innerText;
      document.getElementById('email').value = cells[1].innerText;
      document.getElementById('telefone').value = cells[2].innerText;
      document.getElementById('rg').value = cells[3].innerText;
      document.getElementById('cpf').value = cells[4].innerText;
      document.getElementById('estadoCivil').value = cells[5].innerText;

      // Remove a linha da tabela
      row.remove();
    } else if (event.target.classList.contains('btn-apagar')) {
      // Lógica para apagar o registro
      var row = event.target.closest('tr');

      // Remove a linha da tabela
      row.remove();
    }
  });