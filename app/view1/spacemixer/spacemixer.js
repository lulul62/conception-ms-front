(function ($) {

    $(document).ready(function () {

        var edit = null;
        var ElementID = 1000;
        var position = 0;
        var scale=1;
		var resolution = 30;
        var currentId = "";

        var containerId = 0;
        var blocs = [];
        var sMulti = false;
        var outils = new Outils();
        $('#add-room').click(function () {
            
            // edit
            if ($(this).hasClass('edit')) {
                edit.css('background-color', $('.sp-preview-inner').css('background-color'));
                edit.find('.title').html($('input.input').val());
                $('.add-room').html('Add Room').removeClass('edit');
                $('.holder').removeClass('edit');
            } else {
				var findW= $("#s").find(":selected").data("w");
				var findH = $("#s").find(":selected").data("h");
                var positionX = 0 + position + "px";
                var text = $('input.input').val();
                var boxMashup = "";
                boxMashup += " <div class=\"box\" id=\"\"	data-w='"+findW+"' data-h='"+findH+"' "+ 
                "data-borderLeft='true' data-borderRight='true' data-borderTop='true' data-borderBottom='true'>";           
                boxMashup += "<div class=\"m2\"><\/div>";
                boxMashup += "<div class=\"width\"><\/div>";
                boxMashup += "<div class=\"height\"><\/div>";
                boxMashup += "<\/div>";

                var c = "";
                c += "<div class=\"containerBox\" data-selected='false' data-rotate='false'>";
                c += "<\/div>";
                
                var new_elm = $(boxMashup).clone().css({
                    'background-color': $('.sp-preview-inner').css('background-color'),
                    'left': '5px',
                    'top' : '5px',
                    'width':($("#s").find(":selected").data("w")*resolution)+"px",
                    'height':($("#s").find(":selected").data("h")*resolution)+"px"
                });

                var newContainer = $(c).clone().css({
                    'width':($(new_elm).width()+10)+'px',
                    'height': ($(new_elm).height()+10)+'px',
                    'left' : positionX
                }).draggable({
                    drag: function(event,ui){
                        $(this).css('z-index','2');
                        var res = verifierOverlap($(this));
                        
                        //BoucherBordures(this);
                        if(res == true){                            
                            /*$('.container .containerBox').each(function(key,val){
                                
                            });*/
                            BoucherBordures(this);
                            CacherBordures(this);
                        }
                    },
                    snap: ".containerBox",/*snapMode: "outer",,snapTolerance: 20,*/
                    grid: [2, 2],
                });   
                new_elm.find('.title').html(text);
                newContainer.attr('id',containerId);
                new_elm.attr('id', ElementID);
                outils.AppendTo(newContainer,new_elm);
                
                size();
                scrollTo(containerId);
                
                containerId += 1;
                ElementID += 1;
                position += 5;

                newContainer.click(function(){

                    var ancienneSelection = $('.containerBox[data-selected="true"]');
                    var idActu = $(this).attr('id');
                    var idAncienne = ancienneSelection.attr('id');
                    if(sMulti == true){
                        if($(this).attr('data-selected') == 'true'){
                            $(this).attr('data-selected',false);
                        }
                        else{
                            $(this).attr('data-selected',true);
                        }
                        
                        $(this).toggleClass('selected');
                    }
                    else{
                        if(idActu != idAncienne)
                        {
                            $(this).attr('data-selected',true);
                            $(this).toggleClass('selected');
                            ancienneSelection.toggleClass('selected');
                            ancienneSelection.attr('data-selected',false);
                            
                        }
                        else
                        {
                            ancienneSelection.toggleClass('selected');
                            ancienneSelection.attr('data-selected',false);       
                        }
                    }
                });

                newContainer.mouseup(function(){
                    var css = $(obtenirSol($(this).attr('id'))).css('background-color');
                    if(css=="rgb(255, 0, 0)"){
                        $(this).remove();
                        size();
                    }
                    else{
                        $('.container .containerBox').each(function(key,val){
                            BoucherBordures(val);
                        });
                        CacherBordures(this);
                    }
                });

                
            }
            return false;
        });

        /*
         * Add Furniture element
         */
        $('#add-porte').click(function () {

            var positionX = 10 + position;

            var new_elm = $('.furniture .f-element').clone().css({
                'left': positionX,
            }).draggable({
                snap: false,
                grid: [5, 5]
            });

            new_elm.appendTo('.container');

            /* add class to find with scroll */
            new_elm.attr('id', ElementID);

            size();

            /*scroll to box*/
            scrollTo(ElementID);

            ElementID += 1;

            return false;
        });

         $('#add-fenetre').click(function () {

            var positionX = 10 + position;
            var f = "<div class=\"fenetre\" data-selected='false' data-rotate='false'>";
            f += "<\/di>";

            var new_elm = $(f).clone().css({
                'left': positionX+'px',
            }).draggable({
                snap: ".containerBox",
                grid: [2, 2],
            });

            newContainer.click(function(){

                    var ancienneSelection = $('.containerBox[data-selected="true"]');
                    var idActu = $(this).attr('id');
                    var idAncienne = ancienneSelection.attr('id');
                    if(sMulti == true){
                        if($(this).attr('data-selected') == 'true'){
                            $(this).attr('data-selected',false);
                        }
                        else{
                            $(this).attr('data-selected',true);
                        }
                        
                        $(this).toggleClass('selected');
                    }
                    else{
                        if(idActu != idAncienne)
                        {
                            $(this).attr('data-selected',true);
                            $(this).toggleClass('selected');
                            ancienneSelection.toggleClass('selected');
                            ancienneSelection.attr('data-selected',false);
                            
                        }
                        else
                        {
                            ancienneSelection.toggleClass('selected');
                            ancienneSelection.attr('data-selected',false);       
                        }
                    }
                });
            new_elm.appendTo('.container');

            /* add class to find with scroll */
            new_elm.attr('id', ElementID);

            size();

            /*scroll to box*/
            scrollTo(ElementID);

            ElementID += 1;

            return false;
        });

        $('.box a.edit').live('click', function (el) {

            edit = $(this).closest('div');
            $('input.input').val($(this).closest('div').find('.title').html());
            $('.color-box').css('background-color', $(this).closest('div').css('background-color'));
            $('.add-room').html('OK').addClass('edit');
            $('.holder').addClass('edit');

            return false;
        });

        $('.box a.delete').live("click", function () {

            $(this).closest('.box').remove();
            size();
            return false;
        });

        $('.f-element a.delete').live('click', function () {
            $(this).closest('.f-element').remove();
            return false;
        })

        $('input.scale').change(function () {
            size();
        });

        /*
         * Calculate floor size
         */

        document.getElementById('buttonRotation').onclick = function() {
            var selection = $('.containerBox[data-selected="true"]');
            $(selection).each(function(key,val){
                outils.Rotation($(val).attr('id'));
            
                if($(val).data('rotate')== true)
                {
                    $(val).attr('data-rotate',false);
                }
                else
                {
                    $(val).attr('data-rotate',true);    
                }
            });
            $('.container .containerBox').each(function(key,val){
                BoucherBordures(val);
            }); 
            CacherBordures(this);      
            
            size();
        }

        document.getElementById('buttonFix').onclick = function() {
            var selection = $('.containerBox[data-selected="true"]');
            $(selection).each(function(key,val){
                var sol = obtenirSol($(val).attr('id'));
                var color = $(sol).css('background-color');
                var id = $(val).attr('id');
                if( color == "rgb(128, 128, 128)"){
                    outils.DefigerBloc(id);
                    outils.ChangerCouleurSol(id,'yellowgreen');
                }
                else{
                    outils.FigerBloc(id);
                    outils.ChangerCouleurSol(id,'gray');
                    
                }
            });
            size();
        }

        document.getElementById('sMultiple').onclick = function() {
            var selection = $('.containerBox[data-selected="true"]');
            if(sMulti == true)
            {
                $(selection).each(function(key,val){
                    $(val).attr('data-selected',false);
                    $(val).toggleClass('selected');
                });
                sMulti = false;
            }
            else
            {
                sMulti = true;
            }

            size();
        }

        document.getElementById('buttonSupp').onclick = function() {
            var selection = $('.containerBox[data-selected="true"]');
            
            $(selection).each(function(key,val){
                $(val).remove();
            });

            size();
        }

        function genererMurComplet(type,elem)
        {
            var pos = getPositions(elem);
            var mur = "";
            mur += "<div>";
            mur += "<\/div>"
            var tailleBordure = 5;
            var newMur = $(mur).clone(); 

            if(type == 'gauche'){
                $(newMur).attr('class','murG');
                $(newMur).css({
                    'width' : tailleBordure+'px',
                    'height' : $(elem).height()+tailleBordure*2+'px',
                    'left' : pos[0][0]-5+'px',
                    'top' : pos[1][0]-5+'px',
                });
            }
            else if(type == 'droit'){
                $(newMur).attr('class','murD');
                $(newMur).css({
                    'width' : tailleBordure+'px',
                    'height' : $(elem).height()+tailleBordure*2+'px',
                    'left' : pos[0][1]+'px',
                    'top' : pos[1][0]-5+'px',
                });
            }
            else if(type == 'haut'){
                $(newMur).attr('class','murH');
                $(newMur).css({
                    'width' : $(elem).width()+tailleBordure*2+'px',
                    'height' : tailleBordure+'px',
                    'left' : pos[0][0]-5+'px',
                    'top' : pos[1][0]-5+'px',
                });
            }
            else if(type == 'bas'){
                $(newMur).attr('class','murB');
                $(newMur).css({
                    'width' : $(elem).width()+tailleBordure*2+'px',
                    'height' : tailleBordure+'px',
                    'left' : pos[0][0]-5+'px',
                    'top' : pos[1][1]+'px',
                });
            }
            return newMur;
        }

        function size() {
            //var scale = parseFloat($('input.scale').val());
            var totalm2 = 0;
            $('.table li').each(function(key,val){
                $(val).remove();
            });

            $('.container .containerBox').each(function (key, val) {
                if(typeof val !== 'undefined'){
                    var sol = obtenirSol($(val).attr('id'));
                    var w = $(sol).width() / resolution * scale;
                    var h = $(sol).height() / resolution * scale;

                    var m2 = w * h;
                    totalm2 = totalm2 + m2;
                    m2 = m2.toFixed(2);
                    w = w.toFixed(2);
                    h = h.toFixed(2);

                    $(sol).find('.m2').html(m2 + ' m<sup>2</sup>');
                    $(sol).find('.width').html(w + ' m');
                    $(sol).find('.height').html(h + ' m');

                    $('.table').append('<li class="mdl-menu__item">' + w + 'x' + h + 'm (' + (m2) + 'm<sup>2</sup>)</li>');
                    
                }
            });

            totalm2 = totalm2.toFixed(2);

            $('.size span').html(' ' + (totalm2) + ' m<sup>2</sup>');

            $('.container .f-element').each(function (key, val) {
                var w = $(val).width() / resolution * scale;
                var h = $(val).height() / resolution * scale;

                w = w.toFixed(2);
                h = h.toFixed(2);

                $(val).find('.width').html(w + ' m');
                $(val).find('.height').html(h + ' m');
            });

        }

        function genererTableauBordure(elem){
            var bordures = {'droit':true,'gauche':true,'haut':true,'bas':true};
            if($(elem).css('border-right')=='none')
            {
                bordures['droit'] = false;
            }

            if($(elem).css('border-left')=='none')
            {
                bordures['gauche'] = false;
            }

            if($(elem).css('border-top')=='none')
            {
                bordures['haut'] = false;
            }

            if($(elem).css('border-bottom')=='none')
            {
                bordures['bas'] = false;
            }

            return bordures;
        }

        function mettreAJourBordure(elem,bordures)
        {
            var murHaut = [];
            var murBas = [];
            var murDroit = [];
            var murGauche = [];
            var tailleBordure = 5;
            var id = $(elem).attr('id');
            var sol =obtenirSol(id);
            var posSol = getPositions(sol);
            var container = obtenirContainer(id);
            var pos2 = getPositions(container);
            var effacer = true;
            if(bordures['droit'].length > 0)
            {   
                effacer=true;
                var faux = false;
                var nombre = 0;
                murDroit = [];
                if(bordures['droit'].length == 1){
                    var idAutre = $(bordures['droit'][0]).attr('id');
                    var containerAutre = obtenirContainer(idAutre);
                    var pos = getPositions(containerAutre);

                    if(pos2[1][0] <= pos[1][0] && pos2[1][1] >= pos[1][1] ){
                        SupprimerLeTypeDeMurDesElements(bordures['droit'],'gauche');
                        effacer=false;
                        var sol = $('#'+id+' .box')[0];
                        outils.SupprimerMurs(id,'murD');
                        outils.AfficherMurs(genererMurComplet('droit',sol),id);
                    }
                    else if(pos2[1][0] >= pos[1][1] && pos2[1][1] <= pos[1][1]){
                        var idAutre = $('#'+bordures['droit'][0].attr('id'));
                        var sol = $('#'+idAutre+' .box')[0];
                        

                        var murGaucheAutre = $('#'+idAutre+' .murG');
                        outils.SupprimerMurs(idAutre,'murG');
                        outils.AfficherMurs(genererMurComplet('gauche',sol),idAutre);
                        
                    }
                    else{
                        var idAutre = $(bordures['droit'][0]).attr('id');
                        var murGaucheAutre = $('#'+idAutre+' .murG');
                        console.log($(murGaucheAutre).length);
                        if(murGaucheAutre.length == 0){
                            var sol = $('#'+idAutre+' .box')[0];
                            outils.AfficherMurs(genererMurComplet('gauche',sol),idAutre);
                        }

                        var diffHaut = Math.abs(pos[1][0] - pos2[1][0]);
                        if( diffHaut != 0 && pos2[1][0] < pos[1][0] && pos2[1][1] != pos[1][1] ){
                            murDroit[nombre] = GenererMur(diffHaut,tailleBordure,posSol[0][1],posSol[1][0]-5,'murD');
                            nombre += 1;
                            faux = true;          
                        }
                        var diffBas = Math.abs(pos[1][1] - pos2[1][1]);

                        if(diffBas != 0 && pos2[1][1] > pos[1][1] && pos2[1][0] != pos[1][0]){
                            murDroit[nombre] = GenererMur(diffBas,tailleBordure,posSol[0][1],posSol[1][1]-diffBas,'murD');
                            nombre += 1;  
                            faux = true;
                        }
                    }
                    
                }
                else{

                    bordures['droit'] = ranger(bordures['droit'],'height');
                    var TousColle = determinerSiToutLesElementsSontColles(bordures['droit'],'droit');
                    var points = determinerPositionDebutEtFinGroupeBloc(bordures['droit'],'hauteur');
                    if(TousColle == true){
                        if(pos2[1][0] <= points[0] && pos2[1][1] >= points[1] ){
                            SupprimerLeTypeDeMurDesElements(bordures['droit'],'gauche');
                            effacer=false;
                        }
                    }
                    else{
                        var distances  = determinerDistanceEntreLesElementEtPointDeDepart(bordures['droit'],'hauteur',pos2);
                        $(distances).each(function(key,val){
                            murDroit[nombre] = GenererMur(val[1],tailleBordure,posSol[0][1],val[0],'murD');
                            nombre += 1;  
                        });
                        
                        if(pos2[1][0] < points[0])
                        {
                            var diff = points[0] - pos2[1][0];
                            murDroit[nombre] = GenererMur(diff,tailleBordure,posSol[0][1],posSol[1][0],'murD');
                            nombre += 1;  
                        }

                        if(pos2[1][1] > points[1])
                        {
                            var diff = pos2[1][1] - points[1]; 
                            murDroit[nombre] = GenererMur(diff,tailleBordure,posSol[0][1],posSol[1][1]-diff,'murD');
                            nombre += 1;  
                        }
                        faux = true;
                    }
                }

                if(faux){
                    outils.ChangerCouleurSol(id,'orange');
                }
                else{
                    outils.ChangerCouleurSol(id,'yellowgreen');
                }

                if(effacer){
                    outils.SupprimerMurs(id,'droit');
                    outils.AfficherMurs(murDroit, id);
                }
                $(elem).css('left',$(elem).position().left+5);  
            }

            if(bordures['gauche'].length > 0)
            {
                effacer=true;
                var faux = false;
                var nombre = 0;
                murDroit = [];
                if(bordures['gauche'].length == 1){
                    var idAutre = $(bordures['gauche'][0]).attr('id');
                    var containerAutre = obtenirContainer(idAutre);
                    var pos = getPositions(containerAutre);

                    if(pos2[1][0] <= pos[1][0] && pos2[1][1] >= pos[1][1] ){
                        SupprimerLeTypeDeMurDesElements(bordures['gauche'],'droit');
                        effacer=false;
                        var sol = $('#'+id+' .box')[0];
                        outils.SupprimerMurs(id,'murG');
                        outils.AfficherMurs(genererMurComplet('gauche',sol),id);
                    }
                    else if(pos2[1][0] >= pos[1][1] && pos2[1][1] <= pos[1][1]){
                        var idAutre = $('#'+bordures['gauche'][0].attr('id'));
                        var sol = $('#'+idAutre+' .box')[0];
                        

                        var murGaucheAutre = $('#'+idAutre+' .murD');
                        outils.SupprimerMurs(idAutre,'murD');
                        outils.AfficherMurs(genererMurComplet('droit',sol),idAutre);
                        
                    }
                    else{
                        var idAutre = $(bordures['gauche'][0]).attr('id');
                        var murGaucheAutre = $('#'+idAutre+' .murD');
                        console.log($(murGaucheAutre).length);
                        if(murGaucheAutre.length == 0){
                            var sol = $('#'+idAutre+' .box')[0];
                            outils.AfficherMurs(genererMurComplet('droit',sol),idAutre);
                        }

                        var diffHaut = Math.abs(pos[1][0] - pos2[1][0]);
                        if( diffHaut != 0 && pos2[1][0] < pos[1][0] && pos2[1][1] != pos[1][1] ){
                            murDroit[nombre] = GenererMur(diffHaut,tailleBordure,posSol[0][0]-5,posSol[1][0],'murG');
                            nombre += 1;
                            faux = true;          
                        }
                        var diffBas = Math.abs(pos[1][1] - pos2[1][1]);

                        if(diffBas != 0 && pos2[1][1] > pos[1][1] && pos2[1][0] != pos[1][0]){
                            murDroit[nombre] = GenererMur(diffBas,tailleBordure,posSol[0][0]-5,posSol[1][1]-diffBas,'murG');
                            nombre += 1;  
                            faux = true;
                        }
                    }
                    
                }
                else{

                    bordures['gauche'] = ranger(bordures['gauche'],'height');
                    var TousColle = determinerSiToutLesElementsSontColles(bordures['gauche'],'gauche');
                    var points = determinerPositionDebutEtFinGroupeBloc(bordures['gauche'],'hauteur');
                    if(TousColle == true){
                        console.log(TousColle);
                        if(pos2[1][0] <= points[0] && pos2[1][1] >= points[1] ){
                            SupprimerLeTypeDeMurDesElements(bordures['gauche'],'droit');
                            effacer=false;
                        }
                    }
                    else{
                        var distances  = determinerDistanceEntreLesElementEtPointDeDepart(bordures['gauche'],'hauteur',pos2);
                        $(distances).each(function(key,val){
                            murDroit[nombre] = GenererMur(val[1],tailleBordure,posSol[0][0]-5,val[0],'murG');
                            nombre += 1;  
                        });
                        
                        if(pos2[0][0] < points[0])
                        {
                            var diff = points[0] - pos2[0][0];
                            murDroit[nombre] = GenererMur(diff,tailleBordure,posSol[0][0]-5,posSol[1][0],'murG');
                            nombre += 1;  
                        }

                        if(pos2[0][1] > points[1])
                        {
                            var diff = pos2[0][1] - points[1]; 
                            murDroit[nombre] = GenererMur(diff,tailleBordure,posSol[0][0]-5,posSol[1][1]-diff,'murG');
                            nombre += 1;  
                        }
                        faux = true;
                    }
                }

                if(faux){
                    outils.ChangerCouleurSol(id,'orange');
                }
                else{
                    outils.ChangerCouleurSol(id,'yellowgreen');
                }

                if(effacer){
                    outils.SupprimerMurs(id,'gauche');
                    outils.AfficherMurs(murDroit, id);
                }
                
                $(elem).css('left',$(elem).position().left-5);
                $(elem).css('z-index',0);
            }

            if(bordures['haut'].length > 0)
            {  
                effacer=true;
                var faux = false;
                var nombre = 0;
                murDroit = [];
                if(bordures['haut'].length == 1){
                    var idAutre = $(bordures['haut'][0]).attr('id');
                    var containerAutre = obtenirContainer(idAutre);
                    var pos = getPositions(containerAutre);

                    if(pos2[0][0] <= pos[0][0] && pos2[0][1] >= pos[0][1]){
                        //SupprimerLeTypeDeMurDesElements(bordures['haut'],'bas');
                        effacer=false;
                        var sol = $('#'+id+' .box')[0];
                        outils.SupprimerMurs(id,'murH');
                        outils.AfficherMurs(genererMurComplet('haut',sol),id);
                    }
                    else if(pos2[0][0] >= pos[0][0] && pos2[0][1] <= pos[0][1]){
                        var sol = $('#'+idAutre+' .box')[0];
                        var murBasAutre = $('#'+idAutre+' .murB');
                        outils.SupprimerMurs(idAutre,'murB');
                        outils.AfficherMurs(genererMurComplet('haut',sol),idAutre);
                    }
                    else{
                        var murBasAutre = $('#'+idAutre+' .murB');
                        console.log($(murBasAutre).length);
                        if(murBasAutre.length == 0){
                            var sol = $('#'+idAutre+' .box')[0];
                            outils.AfficherMurs(genererMurComplet('bas',sol),idAutre);
                        }

                        var diffHaut = Math.abs(pos[0][0] - pos2[0][0]);
                        if( diffHaut != 0 && pos2[0][0] < pos[0][0] && pos2[0][1] != pos[0][1] ){
                            murHaut[nombre] = GenererMur(tailleBordure,diffHaut,posSol[0][0],posSol[1][0]-5,'murH');
                            nombre += 1;
                            faux = true;          
                        }
                        var diffBas = Math.abs(pos[0][1] - pos2[0][1]);

                        if(diffBas != 0 && pos2[0][1] > pos[0][1] && pos2[0][0] != pos[0][0]){
                            murHaut[nombre] = GenererMur(tailleBordure, diffBas,posSol[0][1]-diffBas,posSol[1][0]-5,'murH');
                            nombre += 1;  
                            faux = true;
                        }
                    }
                }
                else{
                    bordures['haut'] = ranger(bordures['haut'],'width');
                    console.log(bordures['haut']);
                    var TousColle = determinerSiToutLesElementsSontColles(bordures['haut'],'haut');
                    var points = determinerPositionDebutEtFinGroupeBloc(bordures['haut'],'largeur');
                    console.log(TousColle);
                    if(TousColle == true){
                        if(pos2[0][0] <= points[0] && pos2[0][1] >= points[1] ){
                            SupprimerLeTypeDeMurDesElements(bordures['haut'],'bas');
                            effacer=false;
                        }
                    }
                    else{
                        var distances  = determinerDistanceEntreLesElementEtPointDeDepart(bordures['haut'],'largeur',pos2);
                        console.log(distances);
                        $(distances).each(function(key,val){
                            murHaut[nombre] = GenererMur(tailleBordure,val[1],val[0],posSol[1][0]-5,'murH');
                            nombre += 1;  
                        });

                        console.log('t1 : '+(pos2[0][0] < points[0]));
                        if(pos2[0][0] < points[0])
                        {
                            var diff = points[0] - pos2[0][0];
                            if(diff != 0){
                                murHaut[nombre] = GenererMur(tailleBordure,diff,posSol[0][0],posSol[1][0]-5,'murH');
                                nombre += 1;
                            }  
                        }
                        console.log('p11 : '+pos2[1][1]);
                        console.log('p11 : '+points[1]);
                        console.log('t2 : '+(pos2[1][1] > points[1]));
                        if(pos2[1][1] > points[1])
                        {
                            var diff = pos2[1][1] - points[1];
                            if(diff != 0){ 
                                murHaut[nombre] = GenererMur(tailleBordure,diff,posSol[0][1]-diff,posSol[1][0]-5,'murH');
                                nombre += 1; 
                            } 
                        }
                        faux = true;
                    }
                }

                if(faux == true){
                    outils.ChangerCouleurSol(id,'orange');
                }
                else{
                    outils.ChangerCouleurSol(id,'yellowgreen');
                }
                console.log(effacer);
                if(effacer == true){
                    outils.SupprimerMurs(id,'haut');
                    outils.AfficherMurs(murHaut, id);
                }
                $(elem).css('top',$(elem).position().top-5);
            }

            if(bordures['bas'].length > 0)
            {
                $(elem).css('top',$(elem).position().top+5);
            }
        }
        function GenererMur(hauteur,largeur,x,y,type)
        {
            var mur = "";
            mur += "<div>";
            mur += "<\/div>";

            var m = $(mur).clone().css({
                'height': hauteur+'px',
                'width': largeur+'px',
                'left' : x+'px',
                'top' : y+'px',
                'z-index' : 4,
                });
                m.attr('class',type);
            return m;

        }
        function determinerSiToutLesElementsSontColles(elems,type)
        {
            var colles = true;
            var precedent = null;
            $(elems).each(function(key,val){
                if(precedent == null){
                    precedent = val;
                }
                else
                {
                    var pos = getPositions(precedent);
                    var pos2 = getPositions(val); 

                    if(type == 'droit'){
                        if(pos[1][1] != (pos2[1][0]+5)){
                            colles = false;
                            return false;
                        }
                    }
                    if(type == 'gauche'){
                        if(pos[1][1] != (pos2[1][0]-5)){
                            colles = false;
                            return false;
                        }
                    }
                    else if(type == 'bas'){
                        if(pos[0][1] != (pos2[0][0]+5)){
                            colles = false;
                            return false;
                        }   
                    }
                    else if(type == 'haut')
                    {
                        if(pos[0][1] != (pos2[0][0]-5)){
                            colles = false;
                            return false;
                        } 
                    }
                }
            });
            return colles;
        }

        function determinerDistanceEntreLesElementEtPointDeDepart(elems,type,posContainer)
        {
            var distances = [[]];
            //var donnees = [];
            var precedent = null;
            var nombreElement = 0;
            $(elems).each(function(key,val){
                if(precedent == null){
                    precedent = val;
                }
                else{
                    var pos = getPositions(precedent);
                    var pos2 = getPositions(val);
                    if(type == 'hauteur'){
                        var diff = Math.abs(pos2[1][0] - pos[1][1]);
                        if(diff != 0){
                            distances[nombreElement][0] = Math.abs(pos[1][1] - posContainer[1][0]);
                            distances[nombreElement][1] = diff;
                        }
                    }else{
                        var diff = Math.abs(pos2[0][0] - pos[0][1]);
                        if(diff != 0){
                            distances[nombreElement][0] = Math.abs(pos[0][1]- posContainer[0][0]);
                            distances[nombreElement][1] = diff;
                        }
                    }
                    precedent = val;
                }
            });
            return distances;
        }

        function determinerPositionDebutEtFinGroupeBloc(elems,type)
        {
            var points = [];
            var pos = getPositions(elems[0]);
            var pos2 = getPositions(elems[elems.length-1]);
            if(type =='hauteur'){
                points[0] = pos[1][0];
                points[1] = pos2[1][1];
            }else{
                points[0] = pos[0][0];
                points[1] = pos2[0][1];
            }
            return points;
        } 

        function SupprimerLeTypeDeMurDesElements(elems,type){
            $(elems).each(function(key,val){
                outils.SupprimerMurs($(val).attr('id'),type);
            });
        }

        function ranger(elems,par)
        {
            var change = true;
            if(par == 'height'){   
                do{
                    console.log('boucle');
                    change = false;
                    var prev = null;
                    $(elems).each(function(key,val){
                        if(prev != null){
                            var pos = getPositions(val);
                            var pos2 = getPositions(prev);
                            if(pos2[1][0] > pos[1][0]){
                                elems[key] = prev;
                                elems[key-1] = val;
                                change = true;
                                prev = elems[key]; 
                            }
                        }
                        else{
                            prev = val;
                        }
                    });
                }
                while(change == true);
            }
            else
            {
                do{
                    change = false;
                    var prev = null;
                    $(elems).each(function(key,val){
                        if(prev != null){
                            var pos = getPositions(val);
                            var pos2 = getPositions(prev);
                            if(pos2[0][0] > pos[0][0]){
                                elems[key] = prev;
                                elems[key-1] = val;
                                change =true;
                                prev = elems[key];
                                console.log('ok');  
                            }
                        }
                        else{
                            prev = val;
                        }
                    });
                }
                while(change == true);
            }
            return elems;
        }

        function getPositions( elem ) {
            var pos, width, height;
            pos = $(elem).position();
            width = $(elem).width();
            height = $(elem).height();
            return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
        };

        function DeterminerCoteContacte( p1, p2) {

            var resultat='aucune';
            if((((p1[1][0] <= p2[1][0]) && (p1[1][1] >= p2[1][0]) || (p1[1][0] <= p2[1][1]) && (p1[1][1] >= p2[1][1])) 
                || ((p2[1][0] <= p1[1][0]) && (p2[1][1] >= p1[1][0]) || (p2[1][0] <= p1[1][1]) && (p2[1][1] >= p1[1][1]))) 
                && ((Math.abs(p1[0][1] - p2[0][0]) == 0) || (Math.abs(p1[0][1] - p2[0][0]) == 0) ))
            {
                resultat = 'droite'; 
            }
            else if((((p1[1][0] <= p2[1][0]) && (p1[1][1] >= p2[1][0]) || (p1[1][0] <= p2[1][1]) && (p1[1][1] >= p2[1][1])) 
                || ((p2[1][0] <= p1[1][0]) && (p2[1][1] >= p1[1][0]) || (p2[1][0] <= p1[1][1]) && (p2[1][1] >= p1[1][1])))
                && ((Math.abs(p1[0][0] - p2[0][1]) == 0) || (Math.abs(p1[0][0] - p2[0][1]) == 0) ))
            {
                resultat = 'gauche';
            }
            else if((((p1[0][0] <= p2[0][0]) && (p1[0][1] >= p2[0][0]) || (p1[0][0] <= p2[0][1]) && (p1[0][1] >= p2[0][1])) 
                || ((p2[0][0] <= p1[0][0]) && (p2[0][1] >= p1[0][0]) || (p2[0][0] <= p2[0][1]) && (p2[0][1] >= p1[0][1])))
                && ((Math.abs(p1[1][1] - p2[1][0]) == 0) || (Math.abs(p1[1][1] - p2[1][0]) == 0)))
            {
                resultat = 'bas';
            }
            else if((((p1[0][0] <= p2[0][0]) && (p1[0][1] >= p2[0][0]) || (p1[0][0] <= p2[0][1]) && (p1[0][1] >= p2[0][1])) 
                || ((p2[0][0] <= p1[0][0]) && (p2[0][1] >= p1[0][0]) || (p2[0][0] <= p1[0][1]) && (p2[0][1] >= p1[0][1])))
                && ((Math.abs(p1[1][0] - p2[1][1]) == 0) || (Math.abs(p1[1][0] - p2[1][1]) == 0)))
            {
                resultat = 'haut';
            }
            
            return resultat ;
        }

        

        function ObtenirCoteContacte(a,b){
            var pos1 = getPositions( a );
            var pos2 = getPositions( b );
            var res = DeterminerCoteContacte(pos1,pos2);
            return res;
        }
        
        function comparePositionsOverlap( p1, p2 ) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] /*|| r1[0] === r2[0]*/;
        }

        function overlap ( a, b ) {
            var pos1 = getPositions( a );
            var pos2 = getPositions( b );
            return comparePositionsOverlap( pos1[0], pos2[0] ) && comparePositionsOverlap( pos1[1], pos2[1] );
        }

        function verifierOverlap(elem){
            var res = true;
            var idActuel = elem.attr('id');
            $('.container .containerBox').each(function (key, val) {
                $(val).css('z-index','1');
                var idItem = $(val).attr('id');
                var sol = obtenirSol(idActuel);
                if( idActuel !== idItem ){
                    if(overlap(val,elem)){
                        $(sol).toggleClass('overlap');
                        outils.ChangerCouleurSol(idActuel,'red');
                        $(sol).css('z-index','2');
                        res = false; 
                        return res;
                    }
                }  
            });
            return res;
        }

        function CacherBordures(elem)
        {
            var contactes = ObtenirContactes(elem);
            mettreAJourBordure(elem,contactes);
        }

        function BoucherBordures(elem)
        {
            var contactes = ObtenirContactes(elem);
            ComblerMurs(elem,contactes);
        }

        function ComblerMurs(elem,contactes){
            var id = $(elem).attr('id');
            var sol = obtenirSol(id);
            if($(contactes['droit']).length == 0){
                Combler('droit',id,sol);
            }

            if($(contactes['gauche']).length == 0){
                Combler('gauche',id,sol);
            }

            if($(contactes['haut']).length == 0){
                Combler('haut',id,sol);
            }

            if($(contactes['bas']).length == 0){
                Combler('bas',id,sol);
            }

            /*if($(contactes['droit']).length == 0 && $(contactes['gauche']).length == 0 && $(contactes['bas']).length == 0 && $(contactes['haut']).length == 0){
                
                outils.ChangerCouleurSol(id,'yellowgreen');
            }*/
        }

        function Combler(type,id,sol){
                var newMur = [];
                var nombre = 0; 
                outils.SupprimerMurs(id,type);
                newMur[nombre] = genererMurComplet(type,sol);
                nombre += 1;
                outils.AfficherMurs(newMur,id);
        }

        function ObtenirContactes(elem)
        {
            var contactes = {'droit':[],'gauche':[],'haut':[],'bas':[]};
            $('.container .containerBox').each(function (key, val) {
                if( typeof val !== 'undefined' && $(val).attr('id') != $(elem).attr('id')){
                    switch(ObtenirCoteContacte(elem,val)){
                        case 'droite':
                            contactes['droit'][contactes['droit'].length] = val;
                            break;
                        case 'gauche':
                            contactes['gauche'][contactes['gauche'].length] = val;
                            break;
                        case 'haut':
                            contactes['haut'][contactes['haut'].length] = val;
                            break;
                        case 'bas':
                            contactes['bas'][contactes['bas'].length] = val;
                            break;
                    }
                }
            });
            return contactes;
        }

        function deplacerSiBesoin(elem,contactes)
        {
            contactes.each(function(key, val){
                var tailleContact = 0;
                val.each(function(key2,val2){
                    if(key=='droit' || key == 'gauche' ){
                        tailleContact += val2.height();
                    }
                    else if(key=='bas' || key == 'haut')
                    {
                        tailleContact += val2.height();
                    }

                });
            });
        }
        /*
         * Scroll to newly added element
         */
        function scrollTo(ElementID) {
            var RoomElement = $("#" + ElementID);
            dwidth = $(document).width() / 2;
            dheight = $(document).height() / 4;
            $('html,body').animate({
                scrollTop: RoomElement.offset().top - 200,
                scrollLeft: RoomElement.offset().left - dheight
            }, 'slow');
        }

        function rotation (elem){

            var height = $(elem).height();
            var width = $(elem).width();
            var w = $(elem).data('w');
            var h = $(elem).data('h');

            if($(elem).hasClass('mur'))
            {
                var left = $(elem).css('left');
                var top = $(elem).css('top');
                $(elem).css({
                    'width': height,
                    'height': width,
                    'left' :  top,
                    'top' : left
                });
            }
            $(elem).attr('data-w',h);
            $(elem).attr('data-h',w);

            $(elem).css({
                'width': height,
                'height': width, 
            });
        }

        function Outils()
        {
            this.AppendTo = function(container,sol) {
                
                $(container).appendTo('.container');
                $(sol).appendTo('#'+container.attr('id'));
                var murDroit = genererMurComplet('droit',sol);
                var murGauche = genererMurComplet('gauche',sol);
                var murHaut = genererMurComplet('haut',sol);
                var murBas = genererMurComplet('bas',sol);
                this.AfficherMurs(murDroit,container.attr('id'));
                this.AfficherMurs(murGauche,container.attr('id'));
                this.AfficherMurs(murBas,container.attr('id'));
                this.AfficherMurs(murHaut,container.attr('id'));
            };

            this.Rotation = function(idContainer)
            {
                rotation(obtenirContainer(idContainer));
                rotation(obtenirSol(idContainer));
                $(obtenirMurs(idContainer,'murD')).each(function(key,val){
                    rotation(val);
                });
                $(obtenirMurs(idContainer,'murG')).each(function(key,val){
                    rotation(val);
                });
                $(obtenirMurs(idContainer,'murH')).each(function(key,val){
                    rotation(val);
                });
                $(obtenirMurs(idContainer,'murB')).each(function(key,val){
                    rotation(val);
                });
                
                /*var temp1 = null;
                var temp2 = null;
                if(this.container.data('rotate') == false){
                    temp1 = mursHaut;
                    temp2 = mursDroit;

                    mursDroit = temp1;
                    temp1 = mursBas;
                    mursBas = temp2;
                    temp2 = mursGauche;
                    mursGauche = temp1;
                    mursHaut = temp2;    
                }
                else{
                    temp1 = mursDroit;
                    temp2 = mursHaut;
                    mursHaut = temp1;
                    temp1 =  mursGauche;
                    mursGauche = temp2;
                    temp2 = mursBas;
                    mursBas = temp1;
                    mursDroit = temp2;
                }*/
            }; 

            this.SupprimerMurs = function(idContainer,type)
            {
                if(type == 'droit'){
                    $(obtenirMurs(idContainer,'murD')).each(function(key,val){
                        $(val).remove();
                    });
                }
                else if(type == 'gauche'){
                    $(obtenirMurs(idContainer,'murG')).each(function(key,val){
                        $(val).remove();
                    });
                }
                else if(type == 'haut'){
                    $(obtenirMurs(idContainer,'murH')).each(function(key,val){
                        $(val).remove();
                    });
                }
                else if(type == 'bas'){
                    $(obtenirMurs(idContainer,'murB')).each(function(key,val){
                        $(val).remove();
                    });
                }
            }; 

            this.AfficherMurs = function(murs,idContainer)
            {
                $(murs).each(function(key,val){
                    $(val).appendTo('#'+idContainer);
                });
            };

            this.ChangerCouleurSol = function(id,couleur){

                $(obtenirSol(id)).css('background-color',couleur);
            };

            this.FigerBloc = function(id){
                $(obtenirContainer(id)).draggable({ disabled: true });
            }; 

            this.DefigerBloc = function(id){
                $(obtenirContainer(id)).draggable({ disabled: false });
            };
        };

        function obtenirContainer(id){
            return $('#'+id);
        }
        function obtenirSol(id){
            return $('#'+id+' '+'.box')[0];
        }

        function obtenirMurs(id,type){
            return $('#'+id+' '+'.'+type);
        }

        function exportMap() {
            var data = {};
            data["piece"] = {};
            data["fenetre"] = {};
            data["porte"] = {};
            var i = 0;
            var j = 0;
            var k = 0;
            $(".containerBox").each(function (index) {
                var d = {};

                d["w"] = $('#'+this.attr(id)+' .box')[0].data("w");
                d["h"] = $('#'+this.attr(id)+' .box')[0].data("h");
                /*d["right"] = $(this).data("right");
                d["left"] = $(this).data("left");
                d["top"] = $(this).data("top");
                d["bottom"] = $(this).data("bottom");*/
                d["position"] = $(this).position();
                d["rotate"] = $(this).data('rotate');

                $('#'+this.attr(id)+' .murH').each(function(key,val){
                    d['murs']['droit'][j]['w'] = $(val).css('width');
                    d['murs']['droit'][j]['h'] = $(val).css('height');
                    d['murs']['droit'][j]['position'] = $(val).position();
                    d['murs']['droit'][j]['rotate'] = $(val).data('rotate');
                    j++;  
                });

                j = 0;
                $('#'+this.attr(id)+' .murG').each(function(key,val){
                    d['murs']['gauche'][j]['w'] = $(val).css('width');
                    d['murs']['gauche'][j]['h'] = $(val).css('height');
                    d['murs']['gauche'][j]['position'] = $(val).position();
                    d['murs']['gauche'][j]['rotate'] = $(val).data('rotate');
                    j++;  
                });

                j = 0;
                $('#'+this.attr(id)+' .murH').each(function(key,val){
                    d['murs']['haut'][j]['w'] = $(val).css('width');
                    d['murs']['haut'][j]['h'] = $(val).css('height');
                    d['murs']['haut'][j]['position'] = $(val).position();
                    d['murs']['haut'][j]['rotate'] = $(val).data('rotate');  
                });

                j = 0;
                $('#'+this.attr(id)+' .murB').each(function(key,val){
                    d['murs']['bas'][j]['w'] = $(val).css('width');
                    d['murs']['bas'][j]['h'] = $(val).css('height');
                    d['murs']['bas'][j]['position'] = $(val).position();
                    d['murs']['bas'][j]['rotate'] = $(val).data('rotate');  
                });

                data["piece"][i] = d;

                i++

            });
            /*$(".f-element").each(function (index) {
                var d = {};
                d["position"] = $(this).position();
                data["fenetre"][j] = d;
                j++
            });
            $(".p-element").each(function (index) {
                var d = {};
                d["position"] = $(this).position();
                data["porte"][k] = d;
                k++
            });*/
            var myJsonString = JSON.stringify(data);
            $.ajax({
                type: "POST",
                url: "/Maison/add",
                data: myJsonString,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    //  alert(data);
                },
                failure: function (errMsg) {
                    // alert(errMsg);
                }
            });

            //console.log(myJsonString);
        }

        $("#template_maison").on("change", function () {
            var maisonId = this.value;
            if (maisonId != "new") {
                $.getJSON(maisonId, function (data) {
                    $.each(data["piece"], function (key, val) {
                        // console.log(key + val["w"]);
                        genererPiece(val["w"], val["h"], val["right"], val["left"], val["top"], val["bottom"], val["position"])
                    });
                    if (data["porte"]) {
                        $.each(data["porte"], function (key, val) {
                            // console.log(key + val["w"]);
                            genererPorte(val["position"]);
                        });
                    }
                    if (data["fenetre"]) {
                        $.each(data["fenetre"], function (key, val) {
                            // console.log(key + val["w"]);
                            genererFenetre(val["position"]);
                        });
                    }
                });
            }

        });
        /*
         * Misc functions
         */
        $('.toggle-table').click(function () {
            var marginL = $('.details').css("margin-left");
            if (marginL > "-500px") {
                margin = "-500px";
            } else {
                margin = "0"
            }
            $('.details').animate({marginLeft: margin}, 500);
        });

        $("input[name='tat']").click(function () {
            if ($('#checkbox').prop('checked')) {
                $('.title').css('display', 'none');
            }
        });

        $("input[name='text']").on('click', function () {
            $('.title').toggleClass('visible');
        });

        $("input[name='area']").on('click', function () {
            $('.width').toggleClass('visible');
            $('.height').toggleClass('visible');
            $('.m2').toggleClass('visible');
        });

        $('.box').click(function(){selectionner(this)});

        

    });
})(jQuery);

