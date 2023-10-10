

function adicionarCampo(){
	var texto=document.getElementById('campo').value;
	escreverLog("<span style='font-weight: bolder;' >Inserido manualmente</span>: "+texto);
	texto=document.getElementById('campo').value='';
}


function scrollParaLog(){
	let divTopo = document.querySelector('#log').offsetTop; /* topo do elemento */

  	window.scroll({
  		top: divTopo,
    	behavior: "smooth"
  	});
}

var contLinha = 0;

function escreverLog(texto){

	let linha = 'linha'+contLinha;
	var data = new Date();
	var hora= data.getHours();// 0-23
		if (hora<10) {
			hora = '0'+hora;
		}
	var min     = data.getMinutes();// 0-59
		if (min<10) {
			min = '0'+min;
		}

	$('div#inclusoes').prepend("<span id='"+linha+"' ><button onclick='removeLinha("+linha+")' class='btn btn-sm btn-outline-danger btn-remover'>x</button><span style='color:blue' >"+hora + ':' + min+'</span>: '+texto+'<br/></span>');
	contLinha++;
}

function removeLinha(id){
	$(id).fadeOut();
	//$(id).css('display','none');
}


function sessaoInicio(){
	if (confirm("Tem certeza de que quer apagar o histórico e iniciar uma nova sessão?")) {
		$('div#inclusoes').html('');


			// Obtém a data/hora atual
		var data = new Date();

		// Guarda cada pedaço em uma variável
		var dia     = data.getDate();           // 1-31
		var dia_sem = data.getDay();            // 0-6 (zero=domingo)
		var mes     = data.getMonth()+1;          // 0-11 (zero=janeiro)
			if (mes<10) {
				mes = '0'+mes;
			}
		var ano2    = data.getYear();           // 2 dígitos
		var ano4    = data.getFullYear();       // 4 dígitos
		var hora    = data.getHours();          // 0-23
			if (hora<10) {
				hora = '0'+hora;
			}
		var min     = data.getMinutes();        // 0-59
			if (min<10) {
				min = '0'+min;
			}
		var seg     = data.getSeconds();        // 0-59
		var mseg    = data.getMilliseconds();   // 0-999
		var tz      = data.getTimezoneOffset(); // em minutos

		// Formata a data e a hora
		var str_data = dia + '/' + (mes) + '/' + ano4;
		var str_hora = hora + ':' + min/*+ ':' + seg*/;

		switch(dia_sem){
			case 0 : dia_sem='Domingo'; break;
			case 1 : dia_sem='Segunda-feira'; break;
			case 2 : dia_sem='Terça-feira'; break;
			case 3 : dia_sem='Quarta-feira'; break;
			case 4 : dia_sem='Quinta-feira'; break;
			case 5 : dia_sem='Sexta-feira'; break;
			case 6 : dia_sem='Sábado'; break;
			default: dia_sem="Dia da semana inválido.";
		}
		

		$('div#inclusoes').prepend("<h3 style='color:red;'>Iniciando sessão: "+dia_sem+', ' + str_data + ' às ' + str_hora+'</h3>');
		scrollParaLog();
	}
}

/* impressão **************************************/
function finalizaImprime1(){

	var conteudoDiv = $('#inclusoes').html();

	$('#divImprimir').html(conteudoDiv);
    window.print();

    $('#divImprimir').html('');
}

function finalizaImprime2(){
	var conteudo = document.getElementById('inclusoes').innerHTML;
	var telaImpressao = window.open('about:blank');

	telaImpressao.document.write(conteudo);
	telaImpressao.window.print();
	telaImpressao.window.close();
}


/* Oraculos *********************/

var tipoCenario = 'geral'

function randomAte(numMaximo){
	 /* 
	 de 0 a numMaximo -1.
	 se colocar numMaximo+1 no argumento, 
	 vai de 1 até numMaximo.
	 */
	return Math.floor(Math.random()*(numMaximo+1));
}

function randomEntre(min,max){
	/* valor mínimo = min e valor máximo=max */
   return Math.floor(Math.random() * (max-min+1)+min);
}	

function tipoOraculo(tipo){

	switch(tipo){

		case 'geral':
			tipoCenario = tipo;
		break;

		case  'fantasia':
			tipoCenario = tipo;
		break;	

		case  'moderno':
			tipoCenario = tipo;
		break;

		case  'supers':
			tipoCenario = tipo;
		break;

		default: console.log('Tipo de oráculo inválido.');
	}	
}

function emConstrucao(){

	alert('Botão em construção...');
}

function simeNao(chance){
	var rolagem = randomEntre(1,100);
	var string= "Sim/Não - "+chance+": "+rolagem+": <span style='font-weight: bold;' >";

	switch(chance){
		case 'Muito fácil':
			rolagem>5 ? string+='Sim.' : string+='Não.';
		break;

		case 'Provável':
			rolagem>25 ? string+='Sim.' : string+='Não.';
		break;
		case '50/50':
			rolagem>50 ? string+='Sim.' : string+='Não.';
		break;
		case 'Improvável':
			rolagem>75 ? string+='Sim.' : string+='Não.';
		break;
		case 'Muito difícil':
			rolagem>95 ? string+='Sim.' : string+='Não.';
		break;

		default: console.log('Chance Sim/Não inválida!');
	}
	string+='</span>';
	escreverLog(string);
}


/* função pra arrumar
function uneArrays(tipo){
	let arrayAux=[];


	switch(tipoCenario){
		case 'geral':
			arrayAux=arrayAux.concat('lista'+tipo);
		break;

		case 'fantasia':
			arrayAux=arrayAux.concat(tipo+'Fantasia','lista'+tipo);
		break;	

		case 'moderno':
			arrayAux=arrayAux.concat(tipo+'Moderno','lista'+tipo);
		break;

		case 'supers':
			arrayAux=arrayAux.concat(tipo+'Supers',tipo+'Moderno','lista'+tipo);
		break;

		default: console.log('Cenário inválido.');
	}
	return arrayAux;
}
*/

function reviravolta(){
	let arrayAux=[];

	switch(tipoCenario){
		case 'geral':
			arrayAux=arrayAux.concat(listareviravolta);
		break;

		case 'fantasia':
			arrayAux=arrayAux.concat(reviravoltaFantasia,listareviravolta);
		break;	

		case 'moderno':
			arrayAux=arrayAux.concat(reviravoltaModerno,listareviravolta);
		break;

		case 'supers':
			arrayAux=arrayAux.concat(reviravoltaSupers,reviravoltaModerno,listareviravolta);
		break;

		default: console.log('Cenário inválido.');
	}

	escreverLog("<span style='font-weight: bolder'>Reviravolta: </span>"+arrayAux[randomEntre(0,arrayAux.length-1)]);
}

