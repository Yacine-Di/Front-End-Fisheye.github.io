async function init() {
    //récupération de l'id dans l'url
    const photographerId = getphotographerIdFromUrl()
    //récupération des données du photographe associé à l'id
    const photographer = await getphotographer(photographerId)
    //affichage des données
    displayData(photographer)

    //recuperation des media liés au photographe
    const medias = await getMedias(photographerId)

    const photos = getFilteredMedia(medias, 'image')
    const videos = getFilteredMedia(medias, 'video')
    //affichage des medias
    const mediasWrapper = document.querySelector('.medias-wrapper')
    displayPhotos(photos,mediasWrapper)
    displayVideos(videos,mediasWrapper)

    displayNameInModal(photographer)
}

function getphotographerIdFromUrl() {
    return new URL(location.href).searchParams.get("id")
}

async function getphotographer(photographerId) {
    //récupération de photographe dans le fichier.
    const photographers = await new PhotographersApi().getPhotographers()
    return photographers.find(photographer => photographer.id == photographerId)
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
    });

    return filterMedia
}

function displayPhotos(photos, mediasWrapper) {

    photos.forEach(photo => {
        const photoTemplate = new PhotoTemplate(photo, mediasWrapper)
        photoTemplate.displayPhotoTemplate()
    });
}

function displayVideos(videos, mediasWrapper) {
    videos.forEach(video => {
        const videoTemplate = new VideoTemplate(video, mediasWrapper)
        videoTemplate.displayVideoTemplate()
    })
}

function displayNameInModal(photographer){
    const modalHeader = document.querySelector(".modal h2")
    modalHeader.innerHTML += `<br>${photographer.name}`
}

init()