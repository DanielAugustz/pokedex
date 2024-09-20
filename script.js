function temLetra(char) {
    return /^[a-zA-Z]$/.test(char);
}

let idAtual = null;

async function procurarPokemon() {
    const input = document.getElementById("pokemonInput").value.toLowerCase();
    const pokeBackground = document.getElementById("pokeBackground");
    const pokeImg = document.getElementById("pokeImg");
    const pokeDetalhes = document.getElementById("pokemonDetalhes");
    const pokeStatus = document.getElementById("pokemonStatus");
    const pokemonContainer = document.getElementById("pokemonContainer");
    
    if (!temLetra(input) && (input < 0 || input > 151)) {
        alert("Pokémon não encontrado");
        location.reload()
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}?limit=1`);
        if (!response.ok) throw new Error(`Pokémon não encontrado`);
        const data = await response.json();

        pokemonContainer.style.display = "flex";

        const nome = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        idAtual = data.id.toString(); 
        const img = data.sprites.versions['generation-i']['red-blue'].front_transparent;
        const tipos = data.types.map(typeInfo => typeInfo.type.name);
        const tipoBackground = backgroundTipo(tipos[0]);
        
        const hp = data.stats.find(stat => stat.stat.name === "hp").base_stat;
        const ataque = data.stats.find(stat => stat.stat.name === "attack").base_stat;
        const defesa = data.stats.find(stat => stat.stat.name === "defense").base_stat;

        pokeBackground.style.backgroundColor = tipoBackground;
        pokeImg.innerHTML = `<img src="${img}" alt="${nome}">`; 
        pokeDetalhes.innerHTML = `
            <h2 id="pokeNome">${nome} (#${idAtual})</h2>
            <p id="pokeTipo"><strong>Tipo: ${tipos.join(', ')}</strong></p>
            <p id="pokeAltura"><strong>Altura:</strong> ${data.height / 10} m</p>
            <p id="pokePeso"><strong>Peso:</strong> ${data.weight / 10} kg</p>
         `;
        pokeStatus.innerHTML = `
            <p id="pokeHp"><strong>HP:</strong> ${hp}</p>
            <p id="pokeAtaque"><strong>Ataque:</strong> ${ataque}</p>
            <p id="pokeDefesa"><strong>Defesa:</strong> ${defesa}</p>      
        `;
    } catch (error) {
        alert("Pokémon não encontrado");
        location.reload();
    }
}

let voltar_btn = document.getElementById("voltar_btn");
let passar_btn = document.getElementById("passar_btn");

voltar_btn.addEventListener("click", () => {
    const input = document.getElementById("pokemonInput");
    if (idAtual > 1) {
        input.value = parseInt(idAtual) - 1;
        procurarPokemon();
    } else{
        alert("Você ja esta no Primeiro Pokemon")
    }
});

passar_btn.addEventListener("click", () => {
    const input = document.getElementById("pokemonInput");
    if (idAtual < 151) {
        input.value = parseInt(idAtual) + 1;
        procurarPokemon();
    } else{
        alert("Você ja esta no Ultimo Pokemon")
    }
});

function backgroundTipo(type) {
    const typeColors = {
        normal: "#A8A878",
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#F0B6BC'
    };
    return typeColors[type] || '#ffffff';
}