function relacionamento(){
	let arrayAux=[];

	switch(tipoCenario){
		case 'geral':
			arrayAux=arrayAux.concat(listarelacionamento);
		break;

		case 'fantasia':
			arrayAux=arrayAux.concat(relacionamentoFantasia,listarelacionamento);
		break;	

		case 'moderno':
			arrayAux=arrayAux.concat(relacionamentoModerno,listarelacionamento);
		break;

		case 'supers':
			arrayAux=arrayAux.concat(relacionamentoSupers,relacionamentoModerno,listarelacionamento);
		break;

		default: console.log('Cenário inválido.');
	}
	escreverLog("<span style='font-weight: bolder'>Relacionamento: </span>"+arrayAux[randomEntre(0,arrayAux.length-1)]);
}

function lugarNatureza(){
	let arrayAux=[];

	switch(tipoCenario){
		case 'geral':
			arrayAux=arrayAux.concat(listanatureza);
		break;

		case 'fantasia':
			arrayAux=arrayAux.concat(naturezaFantasia,listanatureza);
		break;	

		case 'moderno':
			arrayAux=arrayAux.concat(naturezaModerno,listanatureza);
		break;

		case 'supers':
			arrayAux=arrayAux.concat(naturezaSupers,naturezaModerno,listanatureza);
		break;

		default: console.log('Cenário inválido.');
	}
	escreverLog("<span style='font-weight: bolder'>Lugar: </span>"+arrayAux[randomEntre(0,arrayAux.length-1)]);
}

function lugarUrbano(){
	let arrayAux=[];

	switch(tipoCenario){
		case 'geral':
			arrayAux=arrayAux.concat(listaurbano);
		break;

		case 'fantasia':
			arrayAux=arrayAux.concat(urbanoFantasia,listaurbano);
		break;	

		case 'moderno':
			arrayAux=arrayAux.concat(urbanoModerno,listaurbano);
		break;

		case 'supers':
			arrayAux=arrayAux.concat(urbanoSupers,urbanoModerno,listaurbano);
		break;

		default: console.log('Cenário inválido.');
	}
	escreverLog("<span style='font-weight: bolder'>Lugar: </span>"+arrayAux[randomEntre(0,arrayAux.length-1)]);
}

function complicacao(){
	let arrayAux=[];

	switch(tipoCenario){
		case 'geral':
			arrayAux=arrayAux.concat(listacomplicacao);
		break;

		case 'fantasia':
			arrayAux=arrayAux.concat(complicacaoFantasia,listacomplicacao);
		break;	

		case 'moderno':
			arrayAux=arrayAux.concat(complicacaoModerno,listacomplicacao);
		break;

		case 'supers':
			arrayAux=arrayAux.concat(complicacaoSupers,complicacaoModerno,listacomplicacao);
		break;

		default: console.log('Cenário inválido.');
	}
	escreverLog("<span style='font-weight: bolder'>Complicação: </span>"+arrayAux[randomEntre(0,arrayAux.length-1)]);
}

function gancho(){
	let arrayAux=[];

	switch(tipoCenario){
		case 'geral':
			arrayAux=arrayAux.concat(listagancho);
		break;

		case 'fantasia':
			arrayAux=arrayAux.concat(ganchoFantasia,listagancho);
		break;	

		case 'moderno':
			arrayAux=arrayAux.concat(ganchoModerno,listagancho);
		break;

		case 'supers':
			arrayAux=arrayAux.concat(ganchoSupers,ganchoModerno,listagancho);
		break;

		default: console.log('Cenário inválido.');
	}
	escreverLog("<span style='font-weight: bolder'>Gancho: </span>"+arrayAux[randomEntre(0,arrayAux.length-1)]);
}

function pessoa(){
	let arrayAux=[];

	switch(tipoCenario){
		case 'geral':
			arrayAux=arrayAux.concat(listapessoa);
		break;

		case 'fantasia':
			arrayAux=arrayAux.concat(pessoaFantasia,listapessoa);
		break;	

		case 'moderno':
			arrayAux=arrayAux.concat(pessoaModerno,listapessoa);
		break;

		case 'supers':
			arrayAux=arrayAux.concat(pessoaSupers,pessoaModerno,listapessoa);
		break;

		default: console.log('Cenário inválido.');
	}
	escreverLog("<span style='font-weight: bolder'>Alguém: </span>"+arrayAux[randomEntre(0,arrayAux.length-1)]);
}

function objeto(){
	let arrayAux=[];

	switch(tipoCenario){
		case 'geral':
			arrayAux=arrayAux.concat(listaobjeto);
		break;

		case 'fantasia':
			arrayAux=arrayAux.concat(objetoFantasia,listaobjeto);
		break;	

		case 'moderno':
			arrayAux=arrayAux.concat(objetoModerno,listaobjeto);
		break;

		case 'supers':
			arrayAux=arrayAux.concat(objetoSupers,objetoModerno,listaobjeto);
		break;

		default: console.log('Cenário inválido.');
	}
	escreverLog("<span style='font-weight: bolder'>Coisa: </span>"+arrayAux[randomEntre(0,arrayAux.length-1)]);
}

function acao(){
	escreverLog("<span style='font-weight: bolder'>Ação: </span>"+listaacao[randomEntre(0,listaacao.length-1)]);
}

function tema(){
	escreverLog("<span style='font-weight: bolder'>Tema: </span>"+listatema[randomEntre(0,listatema.length-1)]);
}

function nomeAtual(){
	escreverLog("<span style='font-weight: bolder'>Nome moderno: </span>"+listaNome[randomEntre(0,listaNome.length-1)]+' '+listaSobrenome[randomEntre(0,listaSobrenome.length-1)]);
}

function acaoCombate(){
	escreverLog("<span style='font-weight: bolder'>Ação de combate: </span>"+listaAcoesCombate[randomEntre(0,listaAcoesCombate.length-1)]);
}

function posturaPDM(){
	escreverLog("<span style='font-weight: bolder'>Postura: </span>"+listaPostura[randomEntre(0,listaPostura.length-1)]);
}

function comodo(){
	escreverLog("<span style='font-weight: bolder'>Cômodo: </span>"+listaComodo[randomEntre(0,listaComodo.length-1)]);
}

function vegetacao(){
	escreverLog("<span style='font-weight: bolder'>Vegetação: </span>"+listaVegetacao[randomEntre(0,listaVegetacao.length-1)]);
}

function ferimento(){
	escreverLog("<span style='font-weight: bolder'>Ferimento: </span>"+listaFerimento[randomEntre(0,listaFerimento.length-1)]);
}

