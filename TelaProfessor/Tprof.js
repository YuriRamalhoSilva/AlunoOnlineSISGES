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

let lisVali = document.getElementById('vali');
let form = document.getElementById('form-notas');
form.addEventListener('submit', function(event){
    event.preventDefault();
    let dados = new FormData(form);
    let hasError = false;
    let  msgs = [];
    
    if (dados.get('pri-prova').trim().length == 0) {
        hasError = true;
        msgs.push("Adicione a nota da PRIMEIRA PROVA do aluno!");
    }
    if (dados.get('seg-prova').trim().length == 0) {
        hasError = true;
        msgs.push("Adicione a nota da SEGUNDA PROVA do aluno!");
    }
    if (dados.get('atv').trim().length == 0) {
        hasError = true;
        msgs.push("Adicione a nota de ATIVIDADES do aluno!");
    }
    if (dados.get('conc').trim().length == 0) {
        hasError = true;
        msgs.push("Adicione a nota de CONCEITO do aluno!");
    }
    if (dados.get('trab').trim().length == 0) {
        hasError = true;
        msgs.push("Adicione a nota de TRABALHO do aluno!");
    }

    if (hasError) {
        lisVali.innerHTML = msgs.map(msg => `<li>${msg}</li>`).join('');
        lisVali.style.display = 'block';
    } else {
        lisVali.style.display = 'none';
        form.submit();
    }


})


// Lista de Mensagens
let dados = [];

async function loadData() {
    try {
        const resp = await fetch('mensagens.json');
        if (!resp.ok) {
            throw new Error('Erro ao carregar dados do json.');
        }
        dados = await resp.json();
        return dados;
    } catch (error) {
        console.error('Erro: ', error);
    }
}

const containerLista = document.getElementById('div-msg');
const lista = document.getElementById('mensagem-lista');

function listaMsg(dados) {
    lista.innerHTML = '';
    
    dados.forEach(item => {
        // Cria container completo do accordion
        const container = document.createElement('div');
        container.classList.add('accord-container-li');
        
        // Cria cabeçalho
        const header = document.createElement('div');
        header.classList.add('accord-header-li', 'prioridade-'+item.prioridade);
        header.innerHTML = `<span>${item.assunto}</span>`;
        
        // Cria conteúdo
        const content = document.createElement('div');
        content.classList.add('accord-content-li');
        content.innerHTML = `<p>${item.texto}</p>`;

        // Cria botões na mensagem
        const btnRespContainer = document.createElement('div');
        btnRespContainer.classList.add('btnresp-container');
        const btnResp = document.createElement('button');
        const btnDel = document.createElement('button');
        btnResp.textContent ='Responder';
        btnDel.textContent ='Deletar';

        // Cria a modal
        const modalResp = document.createElement('div');
        modalResp.classList.add('modal-resp');
        modalResp.innerHTML = `
        <div class="modal-content">
            <h3>Responder Mensagem</h3>
            <p><strong>Assunto:</strong> ${item.assunto}</p>
            <textarea placeholder="Digite sua resposta..." rows="5"></textarea>
            <div class="modal-buttons">
                <button class="btn-enviar">Enviar Resposta</button>
                <button class="btn-cancelar">Cancelar</button>
            </div>
        </div>`;
        modalResp.style.display = 'none';
        
        // Adiciona evento
        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Fecha todos os outros
            document.querySelectorAll('.accord-header-li').forEach(h => {
                h.classList.remove('active');
            });
            document.querySelectorAll('.accord-content-li').forEach(c => {
                c.classList.remove('active');
            });
            
            // Abre o atual se não estava ativo
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });

        // Adiciona evento ao botao responder
        btnResp.addEventListener('click', function(e){
            e.stopPropagation();
            lista.style.display = 'none';
            modalResp.style.display = 'flex';
            

        });
        
        // Monta a estrutura
        btnRespContainer.appendChild(btnResp);
        btnRespContainer.appendChild(btnDel);
        content.appendChild(btnRespContainer);
        container.appendChild(header);
        container.appendChild(content);
        lista.appendChild(container);
        
        
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


document.addEventListener('DOMContentLoaded', async () => {
    const dados = await loadData();
    listaMsg(dados);
});

