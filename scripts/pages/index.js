async function getPhotographers() {
    //récupération des photographes dans le fichier.
    return photographers = await new PhotographersApi().getPhotographers()
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    // Affichage des datas
    displayData(photographers);
}

init();

