// ================= Project Data =================
const sampleProjects = [
  {
    id: 1,
    title: 'Analog Clock Web App',
    description: 'A beautifully designed analog clock that updates in real-time using vanilla JavaScript, HTML, and CSS.',
    repoUrl: 'https://github.com/snehhhcodes/Analog-Clock-Web-App',
    demoUrl: 'https://snehhhcodes.github.io/Analog-Clock-Web-App/',
    difficulty: 'beginner',
    upvotes: 15,
    hasDemo: true,
    hasReadme: true,
    previewImage: 'assets/Preview.png',
    tags: ['JavaScript', 'CSS', 'HTML', 'DOM']
  },
  {
    id: 2,
    title: 'Weather Dashboard',
    description: 'A responsive weather application with beautiful animations and detailed forecasts.',
    repoUrl: 'https://github.com/Shivin1016/weatherApp',
    demoUrl: 'https://shivin1016.github.io/weatherApp/',
    difficulty: 'intermediate',
    upvotes: 28,
    hasDemo: true,
    hasReadme: true,
    previewImage: "assets/weatherPreview.png",
    tags: ['JavaScript','HTML', 'CSS', "API"]
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A full-featured task management app with drag-and-drop functionality and team collaboration.',
    repoUrl: 'https://github.com/example/task-manager',
    demoUrl: null,
    difficulty: 'advanced',
    upvotes: 42,
    hasDemo: false,
    hasReadme: true,
    previewImage: null,
    tags: ['Vue.js', 'Drag & Drop', 'WebSocket', 'PWA']
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website with smooth animations, dark mode toggle, and optimized performance. Great starting point for personal branding.',
    repoUrl: 'https://github.com/Nsanjayboruds/Template-hub',
    demoUrl: 'https://templateshub.netlify.app/',
    difficulty: 'intermediate',
    upvotes: 31,
    hasDemo: true,
    hasReadme: true,
    previewImage: 'assets/templates.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive']
  },
  {
    id: 5,
    title: 'Expense Tracker App',
    description: 'A simple and intuitive expense tracker app to monitor daily spending and budgets.',
    repoUrl: 'https://github.com/DineshPabboju/Expense-Tracker-App',
    demoUrl: 'https://expense-tracker-app-04.netlify.app/',
    difficulty: 'intermediate',
    upvotes: 21,
    hasDemo: true,
    hasReadme: false,
    previewImage: 'assets/Expense-Tracker-Preview.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive']
  },
  {
    id: 6,
    title: 'IMDb Clone',
    description: 'A responsive IMDb clone showcasing popular movies with TMDb API.',
    repoUrl: 'https://github.com/Jils31/IMDB-clone',
    demoUrl: 'https://imdb-clone-seven-virid.vercel.app/',
    difficulty: 'intermediate',
    upvotes: 21,
    hasDemo: true,
    hasReadme: true,
    previewImage: 'assets/image.png',
    tags: ['React', 'Tailwind CSS', 'Responsive', 'React-Router DOM']
  },
  {
    id: 7,
    title: 'Password Generator',
    description: 'Generates secure passwords with customizable options.',
    repoUrl: 'https://github.com/Sitaram8472/Generate-password',
    demoUrl: 'https://password-generator021.netlify.app/',
    difficulty: 'advanced',
    upvotes: 42,
    hasDemo: true,
    hasReadme: true,
    previewImage: 'assets/GeneratePassword.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive']
  },
  {
  id: 8,
  title: 'Unit Converter',
  description: 'A simple and responsive unit converter that allows users to convert between length, weight, and temperature with real-time results.',
  repoUrl: 'https://github.com/Bhavya0420/UnitConverter',
  demoUrl: 'https://bhavya0420.github.io/UnitConverter/',
  difficulty: 'intermediate',
  upvotes: 20,
  hasDemo: true,
  hasReadme: true,
  previewImage: 'assets/UnitConverter.png',
  tags: ['HTML', 'CSS', 'JavaScript', 'Responsive']
}

];

// ================= Voting System =================
let currentProjects = [...sampleProjects];
let selectedTag = null;

class VotingSystem {
  constructor() {
    this.userFingerprint = this.generateUserFingerprint();
    this.votes = this.loadVotes();
    this.initializeProjectVotes();
  }

  generateUserFingerprint() {
    let fingerprint = localStorage.getItem('userFingerprint');
    if (!fingerprint) {
      fingerprint = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userFingerprint', fingerprint);
    }
    return fingerprint;
  }

  loadVotes() {
    const savedVotes = localStorage.getItem('projectVotes');
    return savedVotes ? JSON.parse(savedVotes) : {};
  }

  saveVotes() {
    localStorage.setItem('projectVotes', JSON.stringify(this.votes));
  }

  initializeProjectVotes() {
    sampleProjects.forEach(project => {
      if (!this.votes[project.id]) {
        this.votes[project.id] = {
          count: project.upvotes || 0,
          voters: []
        };
      }
    });
    this.saveVotes();
  }

  canUserVote(projectId) {
    const projectVotes = this.votes[projectId];
    return projectVotes && !projectVotes.voters.includes(this.userFingerprint);
  }

  upvoteProject(projectId) {
    if (!this.canUserVote(projectId)) {
      return { success: false, message: 'You have already voted for this project!' };
    }

    this.votes[projectId].count++;
    this.votes[projectId].voters.push(this.userFingerprint);
    this.saveVotes();

    const project = currentProjects.find(p => p.id === projectId);
    if (project) {
      project.upvotes = this.votes[projectId].count;
    }

    return { success: true, newCount: this.votes[projectId].count };
  }

  getProjectVotes(projectId) {
    return this.votes[projectId] ? this.votes[projectId].count : 0;
  }

