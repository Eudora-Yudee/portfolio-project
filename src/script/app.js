const projectContainer = document.getElementById("projectContainer");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("dark")) {
      icon.classList.remove("mdi-weather-night");
      icon.classList.add("mdi-white-balance-sunny");
    } else {
      icon.classList.remove("mdi-white-balance-sunny");
      icon.classList.add("mdi-weather-night");
    }
  });
}

function renderProjects() {
  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    card.innerHTML = `
      <img src="${project.image}" alt="${project.name}">
      <div class="project-content">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-links">
          <a href="${project.liveLink}" target="_blank">View Live Site</a>
        </div>
      </div>`;

    projectContainer.appendChild(card);
  });
}

renderProjects();

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