function acaoPDJ(){
	let acaopdj;

	let listaExplorar=['local atual','pontos de interesse nas redondezas','social - conhecer pessoas'];
	let listaRecursos=['financeiros - ir atrás de dinheiro/ouro/etc','equipamentos - gerenciar equipamentos, consumíveis, munições, etc'];
	let listaInterpret=['história pessoal','interesses e Hobbies pessoais','geografia e locais de interesse','história do mundo','romance','política','religião','Arte e cultura'];

	switch(randomAte(4)){

		case 4:
			acaopdj='(Objetivo Maior) ';
			escreverLog("<span style='font-weight: bolder'>Ação PDJ: </span>"+acaopdj+'Continuar na busca do objetivo maior');
			break;

		case 3:
			acaopdj='(Objetivo Menor) ';
			escreverLog("<span style='font-weight: bolder'>Ação PDJ: </span>"+acaopdj+'Encontrar ou continuar na busca de um objetivo menor');
			break;

		case 2:
			acaopdj='(Explorar) ';
			escreverLog("<span style='font-weight: bolder'>Ação PDJ: </span>"+acaopdj+listaExplorar[randomAte(listaExplorar.length-1)]);
			break;

		case 1:
			acaopdj='(Recursos) ';
			escreverLog("<span style='font-weight: bolder'>Ação PDJ: </span>"+acaopdj+listaRecursos[randomAte(listaRecursos.length-1)]);

			break;
		case 0:
			acaopdj='(Interpretação) ';
			escreverLog("<span style='font-weight: bolder'>Ação PDJ: </span>"+acaopdj+listaInterpret[randomAte(listaInterpret.length-1)]);

			break;
		default: console.log("Ação PDJ inválida!!!!!");
		}
}


function nomeFantasia(){

	function gerarNome(){
		let quantidadeDeSilabas= 3;
		let nome="";

		let priSilaba=['A','Be','De','El','Fa','Jo','Ki','La','Ma','Na','O','Pa','Re','Si','Ta','Va','','','',''];
		let segSilaba=['bar','ched','dell','far','gran','hal','jen','kel','lim','mor','net','penn','quil','rond','sark','shen','tur','vash','yor','zen'];
		let terSilaba=['a','ac','ai','al','am','an','ar','ea','el','er','ess','ett','ic','id','il','in','is','or','us',''];

		
		nome= priSilaba[randomEntre(0, priSilaba.length-1)] + segSilaba[randomEntre(0, segSilaba.length-1)] + terSilaba[randomEntre(0, terSilaba.length-1)];

		  
		
		return nome;
	}
	escreverLog("<span style='font-weight: bolder'>Nome fantasia: </span>"+gerarNome()+' '+gerarNome());
}

function desejosObjetivos(){
	let desejo ='';
	let lista=[];

	switch(randomAte(5)){
		case 0: //escapar
			desejo='Escapar ';
			lista.push(
				'do passado',
				'de um inimigo poderoso',
				'de um compromisso',
				'de um segredo',
				'de uma dívida',
				'de um lugar'
			);
		break;

		case 1: //proteger
			desejo='Proteger ';
			lista.push(
				'família ou amigos',
				'a honra',
				'sua reputação',
				'um pupilo',
				'um grupo',
				'um objeto especial'
			);
		break;

		case 2: //descobrir
			desejo='Descobrir ';
			lista.push(
				'um segredo',
				'um lugar',
				'a identidade de alguém',
				'a solução para um problema',
				'quem fez isso com ele',
				'o paradeiro de alguém ou algo'
			);
		break;

		case 3: //obter
			desejo='Obter ';
			lista.push(
				'um item',
				'admiração ou respeito',
				'glória',
				'poder',
				'riqueza',
				'uma posição',
				'fama'
			);
		break;

		case 4: //eliminar
			desejo='Eliminar ';
			lista.push(
				'um inimigo antigo',
				'um monstro',
				'um rival',
				'alguém importante',
				'uma organização',
				'uma comunidade',
				'uma maldição'
			);
		break;

		case 5: //mudar
			desejo='Mudar ';
			lista.push(
				'de local',
				'de classe social',
				'de vida',
				'de amigos',
				'de carreira',
				'de estilo de vida'
			);
		break;

		default: alert('Opção inválida!');
	}

	desejo+=lista[randomAte(lista.length-1)];

	escreverLog("<span style='font-weight: bolder'>Desejo/Objetivo do PDM: </span>"+desejo);
}

/*** Ação ****************************************************************/
var listaacao=
[
'Abandonar',
'Abrir',
'Abusar',
'Adiar',
'Afetar',
'Afastar',
'Ajudar',
'Alterar',
'Ameaçar',
'Animar',
'Apropriar',
'Aprovar',
'Atrair',
'Fazer amizade',
'Antagonizar',
'Apoiar',
'Apreender',
'Aproximar',
'Aprisionar',
'Arruinar',
'Atacar',
'Atrair',
'Atrasar',
'Auxiliar',
'Aumentar',
'Barganhar',
'Bloquear',
'Buscar',
'Caçar',
'Carregar',
'Celebrar',
'Cuidar',
'Começar',
'Comunicar',
'Conceder',
'Concordar',
'Controlar',
'Convencer',
'Corromper',
'Curar',
'Criar',
'Danificar',
'Decifrar',
'Defender',
'Descarregar',
'Desconfiar',
'Desertar',
'Desenvolver',
'Despovoar',
'Derrotar',
'Derrubar',
'Destruir',
'Dificultar',
'Distrair',
'Disputar',
'Diminuir',
'Dividir',
'Dominar',
'Emboscar',
'Espionar',
'Enaltecer',
'Encontrar',
'Enfraquecer',
'Enganar',
'Entregar',
'Escapar',
'Esforçar',
'Esvaziar',
'Escoltar',
'Explorar',
'Expor',
'Focar',
'Fortalecer',
'Fracassar',
'Gratificar',
'Guiar',
'Impedir',
'Interromper',
'Informar',
'Inspecionar',
'Invadir',
'Investigar',
'Julgar',
'Liberar',
'Libertar',
'Liderar',
'Limitar',
'Localizar',
'Lutar',
'Matar',
'Maldade',
'Mentir',
'Mover',
'Mudar',
'Nutrir',
'Observar',
'Obter',
'Opor',
'Pausar',
'Parar',
'Pegar',
'Perguntar',
'Perseguir',
'Perturbar',
'Prender',
'Pressionar',
'Procurar',
'Proteger',
'Propor',
'Punir',
'Quebrar',
'Raptar',
'Rebaixar',
'Recrutar',
'Recuperar',
'Recusar',
'Resíduos',
'Remover',
'Resgatar',
'Retornar',
'Roubar',
'Salvar',
'Seguir',
'Segurar',
'Separar',
'Trabalhar',
'Transportar',
'Transformar',
'Trégua',
'Tirar',
'Trair',
'Triunfar',
'Tomar',
'Unir',
'Viajar',
'Vingar',
'Violar'
];

