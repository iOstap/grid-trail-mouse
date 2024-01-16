// CONSTANTS
    const CELL_SIZE = 40;
    const COLOR_R = 0;
    const COLOR_G = 117;
    const COLOR_B = 255;
    const STARTING_ALPHA = 200;
    const AMT_FADE_PER_FRAME = 5;
    const BORDER_RADIUS = 4;

    // VARIABLES
    let containers = [];
    let colorWithAlpha;
    let numRows;
    let numCols;
    let currentRow = -2;
    let currentCol = -2;
    let allNeighbors = [];
    let graphicsArray = [];

    function setup() {
      // Use the class selector to find all elements with class 'canvas-container'
      containers = document.querySelectorAll('.canvas-container');

      // Create a graphics object for each container
      for (let i = 0; i < containers.length; i++) {
        let graphics = createGraphics(containers[i].clientWidth, containers[i].clientHeight);
        graphics.parent(containers[i]);

        // Explicitly set graphics size
        graphics.width = containers[i].clientWidth;
        graphics.height = containers[i].clientHeight;

        graphicsArray.push(graphics);
      }

      colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
      noFill();
      stroke(colorWithAlpha);
      strokeWeight(1);
      numRows = Math.ceil(graphicsArray[0].height / CELL_SIZE);
      numCols = Math.ceil(graphicsArray[0].width / CELL_SIZE);
    }

    function draw() {
      // Clear all graphics objects (including the background)
      for (let i = 0; i < graphicsArray.length; i++) {
        graphicsArray[i].clear();
      }

      // Draw and update all neighbors for each graphics
      for (let i = 0; i < graphicsArray.length; i++) {
        // Calculate the row and column of the cell that the mouse is currently over
        let row = floor(mouseY / CELL_SIZE);
        let col = floor(mouseX / CELL_SIZE);

        // Check if the mouse has moved to a different cell
        if (row !== currentRow || col !== currentCol) {
          currentRow = row;
          currentCol = col;
          // Add new neighbors to the allNeighbors array
          allNeighbors.push(...getRandomNeighbors(row, col));
        }

        // Draw a highlighted rectangle over the cell under the mouse cursor for each graphics
        let x = col * CELL_SIZE;
        let y = row * CELL_SIZE;
        graphicsArray[i].stroke(colorWithAlpha);
        graphicsArray[i].rect(x, y, CELL_SIZE, CELL_SIZE, BORDER_RADIUS);

        for (let neighbor of allNeighbors) {
          let neighborX = neighbor.col * CELL_SIZE;
          let neighborY = neighbor.row * CELL_SIZE;
          // Update the opacity of the neighbor
          neighbor.opacity = max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
          graphicsArray[i].stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
          graphicsArray[i].rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE, BORDER_RADIUS);
        }

        // Remove neighbors with zero opacity
        allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
      }
    }

    function getRandomNeighbors(row, col) {
      let neighbors = [];

      for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
          let neighborRow = row + dRow;
          let neighborCol = col + dCol;
          // Ensure the neighbor is within the canvas boundaries
          if (neighborRow >= 0 && neighborRow < numRows && neighborCol >= 0 && neighborCol < numCols) {
            neighbors.push({ row: neighborRow, col: neighborCol, opacity: STARTING_ALPHA });
          }
        }
      }

      return neighbors;
    }
  }

  return neighbors;
}
