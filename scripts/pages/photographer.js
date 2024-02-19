/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
async function init() {
    //récupération de l'id dans l'url
    const photographerId = new URL(location.href).searchParams.get("id")

    //récupération des données du photographe associé à l'id
    const photographer = await new PhotographersApi().getPhotographersById(photographerId)

    //affichage des données
    photographerHeaderTemplate(photographer)

    //recuperation des media liés au photographe
    const medias = await new MediasApi().getMedias(photographerId)

    const photos = getFilteredMedia(medias, "image")
    const videos = getFilteredMedia(medias, "video")

    //affichage de l'encart des likes totaux
    const likes = await displayInsert(medias, photographer)

    //affichage des medias
    const mediasWrapper = document.querySelector(".medias-wrapper")
    displayMedias(photos, videos, mediasWrapper)

    manageLikes()
    //affichage du nom dans la modal de contact et ajout de aria-labelledby
    const modalHeader = document.querySelector(".modal h2")
    modalHeader.innerHTML += `<br>${photographer.name}`

    await displayLightBox()

    const Sorter = new SorterForm(medias, likes)
    Sorter.createSorterForm()
}

async function manageLikes() {
    const insertLikesNode = document.querySelector(".insert span")

    document.querySelectorAll(".medias-wrapper .fa-heart")
        .forEach(like => {
            like.addEventListener("click", (e) => {
                e.preventDefault()

                if (like.getAttribute("liked") === "false") {
                    updateLikes(1, e, insertLikesNode)
                    like.setAttribute("liked", "true")

                } else {
                    updateLikes(-1, e, insertLikesNode)
                    like.setAttribute("liked", "false")
                }
            })
        })
}

/**
 * @param {number} value +1 ou -1 suivant si on ajout ou retire un like
 * @param {MouseEvent} e click à la souris sur le coeur
 * @param {Node} insertLikesNode la node contenant les likes à mettre à jour
 */
async function updateLikes(value, e, insertLikesNode) {
    let totalLikes = parseInt(insertLikesNode.innerText)
    totalLikes += value

    let mediaLikesNode = e.currentTarget.parentNode.querySelector("span")
    let currentLikes = parseInt(mediaLikesNode.textContent)
    currentLikes += value

    mediaLikesNode.textContent = `${currentLikes}`
    insertLikesNode.textContent = `${totalLikes}`
}

/**
 * 
 * @param {Array[media]} medias 
 * @param {object} photographer 
 */
async function displayInsert(medias, photographer) {
    const insert = document.createElement("article")
    insert.classList.add("insert")

    let likes = 0
    medias.forEach(media => {
        likes += media.likes
    })

    insert.innerHTML = `
        <p><span>${likes}</span> <i class="fa-solid fa-heart"></i></p>
        <p>${photographer.price}€ / jour</p>
    `
    document.querySelector("body").appendChild(insert)

    return likes
}

/**
 * Affiche la lightbox lors du clique sur l'un des medias
 */
async function displayLightBox() {
    const medias = document.querySelectorAll("[media-index]")

    medias.forEach(media => {
        media.addEventListener("click", (e) => {
            e.preventDefault()
            new LightboxModal(media, medias)
        })

        media.parentNode.addEventListener("keydown", (e) => {
            //pas de e.preventdefault() sinon le TAB ne se bloque
            if (e.key === "Enter") {
                new LightboxModal(media, medias)
            }
        })
    })
}

/**
 * 
 * @param {Array[media]} medias 
 * @param {string} type 
 * @returns {Array[filteredMedia]}
 */
function getFilteredMedia(medias, type) {
    const filteredMedia = []

    medias.forEach(media => {
        if (Object.hasOwn(media, type)) {
            filteredMedia.push(new MediaFactory(media, type))
        }
    })

    return filteredMedia
}

function displayMedias(photos, videos, mediasWrapper) {
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

init()