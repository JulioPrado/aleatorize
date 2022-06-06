const custoAtributos = 100;
/*O valor que gera o custo para upar um atr. */
const multipliVitalidade = 3;
/* Valor que multiplica a Vitalidade para gerar os Pontos de Vida  */

function jogador() {
  this.jogador=true;
  this.nome=undefined;
  this.nivel=1;
  this.vitalidade=1;
  this.vida=undefined;
  this.ataque=1;
  this.defesa=1;
  this.dano=1;
  this.estagio=undefined;
  this.dado=undefined;
  this.ouro=800;
  this.derrotas=0;
  this.oponentesDerrotados=0;
  this.oponentesDerrotadosUnicos=0;
  this.ouroGanho=0;
  this.ouroGasto=0;
  this.danoCausado=0;
  this.danoRecebido=0;
  };

  function atualizaPersonagem(){

    jogador.vida=jogador.vitalidade*multipliVitalidade;
    jogador.nivel=Math.round((jogador.dano+jogador.defesa+jogador.ataque+jogador.vitalidade)/4);
    jogador.dado=defineTipoDado(jogador);

  let el=document.getElementById('personagem');


  el.innerHTML=(""
  +"<h2>PERSONAGEM</h2>"
  +'<div class="container">'
  +     ' <div class="row p-3">'
  +        '<div class="col">'
  +          'Nome: '+jogador.nome
  +        '</div>'
  +        '<div class="col">'
  +          "<span style='color:var(--cor-NivelEstagioDado);'>Nível: "+jogador.nivel
  +        '</div>'
  +      '</div>'
  +     ' <div class="row p-3">'
  +        '<div class="col">'
  +       "<button onclick=uparAtributo('vitalidade') type='button' class='btn btn-danger'>✚</button><br/>"
  +          "<span style='color:var(--cor-Vida);'>Vitalidade: "+jogador.vitalidade
  +        '<br/>vida: '+jogador.vida+"</span>"
  +        '</div>'
  +        '<div class="col">'
  +       "<button onclick="+"uparAtributo('ataque')"+" type='button' class='btn btn-warning'>✚</button><br/>"
  +          "<span style='color:var(--cor-Ataque);'>Ataque: "+jogador.ataque
  +        '</div>'
  +      '</div>'
  +      '<div class="row p-3">'
  +         '<div class="col">'
  +       "<button onclick="+"uparAtributo('defesa')"+" type='button' class='btn btn-success'>✚</button><br/>"
  +          "<span style='color:var(--cor-Defesa);'>Defesa: "+jogador.defesa
  +        '</div>'
  +        '<div class="col">'
  +       "<button onclick="+"uparAtributo('dano')"+" type='button' class='btn btn-primary'>✚</button><br/>"
  +          "<span style='color:var(--cor-Dano);'>Dano: "+jogador.dano
  +        '</div>'
  +      '</div>'
  +     ' <div class="row p-3">'
  +        '<div class="col">'
  +          "<span style='color:var(--cor-NivelEstagioDado);'>Estágio: "+jogador.estagio
  +        '</div>'
  +        '<div class="col">'
  +          "<span style='color:var(--cor-NivelEstagioDado);'>Tipo de Dado: D"+jogador.dado
  +        '</div>'
  +      '</div>'
  +    '</div>'
    )

}

function atualizaConquistas(){
  let el=document.getElementById('conquistas');

  el.innerHTML=(
    '<h2>CONQUISTAS</h2>'
+      '<div class="text-center">'
+        'Vezes em que foi derrotado: '+jogador.derrotas
+        '<br>'
+       ' Total de oponentes derrotados: '+jogador.oponentesDerrotados
 +       '<br>'
+        'Oponentes únicos derrotados: '+jogador.oponentesDerrotadosUnicos
+        '<br>'
+        'Total de ouro ganho: '+jogador.ouroGanho
+        '<br>'
+        'Total de ouro gasto: '+jogador.ouroGasto
+        '<br>'
+        'Total de dano causado: '+jogador.danoCausado
+        '<br>'
+        'Total de dano recebido: '+jogador.danoRecebido
+      '</div>'
    )
}

function uparAtributo(atributo){
  let custo = jogador[atributo]*custoAtributos;
  if(jogador.ouro<custo){
    informa('danger','você não tem ouro suficiente para subir <b>'+atributo+'</b> de nível. \nOuro necessário:'+custo);
    }else{
        jogador.ouro=jogador.ouro-custo;
        jogador.ouroGasto+=custo;
        jogador[atributo]++;
        atualizaPersonagem();
        atualizaBarraTopo();
        animaOuro('red');
        atualizaConquistas();
      }
    
}