$(document).ready(function () {
    $(".fdt-pg-conteudo").next('.fdt-conteudo-titulo').css('margin-top', '0');

    // run test on initial page load
    checkSize();

    // run test on resize of the window
    $(window).resize(checkSize);
});

//Function to the css rule
function checkSize() {
    if ($(".fdt_ml-menu-titulo").css("display") == "none") {
        var tamanhobox = $(".fdt_ml-menu-dropdown").width();
        var $fecha = $(this).children(".fdt_ml-menu-titulo");
        $(".fdt_ml-menu-titulo").css('width', tamanhobox);
        $(".fdt_ml-menu-titulo").not($fecha).removeClass('fdt-mostra');
        $(".fdt_ml-menu-toggle").click(function () {

            $(this).children(".fdt_ml-menu-titulo").toggleClass('fdt-mostra');
            $(".fdt_ml-menu-titulo").not($fecha).removeClass('fdt-mostra');
        });
        $(".fdt_ml-menu-item").removeClass("aberto");
	}
    else {
        $(".fdt_ml-menu-titulo").css('width', 'auto');
	}
}

// Menu lateral

$(".fdt_ml-menu-item").click(function () {
    $(this).toggleClass("aberto");
    $(this).nextAll(".fdt_ml-menu-item").removeClass("aberto");
    $(this).prevAll(".fdt_ml-menu-item").removeClass("aberto");
});



// Filtro

$(".fdt-toggle-filtro").click(function () {
    $(".fdt-filtro").toggleClass("show");
});
// Ações

$('.fdt-acoes-hide').hide();
$('.fdt-acoes').click(function (e) {
    e.preventDefault();
    // hide all span
    var $this = $(this).parent().find('.fdt-acoes-hide');
    $(".fdt-acoes-hide").not($this).hide();
    // here is what I want to do
    $this.toggle();
});
$('.fdt-acoes-mostra').hover(function (e) {
    e.preventDefault();
    // hide all span
    var $this = $(this).parent().find('.fdt-acoes-hide');
    $(".fdt-acoes-hide").not($this).hide();
    // here is what I want to do
    $this.toggle().toggleClass('fadeIn');
});

// Tooltip

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
// Datepicker


