console.log("Hello!\n I'll leave this here for later. Can't wait to mess with it some more!");
const revealButton = document.getElementById("revealButton");
const hiddenButtons = document.querySelectorAll(".hiddenButton");
const backButton = document.querySelector(".back");
const initialButtonContainer = document.getElementById("initialButtonContainer");
const hiddenButtonsContainer = document.getElementById("hiddenButtonsContainer");

revealButton.addEventListener("click", () => {
    hiddenButtons.forEach(button => {
        button.style.display = "block";
    });
    initialButtonContainer.style.display = "none";
    backButton.style.display = "block";
});

backButton.addEventListener("click", () => {
    hiddenButtons.forEach(button => {
        button.style.display = "none";
    });
    initialButtonContainer.style.display = "flex";
    backButton.style.display = "none";
});
hiddenButtons.forEach(button => {
    button.addEventListener("click", () => {
        const page = button.dataset.page;
        if (page) {
            window.location.href = page;
        } else {
            console.error("No page specified for this button.");
        }
    });
}); s