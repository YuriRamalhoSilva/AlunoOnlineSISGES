
// Tamanhos de fonte
let tamanhoFonte = 16; // tamanhO padrão
const max = 24;  // Tamanho máximo
const min = 10;  // Tamanho mínimo

// Altera o tamanho da fonte da página toda
document.addEventListener("DOMContentLoaded", () => {
    // Botões + e -
    const btnAumentar = document.getElementById("aumentarBtn");
    const btnDiminuir = document.getElementById("diminuirBtn");
    const textareaAviso = document.querySelector(".txt"); // Seleciona o textarea

    // Aumenta fonte (até 24px)
    btnAumentar.addEventListener("click", () => {
        if (tamanhoFonte < max) {
            tamanhoFonte += 2;
            document.documentElement.style.fontSize = tamanhoFonte + "px";
            textareaAviso.style.fontSize = tamanhoFonte + "px"; // Altera o textarea
        }
    });

    // Diminui fonte (até 10px)
    btnDiminuir.addEventListener("click", () => {
        if (tamanhoFonte > min) {
            tamanhoFonte -= 2;
            document.documentElement.style.fontSize = tamanhoFonte + "px";
            textareaAviso.style.fontSize = tamanhoFonte + "px"; // Altera o textarea
        }
    });
});