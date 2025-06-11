let tamanhoFonte = 16;
const tamanhoMaximo = 24;
const tamanhoMinimo = 10;

document.addEventListener("DOMContentLoaded", () => {
    const btnAumentar = document.getElementById("aumentarBtn");
    const btnDiminuir = document.getElementById("diminuirBtn");
    const textareaAviso = document.querySelector(".txt"); // Seleciona o textarea

    btnAumentar.addEventListener("click", () => {
        if (tamanhoFonte < tamanhoMaximo) {
            tamanhoFonte += 2;
            document.documentElement.style.fontSize = tamanhoFonte + "px";
            textareaAviso.style.fontSize = tamanhoFonte + "px"; // Altera o textarea
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if (tamanhoFonte > tamanhoMinimo) {
            tamanhoFonte -= 2;
            document.documentElement.style.fontSize = tamanhoFonte + "px";
            textareaAviso.style.fontSize = tamanhoFonte + "px"; // Altera o textarea
        }
    });
});