async function init() {
    //récupération de l'id dans l'url
    const photographerId = await getphotographerIdFromUrl()
    //récupération des données du photographe associé à l'id
    const photographer = await getPhotographer(photographerId)
    //affichage des données
    displayData(photographer)

    //recuperation des media liés au photographe
    const medias = await getMedias(photographerId)

    const photos = getFilteredMedia(medias, 'image')
    const videos = getFilteredMedia(medias, 'video')

    //affichage des medias
    const mediasWrapper = document.querySelector('.medias-wrapper')
    displayPhotos(photos, videos, mediasWrapper)

    displayNameInContactModal(photographer)
    const mediastest = document.querySelectorAll(".medias-wrapper .media-index").No
    
    await displayLightBox()
}

async function displayLightBox(){
    const medias = document.querySelectorAll("[media-index]")
    medias.forEach(media => {
        media.addEventListener("click", (e) => {
            e.preventDefault()
            new LightboxModal(media, medias)
        })
    })


}

async function getphotographerIdFromUrl() {
    return new URL(location.href).searchParams.get("id")
}

async function getPhotographer(photographerId) {
    //récupération de photographe dans le fichier.

    const photographer = await new PhotographersApi().getPhotographersById(photographerId)
    return photographer
}

async function displayData(photographer) {
    photographerHeaderTemplate(photographer)
}

async function getMedias(Id) {
    return await new MediasApi().getMedias(Id)
}

function getFilteredMedia(medias, type) {
    const filterMedia = []

    medias.forEach(media => {
        if (Object.hasOwn(media, type)) {
            filterMedia.push(new MediaFactory(media, type))
        }
    })

    return filterMedia
}

function displayPhotos(photos, videos, mediasWrapper) {
    let mediaIndex = 0
    
    photos.forEach(photo => {
        const photoTemplate = new PhotoTemplate(photo, mediasWrapper, mediaIndex)
        photoTemplate.displayPhotoTemplate()
        mediaIndex++
    })

    videos.forEach(video => {
        const videoTemplate = new VideoTemplate(video, mediasWrapper, mediaIndex)
        videoTemplate.displayVideoTemplate()
        mediaIndex++
    })
}

function displayNameInContactModal(photographer){
    const modalHeader = document.querySelector(".modal h2")
    modalHeader.innerHTML += `<br>${photographer.name}`
}

init()