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
const backgroundAnimationContainer = document.getElementById("backgroundAnimationContainer");
const buttonsSpace = document.getElementById("buttonsSpace");

let currentView = "enter"; 
let animationInterval;
let spheres = [];
const sphereImageSrc = 'Assets/websiteSphere2.png'; 
let scrolledSinceBackButton = false;
let animationActive = false; 

function createSphere() {
    const sphere = document.createElement('img');
    sphere.src = sphereImageSrc;
    const size = Math.random() * 50 + 20;
    sphere.style.width = `${size}px`;
    sphere.style.height = `${size}px`;
    sphere.style.position = 'absolute';
    sphere.style.left = `${Math.random() * window.innerWidth}px`;
    sphere.style.bottom = `-${size}px`; 
    sphere.style.opacity = Math.random() * 0.7 + 0.3;
    sphere.speed = Math.random() * 0.5 + 0.2; 
    sphere.rotationAngle = 0; 
    sphere.rotationSpeed = (Math.random() * 0.4 - 0.2) * 1; 
    backgroundAnimationContainer.appendChild(sphere);
    spheres.push(sphere);
}

function animateSpheres() {
    if (animationActive) {
        spheres.forEach(sphere => {
            sphere.style.bottom = `${parseFloat(sphere.style.bottom) + sphere.speed}px`;
            sphere.rotationAngle += sphere.rotationSpeed;
            sphere.style.transform = `rotate(${sphere.rotationAngle}deg)`;

            if (parseFloat(sphere.style.bottom) > window.innerHeight) {
                sphere.remove();
                spheres = spheres.filter(s => s !== sphere);
            }
        });
        requestAnimationFrame(animateSpheres);
    }
}

function startSphereAnimation() {
    if (currentView === "sections" || currentView === "quadrant") {
        animationActive = true;
        animationInterval = setInterval(createSphere, 1500); 
        requestAnimationFrame(animateSpheres);
    }
}

function stopSphereAnimation() {
    animationActive = false;
    clearInterval(animationInterval);
    spheres.forEach(sphere => sphere.remove());
    spheres = [];
}

revealButton.addEventListener("click", () => {
    initialButtonContainer.style.display = "none";
    backButton.style.display = "block";
    body.classList.remove("gradient-background1");
    body.classList.add("gradient-background");
    body.style.overflow = "auto";
    currentView = "sections";
    startSphereAnimation();

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
    if (currentView === "sections") {
        
        buttonsSpace.scrollIntoView({ behavior: 'smooth' });
        currentView = "quadrant"; 
        scrolledSinceBackButton = false;
        startSphereAnimation(); 
    } else if (currentView === "quadrant" && !scrolledSinceBackButton) {
        
        stopSphereAnimation();
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
        });
        backButton.style.display = "none";
        body.classList.remove("gradient-background");
        body.classList.add("gradient-background1");
        body.style.overflow = "hidden";

        copyrightText.style.position = "absolute";
        copyrightText.style.top = "90%";
        copyrightText.style.left = "50%";
        copyrightText.style.transform = "translate(-50%, -50%)";
        currentView = "enter";
    } else if (currentView === "quadrant" && scrolledSinceBackButton) {
        buttonsSpace.scrollIntoView({ behavior: 'smooth' });
        scrolledSinceBackButton = false;
    } else if (currentView === "enter") {
        startSphereAnimation();
    }
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

window.addEventListener('scroll', () => {
    if (currentView === "quadrant") {
        scrolledSinceBackButton = true;
    }
});

revealButton.addEventListener('click', startSphereAnimation);