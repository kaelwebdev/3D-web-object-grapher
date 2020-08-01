/**
 * @author kaelwebdev / https://github.com/kaelwebdev
 */
$(function () {
    webGLStart();

    function elegirElementoChangeP() {
        if (objetos != "") {
            var e = document.getElementById("elementos");
            seleccionado = e.options[e.selectedIndex].value;
            mover();

        }
    }
    function elegirElementoChangeG() {
        if (objetos != "") {
            var e = document.getElementById("elementos");
            seleccionado = e.options[e.selectedIndex].value;
            girar();

        }
    }
    function elegirElementoChangeE() {
        if (objetos != "") {
            var e = document.getElementById("elementos");
            seleccionado = e.options[e.selectedIndex].value;
            escalar();

        }
    }
    function elegirElementoChangeT() {
        if (objetos != "") {
            var e = document.getElementById("elementos");
            seleccionado = e.options[e.selectedIndex].value;
        }
    }

    /**
    Listeners!!
    */
    $('.title').click(function () {
        $(this).next().slideToggle();
    });

    $('.actns').click(function () {
        $(this).next().slideToggle();
    });

    $('.objs').click(function () {
        $(this).next().slideToggle();
    });


    $('.btn3').click(function () {
        if (objetos != "") {
            var e = document.getElementById("elementos");
            seleccionado = e.options[e.selectedIndex].value;

            var red = parseInt(document.getElementById("rojo").value);
            var green = parseInt(document.getElementById("verde").value);
            var blue = parseInt(document.getElementById("azul").value);

            cambiarColor(red, green, blue);
        }
    });


    $('.btn4').click(function () {
        if (objetos != "") {
            var e = document.getElementById("elementos");
            seleccionado = e.options[e.selectedIndex].value;

            var red = parseInt(document.getElementById("rojo").value);
            var green = parseInt(document.getElementById("verde").value);
            var blue = parseInt(document.getElementById("azul").value);
            var red2 = parseInt(document.getElementById("rojo2").value);
            var green2 = parseInt(document.getElementById("verde2").value);
            var blue2 = parseInt(document.getElementById("azul2").value);
            
            window.alert(red + "," + green + "," + blue + "," + red2 + "," + green2 + "," + blue2);
            cambiarColor2(red, green, blue, red2, green2, blue2);
        }
    });

    $('.btn5').click(function () {

        if (objetos != "") {

            var s = document.getElementById("elemTexturas");
            selectTextura = s.options[s.selectedIndex].value;
            rXbox = parseInt(document.getElementById("rXbox").value);
            rYbox = parseInt(document.getElementById("rYbox").value);
            //window.alert("bt1"+rXbox+","+rYbox);
            elegirElementoChangeT();
            cambiarTextura();

        }
    });

    $('.btn6').click(function () {

        if (objetos != "") {

            var s = document.getElementById("elemTT");
            selectTT = s.options[s.selectedIndex].value;
            rXbox = parseInt(document.getElementById("rXbox").value);
            rYbox = parseInt(document.getElementById("rYbox").value);
            elegirElementoChangeT();
            cambiarTextura();
        }
    });


    $('.actnBtn').click(function () {
        var obj = window[$(this).data('action') + "Interface"]();
        if (obj) {
            $(this).parent().next().next().append("<div class='object' data-id='" + obj.id + "'>" + obj.name + "</div>");
            $('#elementos').append(" <option value=" + obj.id + ">" + obj.name + "</option>");
        }

    });


    $(document).ready(function () {
        $('#xposition').change(function () {

            $('#valorxp').val($(this).val());
            xposicion = $(this).val();
            elegirElementoChangeP();

        });

        $('#yposition').change(function () {

            $('#valoryp').val($(this).val());
            yposicion = $(this).val();
            elegirElementoChangeP();

        });

        $('#zposition').change(function () {

            $('#valorzp').val($(this).val());
            zposicion = $(this).val();
            elegirElementoChangeP();

        });

        $('#xgyre').change(function () {

            $('#valorxg').val($(this).val());
            xgiro = $(this).val();
            elegirElementoChangeG();

        });

        $('#ygyre').change(function () {

            $('#valoryg').val($(this).val());
            ygiro = $(this).val();
            elegirElementoChangeG();

        });

        $('#zgyre').change(function () {

            $('#valorzg').val($(this).val());
            zgiro = $(this).val();
            elegirElementoChangeG();

        });

        $('#xscale').change(function () {

            $('#valorxe').val($(this).val());
            xescala = $(this).val();
            elegirElementoChangeE();

        });

        $('#yscale').change(function () {

            $('#valorye').val($(this).val());
            yescala = $(this).val();
            elegirElementoChangeE();

        });

        $('#zscale').change(function () {

            $('#valorze').val($(this).val());
            zescala = $(this).val();
            elegirElementoChangeE();

        });

        $('#lIntencidadBarra').change(function () {

            $('#lIntencidadbox').val($(this).val());
            iLuz = $(this).val();
            if (objetos != "") {
                objetos[seleccionado].material.needsUpdate = true;
                updatelight();
                renderEscena();
            }
        });

        $('#lcolorRbarra').change(function () {

            $('#lcolorRbox').val($(this).val());
            cRLuz = $(this).val();
            if (objetos != "") {
                objetos[seleccionado].material.needsUpdate = true;
                updatelight();
                renderEscena();
            }
        });

        $('#lcolorGbarra').change(function () {

            $('#lcolorGbox').val($(this).val());
            cGLuz = $(this).val();
            if (objetos != "") {
                objetos[seleccionado].material.needsUpdate = true;
                updatelight();
                renderEscena();
            }
        });

        $('#lcolorBbarra').change(function () {

            $('#lcolorBbox').val($(this).val());
            cBLuz = $(this).val();
            if (objetos != "") {
                objetos[seleccionado].material.needsUpdate = true;
                updatelight();
                renderEscena();
            }
        });

        $('#lposXbarra').change(function () {

            $('#lposXbox').val($(this).val());
            pXLuz = $(this).val();
            if (objetos != "") {
                objetos[seleccionado].material.needsUpdate = true;
                updatelight();
                renderEscena();
            }
        });

        $('#lposYbarra').change(function () {

            $('#lposYbox').val($(this).val());
            pYLuz = $(this).val();
            if (objetos != "") {
                objetos[seleccionado].material.needsUpdate = true;
                updatelight();
                renderEscena();
            }
        });

        $('#lposZbarra').change(function () {

            $('#lposZbox').val($(this).val());
            pZLuz = $(this).val();
            if (objetos != "") {
                objetos[seleccionado].material.needsUpdate = true;
                updatelight();
                renderEscena();
            }
        });
    });
});