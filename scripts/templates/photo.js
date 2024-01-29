class PhotoTemplate{
    constructor(photo, mediasWrapper){
        this._photo = photo
        this._mediasWrapper = mediasWrapper
    }

    displayPhotoTemplate(){
        const mediaWrapper = document.createElement('article')

        const imgWrapper = document.createElement('img')
        imgWrapper.setAttribute("src", this._photo.image)

        const titleAndLikeWrapper = document.createElement('article')
        const title = document.createElement('p')
        title.innerHTML = this._photo.title
        const like = document.createElement('p')
        const heartIcon = `<i class="fa-solid fa-heart"></i>`
        like.innerHTML = `${this._photo.likes} ${heartIcon}`
        titleAndLikeWrapper.append(title, like)

        mediaWrapper.append(imgWrapper, titleAndLikeWrapper)
        this._mediasWrapper.appendChild(mediaWrapper)
    }
}