var listatema=[
'Abrigo',
'Acordo',
'Adversidade',
'Acontecimento',
'Acontecimento infeliz',
'Aleatoriedade',
'Aliado',
'Alimento',
'Amizade',
'Amor',
'Animal',
'Arma',
'Arte',
'Atenção',
'Aviso',
'Barreira',
'Batalha',
'Bem',
'Benefícios',
'Burocracia',
'Busca',
'Caminho',
'Casa',
'Ciúme',
'Clima',
'Criação',
'Criatura',
'Crueldade',
'Comércio',
'Competição',
'Comunidade',
'Conhecimento',
'Conselho',
'Corrupção',
'Culto religioso',
'Decadência',
'Decepção',
'Desejo',
'Dentro',
'Desconhecido',
'Desolação',
'Destino',
'Dever',
'Direção',
'Disputa',
'Dívida',
'Doença',
'Dor',
'Elemento',
'Emboscada',
'Emoções',
'Estado',
'Energia',
'Equilíbrio',
'Escolha',
'Esperança',
'Espiritual',
'Espírito',
'Estratégia',
'Estrutura',
'Expectativas',
'Extravagância',
'Fama',
'Família',
'Fardo',
'Fatores externos',
'Felicidade',
'Fenômeno',
'Ferimento',
'Ferramenta',
'Físico',
'Fracasso',
'Fraqueza',
'Fora',
'Força',
'Ganância',
'Guerra',
'Grupo',
'Habilidade',
'História',
'Honra',
'Ideias',
'Identificação',
'Ilusão',
'Impasse',
'Ímpeto',
'Informação',
'Inimigo',
'Intelecto',
'Intriga',
'Intolerância',
'Inocência',
'Intelectual',
'Investimento',
'Juramento',
'Lar',
'Legislação',
'Liberdade',
'Liderança',
'Linguagem',
'Luxo',
'Magia',
'Mal',
'Material',
'Medo',
'Meio ambiente',
'Memória',
'Mensagem',
'Mentiras',
'Militar',
'Místico',
'Morte',
'Mundo',
'Natureza',
'Notícia',
'Objetivos',
'Ódio',
'Opinião',
'Oposição',
'Oportunidade',
'Orgulho',
'Passagem',
'Paz',
'Perda',
'Perigo',
'Perturbação',
'Planos',
'Poder',
'Portal',
'Posses',
'Prazer',
'Preço',
'Prêmio',
'Prisão',
'Problema',
'Projeto',
'Proteção',
'Público',
'Raiva',
'Realidade',
'Recurso',
'Relação',
'Religião',
'Representante',
'Reputação',
'Retaliação',
'Riqueza',
'Risco',
'Rival',
'Rumor',
'Ruína',
'Sangue',
'Saúde',
'Segredo',
'Segurança',
'Sobrevivência',
'Sofrimento',
'Sonhos',
'Sucesso',
'Sujeira',
'Suprimento',
'Tática',
'Tecnologia',
'Tempo',
'Tensão',
'Teste',
'Trabalho',
'Solução',
'Superstição',
'Vantagem',
'Veículo',
'Verdade',
'Viagem',
'Vínculo',
'Vingança',
'Vitória'
];


/* REVIRAVOLTA *************************************************/
var listareviravolta=
[
'A aventura toda é uma brincadeira de uma divindade má.',
'A aventura toda é uma ilusão ou sonho.',
'A missão atual era apenas para te trazer aqui, a missão real é: (role).',
'A missão é para testar o PJ (experimento).',
'A missão na verdade era algo impossível de se conseguir.',
'A missão não passou de uma armadilha, agora você deve sobreviver e escapar.',
'Alguém que parecia ter grande poder, na verdade não tem.',
'Antagonista é um aliado ou amigo disfarçado.',
'Antagonista é um PJ de outro tempo ou realidade.',
'Antagonista está buscando um objetivo nobre.',
'Antagonista na verdade está sendo controlado por outro.',
'Distorção do tempo ou espaço no local da aventura.',
'Forçado a se aliar à um inimigo ou rival.',
'Motivações de um PDM importante eram falsas (ou mudaram)',
'O protagonista não recebe nenhuma recompensa, na verdade perde algo ou fica devendo.',
'O protagonista passa a ser visto como vilão.',
'O sucesso na missão leva a consequências inesperadas e terríveis.',
'PDM importante tem irmã/o gêmeo/a causando confusão.',
'Traição por um suposto aliado ou amigo.',
'Um aliado deixa de ser aliado e não interfere mais.',
'Um aliado se une ao inimigo.',
'Um antigo aliado surge como inimigo.',
'Um antigo inimigo ressurge.',
'Um novo inimigo surge.',
'Um PDM/grupo antes neutro se alia ao inimigo.',
'Uma informação importante era falsa.',
'Uma pessoa normal na verdade tem um grande poder.',
'Você chama atenção de outros inimigos.',
'Você descobre uma verdade prejudicial.',
'Você é enviado para um lugar desconhecido.',
'Você percebe que estava do lado errado o tempo todo.',
'Um segredo sombrio é revelado.',
'A verdade de um relacionamento é revelada.',
'Um novo perigo aparece.',
'Alguém retorna inesperadamente.',
'Duas situações aparentemente que não estão relacionadas são mostradas como conectadas.',
'Role mais duas reviravoltas, ambas acontecem.',
'Você e um inimigo compartilham um objetivo comum.',
'Alguém ou algo está faltando.',
];

var reviravoltaFantasia=
[

];

var reviravoltaModerno=
[

];

var reviravoltaSupers=
[
'O inimigo revela um novo poder.'
];



/* RELACIONAMENTO **************************************/
var listarelacionamento=
[
'Abençoados pelo mesmo Deus/ Seguidores da mesma fé.',
'Aliados relutantes.',
'Ambos carregam uma maldição.',
'Relacionamento romântico.',
'Se amam secretamente mas fingem ser apenas amigos',
'Tinham uma relação amorosa, agora são apenas amigos.',
'Amigo de um amigo.',
'Amigos de infância.',
'Bastardo e legítimo.',
'Cérebro e Músculo.',
'Companheiros de aventura.',
'Companheiros de viagem.',
'Cônjuges.',
'Se conheceram no serviço militar',
'Desertores.',
'Dívida de sangue pendente.',
'Escolhidos de uma divindade.',
'Ex-colegas de trabalho.',
'Irmãos.',
'Já guerrearam lado a lado.',
'Se conheceram na estrada e ficaram juntos para proteção mútua.',
'Se conheceram em uma floresta fugindo de um mesmo perigo',
'Ligados por um ritual profano.',
'Ligados por um voto.',
'Membros de grupo.',
'Membros de um grupo secreto.',
'Mercenário e contratante.',
'Mentor e pupilo.',
'Odeiam a mesma pessoa.',
'Os únicos que conhecem um segredo.',
'Os únicos sobreviventes de algo.',
'Ovelha negra e favorito da família.',
'Pai e filho e super protetores um com o outro.',
'Pai super protetor e filho rebelde.',
'Irmãos que cresceram juntos.',
'Irmãos que foram separados quando crianças, mas agora unidos novamente.',
'Meio-irmãos.',
'Primos distantes.',
'Procurados.',
'Um sente que o outro é útil.',
'Rivais Amistosos.',
'Serviram em lados opostos de uma guerra e depois ficaram amigos.',
'Testemunhas de um crime.',
'Trabalham para o mesmo contratante.',
'Trabalharam no mesmo local.',
'Se conheceram em uma taverna/bar.',
'Se conheceram em uma estalagem/pousada.',
'Treinados juntos.',
'São da mesma cidade',
'Um sabe o segredo do outro.'
];


var relacionamentoFantasia=
[

];

var relacionamentoModerno=
[

];

var relacionamentoSupers=
[

];


/* NATUREZA *******************************************/

