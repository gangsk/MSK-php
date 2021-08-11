$(document).ready(function () {
    $('#montantIns').text('');
    //
    $('#changer').click(function () {
        if ($('#titre').text()=='Inscription'){
            $('#titre').text('Réinscription');
            $('#btnInscrire').val('Réinscrire');
            $('#matricule').removeAttr('readonly');
            $('#matricule').val('');
            $('#btnInscrire').attr('name','reinscription');
            //
            $('#nom').attr('readonly','readonly');
            $('#prenom').attr('readonly','readonly');
            $('#dateNaiss').attr('readonly','readonly');
            $('#adresse').attr('readonly','readonly');
            $('#lieuNaiss').attr('readonly','readonly');
            $('#tel').attr('readonly','readonly');
        }else{
            $('#titre').text('Inscription');
            $('#btnInscrire').val('Inscrire');

            $('#matricule').attr('readonly','readonly');

            //
            $('#nom').removeAttr('readonly');
            $('#prenom').removeAttr('readonly');
            $('#dateNaiss').removeAttr('readonly');
            $('#adresse').removeAttr('readonly');
            $('#lieuNaiss').removeAttr('readonly');
            $('#tel').removeAttr('readonly');
            //
            $.ajax({
                url:'../fonctions/inscription.func.php',
                type: 'post',
                data: {getMatricule:'MAT'},
                success: function (retour) {
                    $('#matricule').val(retour);
                }
            });

        }

    });
    //
    $('#classe').change(function () {
        $montantIns = $("#classe option:selected").attr('montantIns');
        if ($montantIns!=undefined) {
            $('#montantIns').text('Montant inscription : ' + $montantIns+ ' FCFA');
        }else{
            $('#montantIns').text('');
        }
    });
    //
    $('#matricule').blur(function () {
        var matricule = $(this).val().trim();
        if (matricule != "") {
            $.ajax({
                url: '../fonctions/inscription.func.php',
                type: 'post',
                data: {findEtudiantByMatricule: matricule},
                dataType: 'json',
                success: function (etudiant) {
                    if (!etudiant) {
                        $('#matricule').removeClass('successed');
                        $('#matricule').addClass('error');
                    } else {
                        $('#matricule').removeClass('error');
                        $('#matricule').addClass('successed');
                        //
                        $('#nom').val(etudiant.nom);
                        $('#prenom').val(etudiant.prenom);
                        $('#adresse').val(etudiant.adresse);
                        $('#tel').val(etudiant.telephone);
                        $('#lieuNaiss').val(etudiant.lieuNaissance);
                        $('#dateNaiss').val(etudiant.dateNaissance);
                    }
                }
            });
        }
    });
});