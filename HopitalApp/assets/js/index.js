function init(){
    $.ajax({
        type: 'post',
        url: 'ajax/getEtatEtudiant.php',
        dataType: 'json',
        data: {'arg':'all'},
        success: function (data) {
            for (var x in data) {
                $('#ligne_'+data[x]['id']).addClass('opac bg-dark text-white');
                $('#btn_'+data[x]['id']).addClass('disabled');
            }
        }
    });
}
$('document').ready(function (){

    init();

    $('#btnRecherche').keyup(function (event) {
       var motCle = $(this).val();
       if(motCle.length>2){
           $.ajax({
               type: 'GET',
               url: 'ajax/findEtudiant.php',
               dataType: 'json',
               data: {'mot': motCle},
               success: function (data) {
                   $('#tbody').text('');
                   for (var x in data) {
                       $('#tbody').append(`
                                <tr  id="ligne_${data[x]['id']}">
                                    <td> ${data[x]['nom']} </td>
                                    <td> ${data[x]['prenom']} </td>
                                    <td>
                                        <a id="btn_${data[x]['id']}" href="evaluation.php?data=${data[x]['id']+'-'+data[x]['nom']+'-'+data[x]['prenom']}" class="btn btn-sm btn-info text-white">Evaluer</a>
                                        <a href="#" class="btn btn-sm btn-primary text-white ml-2">Details</a>
                                        <a href="#" class="btn btn-sm btn-danger text-white ml-2">Supprimer</a>
                                    </td>
                                </tr>
                       `);
                   }
                   init();
               }
           });
       }else if (motCle.length==0) {
           window.location.reload();
       }
    });
});