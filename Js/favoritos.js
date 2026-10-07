const listaFavoritos =
    document.getElementById("lista-favoritos");

const favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];

const quantidadeFavoritos =
    document.getElementById("quantidade-favoritos");

const favoritosVazio =
    document.getElementById("favoritos-vazio");

quantidadeFavoritos.textContent =
    favoritos.length + 
    (favoritos.length === 1 ? " música" : " músicas");


if (favoritos.length === 0) {

    favoritosVazio.style.display = "block";

}

const musicas = [

    {
        arquivo: "Audio/cover1.mp3",
        capa: "Img/PoesiaAcustica.png",
        nome: "Poesia Acustica #2",
        artista: "David Luis - Dls"
    },

    {
        arquivo: "Audio/cover2.mp3",
        capa: "Img/VelhaInfancia.png",
        nome: "Velha Infancia",
        artista: "David Luis - Dls"
    },

    {
        arquivo: "Audio/cover3.mp3",
        capa: "Img/BlocoApaixonados.png",
        nome: "Bloco dos Apaixonados",
        artista: "David Luis - Dls"
    },

    {
        arquivo: "Audio/cover4.mp3",
        capa: "Img/QuemDera.png",
        nome: "Quem me dera",
        artista: "David Luis - Dls"
    },

    {
        arquivo: "Audio/cover5.mp3",
        capa: "Img/PorSupuesto.png",
        nome: "Por Supuesto",
        artista: "David Luis - Dls"
    }

];


musicas.forEach(function(musica) {

    if (!favoritos.includes(musica.arquivo)) {
        return;
    }


    const elemento = document.createElement("div");

    elemento.classList.add("musica");


    elemento.innerHTML = `

        <img
            src="${musica.capa}"
            class="capa-musica"
        >

        <div>

            <p class="nome-musica">
                ${musica.nome}
            </p>

            <p class="artista">
                ${musica.artista}
            </p>

        </div>

    `;


    elemento.addEventListener("click", function() {

        const audio =
            document.getElementById("audio");

        audio.src = musica.arquivo;

        audio.play();

    });


    listaFavoritos.appendChild(elemento);

});