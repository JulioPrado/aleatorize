
function randomAte(numMaximo){
	 /* 
	 de 0 a numMaximo -1.
	 se colocar numMaximo+1 no argumento, 
	 vai de 1 até numMaximo.
	 */
	return Math.floor(Math.random()*(numMaximo));
}

function randomEntre(min,max){
	/* valor mínimo = min e valor máximo=max */
   return Math.floor(Math.random() * (max-min+1)+min);
}	

function imprimirFichas(tipo) {
    $('#divImprimir').html($(tipo).clone());

    window.print();

    $('#divImprimir').html('');
}

function colocarAleatNoArray(listaOrigem,listaDestino) {
		/* se o item randômico já tem no array, ele gera outro item randômico, até achar um que não tenha. */
	do{
		var item = listaOrigem[randomAte(listaOrigem.length)];

		if (listaDestino.indexOf(item) > -1) {
		}else{
			listaDestino.push(item);
			 //senão dá looping infinito
			 break;
		}
	 }while (listaDestino.indexOf(item) > -1);
}

function removeFicha(id){
	$(id).fadeOut();
}

function limpaDiv(id){
	document.getElementById(id).innerHTML = '';
}


function pedirPersonagem(){
	limpaDiv('ficha');
	
 	var d = document.getElementById('selecQtd').value;
 	var pos= 0;
	for (var i=0; i<d; i++){
		gerarPersonagem(pos);
		pos++;
	}

	/*
	$('.imprimir').removeClass('d-none');*/

	/* scroll até as fichas*/
	window.scroll(0,$( "#ficha" ).offset().top); 
	
}

function inserirNome(pos){
	let nomeInserido = document.getElementById('nomeFicha'+pos).value;
	document.getElementById('nome'+pos).innerHTML="<h3 class='text-center'>"+nomeInserido+"</h3>";
}


