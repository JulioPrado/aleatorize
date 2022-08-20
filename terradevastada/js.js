
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

function removeFicha(id){
	$(id).fadeOut();
	//$(id).css('display','none');
}

/*-------------------------------------- gerar ficha--*/
function gerarPersonagem(tipo,pos){

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
	
	var personagem={
	'nome': '',
	'pos': pos,
	'idade':undefined,
	'obstrucoes': 0,
	'caracteristicas':[],
	'condicoes':[],
	'tormentos':[]
	}

	switch(tipo){
		case 'humano':

			//define Nome
			function defineNome(){
				
				var nome= listaNome[randomAte(listaNome.length)];
				var sobrenome= listaSobrenome[randomAte(listaSobrenome.length)];

				personagem.nome=nome+' '+sobrenome;
			}
			defineNome();

			//define Idade
			 personagem.idade=randomEntre(10,50);

			 //define obstrucoes
			 personagem.obstrucoes=randomEntre(0,6);

			 //define características
			 if (personagem.idade>17) {
			 	personagem.caracteristicas.push(caracProfiss[randomAte(caracProfiss.length)]);
			 }

/* atribuições das características totalmente aleatórias ----------*/
			 for (var i=0; i<12;i++){

			 	colocarAleatNoArray(caracTodas,personagem.caracteristicas); 	
			 	
			 }


/* ---------abaixo atribuição das características por nicho -----------------
			 //Atribuindo Características Físicas
			 for (var i=0; i<4;i++){

			 	colocarAleatNoArray(caracFisico,personagem.caracteristicas); 
			 }
		 	
		 	 //Atribuindo Características Mentais
			 for (var i=0; i<4;i++){

			 	colocarAleatNoArray(caracMental,personagem.caracteristicas); 
			 }
			 

			 //Atribuindo Características Motivação
			 for (var i=0; i<4;i++){

			 	colocarAleatNoArray(caracMotiva,personagem.caracteristicas); 
			 }

			 //Atribuindo Características de Defeito
			 for (var i=0; i<4;i++){

			 	colocarAleatNoArray(caracDefeito,personagem.caracteristicas); 
			 }
*/
			 //define condições
			 var qntCondicoes = randomEntre(3,6)

			 for (var i=0; i<qntCondicoes;i++){
			 	colocarAleatNoArray(todasCond,personagem.condicoes);
			 }

			 //define tormentos
			 var qntTormentos = personagem.obstrucoes/2;
			 qntTormentos = qntTormentos.toFixed(0);
			 if (qntTormentos==0) qntTormentos++; /*mínimo 1 tormento*/
			 for (var i=0; i<qntTormentos; i++){
			 	colocarAleatNoArray(listaTormentos,personagem.tormentos)
			 }

			 function preencheHumano(){

				var caracteristicas='';
				var condicoes = '';
				var tormentos = '';
				var conviccao = '';

				if (personagem.obstrucoes>4&&personagem.obstrucoes<9) {
					personagem.condicoes.push("Atormentado");
				} else if (personagem.obstrucoes>8) {
					personagem.condicoes.push("Extremamente atormentado");
				}

				switch (personagem.obstrucoes){
					case 1:
						conviccao='⬡⬡⬡⬡|⬡⬡⬡⬡|⬡⬡⬡⬢'
						break;
					case 2:
						conviccao='⬡⬡⬡⬡|⬡⬡⬡⬡|⬡⬡⬢⬢'
						break;
					case 3:
						conviccao='⬡⬡⬡⬡|⬡⬡⬡⬡|⬡⬢⬢⬢'
						break;
					case 4:
						conviccao='⬡⬡⬡⬡|⬡⬡⬡⬡|⬢⬢⬢⬢'
						break;
					case 5:
						conviccao='⬡⬡⬡⬡|⬡⬡⬡⬢|⬢⬢⬢⬢'
						break;
					case 6:
						conviccao='⬡⬡⬡⬡|⬡⬡⬢⬢|⬢⬢⬢⬢'
						break;
					default:
						conviccao='⬡⬡⬡⬡|⬡⬡⬡⬡|⬡⬡⬡⬡'
				 }

				 /* transforma o array em string e adiciona vírgulas e ponto final */
				for (var i=0;i<personagem.caracteristicas.length;i++){
					caracteristicas+=personagem.caracteristicas[i];
					if (i==personagem.caracteristicas.length-1) {
						caracteristicas+='.';
					}else{
						caracteristicas+=', ';
					}
				 }
				for (var i=0;i<personagem.condicoes.length;i++){
					condicoes+=personagem.condicoes[i];
					if (i==personagem.condicoes.length-1) {
						condicoes+='.';
					}else{
						condicoes+=', ';
					}	 	
				 }
				for (var i=0;i<personagem.tormentos.length;i++){
					tormentos+=personagem.tormentos[i];
					if (i==personagem.tormentos.length-1) {
						tormentos+='.';
					}else{
						tormentos+=', ';
					}
				 }

			/* imprime os personagens na div */
				

			  $ ('#humano').append(
			    "<div id='humano"+personagem.pos+"' class='fichaFinal'>"
			+"                      <span class='right remover' onclick='removeFicha(humano"+personagem.pos+")'>Remover</span>"
			+"						<p>"
			+"							<span class='nomeFicha'>"
			+							personagem.nome+", "+personagem.idade+" anos."
			+"							</span>"
			+"							<br>"
			+"							<p><span class='negrito'>Características:"
			+"							</span>"
			+							caracteristicas
			+"							</p>"
			+"							<p><span class='negrito'>Condições:"
			+"							</span>"
			+                            condicoes
			+"							</p>"
			+"							<p><span class='negrito'>Tormentos: </span>"
			+                            tormentos
			+"							</p>"
			+"							<p class='centro'>"
			+"							<span class='negrito'>Convicção:</span>"
			+"							<br>"
			+	 						conviccao
			+"							</p>"
			+"						</div>"
			    );
			}

			 preencheHumano();

		break;

		case 'infectado':

			 personagem.tormentos=randomEntre(0,3);

			 //define características
			 if (personagem.tormentos==0){
			 	personagem.tormentos='Conservado';
			 } else if (personagem.tormentos==1) {
			 	personagem.tormentos='Decomposição moderada';
			 } else if (personagem.tormentos==2) {
			 	personagem.tormentos='Decomposição avançada';
			 } else{
			 	personagem.tormentos='Pútrido';
			 }


			/* atribuições das características totalmente aleatórias ----------*/
			 var qntsCarac = randomEntre(2,5);
			 for (var i=0; i<qntsCarac;i++){

			 	colocarAleatNoArray(listaInfectado,personagem.caracteristicas); 	
			 	
			 }

			function preencheInfectado(){

				var caracteristicas='';
				var genero = randomEntre(0,1);
				 /* transforma o array em string e adiciona vírgulas e ponto final */
				for (var i=0;i<personagem.caracteristicas.length;i++){
					caracteristicas+=personagem.caracteristicas[i];
					if (i==personagem.caracteristicas.length-1) {
						caracteristicas+='.';
					}else{
						caracteristicas+=', ';
					}
				 }

				 if (genero==1) {
				 	genero='Homem';
				 } else {
				 	genero='Mulher';
				 }

				/* imprime os personagens na div */

				  $ ('#infectado').append(
				    "<div id='infectado"+personagem.pos+"' class='fichaFinal'>"
				+"                      <span class='right remover' onclick='removeFicha(infectado"+personagem.pos+")'>Remover</span>"
				+"						<p>"
				+"						<span class='negrito'>Gênero: </span>"
				+                            genero
				+"						</p>"
				+"							<p><span class='negrito'>Estado de conservação: </span>"
				+                            personagem.tormentos
				+"							</p>"
				+"							<p><span class='negrito'>Características: </span>"
				+							caracteristicas
				+"							</p>"
				+"	</div>"
				    );


				/* verifica se tem anomalia */
				let anoma = randomEntre(1,100);

				if (anoma>85) {

					let item = listaAnomalia[randomAte(listaAnomalia.length)];

					$ ('#infectado'+personagem.pos).append(
						"<p><strong>Anomalia: </strong>"
						+item+"</p>");
				}
			}

			 preencheInfectado();

		break;

		default: alert('Tipo de personagem inválido!');
	 }	 
 }


