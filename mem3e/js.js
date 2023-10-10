/* --------------------------geral--*/

window.onload = function() {
  atualizaNP();
};

/*-------------------------------Form de geração */

function atualizaNP(){
	d = document.getElementById('nivelPoder').value;
	Num = document.getElementById('NumeroNP');
	Num.innerHTML = d;
	pontosDistrib = document.getElementById('pontosDistribuir');
	pontosDistrib.innerHTML = d*15;
	limPericias = document.getElementById('limitePericia');
	limPericias.innerHTML = 10+ parseInt(d);
	limiteDobro = document.getElementsByClassName('DobroNP');
	limiteDobro[0].innerHTML = d*2;
	limiteDobro[1].innerHTML = d*2;
	limiteDobro[2].innerHTML = d*2;
}


function trocarBotoes(){
	document.getElementById('botaoGerar').style.display="none";
	document.getElementById('botaoImprimir').style.display="block";
}


function tentarNovamente(){
	document.location.reload();
}

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

function imprimirFicha() {
	console.log(document.getElementById('inputNome').value);
	heroi.nome=document.getElementById('inputNome').value;
	document.getElementById('nomeHeroi').innerHTML="<h3 style='text-align:center;'><strong>"+heroi.nome+"</strong></h3>"
     
    window.print();

}

/*--------------------------Herói--*/
var heroi={
	'nome': '',
	'np': 11,
	'descritores':[],
	'genero':undefined,
	'idade':undefined,
	'altura':undefined,

	'for':undefined,
	'agi':undefined,
	'lut':undefined,
	'pro':undefined,
	'vig':undefined,
	'des':undefined,
	'int':undefined,
	'pre':undefined,

	'esquiva':undefined,
	'aparar':undefined,
	'fortitude':undefined,
	'resistencia':undefined,
	'vontade':undefined,

	'ataquecac':undefined,
	'ataquedist':undefined,

	'vantagens': [],
	'pericias': [],
	'poderes': []
}

/*-------------------------------------- gerar ficha--*/

