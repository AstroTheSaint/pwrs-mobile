// Password Protection
document.addEventListener('DOMContentLoaded', function() {
    const passwordProtection = document.querySelector('.password-protection');
    const contentContainer = document.querySelector('.content-container');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    
    // The correct password - updated to 20252025
    const correctPassword = '20252025';
    
    // Check if already authenticated
    if (sessionStorage.getItem('pwrsAccessGranted') === 'true') {
        showContent();
    }
    
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (passwordInput.value === correctPassword) {
            sessionStorage.setItem('pwrsAccessGranted', 'true');
            showContent();
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
    
    function showContent() {
        // Fade out password protection
        passwordProtection.style.opacity = '0';
        
        // After fade out, hide password protection and show content
        setTimeout(() => {
            passwordProtection.style.display = 'none';
            contentContainer.style.display = 'block';
            
            // Initialize any page-specific functionality
            if (typeof initializePage === 'function') {
                initializePage();
            }
        }, 500);
    }
}); 