// JavaScript source code

const estado1 = '#circulo1>circle';
const estado2 = '#circulo2>circle';

const tabela = document.getElementById('tabela');

// lado esquerdo das transições
const transicoesEsq = [['I', 'a', 'λ'],
    ['I', 'a', 'a'],
    ['I', 'b', 'a'],
    ['F', 'b', 'a'],
    ['I', 'λ', 'b']];

// lado direito das transições
const transicoesDir = [['I', 'a'],
    ['I', 'a'],
    ['F', 'λ'],
    ['F', 'λ'],
    ['I', 'λ']];

var estadoAtual = 'I';
var pilha = ['λ'];

// realiza o processo de computação da palavra digitada
async function computarPalavra() {
    var palavra = document.getElementById('palavra').value;
    validarPalavra(palavra);

    var fita = palavra;
    document.getElementById("fita").innerHTML = fita;

    for (i = 0; i < palavra.length; i++) { // itera a cada simbolo da palavra
        for (j = 0; j < 5; j++) { // percorre as 5 transições
            if (transicoesEsq[j][0] == estadoAtual && transicoesEsq[j][1] == palavra[i] && transicoesEsq[j][2] == pilha[0]) {
                if (transicoesDir[j][1] == 'λ') {
                    desempilhar();
                    pilha.shift(); // remove o último símbolo da pilha
                }
                else {
                    empilhar(transicoesDir[j][1]);
                    pilha.unshift(transicoesDir[j][1]); // adiciona o símbolo no primeiro elemento da pilha
                }
                await sleep(2000); // dá uma pausa de 2seg
                if (estadoAtual == transicoesDir[j][0])
                    acenderEstado(transicoesDir[j][0]);
                else
                    mudarEstado(transicoesDir[j][0]);

                fita = palavra.substring(i + 1); // deleta o primeiro simbolo da palavra
                document.getElementById("fita").innerHTML = fita;
                break;
            }
            else if (j == 4) { // caso nenhuma transição tenha sido encontrada ao final do loop, não há computações possíveis
                $("p").last().text('A palavra não foi aceita, tente novamente.');
                await sleep(2000);
                window.location.reload();
            }
        }
    }

    if (tabela.getElementsByTagName('tr').length == 2 && fita.length == 0 && estadoAtual == 'F')
        document.getElementById("resultado").innerHTML = 'Palavra aceita!';
    else
        document.getElementById("resultado").innerHTML = 'A palavra não foi aceita, tente novamente.';

    await sleep(2000);
    window.location.reload();
}

// pausa a execução por alguns segundos para melhor visualização do processo
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// muda a cor do estado especificado
function acenderEstado(estado) {
    if (estado == 'I') {
        const svgCirculo = document.querySelector(estado1)

        const timeline = new TimelineLite()
        timeline
            .to(svgCirculo, 1, { fill: 'red' })
            .to(svgCirculo, 1, { fill: '#F3B3A6' })
    }
    else {
        const svgCirculo = document.querySelector(estado2)

        const timeline = new TimelineLite()
        timeline
            .to(svgCirculo, 1, { fill: 'red' })
            .to(svgCirculo, 1, { fill: '#F3B3A6' })
    }
}

// troca de estado
function mudarEstado(estado) {
    estadoAtual = estado;
    if (estadoAtual == 'I') {
        acenderEstado(estado1);
    }
    else {
        acenderEstado(estado2);
    }
}

// adiciona o simbolo passado como parâmetro na primeira linha da tabela
function empilhar(simbolo) {
    var linha = tabela.insertRow(1);
    var celula1 = linha.insertCell(0);
    celula1.innerHTML = simbolo;
}

// esvazia a primeira linha da tabela
function desempilhar() {
    document.getElementById("tabela").deleteRow(1);
}

// verifica se os caracteres digitados são parte do alfabeto do autômato
function validarPalavra(palavra) {
    if (palavra.length == 0) {
        alert("Digite alguma coisa primeiro");
        window.location.reload();
    }
    for (i = 0; i < palavra.length; i++) { // itera a cada simbolo da palavra
        if (palavra[i] != 'a' && palavra[i] != 'b') {
            alert("Simbolo não reconhecido");
            window.location.reload();
        }
    }
}