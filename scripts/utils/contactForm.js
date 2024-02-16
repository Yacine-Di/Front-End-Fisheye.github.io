const mainWrapper = document.querySelector('#main')
const modal = document.getElementById("contact_modal")

function displayModal() {
	modal.style.display = "block";
    mainWrapper.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')
}

function closeModal() {
    modal.setAttribute('aria-hidden', 'true')
    modal.style.display = "none"
    mainWrapper.setAttribute('aria-hidden', 'false')
}

const form = document.querySelector("form")
form.addEventListener("submit", (event) =>{
    event.preventDefault()

    let prenomInput = document.getElementById("prenom")
    let nomInput = document.getElementById("nom")
    let emailInput = document.getElementById("email")
    let messageInput = document.getElementById("message")

    let prenom = prenomInput.value
    let nom = nomInput.value
    let email = emailInput.value
    let message = messageInput.value

    console.log(prenom, nom, email , message)
})