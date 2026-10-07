const audio = document.getElementById("audio");

const botaoPlay = document.querySelector(".botao-play");
const playerPlay = document.querySelector(".player-play");

const musicas = document.querySelectorAll(".musica");

const nomePlayer = document.querySelector(".player-musica");
const artistaPlayer = document.querySelector(".player-artista");
const capaPlayer = document.querySelector(".player-capa img");

const botaoAnterior = document.querySelector(".player-controles button:first-child");
const botaoProxima = document.querySelector(".player-controles button:last-child");

const barraProgresso = document.querySelector(".barra-progresso");
const tempoAtual = document.querySelector(".tempo-atual");
const tempoTotal = document.querySelector(".tempo-total");

const botoesFavoritos = document.querySelectorAll(".botao-favorito");

/* =========================
   PLAYER EXPANDIDO
========================= */

const player = document.querySelector(".player");

const playerExpandido = document.querySelector(".player-expandido");

const fecharPlayer = document.querySelector(".fechar-player");

const capaExpandida = document.querySelector(".capa-expandida img");

const nomeExpandido = document.querySelector(".nome-expandido");

const artistaExpandido = document.querySelector(".artista-expandido");

const playExpandido = document.querySelector(".play-expandido");

const barraExpandida = document.querySelector(".barra-expandida");

const tempoExpandidoAtual = document.querySelector(".tempo-expandido-atual");

const tempoExpandidoTotal = document.querySelector(".tempo-expandido-total");

const botaoAnteriorExpandido = document.querySelector(".anterior-expandido");

const botaoProximaExpandida = document.querySelector(".proxima-expandida");


/* =========================
   MÚSICA ATUAL
========================= */

let musicaAtual = 0;


/* =========================
   TOCAR UMA MÚSICA
========================= */

function tocarMusica(indice = 0) {

    if (indice < 0) {
        indice = musicas.length - 1;
    }

    if (indice >= musicas.length) {
        indice = 0;
    }

    musicaAtual = indice;

    const musica = musicas[musicaAtual];

    const arquivo = musica.getAttribute("data-musica");
    const capa = musica.getAttribute("data-capa");

    const nome = musica.querySelector(".nome-musica").textContent;
    const artista = musica.querySelector(".artista").textContent;


    /* Troca o áudio */

    audio.src = arquivo;


    /* Troca as informações */

    nomePlayer.textContent = nome;
    artistaPlayer.textContent = artista;


    /* Troca a capa */

    if (capa) {
        capaPlayer.src = capa;
    }


    /* Atualiza o player expandido */

    atualizarPlayerExpandido();


    /* Toca a música */

    audio.play();

}


/* =========================
   PLAY / PAUSE PRINCIPAL
========================= */

botaoPlay.addEventListener("click", function() {

    if (audio.paused) {

        audio.play();

    } else {

        audio.pause();

    }

});


/* =========================
   PLAY / PAUSE DO PLAYER
========================= */

playerPlay.addEventListener("click", function() {

    if (audio.paused) {

        audio.play();

    } else {

        audio.pause();

    }

});


/* =========================
   CLICAR EM UMA MÚSICA
========================= */

musicas.forEach(function(musica, indice) {

    musica.addEventListener("click", function() {

        tocarMusica(indice);

    });

});


/* =========================
   MÚSICA ANTERIOR
========================= */

botaoAnterior.addEventListener("click", function() {

    tocarMusica(musicaAtual - 1);

});


/* =========================
   PRÓXIMA MÚSICA
========================= */

botaoProxima.addEventListener("click", function() {

    tocarMusica(musicaAtual + 1);

});


/* =========================
   QUANDO COMEÇA A TOCAR
========================= */

audio.addEventListener("play", function() {

    botaoPlay.textContent = "❚❚";
    playerPlay.textContent = "❚❚";
    playExpandido.textContent = "❚❚";

});


/* =========================
   QUANDO PAUSA
========================= */

audio.addEventListener("pause", function() {

    botaoPlay.textContent = "▶";
    playerPlay.textContent = "▶";
    playExpandido.textContent = "▶";

});


/* =========================
   QUANDO TERMINA
========================= */

