/* eslint-disable no-undef */
/** 
 * @param {Array[media]} medias tableau de media du photographe
*/
// eslint-disable-next-line no-unused-vars
class SorterForm{
    constructor(medias, likes){
        this._medias = medias
        this._likes = likes

        this.wrapper = document.querySelector(".sorter-form-wrapper")
        this.mediaWrapper = document.querySelector(".medias-wrapper")
    }
    
    /**
     * Fonction réaffichant les medias avec leurs fonctionnalités
     * @param {String} sorter Valeur de trie du formulaire
     */
    sorterMedias(sorter){
        this.clearMediasWrapper()
        let sortedMedias = []
        let mediaIndex = 0

        if(sorter === "POPULARITY"){
            sortedMedias = Array.from(this._medias).sort((a,b) => b.likes - a.likes)
        } else if(sorter === "DATE"){
            sortedMedias = Array.from(this._medias).sort((a,b) => new Date(a.date) - new Date(b.date))
        } else if(sorter === "TITLE"){
            sortedMedias = Array.from(this._medias).sort((a,b) => a.title.localeCompare(b.title))
        }

        sortedMedias.forEach(media =>{
            if("image" in media){
                let photo = new MediaFactory(media, "image")
                const photoTemplate = new PhotoTemplate(photo, this.mediaWrapper, mediaIndex)
                photoTemplate.displayPhotoTemplate()
                mediaIndex++
            } else{
                let video = new MediaFactory(media, "video")
                const videoTemplate = new VideoTemplate(video, this.mediaWrapper, mediaIndex)
                videoTemplate.displayVideoTemplate()
                mediaIndex++
            }
        })

        displayLightBox()
        document.querySelector(".insert span").innerHTML = this._likes
        manageLikes()
    }

    /**
     * Gère l'évènement du formulaire
     */
    onChangeSorter(){
        this.wrapper.querySelector("form").addEventListener("change", e =>{
            const sorter = e.target.value
            this.sorterMedias(sorter)
        })
    }

    clearMediasWrapper(){
        this.mediaWrapper.innerHTML = ""
    }
    /**
     * Créé le formulaire de selection
     */
    createSorterForm(){
        const sorterFrom = `
            <form action="#" method="POST" class="sorter-form" aria-label="Order by">
                <label for="sorter-select">Triez par</label>
                <select name="sorter-select" id="sorter-select">
                    <option value="POPULARITY">Popularité</option>
                    <option class="divider" disabled></option>
                    <option value="DATE">Date</option>
                    <option class="divider" disabled></option>
                    <option value="TITLE">Titre</option>
                </select>
            </form>
        `
    
        this.wrapper.innerHTML = sorterFrom
        this.onChangeSorter()
    }
}