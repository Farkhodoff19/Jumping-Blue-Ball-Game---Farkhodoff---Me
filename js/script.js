let character = document.querySelector('#character'),
    characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom')),
    characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right')),
    characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));

let ground = document.querySelector('#ground'),
    groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom')),
    groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));
        
let isJumping = false,
    upTime,
    downTime,
    displayScore = document.querySelector('#score'),
    score = 0;

    alert(`Directed by Farkhodoff_me || Jumping Blue Ball`)
    alert(`Hi there ! || Press "ArrowUp" To Jump`)

function jump() {
    upTime = setInterval(() => {
        if(characterBottom >= groundHeight + 250) {
            clearInterval(upTime);
            downTime = setInterval(() => {
                if(characterBottom <= groundHeight + 10) {
                    clearInterval(downTime);
                    isJumping = false
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom + 'px';
                isJumping = true;
            }, 20)
        }
        characterBottom += 10;
        character.style.bottom = characterBottom + 'px';
        isJumping = true;
        if(isJumping) return;
    }, 20) 
}

function showScore() {
    score++;
    displayScore.textContent = score;
}

setInterval(showScore, 100)

function control(event) {
    if(event.key == 'ArrowUp' || event.key == '') {
        jump();
    }
}

function genereteObstacle() {
    let obstacles = document.querySelector('.obstacles'),
        obstacle = document.createElement('div');
    obstacle.setAttribute('class', 'obstacle');
    obstacles.appendChild(obstacle);

    let randomTimeOut = Math.floor(Math.random() * 1000) + 1000,
        obstacleRight = -30,
        obstacleBottom = 100,
        obstacleWidth = 30,
        
        obstacleHeight = Math.floor(Math.random() * 50) + 50;
        obstacle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)},)`        

    function moveObstacle() {
        obstacleRight += 5;
        obstacle.style.right = obstacleRight + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        obstacle.style.width = obstacleWidth + 'px';
        obstacle.style.height = obstacleHeight + 'px';
        
        if (characterRight >= obstacleRight - characterWidth && characterRight 
            <= obstacleRight + obstacleWidth && characterBottom <= obstacleBottom + obstacleHeight)
        {
            alert('Game over! | Your score is: '+score);
            clearInterval(obstacleInterval);
            clearTimeout(obstacleTimeout);
            location.reload();
        }
    }

   let obstacleInterval = setInterval(moveObstacle, 20),
       obstacleTimeout = setTimeout(genereteObstacle, randomTimeOut) 
}

genereteObstacle();

document.addEventListener('keydown', control)

