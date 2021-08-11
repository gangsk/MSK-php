$('document').ready(function () {
    $('#inputNewClasse').val('');
    $('#idClasse').change(function () {
        if($('#idClasse option:selected').val() == 'new'){
            $('#newClasse').slideDown(1000);
        }else{
            $('#newClasse').slideUp(1000);
        }
    });
});