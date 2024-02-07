class LightboxModal {
    constructor(media, medias) {
        this._media = media
        this._medias = medias
        this.lightboxWrapper = document.createElement("article")
        this.lightboxWrapper.classList.add('media-modal')

        this.modalWrapper = document.querySelector('body')
    }

    createModal() {
        this.lightboxWrapper.innerHTML = ""
        let mediaTag = this.getMediaTag()

        const lightbox = `
            <article class="lightbox">
                <article class="icon_img-article">
                    <img class = "left-media" src="assets/icons/chevron-left.svg" alt="">
                    ${mediaTag}
                </article>
                <article class="chevron_xmark-article">
                    <img class="close-btn" src="assets/icons/close-red.svg" alt="">
                    <img class= "right-media" src="assets/icons/chevron-right.svg" alt="">
                    </article>
            </article>
        `
        this.lightboxWrapper.innerHTML = lightbox

        this.lightboxWrapper.style.display = "flex"
        this.modalWrapper.appendChild(this.lightboxWrapper)

        this.closeModal()
        this.changeMedia(this._medias)
    }

    getMediaTag() {
        if(this._media.tagName === 'IMG') {
            return `<img class="picture" src="${this._media.src}" alt="m${this._media.title}"></img>`
        } else if(this._media.tagName === 'VIDEO'){
            return `
                <video controls width="200" height="200">
                    <source src="${this._media.currentSrc}" type="video/mp4"/>
                </video>
            `
        }else{
            return "No Media Found"
        }
    }

    closeModal() {
        this.lightboxWrapper
            .querySelector(".close-btn")
            .addEventListener("click", () => {
                this.lightboxWrapper.classList.remove('media-modal')
                this.lightboxWrapper.innerHTML = ""
            })
    }

    changeMedia(medias) {
        const leftChevron = document.querySelector(".left-media")
        let index = this._media.getAttribute('media-index')

        leftChevron.addEventListener('click', () =>{
            index--
            if(index < 0){
                index = medias.length - 1
                this._media = medias[index]
            } else{
                this._media = medias[index]
            }
            this.createModal()
        })
    }

}