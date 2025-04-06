// Password Protection
document.addEventListener('DOMContentLoaded', function() {
    const passwordProtection = document.querySelector('.password-protection');
    const contentContainer = document.querySelector('.content-container');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    
    // The correct password - you can change this to whatever you want
    const correctPassword = 'pwrs2025';
    
    // Check if password is already stored in session storage
    if (sessionStorage.getItem('pwrsAccessGranted') === 'true') {
        showContent();
    }
    
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (passwordInput.value === correctPassword) {
            // Store in session storage so user doesn't need to re-enter on refresh or when navigating between pages
            sessionStorage.setItem('pwrsAccessGranted', 'true');
            showContent();
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = '';
        }
    });
    
    function showContent() {
        passwordProtection.style.display = 'none';
        contentContainer.style.display = 'block';
        
        // Initialize any page-specific functionality here
        if (typeof initializePage === 'function') {
            initializePage();
        }
    }
}); 