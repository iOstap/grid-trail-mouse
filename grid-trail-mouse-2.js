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
let graphicsArray = [];

function setup() {
  // Use the class selector to find all elements with class 'canvas-container'
  let containers = select('.canvas-container-1', '.canvas-container-2');

  // Create a graphics object for each container
  for (let i = 0; i < containers.length; i++) {
    let graphics = createGraphics(containers[i].width, containers[i].height);
    graphics.parent(containers[i]);

    // Explicitly set graphics size
    graphics.width = containers[i].width;
    graphics.height = containers[i].height;

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
  for (let i = 0; i < graphicsArray.length; i++) {
    let x = col * CELL_SIZE;
    let y = row * CELL_SIZE;
    graphicsArray[i].stroke(colorWithAlpha);
    graphicsArray[i].rect(x, y, CELL_SIZE, CELL_SIZE, BORDER_RADIUS);
  }

  // Draw and update all neighbors for each graphics
  for (let i = 0; i < graphicsArray.length; i++) {
    for (let neighbor of allNeighbors) {
      let neighborX = neighbor.col * CELL_SIZE;
      let neighborY = neighbor.row * CELL_SIZE;
      // Update the opacity of the neighbor
      neighbor.opacity = max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
      graphicsArray[i].stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
      graphicsArray[i].rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE, BORDER_RADIUS);
    }
  }

  // Remove neighbors with zero opacity
  allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
}

function getRandomNeighbors(row, col) {
  let neighbors = [];

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      let neighborRow = row + dRow;
      let neighborCol = col + d
