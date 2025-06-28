const barra_lateral = document.getElementById('barr_lat');
const menu_button = document.getElementById('Menu');

function toggleMenu() {

    if(barra_lateral.style.display ==='flex'){
        barra_lateral.style.display = 'none';
    } else {
        barra_lateral.style.display = 'flex';
    }

}

menu_button.addEventListener('click',function(event){
    event.stopPropagation();
    toggleMenu();
    
});

const divPri = document.getElementById('div-prioridade');
const rangePri =  document.getElementById('range');
rangePri.setAttribute('max' , '2');
rangePri.setAttribute('value' , 0);

let prioridade = 0;

rangePri.addEventListener('change' , function(e){
    prioridade = e.target.value;
    switchColor(prioridade);
});

function switchColor(prioridade){
    divPri.classList.remove('prioridade-0','prioridade-1','prioridade-2');
    divPri.classList.add('prioridade-'+prioridade);
}
let tamanhoFonte = 16;
const tamanhoMaximo = 24;
const tamanhoMinimo = 10;

const htmlElement = document.documentElement;

const btnAumentar = document.getElementById("aumentarBtn");
const btnDiminuir = document.getElementById("diminuirBtn");

btnAumentar.addEventListener("click", () => {
  if (tamanhoFonte < tamanhoMaximo) {
    tamanhoFonte += 2;
    htmlElement.style.fontSize = tamanhoFonte + "px";
  }
});

btnDiminuir.addEventListener("click", () => {
  if (tamanhoFonte > tamanhoMinimo) {
    tamanhoFonte -= 2;
    htmlElement.style.fontSize = tamanhoFonte + "px";
  }
});
