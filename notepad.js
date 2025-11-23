const toggle = document.getElementById('darkModeToggle');
const body = document.body;
const icon = document.getElementById('themeIcon');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    icon.textContent = '☀️';  // Sun when in dark mode
} else {
    icon.textContent = '🌙';  // Moon in light mode
}

// Toggle theme
toggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    // Update icon
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
});


    function saveNote() {
        const title = document.getElementById("title").value.trim();
        const content = document.getElementById("content").value.trim();

        if (!title || !content) {
            alert("Please fill both Title and Content!");
            return;
        }

        const note = { title, content };

        // Get existing notes
        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        // Add new note
        notes.push(note);

        // Save back to localStorage
        localStorage.setItem("notes", JSON.stringify(notes));

        // Refresh note display
        displayNotes();

        // Clear inputs
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        localStorage.removeItem("draft_title");
        localStorage.removeItem("draft_content");
    }

    function displayNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const container = document.getElementById("notesContainer");

        container.innerHTML = ""; // Clear old content

        notes.forEach((note, index) => {
            const card = document.createElement("div");
            card.classList.add("note-card");

            card.innerHTML = `
                <div class="note-header">
                    <h3>${note.title}</h3>
                    <button class="delete-btn" onclick="deleteNote(${index})">🗑</button>
                </div>
                <p>${note.content}</p>
            `;


            container.appendChild(card);
        });
    }

    function deleteNote(index) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        // Remove selected note
        notes.splice(index, 1);

        // Save updated list
        localStorage.setItem("notes", JSON.stringify(notes));

        // Refresh display
        displayNotes();
    }

    document.addEventListener("DOMContentLoaded", () => {
        const draftTitle = localStorage.getItem("draft_title") || "";
        const draftContent = localStorage.getItem("draft_content") || "";

        document.getElementById("title").value = draftTitle;
        document.getElementById("content").value = draftContent;

        displayNotes();
    });

    // Save draft automatically when typing
    document.getElementById("title").addEventListener("input", () => {
        localStorage.setItem("draft_title", document.getElementById("title").value);
    });

    document.getElementById("content").addEventListener("input", () => {
        localStorage.setItem("draft_content", document.getElementById("content").value);
    });
    // Load notes on page load
    document.addEventListener("DOMContentLoaded", displayNotes);
