function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        
        const link = document.createElement('a')
        link.href = "#"
        link.appendChild(img);
        link.appendChild(h2);

        const locationP = document.createElement('p');
        locationP.textContent = `${city}, ${country}`
        const taglineP = document.createElement('p')
        taglineP.textContent = tagline
        const priceP = document.createElement('p')
        priceP.textContent = `${price}€/jour`

        article.appendChild(link);
        article.appendChild(locationP)
        article.appendChild(taglineP)
        article.appendChild(priceP)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
