console.log("Hello!\n I'll leave this here for later. Can't wait to mess with it some more!");
const revealButton = document.getElementById("revealButton");
const hiddenButtonContainers = document.querySelectorAll(".hiddenButtonContainer");
const backButton = document.querySelector(".back");
const initialButtonContainer = document.getElementById("initialButtonContainer");
const hiddenButtonsContainer = document.getElementById("hiddenButtonsContainer");

revealButton.addEventListener("click", () => {
    initialButtonContainer.style.display = "none";
    backButton.style.display = "block";

    hiddenButtonContainers.forEach((container, index) => {
        container.style.display = "flex"; // Show the container
        setTimeout(() => {
            if (index === 0) {
                container.style.top = "25%";
                container.style.left = "25%";
            } else if (index === 1) {
                container.style.top = "25%";
                container.style.left = "75%";
            } else if (index === 2) {
                container.style.top = "75%";
                container.style.left = "25%";
            } else if (index === 3) {
                container.style.top = "75%";
                container.style.left = "75%";
            }
        }, 50); // Delay slightly for the display to update
        container.style.transition = "top 0.4s ease-out, left 0.4s ease-out"; // Add transition
    });
});

backButton.addEventListener("click", () => {
    hiddenButtonContainers.forEach(container => {
        container.style.transition = "top 0.2s ease-in, left 0.2s ease-in"; // Add transition back
        container.style.top = "50%";
        container.style.left = "50%";
        setTimeout(() => {
            container.style.display = "none";
            container.style.transition = "none"; // Remove transition after animation
        }, 200); // Match the transition time
    });
    initialButtonContainer.style.opacity = "0"; // Start with opacity 0
    initialButtonContainer.style.display = "flex";
    requestAnimationFrame(() => {
        initialButtonContainer.style.transition = "opacity 0.6s ease-in-out";
        initialButtonContainer.style.opacity = "1"; // Fade in
    })
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
});