/*-------------------------------------- gerar ficha--*/
function gerarPersonagem(pos){

	var personagem={
		'pos': pos,
		'cenario':'Geral',
		'raca': '',
		'estagio':0,
		'armadura':'',
		'arma':'',
		'complicacoesMa':[],
		'complicacoesMe':[],
		'atributos':{
			'agilidade':1,
			'astucia':1,
			'espirito':1,
			'forca':1,
			'vigor':1,
		},		
		'movimento': 0,
		'dadoCorrer':0,
		'aparar':0,
		'resistencia':0,
		'vantagens':[],
		'pericias':{
			/*agilidade*/
			'atirar':0,
			'cavalgar':0,
			'atletismo':1,
			'dirigir':0,
			'furtividade':1,
			'ladinagem':0,
			'lutar':0,
			'navegar':0,
			'pilotar':0,

			/* espirito */
			'intimidar':0,
			'performance':0,
			'persuadir':1,

			/*Astúcia*/			
			'ciencia':0,
			'conAcademico':0,
			'conBatalha':0,
			'conGeral':1,
			'consertar':0,
			'curar':0,
			'eletronica':0,
			'hackear':0,
			'idiomas':0,
			'jogar':0,
			'ocultismo':0,
			'perceber':1,
			'pesquisar':0,
			'provocar':0,
			'sobrevivencia':0
			/* AA
			'foco':0,
			'fe':0,
			'conjurar':0,
			'psionicos':0,
			'cieEstranha':0,*/
			}
	}

/************  RAÇAS *************************************/
	function definirRaca(){

	var listaRacas = [
		"Anão",
		"Androide",
		"Aquariano",
		"Aviano",
		"Elfo",
		"Meio-elfo",
		"Humano",
		"Pequenino",
		"Rakashano",
		"Sáurio",
		"Celestial",
		"Guardião"];

	
	return listaRacas[randomAte(listaRacas.length)];
	}
	personagem.raca=definirRaca();
/************ ATRIBUTOS ***********************************/

	function definirAtributos(){
		/*define quantos pontos de atributo serão gastos na ficha*/
		const pontosAtributo = 5;
		for (var i=0;i<pontosAtributo;i++){

			switch(randomAte(5)){
				/* utilizado ternário pois nenhuma pode passar de 5 */
				case 0:
					personagem.atributos.agilidade<5 ? personagem.atributos.agilidade++ : personagem.atributos.astucia++;
					break;
				case 1:
					personagem.atributos.astucia<5 ? personagem.atributos.astucia++ : personagem.atributos.espirito++;
					break;
				case 2:
					personagem.atributos.espirito<5 ? personagem.atributos.espirito++ : personagem.atributos.forca++;
					break;
				case 3:
					personagem.atributos.forca<5 ? personagem.atributos.forca++ : personagem.atributos.vigor++;
					break;
				case 4:
					personagem.atributos.vigor<5 ? personagem.atributos.vigor++ : personagem.atributos.agilidade++;
					break;
				default:
					console.log("Atributo invalido");
			}
		}
	}

definirAtributos();

/************ PERíCIAS ***********************************/

	function definirPericias(){
		/*define quantos pontos de perícia serão gastos na ficha*/
		const pontosPericia = 15;

		/*define qual o maior e menor entre agilidade, astúcia e espirito*/
		var maiorAtributo;
		var menorAtributo;

		if (personagem.atributos.agilidade>=personagem.atributos.astucia&&personagem.atributos.agilidade>=personagem.atributos.espirito){ maiorAtributo = 'agilidade'
		}else if (personagem.atributos.astucia>=personagem.atributos.agilidade&&personagem.atributos.astucia>=personagem.atributos.espirito){ maiorAtributo = 'astucia'
			}else{ maiorAtributo = 'espirito'};

		
		if (personagem.atributos.espirito<=personagem.atributos.agilidade&&personagem.atributos.espirito<=personagem.atributos.astucia){ menorAtributo = 'espirito'
			}else if (personagem.atributos.agilidade<=personagem.atributos.astucia&&personagem.atributos.agilidade<=personagem.atributos.espirito){ menorAtributo = 'agilidade'
				} else { menorAtributo = 'astucia'};


		/*serão definidas de acordo com os atributos*/
		var periciasPrincipais=['atletismo','furtividade','persuadir','conGeral','perceber'];
		var periciasSecundarias=['cavalgar','dirigir','navegar','pilotar','curar','sobrevivencia','intimidar','provocar','consertar','jogar','conBatalha'];

		switch(maiorAtributo){
			case 'agilidade':
					periciasSecundarias.push('ladinagem');
					personagem.atributos.forca>1 ? periciasPrincipais.push('lutar') : periciasPrincipais.push('atirar');

				break; 
			case 'astucia':
					periciasSecundarias.push('ciencia','conAcademico','pesquisar','idiomas','ocultismo','eletronica','hackear');
					personagem.atributos.forca>1 ? periciasSecundarias.push('lutar') : periciasSecundarias.push('atirar');
				break;

			case 'espirito':
					periciasSecundarias.push('performance');
					personagem.atributos.forca>1 ? periciasSecundarias.push('lutar') : periciasSecundarias.push('atirar');

				break;

			default: console.log("Maior atributo inválido!");
		}

		function aumentarPericia(pericia){
			if (pericia=='atirar') { if(personagem.atributos.agilidade>personagem.pericias.atirar){personagem.pericias.atirar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.atirar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='cavalgar') { if(personagem.atributos.agilidade>personagem.pericias.cavalgar){personagem.pericias.cavalgar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.cavalgar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='atletismo') { if(personagem.atributos.agilidade>personagem.pericias.atletismo){personagem.pericias.atletismo++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.atletismo++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='dirigir') { if(personagem.atributos.agilidade>personagem.pericias.dirigir){personagem.pericias.dirigir++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.dirigir++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='furtividade') { if(personagem.atributos.agilidade>personagem.pericias.furtividade){personagem.pericias.furtividade++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.furtividade++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='ladinagem') { if(personagem.atributos.agilidade>personagem.pericias.ladinagem){personagem.pericias.ladinagem++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.ladinagem++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='lutar') { if(personagem.atributos.agilidade>personagem.pericias.lutar){personagem.pericias.lutar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.lutar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='navegar') { if(personagem.atributos.agilidade>personagem.pericias.navegar){personagem.pericias.navegar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.navegar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='pilotar') { if(personagem.atributos.agilidade>personagem.pericias.pilotar){personagem.pericias.pilotar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.pilotar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='intimidar') { if(personagem.atributos.espirito>personagem.pericias.intimidar){personagem.pericias.intimidar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.intimidar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='performance') { if(personagem.atributos.espirito>personagem.pericias.performance){personagem.pericias.performance++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.performance++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='persuadir') { if(personagem.atributos.espirito>personagem.pericias.persuadir){personagem.pericias.persuadir++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.persuadir++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='ciencia') { if(personagem.atributos.astucia>personagem.pericias.ciencia){personagem.pericias.ciencia++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.ciencia++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='conAcademico') { if(personagem.atributos.astucia>personagem.pericias.conAcademico){personagem.pericias.conAcademico++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.conAcademico++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='conBatalha') { if(personagem.atributos.astucia>personagem.pericias.conBatalha){personagem.pericias.conBatalha++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.conBatalha++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='conGeral') { if(personagem.atributos.astucia>personagem.pericias.conGeral){personagem.pericias.conGeral++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.conGeral++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='consertar') { if(personagem.atributos.astucia>personagem.pericias.consertar){personagem.pericias.consertar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.consertar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='curar') { if(personagem.atributos.astucia>personagem.pericias.curar){personagem.pericias.curar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.curar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='eletronica') { if(personagem.atributos.astucia>personagem.pericias.eletronica){personagem.pericias.eletronica++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.eletronica++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='hackear') { if(personagem.atributos.astucia>personagem.pericias.hackear){personagem.pericias.hackear++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.hackear++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='idiomas') { if(personagem.atributos.astucia>personagem.pericias.idiomas){personagem.pericias.idiomas++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.idiomas++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='jogar') { if(personagem.atributos.astucia>personagem.pericias.jogar){personagem.pericias.jogar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.jogar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='ocultismo') { if(personagem.atributos.astucia>personagem.pericias.ocultismo){personagem.pericias.ocultismo++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.ocultismo++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='perceber') { if(personagem.atributos.astucia>personagem.pericias.perceber){personagem.pericias.perceber++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.perceber++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='pesquisar') { if(personagem.atributos.astucia>personagem.pericias.pesquisar){personagem.pericias.pesquisar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.pesquisar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='provocar') { if(personagem.atributos.astucia>personagem.pericias.provocar){personagem.pericias.provocar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.provocar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='sobrevivencia') { if(personagem.atributos.astucia>personagem.pericias.sobrevivencia){personagem.pericias.sobrevivencia++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.sobrevivencia++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			console.log("Pericia inválida!!");	
		}


		var arrayPericias = Object.keys(personagem.pericias);
		for (var pontosGastar=pontosPericia; pontosGastar>0; pontosGastar--){

			/*levando em consideração o atributo mais alto
			let numAleat= randomEntre(1,10);

			numAleat<7 ? pericia = periciasPrincipais[randomAte(periciasPrincipais.length)] : pericia = periciasSecundarias[randomAte(periciasSecundarias.length)];
			*/


			/*escolhe das perícias completamente aleatória */
			pericia = arrayPericias[randomAte(arrayPericias.length)]


		 	aumentarPericia(pericia);
		}

	}
definirPericias();
/************* COMPLICAÇÕES  *****************************/

	var compMaiores = [];
	var compMenores = [];

	compMaiores.push(
	"Arrogante",
	"Atrapalhado",
	"Cego",
	"Código de Honra",
	"Covarde",
	"Curioso",
	"Deficiente Auditivo",
	"Delirante",
	"Desconfiado",
	"Excesso de confiança",
	"Feio",
	"Fobia",
	"Forasteiro",
	"Ganancioso",
	"Guiado",
	"Hábito",
	"Heróico",
	"Idoso",
	"Impulsivo",
	"Inimigo",
	"Invejoso",
	"Jovem",
	"Lento",
	"Língua presa",
	"Má sorte",
	"Mudo",
	"Obrigação",
	"Pacifista",
	"Procurado",
	"Sanguinário",
	"Segredo",
	"Sem escrúpulos",
	"Sem noção",
	"Sensível",
	"Um braço só",
	"Um olho só",
	"Vergonha",
	"Vingativo",
	"Visão ruim",
	"Voto")

	compMenores.push(
	"Almofadinha",
	"Analfabeto",
	"Anêmico",
	"Boca Grande",
	"Cauteloso",
	"Deficiente Auditivo",
	"Delirante",
	"Desagradável",
	"Desastrado",
	"Desconfiado",
	"Desejo de Morrer",
	"Feio",
	"Fobia",
	"Forasteiro",
	"Ganancioso",
	"Guiado",
	"Hábito",
	"Hesitante",
	"Incrédulo",
	"Inimigo",
	"Invejoso",
	"Jovem",
	"Leal",
	"Lento",
	"Não sabe nadar",
	"Obeso",
	"Obrigação",
	"Pacifista",
	"Peculiaridade",
	"Pequeno",
	"Pobreza",
	"Procurado",
	"Segredo",
	"Sem escrúpulos",
	"Sensível",
	"Teimoso",
	"Vergonha",
	"Vingativo",
	"Visão ruim",
	"Voto")

	function definirComp(){

		switch(randomAte(3)){

		case 0:
			colocarAleatNoArray(compMaiores,personagem.complicacoesMa);
			colocarAleatNoArray(compMaiores,personagem.complicacoesMa);
			personagem.complicacoesMe= 0;
			break;
		case 1:
			colocarAleatNoArray(compMaiores,personagem.complicacoesMa);
			colocarAleatNoArray(compMenores,personagem.complicacoesMe);
			colocarAleatNoArray(compMenores,personagem.complicacoesMe);
			break;
		case 2:
			colocarAleatNoArray(compMenores,personagem.complicacoesMe);
			colocarAleatNoArray(compMenores,personagem.complicacoesMe);
			colocarAleatNoArray(compMenores,personagem.complicacoesMe);
			colocarAleatNoArray(compMenores,personagem.complicacoesMe);
			personagem.complicacoesMa= 0;
			break;
		default:
			console.log("Erro ao definir complicações.");
		}
	}

definirComp()
/************ VANTANGENS ***********************************/



/************ CARAC DERIVADAS / EQUIPAMENTOS ***********************************/
	function definirDerivadas(){

	 	personagem.movimento=6;
	 	
	 	personagem.pericias.lutar>0 ? personagem.aparar=2+personagem.pericias.lutar+1 : personagem.aparar=2;
	 	/* lógica do aparar
		lutar  dado  metade
			0   /  0
	 		1 	D4 	2 
	 		2 	D6 	3
	 		3 	D8 	4
	 		4 	D10 5
	 		5 	D12 6
	 	*/

	 	personagem.resistencia=2+personagem.atributos.vigor+1;
	 	/* lógica da resistencia
		vigor  dado  metade  total
	 		1 	D4 	2 			4
	 		2 	D6 	3			5
	 		3 	D8 	4 			6
	 		4 	D10 5 			7
	 		5 	D12 6 			8
	 	
		e no final jogar um +3, +2 ou +1 de armadura
	 	*/

	 	switch(personagem.atributos.forca){
	 	 case 1:
	 	 	personagem.resistencia=personagem.resistencia+1+"(1)";
	 	 	personagem.armadura="Considere uma armadura/vestimenta que protege +1";
	 	 	personagem.arma="Arma c/c com dano For+D4 <br/>e/ou Faca/Adaga de arremesso 03/06/12 For+D4";
	 	 	break
	 	 case 2:
	 	 	personagem.resistencia=personagem.resistencia+2+"(2)";
	 	 	personagem.armadura="Considere uma armadura/vestimenta que protege +2"
	 	 	personagem.arma="Arma c/c com dano For+D6 <br/>e/ou arma de ataque a distância com dano 2D6";
	 	 	break;
	 	 case 3:
	 	 	personagem.resistencia=personagem.resistencia+3+"(3)";
	 	 	personagem.armadura="Considere uma armadura/vestimenta que protege +3"
	 	 	personagem.arma="Arma c/c com dano máximo de For+D8 <br/>e/ou arma de ataque a distância com dano 2D8";
	 	 	break;

	 	 /*se for 4 ou 5*/	
	 	 default:
	 	 	personagem.resistencia=personagem.resistencia+3+"(3)";
	 	 	personagem.armadura="Considere uma armadura/vestimenta que protege +3"
	 	 	personagem.arma="Arma c/c com dano máximo de For+D10 <br/>e/ou arma de ataque a distância com dano 2D8";
	 	 }
	}


 definirDerivadas();

/************* Inserir na DIV ******************************/

	function adicionaFicha(personagem){
		var personagem = personagem;

		function colocarDados(variavel) {
			let resposta;
			switch(variavel){
				case 1:
					resposta= '<img class="iconeDados" src="d4.png"><img class="iconeDados" src="d6c.png"><img class="iconeDados" src="d8c.png"><img class="iconeDados" src="d10c.png"><img class="iconeDados" src="d12c.png">';
					break;
				case 2:
					resposta= '<img class="iconeDados" src="d4.png"><img class="iconeDados" src="d6.png"><img class="iconeDados" src="d8c.png"><img class="iconeDados" src="d10c.png"><img class="iconeDados" src="d12c.png">';
					break;
				case 3:
					resposta= '<img class="iconeDados" src="d4.png"><img class="iconeDados" src="d6.png"><img class="iconeDados" src="d8.png"><img class="iconeDados" src="d10c.png"><img class="iconeDados" src="d12c.png">';
					break;
				case 4:
					resposta= '<img class="iconeDados" src="d4.png"><img class="iconeDados" src="d6.png"><img class="iconeDados" src="d8.png"><img class="iconeDados" src="d10.png"><img class="iconeDados" src="d12c.png">';
					break;
				case 5:
					resposta= '<img class="iconeDados" src="d4.png"><img class="iconeDados" src="d6.png"><img class="iconeDados" src="d8.png"><img class="iconeDados" src="d10.png"><img class="iconeDados" src="d12.png">';
					break;
				default:
					resposta= '<img class="iconeDados" src="d4c.png"><img class="iconeDados" src="d6c.png"><img class="iconeDados" src="d8c.png"><img class="iconeDados" src="d10c.png"><img class="iconeDados" src="d12c.png">';
			}

		 return resposta;
		} /* fim colocar dados */

		 personagem.atributos.agilidade = colocarDados(personagem.atributos.agilidade);
		 personagem.atributos.forca = colocarDados(personagem.atributos.forca);
		 personagem.atributos.vigor = colocarDados(personagem.atributos.vigor);
		 personagem.atributos.astucia = colocarDados(personagem.atributos.astucia);
		 personagem.atributos.espirito = colocarDados(personagem.atributos.espirito);

		 /*pericias */
		 if(personagem.pericias.atirar){personagem.pericias.atirar = colocarDados(personagem.pericias.atirar);}
		 if(personagem.pericias.atletismo){personagem.pericias.atletismo = colocarDados(personagem.pericias.atletismo);}
		 if(personagem.pericias.cavalgar){personagem.pericias.cavalgar = colocarDados(personagem.pericias.cavalgar);}
		 if(personagem.pericias.dirigir){ personagem.pericias.dirigir= colocarDados(personagem.pericias.dirigir);}
		 if(personagem.pericias.furtividade){personagem.pericias.furtividade = colocarDados(personagem.pericias.furtividade);}
		 if(personagem.pericias.ladinagem){ personagem.pericias.ladinagem= colocarDados(personagem.pericias.ladinagem);}
		 if(personagem.pericias.lutar){personagem.pericias.lutar = colocarDados(personagem.pericias.lutar);}
		 if(personagem.pericias.navegar){ personagem.pericias.navegar= colocarDados(personagem.pericias.navegar);}
		 if(personagem.pericias.pilotar){ personagem.pericias.pilotar= colocarDados(personagem.pericias.pilotar);}
		 if(personagem.pericias.intimidar){personagem.pericias.intimidar = colocarDados(personagem.pericias.intimidar);}
		 if(personagem.pericias.performance){personagem.pericias.performance = colocarDados(personagem.pericias.performance);}
		 if(personagem.pericias.persuadir){ personagem.pericias.persuadir= colocarDados(personagem.pericias.persuadir);}
		 if(personagem.pericias.ciencia){ personagem.pericias.ciencia= colocarDados(personagem.pericias.ciencia);}
		 if(personagem.pericias.conAcademico){ personagem.pericias.conAcademico= colocarDados(personagem.pericias.conAcademico);}
		 if(personagem.pericias.conBatalha){ personagem.pericias.conBatalha= colocarDados(personagem.pericias.conBatalha);}
		 if(personagem.pericias.conGeral){personagem.pericias.conGeral = colocarDados(personagem.pericias.conGeral);}
		 if(personagem.pericias.consertar){personagem.pericias.consertar = colocarDados(personagem.pericias.consertar);}
		 if(personagem.pericias.curar){personagem.pericias.curar = colocarDados(personagem.pericias.curar);}
		 if(personagem.pericias.eletronica){personagem.pericias.eletronica = colocarDados(personagem.pericias.eletronica);}
		 if(personagem.pericias.hackear){ personagem.pericias.hackear= colocarDados(personagem.pericias.hackear);}
		 if(personagem.pericias.idiomas){personagem.pericias.idiomas = colocarDados(personagem.pericias.idiomas);}
		 if(personagem.pericias.jogar){personagem.pericias.jogar = colocarDados(personagem.pericias.jogar);}
		 if(personagem.pericias.ocultismo){personagem.pericias.ocultismo = colocarDados(personagem.pericias.ocultismo);}
		 if(personagem.pericias.perceber){personagem.pericias.perceber= colocarDados(personagem.pericias.perceber);}
		 if(personagem.pericias.pesquisar){personagem.pericias.pesquisar = colocarDados(personagem.pericias.pesquisar);}
		 if(personagem.pericias.provocar){personagem.pericias.provocar = colocarDados(personagem.pericias.provocar);}
		 if(personagem.pericias.sobrevivencia){personagem.pericias.sobrevivencia= colocarDados(personagem.pericias.sobrevivencia);}



		 /* transforma o array em string e adiciona vírgulas e ponto final */
		 let stringAux='';
		for (var i=0;i<personagem.complicacoesMa.length;i++){
			stringAux+=personagem.complicacoesMa[i];
			if (i==personagem.complicacoesMa.length-1) {
				stringAux+='.';
			}else{
				stringAux+=', ';
			}
		 }

		 personagem.complicacoesMa=stringAux;
		 stringAux=''
		 for (var i=0;i<personagem.complicacoesMe.length;i++){
			stringAux+=personagem.complicacoesMe[i];
			if (i==personagem.complicacoesMe.length-1) {
				stringAux+='.';
			}else{
				stringAux+=', ';
			}
		 }
		 personagem.complicacoesMe=stringAux;


		 $ ('#ficha').append(
		 "<div class='borda p-4 mt-3' id='ficha"+personagem.pos+"' class='fichaFinal'>	"
		 +"</div>"
		 );

		 $ ('#ficha'+personagem.pos).append(
		" 	<img src='logo.png' class='right' width='200' />"
		+" 	<div class='text-center'>"
		+" 	<span class='remover btn btn-outline-danger' onclick='removeFicha(ficha"+personagem.pos+")'>Excluir ficha</span>"
		+" 	</div>"
		+" 	<div class='text-center'>"
		+" 	</div>"
		+" 	<br>"
		+" 	Cenário: <span>"+personagem.cenario+"</span>"
		+" 	<br/>"
		+" 	Raça: <span>"+personagem.raca+"</span><span id='nome"+personagem.pos+"'>"
		+" <div class='formNome'>"
		+" 	<form method='get'>"
		+" 		<input type='text' id='nomeFicha"+pos+"' placeholder='Nome para o personagem'>"
		+" 		<button onclick='inserirNome("+pos+")' type='button' class='remover btn btn-dark'>"
		+" 		Inserir"
		+" 		</button>"
		+" 	</form>"
		+" </div>"

		+"</span>"
		+" 	<div class='mb-3 alinhaDireita'>"
		+"  <span> Agilidade:"+personagem.atributos.agilidade+"</span><br/>"
		+"  <span> Astúcia: "+personagem.atributos.astucia+"</span><br/>"
		+"  <span> Espirito:"+personagem.atributos.espirito+"</span><br/>"
		+"  <span> Força:"+personagem.atributos.forca+"</span><br/>"
		+"  <span> Vigor:"+personagem.atributos.vigor+"</span><br/>"
		+"  </div>"
		+" Movimento: <span>"+personagem.movimento+"</span>, Aparar: <span>"+personagem.aparar+"</span>, Resistência: <span>"+personagem.resistencia+"</span>."
		+" 	<br/>");

		 if (personagem.complicacoesMa) {
		 $ ('#ficha'+personagem.pos).append(
		"<strong>Complicações Maiores:</strong> "
		+"<span>"+personagem.complicacoesMa+"</span><br/>");}

		 if (personagem.complicacoesMe) {
		 $ ('#ficha'+personagem.pos).append(
		" 	<strong>Complicações Menores:</strong> "
		+" 	<span>"+personagem.complicacoesMe+"</span><br/>");}

		$ ('#ficha'+personagem.pos).append(
		" 	<strong>Vantagens:</strong> [Ainda em desenvolvimento]<br/><br/>"
		);
		$ ('#ficha'+personagem.pos).append("<div id='boxPericias"+personagem.pos+"' class='alinhaDireita'></div>");
		if (personagem.pericias.atirar) {$ ('#boxPericias'+personagem.pos).append("<span>Atirar</span>: <span>"+personagem.pericias.atirar+"</span> <br>")};
		if (personagem.pericias.atletismo) {$ ('#boxPericias'+personagem.pos).append("<span>Atletismo</span>: <span>"+personagem.pericias.atletismo+"</span> <br>")};
		if (personagem.pericias.cavalgar) {$ ('#boxPericias'+personagem.pos).append("<span>Cavalgar</span>: <span>"+personagem.pericias.cavalgar+"</span> <br>")};
		if (personagem.pericias.dirigir) {$ ('#boxPericias'+personagem.pos).append("<span>Dirigir</span>: <span>"+personagem.pericias.dirigir+"</span> <br>")};
		if (personagem.pericias.furtividade) {$ ('#boxPericias'+personagem.pos).append("<span>Furtividade</span>: <span>"+personagem.pericias.furtividade+"</span> <br>")};
		if (personagem.pericias.ladinagem) {$ ('#boxPericias'+personagem.pos).append("<span>Ladinagem</span>: <span>"+personagem.pericias.ladinagem+"</span> <br>")};
		if (personagem.pericias.lutar) {$ ('#boxPericias'+personagem.pos).append("<span>Lutar</span>: <span>"+personagem.pericias.lutar+"</span> <br>")};
		if (personagem.pericias.navegar) {$ ('#boxPericias'+personagem.pos).append("<span>Navegar</span>: <span>"+personagem.pericias.navegar+"</span> <br>")};
		if (personagem.pericias.pilotar) {$ ('#boxPericias'+personagem.pos).append("<span>Pilotar</span>: <span>"+personagem.pericias.pilotar+"</span> <br>")};
		if (personagem.pericias.intimidar) {$ ('#boxPericias'+personagem.pos).append("<span>Intimidar</span>: <span>"+personagem.pericias.intimidar+"</span> <br>")};
		if (personagem.pericias.performance) {$ ('#boxPericias'+personagem.pos).append("<span>Performance</span>: <span>"+personagem.pericias.performance+"</span> <br>")};
		if (personagem.pericias.persuadir) {$ ('#boxPericias'+personagem.pos).append("<span>Persuadir</span>: <span>"+personagem.pericias.persuadir+"</span> <br>")};
		if (personagem.pericias.ciencia) {$ ('#boxPericias'+personagem.pos).append("<span>Ciência</span>: <span>"+personagem.pericias.ciencia+"</span> <br>")};
		if (personagem.pericias.conAcademico) {$ ('#boxPericias'+personagem.pos).append("<span>C.Acadêmico</span>: <span>"+personagem.pericias.conAcademico+"</span> <br>")};
		if (personagem.pericias.conBatalha) {$ ('#boxPericias'+personagem.pos).append("<span>C.Batalha</span>: <span>"+personagem.pericias.conBatalha+"</span> <br>")};
		if (personagem.pericias.conGeral) {$ ('#boxPericias'+personagem.pos).append("<span>C.Geral</span>: <span >"+personagem.pericias.conGeral+"</span> <br>")};
		if (personagem.pericias.consertar) {$ ('#boxPericias'+personagem.pos).append("<span>Consertar</span>: <span>"+personagem.pericias.consertar+"</span> <br>")};
		if (personagem.pericias.curar) {$ ('#boxPericias'+personagem.pos).append("<span>Curar</span>: <span>"+personagem.pericias.curar+"</span> <br>")};
		if (personagem.pericias.eletronica) {$ ('#boxPericias'+personagem.pos).append("<span>Eletrônica</span>: <span>"+personagem.pericias.eletronica+"</span> <br>")};
		if (personagem.pericias.hackear) {$ ('#boxPericias'+personagem.pos).append("<span>Hackear</span>: <span>"+personagem.pericias.hackear+"</span> <br>")};
		if (personagem.pericias.idiomas) {$ ('#boxPericias'+personagem.pos).append("<span>Idiomas</span>: <span>"+personagem.pericias.idiomas+"</span> <br>")};
		if (personagem.pericias.jogar) {$ ('#boxPericias'+personagem.pos).append("<span>Jogar</span>: <span>"+personagem.pericias.jogar+"</span> <br>")};
		if (personagem.pericias.ocultismo) {$ ('#boxPericias'+personagem.pos).append("<span>Ocultismo</span>: <span>"+personagem.pericias.ocultismo+"</span> <br>")};
		if (personagem.pericias.perceber) {$ ('#boxPericias'+personagem.pos).append("<span>Perceber</span>: <span>"+personagem.pericias.perceber+"</span> <br>")};
		if (personagem.pericias.pesquisar) {$ ('#boxPericias'+personagem.pos).append("<span>Pesquisar</span>: <span>"+personagem.pericias.pesquisar+"</span> <br>")};
		if (personagem.pericias.provocar) {$ ('#boxPericias'+personagem.pos).append("<span>Provocar</span>: <span>"+personagem.pericias.provocar+"</span> <br>")};
		if (personagem.pericias.sobrevivencia) {$ ('#boxPericias'+personagem.pos).append("<span>Sobrevivência</span>: <span>"+personagem.pericias.sobrevivencia+"</span> <br>")};

		$ ('#ficha'+personagem.pos).append(
		" <br/>"
		+" 	<strong>Equipamentos:</strong> <br/>"+personagem.armadura
		+" 	<br/>"
		+" 	<strong>Armas e Poderes:</strong><br/>"+personagem.arma
		+" 	<br/>"
		);
	}
	adicionaFicha(personagem);
}