var listanatureza=[
'Abismo',
'Arquipélago',
'Cachoeira',
'Canal',
'Cânion',
'Caverna',
'Chapada',
'Colina',
'Cordilheira',
'Deserto',
'Duna',
'Enseada',
'Estreito',
'Geleira',
'Golfo',
'Iceberg',
'Ilha',
'Lago',
'Lagoa',
'Mar',
'Montanha',
'Oásis',
'Oceano',
'Pantanal',
'Pântano',
'Península',
'Planalto',
'Planície',
'Pradaria',
'Praia',
'Rio',
'Selva',
'Vale',
'Vulcão'
];

var naturezaFantasia=
[
'Ruínas',
'Floresta mística',
'Pântano sombrio',
'Montanha dos anões',
'Ilha amaldiçoada'
];

var naturezaModerno=
[
'Sítio',
'Fazenda',
'Parque nacional',
'Tribo indígena'
];

var naturezaSupers=
[
'Planeta distante',
'Planeta próximo',
'No espaço sideral',
'Em uma galáxia próxima',
'Em uma galáxia distante',
'Na órbita',
'Outro plano',
'Outra dimensão'
];


/* CÔMODO ******************************************/
var listaComodo=
[
'Quarto',
'Sala de estar',
'Banheiro',
'Cozinha',
'Lavanderia',
'Sala de jantar',
'Despensa',
'Garagem',
'Closet',
'Suíte',
'Sotão',
'Porão',
'Escritório',
'Varanda',
'Corredor'
]


/* LUGAR URBANO ******************************************/

var listaurbano=
[
'Armazém',
'Bazar',
'Bordel',
'Centro comercial',
'Centro da cidade',
'Cidade distante',
'Cripta',
'Depósito',
'Estrada',
'Esgotos/subterrâneo',
'Esconderijo',
'Galpão abandonado',
'Jardim',
'Loja de armas',
'Mansão',
'Nas nuvens',
'Necrotério, cemitério',
'País distante',
'Praça',
'Prédio',
'Prisão',
'Templo'
];

var urbanoFantasia=
[
'Palácio',
'Catacumbas',
'Fortaleza',
'Forte',
'Torre',
'Santuário',
'Tumba',
'Taverna',
'Estalagem',
'Loja de suprimentos',
'Forja',
'A casa Nobre',
'Lugar místico',
'Ruínas antigas',
'Reino secreto',
'Castelo',
'Vilarejo'
];

var urbanoModerno=
[
'Hospital',
'Escola',
'Creche',
'Prédio comercial',
'Prédio residencial',
'Residência',
'Empresa',
'Fábrica',
'Usina',
'Laboratório',
'Mercado pequeno',
'Hipermercado',
'Farmácia',
'Posto de saúde',
'Loja de material de construção',
'Papelaria',
'Empresa de ônibus',
'Garagem',
'Estacionamento',
'Prédio policial',
'Loja de roupas',
'Padaria',
'Loja de carros',
'Loja de eletrodomésticos',
'Faculdade',
'Clínica Veterinária',
'Hotel pequeno',
'Hotel grande',
'Motel',
'Estação de metrô',
'Aeroporto',
'Museu',
'Galeria de lojas',
'Restaurante',
'Fastfood',
'Loja de 1,99',
'Salão de beleza',
'Cabelereiro',
'Loja de óculos',
'Loja de informática',
'Academia',
'Loja de bijuterias',
'Joalheria',
'Loja de ferramentas',
'Loja de armas',
'PetShop',
'Loja de paisagismo',
'Clínica dentista',
'Loja de instrumentos musicais',
'Ponto de venda de drogas',
'Adega',
'Açougue',
'Bar',
'Boate',
'Estúdio de tatuagem',
'Igreja evangélica',
'Igreja católica',
'Livraria',
'Biblioteca',
'Praça',
'Shopping',
'Prédio com salas comerciais',
'Cinema',
'Lanchonete',
'Lotérica',
'Banco',
'Corpo de bombeiros',
'Oficina de carros',
'Oficina de motos'
];

var urbanoSupers=
[

];



/* COMPLICAÇÃO ***************************************/

var listacomplicacao=
[
'Guardas armados.',
'Assassinos.',
'Bandidos.',
'Ocultação, engano ou sigilo.',
'Maldição (real ou imaginária).',
'Ambiente mortal.',
'Desonestidade e ambição da população.',
'Grande distância.',
'Informação que precisa de tradução.',
'Falta de suprimentos.',
'Tempo limitado.',
'Desastre natural (ou não).',
'Monstro.',
'Grupo de inimigos.',
'Barreira física.',
'Enigma que tem que ser solucionado.',
'Bestas selvagens.',
'Ladrões.',
'A missão fará o protagonista perder um ou mais aliados.',
'A missão causará mortes de inocentes.',
'A missão causará danos econômicos graves.',
'A missão irá deixar um lugar radioativo/amaldiçoado/infértil.',
'A missão irá prejudicar algum amigo ou familiar.',
'A missão irá ferir a honra do protagonista.',
'A missão fará com que alguém fique impune.',
'A missão fere os interesses de um aliado importante.',
'A missão requer que o protagonista faça algo moralmente errado.',
'A missão irá prejudicar a reputação do protagonista.',
'A missão requer que o protagonista omita uma coisa importante, ou minta.',
'Aparece uma nova ameaça.',
'Um importante pertence seu foi roubado.',
'O vilão coloca sua cabeça à prêmio.'
];

var complicacaoFantasia=
[

];

var complicacaoModerno=
[

];

var complicacaoSupers=
[

];



/* GANCHO *****************************************/

var listagancho=[
'Chantageado',
'Deixado para morrer',
'Entrou na situação por acaso',
'Fez uma aposta',
'Foi contratado para isso',
'Injustiçado e querendo vingança',
'Ordens de um superior',
'Ouviu uma conversa',
'Pagando uma dívida',
'Para provar sua coragem',
'Pedido um favor',
'Perdido ou Náufrago',
'Preso e forçado a entrar em serviço',
'Teve um sonho'
];

var ganchoFantasia=
[
'Amaldiçoado por um deus',
'Encontrou mapa antigo',
'Teve uma visão',
'Ouviu uma profecia',
'Ouviu uma música ou poema',
'Leu um pergaminho antigo'
];

var ganchoModerno=
[

];

var ganchoSupers=
[

];



/* PESSOA ************************************************/
var listapessoa=
[
'Agente da lei',
'Artista',
'Assassino',
'Criminoso',
'Dançarino',
'Espião',
'Estudioso',
'Familiar',
'Fugitivo',
'Ladrão',
'Mendigo',
'Mercenário',
'Poeta',
'Político',
'Prisioneiro',
'Profissional do sexo',
'Refugiado',
'Rival',
'Torturador',
'Traficante',
'Uma criança'
];

