/** 
 * @param {Array[media]} medias tableau de media du photographe
*/
class SorterForm{
    constructor(medias){
        this._medias = medias

        this.wrapper = document.querySelector('.sorter-form-wrapper')
        this.mediaWrapper = document.querySelector('.medias-wrapper')
    }



    /**
     * Gère l'évènement du formulaire
     */
    onChangeSorter(){
        this.wrapper.querySelector('form').addEventListener('change', e =>{
            const sorter = e.target.value
            this.sorterMedias(sorter)
        })
    }
    /**
     * Créé le formulaire de selection
     */
    createSorterForm(){
        const sorterFrom = `
            <form action="#" method="POST" class="sorter-form">
                <label for="sorter-select">Triez par date de sortie : </label>
                <select name="sorter-select" id="sorter-select">
                    <option value="">Popularité</option>
                    <option value="DATE">Date</option>
                    <option value="TITLE">Titre</option>
                </select>
            </form>
        `
    
        this.wrapper.innerHTML = sorterFrom
        this.onChangeSorter()
    }
}