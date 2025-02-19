document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const overlay = document.getElementById("nameOverlay");
    const portfolio = document.getElementById("portfolioContent");
  
    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Snake game variables
    let snake = [{ x: 50, y: 50 }];
    const snakeSize = 20;
    let direction = "RIGHT";
    // Set apple position
    let apple = { x: 200, y: 200 };
  
    // Game loop interval
    const gameInterval = setInterval(gameLoop, 100);
  
    function gameLoop() {
      update();
      draw();
    }
  
    function update() {
      // Move snake's head
      const head = { ...snake[0] };
      if (direction === "RIGHT") head.x += snakeSize;
      if (direction === "LEFT") head.x -= snakeSize;
      if (direction === "UP") head.y -= snakeSize;
      if (direction === "DOWN") head.y += snakeSize;
      snake.unshift(head);
  
      // Check if snake eats the apple
      if (head.x === apple.x && head.y === apple.y) {
        // When the apple is eaten, trigger the transition
        clearInterval(gameInterval);
        triggerTransition();
      } else {
        snake.pop(); // Remove the tail segment if apple not eaten
      }
    }
  
    function draw() {
      // Clear canvas
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Draw apple as a clear red square
      ctx.fillStyle = "red";
      ctx.fillRect(apple.x, apple.y, snakeSize, snakeSize);
  
      // Draw snake with bright neon green color
      ctx.fillStyle = "#39ff14";
      snake.forEach((part) => {
        ctx.fillRect(part.x, part.y, snakeSize, snakeSize);
      });
    }
  
    // Handle keyboard input to change snake direction
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
      else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    });
  
    // Transition function: reveal the overlay then scroll to portfolio
    function triggerTransition() {
      // Show the name overlay
      overlay.classList.remove("hidden");
  
      // After 3 seconds, transition to the portfolio page
      setTimeout(() => {
        overlay.classList.add("hidden");
        canvas.classList.add("hidden");
        // Change background for portfolio
        document.body.style.background = "white";
        portfolio.classList.remove("hidden");
  
        // Optional: Smooth scroll to the About section if portfolio content is long
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 3000);
    }
  });
  