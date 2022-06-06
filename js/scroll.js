
var menuItems = document.querySelectorAll(".menu a[href^='#']");
/* seleciona apenas os links internos */


menuItems.forEach( function (item){
  item.addEventListener('click', scrollParaDiv);
});

function scrollParaDiv(event){
  event.preventDefault();
  let element = event.target;
  let id = element.getAttribute('href');
  let divTopo = document.querySelector(id).offsetTop; /* topo do elemento */

  window.scroll({
    top: divTopo,
    behavior: "smooth"
  });
  /*coordenadas de destino x e y*/
}