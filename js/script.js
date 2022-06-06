

$(document).ready(function(){

	$('div#conteudo').load('./home.html');

	$('div#home').click(function(){
		$('div#conteudo').load('./home.html');
	})
	$('div#oraculos').click(function(){
		$('div#conteudo').load('./oraculos.html');

	})
	$('div#geradores').click(function(){
		$('div#conteudo').load('./geradores.html');
	})

	$('.menu-link').click(function(){
		$('.menu-ativo')
			.removeClass('menu-ativo')
			.addClass('menu-passivo');

		$(this)
			.removeClass('menu-passivo')
			.addClass('menu-ativo');
	});		
		
});

