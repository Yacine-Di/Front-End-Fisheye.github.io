class LightboxModal {
    constructor(media, medias) {
        this._media = media
        this._medias = medias
        this.lightboxWrapper = this.createModal()

        this.modalWrapper = document.querySelector('body')
        this.modalWrapper.appendChild(this.lightboxWrapper)

        const child = this.getChild(this._media.tagName)
        this.lightboxWrapper.querySelector('.icon_img-article').appendChild(child)

        this.onKeyDown = this.onKeyDown.bind(this)
        document.addEventListener('keydown', this.onKeyDown)

    }

    createModal() {
        const dom = document.createElement("article")
        dom.classList.add('media-modal')

        const lightbox = `
            <article class="lightbox">
                <article class="icon_img-article">
                    <img class = "left-media" src="assets/icons/chevron-left.svg" alt="">
                </article>
                <article class="chevron_xmark-article">
                    <img class="close-btn" src="assets/icons/close-red.svg" alt="">
                    <img class= "right-media" src="assets/icons/chevron-right.svg" alt="">
                    </article>
            </article>
        `

        dom.innerHTML = lightbox
        dom.style.display = "flex"

        dom.querySelector(".close-btn").addEventListener("click", this.closeModal.bind(this))
        dom.querySelector(".left-media").addEventListener("click", this.prev.bind(this))
        dom.querySelector(".right-media").addEventListener("click", this.next.bind(this))

        return dom
    }

    /**
     * 
     * @param {MouseEvent / KeyboardEvent} e 
     */
    next(e) {
        e.preventDefault()
        const parentNode = this.lightboxWrapper.querySelector('.icon_img-article')
        const childNode = this.lightboxWrapper.querySelector('.media')
        let index = this._media.getAttribute('media-index')

        index++
        if (index == this._medias.length) {
            index = 0
        }
        this._media = this._medias[index]
        
        parentNode.removeChild(childNode)
        parentNode.appendChild(this.getChild(this._media.tagName))
    }

    prev(e) {
        e.preventDefault()
        const parentNode = this.lightboxWrapper.querySelector('.icon_img-article')
        const childNode = this.lightboxWrapper.querySelector('.media')
        let index = this._media.getAttribute('media-index')

        index--
        if (index < 0) {
            index = this._medias.length - 1
        }
        this._media = this._medias[index]
        
        parentNode.removeChild(childNode)
        parentNode.appendChild(this.getChild(this._media.tagName))
    }

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
            source.setAttribute('type', 'video/mp4')
            source.src = this._media.currentSrc
            video.appendChild(source)
            
            return video
        }
    }

    getMediaTag() {
        if (this._media.tagName === 'IMG') {
            return `<img class="media" src="${this._media.src}" alt="${this._media.title}"></img>`
        } else if (this._media.tagName === 'VIDEO') {
            return `
                <video class="media" controls>
                    <source src="${this._media.currentSrc}" type="video/mp4"/>
                </video>
            `
        }
        return "No Media Found"
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

    /**
     * 
     * @param {int} index 
     */
    getNextMedia(index) {
        index++
        if (index == this._medias.length) {
            index = 0
            this._media = this._medias[index]
        } else {
            this._media = this._medias[index]
        }
    }

    /**
     * 
     * @param {int} index 
     */
    getPreviousMedia(index) {
        index--
        if (index < 0) {
            index = this._medias.length - 1
            this._media = this._medias[index]
        } else {
            this._media = this._medias[index]
        }
    }
}