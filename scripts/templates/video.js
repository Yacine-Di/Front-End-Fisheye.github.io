class VideoTemplate{
    constructor(video, mediasWrapper, mediaIndex){
        this._video = video
        this._mediasWrapper = mediasWrapper
        this._mediaIndex = mediaIndex
    }

    displayVideoTemplate() {
            const player = `
                <video media-index="${this._mediaIndex}" title="${this._video.title}">
                    <source src="${this._video.path}" type="video/mp4"/>
                </video>
                <article>
                    <p>${this._video.title}</p>
                    <p><span>${this._video.likes}</span> <i class="fa-solid fa-heart" liked="false"></i></p>
                </article>
            `
            const videoWrapper = document.createElement('article')
            videoWrapper.innerHTML = player
            this._mediasWrapper.appendChild(videoWrapper)
    }
}


