// This data in future contribution should be done using Firebase
const sampleProjects = [
  {
    id: 1,
    title: "Analog Clock Web App",
    description: "A beautifully designed analog clock that updates in real-time using vanilla JavaScript, HTML, and CSS. Perfect for understanding basic DOM manipulation and CSS transformations.",
    repoUrl: "https://github.com/Varshitha713/analog-clock-web-app",
    demoUrl: "https://varshitha713.github.io/analog-clock-web-app/",
    difficulty: "beginner",
    upvotes: 15,
    hasDemo: true,
    hasReadme: true,
    previewImage: "https://github.com/user-attachments/assets/091946a3-d98d-42dc-a22a-90eaefc8b1b1",
    tags: ["JavaScript", "CSS", "HTML", "DOM"]
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description: "A responsive weather application with beautiful animations and detailed forecasts. Features location-based weather data and interactive charts.",
    repoUrl: "https://github.com/example/weather-dashboard",
    demoUrl: "https://example.github.io/weather-dashboard/",
    difficulty: "intermediate",
    upvotes: 28,
    hasDemo: true,
    hasReadme: true,
    previewImage: null,
    tags: ["React", "API", "Charts", "Responsive"]
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A full-featured task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
    repoUrl: "https://github.com/example/task-manager",
    demoUrl: null,
    difficulty: "advanced",
    upvotes: 42,
    hasDemo: false,
    hasReadme: true,
    previewImage: null,
    tags: ["Vue.js", "Drag & Drop", "WebSocket", "PWA"]
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website with smooth animations, dark mode toggle, and optimized performance. Great starting point for personal branding.",
    repoUrl: "https://github.com/example/portfolio",
    demoUrl: "https://example.github.io/portfolio/",
    difficulty: "beginner",
    upvotes: 31,
    hasDemo: true,
    hasReadme: true,
    previewImage: null,
    tags: ["HTML", "CSS", "JavaScript", "Responsive"]
  },
  {
    id: 5,
    title: "Expense Tracker App",
    description: "A simple and intuitive expense tracker app to monitor daily spending, manage budgets, and gain financial insights.",
    repoUrl: "https://github.com/DineshPabboju/Expense-Tracker-App",
    demoUrl: "https://expense-tracker-app-04.netlify.app/",
    difficulty: "intermediate",
    upvotes: 21,
    hasDemo: true,
    hasReadme: false,
    previewImage: "assets/Expense-Tracker-Preview.png",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"]
  },
  {
    id: 6,
    title: "IMDb Clone",
    description: "A responsive IMDb clone showcasing popular movies with detailed info using TMDb API and modern frontend technologies.",
    repoUrl: "https://github.com/Jils31/IMDB-clone",
    demoUrl: "https://imdb-clone-seven-virid.vercel.app/",
    difficulty: "intermediate",
    upvotes: 21,
    hasDemo: true,
    hasReadme: true,
    previewImage: "assets/image.png",
    tags: ["React", "Tailwind CSS", "Responsive", "React-Router DOM"]
  }
];

// Store the current projects array
let currentProjects = [...sampleProjects];

// DOM elements
const projectsContainer = document.getElementById("projects-container");
const loadingElement = document.getElementById("loading");
const emptyStateElement = document.getElementById("empty-state");
const difficultyFilter = document.getElementById("difficulty");
const hasDemoFilter = document.getElementById("has-demo");
const hasReadmeFilter = document.getElementById("has-readme");
const applyFiltersBtn = document.getElementById("apply-filters");
const resetFiltersBtn = document.getElementById("reset-filters");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");

// Initialize the app
function init() {
  setTimeout(() => {
    hideLoading();
    renderProjects(currentProjects);
    setupEventListeners();
    setupNavigation();
    setupDarkMode();
  }, 1000); // Simulate loading time
}

// Hide loading spinner
function hideLoading() {
  loadingElement.style.display = "none";
  projectsContainer.style.display = "grid";
}

// Setup event listeners
function setupEventListeners() {
  applyFiltersBtn.addEventListener("click", applyFilters);
  resetFiltersBtn.addEventListener("click", resetFilters);
  
  // Search functionality
  searchInput.addEventListener("input", handleSearch);
  clearSearchBtn.addEventListener("click", clearSearch);
  
  // Smooth scroll for explore button
  document.querySelector('a[href="#projects"]').addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("projects").scrollIntoView({
      behavior: "smooth"
    });
  });
}

// Setup navigation
function setupNavigation() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navContainer = document.getElementById("navContainer");

  hamburger.addEventListener("click", () => {
    navContainer.classList.toggle("active");
    navMenu.classList.toggle("nav-active");
    hamburger.classList.toggle("open");

    // Toggle aria-expanded for accessibility
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
  });

  // Close menu when clicking on a nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("active");
      navMenu.classList.remove("nav-active");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

// Setup dark mode
function setupDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const icon = document.getElementById("themeIcon");

  // Load preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    icon.textContent = "☀️"; // Sun in dark mode
  } else {
    icon.textContent = "🌙"; // Moon in light mode
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const theme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", theme);

    // Update icon
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  });
}

