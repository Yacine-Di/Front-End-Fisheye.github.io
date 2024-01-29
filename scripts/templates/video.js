class VideoTemplate{
    constructor(video, mediasWrapper){
        this._video = video
        this._mediasWrapper = mediasWrapper
    }

    displayVideoTemplate() {
            const player = `
                <video controls width="200" height="200">
                    <source src="${this._video.video}" type="video/mp4"/>
                </video>
                <article>
                    <p>${this._video.title}</p>
                    <p>${this._video.likes} <i class="fa-solid fa-heart"></i></p>
                </article>
            `
            const videoWrapper = document.createElement('article')
            videoWrapper.innerHTML = player
            this._mediasWrapper.appendChild(videoWrapper)
    }
}


