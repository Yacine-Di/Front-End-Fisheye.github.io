function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `picture of: ${name}`)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        
        const link = document.createElement('a')
        link.href = `photographer.html?id=${id}`
        link.appendChild(img);
        link.appendChild(h2);

        const locationP = document.createElement('p');
        locationP.textContent = `${city}, ${country}`
        const taglineP = document.createElement('p')
        taglineP.textContent = tagline
        const priceP = document.createElement('p')
        priceP.textContent = `${price}€/jour`

        article.append(link,locationP,taglineP,priceP);
        
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
