function iniciaApp(){



}

// tipo deve ser sucess, info, danger, etc...
function informa(tipo,mensagem){
  let el=document.getElementById('barraTopo');


  $ (el).append(
    "<div class='position-absolute w-100 my-3 float-right alert alert-"+tipo+" alert-dismissible'> "
    +"<strong>Aviso</strong>: "+mensagem
    +"<button class='close' type='button' data-dismiss='alert'>"
    +    "×"
    +"</button>"
    +"</div>"
    );
}

function fecharDicasIniciais(){
  let el=document.getElementById('dicas');
  el.style.display='none';
}


function atualizaBarraTopo(){
  let el=document.getElementById('barraTopo');

  el.innerHTML= "<span style='float:left;'>"+jogador.nome+
  "</span><span style='text-center'> Nv:"+jogador.nivel+
  "</span> <span style='text-align:right;float:right'> Ouro: <span id='ouroTopo'>"+jogador.ouro.toFixed(2) +"</span></span>"
}

function animaOuro(cor){


  let el=document.getElementById('ouroTopo');
  el.style.color=cor;

  // tem que ser assim pra poder passar parâmetro na função
 setTimeout( function(){ el.style.color='black'}, 500);  



}

function novoJogo(){

  jogador = new jogador;
  

  jogador.nome=prompt("Digite o nome do seu personagem:");
  if (!jogador.nome){ //se Falsy
    let random = Math.random()*10000;
    
    jogador.nome="Jogador"+random.toFixed();
  }

  

  document.getElementById('iniciado').style.display="block";


  /*let el=document.getElementById('naoIniciado');
  el.innerHTML='';*/

  atualizaPersonagem();
  atualizaBarraTopo();
  atualizaConquistas();

  //pra gerar o primeiro inimigo da arena
  gerarInimigo();
  ultimoMin++;
  ultimoMax++;
  preencherListaInimigos(listaInimigos);

}

function carregaJogo(){

}