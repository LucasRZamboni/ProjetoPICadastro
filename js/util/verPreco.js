// $(document).ready(function () {
//     $('.ver-preco-link').click(function () {
//         var cardIndex = $(this).data('card-index');
//         var targetRow = $('#tabela-dados tbody tr[data-card-index="' + cardIndex + '"]');

//         targetRow.removeClass('table-primary');
//         targetRow.addClass('table-success');

//     });
// });


$(document).ready(function () {
    var currentCardIndex = -1; // Variável para armazenar o índice do card atualmente selecionado

    $('.ver-preco-link').click(function () {
        var cardIndex = $(this).data('card-index'); // Obtém o índice do card clicado
        var targetRow = $('#tabela-dados tbody tr[data-card-index="' + cardIndex + '"]'); // Obtém a linha da tabela relacionada ao card clicado
        var currentTargetRow = $('#tabela-dados tbody tr[data-card-index="' + currentCardIndex + '"]'); // Obtém a linha da tabela relacionada ao card atualmente selecionado

        // Reverte a modificação no card atualmente selecionado, se houver
        if (currentTargetRow.length > 0) {
            currentTargetRow.removeClass('table-success');
            currentTargetRow.addClass('table-primary');
        }

        // Aplica a modificação no card clicado
        targetRow.removeClass('table-primary');
        targetRow.addClass('table-success');

        currentCardIndex = cardIndex; // Atualiza o índice do card atualmente selecionado
    });
});