var pessoaFantasia=
[
'Adivinho',
'Aldeão',
'Alfaiate',
'Alquimista',
'Aprendiz',
'Arcanista',
'Armeiro',
'Aromaterapeuta',
'Arqueiro',
'Arquiteto',
'Artesão',
'Artífice',
'Artista',
'Artista circense',
'Assassino',
'Aventureiro',
'Açougueiro',
'Bárbaro',
'Barbeiro',
'Bardo',
'Bibliotecário',
'Bruxo',
'Camponês',
'Cantor',
'Capitão de navio',
'Capitão do exército',
'Capitão pirata',
'Caravanista',
'Carpinteiro',
'Cartógrafo',
'Cavaleiro',
'Caçador',
'Clérigo',
'Comediante',
'Comerciantes',
'Compositor',
'Conselheiros',
'Construtor',
'Contadores de histórias',
'Criador de animais',
'Cultista',
'Curandeiro herbalista',
'Curandeiro xamã',
'Dançarino',
'Detetive particular',
'Diplomata',
'Dono de taverna',
'Druida',
'Escriba',
'Escultor',
'Estalajadeiro',
'Estudantes de magia',
'Explorador',
'Fabricante',
'Falso profeta',
'Fazendeiro',
'Feiticeiro',
'Ferreiro',
'Forasteiro misterioso',
'Gladiador',
'Guarda da cidade',
'Guarda de fronteira',
'Guarda de prisão',
'Guardiões',
'Guerreiro',
'Herói Famoso',
'Jardineiro',
'Ladino',
'Ladrão de rua',
'Lavrador',
'Lenhador',
'Líder de gangue',
'Líder de Guilda',
'Líder de seita secreta',
'Líder religioso',
'Líderes da cidade',
'Mago',
'Marceneiro',
'Mascate',
'Membro da guilda',
'Mercador',
'Mercador de alimentos',
'Mercador de antiguidades',
'Mercador de escravos',
'Mercador de informações',
'Mercenário',
'Mineiro',
'Monge',
'Músico',
'Navegador',
'Necromante',
'Nobre',
'Nômade',
'Oleiro',
'Orfão',
'Padeiro',
'Paladino',
'Pastor',
'Peregrino',
'Pescador',
'Pintor',
'Pirata',
'Poeta',
'Princesa',
'Príncipe',
'Prisioneiro fugitivo',
'Rei',
'Rainha',
'Sacerdote',
'Servo real',
'Soldado',
'Teatrólogo',
'Tecelão',
'Trabalhador braçal',
'Trapaceiro',
'Vendedor de equipamentos',
'Vendedor de armas',
'Vendedor de itens mágicos',
'Vendedor de frutas e legumes',
'Vendedor de peixes',
'Vendedor de tecidos',
'Viajante',
'Xamã'
];

var pessoaModerno=
[
'Acadêmico(a)',
'Motorista',
'Militar',
'Engenheiro(a) civil',
'Empresário(a)',
'Professor(a)',
'Policial',
'Cargo Político',
'Músico/ista',
'Jornalista',
'Bombeiro(a)',
'Advogado(a)',
'Pedreiro(a)',
'Psicólogo(a)',
'Médico(a)',
'Enfermeiro(a)',
'Dentista',
'Atleta profissional',
'Artista',
'Técnico de TI',
'Hacker',
'Programador(a)',
'Auxiliar administrativo',
'Atendente Telemarketing',
'Açougueiro(a)',
'Eletricista',
'Encanador(a)',
'Cozinheiro(a)',
'Alfaiate',
'Pescador(a)',
'Caçador(a)',
'Segurança',
'Piloto(a)',
'Cientista',
'Lider religioso',
'Biólogo(a)',
'Químico(a)',
'Matador(a) de aluguel',
'Prostituta(o)',
'Operário(a) de fábrica',
'Gerente de fábrica',
'Farmacêutico(a)',
'Fazendeiro(a)',
'Vendedor(a)',
'Metatalúrgico(a)',
'Serralheiro(a)',
'Marceneiro(a)',
'Guia turístico',
'Porteiro(a)',
'Veterinário(a)',
'Fisioterapeuta',
'Nutricionista'
];

var pessoaSupers=
[
	
];


/* COISA ********************************************/

var listaobjeto=
[
'Anel',
'Colar',
'Óculos',
'Escada',
'Artefato',
'Baú',
'Capa',
'Carga',
'Carta',
'Chave',
'Estatueta',
'Jóia',
'Livro',
'Máscara',
'Meteorito',
'Quadro',
'Riqueza de alguém',
'Mapa'
];

var objetoFantasia=
[
'Coroa',
'Cristal',
'Adaga',
'Elmo',
'Ídolo',
'Lente',
'Sarcófago',
'Pergaminho',
'Selo',
'Caveira',
'Espada',
'Tomo',
'Tesouro',
'Caravana',
'Armadura',
'Escudo'
];

var objetoModerno=
[
'Celular',
'Computador',
'Notebook',
'Carro',
'Moto',
'Avião',
'Eletrodoméstico',
'Caixa eletrônico',
'Furadeira',
'GPS'
];

var objetoSupers=
[
'Arma de raio laser',
'Traje tecnológico'
];



/* ORACULOS GERAIS *********************************/

var listaPostura=[
'Agressivo',
'Amistoso',
'Antipático',
'Atencioso',
'Desconfiado',
'Neutro',
'Quieto'
];

var listaAcoesCombate=
[
'Ataque à Dist melhorado',
'Ataque à Dist normal.',
'Ataque CaC melhorado.',
'Ataque CaC normal.',
'Ataque furtivo.',
'Fugir/Ir embora.',
'Manobra Tática.',
'Postura Defensiva.',
'Proteger.',
'Tentar desarmar (se possível).',
'Tentar imobilizar (se possível).',
'Mudar de alvo',
'Ação imprudente',
'Ataque coordenado',
'Usa terreno para ganhar vantagem',
'Busca cobertura'
];

var listaVegetacao=[
'Deserto',
'Estepe',
'Floresta Boreal (Taiga)',
'Floresta de Coníferas',
'Floresta temperada',
'Floresta tropical',
'Savana',
'Tundra',
'Vegetação de altitude',
'Vegetação Mediterrânea'
];

var listaFerimento=[
	'ombro esquerdo com ferimento',
	'ombro esquerdo quebrado',
	'braço esquerdo com ferimento',
	'braço esquerdo quebrado',
	'cotovelo esquerdo com ferimento',
	'cotovelo esquerdo quebrado',
	'antebraço esquerdo com ferimento',
	'antebraço esquerdo quebrado',
	'mão esquerda com ferimento',
	'mão esquerda quebrada',
	'ombro direito com ferimento',
	'ombro direito quebrado',
	'braço direito com ferimento',
	'braço direito quebrado',
	'cotovelo direito com ferimento',
	'cotovelo direito quebrado',
	'antebraço direito com ferimento',
	'antebraço direito quebrado',
	'mão direita com ferimento',
	'mão direita quebrada',
	'coxa esquerda com ferimento',
	'fêmur esquerdo quebrado',
	'joelho esquerdo com ferimento',
	'joelho esquerdo quebrado',
	'pé esquerdo com ferimento',
	'pé esquerdo quebrado',
	'coxa direita com ferimento',
	'fêmur direito quebrado',
	'joelho direito com ferimento',
	'joelho direito quebrado',
	'pé direito com ferimento',
	'pé direito quebrado',
	'ferimento no pescoço',
	'ferimento no tórax',
	'ferimento nas costas',
	'ferimento na barriga',
	'ferimento nas costelas',
	'ferimento na nuca',
	'ferimento nos olhos',
	'ferimento no rosto',
	'ferimento na boca'
];

