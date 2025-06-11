// JS das Seções gerais
document.addEventListener('DOMContentLoaded', function() {
    console.log('Carregando dados...');
    carregarDados();
    configurarBotoesDeAcao();
    
    setTimeout(() => {
        console.log('Dados no localStorage:', JSON.parse(localStorage.getItem('notasEscolares')));
        console.log('Conteúdo da tabela:', document.getElementById('table-notas').innerHTML);
    }, 500);

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
    if (parseFloat(dados.get('pri-prova').trim()) > 5) {
        hasError = true;
        msgs.push("A nota da PRIMEIRA PROVA não pode ser maior que 5!");
    }
    if (parseFloat(dados.get('seg-prova').trim()) > 10) {
        hasError = true;
        msgs.push("A nota da SEGUNDA PROVA não pode ser maior que 10!");
    }
    if (parseFloat(dados.get('atv').trim()) > 3) {
        hasError = true;
        msgs.push("A nota de ATIVIDADE não pode ser maior que 3!");
    }
    if (parseFloat(dados.get('conc').trim()) > 2) {
        hasError = true;
        msgs.push("A nota de CONCEITO não pode ser maior que 2!");
    }
    if (parseFloat(dados.get('trab').trim()) > 5) {
        hasError = true;
        msgs.push("A nota de TRABALHO não pode ser maior que 5!");
    }
    
    

    if (hasError) {
        lisVali.innerHTML = msgs.map(msg => `<li>${msg}</li>`).join('');
        lisVali.style.display = 'block';
    } else {
        lisVali.style.display = 'none';
        

        const bimestre = 'bim' + document.getElementById('bim').value.replace('bim', '');
        const priProva = parseFloat(dados.get('pri-prova'));
        const segProva = parseFloat(dados.get('seg-prova'));
        const trab = parseFloat(dados.get('trab'));
        const atv = parseFloat(dados.get('atv'));
        const conc = parseFloat(dados.get('conc'));

        salvarDados(bimestre, priProva, segProva, trab, atv, conc);
        
        atualizarTabela(bimestre);
        
        alert('Formulário enviado com sucesso!');

        form.reset();
    }


})

function atualizarTabela(bimestre) {
    const dados = JSON.parse(localStorage.getItem('notasEscolares'));
    const bimestreDados = dados[bimestre];
    
    if (!bimestreDados) return;
    

    const tabela = document.getElementById('table-notas');
    

    const linhas = tabela.querySelectorAll('tr');
    
    linhas[1].querySelector('td:nth-child(3)').textContent = bimestreDados.priProva;
    linhas[2].querySelector('td:nth-child(3)').textContent = bimestreDados.segProva;
    linhas[3].querySelector('td:nth-child(3)').textContent = bimestreDados.trab;
    linhas[4].querySelector('td:nth-child(3)').textContent = bimestreDados.atv;
    linhas[5].querySelector('td:nth-child(3)').textContent = bimestreDados.conc;


    const tituloTabela = tabela.querySelector('h3');
    if (tituloTabela) {
        tituloTabela.textContent = `${bimestre.replace('bim', '')}º Bimestre`;
    }
}

function salvarDados(bimestre, priProva, segProva, trab, atv, conc) {

    const chaveBimestre = bimestre.startsWith('bim') ? bimestre : `bim${bimestre}`;
    
    const dados = JSON.parse(localStorage.getItem('notasEscolares')) || {};
    
    dados[chaveBimestre] = {
        priProva: priProva || 0,
        segProva: segProva || 0,
        trab: trab || 0,
        atv: atv || 0,
        conc: conc || 0
    };
    
    localStorage.setItem('notasEscolares', JSON.stringify(dados));
    console.log('Dados salvos:', dados); 
}

function carregarDados() {
    const dadosSalvos = JSON.parse(localStorage.getItem('notasEscolares'));
    if (!dadosSalvos) return;

    const tabela = document.getElementById('table-notas');
    if (!tabela) return;

    const titulo = tabela.querySelector('h3');
    if (!titulo) return;
    
    const numeroBimestre = titulo.textContent.match(/(\d+)º/)[1];
    const chaveBimestre = 'bim' + numeroBimestre;
    
    const dadosBimestre = dadosSalvos[chaveBimestre];
    if (!dadosBimestre) return;


    const mapeamentoLinhas = {
        1: 'priProva',  
        2: 'segProva',  
        3: 'trab',      
        4: 'atv',       
        5: 'conc'       
    };


    const linhas = tabela.querySelectorAll('tr:not(:first-child)');
    linhas.forEach((linha, index) => {
        const chaveNota = mapeamentoLinhas[index + 1]; 
        if (chaveNota && dadosBimestre[chaveNota] !== undefined) {
            const celulaNota = linha.querySelector('td:nth-child(3)');
            celulaNota.textContent = dadosBimestre[chaveNota] === 0 ? '-' : dadosBimestre[chaveNota];
        }
    });
}

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

        const container = document.createElement('div');
        container.classList.add('accord-container-li');
        

        const header = document.createElement('div');
        header.classList.add('accord-header-li', 'prioridade-'+item.prioridade);
        header.innerHTML = `<span>${item.assunto}</span>`;
        

        const content = document.createElement('div');
        content.classList.add('accord-content-li');
        content.innerHTML = `<p>${item.texto}</p>`;


        const btnRespContainer = document.createElement('div');
        btnRespContainer.classList.add('btnresp-container');
        const btnResp = document.createElement('button');
        const btnDel = document.createElement('button');
        btnResp.textContent ='Responder';
        btnDel.textContent ='Deletar';


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
        

        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            

            document.querySelectorAll('.accord-header-li').forEach(h => {
                h.classList.remove('active');
            });
            document.querySelectorAll('.accord-content-li').forEach(c => {
                c.classList.remove('active');
            });
            

            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });


        btnResp.addEventListener('click', function(e){
            e.stopPropagation();
            lista.style.display = 'none';
            modalResp.style.display = 'flex';
            

        });
        

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


