// JS das Seções gerais
document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.accord-header')

    headers.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');


            document.querySelectorAll('.accord-content').forEach(c => {
                c.classList.remove('active');
            });

            document.querySelectorAll('.accord-header').forEach(h => {
                h.classList.remove('active');
            })

            if (!isActive) {
                content.classList.add('active');
                this.classList.add('active');
            }
        });

    });
});

// Seção Notas

let form = document.getElementById('form-notas');
form.addEventListener('submit', function(event){
    event.preventDefault();
    let dados = new FormData(event)
    let hasError = false;

        // console.log([
        //     dados,
        //     dados.get('pri-prova'),
        //     dados.get('seg-prova'),
        //     dados.get('nota'),
        //     dados.get('conc'),
        //     dados.get('trab')
        // ])
    

    let  msgs = [];
    if (dados.get('pri-prova').trim().length == 0) {
        alert('coloque o valor')
        hasError = true;
        msgs.push("Adicione essa nota")

    }
    
    else{
        form.submit();
    }

})







// Lista de Mensagens
let dados = [];

async function loadData(){
    try {
        const resp = await fetch('mensagens.json');
        if (!resp.ok) {
            throw new Error ('Erro ao carregar dados!');
        }
        dados = await resp.json();
        return dados;
    } catch (erro) {
        console.error('Erro: ' , erro);
        return[];
    }

}   

const lista = document.getElementById('mensagem-lista');
function listaMsg(dados) {

    lista.innerHTML = '';

    dados.forEach(item => {
        const linha = document.createElement('li');
        linha.innerHTML = `
            <span>${item.assunto}</span>

        `;
        
        linha.classList.add('prioridade-'+item.prioridade)
        linha.addEventListener('click', function(){
            conversa(item.texto , linha)
        })

        lista.appendChild(linha);
    });
}

document.getElementById('ordenar-pri').addEventListener('click', function(){
    lista.innerHTML = '';
    dados.sort(function(a,b){
        return a.prioridade > b.prioridade ? -1 : 1
    })
    dados.forEach(function(){
        listaMsg(dados)
    })
})

function conversa(texto, linha){

    document.querySelectorAll('#mensagem-lista li').forEach(item => {
        item.classList.remove('active');
    });
    
    linha.classList.add('active');
}

document.addEventListener('DOMContentLoaded', async () => {
    const dados = await loadData();
    listaMsg(dados);
});

