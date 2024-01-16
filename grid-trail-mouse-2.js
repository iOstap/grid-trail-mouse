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
let graphicsArray = [];

function setup() {
  // Use the class selector to find all elements with class 'canvas-container'
  let containers = selectAll('.canvas-container');

  // Create a graphics object for each container
  for (let i = 0; i < containers.length; i++) {
    let graphics = createGraphics(containers[i].width, containers[i].height);
    graphics.parent(containers[i]);

    // Explicitly set graphics size
    graphics.width = containers[i].width;
    graphics.height = containers[i].height;

    graphicsArray.push(graphics);

    // Calculate numRows and numCols for each graphics object
    graphics.numRows = Math.ceil(graphics.height / CELL_SIZE);
    graphics.numCols = Math.ceil(graphics.width / CELL_SIZE);
  }

  colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
  noFill();
  stroke(colorWithAlpha);
  strokeWeight(1);
}

function draw() {
  // Clear all graphics objects (including the background)
  for (let i = 0; i < graphicsArray.length; i++) {
    graphicsArray[i].clear();
  }

  // Draw a highlighted rectangle over the cell under the mouse cursor for each graphics
  for (let i = 0; i < graphicsArray.length; i++) {
    // Calculate the row and column of the cell that the mouse is currently over
    let row = floor(graphicsArray[i].mouseY / CELL_SIZE);
    let col = floor(graphicsArray[i].mouseX / CELL_SIZE);

    let x = col * CELL_SIZE;
    let y = row * CELL_SIZE;
    graphicsArray[i].stroke(colorWithAlpha);
    graphicsArray[i].rect(x, y, CELL_SIZE, CELL_SIZE, BORDER_RADIUS);
  }
}

