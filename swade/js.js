
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
		'cenario':'',
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
		'poderes':[],
		'pericias':{
			'dirigir':0,
			'pilotar':0,
			'eletronica':0,
			'hackear':0,
			'atirar':0,
			'cavalgar':0,
			'atletismo':0,
			'furtividade':0,
			'ladinagem':0,
			'lutar':0,
			'navegar':0,
			'intimidar':0,
			'performance':0,
			'persuadir':0,	
			'ciencia':0,
			'conAcademico':0,
			'conBatalha':0,
			'conGeral':0,
			'consertar':0,
			'curar':0,
			'idiomas':0,
			'jogar':0,
			'ocultismo':0,
			'perceber':0,
			'pesquisar':0,
			'provocar':0,
			'sobrevivencia':0,
			'foco':0,
			'fe':0,
			'conjurar':0,
			'psionicos':0,
			'cieEstranha':0
			}
	}

	var qntVantagens=2;
/*********** Definir Cenário **********/

personagem.cenario = document.getElementById('selectCenario').value;

if (personagem.cenario=="Fantasia Medieval") {

}


/************  RAÇAS *************************************/
	function definirRaca(){

	let chk = '';
	var listaRacas = [];

	chk = document.getElementById('racaAnao');
	if (chk.checked) {listaRacas.push("Anão");}

	chk = document.getElementById('racaAndroide');
	if (chk.checked) {listaRacas.push("Androide");}

	chk = document.getElementById('racaAquariano');
	if (chk.checked) {listaRacas.push("Aquariano");}

	chk = document.getElementById('racaAviano');
	if (chk.checked) {listaRacas.push("Aviano");}

	chk = document.getElementById('racaElfo');
	if (chk.checked) {listaRacas.push("Elfo");}
	
	chk = document.getElementById('racaMeioElfo');
	if (chk.checked) {listaRacas.push("Meio-elfo");}

	chk = document.getElementById('racaHumano');
	if (chk.checked) {listaRacas.push("Humano");}

	chk = document.getElementById('racaPequenino');
	if (chk.checked) {listaRacas.push("Pequenino");}

	chk = document.getElementById('racaRakashano');
	if (chk.checked) {listaRacas.push("Rakashano");}

	chk = document.getElementById('racaSaurio');
	if (chk.checked) {listaRacas.push("Sáurio");}

	chk = document.getElementById('racaCelestial');
	if (chk.checked) {listaRacas.push("Celestial");}

	chk = document.getElementById('racaGuardiao');
	if (chk.checked) {listaRacas.push("Guardião");}
	
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
		const pontosPericia = 12;

		var periciasMaisProvaveis=[];
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
			if (pericia=='foco') {if(!personagem.pericias.foco){qntVantagens--;personagem.vantagens.push("Antecedente Arcano (Dom)");} if(personagem.atributos.espirito>personagem.pericias.foco){personagem.pericias.foco++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.foco++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='fe') {if(!personagem.pericias.fe){qntVantagens--; personagem.vantagens.push("Antecedente Arcano (Milagres)");} if(personagem.atributos.espirito>personagem.pericias.fe){personagem.pericias.fe++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.fe++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='conjurar') {if(!personagem.pericias.conjurar){qntVantagens--; personagem.vantagens.push("Antecedente Arcano (Magia)");} if(personagem.atributos.astucia>personagem.pericias.conjurar){personagem.pericias.conjurar++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.conjurar++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='psionicos') {if(!personagem.pericias.psionicos){qntVantagens--; personagem.vantagens.push("Antecedente Arcano (Psiônicos)");} if(personagem.atributos.astucia>personagem.pericias.psionicos){personagem.pericias.psionicos++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.psionicos++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			if (pericia=='cieEstranha') {if(!personagem.pericias.cieEstranha){qntVantagens--; personagem.vantagens.push("Antecedente Arcano (Ciênca Estranha)");} if(personagem.atributos.astucia>personagem.pericias.cieEstranha){personagem.pericias.cieEstranha++; console.log("Gastou 1 pontos de perícia para comprar "+pericia);}else{personagem.pericias.cieEstranha++; pontosGastar--; console.log("Gastou 2 pontos de perícia para comprar "+pericia)}}else
			console.log("Pericia inválida!!");	

			periciasMaisProvaveis.push(pericia);
		}

		var arrayPericias = Object.keys(personagem.pericias);

		/*retira da lista as pericias de cenario moderno*/
		if (personagem.cenario=="Fantasia Medieval") { arrayPericias.splice(0,4); };

		

		/*retira da lista as 5 perícias arcanas*/
		arrayPericias.pop();
		arrayPericias.pop();
		arrayPericias.pop();
		arrayPericias.pop();
		arrayPericias.pop();

		perChk = document.getElementById('perFoco');
		if (perChk.checked) {arrayPericias.push("foco");};

		perChk = document.getElementById('perConj');
		if (perChk.checked) {arrayPericias.push("conjurar");};
		
		perChk = document.getElementById('perFe');
		if (perChk.checked) {arrayPericias.push("fe");};

		perChk = document.getElementById('perPsi');
		if (perChk.checked) {arrayPericias.push("psionicos");};
			
		perChk = document.getElementById('perCieEst');
		if (perChk.checked) {arrayPericias.push("cieEstranha");};
			
		console.log("pericias usadas:"+arrayPericias);

		/*pericias basicas*/
		aumentarPericia('atletismo');
		aumentarPericia('furtividade');
		aumentarPericia('persuadir');
		aumentarPericia('conGeral');
		aumentarPericia('perceber');

		if (personagem.atributos.forca>1) {periciasMaisProvaveis.push('lutar')};
		if (personagem.atributos.agilidade>1){ periciasMaisProvaveis.push('atirar')};

		for (var pontosGastar=pontosPericia; pontosGastar>0; pontosGastar--){

			let numAleat= randomEntre(1,10);
			
			if(numAleat>6){
				pericia = periciasMaisProvaveis[randomAte(periciasMaisProvaveis.length)];
	
			} else{
				pericia = arrayPericias[randomAte(arrayPericias.length)];
				periciasMaisProvaveis.push(pericia);
			}


		 	aumentarPericia(pericia);

		 	if (pericia=='foco'||pericia=='fe'||pericia=='cieEstranha'||pericia=='conjurar'||pericia=='psionicos') {
		 		arrayPericias.pop();
		 		arrayPericias.pop();
		 		arrayPericias.pop();
		 		arrayPericias.pop();
		 		arrayPericias.pop();
		 		/*para retirar as perícias arcanas da lista de pericias, após uma ja ser atribuida, e coloca novamente a escolhida*/
		 		arrayPericias.push(pericia);
		 	}
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
	function definirVantagens(){

		var vantPossiveis = [];

		/*vantagens sem requisitos*/
		vantPossiveis.push(
		"Aristocrata",
		"Famoso",
		"Furioso",
		"Prontidão",
		"Rico",
		"Sorte",
		"Noção do Perigo",
		"Elo Animal",
		"Ameaçador",
		"Conexões"
		);

		/*requisitos de atributos*/
		if (personagem.atributos.agilidade>=2) {
			vantPossiveis.push("Ligeiro");
		}
		if (personagem.atributos.agilidade>=3) {
			vantPossiveis.push(
			"Ambidestro",
			"Rápido",
			"Atacar Primeiro",
			"Atirar com Duas Armas",
			"Corredor",
			"Lutar com Duas Armas",
			"Mãos Firmes",
			"Retirada",
			"Ás");
		}

		if (personagem.atributos.astucia>=2) {
			vantPossiveis.push(
			"Linguista",
			"Comando",
			"Manha");
		}

		if (personagem.atributos.astucia>=3) {
			vantPossiveis.push("Calculista");
		}
		if (personagem.atributos.astucia>=4) {
			vantPossiveis.push("Pau Pra Toda Obra");
		}
		if (personagem.atributos.espirito>=2) {
			vantPossiveis.push("Corajoso");
		}
		if (personagem.atributos.espirito>=3) {
			vantPossiveis.push(
			"Carismático",
			"Impulso",
			"Resistência Arcana",
			"Duro de Matar",
			"Curandeiro",
			"Senhor das Feras",
			"Cativar o Ambiente",
			"Confiável",
			"Elevar o Moral",
			"Elo Comum",
			"Obstinado");
		}
		if (personagem.atributos.vigor>=2) {
			vantPossiveis.push("Atraente");
		}
		if (personagem.atributos.vigor>=3) {
			vantPossiveis.push(
			"Cura Rápida",
			"Nervos de Aço",
			"Queixo de Ferro",
			"Coragem Líquida");
		}

		/*requisitos de pericias*/
		if (personagem.pericias.lutar>=2) {
			vantPossiveis.push("Artista Marcial");
		}
		if (personagem.pericias.lutar>=3) {
			vantPossiveis.push("Finta", "Golpe Poderoso");
		}
		if (personagem.pericias.pesquisar>=3) {
			vantPossiveis.push("Erudito");
		}
		if (personagem.pericias.consertar>=3) {
			vantPossiveis.push("Senhor Conserta Tudo");
		}
		if (personagem.pericias.provocar>=2) {
			vantPossiveis.push("Provocador","Réplica");
		}
		if (personagem.pericias.provocar>=3) {
			vantPossiveis.push("Humilhar");
		}

		if (personagem.pericias.atletismo>=3||personagem.pericias.atirar>=3) {
			vantPossiveis.push("Tiro Mortal");
		}

		if (personagem.pericias.atletismo>=3||personagem.pericias.lutar>=3||personagem.pericias.atirar>=3) {
			vantPossiveis.push("Arma Predileta");
		}

		if (personagem.atributos.astucia>=2&&personagem.pericias.consertar>=2&&personagem.pericias.perceber>=3) {
			vantPossiveis.push("McGyver");
		}

		if (personagem.atributos.espirito>=2&&personagem.pericias.sobrevivencia>=3) {
			vantPossiveis.push("Mateiro");
		}

		if (personagem.atributos.astucia>=3&&personagem.pericias.pesquisar>=3) {
			vantPossiveis.push("Investigador");
		}

		if (personagem.atributos.agilidade>=3&&personagem.pericias.furtividade>=3&&personagem.pericias.lutar>=2) {
			vantPossiveis.push("Assassino");
		}

		if (personagem.atributos.agilidade>=3&&personagem.pericias.furtividade>=2&&personagem.pericias.ladinagem>=2) {
			vantPossiveis.push("Ladrão");
		}

		if (personagem.atributos.agilidade>=3&&personagem.pericias.atletismo>=3) {
			vantPossiveis.push("Acrobata");
		}

		if (personagem.atributos.forca>=3&&personagem.pericias.lutar>=3) {
			vantPossiveis.push("Varredura");
		}

		if (personagem.atributos.espirito>=3&&personagem.pericias.lutar>=2) {
			vantPossiveis.push("Campeão");
		}

		if (personagem.atributos.forca>=2&&personagem.atributos.vigor>=2) {
			vantPossiveis.push("Musculoso","Soldado");
		}

		if (personagem.atributos.forca>=3&&personagem.atributos.vigor>=3) {
			vantPossiveis.push("Brigão");
		}

		if (personagem.raca=='Humano') { qntVantagens++; }


		for(let i=1;i<=qntVantagens; i++){
			colocarAleatNoArray(vantPossiveis,personagem.vantagens);
		}
}
definirVantagens();
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
	 	 	personagem.arma="Arma c/c com dano For+D4 <br/>";
	 	 	if (personagem.pericias.atirar) { personagem.arma=personagem.arma+"e/ou Faca/Adaga de arremesso 03/06/12 For+D4";}
	 	 	break
	 	 case 2:
	 	 	personagem.resistencia=personagem.resistencia+2+"(2)";
	 	 	personagem.armadura="Considere uma armadura/vestimenta que protege +2";
	 	 	personagem.arma="Arma c/c com dano For+D6 <br/>";
	 	 	if (personagem.pericias.atirar) { personagem.arma=personagem.arma+"e/ou arma de ataque a distância com dano 2D6"};
	 	 	break;
	 	 case 3:
	 	 	personagem.resistencia=personagem.resistencia+3+"(3)";
	 	 	personagem.armadura="Considere uma armadura/vestimenta que protege +3";
	 	 	personagem.arma="Arma c/c com dano máximo de For+D8 <br/>"
	 	 	if (personagem.pericias.atirar) { personagem.arma=personagem.arma+"e/ou arma de ataque a distância com dano 2D8"};
	 	 	break;

	 	 /*se for 4 ou 5*/	
	 	 default:
	 	 	personagem.resistencia=personagem.resistencia+3+"(3)";
	 	 	personagem.armadura="Considere uma armadura/vestimenta que protege +3";
	 	 	personagem.arma="Arma c/c com dano máximo de For+D10 <br/>"
	 	 	if (personagem.pericias.atirar) { personagem.arma=personagem.arma+"e/ou arma de ataque a distância com dano 2D8"};
	 	 }
	}


 definirDerivadas();

 /************* PODERES ******************************/

var listaPoderes = [];

listaPoderes.push(
	"Ajuda",
	"Amigo das Feras",
	"Andar Nas Paredes",
	"Atordoar",
	"Aumentar/Reduzir Característica",
	"Cavar",
	"Cegar",
	"Confusão",
	"Conjurar Aliado",
	"Cura",
	"Deflexão",
	"Detectar/Ocultar Arcano",
	"Devastação",
	"Elo Mental",
	"Empatia",
	"Enredar",
	"Falar Idioma",
	"Ferir",
	"Iluminar/Obscurecer",
	"Ilusão",
	"Leitura Mental",
	"Manipulação Elemental",
	"Medo",
	"Mudança de Forma",
	"Proteção",
	"Proteção Ambiental",
	"Proteção Arcana",
	"Raio",
	"Rajada",
	"Som/Silêncio",
	"Visão Sombria"
	);

	if (personagem.pericias.foco) {
			colocarAleatNoArray(listaPoderes,personagem.poderes);
		}else if (personagem.pericias.cieEstranha) {
			colocarAleatNoArray(listaPoderes,personagem.poderes);
			colocarAleatNoArray(listaPoderes,personagem.poderes);
			}else if (personagem.pericias.conjurar||personagem.pericias.fe||personagem.pericias.psionicos) {
				colocarAleatNoArray(listaPoderes,personagem.poderes);
				colocarAleatNoArray(listaPoderes,personagem.poderes);
				colocarAleatNoArray(listaPoderes,personagem.poderes);
				};

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
		 if(personagem.pericias.foco){personagem.pericias.foco= colocarDados(personagem.pericias.foco);}
		 if(personagem.pericias.fe){personagem.pericias.fe= colocarDados(personagem.pericias.fe);}
		 if(personagem.pericias.conjurar){personagem.pericias.conjurar= colocarDados(personagem.pericias.conjurar);}
		 if(personagem.pericias.psionicos){personagem.pericias.psionicos= colocarDados(personagem.pericias.psionicos);}
		 if(personagem.pericias.cieEstranha){personagem.pericias.cieEstranha= colocarDados(personagem.pericias.cieEstranha);}



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

		 stringAux=''
		 for (var i=0;i<personagem.vantagens.length;i++){
			stringAux+=personagem.vantagens[i];
			if (i==personagem.vantagens.length-1) {
				stringAux+='.';
			}else{
				stringAux+=', ';
			}
		 }
		 personagem.vantagens=stringAux;

		 stringAux=''
		 for (var i=0;i<personagem.poderes.length;i++){
			stringAux+=personagem.poderes[i];
			if (i==personagem.poderes.length-1) {
				stringAux+='.';
			}else{
				stringAux+=', ';
			}
		 }
		 personagem.poderes=stringAux;



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
		" 	<strong>Vantagens:</strong> <span>"+personagem.vantagens+"</span><br/><br/>"
		);
		$ ('#ficha'+personagem.pos).append("<div id='boxPericias"+personagem.pos+"' class='alinhaDireita'></div>");
		if (personagem.pericias.foco) {$ ('#boxPericias'+personagem.pos).append("<span>Foco : "+personagem.pericias.foco+"</span> <br>")};
		if (personagem.pericias.fe) {$ ('#boxPericias'+personagem.pos).append("<span>Fé : "+personagem.pericias.fe+"</span> <br>")};
		if (personagem.pericias.conjurar) {$ ('#boxPericias'+personagem.pos).append("<span>Conjurar : "+personagem.pericias.conjurar+"</span> <br>")};
		if (personagem.pericias.psionicos) {$ ('#boxPericias'+personagem.pos).append("<span>Psiônicos : "+personagem.pericias.psionicos+"</span> <br>")};
		if (personagem.pericias.cieEstranha) {$ ('#boxPericias'+personagem.pos).append("<span>Ciência Estranha : "+personagem.pericias.cieEstranha+"</span> <br>")};
		if (personagem.pericias.atirar) {$ ('#boxPericias'+personagem.pos).append("<span>Atirar : "+personagem.pericias.atirar+"</span> <br>")};
		if (personagem.pericias.lutar) {$ ('#boxPericias'+personagem.pos).append("<span>Lutar : "+personagem.pericias.lutar+"</span> <br>")};
		if (personagem.pericias.atletismo) {$ ('#boxPericias'+personagem.pos).append("<span>Atletismo : "+personagem.pericias.atletismo+"</span> <br>")};
		if (personagem.pericias.cavalgar) {$ ('#boxPericias'+personagem.pos).append("<span>Cavalgar : "+personagem.pericias.cavalgar+"</span> <br>")};
		if (personagem.pericias.dirigir) {$ ('#boxPericias'+personagem.pos).append("<span>Dirigir : "+personagem.pericias.dirigir+"</span> <br>")};
		if (personagem.pericias.furtividade) {$ ('#boxPericias'+personagem.pos).append("<span>Furtividade :"+personagem.pericias.furtividade+"</span> <br>")};
		if (personagem.pericias.ladinagem) {$ ('#boxPericias'+personagem.pos).append("<span>Ladinagem : "+personagem.pericias.ladinagem+"</span> <br>")};
		if (personagem.pericias.navegar) {$ ('#boxPericias'+personagem.pos).append("<span>Navegar : "+personagem.pericias.navegar+"</span> <br>")};
		if (personagem.pericias.pilotar) {$ ('#boxPericias'+personagem.pos).append("<span>Pilotar : "+personagem.pericias.pilotar+"</span> <br>")};
		if (personagem.pericias.intimidar) {$ ('#boxPericias'+personagem.pos).append("<span>Intimidar : "+personagem.pericias.intimidar+"</span> <br>")};
		if (personagem.pericias.performance) {$ ('#boxPericias'+personagem.pos).append("<span>Performance : "+personagem.pericias.performance+"</span> <br>")};
		if (personagem.pericias.persuadir) {$ ('#boxPericias'+personagem.pos).append("<span>Persuadir : "+personagem.pericias.persuadir+"</span> <br>")};
		if (personagem.pericias.ciencia) {$ ('#boxPericias'+personagem.pos).append("<span>Ciência : "+personagem.pericias.ciencia+"</span> <br>")};
		if (personagem.pericias.conAcademico) {$ ('#boxPericias'+personagem.pos).append("<span>C.Acadêmico : "+personagem.pericias.conAcademico+"</span> <br>")};
		if (personagem.pericias.conBatalha) {$ ('#boxPericias'+personagem.pos).append("<span>C.Batalha : "+personagem.pericias.conBatalha+"</span> <br>")};
		if (personagem.pericias.conGeral) {$ ('#boxPericias'+personagem.pos).append("<span>C.Geral : "+personagem.pericias.conGeral+"</span> <br>")};
		if (personagem.pericias.consertar) {$ ('#boxPericias'+personagem.pos).append("<span>Consertar : "+personagem.pericias.consertar+"</span> <br>")};
		if (personagem.pericias.curar) {$ ('#boxPericias'+personagem.pos).append("<span>Curar : "+personagem.pericias.curar+"</span> <br>")};
		if (personagem.pericias.eletronica) {$ ('#boxPericias'+personagem.pos).append("<span>Eletrônica : "+personagem.pericias.eletronica+"</span> <br>")};
		if (personagem.pericias.hackear) {$ ('#boxPericias'+personagem.pos).append("<span>Hackear : "+personagem.pericias.hackear+"</span> <br>")};
		if (personagem.pericias.idiomas) {$ ('#boxPericias'+personagem.pos).append("<span>Idiomas : "+personagem.pericias.idiomas+"</span> <br>")};
		if (personagem.pericias.jogar) {$ ('#boxPericias'+personagem.pos).append("<span>Jogar : "+personagem.pericias.jogar+"</span> <br>")};
		if (personagem.pericias.ocultismo) {$ ('#boxPericias'+personagem.pos).append("<span>Ocultismo : "+personagem.pericias.ocultismo+"</span> <br>")};
		if (personagem.pericias.perceber) {$ ('#boxPericias'+personagem.pos).append("<span>Perceber : "+personagem.pericias.perceber+"</span> <br>")};
		if (personagem.pericias.pesquisar) {$ ('#boxPericias'+personagem.pos).append("<span>Pesquisar : "+personagem.pericias.pesquisar+"</span> <br>")};
		if (personagem.pericias.provocar) {$ ('#boxPericias'+personagem.pos).append("<span>Provocar : "+personagem.pericias.provocar+"</span> <br>")};
		if (personagem.pericias.sobrevivencia) {$ ('#boxPericias'+personagem.pos).append("<span>Sobrevivência : "+personagem.pericias.sobrevivencia+"</span> <br>")};

		$ ('#ficha'+personagem.pos).append(
		" <br/>"
		+" 	<strong>Equipamentos:</strong> <br/>"+personagem.armadura
		+" 	<br/>"+personagem.arma
		+" 	<div id='boxPoderes"+personagem.pos+"'></div>"
		);
		if (personagem.poderes) {$('#boxPoderes'+personagem.pos).append("<strong>Poderes:</strong><br/>"+personagem.poderes)};
	}
	adicionaFicha(personagem);
}