function gerarHeroi(){

	heroi.np=document.getElementById('nivelPoder').value;
	/* atribui o np do heroi */

	function preencherFicha(){
	 	function preencherCampo(idCampo,valor){
	 		campo = document.getElementById(idCampo);
			campo.innerHTML= valor;
	 	}

	 	preencherCampo('fichaNp',heroi.np);
	 	preencherCampo('cacGrad',heroi.pericias[0].grad)/* perícias [0] sempre é a cac */ 
	 	preencherCampo('distGrad',heroi.pericias[1].grad)/* perícias [1] sempre é a cac */
	 	
	 	for (var i = 0; i<heroi.pericias.length; i++) {
	 		document.getElementById('fichaPericias').append(heroi.pericias[i].nome+' '+heroi.pericias[i].grad);
	 		if (i<heroi.pericias.length-1) {
	 			document.getElementById('fichaPericias').append(', ');
	 		}else {document.getElementById('fichaPericias').append('.');}
	 	}

	 	for (var i = 0; i<heroi.poderes.length; i++) {
	 		$ ('#fichaPoderes').append('('+heroi.poderes[i].descritor+') <b>'+heroi.poderes[i].nome+'</b>: '+heroi.poderes[i].grad+' <small>'+heroi.poderes[i].descricao+'</small>');
	 		/*if (heroi.poderes[i].alcance=='Perto'){
	 			document.getElementById('cacPoderes').append(heroi.poderes[i].nome+' '+heroi.poderes[i].grad+' ');
	 		} else if(heroi.poderes[i].alcance=='À Distância'){
	 			document.getElementById('distPoderes').append(heroi.poderes[i].nome+' '+heroi.poderes[i].grad+' ');
	 		}*/
	 		if (i<heroi.poderes.length-1) {
	 			$ ('#fichaPoderes').append(',<br>');
	 		}else {$ ('#fichaPoderes').append('.');}
	 	}

	 	for (var i = 0; i<heroi.vantagens.length; i++) {
	 		$ ('#fichaVantagens').append(heroi.vantagens[i].nome/*+': <small>'+heroi.vantagens[i].descricao+'</small>'*/);
	 		if (i<heroi.vantagens.length-1) {
	 			 $ ('#fichaVantagens').append(', ');
	 		}else {$ ('#fichaVantagens').append('.');}
	 	}

	 	document.getElementById('fichaForca').innerHTML=heroi.for;
	 	document.getElementById('fichaAgilidade').innerHTML=heroi.agi;
	 	document.getElementById('fichaLuta').innerHTML=heroi.lut;
	 	document.getElementById('fichaProntidao').innerHTML=heroi.pro;
	 	document.getElementById('fichaVigor').innerHTML=heroi.vig;
	 	document.getElementById('fichaDestreza').innerHTML=heroi.des;
	 	document.getElementById('fichaIntelecto').innerHTML=heroi.int;
	 	document.getElementById('fichaPresenca').innerHTML=heroi.pre;

	 	document.getElementById('fichaEsquiva').innerHTML=heroi.esquiva+heroi.agi+'='+heroi.esquiva+'+('+heroi.agi+')';
	 	document.getElementById('fichaAparar').innerHTML=heroi.aparar+heroi.lut+'='+heroi.aparar+'+('+heroi.lut+')';
	 	document.getElementById('fichaFortitude').innerHTML=heroi.fortitude+heroi.vig+'='+heroi.fortitude+'+('+heroi.vig+')';
	 	document.getElementById('fichaResistencia').innerHTML=heroi.resistencia+heroi.vig+'='+heroi.resistencia+'+('+heroi.vig+')';
	 	document.getElementById('fichaVontade').innerHTML=heroi.vontade+heroi.pro+'='+heroi.vontade+'+('+heroi.pro+')';
	 

	 	/* mostrar +/- quantos pontos foram gastos na ficha*/
	 	console.log((heroi.for+heroi.agi+heroi.lut+heroi.pro+heroi.vig+heroi.des+heroi.int+heroi.pre)*2+heroi.esquiva+heroi.aparar+heroi.fortitude+heroi.vontade+heroi.resistencia+heroi.vantagens.length);

	 }

	 function definirGraduacoes(){

	 	function definirHabilidades(){
		 	 heroi.for=randomEntre(heroi.np/5,heroi.np);
		 	 heroi.agi=randomEntre(heroi.np/5,heroi.np);
		 	 heroi.lut=randomEntre(heroi.np/5,heroi.np);
		 	 heroi.pro=randomEntre(heroi.np/5,heroi.np);
		 	 heroi.vig=randomEntre(heroi.np/5,heroi.np);
		 	 heroi.des=randomEntre(heroi.np/5,heroi.np);
		 	 heroi.int=randomEntre(heroi.np/5,heroi.np);
			 heroi.pre=randomEntre(heroi.np/5,heroi.np);
	 	}

	 	function definirDefesas(){
	 		heroi.esquiva=randomAte(heroi.np/2);
	 		heroi.aparar=randomAte(heroi.np/2);
	 		heroi.fortitude=randomAte(heroi.np/2);
	 		heroi.resistencia=randomAte(heroi.np/2);
	 		heroi.vontade=randomAte(heroi.np/2);
	 	}

	  definirHabilidades();
	  definirDefesas();

	 }

	/*var listaConceitos=[];*/
	var listaDescritores=[];
	var listaPoderes=[];
	var listaVantagens=[];
	var listaPericias=[];


/*------------------------------------------ poderes */
	listaPoderes.push(
			{'descritor': 'Água', 'nome':'Afogar', 'grad':0, 'descricao':'Aflição à Distância Cumulativa (Resistido e Sobrepujado por Fortitude; Fatigado, Exausto, Incapacitado), Concentração'},
			{'descritor': 'Água', 'nome':'Arma de água', 'grad':0, 'descricao':'Dano baseado em força'},
			{'descritor': 'Água', 'nome':'Canhão de água', 'grad':0, 'descricao':'Aflição em área(linha) Cumulativa (Resistida por Esquiva, sobrepujada por Fortitude; Tonto, Caído), Grau Limitado; 1,5m de largura 9m de comprimento'},
			{'descritor': 'Água', 'nome':'Desidratar', 'grad':0, 'descricao':'Aflição Cumulativa (Fatigado, Exausto, Incapacitado), Resistido e Sobrepujado por Fortitude'},
			{'descritor': 'Água', 'nome':'Rajada de Água', 'grad':0, 'descricao':'Dano à distância (Impacto de Água)'},
			{'descritor': 'Água', 'nome':'Respingo Cegante', 'grad':0, 'descricao':'Aflição em área (cone) Cumulativa (Resistida por Esquiva sobrepujada por Fortitude; Prejuficado, Deficiente, Desatento), Limitado à Visão'},
			{'descritor': 'Água', 'nome':'Tsunami', 'grad':'', 'descricao':'Dano à distância em Área (linha) 7 (80m de comprimento, 2m para o interior), Limitado ao longo da linha costeira, Limitado à origem de corpos de água'},
			{'descritor': 'Água', 'nome':"À prova d'água", 'grad':'', 'descricao':'Imunidade 10 (efeitos de água)'},
			{'descritor': 'Água', 'nome':'Escudo de água', 'grad':0, 'descricao':'Proteção Impenetrável, Sustentado'},
			{'descritor': 'Água', 'nome':'Neblina', 'grad':0, 'descricao':'Ambiente (visibilidade limitada)'},
			{'descritor': 'Água', 'nome':'Parede de Água', 'grad':0, 'descricao':'Criar Barreira, Limitada a paredes'},
			{'descritor': 'Água', 'nome':'Moldar Água', 'grad':0, 'descricao':'Criar Formas de àgua'},
			{'descritor': 'Água', 'nome':'Renegeração Aquática', 'grad':0, 'descricao':'Regeneração, Médio (Água)'},
			{'descritor': 'Água', 'nome':'Resistente à Fogo', 'grad':'', 'descricao':'Imunidade 10 (efeitos de fogo), Limitado a meio efeito'},
			{'descritor': 'Água', 'nome':'Aquaporte', 'grad':0, 'descricao':'Teleporte, Médio(Corpos de água)'},
			{'descritor': 'Água', 'nome':'Caminhar na água', 'grad':'', 'descricao':'Movimento 1 (Andar na água)'},
			{'descritor': 'Água', 'nome':'Natação', 'grad':0, 'descricao':'Natação'},
			{'descritor': 'Água', 'nome':'Salto de Golfinho', 'grad':0, 'descricao':'Pular, Limitado a Saltar da água'},
			{'descritor': 'Água', 'nome':'Aquático', 'grad':'', 'descricao':'Imunidade 3(Frio, afogamento, Pressão), Movimento 1 (adaptação ambiental: Aquático), Sentidos 1 (visão na penumbra)'},
			{'descritor': 'Água', 'nome':'Criaturas de água', 'grad':0, 'descricao':'Invocar criatura de água 8 (Capanga 120 pontos)'},
			{'descritor': 'Água', 'nome':'Cura hídrica', 'grad':0, 'descricao':'Cura'},
			{'descritor': 'Água', 'nome':'Esguicho', 'grad':0, 'descricao':'Nulificar Efeitos Solúveis em Água, Amplo, Simultâneo'},
			{'descritor': 'Água', 'nome':'Forma de água', 'grad':'', 'descricao':'Camuflagem 4 (Visual, Limitado a subaquático),Imunidade 30 (efeitos de fortitude), Insubstancial 2, Natação 2 (5km/h), Ativação (Ação de movimento, -1 ponto)'},
			{'descritor': 'Água', 'nome':'Acumular água', 'grad':0, 'descricao':'Crescimento, Limitado a enquanto na forma de água e em um grande corpo de água'},
			{'descritor': 'Água', 'nome':'Hidrocinese', 'grad':0, 'descricao':'Mover Objeto, Percepção, Limitado à água'},
			{'descritor': 'Água', 'nome':'Maestria Marinha', 'grad':0, 'descricao':'Invocar vida marinha, Horda, Elo Mental, Mpultiplos capangas, tipo geral variável (vida marinha), Limitado a água ou próximo a ela, Auto-alimentado'},
			{'descritor': 'Água', 'nome':'Telepatia Marinha', 'grad':'', 'descricao':'Compreender 2 (animais), Limitado à vida marinha'},
			{'descritor': 'Água', 'nome':'Vidência com água', 'grad':0, 'descricao':'Sentidos Remotos (visual e auditivo), Médio (Água)'},
			{'descritor': 'Animal', 'nome':'Armas Naturais', 'grad':0, 'descricao':'Dano baseado em força'},
			{'descritor': 'Animal', 'nome':'Bioeletricidade', 'grad':0, 'descricao':'Aflição cumulativa(choque elétrico; Resistido e sobrepujado por Fortitude; Tonto, Atordoado, Incapacitado)'},
			{'descritor': 'Animal', 'nome':'Carga Feroz', 'grad':0, 'descricao':'Dano baseado em força, Limitado a quando estiver em carga'},
			{'descritor': 'Animal', 'nome':'Constrição', 'grad':0, 'descricao':'Força aumentada, Limitada a agarrar'},
			{'descritor': 'Animal', 'nome':'Espinhos', 'grad':0, 'descricao':'Dano de reação (ao ser tocado)'},
			{'descritor': 'Animal', 'nome':'Rugido aterrorizante', 'grad':0, 'descricao':'Intimidação aumentada'},
			{'descritor': 'Animal', 'nome':'Teia', 'grad':0, 'descricao':'Aflição Acumulativa a distância (resistido por Esquiva, sobrepujado por Dano; Impedido e Vulnerável, Indefeso e Imobilizado), condição extra, grau limitado'},
			{'descritor': 'Animal', 'nome':'Veneno', 'grad':0, 'descricao':'Aflição progressiva (resistido com resistência, sobrepujado por fortitude; Tonto, atordoado, Incapacitado)'},
			{'descritor': 'Animal', 'nome':'Couro Protetor', 'grad':0, 'descricao':'Proteção'},
			{'descritor': 'Animal', 'nome':'Esgueirar', 'grad':0, 'descricao':'Movimento (permear), Limitado a espaços pequenos'},
			{'descritor': 'Animal', 'nome':'Regeneração', 'grad':0, 'descricao':'Regeneração'},
			{'descritor': 'Animal', 'nome':'Asas', 'grad':0, 'descricao':'Voo, Asas'},
			{'descritor': 'Animal', 'nome':'Deslizar serpentino', 'grad':'', 'descricao':'Movimento 1 (deslizar)'},
			{'descritor': 'Animal', 'nome':'Escalador de Paredes', 'grad':0, 'descricao':'Movimento (Escalar Paredes)'},
			{'descritor': 'Animal', 'nome':'Camuflagem camaleônica', 'grad':'', 'descricao':'Camuflagem visual 2, Mesclar'},
			{'descritor': 'Animal', 'nome':'Companheiro Animal', 'grad':0, 'descricao':'Invocar companheiro animal, heroico, poder próprio'},
			{'descritor': 'Animal', 'nome':'Criar Quimera', 'grad':0, 'descricao':'Invocar Quimera, Tipo Geral (Animais Misturados), Heroico, Limitado aos Animais Disponíveis'},
			{'descritor': 'Animal', 'nome':'Falar com Animais', 'grad':'', 'descricao':'Compreender 2 (Animais)'},
			{'descritor': 'Animal', 'nome':'Forma Animal', 'grad':'', 'descricao':'Morfar 1 (Forma animal), Metamorfose'},
			{'descritor': 'Animal', 'nome':'Invocação Animal', 'grad':'', 'descricao':'Invocar Animais 3, Tipo geral (Animais), Horda, Capangas Múltiplos 5 (32 animais), Autossuficiente'},
			{'descritor': 'Animal', 'nome':'Membros Múltiplos', 'grad':0, 'descricao':'Membros extras'},
			{'descritor': 'Animal', 'nome':'Mimetismo Animal', 'grad':0, 'descricao':'Variável (características físicas), Limitado a características possuídas por animais'},
			{'descritor': 'Animal', 'nome':'Sentidos Animais', 'grad':'', 'descricao':'Variável 1 (características físicas), Limitado às características animais, Limitado a efeitos de sentidos'},
			{'descritor': 'Ar', 'nome':'Explosão de Ar', 'grad':0, 'descricao':'Aflição à Distância em àrea (Explosão) (Resistido e Sobrepujado por Fortitude; Tonto, Atordoado, Incapacitado)'},
			{'descritor': 'Ar', 'nome':'Fedor', 'grad':0, 'descricao':'Aflição Cumulativa à Distância (Resistido e Sobrepujado por Fortitude; Tonto, Atordoado, Incapacitado), Dependente de Olfato'},
			{'descritor': 'Ar', 'nome':'Rajada Cegante', 'grad':0, 'descricao':'Aflição à Distância Cumulativa (Resistida com Esquiva, sobrepujada com Fortitude; Prejudicado, Desabilitado, Desatento), Limitado a visão'},
			{'descritor': 'Ar', 'nome':'Rajada de Ar ', 'grad':0, 'descricao':'Dano à Distância (pressão do ar)'},
			{'descritor': 'Ar', 'nome':'Rajada de Arremesso', 'grad':0, 'descricao':'Mover Objeto, Direção Limitada'},
			{'descritor': 'Ar', 'nome':'Rifle de Ar', 'grad':0, 'descricao':'Dano à Distância (projéteis)'},
			{'descritor': 'Ar', 'nome':'Sufocamento', 'grad':0, 'descricao':'Aflição à Distância Progressiva (Resistido e Sobrepujado por Fortitude; Fatigado, Exausto, Incapacitado)'},
			{'descritor': 'Ar', 'nome':'Tornado', 'grad':0, 'descricao':'Mover Objeto em àrea (cilindro), Dano'},
			{'descritor': 'Ar', 'nome':'Bolha de Ar', 'grad':'', 'descricao':'Imunidade 2 (Sufocamento), Afetar Outros, Área (Nuvem), Sustentada.'},
			{'descritor': 'Ar', 'nome':'Escudo de Ar', 'grad':0, 'descricao':'Proteção, Sustentado'},
			{'descritor': 'Ar', 'nome':'Névoa', 'grad':0, 'descricao':'Ambiente (Visibilidade)'},
			{'descritor': 'Ar', 'nome':'Parede de Vento', 'grad':0, 'descricao':'Mover Objeto em Área (Linha), Direção Limitada (Ao longo do comprimento da linha)'},
			{'descritor': 'Ar', 'nome':'Suprimento de ar', 'grad':'', 'descricao':'Imunidade 2 (sufocamento), Sustentado'},
			{'descritor': 'Ar', 'nome':'Ventos Defletores', 'grad':0, 'descricao':'Defletir, Área de explosão, Limitado a projéteis físicos'},
			{'descritor': 'Ar', 'nome':'Aterrisar', 'grad':0, 'descricao':'Nulifica Voo e Natação Baseados no Ar, Concentração, Área (Cilindro), Sem Esforço'},
			{'descritor': 'Ar', 'nome':'A Todo Pano', 'grad':0, 'descricao':'Natação, Afeta Objetos, Limitado a Veículos Movidos a Vento, Efeito Alternativo: Voo, Afeta Objetos, Planar, Limitado a Veículos Movidos a Vento'},
			{'descritor': 'Ar', 'nome':'Caminhar no ar', 'grad':'', 'descricao':'Voo 1, Sutil, Peculiaridade (a condição caído faz você cair, -1 ponto)'},
			{'descritor': 'Ar', 'nome':'Cavaleiro Eólico', 'grad':0, 'descricao':'Voo'},
			{'descritor': 'Ar', 'nome':'Planar', 'grad':0, 'descricao':'Voo, Planar'},
			{'descritor': 'Ar', 'nome':'Aerocinese', 'grad':0, 'descricao':'Mover Objeto'},
			{'descritor': 'Ar', 'nome':'Ar Sólido', 'grad':0, 'descricao':'Criar Objetos de Ar sólido'},
			{'descritor': 'Ar', 'nome':'Condições de Vento', 'grad':0, 'descricao':'Ambiente (Impede o movimento)'},
			{'descritor': 'Ar', 'nome':'Criaturas de Ar', 'grad':'', 'descricao':'Invocar Criatura de Ar 6 (Capanga de 90 pontos pg18)'},
			{'descritor': 'Ar', 'nome':'Forma de Ar', 'grad':'', 'descricao':'Camuflagem 4 (visual), Voo 1, Insubstancial 2 (gasoso)'},
			{'descritor': 'Ar', 'nome':'Sentido de Ar', 'grad':'', 'descricao':'Sentidos 2 (Percepção de Ar, Alcance de Toque)'},
			{'descritor': 'Ar', 'nome':'Vento Sussurante', 'grad':0, 'descricao':'Comunicação (Auditivo, Ar), Sutil 1'},
			{'descritor': 'Armadura', 'nome':'Arma de Captura', 'grad':0, 'descricao':'Aflição à Distância (Resistido e Sobrepujado por Fortitude; Prejudicado, Desabilitado, Incapacitado)'},
			{'descritor': 'Armadura', 'nome':'Aumento de Força', 'grad':0, 'descricao':'Força Aumentada'},
			{'descritor': 'Armadura', 'nome':'Disparo', 'grad':0, 'descricao':'Dano à Distância'},
			{'descritor': 'Armadura', 'nome':'Metralhadora', 'grad':0, 'descricao':'Dano à Distância, Multiataque'},
			{'descritor': 'Armadura', 'nome':'Micromísseis', 'grad':0, 'descricao':'Dano à Distância, Área (Explosão)'},
			{'descritor': 'Armadura', 'nome':'Míssil Teleguiado', 'grad':0, 'descricao':'Dano à Distância, Teleguiado 2 Ligado aos Sentidos 1 (Infravisão)'},
			{'descritor': 'Armadura', 'nome':'Choque de Superfície', 'grad':0, 'descricao':'Aflição (Resistido e Sobrepujado por Fortitude; Tonto, Atordoado, Incapacitado), Reação (quando tocado)'},
			{'descritor': 'Armadura', 'nome':'Superfície Eletrificada', 'grad':0, 'descricao':'Dano, Reação (quando tocada)'},
			{'descritor': 'Armadura', 'nome':'Armadura', 'grad':0, 'descricao':'Proteção'},
			{'descritor': 'Armadura', 'nome':'Campo de Força', 'grad':0, 'descricao':'Proteção'},
			{'descritor': 'Armadura', 'nome':'Escudo Mental', 'grad':'', 'descricao':'Imunidade 5 (um poder mental, como controle mental psíquico) ou Imunidade 10 (todos os poderes mentais ou psíquicos)'},
			{'descritor': 'Armadura', 'nome':'Escudo Sensorial:', 'grad':'', 'descricao':'Imunidade 5 (Efeitos de Aflição Sensorial)'},
			{'descritor': 'Armadura', 'nome':'Sistema de Suporte de Vida', 'grad':'', 'descricao':'Imunidade 10 (Suporte Vital)'},
			{'descritor': 'Armadura', 'nome':'Escavar', 'grad':0, 'descricao':'Cavar'},
			{'descritor': 'Armadura', 'nome':'Extensor de Membros', 'grad':0, 'descricao':'Alongamento'},
			{'descritor': 'Armadura', 'nome':'Patins', 'grad':0, 'descricao':'Velocidade'},
			{'descritor': 'Armadura', 'nome':'Pernas Hidráulicas', 'grad':0, 'descricao':'Saltar'},
			{'descritor': 'Armadura', 'nome':'Propulsores', 'grad':0, 'descricao':'Voo'},
			{'descritor': 'Armadura', 'nome':'Turbinas Aquáticas', 'grad':0, 'descricao':'Natação'},
			{'descritor': 'Armadura', 'nome':'Computador de Combate', 'grad':0, 'descricao':'Vantagens Aumentadas (escolha entre Avaliação, Ataque corpo a corpo, Inimigo Favorito (previamente avaliado), Iniciativa Aprimorada, Ataque à Distância e Esquiva Fabulosa) além de Defesa Aumentada (Esquiva e Aparar)'},
			{'descritor': 'Armadura', 'nome':'Sensores', 'grad':0, 'descricao':'Sentidos'},
			{'descritor': 'Armadura', 'nome':'Sistema de Comunicação', 'grad':0, 'descricao':'Comunicação por Rádio'},
			{'descritor': 'Cinético', 'nome':'Arma Cinética', 'grad':0, 'descricao':'Dano'},
			{'descritor': 'Cinético', 'nome':'Ataque Interno', 'grad':0, 'descricao':'Percepção Dano com Alcance, Resistência Alternativa (Fortitude), Afeta Objetos'},
			{'descritor': 'Cinético', 'nome':'Bala Cinética', 'grad':0, 'descricao':'Alcance Dano (projétil), Peculiaridade (Requer objetos como munição, –1 pontos)'},
			{'descritor': 'Cinético', 'nome':'Bolha Sufocante', 'grad':0, 'descricao':'Alcance Aflição Progressiva (Resistida e Sobrepujada por Fortitude; Fatigado, Exausto, Incapacitado) '},
			{'descritor': 'Cinético', 'nome':'Calor por Atrito', 'grad':0, 'descricao':'Alcance Enfraquecer Efeitos de Movimento, Amplo; Vinculado a Dano com Alcance (Calor), Dano Limitado à Redução na Graduação Velocidade'},
			{'descritor': 'Cinético', 'nome':'Cegueira Cinética', 'grad':0, 'descricao':'Percepção Alcance Aflição (Resistido por Esquiva; Desatento), Sustentado, Recuperação Instantânea, Grau Limitado (Apenas Terceiro), Limitado a Alvos com Pálpebras, Limitado a Visão'},
			{'descritor': 'Cinético', 'nome':'Focinheira Cinética', 'grad':0, 'descricao':'Percepção Alcance Aflição (Resistida por Esquivar; Transformado), Sustentado, Recuperação Instantânea, Grau Limitado (Apenas Terceiro), Limitado a Manter a Boca do Alvo Fechada (-2)'},
			{'descritor': 'Cinético', 'nome':'Explosão Cinética', 'grad':0, 'descricao':'Alcance Explosão Dano de Área (cinético)'},
			{'descritor': 'Cinético', 'nome':'Gaiola de Força:', 'grad':0, 'descricao':'Criar uma Gaiola de Força, Limitado a Aprisionar'},
			{'descritor': 'Cinético', 'nome':'Rajada Cinética', 'grad':0, 'descricao':'Alcance Dano (Cinético)'},
			{'descritor': 'Cinético', 'nome':'Absorção Cinética', 'grad':0, 'descricao':'Característica Aumentada, Dissipação, Reação (ao absorver energia cinética), Limitada a Quando Absorve Energia'},
			{'descritor': 'Cinético', 'nome':'Cancelamento de Atrito', 'grad':'', 'descricao':'Imunidade 10 (Efeitos de Agarrar, Prender e Conter), Sustentado'},
			{'descritor': 'Cinético', 'nome':'Deflexão Cinética', 'grad':0, 'descricao':'Deflexão, Limitado a Ataques Cinéticos'},
			{'descritor': 'Cinético', 'nome':'Escudo Cinético', 'grad':0, 'descricao':'Proteção Impenetrável, Sustentada'},
			{'descritor': 'Cinético', 'nome':'Imóvel', 'grad':'', 'descricao':'Imunidade 10 (Efeitos de Agarrar, Prender e Conter), Sustentado'},
			{'descritor': 'Cinético', 'nome':'Imunidade Cinética', 'grad':'', 'descricao':'Imunidade 40 (Ataques Cinéticos)'},
			{'descritor': 'Cinético', 'nome':'Atrito Aderente', 'grad':'', 'descricao':'Movimento (Escalar Paredes 1 ou 2)'},
			{'descritor': 'Cinético', 'nome':'Ricochete Cinético', 'grad':'', 'descricao':'Movimento 1 (Queda Segura)'},
			{'descritor': 'Cinético', 'nome':'Transporte Cinético', 'grad':'', 'descricao':'Teleporte 8, Limitado ao oeste, Não Através de Barreiras'},
			{'descritor': 'Cinético', 'nome':'Controle de Atrito', 'grad':0, 'descricao':'Explosão em Área Alcance Aflição (Resistido e Sobrepujado por Esquiva; Impedido, Caído), Progressivo, Grau Limitado; EA: Explosão em Área Alcance Aflição (Resistido por Esquiva, Sobrepujado por Força; Impedido, Imóvel), Progressivo, Reversível, Grau Limitado'},
			{'descritor': 'Cinético', 'nome':'Construções de Energia', 'grad':0, 'descricao':'Criar Construções de Força'},
			{'descritor': 'Cinético', 'nome':'Dreno de Inércia', 'grad':0, 'descricao':'Alcance Enfraquecer Efeitos de Movimento, Afeta Objetos, Amplo'},
			{'descritor': 'Cinético', 'nome':'Reforço Cinemático', 'grad':0, 'descricao':'Velocidade Aumentada, Afeta Outros, Alcance, Descritor Variável (efeitos de movimento)'},
			{'descritor': 'Cinético', 'nome':'Telecinesia Tátil', 'grad':0, 'descricao':'Força Aumentada, Limitada a Levantar e Mover (Sem Dano), Característica 1 (Capaz de Exercer Força Sem se Mover)'},
			{'descritor': 'Cinético', 'nome':'Telecinese', 'grad':0, 'descricao':'Mover Objeto'},
			{'descritor': 'Cinético', 'nome':'Psicocinese', 'grad':0, 'descricao':'Percepção Alcance Mover Objeto'},
			{'descritor': 'Cinético', 'nome':'Toque Telecinético', 'grad':'', 'descricao':'Sentidos 1 (Tátil com Alcance)'},
			{'descritor': 'Clima', 'nome':'Arco Cegante', 'grad':0, 'descricao':'Aflição à Distância Cumulativa (Resistido por Esquiva, Sobrepujado por Fortitude; Prejudicado, Deficiente, Desatento), Limitado à Visão'},
			{'descritor': 'Clima', 'nome':'Ciclone', 'grad':0, 'descricao':'Aflição à Distância em Área (Explosão) (Resistido e Superado pela Força; Impedido e Prejudicado, Caído e Atordoado, Incapacitado), Resistência Alternativa (Força), Concentração, Condição Extra, Recuperação Instantânea'},
			{'descritor': 'Clima', 'nome':'Congelamento Ártico', 'grad':0, 'descricao':'Aflição à Distância Cumulativa (Resistido por Esquiva, Superado por Dano; Prejudicado e Vulnerável, Indefeso e Imobilizado), Condição Extra, Grau Limitado'},
			{'descritor': 'Clima', 'nome':'Exposição ao Clima', 'grad':0, 'descricao':'Aflição à Distância (Resistido e Sobrepujado pela Fortitude; Fatigado, Exausto, Incapacitado), Sutil'},
			{'descritor': 'Clima', 'nome':'Palmas de Trovão', 'grad':0, 'descricao':'Aflição à Distância Cumulativa (Resistido por Esquiva, Sobrepujado por Fortitude; Prejudicado, Deficiente, Desatento), Limitado à Audição'},
			{'descritor': 'Clima', 'nome':'Rajada de Vento', 'grad':0, 'descricao':'Mover Objeto em Área (Cone), Alcance Curto. Limitado a empurrar para longe'},
			{'descritor': 'Clima', 'nome':'Relâmpago', 'grad':0, 'descricao':'Dano à Distância (elétrico)'},
			{'descritor': 'Clima', 'nome':'Tempestade de Granizo', 'grad':0, 'descricao':'Dano à Distância em Área (Explosão) (esmagamento), Indireto 2 (caindo de cima) '},
			{'descritor': 'Clima', 'nome':'Imunidade ao clima', 'grad':'', 'descricao':'Imunidade 2 (clima terrestre)'},
			{'descritor': 'Clima', 'nome':'Névoa', 'grad':0, 'descricao':'Ambiente (Visibilidade)'},
			{'descritor': 'Clima', 'nome':'Redemoinho', 'grad':0, 'descricao':'Defletir em Área (Nuvem)2 (raio de 9 metros), Limitada a Ataques que visem esquiva'},
			{'descritor': 'Clima', 'nome':'Tela de Vento', 'grad':0, 'descricao':'Proteção Impenetrável, Sustentado, Limitado a danos físicos'},
			{'descritor': 'Clima', 'nome':'Resistir a Intempéries', 'grad':'', 'descricao':'Movimento 1 (Adaptação Ambiental: Clima)'},
			{'descritor': 'Clima', 'nome':'Voar com o Vento', 'grad':0, 'descricao':'Voo'},
			{'descritor': 'Clima', 'nome':'Controlar o Clima', 'grad':0, 'descricao':'Ambiente (3 pontos de efeito), Seletivo'},
			{'descritor': 'Clima', 'nome':'Erguer com Vento', 'grad':0, 'descricao':'Mover Objeto em Área (Explosão), Seletivo'},
			{'descritor': 'Clima', 'nome':'Previsão do Tempo', 'grad':'', 'descricao':'Sentidos 4 (Precognição), Limitado ao clima'},
			{'descritor': 'Cósmico', 'nome':'Gavinha Cósmica', 'grad':0, 'descricao':'Aflição à Distância (Resistido por Esquiva, Sobrepujado pela Força; Prejudicado e Vulnerável, Indefeso e Imobilizado), Condição Extra, Reversível, Graduação Limitada'},
			{'descritor': 'Cósmico', 'nome':'Campo Nebular', 'grad':'', 'descricao':'Camuflagem Ataque em Área (Nuvem) 4 (Visual) '},
			{'descritor': 'Cósmico', 'nome':'Chuva de Meteoros', 'grad':0, 'descricao':'Dano à Distância Multiataque (fogo e impacto)'},
			{'descritor': 'Cósmico', 'nome':'Rajada Cósmica', 'grad':0, 'descricao':'Dano à Distância'},
			{'descritor': 'Cósmico', 'nome':'Explosão Cósmica', 'grad':0, 'descricao':'Explosão à Distância Dano em Área'},
			{'descritor': 'Cósmico', 'nome':'Escudo Cósmico', 'grad':0, 'descricao':'Proteção Impenetrável, Sustentada'},
			{'descritor': 'Cósmico', 'nome':'Espaçonato', 'grad':'', 'descricao':'Imunidade 5 (frio, todos os tipos de sufocamento, radiação, vácuo'},
			{'descritor': 'Cósmico', 'nome':'Sublime', 'grad':'', 'descricao':'Imunidade 30 (efeitos de Fortitude)'},
			{'descritor': 'Cósmico', 'nome':'Dobra Espacial', 'grad':0, 'descricao':'Movimento (Viagem Espacial), Portal'},
			{'descritor': 'Cósmico', 'nome':'Mais rápido que a luz', 'grad':0, 'descricao':'Movimento (viagem espacial)'},
			{'descritor': 'Cósmico', 'nome':'Planar pelo Espaço', 'grad':'', 'descricao':'Movimento 1 (Ambiental Adaptação: Espaço)'},
			{'descritor': 'Cósmico', 'nome':'Comunicação Cósmica', 'grad':'', 'descricao':'Comunicação 5 (projeção audiovisual subespaço, a qualquer distância)'},
			{'descritor': 'Cósmico', 'nome':'Consciência Cósmica', 'grad':'', 'descricao':'Sentidos 6 (Consciência Cósmica Aguda, Precognição Limitada a Eventos Cósmicos)'},
			{'descritor': 'Cósmico', 'nome':'Controle Cósmico', 'grad':0, 'descricao':'Mover Objeto'},
			{'descritor': 'Cósmico', 'nome':'Cura Cósmica', 'grad':0, 'descricao':'Cura'},
			{'descritor': 'Cósmico', 'nome':'Força Cósmica', 'grad':0, 'descricao':'Força Aprimorada'},
			{'descritor': 'Cósmico', 'nome':'Maestria Cósmica', 'grad':0, 'descricao':'Variável (poderes cósmicos)'},
			{'descritor': 'Cósmico', 'nome':'Ordem Cósmica', 'grad':0, 'descricao':'Anular Efeitos do Caos, Simultâneos'},
			{'descritor': 'Cósmico', 'nome':'Rastreamento Cósmico', 'grad':'', 'descricao':'Sentidos 8 (Acurado, Aguçado, Senso de Direção, Senso de Distância, Estendido, Rastreamento 2)'},
			{'descritor': 'Cósmico', 'nome':'Tradução Universal', 'grad':0, 'descricao':'Compreender 3 (falar, entendertodas as línguas)'},
			{'descritor': 'Cósmico', 'nome':'Transmutação Cósmica', 'grad':0, 'descricao':'Transforme (qualquer coisa em qualquer coisa)'},
			{'descritor': 'Dimensional', 'nome':'Banimento Dimensional', 'grad':0, 'descricao':'Movimento (Viagem Dimensional 1) Ataque (Resistido por Esquiva ou Vontade) Percepção'},
			{'descritor': 'Dimensional', 'nome':'Cascata Dimensional', 'grad':0, 'descricao':'Dano à Distância (efeito ambiental), Descritor Variável 1 (efeitos ambientais)'},
			{'descritor': 'Dimensional', 'nome':'Lâmina Dimensional', 'grad':0, 'descricao':'Dano Penetrante (corte), Sutil'},
			{'descritor': 'Dimensional', 'nome':'Adaptação Dimensional', 'grad':'', 'descricao':'Imunidade 10 (suporte vital), Limitada a Dimensões Perigosas'},
			{'descritor': 'Dimensional', 'nome':'Âncora Dimensional', 'grad':'', 'descricao':'Imunidade 5 (poderes dimensionais)'},
			{'descritor': 'Dimensional', 'nome':'Desvio Dimensional', 'grad':0, 'descricao':'Defletir (dimensional)'},
			{'descritor': 'Dimensional', 'nome':'Caminhada Dimensional', 'grad':'', 'descricao':'Movimento 3 (Viagem Dimensional, qualquer dimensão), Peculiaridade (Apenas em Movimento, –1 ponto), Requer um Teste de Percepção (CD 12, –2 pontos)'},
			{'descritor': 'Dimensional', 'nome':'Portal Dimensional', 'grad':0, 'descricao':'Movimento (Viagem Dimensional), Portal'},
			{'descritor': 'Dimensional', 'nome':'Salto Dimensional', 'grad':0, 'descricao':'Movimento (Viagem Dimensional)'},
			{'descritor': 'Dimensional', 'nome':'Bolso Dimensional', 'grad':0, 'descricao':'Característica (armazenamento extradimensional da graduação de massa em material)'},
			{'descritor': 'Dimensional', 'nome':'Deslocamento Dimensional', 'grad':'', 'descricao':'Insubstancial 4'},
			{'descritor': 'Dimensional', 'nome':'Estabilidade Dimensional', 'grad':0, 'descricao':'Anular Poderes Dimensionais em Área (Nuvem), Concentração, Simultâneo, Alcance Perto'},
			{'descritor': 'Dimensional', 'nome':'Forma Bidimensional', 'grad':'', 'descricao':'Cobertura 4 (Totalmente Visual, Limitada a um Lado), Insubstancial 1, Peculiaridade (limitada pela largura do corpo, –1 ponto)'},
			{'descritor': 'Dimensional', 'nome':'Forma Quadridimensional', 'grad':'', 'descricao':'Indireto 3 (Descritor Variável 2, todos os ataques), Sentidos 8 (Visão e Audição Penetram Cobertura), Teleporte 1'},
			{'descritor': 'Dimensional', 'nome':'Invocação Dimensional', 'grad':0, 'descricao':'Invocar Seres Extradimensionais'},
			{'descritor': 'Dimensional', 'nome':'Janela Dimensional', 'grad':0, 'descricao':'Visão Dimensional e Audição'},
			{'descritor': 'Dimensional', 'nome':'Perspectiva Dimensional', 'grad':'', 'descricao':'Sentidos 4 (Penetra Ocultação)'},
			{'descritor': 'Dimensional', 'nome':'Punga Dimensional', 'grad':0, 'descricao':'Vantagem Aprimorada (Equipamento; dimensional), Descritor Variável 2 (equipamento)'},
			{'descritor': 'Dimensional', 'nome':'Sentido Dimensional', 'grad':'', 'descricao':'Sentidos 2 (Detectar Dimensão, Aguçado)'},
			{'descritor': 'Elementos', 'nome':'Corrosivo', 'grad':0, 'descricao':'Resistência Enfraquecida, Afeta Objetos, Efeito Secundário Vinculado a Dano, Efeito Secundário'},
			{'descritor': 'Elementos', 'nome':'Enclausurar', 'grad':0, 'descricao':'Aflição à Distância (Resistido por Esquiva, Sobrepujado por Dano; Impedido e Vulnerável, Sem Defesa e Imobilizado), Condição Extra, Grau Limitado'},
			{'descritor': 'Elementos', 'nome':'Explosão', 'grad':0, 'descricao':'Dano em Área (Explosão)'},
			{'descritor': 'Elementos', 'nome':'Imolação', 'grad':0, 'descricao':'Dano (calor), Reação (tocando ou sendo tocado)'},
			{'descritor': 'Elementos', 'nome':'Nuvem de Gás', 'grad':0, 'descricao':'Aflição em Área (Nuvem) (Resistido e Sobrepujado pela Fortitude; Fatigado, Exausto, Incapacitado), Cumulativo '},
			{'descritor': 'Elementos', 'nome':'Petrificar', 'grad':0, 'descricao':'Aflição (Resistido e Sobrepujado pela Fortitude; Transformado), Grau Limitado (apenas o terceiro), Progressivo'},
			{'descritor': 'Elementos', 'nome':'Olhar Petrificante', 'grad':0, 'descricao':'Aflição (Resistido e Sobrepujado pela Fortitude; Transformado), Grau Limitado (apenas no terceiro), Progressiva, Dependente da Visão, Percepção'},
			{'descritor': 'Elementos', 'nome':'Poço de Piche', 'grad':0, 'descricao':'Aflição em Área (Nuvem) (Resistido por Esquiva, Sobrepujado pela Força; Impedido e Vulnerável, Indefeso e Imobilizado), Cumulativo, Condição Extra, Grau limitado'},
			{'descritor': 'Elementos', 'nome':'Destruir Projéteis', 'grad':'', 'descricao':'Imunidade 10 (projéteis), Sustentada'},
			{'descritor': 'Elementos', 'nome':'Dureza de Diamante', 'grad':0, 'descricao':'Proteção Impenetrável, Perceptível'},
			{'descritor': 'Elementos', 'nome':'Faseamento Molecular', 'grad':'', 'descricao':'Insubstancial 4'},
			{'descritor': 'Elementos', 'nome':'Imunidade Química', 'grad':'', 'descricao':'Imunidade 2 (efeitos químicos)'},
			{'descritor': 'Elementos', 'nome':'Não Vivo', 'grad':'', 'descricao':'Imunidade 30 (Efeitos de Fortitude)'},
			{'descritor': 'Elementos', 'nome':'Desintegração Quântica', 'grad':0, 'descricao':'Teleporte'},
			{'descritor': 'Elementos', 'nome':'Desintegração Quântica Explosiva', 'grad':0, 'descricao':'Teleporte; Dano em Área (Explosão), Reação (explosão, ao se teletransportar)'},
			{'descritor': 'Elementos', 'nome':'Foguete Químico', 'grad':0, 'descricao':'Voo'},
			{'descritor': 'Elementos', 'nome':'Túnel Transmutativo', 'grad':0, 'descricao':'Cavar'},
			{'descritor': 'Elementos', 'nome':'Análise Química', 'grad':'', 'descricao':'Sentidos 3 (Detectar Compostos Químicos, Aguçado, Analítico)'},
			{'descritor': 'Elementos', 'nome':'Neutralizar Reação', 'grad':0, 'descricao':'Nulificar à Distância (Efeitos Químicos) Amplo, Simultâneo'},
			{'descritor': 'Eletricidade', 'nome':'Convulsão', 'grad':0, 'descricao':'Aflição Percepção (Resistida e Sobrepujada por Vontade; Em Transe, Atordoado, Incapacitado)'},
			{'descritor': 'Eletricidade', 'nome':'Faísca Ofuscante', 'grad':0, 'descricao':'Aflição Cumulativa Percepção (Resistido por Esquiva, Sobrepujado por Fortitude; Visualmente Impedido, Visualmente Deficiente, Visualmente Desatento), Limitado a um Sentido'},
			{'descritor': 'Eletricidade', 'nome':'Pulso Eletromagnético (PEM)', 'grad':0, 'descricao':'Eletrônicos Enfraquecidos, Afeta Apenas Objetos, Amplo, Área de Explosão, Simultâneo'},
			{'descritor': 'Eletricidade', 'nome':'Relâmpago', 'grad':0, 'descricao':'Dano à Distância (elétrico) '},
			{'descritor': 'Eletricidade', 'nome':'Bola de Raios', 'grad':0, 'descricao':'Área de Explosão à Distância Dano (elétrico)'},
			{'descritor': 'Eletricidade', 'nome':'Corrente de Relâmpagos', 'grad':0, 'descricao':'Dano à Distância Multiataque (elétrico)'},
			{'descritor': 'Eletricidade', 'nome':'Superfície Eletrificada', 'grad':0, 'descricao':'Aflição Cumulativa Reação (Resistido e Sobrepujado pela Fortitude; Tonto, Atordoado, Incapacitado)'},
			{'descritor': 'Eletricidade', 'nome':'Superfície de Choque (DC)', 'grad':0, 'descricao':'Aflição Progressiva Reação (Resistido e Sobrepujado pela Fortitude; Tonto, Atordoado, Incapacitado)'},
			{'descritor': 'Eletricidade', 'nome':'Taser', 'grad':0, 'descricao':'Aflição à Distância (Resistido e Sobrepujado pela Fortitude; Tonto, Atordoado, Incapacitado)'},
			{'descritor': 'Eletricidade', 'nome':'Absorção Elétrica', 'grad':0, 'descricao':'Cura, Reação, Efeito Bônus (Pode Contra-atacar a Fadiga de Esforço Extra), Limitado a si mesmo, Limitado a Graduação da Eletricidade Absorvida, Fonte (eletricidade)'},
			{'descritor': 'Eletricidade', 'nome':'Campo Eletromagnético', 'grad':0, 'descricao':'Proteção, Sustentada'},
			{'descritor': 'Eletricidade', 'nome':'Imunidade Elétrica', 'grad':0, 'descricao':'Imunidade 10 (Efeitos Elétricos)'},
			{'descritor': 'Eletricidade', 'nome':'Condutor Elétrico', 'grad':0, 'descricao':'Imunidade 10 (efeitos elétricos), Refletir, Redirecionar'},
			{'descritor': 'Eletricidade', 'nome':'Eletrovoo', 'grad':0, 'descricao':'Voo'},
			{'descritor': 'Eletricidade', 'nome':'Velocidade Relâmpago', 'grad':0, 'descricao':'Salto'},
			{'descritor': 'Eletricidade', 'nome':'Voo Relampejante', 'grad':0, 'descricao':'Teleporte, Preciso, Fácil, Estendido, Limitado (deve passar pelo espaço intermediário em forma de raio)'},
			{'descritor': 'Eletricidade', 'nome':'Apagão', 'grad':0, 'descricao':'Anular Eletrônicos, Amplo, Área (Explosão), Concentração, Simultâneo, Alcance Curto'},
			{'descritor': 'Eletricidade', 'nome':'Criaturas Elétricas', 'grad':'', 'descricao':'Invocar Criatura Relâmpago 6'},
			{'descritor': 'Eletricidade', 'nome':'Eletricidade Estática', 'grad':0, 'descricao':'Mover Objeto'},
			{'descritor': 'Eletricidade', 'nome':'Feixe de Luz', 'grad':0, 'descricao':'Ambiente (Luz)'},
			{'descritor': 'Eletricidade', 'nome':'Forma Elétrica', 'grad':'', 'descricao':'Insubstancial 3 (eletricidade)'},
			{'descritor': 'Eletricidade', 'nome':'Moldar Eletricidade', 'grad':0, 'descricao':'Dano (elétrico) em Área, Moldável, Duração pela Concentração, Seletivo'},
			{'descritor': 'Eletricidade', 'nome':'Sentido Elétrico', 'grad':0, 'descricao':'Detecta Eletricidade, à Distância, Aguçado'},
			{'descritor': 'Fogo', 'nome':'Asfixia', 'grad':0, 'descricao':'Aflição Cumulativa à Distância (Tonto, Atordoado, Incapacitado) • Resistida por Fortitude (CD 10 + graduação), Sobrepujado pela Fortitude'},
			{'descritor': 'Fogo', 'nome':'Aura Flamejante', 'grad':0, 'descricao':'Dano de Fogo Reação (Quando Tocado)'},
			{'descritor': 'Fogo', 'nome':'Bola de Fogo', 'grad':0, 'descricao':'Dano à Distância em Área (Explosão) • Raio de 9 metros, Teste de Salvamento Esquiva (CD 10 + graduação) para metade do efeito'},
			{'descritor': 'Fogo', 'nome':'Explosão Estelar', 'grad':0, 'descricao':'Dano em Área (Explosão), Área 3, Característica 1 (Esforço Extraordinário para +2 na graduação do efeito), Cansativo • Raio de 36 metros, Teste de Salvamento de Esquiva (CD 10 + graduação) para metade do efeito'},
			{'descritor': 'Fogo', 'nome':'Fulgor Ígneo', 'grad':0, 'descricao':'Aflição Cumulativa Percepção (Visualmente Prejudicado, Visualmente Deficiente, Visualmente Desatento), Limitado a um Sentido • Resistido por Esquiva (CD 10 + graduação), Sobrepujado por Fortitude (CD 10 + graduação)'},
			{'descritor': 'Fogo', 'nome':'Fundir', 'grad':0, 'descricao':'Enfraquecer Resistência à Distância, Afeta Apenas Objetos • As graduações de Resistência perdidas devido ao efeito não são recuperadas e devem ser reparadas'},
			{'descritor': 'Fogo', 'nome':'Imolação', 'grad':0, 'descricao':'Dano de Fogo, Percepção, Duração de Concentração'},
			{'descritor': 'Fogo', 'nome':'Insolação', 'grad':0, 'descricao':'Aflição Cumulativa Percepção (Fatigado, Esgotado, Incapacitado) • Resistida por Fortitude (CD 10 + graduação), Sobrepujado por Fortitude (CD 10 + graduação)'},
			{'descritor': 'Fogo', 'nome':'Lança-chamas', 'grad':0, 'descricao':'Dano de Fogo em Área (Linha) • 1,5 metro de largura, 9 metros de comprimento, Teste de Salvamento Esquiva (CD 10 + graduação) para metade do efeito'},
			{'descritor': 'Fogo', 'nome':'Nuvem de Fogo', 'grad':0, 'descricao':'Dano de Fogo à Distância em Área (Nuvem) • Raio de 4,5 metros, Teste de Salvamento Esquiva (CD 10 + graduação) para metade do efeito'},
			{'descritor': 'Fogo', 'nome':'Nuvem de fumaça', 'grad':0, 'descricao':'Camuflagem Visual em Área (Nuvem), Ataque • raio de 4,5 metros'},
			{'descritor': 'Fogo', 'nome':'Rajada de Fogo', 'grad':0, 'descricao':'Dano de Fogo à Distância'},
			{'descritor': 'Fogo', 'nome':'Sopro de Fogo', 'grad':0, 'descricao':'Dano de Fogo em Área (Cone) • Comprimento e largura de 18 metros, teste de salvamento Esquiva (CD 10 + graduação) para metade do efeito'},
			{'descritor': 'Fogo', 'nome':'Absorção de Calor', 'grad':0, 'descricao':'Característica Aumentada (Desaparece, Reação: Ao Absorver Calor), Imunidade 10 (Efeitos de Calor)'},
			{'descritor': 'Fogo', 'nome':'Escudo de Fogo', 'grad':0, 'descricao':'Proteção Impenetrável, Limitado a Armas Flamejantes, Sustentado'},
			{'descritor': 'Fogo', 'nome':'Forma de Fogo', 'grad':'', 'descricao':'Insubstancial 3 (Forma de Energia)'},
			{'descritor': 'Fogo', 'nome':'Imunidade ao Frio', 'grad':'', 'descricao':'Imunidade 1 (Frio Ambiental), Imunidade 5 (Dano de Frio) ou Imunidade 10 (Efeitos de Frio)'},
			{'descritor': 'Fogo', 'nome':'Imunidade ao Calor', 'grad':'', 'descricao':'Imunidade 1 (Calor Ambiental), Imunidade 5 (Dano de Calor) ou Imunidade 10 (Efeitos de Calor)'},
			{'descritor': 'Fogo', 'nome':'Igniporte', 'grad':0, 'descricao':'Teleporte, Estendido, Médio: Chamas'},
			{'descritor': 'Fogo', 'nome':'Tunelamento', 'grad':0, 'descricao':'Cavar'},
			{'descritor': 'Fogo', 'nome':'Voo de Foguete', 'grad':0, 'descricao':'Voo'},
			{'descritor': 'Fogo', 'nome':'Aquecer', 'grad':0, 'descricao':'Ambiente (Calor)'},
			{'descritor': 'Fogo', 'nome':'Criaturas de Fogo', 'grad':'', 'descricao':'Invocar Criatura de Fogo 8 • Lacaio de 120 pontos'},
			{'descritor': 'Fogo', 'nome':'Infravisão', 'grad':'', 'descricao':'Sentidos 1 (Infravisão) •'},
			{'descritor': 'Fogo', 'nome':'Lanterna de Chamas', 'grad':0, 'descricao':'Ambiente (Luz)'},
			{'descritor': 'Fogo', 'nome':'Moldar Fogo', 'grad':0, 'descricao':'Dano de Fogo à Distância em Área Moldável, Duração da Concentração, Seletivo • 9 metros cúbicos (graduação de volume 5), Teste de Salvamento Esquiva (CD 10 + graduação) para metade do efeito'},
			{'descritor': 'Fogo', 'nome':'Pirocinese', 'grad':0, 'descricao':'Dano de Fogo Percepção em Área Moldável, Limitado ao Fogo Existente • 9 metros cúbicos (graduação de volume 5)'},
			{'descritor': 'Força', 'nome':'Arrebentar Amarras', 'grad':0, 'descricao':'Penetrante no Dano de Força'},
			{'descritor': 'Força', 'nome':'Arremesso Balístico', 'grad':0, 'descricao':'Dano à Distância (balístico), Peculiaridade(requer objetos para lançar, -1 ponto)'},
			{'descritor': 'Força', 'nome':'Chicote de Solo', 'grad':0, 'descricao':'Aflição em Área (Linha) (Resistido por Esquiva, Sobrepujado por Fortitude; Tonto e Vulnerável, Caído e Atordoado), Condição Extra, Grau Limitado, Limitado a alvos em uma superfície apropriada'},
			{'descritor': 'Força', 'nome':'Empurrão Potente', 'grad':0, 'descricao':' Mover Objeto, Alcance Curto, Limitado a arremessar alvos para longe, Ligado ao Dano de Força'},
			{'descritor': 'Força', 'nome':'Estalo Poderoso', 'grad':0, 'descricao':'Sutil 1 em Dano de Força'},
			{'descritor': 'Força', 'nome':'Mata-Leão', 'grad':0, 'descricao':'Aflição (Resistido e Sobrepujado por Fortitude; Tonto, Atordoado, Incapacitado), Progressivo, Baseado em Agarrar'},
			{'descritor': 'Força', 'nome':'Onda de Choque', 'grad':0, 'descricao':'Aflição em Área (Explosão) (Resistido por Esquiva, Sobrepujado por Fortitude; Tonto e Vulnerável, Atordoado e Caído), Condição Extra, Grau Limitado, Limitado a alvos no chão'},
			{'descritor': 'Força', 'nome':'Palmas de Trovão', 'grad':0, 'descricao':'Aflição em Área (Explosão) (Resistido por Fortitude, Sobrepujado por Fortitude; Tonto e Vulnerável, Indefeso e Atordoado), Condição Extra, Grau Limitado'},
			{'descritor': 'Força', 'nome':'Impassível', 'grad':'', 'descricao':'Imunidade 10 (ser movido), Sustentado'},
			{'descritor': 'Força', 'nome':'Parede de Pedra', 'grad':0, 'descricao':'Dano, Reação (ao ser atingido), Limitado para efeito de graduação ou graduação de Dano de ataque, o que for menor'},
			{'descritor': 'Força', 'nome':'Super-Resiliência', 'grad':'', 'descricao':'Imunidade 10 (Suporte de Vida), Peculiaridade (limitado a aproximadamente 30 minutos por vez, -1 ponto)'},
			{'descritor': 'Força', 'nome':'Superdureza', 'grad':0, 'descricao':'Proteção'},
			{'descritor': 'Força', 'nome':'Cabo de Guerra', 'grad':0, 'descricao':'Dano de Força, Reação (quando agarrado)'},
			{'descritor': 'Força', 'nome':'Apoios Improvisados', 'grad':0, 'descricao':'Movimento 1 (Andar na parede), Limitado a superfícies com Resistência material menor que o modificador de Força'},
			{'descritor': 'Força', 'nome':'Irrefreável', 'grad':0, 'descricao':'Escavação Penetrante'},
			{'descritor': 'Força', 'nome':'Supersalto', 'grad':0, 'descricao':'Saltar'},
			{'descritor': 'Força', 'nome':'Levantamento de Peso', 'grad':0, 'descricao':'Força Aumentada, Limitada a Levantamento'},
			{'descritor': 'Força', 'nome':'Reforço de força', 'grad':0, 'descricao':'Força Aumentada, Dissipação'},
			{'descritor': 'Força', 'nome':'Reforço por Absorção', 'grad':0, 'descricao':'Força Aumentada, Dissipação, Limitado a menor de graduação de efeito ou graduação da energia absorvida'},
			{'descritor': 'Força', 'nome':'Força Furiosa', 'grad':0, 'descricao':'Força Aumentada, Limitada a quando estiver com raiva'},
			{'descritor': 'Frio', 'nome':'Amarras de Gelo', 'grad':0, 'descricao':'Aflição Cumulativa À Distância (gelo; Resistido por Esquiva, Sobrepujado por Dano; Impedido e Vulnerável, Indefeso e Imóvel), Condição Extra, Grau Limitado'},
			{'descritor': 'Frio', 'nome':'Aura Congelante', 'grad':0, 'descricao':'Dano, Reação (Frio; ser tocado)'},
			{'descritor': 'Frio', 'nome':'Congelamento Instantâneo', 'grad':0, 'descricao':'Enfraquecer Resistência À Distância, Afeta Apenas Objetos'},
			{'descritor': 'Frio', 'nome':'Criocinese', 'grad':0, 'descricao':'Aflição Cumulativa, Percepção (Resistido e Sobrepujado por Fortitude; Tonto, Atordoado, Transformado), Afeta Objetos'},
			{'descritor': 'Frio', 'nome':'Gelo Escorregadio', 'grad':0, 'descricao':'Aflição à Distância em Área (Explosão) (gelo; Resistido e Sobrepujado por Esquiva; Impedido e Vulnerável, Indefeso e Caído), Resistência Alternativa, Condição Extra, Grau Limitado'},
			{'descritor': 'Frio', 'nome':'Neve Cegante', 'grad':0, 'descricao':'Aflição Cumulativa à Distância (Resistido por Esquiva, Sobrepujado por Fortitude; Visão Prejudicada, Visão Desabilitada, Visão Desatenta), Limitado a Um Sentido'},
			{'descritor': 'Frio', 'nome':'Punho de Gelo', 'grad':0, 'descricao':'Dano baseado em Força (frio e esmagamento)'},
			{'descritor': 'Frio', 'nome':'Rajada de Frio', 'grad':0, 'descricao':'Aflição À Distância (frio; Resistido e Sobrepujado por Fortitude; Fatigado, Exausto, Incapacitado)'},
			{'descritor': 'Frio', 'nome':'Rajada de Gelo', 'grad':0, 'descricao':'Dano À Distância (frio e esmagamento ou corte)'},
			{'descritor': 'Frio', 'nome':'Tempestade de Granizo', 'grad':0, 'descricao':'Dano À Distância em Área (frio e esmagamento), Indireto 2'},
			{'descritor': 'Frio', 'nome':'Armadura de Gelo', 'grad':0, 'descricao':'Proteção'},
			{'descritor': 'Frio', 'nome':'Imunidade a Calor', 'grad':'', 'descricao':'Imunidade 1 (Calor Ambiental), Imunidade 5 (Dano de Calor), Imunidade 10 (Efeitos de Calor)'},
			{'descritor': 'Frio', 'nome':'Imunidade a Frio', 'grad':'', 'descricao':'Imunidade 1 (Frio Ambiental), Imunidade 5 (Dano de Frio), Imunidade 10 (Efeitos de Frio)'},
			{'descritor': 'Frio', 'nome':'Invisibilidade Infravermelha', 'grad':'', 'descricao':'Camuflagem 2 (Infravisão)'},
			{'descritor': 'Frio', 'nome':'Atravessar o Gelo', 'grad':0, 'descricao':'Movimento (Atravessar), Limitado a Gelo e Neve'},
			{'descritor': 'Frio', 'nome':'Caminhar no Gelo', 'grad':'', 'descricao':': Movimento 1 (Adaptação Ambiental – Gelo)'},
			{'descritor': 'Frio', 'nome':'Patinação no Gelo', 'grad':0, 'descricao':'Velocidade, Limitado a gelo'},
			{'descritor': 'Frio', 'nome':'Portal de Gelo', 'grad':0, 'descricao':'Teleporte, Médio (gelo)'},
			{'descritor': 'Frio', 'nome':'Rampas de Gelo', 'grad':0, 'descricao':'Voo, Plataforma (rampas de gelo)'},
			{'descritor': 'Frio', 'nome':'Sapatos de Neve', 'grad':'', 'descricao':'Movimento 2 (Sem Rastros, Caminhar na Água), Limitado à Neve'},
			{'descritor': 'Frio', 'nome':'Túnel de Gelo', 'grad':0, 'descricao':'Escavação, Limitado a Gelo e Neve'},
			{'descritor': 'Frio', 'nome':'Criaturas de Gelo', 'grad':'', 'descricao':'Invocar Criatura de Gelo 5, Controlado'},
			{'descritor': 'Frio', 'nome':'Deslocar Gelo', 'grad':0, 'descricao':'Mover Objeto, Percepção, Limitado a Gelo e Neve'},
			{'descritor': 'Frio', 'nome':'Forma de Gelo', 'grad':'', 'descricao':'Imunidade 20 (Efeitos de Frio, Suporte Vital), Proteção'},
			{'descritor': 'Frio', 'nome':'Forma de Neve', 'grad':'', 'descricao':'Imunidade 20 (Efeitos de Frio, Suporte Vital), Insubstancial'},
			{'descritor': 'Frio', 'nome':'Moldes de Gelo', 'grad':0, 'descricao':'Criar Gelo, Permanente'},
			{'descritor': 'Frio', 'nome':'Nevasca', 'grad':0, 'descricao':'Ambiente (Frio, Visibilidade)'},
			{'descritor': 'Frio', 'nome':'Projeção de Frio', 'grad':0, 'descricao':'Ambiente (Frio)'},
			{'descritor': 'Frio', 'nome':'Visão Térmica', 'grad':'', 'descricao':'Sentidos 1 (Infravisão)'},
			{'descritor': 'Gravidade', 'nome':'Campo de Gravidade Zero', 'grad':0, 'descricao':'Mover Objeto Área (Explosão), Limitado a Erguer'},
			{'descritor': 'Gravidade', 'nome':'Campo Gravitacional', 'grad':0, 'descricao':'Mover Objeto Explosão (Área) (Gravidade), Limitado a Puxar para Baixo'},
			{'descritor': 'Gravidade', 'nome':'Campo Gravitacional Esmagador', 'grad':0, 'descricao':'Mover Objeto Explosão (Área)(gravidade), Limitado a Puxar para Baixo, Causa Dano'},
			{'descritor': 'Gravidade', 'nome':'Deslizamento Gravitacional', 'grad':0, 'descricao':'Dano à Distância (Esmagamento) Área (Nuvem)'},
			{'descritor': 'Gravidade', 'nome':'Explosão Gravitacional', 'grad':0, 'descricao':'Dano (Força) Área (Explosão)'},
			{'descritor': 'Gravidade', 'nome':'Onda Gravitacional', 'grad':0, 'descricao':'Dano (Força) Área (Cone)'},
			{'descritor': 'Gravidade', 'nome':'Rajada Gravitacional', 'grad':0, 'descricao':'Dano à Distância (Força)'},
			{'descritor': 'Gravidade', 'nome':'Singularidade', 'grad':0, 'descricao':'Mover Objetos, Área 2 (Explosão), Causa Dano, Limitado a Puxar em direção ao Centro da Área'},
			{'descritor': 'Gravidade', 'nome':'Contenção Gravitacional', 'grad':0, 'descricao':'Nulificar Explosões, Reação'},
			{'descritor': 'Gravidade', 'nome':'Deflexão Gravitacional', 'grad':0, 'descricao':'Defletir'},
			{'descritor': 'Gravidade', 'nome':'Escudo Gravitacional', 'grad':0, 'descricao':'IProteção Impenetrável, Sustentada'},
			{'descritor': 'Gravidade', 'nome':'Imunidade Gravitacional', 'grad':'', 'descricao':'Imunidade 2 (Efeitos Gravitacionais)'},
			{'descritor': 'Gravidade', 'nome':'Antigravidade', 'grad':0, 'descricao':'Voo, Sutil'},
			{'descritor': 'Gravidade', 'nome':'Adaptação à Gravidade Elevada', 'grad':'', 'descricao':'Movimento 1 (Adaptação Ambiental - Gravidade Elevada)'},
			{'descritor': 'Gravidade', 'nome':'Adaptação à Queda Livre', 'grad':'', 'descricao':'Movimento 1 (Adaptação Ambiental - Gravidade Zero)'},
			{'descritor': 'Gravidade', 'nome':'Deformação Gravitacional', 'grad':0, 'descricao':'Teleporte'},
			{'descritor': 'Gravidade', 'nome':'Puxão Direcional', 'grad':0, 'descricao':'Movimento (Escalar Paredes)'},
			{'descritor': 'Gravidade', 'nome':'Queda Livre', 'grad':'','descricao':'Movimento 1 (Queda Segura)'},
			{'descritor': 'Gravidade', 'nome':'Salto de Baixa Gravidade', 'grad':0, 'descricao':'Pulando'},
			{'descritor': 'Gravidade', 'nome':'Comunicação Gravitacional', 'grad':'', 'descricao':'Comunicação 5, Área, Sutil 1'},
			{'descritor': 'Gravidade', 'nome':'Guindaste Gravitacional', 'grad':0, 'descricao':'Força Aumentada, Limitada à elevação'},
			{'descritor': 'Gravidade', 'nome':'Gravidade Artificial', 'grad':0, 'descricao':'Ambiental (Nega o movimento impedido devido a gravidade)'},
			{'descritor': 'Gravidade', 'nome':'Gravitocinese', 'grad':0, 'descricao':'Mover Objeto'},
			{'descritor': 'Gravidade', 'nome':'Senso Gravitacional', 'grad':0, 'descricao':'Sentidos (Detectar Gravidade, Alcance)'},
			{'descritor': 'Ilusão', 'nome':'Aflição Ilusória', 'grad':0, 'descricao':'Aflição, Percepção (Resistida e Sobrepujada pela Vontade), Condições Variáveis, Reversível, Sutil'},
			{'descritor': 'Ilusão', 'nome':'Dano Ilusório', 'grad':0, 'descricao':'Dano, Percepção, Resistência Alternativa (Vontade), Resistível por Vontade (remove dano), Variável 2 (efeitos ilusórios)'},
			{'descritor': 'Ilusão', 'nome':'Privação Sensorial', 'grad':0, 'descricao':'Aflição Cumulativa, Percepção (Resistida e Sobrepujada por Vontade; Prejudicado, Desabilitado, Incapacitado)'},
			{'descritor': 'Ilusão', 'nome':'Vertigem', 'grad':0, 'descricao':'Aflição Cumulativa, Percepção (Resistida e Sobrepujada por Vontade; Prejudicado, Caído, Incapacitado)'},
			{'descritor': 'Ilusão', 'nome':'Cobertura Escondida', 'grad':0, 'descricao':'Vantagem Aumentada (Evasão 2), Proteção, Desvanecer, Impenetrável, Sutil, Sustentada'},
			{'descritor': 'Ilusão', 'nome':'Duplicata Ilusória', 'grad':'', 'descricao':'Ilusão 2 (Visual e Auditiva), Limitado a um Duplo de Si'},
			{'descritor': 'Ilusão', 'nome':'Ocultação Ilusória', 'grad':'', 'descricao':'Camuflagem 10 (todos os sentidos), Misturar-se ou Resistível por Vontade'},
			{'descritor': 'Ilusão', 'nome':'Projeção Ilusória', 'grad':0, 'descricao':'Sentidos Remotos (Visual, Auditivo e Mental), Efeito Colateral (o corpo físico está indefeso e imóvel, -2), Notável'},
			{'descritor': 'Ilusão', 'nome':'Disfarce Ilusório', 'grad':0, 'descricao':'Transformar, Resistível por Vontade'},
			{'descritor': 'Ilusão', 'nome':'Ilusão', 'grad':0, 'descricao':'Ilusão'},
			{'descritor': 'Ilusão', 'nome':'Memória Sensorial', 'grad':'', 'descricao':'Característica 1 (Perfeita Recordação Sensorial) '},
			{'descritor': 'Ilusão', 'nome':'Mimetismo Vocal', 'grad':'', 'descricao':'Ilusão 2 (Auditiva), Limitado a Vozes'},
			{'descritor': 'Ilusão', 'nome':'Percepção da Verdade', 'grad':'', 'descricao':'Sentidos 5 (todos os sentidos, Contra-ataca Ilusões)'},
			{'descritor': 'Invocação', 'nome':'Animação', 'grad':0, 'descricao':'Invocar Objeto Animado, Perecepção, Limitado a objetos disponíveis'},
			{'descritor': 'Invocação', 'nome':'Construtos', 'grad':0, 'descricao':'Invocar Construto à Distância, Tipo Amplo, Controlado'},
			{'descritor': 'Invocação', 'nome':'Duplicata', 'grad':0, 'descricao':'Invocar Duplicata, Heroico'},
			{'descritor': 'Invocação', 'nome':'Enxame', 'grad':0, 'descricao':'Invocar Enxame (Ativo, Controlado)'},
			{'descritor': 'Invocação', 'nome':'Necromancia', 'grad':0, 'descricao':'Invocar Mortos-vivos, Controlado, Horda, Múltiplos Capangas (32 no total)'},
			{'descritor': 'Invocação', 'nome':'Iscas', 'grad':'', 'descricao':'Camuflagem 4 (Todos os sentidos visuais), Limitado a imagens iscas'},
			{'descritor': 'Invocação', 'nome':'Sacrifício', 'grad':0, 'descricao':' Adicione o modificador Sacrifício em Invocar'},
			{'descritor': 'Invocação', 'nome':'Escada de Duplicatas', 'grad':0, 'descricao':'Saltar'},
			{'descritor': 'Invocação', 'nome':'Invocar Montaria', 'grad':'', 'descricao':'Invocar Montaria 1, Contínuo'},
			{'descritor': 'Invocação', 'nome':'Invocar Veículo', 'grad':0, 'descricao':'Invocar Veículo, Controlado'},
			{'descritor': 'Invocação', 'nome':'Justapor', 'grad':0, 'descricao':'Teletransporte, Preciso (onde quer que esteja duplicata), Fácil, Estendido, Limitado a Trocar de Lugar com Duplicata (–2), Meio (Duplicata)'},
			{'descritor': 'Invocação', 'nome':'Combinação', 'grad':0, 'descricao':'Invocar forma combinada, Heroico, Retroalimentação, Limitado (requer que todos os componentes estejam presentes), Limitado (os componentes desaparecem enquanto a forma combinada está presente)'},
			{'descritor': 'Invocação', 'nome':'Divisão Anatômica', 'grad':0, 'descricao':'Invocar parte do corpo, Controlado, Elo Mental, Múltiplos Capangas 3, Efeito Colateral (perder o uso da parte separada)'},
			{'descritor': 'Invocação', 'nome':'Empoderar', 'grad':0, 'descricao':'Versão de Invocação Empoderada, Tipo Geral, Limitado a sujeitos disponíveis'},
			{'descritor': 'Luz', 'nome':'Arma Laser', 'grad':0, 'descricao':'Dano (Laser)'},
			{'descritor': 'Luz', 'nome':'Estroboscópio Hipnótico', 'grad':0, 'descricao':'Aflição em Árera (Percepção) (Resistido e Sobrepujado por Vontade; Em Transe, Compelido), Grau Limitado, Dependente da Visão'},
			{'descritor': 'Luz', 'nome':'Explosão Deslumbrante', 'grad':0, 'descricao':'Aflição Cumulativa, Explosão (Área); (Resistida por Esquiva, Sobrepujada por Fortitude; Tonto, Atordoado, Incapacitado), Dependente da Visão'},
			{'descritor': 'Luz', 'nome':'Raio Laser', 'grad':0, 'descricao':'Dano à Distância (Laser)'},
			{'descritor': 'Luz', 'nome':'Pulso de Laser', 'grad':0, 'descricao':'Dano à Distância Multiataque (Laser)'},
			{'descritor': 'Luz', 'nome':'Explosão Laser', 'grad':0, 'descricao':'Dano em Área (Explosão) (Laser)'},
			{'descritor': 'Luz', 'nome':'Raio Laser Invisível', 'grad':0, 'descricao':'Dano à Distância (Laser), Sutil'},
			{'descritor': 'Luz', 'nome':'Mira Laser', 'grad':0, 'descricao':'Adicione Precisão a qualquer poder Laser'},
			{'descritor': 'Luz', 'nome':'Raio Ofuscante', 'grad':0, 'descricao':'Aflição à Distância Cumulativa (Resistido por Esquiva, Sobrepujado por Fortitude; Visualmente Prejudicado, Visualmente Deficiente, Visualmente Desatento), Limitado à Visão'},
			{'descritor': 'Luz', 'nome':'Explosão Ofuscante', 'grad':0, 'descricao':'Aflição em Área (Explosão) Cumulativa (Resistido por Esquiva, Sobrepujado por Fortitude; Visualmente Prejudicado, Visualmente Deficiente, Visualmente Desatento), Limitado à Visão'},
			{'descritor': 'Luz', 'nome':'Aura Ofuscante', 'grad':0, 'descricao':'Aflição em Área (Percepção) Cumulativa (Resistido por Esquiva, Sobrepujado por Fortitude; Visualmente Prejudicado, Visualmente Deficiente, Visualmente Desatento), Limitado à Visão, Duração Sustentada'},
			{'descritor': 'Luz', 'nome':'Campo Ofuscante', 'grad':0, 'descricao':'Camuflagem em Área (Explosão) Ataque 4 (todos os sentidos visuais)'},
			{'descritor': 'Luz', 'nome':'Absorção de Luz', 'grad':0, 'descricao':'Característica Aumentada, Dissipa-se, Limitado ao menor: graduação do efeito ou graduação da energia absorvida'},
			{'descritor': 'Luz', 'nome':'Escudo Fotônico', 'grad':0, 'descricao':'Proteção, Sustentado'},
			{'descritor': 'Luz', 'nome':'Forma de Luz', 'grad':'', 'descricao':'Insubstancial 3 (Forma Energética - Luz)'},
			{'descritor': 'Luz', 'nome':'Imunidade à Luz', 'grad':'', 'descricao':'Imunidade 10 (Efeitos de Luz'},
			{'descritor': 'Luz', 'nome':'Reflexão', 'grad':0, 'descricao':'Deflexão, Refletir, Alcance Curto, Limitado a Efeitos de Luz'},
			{'descritor': 'Luz', 'nome':'Velocidade da Luz', 'grad':'', 'descricao':'Voo 24, Movimento 1 (Viagem Espacial 1)'},
			{'descritor': 'Luz', 'nome':'Voo Luminescente', 'grad':0, 'descricao':'Voo'},
			{'descritor': 'Luz', 'nome':'Ponte Luminosa', 'grad':0, 'descricao':'Voo, Plataforma'},
			{'descritor': 'Luz', 'nome':'Audição Laser', 'grad':'', 'descricao':'Sentidos 5 (Audição Estendida, Audição Penetra na Camuflagem)'},
			{'descritor': 'Luz', 'nome':'Banir as Trevas', 'grad':0, 'descricao':'Nulificar Escuridão em Área (Explosão), Simultâneo'},
			{'descritor': 'Luz', 'nome':'Comunicação a Laser', 'grad':0, 'descricao':'Comunicação (Visual, Laser)'},
			{'descritor': 'Luz', 'nome':'Dobra de Luz', 'grad':'', 'descricao':'Camuflagem Visual 2'},
			{'descritor': 'Luz', 'nome':'Invisibilidade a Infravermelho', 'grad':0, 'descricao':'Camuflagem contra Infravisão'},
			{'descritor': 'Luz', 'nome':'Hologramas', 'grad':0, 'descricao':'Ilusão Visual'},
			{'descritor': 'Luz', 'nome':'Iluminar', 'grad':0, 'descricao':'Ambiente (Luz)'},
			{'descritor': 'Luz', 'nome':'Luz Curativa', 'grad':0, 'descricao':'Cura'},
			{'descritor': 'Luz', 'nome':'Objetos de Luz', 'grad':0, 'descricao':'Criar'},
			{'descritor': 'Luz', 'nome':'Sustento Solar', 'grad':'', 'descricao':'Imunidade 2 (sono e fome), Fonte (luz)'},
			{'descritor': 'Luz', 'nome':'Visão Aumentada', 'grad':0, 'descricao':'Sentidos: escolha qualquer Contra-ataque de Visão contra Camuflagem (Invisibilidade), Contra-ataque de Visão contra Ilusão, Visão no Escuro (todos requerem 2 níveis), Visão Estendida, Infravisão, Visão na Penumbra, Visão Microscópica, Visão Radial e Ultravisão'},
			{'descritor': 'Magia', 'nome':'Feixe Místico', 'grad':0, 'descricao':'Dano à Distância (magia)'},
			{'descritor': 'Magia', 'nome':'Passagem Mística', 'grad':0, 'descricao':'Teleporte'},
			{'descritor': 'Magia', 'nome':'Escudo Místico', 'grad':0, 'descricao':'Proteção, Sustentado'},
			{'descritor': 'Magia', 'nome':'Levitação', 'grad':0, 'descricao':'Voo'},
			{'descritor': 'Magia', 'nome':'Clarividência', 'grad':0, 'descricao':'Sensoriamento Remoto (Visual, Auditivo, Mental)'},
			{'descritor': 'Magia', 'nome':'Abjurações de Abbridon', 'grad':0, 'descricao':'Nulificar efeitos de Amarrar, Trevas e Invocação do Mal, Simultaneamente'},
			{'descritor': 'Magia', 'nome':'Aegis de Abbridon', 'grad':0, 'descricao':'Proteção Impenetrável, Sustentada'},
			{'descritor': 'Magia', 'nome':'Luz reveladora de Abbridon', 'grad':0, 'descricao':'Nulificar em Área (Explosão) Efeitos de Cobertura ou Ilusórios, Simultâneos e Curto Alcance'},
			{'descritor': 'Magia', 'nome':'Olhos de Abbridon', 'grad':0, 'descricao':'Sentidos Remotos (Visual, Auditivo, Mental)'},
			{'descritor': 'Magia', 'nome':'Iluminação de Abbridon', 'grad':0, 'descricao':'Ambiente (Luz Brilhante), Característica 1 (igual à luz do dia)'},
			{'descritor': 'Magia', 'nome':'Bússola de Ahgrazul', 'grad':0, 'descricao':'Sentidos Remotos (Visual), Simultâneo, Limitado a Pesquisas Estendidas'},
			{'descritor': 'Magia', 'nome':'Rosa-dos-ventos de Ahgrazul', 'grad':'', 'descricao':'Movimento 2 (Viajem Dimensional 2, Dimensões Místicas)'},
			{'descritor': 'Magia', 'nome':'Augúrio Auspicioso de Ahgrazul', 'grad':'', 'descricao':'Vantagem Aumentada 1 (Segunda Chance), Sentidos 4 (Precognição, Limitado à Segunda Chance)'},
			{'descritor': 'Magia', 'nome':'Amarras Perniciosas de Bal’Hemoth', 'grad':0, 'descricao':'Aflição à Distância (Resistida por Esquiva, Sobrepujada por Vontade; Impedida e Vulnerável, Indefesa e Imobilizada), Afeta Insubstancial 2, Condição Extra, Grau Limitado'},
			{'descritor': 'Magia', 'nome':'Besta de Bal’Hemoth', 'grad':'', 'descricao':'Invocar Capanga 5'},
			{'descritor': 'Magia', 'nome':'Comando de Bal’Hemoth', 'grad':0, 'descricao':'Aflição Percepção Cumulativa (Resistida e Sobrepujada por Vontade; Em Transe, Compelido, Controlado)'},
			{'descritor': 'Magia', 'nome':'Açoite Cruel de Bal’Hemoth', 'grad':0, 'descricao':'Aflição Cumulativa (Resistido e Sobrepujada por Vontade; Tonto, Atordoado, Paralisado), Alcance 2'},
			{'descritor': 'Magia', 'nome':'Dictum de Ghorummaz', 'grad':0, 'descricao':'Aflição em Área (Explosão) Progressiva (Em Transe, Compelido), Grau Limitado, Limitado a Criaturas Não-Naturais, Limitado a Manter Seguro'},
			{'descritor': 'Magia', 'nome':'Garra de Ghorummaz', 'grad':0, 'descricao':'Aflição à Distância (Resistido por Esquiva, Sobrepujado por Dano; Impedido e Vulnerável, Sem Defesa e Imobilizado), Condição Extra, Grau Limitado, Afeta o Incorpóreo 2, Indireto 1'},
			{'descritor': 'Magia', 'nome':'Vendaval de Ghorummaz', 'grad':0, 'descricao':'Ambiente (Dificultar o Movimento 2, Visibilidade –5)'},
			{'descritor': 'Magia', 'nome':'Tempestade de Ghorummaz', 'grad':0, 'descricao':'Dano à Distância (Raio), Indireto 2'},
			{'descritor': 'Magia', 'nome':'Trilha Trovejante', 'grad':0, 'descricao':'Aflição em Área (Explosão) (Resistido e Sobrepujado por Fortitude; Vulnerável, Sem Defesa), Recuperação Instantânea, Grau Limitado, Limitado: conjurador e alvo que tocam o chão'},
			{'descritor': 'Magia', 'nome':'Mão de Heshem', 'grad':0, 'descricao':'Mover Objeto'},
			{'descritor': 'Magia', 'nome':'Lanterna Sagrada', 'grad':0, 'descricao':'Aflição em Área (Explosão) Progressiva (Resistida e Sobrepujada por Vontade; Em Transe, Compelida, Controlada), Limitado às Criaturas do Mal, Limitado a Manter Seguro'},
			{'descritor': 'Magia', 'nome':'Caminho de Heshem', 'grad':'', 'descricao':'Movimento 2 (Dimensional 2), Portal'},
			{'descritor': 'Magia', 'nome':'Hostes Sagradas', 'grad':0, 'descricao':'Nulificar Magia, Amplo'},
			{'descritor': 'Magia', 'nome':'Capuz de Heshem', 'grad':0, 'descricao':'Camuflagem em Área (Nuvem) Ataque 4 (Todo Visual)'},
			{'descritor': 'Magia', 'nome':'Gancho de Heshem', 'grad':0, 'descricao':'Dano Penetrante'},
			{'descritor': 'Magia', 'nome':'Estrada Chorosa', 'grad':'', 'descricao':'Movimento 1 (Dimensional 1, Dimensão dos Sonhos), Portal '},
			{'descritor': 'Magia', 'nome':'Maldição da Loucura Uivante', 'grad':0, 'descricao':'Aflição Percepção (Resistida e Sobrepujada por Vontade; Em Transe, Compelida, Controlada), Progressiva, Limitada a causar comportamento errático ou insano'},
			{'descritor': 'Magia', 'nome':'Demência Onírica', 'grad':0, 'descricao':'Aflição Percepção (Resistida e Sobrepujada por Vontade; Em Transe, Compelida, Controlada), Cumulativa, Traiçoeira, Descritor Variável (Emoções)'},
			{'descritor': 'Magia', 'nome':'Sonho Vívido', 'grad':0, 'descricao':'Invocar Habitantes dos Sonhos, Ativo, Amplo, Ligação Mental'},
			{'descritor': 'Magia', 'nome':'Manto de Idolon', 'grad':0, 'descricao':'Camuflagem 2 (Mágica), Sustentado'},
			{'descritor': 'Magia', 'nome':'Ilusões de Idolon', 'grad':0, 'descricao':'Ilusão (Todos os Sentidos), Resistível por Vontade, Seletiva'},
			{'descritor': 'Magia', 'nome':'Véu de Idolon', 'grad':'', 'descricao':'Área de Explosão Camuflagem 3 (Sentidos Mentais e Sensoriamento Remoto), Afeta Outros'},
			{'descritor': 'Magia', 'nome':'Oito Olhos de Ios', 'grad':'', 'descricao':'Sentidos 13 (Raio de Visão, Visão Contra-ataca Ilusão, Visão Contra-ataca e Penetra Toda a Camuflagem)'},
			{'descritor': 'Magia', 'nome':'Encantamento de Ios', 'grad':'', 'descricao':'Vantagem Aumentada 1 (Fascinar)'},
			{'descritor': 'Magia', 'nome':'Olho Vigilante de Ios', 'grad':'', 'descricao':'Vantagem Aumentada 1 (Esquiva Fabulosa), Sentidos 3 (Senso do Perigo, Visão Radial)'},
			{'descritor': 'Magia', 'nome':'Chamado de Kar’Kradas', 'grad':0, 'descricao':'Invocar Demônio, Ativo, Amplo, Controlado'},
			{'descritor': 'Magia', 'nome':'Correntes de Kar’Kradas', 'grad':0, 'descricao':'Aflição à Distância (Resistida por Esquiva, Sobrepujada por Dano; Impedida e Vulnerável, Sem Defesa e Imóvel), Afeta Insubstancial 2, Cumulativa, Condição Extra, Grau Limitado'},
			{'descritor': 'Magia', 'nome':'Caminho Tortuoso de Kar’Kradas', 'grad':0, 'descricao':'Teleporte, Precisão, Médio (Sombras)'},
			{'descritor': 'Magia', 'nome':'Cães de Kar’Kradas', 'grad':'', 'descricao':'Invocar Cão das Trevas 5 (Capanga de 75 pontos), Controlado, Heroico, Ligação Mental'},
			{'descritor': 'Magia', 'nome':'Kraken Umbral de Kar’Kradas', 'grad':0, 'descricao':'Invoca o Kraken Umbral (Capanga de 75 pontos), Ativo, Controlado, Heroico'},
			{'descritor': 'Magia', 'nome':'Labirinto de Lamal', 'grad':0, 'descricao':'Percepção com Alcance Aflição (Resistida e Sobrepujada por Vontade; Em Transe e Vulnerável, Sem Defesa e Imóvel, Incapacitado), Condição Extra'},
			{'descritor': 'Magia', 'nome':'Mãos Poderosas de Lamal', 'grad':0, 'descricao':'Mover Objeto, Preciso, Sutil'},
			{'descritor': 'Magia', 'nome':'Censura de Lamal', 'grad':0, 'descricao':'Aflição em Área (Explosão) (Resistido e Sobrepujado por Vontade; Tonto e Impedido, Desabilitado e Atordoado, Incapacitado), Condição Extra, Limitado a Criaturas Extraplanares do Caos'},
			{'descritor': 'Magia', 'nome':'Luz de Lamal', 'grad':0, 'descricao':'Aflição à Distância (Resistida e Sobrepujada por Vontade; Controlada), Progressiva, Grau Limitado, Limitada a Falar a Verdade'},
			{'descritor': 'Magia', 'nome':'Capanga de Malador', 'grad':0, 'descricao':'Invocar Mortos-Vivos, Controlado, Horda, Vários Capangas (32 mortos-vivos)'},
			{'descritor': 'Magia', 'nome':'Miasma de Malador', 'grad':0, 'descricao':'Dano (ácido) à Distância em Área (Nuvem) Ligado a Aflição à Distância em Área (Nuvem) Cumulativa (Resistida e Sobrepujada por Fortitude; Prejudicada, Desativada, Desatenta), Limitado à Visão'},
			{'descritor': 'Magia', 'nome':'Poder de Malador', 'grad':0, 'descricao':'Dano à Distância (Necromântico)'},
			{'descritor': 'Magia', 'nome':'Névoas de Malador', 'grad':0, 'descricao':'Camuflagem à Distância em Área (Explosão) Ataque 4 (Visual)'},
			{'descritor': 'Magia', 'nome':'Magia de Modrossus', 'grad':0, 'descricao':'Aflição à Distância Cumulativa (Luz Ofuscante; Resistido e Sobrepujado por Fortitude; Prejudicado, Desabilitado, Desatento), Limitada à Visão • 2 pontos por graduação Criar Constructos de Luz • 2 pontos por graduação Dano à Distância (magia, luz branca-azulada intensa) • 2 pontos por graduação Nulificar Magia, Amplo • 2 pontos por graduação'},
			{'descritor': 'Magia', 'nome':'Névoas de Modrossus', 'grad':0, 'descricao':'Aflição em Área (Explosão) (Resistido e Sobrepujada por Vontade; Em Transe, Compelido, Transformado), Progressivo, Seletivo, Limitado a Supressão de Memórias Recentes'},
			{'descritor': 'Magia', 'nome':'Selo de Modrossus', 'grad':0, 'descricao':'Aflição em Área (Explosão) (Resistido e Sobrepujado por Vontade; Atordoado e Impedido, Atordoado e Imóvel, Incapacitado), Condição Extra, Limitado a Criaturas Mágicas'},
			{'descritor': 'Magia', 'nome':'Orbe Obscuro de Obroros', 'grad':0, 'descricao':'Camuflagem à Distância em Área (Explosão) Ataque 6 (Visual e Mental), Seletivo'},
			{'descritor': 'Magia', 'nome':'Exorcismo Oculto', 'grad':0, 'descricao':'Nulificar Efeitos Influenciadores da Mente, Simultâneo'},
			{'descritor': 'Magia', 'nome':'Presságios de Obroros', 'grad':0, 'descricao':'Sentidos Remotos (Visão), Dimensional 3, Sem Condutibilidade, Sutil'},
			{'descritor': 'Magia', 'nome':'Chamas dos Phoros', 'grad':0, 'descricao':'Dano à Distância (fogo mágico) • 2 pontos por graduação Dano à Distância em Área (Explosão) (fogo mágico) • 3 ponto por graduação Nulificar Magia, Amplo, Simultâneo (chamas “queimam” toda a magia do alvo) • 3 pontos por graduação Proteção, Sustentada (uma aura de chamas azuis, verdes ou violetas) • 1 ponto por graduação Dano, Reação (ao ser tocado, fogo mágico) • 4 pontos por graduação Dano à Distância em Área Moldável, Percepção, Limitado ao Fogo Existente • 3 pontos por graduação'},
			{'descritor': 'Magia', 'nome':'Fantasmas dos Phoros', 'grad':0, 'descricao':'Ilusão (Visual)'},
			{'descritor': 'Magia', 'nome':'Flagelo de Shatachna', 'grad':0, 'descricao':'Aflição Cumulativa (Resistido e Sobrepujado pela Vontade; Tonto e Prejudicado, Indefeso e Atordoado, Incapacitado), Condição Extra, Alcance 4'},
			{'descritor': 'Magia', 'nome':'Foice de Shatachna', 'grad':0, 'descricao':'Dano Penetrante, Alcance 1'},
			{'descritor': 'Magia', 'nome':'Servos de Shatachna', 'grad':0, 'descricao':'Invocar Demônio, Tipo Amplo'},
			{'descritor': 'Magia', 'nome':'Sombras de Shatachna', 'grad':0, 'descricao':'Aflição à Distância em Área (Explosão) Progressiva (Resistida e Sobrepujada por Vontade; Tonta e Prejudicada, Indefesa e Desabilitada, Paralisada e Inconsciente), Condição Extra'},
			{'descritor': 'Magia', 'nome':'Selo de Silêncio', 'grad':0, 'descricao':'Aflição à Distância, Percepção (Resistida e Sobrepujada por Vontade; Controlada), Progressiva, Grau Limitado, Limitada à Comunicação, Limitada a Informações Específicas'},
			{'descritor': 'Magia', 'nome':'Sombras Escarlate de Sirrion', 'grad':0, 'descricao':'Camuflagem à Distância em Área (Nuvem) Ataque (Visual) 4'},
			{'descritor': 'Magia', 'nome':'Grilhões Brilhantes de Sirrion', 'grad':0, 'descricao':'Aflição à Distância (Resistido por Esquiva, Sobrepujado por Vontade; Impedido e Prejudicado, Desabilitado e Imóvel), Condição Extra, Grau Limitado'},
			{'descritor': 'Magia', 'nome':'Escudo Brilhante de Sirrion', 'grad':0, 'descricao':'Proteção Sustentada'},
			{'descritor': 'Magia', 'nome':'Sóis Brilhantes de Sirrion', 'grad':0, 'descricao':'Aflição à Distância Cumulativa (Resistido e Sobrepujado por Fortitude; Prejudicado, Desabilitado, Desatento), Limitada à Visão • 2 points per rank Dano à Distância (luz ardente) • 2 pontos por graduação Nulificar Magia, Amplo • 2 pontos por graduação'},
			{'descritor': 'Magia', 'nome':'Feitiço Sonâmbulo', 'grad':0, 'descricao':'Aflição em Área (Nuvem) Cumulativa (Resistido e Sobrepujado por Vontade; Tonto, Atordoado, Adormecido)'},
			{'descritor': 'Magia', 'nome':'Demônios Estelares de Sirrion', 'grad':'', 'descricao':'Invocar Demônio Estelar 6 (capanga de 90 pontos), Controlado'},
			{'descritor': 'Magia', 'nome':'Canto do Caos', 'grad':0, 'descricao':'Aflição em Área Cumulativa Auditiva (Resistida e Sobrepujada por Vontade; Em Transe, Compelido, Transformado)'},
			{'descritor': 'Magia', 'nome':'Invocação Inominável', 'grad':'', 'descricao':'Invocar Servo Inominável 7, Heroico'},
			{'descritor': 'Magia', 'nome':'O Sinal Amarelo', 'grad':0, 'descricao':'Aflição em Área Progressiva (Resistido e Sobrepujado por Vontade; Em Transe, Compelido, Transformado)'},
			{'descritor': 'Magia', 'nome':'Dança de Vhoka', 'grad':0, 'descricao':'Invocar Arma Animada, Ativo, Controlado, Tipo Geral, Alcance'},
			{'descritor': 'Magia', 'nome':'Bocarra de Vhoka', 'grad':0, 'descricao':'Dano à Distância (mordida), Teleguiado 3'},
			{'descritor': 'Magia', 'nome':'Veneno Vil', 'grad':0, 'descricao':'Enfraquecer Força, Progressivo, Descritor Variável (Enfraquece o Vigor após a Força atingir 0)'},
			{'descritor': 'Magia', 'nome':'Guarda de Weyan', 'grad':0, 'descricao':'Aflição em Área (Explosão) Progressiva (Resistido e Sobrepujado por Vontade; Em Transe, Compelido, Controlado), Limitado a Criaturas do Caos, Limitado a Forçar Alvos para Longe da Área'},
			{'descritor': 'Magia', 'nome':'Primeira Roda de Weyan', 'grad':0, 'descricao':'Invocar Objeto Animado, Percepção, Limitado a Objetos Disponíveis • 3 pontos por graduação Transformar à Distância (Objetos quebrados em objetos reparados) • 3 pontos por graduação'},
			{'descritor': 'Magia', 'nome':'Segunda Roda de Weyan', 'grad':0, 'descricao':'Sentidos Remotos (Visual)'},
			{'descritor': 'Magia', 'nome':'Terceira Roda de Weyan', 'grad':0, 'descricao':'Desviar, Refletir'}
			
			);

/*------------------------------------------ conceito */
	/*listaConceitos.push(
		'',
		'',
		''
	);
	*/
/*--------------------------------------- descritores */
	listaDescritores.push(
		'água',
		'animais',
		'ar',
		'armadura',
		'cinético',
		'clima',
		'cósmico',
		'dimensional',
		'elementos',
		'eletricidade',
		'fogo',
		'força',
		'frio',
		'gravidade',
		'ilusão',
		'invocação',
		'luz',
		'magia',
		'magnético',
		'marcial',
		'mental',
		'metapoderes',
		'metamorfose',
		'morte',
		'planta',
		'radiação',
		'sensorial',
		'sonho',
		'sônico',
		'sorte',
		'talento',
		'tamanho',
		'tecnologia',
		'teleporte',
		'tempo',
		'terra',
		'trevas',
		'velocidade',
		'vida',
	);

/*-------------------------------------- perícias */
	 listaPericias.push(
		{'nome':'Acrobacia', 'grad':0},
		{'nome':'Atletismo', 'grad':0},
		{'nome':'Enganação', 'grad':0},
		{'nome':'Furtividade', 'grad':0},
		{'nome':'Intimidação', 'grad':0},
		{'nome':'Intuição', 'grad':0},
		{'nome':'Investigação', 'grad':0},
		{'nome':'Percepção', 'grad':0},
		{'nome':'Persuasão', 'grad':0},
		{'nome':'Prestidigitação', 'grad':0},
		{'nome':'Tecnologia', 'grad':0},
		{'nome':'Tratamento', 'grad':0},
		{'nome':'Veiculos', 'grad':0}
	);

 /*-------------------------------------------------vantagens */
 	listaVantagens.push(
 		{'nome':'Ação em Movimento', 'descricao':'Mova-se tanto antes quanto depois de sua ação padrão'},
 		{'nome':'Agarrar Aprimorado', 'descricao':'Faça ataques de agarrar com apenas uma mão'},
 		{'nome':'Agarrar Preciso', 'descricao':'Substitui Des por For em ataques para agarrar'},
 		{'nome':'Agarrar Rápido', 'descricao':'Quando acerta um ataque desarmado, pode fazer um teste de agarrar como ação livre'},
 		{'nome':'Ambiente Favorito', 'descricao':'Bônus de circunstância no ataque ou na defesa em determinado ambiente'},
 		{'nome':'Arma Improvisada', 'descricao':'Use a perícia Combate Desarmado com armas improvisadas, com bônus de dano de +1'},
 		{'nome':'Armação', 'descricao':'Transfira o benefício de uma perícia de interação para um aliado'},
 		{'nome':'Ataque à Distância', 'descricao':'Bônus de +1 em testes de ataque à distância por graduação'},
 		{'nome':'Ataque Acurado', 'descricao':'Troque a CD do efeito por um bônus de ataque'},
 		{'nome':'Ataque Corpo-a-Corpo', 'descricao':'Bônus de +1 em testes de ataque corpo-a-corpo por graduação'},
 		{'nome':'Ataque Defensivo', 'descricao':'Troque um bônus de ataque por um bônus de defesa ativa'},
 		{'nome':'Ataque Dominó', 'descricao':'Ganhe um ataque extra quando incapacitar um capanga'},
 		{'nome':'Ataque Imprudente', 'descricao':'Troque defesa ativa por um bônus de ataque'},
 		{'nome':'Ataque Poderoso', 'descricao':'Troque bônus de ataque por bônus de efeito'},
 		{'nome':'Ataque Preciso', 'descricao':'Ignore penalidades em testes de ataque devido a cobertura ou camuflagem'},
 		{'nome':'Crítico Aprimorado', 'descricao':'+1 na ameaça de crítico com um ataque específico por graduação'},
 		{'nome':'Defesa Aprimorada', 'descricao':'Bônus de +2 em uma defesa ativa quando você usa a ação defender-se'},
 		{'nome':'Derrubar Aprimorado', 'descricao':'Sem penalidade para usar a ação derrubar'},
 		{'nome':'Desarmar Aprimorado', 'descricao':'Sem penalidade para usar a ação desarmar'},
 		{'nome':'Esquiva Fabulosa', 'descricao':'Você não fica vulnerável quando surpreso ou desatento'},
 		{'nome':'Estrangular', 'descricao':'Sufoca um oponente que você tenha agarrado'},
 		{'nome':'Evasão', 'descricao':'Bônus de circunstância para evitar ataques de área'},
 		{'nome':'Imobilizar Aprimorado', 'descricao':'Penalidade de circunstância de –5 para escapar de você'},
 		{'nome':'Iniciativa Aprimorada', 'descricao':'Bônus de +4 por graduação em testes de iniciativa'},
 		{'nome':'Luta no Chão', 'descricao':'Sem penalidade por lutar caído'},
 		{'nome':'Maestria em Arremesso', 'descricao':'Bônus de dano de +1 com armas arremessadas por graduação'},
 		{'nome':'Mira Aprimorada', 'descricao':'Dobra os bônus de circunstância por mirar'},
 		{'nome':'Prender Arma', 'descricao':'Tentativa livre de desarme quando você se defende'},
 		{'nome':'Quebrar Aprimorado', 'descricao':'Sem penalidade para usar a ação quebrar'},
 		{'nome':'Quebrar Arma', 'descricao':'Tentativa livre de quebrar quando você se defende'},
 		{'nome':'Redirecionar', 'descricao':'Use Enganação para redirecionar um ataque que falhe para outro alvo'},
 		{'nome':'Rolamento Defensivo', 'descricao':'Bônus de defesa ativa de +1 em Resistência por graduação'},
 		{'nome':'Saque Rápido', 'descricao':'Saque uma arma como uma ação livre'},
 		{'nome':'Artífice', 'descricao':'Use Especialidade: Magia para criar dispositivos mágicos temporários'},
 		{'nome':'Assustar', 'descricao':'Use Intimidação para fintar em combate'},
 		{'nome':'Atraente', 'descricao':'Bônus de circunstância em perícias de interação baseado em sua aparência'},
 		{'nome':'Bem Informado', 'descricao':'Teste imediato de Investigação ou Percepção para saber alguma coisa'},
 		{'nome':'Bem Relacionado', 'descricao':'Chame ajuda ou consiga favores com um teste de Persuasão'},
 		{'nome':'Contatos', 'descricao':'Faça um teste inicial de Investigação em um minuto'},
 		{'nome':'Empatia com Animais', 'descricao':'Use perícias de interação com animais'},
 		{'nome':'Esconder-se à Plena Vista', 'descricao':'Esconda-se quando observado sem precisar de uma distração'},
 		{'nome':'Fascinar', 'descricao':'Use uma perícia de interação para prender a atenção dos outros'},
 		{'nome':'Faz Tudo', 'descricao':'Use qualquer perícia sem treinamento'},
 		{'nome':'Ferramentas Aprimoradas', 'descricao':'Sem penalidade por usar perícias sem as ferramentas apropriadas'},
 		{'nome':'Finta Ágil ', 'descricao':'Finte usando a perícia Acrobacia ou sua velocidade'},
 		{'nome':'Idiomas', 'descricao':'Fale e compreenda idiomas adicionais'},
 		{'nome':'Inimigo Favorito', 'descricao':'Bônus de circunstância em testes contra um tipo de oponente'},
 		{'nome':'Inventor', 'descricao':'Use Tecnologia para criar dispositivos temporários'},
 		{'nome':'Maestria em Perícia', 'descricao':'Realize testes de rotina com uma perícia sob quaisquer circunstâncias'},
 		{'nome':'Rastrear', 'descricao':'Use Percepção para seguir rastros'},
 		{'nome':'Ritualista', 'descricao':'Use Especialidade: Magia para criar e realizar rituais'},
 		{'nome':'Tontear', 'descricao':'Use Enganação ou Intimidação para deixar um oponente tonto'},
 		{'nome':'Zombar', 'descricao':'Use Enganação para desmoralizar em combate'},
 		{'nome':'Esforço Supremo', 'descricao':'Gaste um ponto heróico para ganhar um 20 efetivo em um teste específico'},
 		{'nome':'Inspirar', 'descricao':'Gaste um ponto heróico para conceder a seus aliados um bônus de circunstância de +1 por graduação'},
 		{'nome':'Liderança', 'descricao':'Gaste um ponto heróico para remover uma condição de um aliado'},
 		{'nome':'Sorte de Principiante', 'descricao':'Gaste um ponto heróico para ganhar 5 graduações temporárias em uma perícia'},
 		{'nome':'Sorte', 'descricao':'Rerole uma rolagem uma vez por graduação'},
 		{'nome':'Tomar a Iniciativa', 'descricao':'Gaste um ponto heróico para agir primeiro na ordem de iniciativa'},
 		{'nome':'Avaliação', 'descricao':'Use Intuição para descobrir as habilidades de combate do oponente'},
 		{'nome':'Benefício', 'descricao':'Ganhe uma gratificação ou benefício adicional'},
 		{'nome':'Capanga', 'descricao':'Ganhe um seguidor ou capanga com (15 x graduação) pontos de poder'},
 		{'nome':'De Pé', 'descricao':'Passe de caído para em pé como uma ação livre'},
 		{'nome':'Destemido', 'descricao':'Imune a efeitos de medo'},
 		{'nome':'Duro de Matar', 'descricao':'Estabilize automaticamente quando moribundo'},
 		{'nome':'Equipamento', 'descricao':'5 pontos de equipamento por graduação'},
 		{'nome':'Esforço Extraordinário', 'descricao':'Ganhe dois benefícios quando usando esforço extra'},
 		{'nome':'Interpor-se', 'descricao':'Sofra um ataque mirado contra um aliado'},
 		{'nome':'Memória Eidética', 'descricao':'Você se lembra de tudo, bônus de circunstância de +5 para se lembrar das coisas'},
 		{'nome':'Parceiro', 'descricao':'Ganhe um parceiro com (5 x graduação) pontos de poder'},
 		{'nome':'Segunda Chance', 'descricao':'Rerole um teste falho contra uma ameaça uma vez'},
 		{'nome':'Tolerância Maior', 'descricao':'+5 em testes envolvendo tolerância'},
 		{'nome':'Trabalho em Equipe', 'descricao':'+5 de bônus para ajudar em testes de equipe'},
 		{'nome':'Transe', 'descricao':'Entre em um transe parecido com a morte que diminui as funções vitais'},
	);
	

	 
	 /* heroi.conceito=listaConceitos[randomAte(listaConceitos.length)]; */
	 /*heroi.descritores.push(listaDescritores[randomAte(listaDescritores.length)]);
	 /*heroi.descritores.push(listaDescritores[randomAte(listaDescritores.length)]);
	 /*heroi.idade=randomEntre(14,60);
	 heroi.altura=(randomEntre(165,190))/100;*/
	 /* define os valores de ataque cac e ataquedist */
	 if (randomEntre(0,1)){
	 	heroi.ataquecac=heroi.np;
	 	heroi.ataquedist=(heroi.np/2).toFixed();
	 	heroi.pericias.push(
	 		{'nome':'Combate corpo-a-corpo', 'grad':heroi.ataquecac},
	 		{'nome':'Combate à Distancia', 'grad':heroi.ataquedist}
	 		);
	 } else {
	 	heroi.ataquecac=(heroi.np/2).toFixed();
	 	heroi.ataquedist=heroi.np;
	 	heroi.pericias.push(
	 		{'nome':'Combate corpo-a-corpo', 'grad':heroi.ataquecac},
	 		{'nome':'Combate à Distancia', 'grad':heroi.ataquedist}
	 		);
	 }

/* se o item randômico já tem no array, ele gera outro item randômico, até achar um que não tenha. */
function colocarAleatNoArray(listaOrigem,listaDestino) {

	do{
		var item = listaOrigem[randomAte(listaOrigem.length)];
		console.log('Entrou no laço.')

		if (listaDestino.indexOf(item) > -1) {
		}else{
			listaDestino.push(item);
			 //senão dá looping infinito
			 break;
		}
	 }while (listaDestino.indexOf(item) > -1);
	}



 /*  Atribuindo os poderes --------------------------*/
	numPoderes = (heroi.np/3.5).toFixed();/* arredonda pra cima*/
	for (let i = 0; i < numPoderes; i++) { 	
		 colocarAleatNoArray(listaPoderes,heroi.poderes);
		 //para só atribuir grad para poderes que ~ja nao tem grad na descrição
		 heroi.poderes[i].grad===0? heroi.poderes[i].grad=randomEntre(heroi.np/3,heroi.np):heroi.poderes[i].grad='';
	 }

/*  Atribuindo as perícias --------------------------*/
	numPericias = (heroi.np/2).toFixed();/* arredonda pra cima*/
	for (let i = 0; i < numPericias; i++) { 
		 colocarAleatNoArray(listaPericias,heroi.pericias);	
		 heroi.pericias[i+2].grad=randomEntre(1,10) /* o i+2 é porque as duas primeiras posições do heroi.pericias já estão preenchidas com as pericias de combate. */
	 }

/*  Atribuindo as vantagens  --------------------------*/
	numVantagens = (heroi.np/2).toFixed();/* arredonda pra cima*/
		for (let i = 0; i < numVantagens; i++) { 
		colocarAleatNoArray(listaVantagens,heroi.vantagens);
	 }

	 definirGraduacoes();

	 document.getElementById('ficha').style.display="block";
	 preencherFicha();/* Imprime os dados em seus respectivos campos */
	 trocarBotoes(); 



	window.scroll(0,$( "#ficha" ).offset().top); /* scroll até a ficha*/

} /* fim gerar heroi */