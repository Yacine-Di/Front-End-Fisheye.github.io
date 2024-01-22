async function init(){
    //récupération de l'id dans l'url
    const photographerId = getphotographerId()
    console.log(photographerId)
    //récupération des données du photographe associé à l'id
    const photographer = await getphotographer(photographerId)
    //affichage des données
    displayData(photographer)

    //recuperation des media liés au photographe
    const medias = await getMedias(photographerId)

    const photos =  getFilteredMedia(medias,'image')
    const videos = getFilteredMedia(medias,'video')
    //affichage des medias
    displayMedia(photos)
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
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerModel = photographerTemplate(photographer);
    const article = document.createElement('article')
    const h1 = document.createElement( 'h1' )
    h1.textContent = photographerModel.name

    const locationP = document.createElement('p')
    locationP.textContent = `${photographerModel.city}, ${photographerModel.country}`
    const taglineP = document.createElement('p')
    taglineP.textContent = photographerModel.tagline
    article.appendChild(h1)
    article.appendChild(locationP)
    article.appendChild(taglineP)

    const img = document.createElement( 'img' )
    img.setAttribute("src", photographerModel.picture)
    img.setAttribute("alt", `picture of: ${photographerModel.name}`)

    const button = document.querySelector(".contact_button")
    photographerHeader.prepend(article, button)
    photographerHeader.appendChild(img)
}

async function getMedias(Id){
    const data = await fetch("data/photographers.json").then(data => data.json())
    const medias = data.media.filter(medias => medias.photographerId == Id)
    
    return medias
}

async function getFilteredMedia(medias, type){
    const filterMedia = []

    medias.forEach(media => {
        if(Object.hasOwn(media, type)){
            filterMedia.push(new MediaFactory(media, type))
        }
    });
    console.log(filterMedia)

    return filterMedia
}

async function displayMedia(medias){

}

init()