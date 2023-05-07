function randomAte(max){
  console.log(Math.floor(Math.random() * max + 1));
  /* assim fica de 1 até o max, se tirar o +1 fica de 0 até o max-1 */
}

function randomEntre(min,max){
   return (Math.floor(Math.random() * (max-min+1)+min));
}

const nivelMinNovato = 5;
const nivelMinExperiente = 10;
const nivelMinVeterano = 20;
const nivelMinHeroico = 40;
const nivelMinLendario = 50;
const log=document.getElementById('logBatalha');

var listaInimigos=[];
var inimigosCriados=0;//usa pro id dos inimigos e incrementa
var ultimoMin=1;
var ultimoMax=3;

function inimigo(id,nome,vitalidade,ataque,defesa,dano,recompensa){
  this.nivel=undefined; //definindo em primeiro para ficar mais facil ordenar depois
  this.jogador=false;
  this.id=id, 
  this.nome=nome,
  this.vitalidade=vitalidade,
  this.vida=this.vitalidade*multipliVitalidade,
  this.ataque=ataque,
  this.defesa=defesa,
  this.dano=dano,
  this.derrotado=false,
  this.estagio=undefined,
  this.nivel=Math.round((this.dano+this.defesa+this.ataque+this.vitalidade)/4),
  this.dado=defineTipoDado(this);

}

function gerarInimigo(){

let inimigoGerado= new inimigo(
  inimigosCriados,               //id
  'Inimigo'+inimigosCriados,     //nome
  randomEntre(ultimoMin,ultimoMax),//vitalidade
  randomEntre(ultimoMin,ultimoMax),//ataque
  randomEntre(ultimoMin,ultimoMax),//defesa
  randomEntre(ultimoMin,ultimoMax)//dano
  )

  inimigosCriados++;

  listaInimigos.push(inimigoGerado);
}


function aumentarListaInimigos(qnt){
  for(var i=0;i<listaInimigos.length;i++){
    if (!listaInimigos[i].derrotado) {
      informa('danger','Você precisa derrotar todos os inimigos gerados para poder gerar mais.');
      return 0; //pra parar de executar a função
    }
  }

  for (var i=0;i<qnt;i++){
    gerarInimigo();
    ultimoMin++; //para que seja mais forte que o último gerado
    ultimoMax++;
  }
  preencherListaInimigos(listaInimigos);
}

function preencherListaInimigos(lista){
  
  lista.sort(); //ordena por nivel

  let el=document.getElementById('divInimigos');
  
  el.innerHTML='';//para não repetir os que já tem

  let corBotaoLutar = 'danger';
  for(var i=0;i<lista.length;i++){

    if(lista[i].derrotado){
      corBotaoLutar = 'success';
    }else{
      corBotaoLutar = 'danger';
    }


    $ (el).append(
      '<div class="row border-bottom p-1">'
+                '<div class="col-3">'
+                  'Nv: ' +lista[i].nivel+' '+lista[i].estagio
+                '</div>'
+                '<div class="col-6">'
+                  lista[i].nome
+                '</div>'
 +               '<div class="col-3">'
+                  '<button class="btn btn-sm btn-'+corBotaoLutar+'" onclick="luta('+lista[i].id+');">'
+                 ' Lutar!'
+                '</a>'
+                '</div>'
+              '</div>')
  }
}

function defineTipoDado(combatente){

      if(combatente.nivel<nivelMinNovato){
        combatente.estagio='Iniciante';
        return 4;
      }else if(combatente.nivel>=nivelMinNovato&&combatente.nivel<nivelMinExperiente){
          combatente.estagio='Novato';
          return 6;
        }else if(combatente.nivel>=nivelMinExperiente&&combatente.nivel<nivelMinVeterano){
          combatente.estagio='Experiente';
          return 8;
        }else if(combatente.nivel>=nivelMinVeterano&&combatente.nivel<nivelMinHeroico){
          combatente.estagio='Veterano';
          return 10;
        }else if(combatente.nivel>=nivelMinHeroico&&combatente.nivel<nivelMinLendario){
         combatente.estagio='Heróico';
         return 12;
        }else if(combatente.nivel>=nivelMinLendario){
          combatente.estagio='Lendário';
          return 20;
        }else{ alert('Erro ao verificar tipo de dado.'); };
  }

/* LUTA -------------------------- */

