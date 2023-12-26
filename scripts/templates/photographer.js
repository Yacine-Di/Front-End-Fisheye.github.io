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

        const p = document.createElement('p');
        p.textContent = `${city}, ${country}`
        
        article.appendChild(link);
        article.appendChild(p)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