/* Botões ------------------------------------------------ */

function limpaDiv(id){
	document.getElementById(id).innerHTML = '';
}

function pedirPersonagem(tipo){
	limpaDiv(tipo);
 	var d = document.getElementById('qnt'+tipo).value;
 	var pos= 0;
	for (var i=0; i<d; i++){
		gerarPersonagem(tipo,pos);
		pos++;
	}

	//mostra o botão imprimir
	$('.imprimir').removeClass('d-none');

	/* scroll até as fichas*/
	window.scroll(0,$( "#"+tipo ).offset().top); 
	
}

/* Características --------------------------------------*/
var caracFisico=[];
var caracMental=[];
var caracMotiva=[];
var caracDefeito=[];
var caracTodas=[];
var caracProfiss=[]; 

caracFisico.push(
	'corpo atlético',
	'resistência invejável',
	'forte como um touro',
	'estatura muito acima da média',
	'passos suaves',
	'ágil',
	'passos rápidos',
	'equilíbrio perfeito',
	'corpo leve',
	'corpo pesado',
	'vários anos de natação',
	'rosto bonito',
	'corpo dentro dos padrões de beleza',
	'muito fôlego',
	'alta tolerância ao frio',
	'alta tolerância ao calor',
	'escalava com frequência',
	'adora trilhas',
	'maratonista',
	'sente pouca fome',
	'visão aguçada',
	'imunidade alta',
	'audição aguçada',
	'sabe artes marciais',
	'praticante de boxe',
	'praticante de Muay thai',
	'conhece Jiu-jitsu',
	'bastante flexibilidade',
	'proficiência com armas brancas',
	'aparência angelical',
	'mestre das facas',
	'boa mira',
	'sabe atirar',
	'sabe brigar'
);

