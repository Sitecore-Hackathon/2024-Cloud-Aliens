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
            gameFrame.className = 'game-frame';
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

var itemUpdateUrl = "https://xmcloudcm.localhost/sitecore/api/ssc/item/{E6F43837-23CD-4228-8B4B-F15289C0453A}";
var cmsnakeUserScores = "";
var cmsnakeUserScoresUnformatted = "";
var currentUserName = localStorage.userNameCMS;
var currentUserScore = 0;
var highestScore = 0;

fetchScores();

function fetchScores() {
    var queryParams = {
        field: "Scores"
    };

    var url = new URL(itemUpdateUrl);
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);
            cmsnakeUserScoresUnformatted = data.Scores;
            if (cmsnakeUserScoresUnformatted.indexOf('&') !== -1) {
                cmsnakeUserScores = data.Scores.split('&');
            }
            else {
                var scores = cmsnakeUserScoresUnformatted + "&"
                cmsnakeUserScores = scores.split('&');
            }

            if (!isEmptyArray(cmsnakeUserScores)) {
                const filteredItems = filterItemsByExpression(cmsnakeUserScores, currentUserName + '=');
                if (filteredItems.length > 0) {
                    currentUserScore = filteredItems[0].split('=')[1];
                }
                highestScore = getItemWithHighestScore(cmsnakeUserScores).split("=");
            }

            console.log("Current User - ", currentUserName + currentUserScore)
            console.log("Top Score - ", highestScore[0] + highestScore[1])

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function isEmptyArray(array) {
    return array.length === 0;
}

function filterItemsByExpression(array, expression) {
    // Use Array.prototype.filter() to filter items
    return array.filter(item => {
        // Check if the item starts with the given expression
        return item.startsWith(expression);
    });
}

function getItemWithHighestScore(array) {
    let highestScoreItem = null;
    let highestScore = -Infinity;

    array.forEach(item => {
        const [, scoreString] = item.split('='); // Split item by '=' to get the score part
        const score = parseInt(scoreString, 10); // Parse score string to integer

        if (score > highestScore) {
            highestScore = score;
            highestScoreItem = item;
        }
    });

    return highestScoreItem;
}

updateScores();

function updateScores() {
    const filteredItems = filterItemsByExpression(cmsnakeUserScores, currentUserName + '=');
    var updatedFieldValue = cmsnakeUserScoresUnformatted;
    var currentScore = 100;

    if (filteredItems.length > 0) {
        currentUserScoreInItem = filteredItems[0].split('=')[1];
        if (currentUserScoreInItem < currentScore) {
            var expressionToReplaceWith = currentUserName + "=" + currentScore;
            updatedFieldValue = cmsnakeUserScoresUnformatted.replace(filteredItems[0], expressionToReplaceWith);
        }
    }
    else {
        if (isEmptyArray(cmsnakeUserScores)) {
            updatedFieldValue = currentUserName + "=" + currentScore;
        }
        else {
            updatedFieldValue = updatedFieldValue + "&" + currentUserName + "=" + currentScore;
        }
    }

    const data = {
        Scores: updatedFieldValue
    };

    fetch(itemUpdateUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    }).then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => {
            console.error('Error:', error);
        });
}