// Render projects
function renderProjects(projects) {
  if (projects.length === 0) {
    projectsContainer.style.display = "none";
    emptyStateElement.style.display = "block";
    return;
  }

  emptyStateElement.style.display = "none";
  projectsContainer.style.display = "grid";
  
  projectsContainer.innerHTML = projects.map(project => `
    <div class="project-card">
      ${
        project.previewImage
          ? `<img src="${project.previewImage}" alt="${project.title}" class="project-image" 
               onerror="this.outerHTML='<div class=\\'project-placeholder\\'>No Preview Available</div>'">`
          : '<div class="project-placeholder">No Preview Available</div>'
      }
      
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="repo-link">
          <i class="fab fa-github"></i>
        </a>
      </div>
      
      <span class="difficulty-badge difficulty-${project.difficulty}">
        ${project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
      </span>
      
      <p class="project-description">${project.description}</p>
      
      <div class="project-meta">
        ${
          project.hasDemo
            ? '<i class="fas fa-external-link-alt meta-icon"></i> Live Demo Available'
            : '<i class="fas fa-code meta-icon"></i> Code Only'
        }
        ${
          project.hasReadme
            ? ' • <i class="fas fa-file-alt meta-icon"></i> README Included'
            : ' • <i class="fas fa-exclamation-triangle meta-icon"></i> No README'
        }
      </div>
      
      <div class="upvote-section">
        ${
          project.hasDemo && project.demoUrl
            ? `<a href="${project.demoUrl}" target="_blank" class="btn-primary" style="text-decoration: none; padding: 0.5rem 1rem; font-size: 0.875rem;">
                <i class="fas fa-external-link-alt"></i> View Demo
               </a>`
            : "<span></span>"
        }
        <button class="upvote-btn" onclick="handleUpvote(${project.id})">
          <i class="fas fa-arrow-up"></i>
          <span>${project.upvotes}</span>
        </button>
      </div>
    </div>
  `).join("");
}

// Handle upvote
function handleUpvote(projectId) {
  const project = currentProjects.find(p => p.id === projectId);
  if (project) {
    project.upvotes++;
    // Re-render projects to update the upvote count
    renderProjects(applyCurrentFilters());
    
    // Add visual feedback
    const button = event.target.closest(".upvote-btn");
    button.style.transform = "scale(1.1)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 150);
  }
}

// Apply filters
function applyFilters() {
  const filteredProjects = applyCurrentFilters();
  renderProjects(filteredProjects);
}

// Apply current filter settings
function applyCurrentFilters() {
  let filtered = [...sampleProjects];

  const difficulty = difficultyFilter.value;
  const needsDemo = hasDemoFilter.checked;
  const needsReadme = hasReadmeFilter.checked;
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(project => {
      const titleMatch = project.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = project.description.toLowerCase().includes(searchTerm);
      const tagsMatch = project.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      return titleMatch || descriptionMatch || tagsMatch;
    });
  }

  if (difficulty !== "all") {
    filtered = filtered.filter(p => p.difficulty === difficulty);
  }

  if (needsDemo) {
    filtered = filtered.filter(p => p.hasDemo);
  }

  if (needsReadme) {
    filtered = filtered.filter(p => p.hasReadme);
  }

  return filtered;
}

// Handle search input with debounce
let searchTimeout;
function handleSearch() {
  const searchTerm = searchInput.value.trim();
  
  // Show/hide clear button
  if (searchTerm) {
    clearSearchBtn.style.display = "flex";
  } else {
    clearSearchBtn.style.display = "none";
  }
  
  // Clear previous timeout
  clearTimeout(searchTimeout);
  
  // Debounce search to improve performance
  searchTimeout = setTimeout(() => {
    const filteredProjects = applyCurrentFilters();
    renderProjects(filteredProjects);
  }, 300);
}

// Clear search
function clearSearch() {
  searchInput.value = "";
  clearSearchBtn.style.display = "none";
  const filteredProjects = applyCurrentFilters();
  renderProjects(filteredProjects);
}

// Reset filters
function resetFilters() {
  difficultyFilter.value = "all";
  hasDemoFilter.checked = false;
  hasReadmeFilter.checked = false;
  searchInput.value = "";
  clearSearchBtn.style.display = "none";
  renderProjects(sampleProjects);
}

// Form validation
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  
  if (!name || !lastname || !email || !message) {
    alert("Please fill in all fields.");
    return false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email.");
    return false;
  }

  // Show the overlay
  const overlay = document.getElementById("message-overlay");
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";

  // Hide the overlay after 3 seconds
  setTimeout(() => {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
  }, 3000);

  // Clear form
  document.getElementById("contact-form").reset();

  return false; // Prevent actual form submission
}

// Make handleUpvote globally available
window.handleUpvote = handleUpvote;

// Start the app
document.addEventListener("DOMContentLoaded", init);