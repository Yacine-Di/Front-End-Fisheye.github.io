class MediaFactory {
    constructor(data, type){
        // Si le type est une image alors je retourne le format image
        if (type === 'image'){
            return new PhotoMedia(data)
        // Sinon regarde si c'est un type mp4
        } else if (type === "video") {
            return new VideoMedia(data)
        // Si c'est aucun des deux alors renvoie une erreur
        } else {
            throw 'Unknow type format'
        }
    }
}