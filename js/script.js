console.log("Hello!\n I'll leave this here for later. Can't wait to mess with it some more!");
const revealButton = document.getElementById("revealButton");
const hiddenButtonContainers = document.querySelectorAll(".hiddenButtonContainer");
const backButton = document.querySelector(".back");
const initialButtonContainer = document.getElementById("initialButtonContainer");
const hiddenButtonsContainer = document.getElementById("hiddenButtonsContainer");
const hiddenButtons = document.querySelectorAll(".hiddenButton");
const body = document.body;
const copyrightText = document.getElementById("copyrightText");
const resumeContent = document.getElementById("resumeContent");

revealButton.addEventListener("click", () => {
    initialButtonContainer.style.display = "none";
    backButton.style.display = "block";
    body.classList.remove("gradient-background1");
    body.classList.add("gradient-background");
    body.style.overflow = "auto";

    const resumeBottom = resumeContent.offsetTop + resumeContent.offsetHeight;

    copyrightText.style.position = "absolute";
    copyrightText.style.top = `${resumeBottom}px`;
    copyrightText.style.left = "50%";
    copyrightText.style.transform = "translate(-50%, 0)";

    hiddenButtonContainers.forEach((container, index) => {
        container.style.display = "flex";
        requestAnimationFrame(() => {
            container.style.transition = "top 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), left 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)";
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
        });
    });

    hiddenButtons.forEach(button => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 2;
        button.style.animationDelay = `${randomDelay}s`;
        button.style.animationDuration = `${randomDuration}s`;
    });
});

backButton.addEventListener("click", () => {
    hiddenButtonContainers.forEach(container => {
        container.style.transition = "top 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), left 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)";
        container.style.top = "50%";
        container.style.left = "50%";
        setTimeout(() => {
            container.style.display = "none";
            container.style.transition = "none";
        }, 300);
    });
    initialButtonContainer.style.opacity = "0";
    initialButtonContainer.style.display = "flex";
    requestAnimationFrame(() => {
        initialButtonContainer.style.transition = "opacity 1s ease-in-out";
        initialButtonContainer.style.opacity = "1";
    })
    backButton.style.display = "none";
    body.classList.remove("gradient-background");
    body.classList.add("gradient-background1");
    body.style.overflow = "hidden";
    document.getElementById("buttonsSpace").scrollIntoView({ behavior: 'smooth' });

    copyrightText.style.position = "absolute";
    copyrightText.style.top = "90%";
    copyrightText.style.left = "50%";
    copyrightText.style.transform = "translate(-50%, -50%)";
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelector(".aboutButton").addEventListener("click", () => scrollToSection("aboutContent"));
document.querySelector(".projectsButton").addEventListener("click", () => scrollToSection("projectsContent"));
document.querySelector(".linksButton").addEventListener("click", () => scrollToSection("linksContent"));
document.querySelector(".resumeButton").addEventListener("click", () => scrollToSection("resumeContent"));