  hasUserVoted(projectId) {
    const projectVotes = this.votes[projectId];
    return projectVotes && projectVotes.voters.includes(this.userFingerprint);
  }
}
const votingSystem = new VotingSystem();

// ================= DOM Elements =================
const projectsContainer = document.getElementById('projects-container');
const loadingElement = document.getElementById('loading');
const emptyStateElement = document.getElementById('empty-state');
const sortByFilter = document.getElementById('sort-by');
const difficultyFilter = document.getElementById('difficulty');
const hasDemoFilter = document.getElementById('has-demo');
const applyFiltersBtn = document.getElementById('apply-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const tagFiltersContainer = document.querySelector('.tag-filters');

// ================= Tag Filter Buttons =================
const allTagSet = new Set();
sampleProjects.forEach(project => {
  project.tags.forEach(tag => allTagSet.add(tag));
});
const uniqueTags = Array.from(allTagSet);

uniqueTags.forEach(tag => {
  const button = document.createElement('button');
  button.textContent = tag;
  button.classList.add('tag-filter-btn');
  button.dataset.tag = tag;
  tagFiltersContainer.appendChild(button);
});

// ================= Init =================
function init() {
  setTimeout(() => {
    hideLoading();
    renderProjects(currentProjects);
    setupEventListeners();
    initializeTagFilterListener();
    setupNavigation();   // hamburger menu
    setupDarkMode();     // dark mode toggle
  }, 1000);
}

// ================= UI Helpers =================
function hideLoading() {
  loadingElement.style.display = 'none';
  projectsContainer.style.display = 'grid';
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ================= Navigation (Hamburger) =================
function setupNavigation() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navContainer = document.getElementById("navContainer");

  if (!hamburger || !navMenu || !navContainer) return;

  hamburger.addEventListener("click", () => {
    navContainer.classList.toggle("active");
    navMenu.classList.toggle("nav-active");
    hamburger.classList.toggle("open");
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("active");
      navMenu.classList.remove("nav-active");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

// ================= Dark Mode =================
function setupDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const icon = document.getElementById("themeIcon");

  if (!toggle || !icon) return;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    icon.textContent = "☀️";
  } else {
    icon.textContent = "🌙";
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const theme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  });
}

// ================= Rendering Projects =================
function renderProjects(projects) {
  projectsContainer.innerHTML = '';

  if (projects.length === 0) {
    emptyStateElement.style.display = 'block';
    return;
  } else {
    emptyStateElement.style.display = 'none';
  }

  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card fade-in';

    projectCard.innerHTML = `
      ${project.previewImage ? `<img src="${project.previewImage}" alt="${project.title}" class="project-preview">` : ""}
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="project-actions">
        <a href="${project.repoUrl}" target="_blank" class="btn">Repo</a>
        ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn">Demo</a>` : ""}
      </div>
      <div class="project-meta">
        <span class="difficulty">${project.difficulty}</span>
        <button class="upvote-btn ${votingSystem.hasUserVoted(project.id) ? 'voted' : ''}" data-id="${project.id}">
          👍 <span class="count">${votingSystem.getProjectVotes(project.id)}</span>
        </button>
      </div>
    `;

    projectsContainer.appendChild(projectCard);
  });

  setupUpvoteListeners();
}

// ================= Upvote Handling =================
function setupUpvoteListeners() {
  document.querySelectorAll('.upvote-btn').forEach(button => {
    button.addEventListener('click', () => {
      const projectId = parseInt(button.dataset.id);
      const result = votingSystem.upvoteProject(projectId);

      if (result.success) {
        button.querySelector('.count').textContent = result.newCount;
        button.classList.add('voted');
        showNotification('Thanks for your vote! 👍', 'success');
      } else {
        showNotification(result.message, 'error');
      }
    });
  });
}

// ================= Filters =================
function applyFilters() {
  let filteredProjects = [...sampleProjects];

  // difficulty filter
  const difficulty = difficultyFilter.value;
  if (difficulty !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.difficulty === difficulty);
  }

  // demo filter
  if (hasDemoFilter.checked) {
    filteredProjects = filteredProjects.filter(p => p.hasDemo);
  }

  // tag filter
  if (selectedTag) {
    filteredProjects = filteredProjects.filter(p => p.tags.includes(selectedTag));
  }

  // search filter
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm) {
    filteredProjects = filteredProjects.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // sort
  const sortBy = sortByFilter.value;
  filteredProjects.sort((a, b) => {
    if (sortBy === 'popular') return b.upvotes - a.upvotes;
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'oldest') return a.id - b.id;
    return 0;
  });

  currentProjects = filteredProjects;
  renderProjects(currentProjects);
}

function resetFilters() {
  difficultyFilter.value = 'all';
  hasDemoFilter.checked = false;
  sortByFilter.value = 'popular';
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  selectedTag = null;

  document.querySelectorAll('.tag-filter-btn').forEach(btn => btn.classList.remove('active'));

  currentProjects = [...sampleProjects];
  renderProjects(currentProjects);
}

// ================= Event Listeners =================
function setupEventListeners() {
  applyFiltersBtn.addEventListener('click', applyFilters);
  resetFiltersBtn.addEventListener('click', resetFilters);

  searchInput.addEventListener('input', () => {
    clearSearchBtn.style.display = searchInput.value ? 'block' : 'none';
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    applyFilters();
  });
}

function initializeTagFilterListener() {
  tagFiltersContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag-filter-btn')) {
      document.querySelectorAll('.tag-filter-btn').forEach(btn => btn.classList.remove('active'));
      if (selectedTag === e.target.dataset.tag) {
        selectedTag = null;
      } else {
        selectedTag = e.target.dataset.tag;
        e.target.classList.add('active');
      }
      applyFilters();
    }
  });
}

// ================= Run App =================
init();
