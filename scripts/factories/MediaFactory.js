/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
class MediaFactory {
    constructor(data, type){
        // Si le type est une image alors je retourne le format image
        if (type === "image"){
            return new PhotoMedia(data)
        // Sinon je regarde si c'est une type video
        } else if (type === "video") {
            return new VideoMedia(data)
        // Si ce n'est aucun des deux alors je renvoie une erreur
        } else {
            throw "Unknow type format"
        }
    }
}