function configurarBotoesDeAcao() {

    const tabela = document.getElementById('table-notas');
    if (!tabela) return;


    if (!tabela.querySelector('th:last-child')?.textContent.includes('Ações')) {
        const cabecalho = document.createElement('th');
        cabecalho.textContent = 'Ações';
        tabela.querySelector('tr').appendChild(cabecalho);
    }


    tabela.querySelectorAll('tr:not(:first-child)').forEach(linha => {
        if (!linha.querySelector('.action-buttons')) {
            const celula = document.createElement('td');
            celula.className = 'action-buttons';
            
            const botaoEditar = document.createElement('button');
            botaoEditar.textContent = 'Editar';
            botaoEditar.className = 'edit-btn';
            botaoEditar.addEventListener('click', () => alternarModoEdicao(linha));
            
            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.className = 'delete-btn';
            botaoExcluir.addEventListener('click', () => limparNota(linha));
            
            celula.append(botaoEditar, botaoExcluir);
            linha.appendChild(celula);
        }
    });
}
function alternarModoEdicao(linha) {
    const celulaNota = linha.querySelector('td:nth-child(3)');
    const celulaTipo = linha.querySelector('td:nth-child(2)');
    const botao = linha.querySelector('.edit-btn');
    
    if (celulaNota.querySelector('input')) {
        salvarNota(linha);
        botao.textContent = 'Editar';
    } else {
        const valorAtual = celulaNota.textContent.trim();
        celulaNota.innerHTML = `<input type="number" 
                                    value="${valorAtual === '-' ? '' : valorAtual}" 
                                    min="0" 
                                    step="0.1"
                                    class="grade-input">`;
        
        const campoInput = celulaNota.querySelector('input');
        campoInput.focus();
        botao.textContent = 'Salvar';
        
        campoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') salvarNota(linha);
        });
    }
}

function salvarNota(linha) {
    const tabela = document.getElementById('table-notas');
    const celulaNota = linha.querySelector('td:nth-child(3)');
    const celulaValor = linha.querySelector('td:nth-child(2)');
    const celulaTipo = linha.querySelector('td:nth-child(1)'); 
    const campoInput = celulaNota.querySelector('input');
    const mensagemValidacao = document.getElementById('vali');
    
    if (!campoInput) return;
    
    const notaMaxima = parseFloat(celulaValor.textContent) || 0;
    const valorNota = campoInput.value.trim();
    const tipoNota = celulaTipo.textContent.trim(); 
    let mensagens = [];
    
    if (valorNota === '') {
        mensagens.push('Digite um valor para a nota!');
    } else {
        const numeroNota = parseFloat(valorNota);
        if (isNaN(numeroNota)) {
            mensagens.push('Digite um valor numérico válido!');
        } else if (numeroNota < 0) {
            mensagens.push('A nota não pode ser menor que 0!');
        } else if (numeroNota > notaMaxima) {
            mensagens.push(`A nota não pode ser maior que ${notaMaxima}!`);
        }
    }
    
    if (mensagens.length > 0) {
        mensagemValidacao.innerHTML = mensagens.map(msg => `<li>${msg}</li>`).join('');
        mensagemValidacao.style.display = 'block';
        campoInput.focus();
    } else {
        mensagemValidacao.style.display = 'none';
        const numeroNota = parseFloat(valorNota);
        const notaFormatada = numeroNota % 1 === 0 ? numeroNota.toString() : numeroNota.toFixed(1);
        celulaNota.textContent = notaFormatada;

        const tituloBimestre = tabela.querySelector('h3').textContent;
        const numeroBimestre = tituloBimestre.match(/(\d+)º/)[1];
        const bimestre = `bim${numeroBimestre}`;

        const dados = JSON.parse(localStorage.getItem('notasEscolares')) || {};
        if (!dados[bimestre]) dados[bimestre] = {};
        
        const chaveNota = mapearChaveNota(tipoNota);
        dados[bimestre][chaveNota] = numeroNota;
        
        localStorage.setItem('notasEscolares', JSON.stringify(dados));
        console.log('Dados atualizados:', dados); 
    }
}

function limparNota(linha) {
    const tabela = document.getElementById('table-notas');
    const celulaTipo = linha.querySelector('td:nth-child(1)'); 
    
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
        const celulaNota = linha.querySelector('td:nth-child(3)');
        if (celulaNota) {
            celulaNota.textContent = '-';
            
            const tituloBimestre = tabela.querySelector('h3').textContent;
            const numeroBimestre = tituloBimestre.match(/(\d+)º/)[1];
            const bimestre = `bim${numeroBimestre}`;
            const tipoNota = celulaTipo.textContent.trim();

            const dados = JSON.parse(localStorage.getItem('notasEscolares')) || {};
            if (dados[bimestre]) {
                const chaveNota = mapearChaveNota(tipoNota);
                dados[bimestre][chaveNota] = 0; 
                localStorage.setItem('notasEscolares', JSON.stringify(dados));
                console.log('Dados após exclusão:', dados); 
            }
        }
    }
}

function mapearChaveNota(tipoNota) {
    const mapeamento = {
        '1º Prova': 'priProva',
        '2º Prova': 'segProva',
        'Trabalhos': 'trab',
        'Atividades': 'atv',
        'Conceito': 'conc'
    };
    return mapeamento[tipoNota] || tipoNota.toLowerCase();
}