caracMental.push(
	'ótimo senso de direção',
	'técnicas de persuasão',
	'tem bastante atenção',
	'agradável',
	'valoriza suas amizades',
	'amor é importante',
	'tem autenticidade',
	'alegre',
	'gosta de acolher',
	'atraente',
	'gosta de aventuras',
	'sempre se organiza',
	'planejamento é essencial',
	'se dedica ao máximo',
	'altruísta',
	'ágil',
	'tem fama por sua astúcia',
	'sempre toma cautela',
	'autossuficiente',
	'pessoa ativa',
	'tem juízo',
	'chatx com higiene',
	'mania de limpeza',
	'apaixonadx por alguém',
	'tem zelo com o que importa',
	'jovial',
	'ultra-honestx',
	'ultracorretx',
	'sabe tranquilizar',
	'temperamento forte',
	'gosta de trabalhar',
	'paciente',
	'evita problemas',
	'não confia em ninguém',
	'exala liderança',
	'enciclopédia humana',
	'sobrevivência é o que importa',
	'sabe fazer armadilhas',
	'militante de esquerda',
	'militante de direita',
	'todos devem ser salvos',
	'todos os infectados devem ser erradicados',
	'sabe técnicas de tortura',
	'sabe primeiros socorros',
	'bondoso',
	'diplomata',
	'aparência inofensiva',
	'não suporta injustiça',
	'bom senso',
	'sem papas na língua',
	'ninguém fica para trás',
	'mulheres e crianças primeiro',
	'sabe lidar com animais',
	'o que é meu - é seu',
	'bom humor',
	'gosta de crianças',
	'cruel',
	'sanguinário/a'

);

caracMotiva.push(
	'fé em Deus',
	'fé em si próprio',
	'amor pela família',
	'fé em um futuro bom',
	'movidx por vingança',
	'esperança sempre',
	'medo da morte',
	'autocobrança',
	'movidx por uma dívida emocional com alguém',
	'movidx por rancor',
	'os verdadeiros inimigos são os mortos',
	'ordem é importante'
);

caracProfiss.push(
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
);

caracDefeito.push(
	'compulsão por mentir',
	'elitista',
	'xenofóbicx',
	'racista',
	'antissocial',
	'insônia',
	'arrogante',
	'tem claustrofobia',
	'orgulhosx',
	'QI baixo',
	'impaciente',
	'acima do peso',
	'desnutridx',
	'problema respiratório',
	'excessivamente magrx',
	'manca com uma perna',
	'resistência baixa',
	'baixa estatura',
	'passos pesados',
	'desengonçadx',
	'movimentos lentos',
	'pensamento lento',
	'não sabe nadar',
	'beleza não é seu forte',
	'baixa tolerância ao frio',
	'baixa tolerância ao calor',
	'medo de altura',
	'não se sente bem em florestas',
	'não tem muito condicionamento físico',
	'come um boi se deixar',
	'problema de visão',
	'baixa imunidade',
	'audição prejudicada',
	'luta corporal não é o seu forte',
	'mira boa como a de um cego',
	'desatentx',
	'pessoa desagradável',
	'não liga muito para os outros',
	'não acredita em amor',
	'não consegue dizer não',
	'triste a maior parte do tempo',
	'ninguém é bem-vindo',
	'prefere ficar na zona de conforto',
	'não se arrisca por nada',
	'não gosta de receber conselhos',
	'faz tudo com má vontade',
	'pessoa desastrada',
	'dependente dos outros',
	'preguiça em pessoa',
	'faz tudo nas coxas',
	'imprudente',
	'higiene precária',
	'deixa sujeira em qualquer lugar',
	'ódio incontrolável por alguém',
	'não consegue se importar com nada além de si mesmo',
	'ranzinza',
	'desonestidade',
	'o mundo é dos espertos',
	'regras foram feitas para serem quebradas',
	'se afoba por qualquer coisa',
	'pessoa difícil de lidar',
	'odeia qualquer tipo de trabalho',
	'impaciente',
	'depressivo',
	'vício em medicamento',
	'vício em alguma droga',
	'vício em álcool',
	'vício em cigarro',
	'vício em jogos de azar/cartas',
	'doença sem cura - tratamento contínuo',
	'cegx',
	'surdx',
	'alguns dentes a menos',
	'não gosta de barulhos altos',
	'pavor de ratos e baratas',
	'medo de cachorros',
	'fobia de dirigir',
	'anti-vacinas e anti-ciência'
);

