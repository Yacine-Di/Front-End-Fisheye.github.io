async function init(){
    //récupération de l'id dans l'url
    const photographerId = getphotographerId()
    console.log(photographerId)
    //récupération des données du photographe associé à l'id
    const photographer = await getphotographer(photographerId)
    //affichage des données
    displayData(photographer)
}

function getphotographerId(){
    return new URL(location.href).searchParams.get("id")
}

async function getphotographer(photographerId){
    //récupération de photographe dans le fichier.
    const data = await fetch("data/photographers.json").then(data => data.json())
    const photographer = data.photographers.find(photographer => photographer.id == photographerId)
    
    return photographer
}

async function displayData(photographer){
    const { name, portrait, city, country, tagline} = photographer;
    const picture = `assets/photographers/${portrait}`;

    const photographerHeader = document.querySelector(".photograph-header")
    const article = document.createElement('article')
    const h1 = document.createElement( 'h1' )
    h1.textContent = name
    const locationP = document.createElement('p')
    locationP.textContent = `${city}, ${country}`
    const taglineP = document.createElement('p')
    taglineP.textContent = tagline
    article.appendChild(h1)
    article.appendChild(locationP)
    article.appendChild(taglineP)

    const img = document.createElement( 'img' )
    img.setAttribute("src", picture)
    img.setAttribute("alt", `picture of: ${name}`)

    const button = document.querySelector(".contact_button")
    photographerHeader.prepend(article, button)
    photographerHeader.appendChild(img)
}

init()