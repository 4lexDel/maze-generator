# Maze generator

## How to use it?

### Installation
```bash
npm install maze-generator
```

### Getting started
```js
const mazeTool = require('maze-generator');

const mazeGenerator = mazeTool.createMazeManager("Kruskal's Algorithm");

let maze = mazeGenerator.generate(20, 10);
console.log(maze);
```
