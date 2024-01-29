class DataApi{
    /**
     * 
     * @param {string} url 
     */
    constructor(){
        this._url = "data/photographers.json"
    }

    async get(){
        return fetch(this._url)
            .then(res => res.json())
    }
}

class PhotographersApi extends DataApi{
    constructor(){
        super()
    }

    async getPhotographers(){
        return await this.get().then(res => res.photographers)
    }
}

class MediasApi extends DataApi{
    constructor(){
        super()
    }

    async getMedias(Id){
        const medias = await this.get().then(res => res.media)
        return medias.filter(media => media.photographerId == Id)
    }
}