var listaNome=
[
	'Santiago',
	'Francisco',
	'João',
	'Afonso',
	'Rodrigo',
	'Martim',
	'Tomás',
	'Miguel',
	'Gabriel',
	'Lourenço',
	'Rafael',
	'Lucas',
	'Guilherme',
	'Pedro',
	'Tiago',
	'Diogo',
	'Vicente',
	'José',
	'David',
	'Mateus',
	'Simão',
	'Antônio',
	'Diego',
	'Manuel',
	'Henrique',
	'Daniel',
	'Bernardo',
	'Enzo',
	'André',
	'Leonardo',
	'Luis',
	'Isaque',
	'Eduardo',
	'Alexandre',
	'Kevin',
	'Matias',
	'Leandro',
	'Felipe',
	'Xavier',
	'Samuel',
	'Ricardo',
	'Arthur',
	'Valentim',
	'Frederico',
	'Lorenzo',
	'Bryan',
	'Bruno',
	'Benjamin',
	'Carlos',
	'Sebastião',
	'Noah',
	'Mário',
	'Tomé',
	'Fábio',
	'Paulo',
	'Renato',
	'Jorge',
	'Jaime',
	'Ângelo',
	'Micael',
	'Ivan',
	'Cristiano',
	'Jonathan',
	'Sérgio',
	'Gil',
	'Ivo',
	'Vitor',
	'Yuri',
	'Fernando',
	'Dilan',
	'Romeu',
	'Caio',
	'Emanuel',
	'Sandro',
	'Igor',
	'Moisés',
	'Mauro',
	'Cesar',
	'Josué',
	'Edgar',
	'Elias',
	'Joel',
	'Alex',
	'Denis',
	'Marcelo',
	'Adriel',
	'Álvaro',
	'Dylan',
	'Raul',
	'Mohamed',
	'Nelson',
	'Dário',
	'Oliver',
	'Ismael',
	'Márcio',
	'Ian',
	'Erick',
	'Cláudio',
	'Heitor',
	'Martinho',
	'Jonas',
	'Júlio',
	'Adriano',
	'Augusto',
	'Flávio',
	'Jason',
	'James',
	'Danilo',
	'Adam',
	'Levi',
	'Nicolas',
	'Sebastian',
	'Cauã',
	'Misael',
	'Alberto',
	'Israel',
	'Edson',
	'Luan',
	'Denzel',
	'Apolo',
	'Alfredo',
	'Nicolau',
	'Axel',
	'Patrick',
	'Giovani',
	'Aron',
	'Luiz',
	'Leonel',
	'Wesley',
	'Ari',
	'Roberto',
	'Hélder',
	'Roberta',
	'Henry',
	'Cristóvão',
	'Jesus',
	'Nathan',
	'Rogério',
	'Caleb',
	'Fabrício',
	'Valentino',
	'Noé',
	'Luka',
	'Armando',
	'Stéfano',
	'Bartolomeu',
	'Anthony',
	'Derick',
	'Ryan',
	'Luciano',
	'Theo',
	'Christian',
	'Anderson',
	'Abel',
	'Nataniel',
	'Dominick',
	'Alexander',
	'Isaías',
	'Amadeu',
	'Oscar',
	'Lázaro',
	'Ulisses',
	'Max',
	'Steven',
	'Leon',
	'Maurício',
	'Juliano',
	'Osvaldo',
	'Edward',
	'Jayden',
	'Olavo',
	'Saulo',
	'Pietro',
	'Breno',
	'Jair',
	'Uriel',
	'Adiel',
	'Fred',
	'Jack',
	'Evandro',
	'Juan',
	'Ruan',
	'Rauny',
	'Tainan',
	'Igor',
	'Fabiano',
	'Robert',
	'Hélio',
	'Adilson',
	'Elder',
	'Éder',
	'Jordan',
	'Tito',
	'Júnior',
	'Alonso',
	'George',
	'Jorge',
	'Félix',
	'Gilson',
	'Gilberto',
	'Abner',
	'Wagner',
	'Adolfo',
	'Salomão',
	'Kauan',
	'Nilson',
	'Willian',
	'Tobias',
	'Julian',
	'Jacob',
	'Vladmir',
	'Yan',
	'Harry',


	'Maria',
	'Leonor',
	'Matilde',
	'Beatriz',
	'Carolina',
	'Mariana',
	'Ana',
	'Sofia',
	'Francisca',
	'Inês',
	'Margarida',
	'Clara',
	'Lara',
	'Alice',
	'Laura',
	'Benedita',
	'Diana',
	'Madalena',
	'Joana',
	'Camila',
	'Bianca',
	'Mafalda',
	'Íris',
	'Vitória',
	'Luana',
	'Sara',
	'Letícia',
	'Gabriela',
	'Rita',
	'Eva',
	'Mara',
	'Yara',
	'Luisa',
	'Yasmin',
	'Helena',
	'Catarina',
	'Valentina',
	'Júlia',
	'Marta',
	'Noa',
	'Rafaela',
	'Teresa',
	'Nicole',
	'Melissa',
	'Iara',
	'Bruna',
	'Isabel',
	'Daniela',
	'Miriam',
	'Luna',
	'Raquel',
	'Bárbara',
	'Mia',
	'Áurea',
	'Aurora',
	'Juliana',
	'Olívia',
	'Amélia',
	'Jéssica',
	'Kelly',
	'Érica',
	'Naiara',
	'Isabela',
	'Adriana',
	'Débora',
	'Lorena',
	'Isis',
	'Emma',
	'Julieta',
	'Alexandra',
	'Elisa',
	'Frederica',
	'Soraia',
	'Tatiana',
	'Eduarda',
	'Chloe',
	'Safira',
	'Isabella',
	'Mayara',
	'Rosa',
	'Emília',
	'Vera',
	'Sophia',
	'Fabiana',
	'Flor',
	'Paloma',
	'Luciana',
	'Nádia',
	'Alana',
	'Ester',
	'Aline',
	'Larissa',
	'Nair',
	'Salomé',
	'Renata',
	'Sara',
	'Andreia',
	'Emily',
	'Anita',
	'Patrícia',
	'Bia',
	'Verônica',
	'Iris',
	'Serena',
	'Cristiana',
	'Dalila',
	'Cláudia',
	'Lúcia',
	'Carla',
	'Ângela',
	'Neuza',
	'Simone',
	'Tamara',
	'Clarice',
	'Raissa',
	'Maiara',
	'Eliane',
	'Cristina',
	'Isa',
	'Samira',
	'Violeta',
	'Estrela',
	'Giovana',
	'Valéria',
	'Micaela',
	'Jacinta',
	'Sandra',
	'Liliana',
	'Cíntia',
	'Marisa',
	'Natasha',
	'Rute',
	'Telma',
	'Jade',
	'Eliana',
	'Samara',
	'Susana',
	'Cátia',
	'Elsa',
	'Carina',
	'Mônica',
	'Ayla',
	'Rebecca',
	'Briana',
	'Penélope',
	'Heloisa',
	'Flávia',
	'Aléxia',
	'Nina',
	'Neide',
	'Priscila',
	'Evelyn',
	'Vânia',
	'Jasmine',
	'Ariane',
	'Abigail',
	'Cecília',
	'Milena',
	'Manuela',
	'Márcia',
	'Marina',
	'Glória',
	'Erika',
	'Samanta',
	'Lívia',
	'Ellen',
	'Solange',
	'Naomi',
	'Antonia',
	'Angelina',
	'Vanessa',
	'Amanda',
	'Taís',
	'Angélica',
	'Natália',
	'Brenda',
	'Jennifer',
	'Isadora',
	'Sônia',
	'Tânia',
	'Silvia',
	'Sabrina',
	'Eleonora',
	'Leandra',
	'Fatima',
	'Lua',
	'Alina',
	'Viviane',
	'Ligia',
	'Adriele',
	'Janaína',
	'Lavínia',
	'Regina',
	'Agatha',
	'Léa'
];