function luta(inimigoID){
  limpaLog();
  let turno=1;
  let inimigo=listaInimigos[inimigoID];
  let tipoDadoJogador = jogador.dado;
  let tipoDadoOponente = inimigo.dado;
  let lutaFim=false;
  let vencedor=undefined;

  function mostrarVida(){
    $ (log).append(jogador.nome+" <span style='color:var(--cor-Vida);'>vida: "+jogador.vida+"</span> x "+inimigo.vida+" vida "+inimigo.nome+".<br/>");
  }
  
  mostrarVida(); //pra mostrar a vida no começo do combate

  function jogadorAtaca(oponente){
      let dado=randomEntre(1,tipoDadoJogador);
      let totalAtaque=jogador.ataque+dado;

      $ (log).append(jogador.nome+' atacou com '+"<span style='color:var(--cor-Ataque);'>"+jogador.ataque+"</span>+<span style='color:var(--cor-NivelEstagioDado);'>("+dado+")</span> = "+totalAtaque+' contra Defesa: '+inimigo.defesa+'.<br/>');
    
      if(totalAtaque>=inimigo.defesa){
        dado=randomEntre(1,tipoDadoJogador);
        dano=jogador.dano+dado;
        inimigo.vida-=dano;
        $ (log).append(jogador.nome+" acertou o ataque! Dano causado: <span style='color:var(--cor-Dano);'>"+jogador.dano+"</span>+<span style='color:var(--cor-NivelEstagioDado);'>("+dado+")</span> = "+dano+".<br/>");
        jogador.danoCausado+=dano;
      }else{
        $ (log).append(jogador.nome+' errou o ataque!<br/>');
      }

    }

    function oponenteAtaca(jogador){
      let dado=randomEntre(1,tipoDadoOponente);
      let totalAtaque=inimigo.ataque+dado;

      $ (log).append(inimigo.nome+ ' atacou com '+inimigo.ataque+'+('+dado+') = '+totalAtaque+' contra <span style="color:var(--cor-Defesa);">Defesa: '+jogador.defesa+'</span>.<br/>');
      
      if(totalAtaque>=jogador.defesa){
        dado=randomEntre(1,tipoDadoOponente);
        dano=inimigo.dano+dado;
        jogador.vida-=dano;
        $ (log).append(inimigo.nome+" acertou o ataque! Dano causado: "+inimigo.dano+"+("+dado+") = "+dano+".<br/>");
        jogador.danoRecebido+=dano;
      }else{
        $ (log).append(inimigo.nome+' errou o ataque!<br/>');
      }
    }

    function morreu(alvo){
      mostrarVida();
      if (alvo.vida>0) {
        return false;
      }else{
        return true;
      }
    }

    function encerraLuta(vencedor){

      //testa o atributo objeto.jogador
      if(vencedor=='empate'){

      }else if (!vencedor.jogador) {
        jogador.derrotas++;
        $ (log).append("<strong style='color:red'>"+jogador.nome+" perdeu o combate! Tente melhorar suas características ou lutar contra oponentes mais fracos!</strong><br/>");
      }else if(vencedor.jogador){

        if (!inimigo.derrotado) {
          //se é a primeira vez que derrota o inimigo.
            jogador.oponentesDerrotadosUnicos++;
            inimigo.derrotado=true;
        }
        
        jogador.oponentesDerrotados++;
        preencherListaInimigos(listaInimigos);
        let recompensa=randomEntre(inimigo.nivel*10,inimigo.nivel*12);
        jogador.ouroGanho+=recompensa;
        jogador.ouro+=recompensa;
        $ (log).append("<strong style='color:green'>"+jogador.nome+" ganhou o combate e recebeu "+recompensa+" Ouros de recompensa!</strong><br/>");
      }

      lutaFim=true;
      atualizaBarraTopo();
      atualizaConquistas();
      //o animaOuro tem que ser depois do atualizaBarraTopo, por isso ta com o ternário
      vencedor.jogador ? animaOuro('green') :  console.log();
    }

    function limpaLog(){
      log.innerHTML='';
    }

  //acontece em cada turno
  do{

    $ (log).append("<span class='turno'>Turno: "+turno+'<span>');

    jogadorAtaca(inimigo);
    if (morreu(inimigo)) {
      encerraLuta(jogador);
    }else{
      oponenteAtaca(jogador);
      if (morreu(jogador)) {
        encerraLuta(inimigo);
      }
    }

   if(turno++>99){
    $ (log).append('Empate por tempo!<br/>');
    encerraLuta('empate');
   }
  }while(!lutaFim);

//resetar as vidas
jogador.vida=jogador.vitalidade*multipliVitalidade;
inimigo.vida=inimigo.vitalidade*multipliVitalidade;

$ (log).prepend('<h4>Log de Combate</h4>');//Para colocar o texto no topo da div

}

