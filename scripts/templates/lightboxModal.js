class LightboxModal {
    constructor(media, medias) {
        this._media = media
        this._medias = medias
        this.lightboxWrapper = this.createModal()

        this.modalWrapper = document.querySelector('body')
        this.modalWrapper.appendChild(this.lightboxWrapper)
        
        const htmlChild = this.getChild(this._media.tagName)
        this.lightboxWrapper.querySelector('.icon_img-article').appendChild(htmlChild)

        this.onKeyDown = this.onKeyDown.bind(this)
        document.addEventListener('keydown', this.onKeyDown)

    }
        
    createModal() {
        const dom = document.createElement("article")
        dom.classList.add('media-modal')
        dom.setAttribute('aria-label', "image closeup view")

        const lightbox = `
            <article class="lightbox">
                <article class="icon_img-article">
                    <img class = "left-media" src="assets/icons/chevron-left.svg" alt="Previous image">
                </article>
                <article class="chevron_xmark-article">
                    <img class="close-btn" src="assets/icons/close-red.svg" alt="Close dialog">
                    <img class= "right-media" src="assets/icons/chevron-right.svg" alt="Next image">
                </article>
            </article>
            <p>${this._media.title}</p>
        `

        dom.innerHTML = lightbox
        dom.style.display = "flex"

        dom.querySelector(".close-btn").addEventListener("click", this.closeModal.bind(this))
        dom.querySelector(".left-media").addEventListener("click", this.prev.bind(this))
        dom.querySelector(".right-media").addEventListener("click", this.next.bind(this))

        return dom
    }

    /**
     * Passe au media suivant et met à jour et la lightbox avec l'index
     * @param {MouseEvent / KeyboardEvent} e 
     */
    next(e) {
        e.preventDefault()
        let index = this._media.getAttribute('media-index')
        index++
        if (index == this._medias.length) {
            index = 0
        }
        this._media = this._medias[index]
        this.changeMedia()
    }
    
    /**
     * Passe au media précédent et met à jour et la lightbox avec l'index
     * @param {MouseEvent / KeyboardEvent} e 
     */
    prev(e) {
        e.preventDefault()

        let index = this._media.getAttribute('media-index')

        index--
        if (index < 0) {
            index = this._medias.length - 1
        }
        this._media = this._medias[index]
        this.changeMedia()
    }

    /**
     * Met à jour l'affichage de la lightbox
     */
    changeMedia(){
        const parentNode = this.lightboxWrapper.querySelector('.icon_img-article')
        const childNode = this.lightboxWrapper.querySelector('.media')
        const titleNode = this.lightboxWrapper.querySelector('.media-modal p')

        parentNode.removeChild(childNode)
        parentNode.appendChild(this.getChild(this._media.tagName))
        titleNode.innerHTML = ""
        titleNode.innerHTML = this._media.title
    }

    /**
     * 
     * @param {STRING} tagName 
     * @returns {Image / Video}
     */
    getChild(tagName){
        if(tagName === 'IMG'){
            const img = new Image()
            img.src = this._media.src
            img.alt = this._media.title
            img.classList.add('media')

            return img
        } else{
            const video = document.createElement('video')
            const source = document.createElement('source')
            video.classList.add('media')
            video.controls = "controls"
            video.setAttribute('aria-label', this._media.title)
            source.setAttribute('type', 'video/mp4')
            source.src = this._media.currentSrc
            video.appendChild(source)

            return video
        }
    }

    /**
     * Ferme la lightbox
     * @param {MouseEvent} e 
     */
    closeModal(e) {
        e.preventDefault()
        this.lightboxWrapper.style.display = "none"
        this.lightboxWrapper.parentElement.removeChild(this.lightboxWrapper)
        document.removeEventListener('keydown', this.onKeyDown)
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyDown(e) {
        if (e.key === 'Escape') {
            this.closeModal(e)
        } else if(e.key === 'ArrowRight'){
            this.next(e)
        } else if(e.key === 'ArrowLeft'){
            this.prev(e)
        }
    }
}