function triggerPhotoUpload() {
    document.getElementById('photo-input').click();
}

function updatePhoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-img').src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// Zoom Functionality
let currentScale = 1;
const zoomLevelText = document.getElementById('zoom-level');

function updateZoom() {
    // Basic scaling logic
    const containers = document.querySelectorAll('.cv-container');
    containers.forEach(container => {
        container.style.transform = `scale(${currentScale})`;
    });

    if (zoomLevelText) {
        zoomLevelText.innerText = Math.round(currentScale * 100) + '%';
    }
}

function zoomIn() {
    if (currentScale < 2.0) {
        currentScale += 0.1;
        updateZoom();
    }
}

function zoomOut() {
    if (currentScale > 0.3) {
        currentScale -= 0.1;
        updateZoom();
    }
}

function resetZoom() {
    currentScale = 1;
    updateZoom();
}

function changeColor(color) {
    document.documentElement.style.setProperty('--primary-blue', color);
}

function autoFit() {
    const margin = 20; 
    const availableWidth = window.innerWidth - margin;
    const availableHeight = window.innerHeight - margin;

    const cvWidth = 794; 
    const cvHeight = 1123; 

    let scaleX = availableWidth / cvWidth;
    let scaleY = availableHeight / cvHeight;

    let targetScale;
    if (window.innerWidth <= 850) {
        targetScale = availableWidth / cvWidth;
    } else {
        targetScale = Math.min(scaleX, scaleY);
    }

    if (targetScale > 1) targetScale = 1;
    if (targetScale < 0.2) targetScale = 0.2;

    currentScale = targetScale;
    updateZoom();
}

// --- NEW MOBILE TAB SWITCHING ---
function showCV() {
    document.body.classList.add('show-cv');
    document.body.classList.remove('show-cl');
    document.getElementById('mobile-tab-cv').classList.add('active');
    document.getElementById('mobile-tab-cl').classList.remove('active');
    autoFit();
}

function showCL() {
    document.body.classList.add('show-cl');
    document.body.classList.remove('show-cv');
    document.getElementById('mobile-tab-cl').classList.add('active');
    document.getElementById('mobile-tab-cv').classList.remove('active');
    autoFit();
}

// --- NEW MOBILE FULLSCREEN (FOCUS) MODE ---
function toggleMobileFocus() {
    if (window.innerWidth <= 850) {
        document.body.classList.toggle('mobile-focus-active');
        // Small delay to ensure layout reflows before fitting
        setTimeout(autoFit, 100);
    }
}

// Attach focus toggle to CV containers on mobile
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cv-container').forEach(cv => {
        cv.addEventListener('click', (e) => {
            // Only trigger if we are on mobile and NOT clicking a button/link
            if (window.innerWidth <= 850 && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && !e.target.closest('.toolbar')) {
                toggleMobileFocus();
            }
        });
    });
    
    // Auto-init tabs for mobile
    if (window.innerWidth <= 850) {
        showCV(); 
    }
});

// Auto-align bottoms (Bidirectional & Distributed)
function alignBottoms() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    if (!sidebar || !mainContent) return;

    const experiences = mainContent.querySelectorAll('.experience-item');
    const lastSidebarSection = sidebar.querySelector('.section-container:last-child');
    if (!experiences.length || !lastSidebarSection) return;

    // Reset
    experiences.forEach(el => el.style.marginTop = '0px');
    lastSidebarSection.style.marginTop = '0px';

    const sidebarRect = sidebar.getBoundingClientRect();
    const mainRect = mainContent.getBoundingClientRect();
    
    // Logic for alignment...
}

window.addEventListener('load', () => {
    autoFit();
    alignBottoms();
    setTimeout(alignBottoms, 500);
});

window.addEventListener('resize', () => {
    autoFit();
    alignBottoms();
});

document.querySelectorAll('[contenteditable]').forEach(el => {
    el.addEventListener('paste', function (e) {
        e.preventDefault();
        const text = (e.originalEvent || e).clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    });
});
