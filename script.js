const characterInfo = {
    bio: "",
    abilities: "",
    power: ""
};

document.querySelector(".Bio").addEventListener("click", function() {
    fetchCharacterInfo("bio");
});

document.querySelector(".Abilities").addEventListener("click", function() {
    fetchCharacterInfo("abilities");
});

document.querySelector(".Power").addEventListener("click", function() {
    fetchCharacterInfo("power");
});

function fetchCharacterInfo(infoType) {
    const characterName = document.querySelector("#characterInput").value.toLowerCase();

    // Fetch JSON data from the URL
    fetch("https://raw.githubusercontent.com/andrewbaisden/dragonball-character-database/master/client/db.json")
        .then(response => response.json())
        .then(data => {
            const character = data.characters.find(char => char.name.toLowerCase() === characterName);

            if (character) {
                characterInfo.bio = character.bio;
                characterInfo.abilities = character.abilities;
                characterInfo.power = `Health: ${character.health}\nAttack: ${character.attack}\nDefense: ${character.defense}`;
                displayCharacterInfo(infoType);
            } else {
                alert("Character not found. Please enter a valid character name.");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function displayCharacterInfo(infoType) {
    // Clear all paragraphs first
    const paragraphs = document.querySelectorAll(".character-info p");
    paragraphs.forEach(paragraph => {
        paragraph.textContent = "";
    });

    const characterInfoParagraph = document.querySelector(`.${infoType}`);
    characterInfoParagraph.textContent = characterInfo[infoType];
}