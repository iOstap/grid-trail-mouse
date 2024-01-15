// CONSTANTS
const CELL_SIZE = 40;
const COLOR_R = 0;
const COLOR_G = 117;
const COLOR_B = 255;
const STARTING_ALPHA = 200;
const PROB_OF_NEIGHBOR = 0.5;
const AMT_FADE_PER_FRAME = 5;
const BORDER_RADIUS = 4;
const BACKGROUND_COLOR = '#f0f1f9';

// VARIABLES
let colorWithAlpha;
let numRows;
let numCols;
let currentRow = -2;
let currentCol = -2;
let allNeighbors = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("position", "fixed");
  cnv.style("inset", 0);
  cnv.style("z-index", 1);
  colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
  noFill();
  stroke(colorWithAlpha);
  strokeWeight(1);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);
}

function draw() {
  // Clear the entire canvas (including the background)
  clear();

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

  // Use the calculated row and column to determine the position of the cell
  let x = col * CELL_SIZE;
  let y = row * CELL_SIZE;

  // Draw a highlighted rectangle over the cell under the mouse cursor
  stroke(colorWithAlpha);
  rect(x, y, CELL_SIZE, CELL_SIZE, BORDER_RADIUS);

  // Draw and update all neighbors
  for (let neighbor of allNeighbors) {
    let neighborX = neighbor.col * CELL_SIZE;
    let neighborY = neighbor.row * CELL_SIZE;
    // Update the opacity of the neighbor
    neighbor.opacity = max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
    stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
    rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE, BORDER_RADIUS);
  }

  // Remove neighbors with zero opacity
  allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
}

function getRandomNeighbors(row, col) {
  let neighbors = [];

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      let neighborRow = row + dRow;
      let neighborCol = col + dCol;
      let isCurrentCell = dRow === 0 && dCol === 0;
      let isInBounds =
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols;

      if (!isCurrentCell && isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
        neighbors.push({
          row: neighborRow,
          col: neighborCol,
          opacity: 255,
        });
      }
    }
  }

  return neighbors;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);
}
