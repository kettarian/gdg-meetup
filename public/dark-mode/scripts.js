const enableDarkModeButton = document.getElementById('enable-dark-mode-button');

enableDarkModeButton.addEventListener('click', () => {
    if (window.matchMedia) {
        const shouldToggleLight = window
            .matchMedia('(prefers-color-scheme: dark)').matches &&
            document.documentElement.classList.contains('with-dark-mode');

        if (shouldToggleLight) {
            toggleLightMode()
        } else {
            toggleDarkMode();
        }
    } else {
        toggleDarkMode();
    }
});

function toggleLightMode() {
    document.documentElement.classList.toggle('light-mode');
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
}
