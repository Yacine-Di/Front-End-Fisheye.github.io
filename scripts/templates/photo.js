// eslint-disable-next-line no-unused-vars
class PhotoTemplate{
    constructor(photo, mediasWrapper, mediaIndex){
        this._photo = photo
        this._mediasWrapper = mediasWrapper
        this._mediaIndex = mediaIndex
    }

    displayPhotoTemplate(){
        const mediaWrapper = document.createElement("article")
        const link = document.createElement("a")
        link.href = "#"
        link.setAttribute("aria-label", `Press enter to open closeup view of ${this._photo.title}"`)
        
        const imgWrapper = document.createElement("img")
        imgWrapper.setAttribute("src", this._photo.path)
        imgWrapper.setAttribute("alt", this._photo.title)
        imgWrapper.setAttribute("title", this._photo.title)
        imgWrapper.setAttribute("media-index", this._mediaIndex)
        imgWrapper.setAttribute("aria-label", `${this._photo.title} closeup view`)
        link.appendChild(imgWrapper)

        const titleAndLikeWrapper = document.createElement("article")
        const title = document.createElement("p")
        title.innerHTML = this._photo.title
        const like = document.createElement("p")
        const heartIcon = "<i class=\"fa-solid fa-heart\" liked=\"false\" aria-label=\"likes\"></i>"
        like.innerHTML = `<span>${this._photo.likes}</span> ${heartIcon}`
        titleAndLikeWrapper.append(title, like)

        mediaWrapper.append(link, titleAndLikeWrapper)
        this._mediasWrapper.appendChild(mediaWrapper)
    }
}