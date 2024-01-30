function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
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