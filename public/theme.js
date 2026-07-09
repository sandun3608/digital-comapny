// Theme Toggle Persistence Logic
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcons(savedTheme);
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcons(newTheme);
};

const updateToggleIcons = (theme) => {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    toggleBtns.forEach(btn => {
        // Toggle icon based on theme
        const icon = btn.querySelector('i');
        if (icon) {
            // Update lucide icon name dynamically
            icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
            if (window.lucide) window.lucide.createIcons();
        }
    });
};

// Initial run
initTheme();

// Event delegation for theme buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.theme-toggle')) {
        toggleTheme();
    }
});