var listaSobrenome =
[
	'Estevam',
	'Silva',
	'Santos',
	'Ferreira',
	'Nascimento',
	'Perez',
	'Militão',
	'Monteiro',
	'Abdala',
	'Santiago',
	'Pereira',
	'Arruda',
	'Ribeiro',
	'Cunha',
	'Lima',
	'Figuerôa',
	'Gonçalves',
	'Araujo',
	'Rodrigues',
	'Abreu',
	'Albuquerque',
	'Almeida',
	'Alves',
	'Antunes',
	'Avelar',
	'Azevedo',
	'Barros',
	'Batista',
	'Borges',
	'Brandão',
	'Bragança',
	'Brito',
	'Cabral',
	'Caetano',
	'Caires',
	'Camacho',
	'Camargo',
	'Campos',
	'Carvalho',
	'Castilhos',
	'Castro',
	'Cerqueira',
	'Coimbra',
	'Conceição',
	'Cotrim',
	'Coutinho',
	'Cruz',
	'Cunha',
	'Custódio',
	'Damasceno',
	'Dantas',
	'Dias',
	'Domingos',
	'Domingues',
	'Duarte',
	'Dutra',
	'Fagundes',
	'Faria',
	'Félix',
	'Fernandes',
	'Ferraz',
	'Ferreira',
	'Flores',
	'Fonseca',
	'Fontes',
	'Fraga',
	'Franco',
	'Freire',
	'Freitas',
	'Freixo',
	'Frota',
	'Garcez',
	'Garrido',
	'Gaspar',
	'Gentil',
	'Godoy',
	'da Graça',
	'Guedes',
	'Guerra',
	'Henrique',
	'Hilário',
	'Hipólito',
	'Jardim',
	'Lacerda',
	'Leal',
	'Leite',
	'Leme',
	'Lemos',
	'Lima',
	'Linhares',
	'Lisboa',
	'Lira',
	'Lobato',
	'Lopes',
	'Lourenço',
	'Luz',
	'Macedo',
	'Machado',
	'Maciel',
	'Magalhães',
	'Maia',
	'Malta',
	'Marcondes',
	'Marinho',
	'Martins',
	'Medeiros',
	'Monteiro',
	'Matias',
	'Matos',
	'Medina',
	'Menezes',
	'Miranda',
	'Monforte',
	'Montenegro',
	'Moreira',
	'Mota',
	'Moura',
	'Muniz',
	'Nascimento',
	'Neto',
	'Neves',
	'Nobre',
	'Nóbrega',
	'Nogueira',
	'Nolasco',
	'Novais',
	'Nunes',
	'Oliveira',
	'Onofre',
	'Osório',
	'Pacheco',
	'Padilha',
	'de Pádua',
	'Paiva',
	'Paixão',
	'Palhaes',
	'Peçanha',
	'Pedroso',
	'Peixoto',
	'Penedo',
	'Penha',
	'Paz',
	'Penteado',
	'Pereira',
	'Pessoa',
	'Pestana',
	'Pimentel',
	'Pinheiro',
	'Pires',
	'Pontes',
	'Porto',
	'Prado',
	'Prates',
	'Prestes',
	'Proença',
	'Prudente',
	'Quadros',
	'Queirós',
	'Quintana',
	'Rabelo',
	'Ramires',
	'Ramos',
	'Rangel',
	'Reis',
	'Ribeiro',
	'Rocha',
	'Rodrigues',
	'Ruas',
	'Sacramento',
	'Saldanha',
	'Salvador',
	'Salomão',
	'Santos',
	'Santiago',
	'Saraiva',
	'Silva',
	'Silveira',
	'Silvestre',
	'Simão',
	'Cintra',
	'Soares',
	'Souza',
	'Tavares',
	'Teixeira',
	'Toledo',
	'Torrado',
	'Torres',
	'Toscano',
	'Trindade',
	'Uchoa',
	'Valadão',
	'Valente',
	'Valentim',
	'Valério',
	'Valverde',
	'Varanda',
	'Vargas',
	'Vasconcelos',
	'Vasques',
	'Vaz',
	'Velasques',
	'Veloso',
	'Vergueiro',
	'Viana',
	'Vilela',
	'Xavier',
	'Watanabe',
	'Yamamoto',
	'Saito',
	'Yoshida',
	'Yamazaki',
	'Kobayashi',
	'Tanaka',
	'Takahashi',
	'Sato',
	'Suzuki',
	'Ito',
	'Nakamura',
	'Kobayashi',
	'Kato',
	'Yamada',
	'Sasaki',
	'Yamaguchi',
	'Matsumoto',
	'Shimizu',
	'Nakajima',
	'Maeda',
	'Okada',
	'Sakamoto',
	'Nakagawa',
	'Nakano',
	'Matsui',
	'Wang',
	'Li',
	'Zhang',
	'Liu',
	'Chen',
	'Yang',
	'Huang',
	'Zhao',
	'Zhu',
	'Lin',
	'Smith',
	'Johnson',
	'Williams',
	'Jones',
	'Brown',
	'Davis',
	'Miller',
	'Wilson',
	'Taylor',
	'Thomas',
	'Anderson',
	'Jackson',
	'White',
	'Harris',
	'Martin',
	'Thompson',
	'Garcia',
	'Martinez',
	'Clark',
	'Lewis',
	'Lee',
	'Walker',
	'Wild',
	'Hall',
	'Allen',
	'Lopez',
	'Scott',
	'Green',
	'Adams',
	'Baker',
	'Carter',
	'Roberts',
	'Turner',
	'Philips',
	'Campbell',
	'Parker',
	'Evans',
	'Edwards',
	'Collins',
	'Stewart',
	'Morris',
	'Rogers',
	'Cooper',
	'Richard',
	'Peterson',
	'Watson',
	'Brooks',
	'Sanders',
	'Price',
	'Wood',
	'Ross',
	'Coleman',
	'Jenkins',
	'Hughes',
	'Washington',
	'Simmons',
	'Foster',
	'Bryant',
	'Griffin'
];
