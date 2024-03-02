alert("Launched Game")
// set a listener to listen for ctrl alt s, then launch snake.js
let isIframeVisible = false; // This will track the visibility state of the iframe

function toggleIframeVisibility(e) {
    // Launching or hiding the iframe with Ctrl + Alt + S
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 's') {
        console.log("Ctrl + Alt + S pressed");
        e.stopPropagation();
        e.preventDefault();

        let gameFrame = document.getElementById('gameFrame');

        // If the iframe doesn't exist, create it
        if (!gameFrame) {
            gameFrame = document.createElement('iframe');
            gameFrame.id = 'gameFrame';
            gameFrame.src = '/sitecore/shell/Applications/CMSnake/index.html';
            gameFrame.style.cssText = 'position: absolute; z-index: 999; top: 0; width: 700px; height: 700px; margin: 25% 25%; display: none;'; // Initial state is hidden
            document.body.appendChild(gameFrame);
        }

        // Toggle visibility based on current state
        if (isIframeVisible) {
            gameFrame.style.display = 'none';
            alert("Hiding Snake");
        } else {
            gameFrame.style.display = 'block';
            alert("Launching Snake");
            gameFrame.focus();
        }

        // Update the visibility state
        isIframeVisible = !isIframeVisible;
    }

    // Additional check for Escape key to hide the iframe
    if (e.key === 'Escape' && isIframeVisible) {
        console.log("Escape pressed, hiding iframe");
        e.stopPropagation();
        e.preventDefault();
        let gameFrame = document.getElementById('gameFrame');
        if (gameFrame) {
            gameFrame.style.display = 'none';
            isIframeVisible = false;
        }
    }
}

document.addEventListener("keyup", toggleIframeVisibility, true);
