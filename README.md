# Maze generator

## How to use it?

### Installation
```bash
npm install @4lexdel/maze-generator
```

### Getting started
```js
const mazeTool = require('@4lexdel/maze-generator');

const mazeGenerator = mazeTool.createMazeManager("Kruskal's Algorithm");

let maze = mazeGenerator.generate(20, 10);
console.log(maze);
```
