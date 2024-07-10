let Lista_Fotos = [
    'img/OpenDay1.jpg', // Substitua pelas URLs reais das suas fotos
    'img/OpenDay2.jpg',
    'img/OpenDay3.jpg'
];

function iniciarLoop(array) {
    const imgElement = document.getElementById('scrollContent'); // Seleciona o elemento onde as imagens serão inseridas

    let currentIndex = 0;

    function trocarImagem() {
        imgElement.innerHTML = ''; // Limpa o conteúdo anterior (caso haja)

        const img = document.createElement('img');
        img.src = array[currentIndex];
        imgElement.appendChild(img);
    }

    // Inicia o loop para trocar as imagens automaticamente
    function iniciarAutomatismo() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % array.length;
            trocarImagem();
        }, 2000); // Intervalo de troca de imagem em milissegundos (2 segundos)
    }

    // Inicia o automatismo das imagens
    iniciarAutomatismo();

    // Função para trocar a imagem para a esquerda
    function trocarParaEsquerda() {
        currentIndex = (currentIndex - 1 + array.length) % array.length;
        trocarImagem();
    }

    // Função para trocar a imagem para a direita
    function trocarParaDireita() {
        currentIndex = (currentIndex + 1) % array.length;
        trocarImagem();
    }

    // Captura os botões de controle
    const botaoEsquerda = document.getElementById('botaoEsquerda');
    const botaoDireita = document.getElementById('botaoDireita');

    // Adiciona os event listeners para os botões
    botaoEsquerda.addEventListener('click', trocarParaEsquerda);
    botaoDireita.addEventListener('click', trocarParaDireita);
}

// Iniciar o loop de imagens
iniciarLoop(Lista_Fotos);
