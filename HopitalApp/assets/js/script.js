
function refreshWaxtaan(){
    setInterval(function(){
        $.ajax({
            type: 'post',
            url: 'ajax/getWaxtaan.php',
            data: {'all':'all'},
            dataType: 'json',
            success: function (data) {
                $('#waxtaans').html('');
                for (var x in data) {
                    $('#waxtaans').append(`
                            <div class="card">
                                <div class="card-header text-left h6">
                                    ${data[x]['user']}
                                </div>
                                <div class="card-body ${data[x]['couleur']}">
                                    <blockquote class="blockquote mb-0">
                                        <footer class="text-left small"><cite title="Source Title"> ${data[x]['message']} </cite></footer>
                                    </blockquote>
                                </div>
                            </div>
                        `);
                }

                var element = document.getElementById('waxtaans');
                element.scrollTop = element.scrollHeight;
            }
        });
    }, 1000);
}
$('document').ready(function (){
    var couleurs = [];
    couleurs.push('bg-primary text-black');
    couleurs.push('bg-info');
    couleurs.push('bg-warning text-black');
    couleurs.push('bg-dark text-white');
    couleurs.push('bg-danger text-black');


    refreshWaxtaan();
   $('.button').click(function () {
       var type = $(this).text(); // si + ou -
       var nodeDe = $(this).attr('note'); //
       var noteActu = $('#'+nodeDe).val();
       var note = parseFloat(noteActu.split('/')[0]);
       var noteSur =  parseFloat(noteActu.split('/')[1]);

       if (type == '-' && note > 0){
          note = note-0.5;
       } else if (type == '+' && note < noteSur) {
         note = note+0.5;
       }

       $('#'+nodeDe).val(note+'/'+noteSur);
       $('#displayNote_'+nodeDe).text(note+'/'+noteSur);
   });
   //REMARQUE
    $('#btnRemarque').click(function () {

        var text = $('#textRemarque').val();
        var user = $('#textRemarque').attr('user');
        var idEtu = $('#textRemarque').attr('etu');

        if (text.trim().length != 0){
            console.log(text,user,idEtu)
            $.ajax({
                type: 'post',
                url: 'ajax/remarque.php',
                data: {'text':text, 'user':user, 'etu':idEtu},
                success: function (data) {
                    $('#textRemarque').val("");
                }
            });
        }
    });

   //Waxtaan
    $('#btnWaxtaan').click(function () {
        console.log(couleurs[parseInt(Math.random()*Math.floor(4))])
        var msg = $('#idMsg').val();
        var user = $('#idMsg').attr('user');
        var coul = couleurs[parseInt(Math.random()*Math.floor(4))];
        console.log(coul)
        if (msg.trim().length != 0){
            $.ajax({
                type: 'post',
                url: 'ajax/waxtaan.php',
                data: {'msg':msg, 'user':user, 'couleur':coul},
                dataType: 'json',
                success: function (data) {
                    $('#waxtaans').html('');

                    for (var x in data) {
                        $('#waxtaans').append(`
                            <div class="card">
                                <div class="card-header text-left h6">
                                    ${data[x]['user']}
                                </div>
                                <div class="card-body ${data[x]['couleur']}">
                                    <blockquote class="blockquote mb-0">
                                        <footer class="text-left"><cite title="Source Title"> ${data[x]['message']} </cite></footer>
                                    </blockquote>
                                </div>
                            </div>
                        `);
                    }

                    $('#idMsg').val('');
                    $('#idMsg').text('');
                    $('#waxtaans').addClass('clignote');
                    setTimeout(function(){ $('#waxtaans').removeClass('clignote') },1000);


                    var element = document.getElementById('waxtaans');
                    element.scrollTop = element.scrollHeight;
                }
            });
        }
    });
    
});