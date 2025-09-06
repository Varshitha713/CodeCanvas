

const sampleProjects = [
  {
    id: 1,
    title: 'Analog Clock Web App',
    description: 'A beautifully designed analog clock that updates in real-time using vanilla JavaScript, HTML, and CSS. Perfect for understanding basic DOM manipulation and CSS transformations.',
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
    description: 'A responsive weather application with beautiful animations and detailed forecasts. Features location-based weather data and interactive charts.',
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
    description: 'A full-featured task management application with drag-and-drop functionality, real-time updates, and team collaboration features.',
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
    description: 'A simple and intuitive expense tracker app to monitor daily spending, manage budgets, and gain financial insights.',
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
    description: 'A responsive IMDb clone showcasing popular movies with detailed info using TMDb API and modern frontend technologies.',
    repoUrl: 'https://github.com/Jils31/IMDB-clone',
    demoUrl: 'https://imdb-clone-seven-virid.vercel.app/',
    difficulty: 'intermediate',
    upvotes: 21,
    hasDemo: true,
    hasReadme: true,
    previewImage: 'assets/image.png',
    tags: ['REACT', 'Tailwind CSS', 'Responsive', 'React-Router DOM']
  },
  {
    id: 7,
    title: 'PassWord Generator',
    description: 'Enable user to create password with specified length and character (uppercase, lowercase , special character and numbers) to meet diverse securing requirements.',
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


        // Store the current projects array
        let currentProjects = [...sampleProjects];
        let selectedTag = null;

        // Voting system
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

                // Update the project in currentProjects array
                const project = currentProjects.find(p => p.id === projectId);
                if (project) {
                    project.upvotes = this.votes[projectId].count;
                }

                // Update the project in sampleProjects array
                const sampleProject = sampleProjects.find(p => p.id === projectId);
                if (sampleProject) {
                    sampleProject.upvotes = this.votes[projectId].count;
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

        // Initialize voting system
        const votingSystem = new VotingSystem();

        //Store all the unique tags
        const allTagSet = new Set();
        sampleProjects.forEach(project => {
            project.tags.forEach(tag => allTagSet.add(tag));
        })

        const uniqueTags = Array.from(allTagSet);

        // DOM elements
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

        uniqueTags.forEach(tag => {
            const button = document.createElement('button');
            button.textContent = tag;
            button.classList.add('tag-filter-btn')
            button.dataset.tag = tag
            tagFiltersContainer.appendChild(button)
        })

        // Initialize the app
        function init() {
            setTimeout(() => {
                hideLoading();
                renderProjects(currentProjects);
                setupEventListeners();
                initializeTagFilterListener();
            }, 1000); // Simulate loading time
        }

        // Hide loading spinner
        function hideLoading() {
            loadingElement.style.display = 'none';
            projectsContainer.style.display = 'grid';
        }

        // Setup event listeners
        function setupEventListeners() {
            applyFiltersBtn.addEventListener('click', applyFilters);
            resetFiltersBtn.addEventListener('click', resetFilters);
            sortByFilter.addEventListener('change', applyFilters);
            
            // Search functionality
            searchInput.addEventListener('input', handleSearch);
            clearSearchBtn.addEventListener('click', clearSearch);
            
            // Smooth scroll for explore button
            document.querySelector('a[href="#projects"]').addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('projects').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }

        function initializeTagFilterListener() {
            tagFiltersContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('tag-filter-btn')) {
                    const clickedTag = e.target.dataset.tag;

                    // Toggle selection
                    if (selectedTag === clickedTag) {
                        selectedTag = null;
                        e.target.classList.remove('active');
                    } else {
                        selectedTag = clickedTag;
                        // Remove active from all buttons
                        document.querySelectorAll('.tag-filter-btn').forEach(btn => btn.classList.remove('active'));
                        e.target.classList.add('active');
                    }

                    applyFilters(); // Re-apply filters based on tag
                }
            });
        }


        // Render projects
        function renderProjects(projects) {
            if (projects.length === 0) {
                projectsContainer.style.display = 'none';
                emptyStateElement.style.display = 'block';
                return;
            }

            // Sort projects based on selected option
            const sortBy = sortByFilter.value;
            const sortedProjects = [...projects].sort((a, b) => {
                switch (sortBy) {
                    case 'popularity':
                        const aVotes = votingSystem.getProjectVotes(a.id);
                        const bVotes = votingSystem.getProjectVotes(b.id);
                        return bVotes - aVotes;
                    
                    case 'newest':
                        // Since we don't have dates, sort by ID (assuming higher ID = newer)
                        return b.id - a.id;
                    
                    case 'difficulty':
                        const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
                        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                    
                    case 'alphabetical':
                        return a.title.localeCompare(b.title);
                    
                    default:
                        return 0;
                }
            });

            emptyStateElement.style.display = 'none';
            projectsContainer.style.display = 'grid';
            
            projectsContainer.innerHTML = sortedProjects.map((project, index) => {
                const hasVoted = votingSystem.hasUserVoted(project.id);
                const canVote = votingSystem.canUserVote(project.id);
                const voteCount = votingSystem.getProjectVotes(project.id);
                const isTopRanked = sortBy === 'popularity' && index < 3 && voteCount > 0;
                
                return `
                <div class="project-card ${isTopRanked ? 'top-ranked' : ''}">
                    ${isTopRanked ? `<div class="rank-badge">#${index + 1}</div>` : ''}
                    ${project.previewImage 
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
                        ${project.hasDemo 
                            ? '<i class="fas fa-external-link-alt meta-icon"></i> Live Demo Available'
                            : '<i class="fas fa-code meta-icon"></i> Code Only'
                        }
                        ${project.hasReadme 
                            ? ' • <i class="fas fa-file-alt meta-icon"></i> README Included'
                            : ' • <i class="fas fa-exclamation-triangle meta-icon"></i> No README'
                        }
                    </div>

                    <div class="project-tags">
                        ${project.tags.map((item, index)=>`
                            <span class="tag-badge">${item}</span>
                        `).join('')}
                    </div>
                    
                    <div class="upvote-section">
                        ${project.hasDemo && project.demoUrl 
                            ? `<a href="${project.demoUrl}" target="_blank" class="btn-primary" style="text-decoration: none; padding: 0.5rem 1rem; font-size: 0.875rem;">
                                <i class="fas fa-external-link-alt"></i> View Demo
                               </a>`
                            : '<span></span>'
                        }
                        <button class="upvote-btn ${hasVoted ? 'voted' : ''}" 
                                onclick="handleUpvote(${project.id})" 
                                ${!canVote ? 'disabled' : ''}
                                title="${hasVoted ? 'You have already voted for this project' : 'Click to upvote this project'}">
                            <i class="fas fa-arrow-up"></i>
                            <span>${voteCount}</span>
                        </button>
                    </div>
                </div>
            `;
            }).join('');
        }

        // Handle upvote
        function handleUpvote(projectId) {
            const result = votingSystem.upvoteProject(projectId);
            
            if (!result.success) {
                // Show error message
                showNotification(result.message, 'error');
                return;
            }

            // Show success message
            showNotification('Vote added successfully!', 'success');
            
            // Re-render projects to update the upvote count and sorting
            renderProjects(applyCurrentFilters());
            
            // Add visual feedback
            const button = event.target.closest('.upvote-btn');
            if (button) {
                button.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
            }
        }

        // Show notification function
        function showNotification(message, type = 'info') {
            // Remove existing notifications
            const existingNotification = document.querySelector('.vote-notification');
            if (existingNotification) {
                existingNotification.remove();
            }

            // Create notification element
            const notification = document.createElement('div');
            notification.className = `vote-notification ${type}`;
            notification.innerHTML = `
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            `;
            
            // Add to body
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
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

            if (difficulty !== 'all') {
                filtered = filtered.filter(p => p.difficulty === difficulty);
            }

            if (needsDemo) {
                filtered = filtered.filter(p => p.hasDemo);
            }

            if(selectedTag){
                filtered = filtered.filter(project => project.tags.includes(selectedTag));
            }

            return filtered;
        }

        // Handle search input with debounce
        let searchTimeout;
        function handleSearch() {
            const searchTerm = searchInput.value.trim();
            
            // Show/hide clear button
            if (searchTerm) {
                clearSearchBtn.style.display = 'flex';
            } else {
                clearSearchBtn.style.display = 'none';
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
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            const filteredProjects = applyCurrentFilters();
            renderProjects(filteredProjects);
        }

        // Reset filters
        function resetFilters() {
            sortByFilter.value = 'popularity';
            difficultyFilter.value = 'all';
            hasDemoFilter.checked = false;
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            selectedTag = null;
            document.querySelectorAll('.tag-filter-btn').forEach(btn => btn.classList.remove('active'));
            renderProjects(sampleProjects);
        }

        // Make handleUpvote globally available
        window.handleUpvote = handleUpvote;

        // Start the app
        document.addEventListener("DOMContentLoaded", init);
        // Adding m own version and also added a feature where the input field will get clear on clicking the send message button
        function validateForm() {
            const name = document.getElementById("name").value.trim();
            const lastname = document.getElementById("lastname").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            if (!name || !lastname || !email || !message) {
                alert("Please fill in all fields.");
                return false;
            }
            if (name.length < 4) {
                alert("First Name must be at least 4 letters.");
                return false;
            }
            if (lastname.length < 4) {
                alert("Last Name must be at least 4 letters.");
                return false;
            }
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!email.match(emailPattern)) {
                alert("Please enter a valid email.");
                return false;
            }
            // Message must have at least 3 words
            const wordCount = message.split(/\s+/).filter(Boolean).length;
            if (wordCount < 3) {
                alert("Message must be at least 3 words.");
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

            const toggle = document.getElementById('darkModeToggle');
            const body = document.body;
            const icon = document.getElementById('themeIcon');

            // Load preference
            const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark') {
                    body.classList.add('dark-theme');
                    icon.textContent = '☀️'; // Sun in dark mode
                } else {
                    icon.textContent = '🌙'; // Moon in light mode
                }

            toggle.addEventListener('click', () => {
                body.classList.toggle('dark-theme');
                const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
                localStorage.setItem('theme', theme);

                // Update icon
                icon.textContent = theme === 'dark' ? '☀️' : '🌙';
            });

            //Review Section JS
            const swiper = new Swiper(".review-swiper", {
                loop: true, 
                slidesPerView: 1, 
                spaceBetween: 20, 
                navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                },
                keyboard: {
                enabled: true,
                },
                mousewheel: {
                forceToAxis: true,
                },
                grabCursor: true,
                speed: 600,
        });
    //Scroll to top button functionality
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show button when user scrolls down
window.addEventListener("scroll", () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

// Scroll to top smoothly
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  faders.forEach(fade => observer.observe(fade));
});
entries.forEach((entry, index) => {
  if (entry.isIntersecting) {
    setTimeout(() => {
      entry.target.classList.add('animate');
    }, index * 100); // 100ms delay between cards
    observer.unobserve(entry.target);
  }
});


  const reviewSwiper = new Swiper(".review-swiper", {
    loop: true,
    autoplay: {
      delay: 4000, // 4 seconds per slide
      disableOnInteraction: false, // keeps autoplay after manual swipe
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 700, // smooth transition
  });
