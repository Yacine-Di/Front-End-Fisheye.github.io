//Variables Globales
const mainWrapper = document.querySelector('#main')
const modal = document.getElementById('contact_modal')
const closeButton = document.querySelector('.close-btn')


function displayModal() {
	modal.style.display = "block";
    mainWrapper.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('no-scroll')

    document.addEventListener('keydown', (e) => {
        onKeyDown(e)
    })
}

function onKeyDown(e){
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false'){
        closeModal()
    }
}

function closeModal() {
    modal.setAttribute('aria-hidden', 'true')
    modal.style.display = "none"
    mainWrapper.setAttribute('aria-hidden', 'false')
    document.body.classList.remove('no-scroll')
}

/**
 * Traitement du formulaire
 */
const form = document.querySelector("form")
form.addEventListener("submit", (event) =>{
    event.preventDefault()

    let prenomInput = document.getElementById("firstName")
    let nomInput = document.getElementById("lastName")
    let emailInput = document.getElementById("email")
    let messageInput = document.getElementById("message")

    let prenom = prenomInput.value
    let nom = nomInput.value
    let email = emailInput.value
    let message = messageInput.value

    console.log(prenom, nom, email , message)
})