caracTodas=caracDefeito.concat(caracMotiva.concat(caracFisico.concat(caracMental)));

/* Condições --------------------------------------*/

var condArmad=[];
var condSaude=[];
var condEmocionais=[];
var todasCond=[];

condArmad.push(
	'armadx com pedaço de madeira',
	'armadx com barra de ferro',
	'armadx com faca',
	'armadx com facão',
	'armadx com pistola',
	'armadx com arma de fogo',
	'improvisando ferramenta comum como arma',
	'com arma de alto calibre e muita munição',
	'com colete a prova de balas',
	'com veículo'
);

condSaude.push(
	'bem alimentadx',
	'bem descansadx',
	'com resfriado',
	'desidratadx',
	'com fome',
	'sem fôlego',
	'com ânsia de vômito',
	'com pressão baixa',
	'assustadx',
	'surto neurótico',
	'dor de dente',
	'dor de barriga',
	'dor de cabeça',
	'com um ferimento leve',
	'diversos ferimentos leves',
	'ferimento mediano - já melhorando',
	'ferimento mediano - precisando de cuidados',
	'ferimento mediano infeccionando',
	'ferimento grave - mas estável',
	'ferimento grave - precisando de cuidados',
	'ferimento gravíssimo e perdendo muito sangue',
	'ferimento de bala',
	'dores musculares',
	'desnutrição',
	'doença de pele',
	'precisando de remédios',
	'DST',
	'câimbras',
	'tornozelo torcido',
	'dor nas costas'

);

condEmocionais.push(
	'em crise de ansiedade',
	'em crise de pânico',
	'triste',
	'feliz',
	'motivadx',
	'desanimadx',
	'desconfiadx'
);

todasCond=condArmad.concat(condSaude.concat(condEmocionais));

/* Tormentos ---------------------------------------- */
var listaTormentos=[]; 

listaTormentos.push(
	'Acidente de veículo',
	'Violência sexual',
	'História envolvendo aborto',
	'Morte de cônjuge',
	'Perda de familiar',
	"Experiência de quase morte",
	"Vítima de tentativa de homicídio",
	'Viu alguém morrer atropelado',
	'Assalto violento',
	'Sequestro',
	'Viu alguém ser devorado por infectados',
	'Sente remorso por não estar com a família quando mais precisaram',
	'Fui obrigado a deixar um amigo/familiar ser devorado para sobreviver',
	'Teve amigo/familiar assassinado por um humano atrás de comida/suprimentos',
	'Precisou matar um amigo/familiar que se infectou',
	'Presenciou uma chacina',
	'Presenciou uma criança ser devorada por um infectado',
	'Para se salvar abandonou amigo/familiar em situação de perigo envolvendo infectados e até hoje não sabe o que aconteceu',
	'Viu pessoas divididas em pedaços',
	'Já sofreu tortura'
);

/* Nomes --------------------------------------------- */
/* depois fazer lista de nomes
				https://gerador-nomes.herokuapp.com
				https://pt.fakenamegenerator.com/gen-random-us-us.php
				*/
var listaNome=[];
var listaSobrenome=[];

listaNome.push(
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
);

listaSobrenome.push(
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
);

/* Infectados *******************************/

var listaInfectado=[];
var listaAnomalia=[];

listaInfectado.push(
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
	'ferimento na boca',
	'sem maxilar',
	'ferimento no pescoço',
	'marcas de tiro',
	'marcas de queimadura',
	'marcas de facada',
);

listaAnomalia.push(
	'membros alongados',
	'unhas enormes',
	'dentes alongados',
	'maxilar alongado',
	'olhos de outra cor',
	'mais músculos',
	'ossos pontiagudos projetados para fora',
	'pele grossa',
	'ossos externos formando carapaça',
	'cavidade que expele líquido infeccioso',
	'membros extras',
	'olhos disfuncionais pelo corpo',
	'secreção infecciosa saindo pelos poros'
);