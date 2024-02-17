/* eslint-disable no-unused-vars */
function photographerHeaderTemplate(photographer){
    const { name, portrait, city, country, tagline } = photographer
    const picture = `assets/photographers/${portrait}`

    const photographerHeader = document.querySelector(".photographer-header")

    const article = document.createElement("article")
    const h1 = document.createElement("h1")
    h1.textContent = name

    const locationP = document.createElement("p")
    locationP.textContent = `${city}, ${country}`
    const taglineP = document.createElement("p")
    taglineP.textContent = tagline
    article.append(h1, locationP, taglineP)


    const img = document.createElement("img")
    img.setAttribute("src", picture)
    img.setAttribute("alt", name)

    const button = document.querySelector(".contact_button")
    photographerHeader.prepend(article, button)
    photographerHeader.appendChild(img)
}