// Query for buttons
let themeButton = document.getElementById("theme-button");
let themeIcon = document.getElementById("theme-icon");
let signNowButton = document.getElementById("sign-now-button");

let count = 0;

// Toggles dark mode on and off
const toggleDarkMode = () => {

    document.body.classList.toggle("dark-mode");

    // Change the image based on the current mode
      if (document.body.classList.contains("dark-mode")) {
        themeIcon.src = "/img/dark-mode-button.png"; 
        themeIcon.alt = "dark mode button";
      } else {
        themeIcon.src = "/img/light-mode-button.png"; 
        themeIcon.alt = "light mode button";
      }
}

const addSignature = (person) => {
    // Write your code to manipulate the DOM here
    const signature = document.createElement("p");
    signature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;

    const signaturesSection = document.querySelector(".signatures");
    signaturesSection.appendChild(signature);

    // Reset the form inputs
    nameInput.value = "";
    hometownInput.value = "";
    emailInput.value = "";

    // Remove the old counter if it exists
    const oldCounter = document.querySelector(".signature-counter");
    if (oldCounter) {
        oldCounter.remove();
    }

    // Create and append the new counter
    const counterElement = document.createElement("p");
    counterElement.classList.add("signature-counter");
    count += 1;
    counterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
    signaturesSection.appendChild(counterElement);
}

const toggleModal = (person) => {
    let modal = document.getElementById("thanks-modal");
    let modalContent = document.getElementById("thanks-modal-content");

    modal.style.display = "flex";
    modalContent.textContent = `Thank you so much ${person.name}!`;

    setTimeout(() => {
        modal.style.display = "none";
    }, 4000);
}

const validateForm = () => {
    let containsErrors = false;
    let petitionInputs = document.getElementById("sign-petition").elements;
    let person = {
        name: petitionInputs[0].value,
        hometown: petitionInputs[1].value,
        email: petitionInputs[2].value
    }

    for (let i = 0; i < petitionInputs.length; i++) {
        if (petitionInputs[i].value.length < 2) {
            petitionInputs[i].classList.add('error');
            containsErrors = true;
        } else {
            petitionInputs[i].classList.remove('error');
        }
    }

    const email = document.getElementById('email');
    if (!email.value.includes('.com')) {
        containsErrors = true;
        email.classList.add('error');
    } else {
        email.classList.remove('error');
    }

    if (!containsErrors) {
        addSignature(person);
        toggleModal(person);
        for (let i = 0; i < petitionInputs.length; i++) {
            petitionInputs[i].value = "";
        }
        containsErrors = false;
    }
}

let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add('active');
        } else {
            revealableContainers[i].classList.remove('active');
        }
    }
}

// Register a 'click' event listener for the buttons
themeButton.addEventListener("click", toggleDarkMode);
signNowButton.addEventListener("click", validateForm);
window.addEventListener('scroll', reveal);
