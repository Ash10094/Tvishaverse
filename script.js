const snake = document.getElementById('snake');
const apple = document.getElementById('apple');
const gameArea = document.querySelector('.game-area');

document.addEventListener('keydown', (event) => {
    const step = 20;
    let snakeRect = snake.getBoundingClientRect();
    let gameAreaRect = gameArea.getBoundingClientRect();

    switch (event.key) {
        case 'ArrowUp':
            if (snakeRect.top > gameAreaRect.top) {
                snake.style.transform = `translateY(-${step}px)`;
            }
            break;
        case 'ArrowDown':
            if (snakeRect.bottom < gameAreaRect.bottom) {
                snake.style.transform = `translateY(${step}px)`;
            }
            break;
        case 'ArrowLeft':
            if (snakeRect.left > gameAreaRect.left) {
                snake.style.transform = `translateX(-${step}px)`;
            }
            break;
        case 'ArrowRight':
            if (snakeRect.right < gameAreaRect.right) {
                snake.style.transform = `translateX(${step}px)`;
            }
            break;
    }

    // Check if snake reaches the apple
    if (isColliding(snakeRect, apple.getBoundingClientRect())) {
        alert('You guided the snake to the apple!');
        document.getElementById('about-me').scrollIntoView({ behavior: 'smooth' });
    }
});

function isColliding(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}