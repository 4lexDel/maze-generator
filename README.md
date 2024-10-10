# Maze generator

## How to use it?

### Installation
```bash
npm install @4lexdel/maze-generator
```

### Getting started
```js
const { MazeFusion } = require("@4lexdel/maze-generator");

const mazeGenerator = new MazeFusion(11, 5);
let maze = mazeGenerator.generate();

console.log(maze);
```