audio.addEventListener("ended", function() {

    tocarMusica(musicaAtual + 1);

});


/* =========================
   ATUALIZAR PROGRESSO
========================= */

audio.addEventListener("timeupdate", function() {

    if (audio.duration) {

        const progresso =
            (audio.currentTime / audio.duration) * 100;


        /* Player pequeno */

        barraProgresso.value = progresso;

        tempoAtual.textContent =
            formatarTempo(audio.currentTime);

        tempoTotal.textContent =
            formatarTempo(audio.duration);


        /* Player expandido */

        barraExpandida.value = progresso;

        tempoExpandidoAtual.textContent =
            formatarTempo(audio.currentTime);

        tempoExpandidoTotal.textContent =
            formatarTempo(audio.duration);

    }

});


/* =========================
   ARRASTAR BARRA PEQUENA
========================= */

barraProgresso.addEventListener("input", function() {

    if (!audio.duration) {
        return;
    }

    const novoTempo =
        (barraProgresso.value / 100) * audio.duration;

    audio.currentTime = novoTempo;

});


/* =========================
   ARRASTAR BARRA EXPANDIDA
========================= */

barraExpandida.addEventListener("input", function() {

    if (!audio.duration) {
        return;
    }

    const novoTempo =
        (barraExpandida.value / 100) * audio.duration;

    audio.currentTime = novoTempo;

});


/* =========================
   FORMATAR TEMPO
========================= */

function formatarTempo(segundos = 0) {

    if (isNaN(segundos)) {
        return "0:00";
    }

    const minutos = Math.floor(segundos / 60);

    const segundosRestantes =
        Math.floor(segundos % 60);

    return minutos + ":" +
        String(segundosRestantes).padStart(2, "0");

}


/* =========================
   ABRIR PLAYER EXPANDIDO
========================= */

player.addEventListener("click", function(event) {

    /*
       Não abre quando clicar
       nos controles
    */

    if (event.target.closest(".player-controles")) {
        return;
    }


    playerExpandido.classList.add("aberto");

});


/* =========================
   FECHAR PLAYER EXPANDIDO
========================= */

fecharPlayer.addEventListener("click", function() {

    playerExpandido.classList.remove("aberto");

});


/* =========================
   ATUALIZAR PLAYER EXPANDIDO
========================= */

function atualizarPlayerExpandido() {

    nomeExpandido.textContent =
        nomePlayer.textContent;

    artistaExpandido.textContent =
        artistaPlayer.textContent;

    capaExpandida.src =
        capaPlayer.src;

}


/* =========================
   PLAY DO PLAYER EXPANDIDO
========================= */

playExpandido.addEventListener("click", function() {

    if (audio.paused) {

        audio.play();

    } else {

        audio.pause();

    }

});


/* =========================
   MÚSICA ANTERIOR
   PLAYER EXPANDIDO
========================= */

botaoAnteriorExpandido.addEventListener("click", function() {

    tocarMusica(musicaAtual - 1);

});


/* =========================
   PRÓXIMA MÚSICA
   PLAYER EXPANDIDO
========================= */

botaoProximaExpandida.addEventListener("click", function() {

    tocarMusica(musicaAtual + 1);

});

/* =========================
   FAVORITOS
========================= */

let favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];


botoesFavoritos.forEach(function(botao, indice) {

    const musica = musicas[indice];

    const arquivo =
        musica.getAttribute("data-musica");


    /* Verifica se já está favoritada */

    if (favoritos.includes(arquivo)) {

        botao.textContent = "♥";

        botao.classList.add("favoritado");

    }


    /* Clicar no coração */

    botao.addEventListener("click", function(event) {

        event.stopPropagation();


        /* Remover dos favoritos */

        if (favoritos.includes(arquivo)) {

            favoritos = favoritos.filter(
                function(item) {
                    return item !== arquivo;
                }
            );

            botao.textContent = "♡";

            botao.classList.remove("favoritado");

        }


        /* Adicionar aos favoritos */

        else {

            favoritos.push(arquivo);

            botao.textContent = "♥";

            botao.classList.add("favoritado");

        }


        /* Salvar */

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

    });

});