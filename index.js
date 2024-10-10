/**
 * Maze generator
 */

class MazeFusion {
    constructor(sizeX, sizeY, obstacleId=1, passableId=0) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.obstacleId = obstacleId;
        this.passableId = passableId;

        this.nodes = Array.from({ length: sizeX }, () => new Array(sizeY));
        this.initNodes();
    }

    initNodes() {
        this.nbArea = 0;
        this.wallNodes = [];

        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                if (x % 2 === 0 || y % 2 === 0) {
                    this.nodes[x][y] = { id: this.obstacleId, areaId: -1 };
                } else {
                    this.nbArea++;
                    this.nodes[x][y] = { id: this.passableId, areaId: this.nbArea };
                }

                if ((x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)) {
                    this.wallNodes.push({ x, y });
                }
            }
        }
    }

    generate() {
        while (this.nbArea > 1) {
            this.fusionRandomArea();
        }

        return this.getGrid();
    }

    fusionRandomArea() {
        const randomIndex = Math.floor(Math.random() * this.wallNodes.length);
        const wallNode = this.wallNodes[randomIndex];
        let isMerged = false;

        if (wallNode.x % 2 === 0) {
            isMerged = this.mergeAreas(wallNode, this.getNode(wallNode.x, wallNode.y, -1, 0), this.getNode(wallNode.x, wallNode.y, 1, 0));
        } else {
            isMerged = this.mergeAreas(wallNode, this.getNode(wallNode.x, wallNode.y, 0, -1), this.getNode(wallNode.x, wallNode.y, 0, 1));
        }

        if (isMerged) {
            this.nodes[wallNode.x][wallNode.y].id = this.passableId;
            this.nbArea--;
            this.wallNodes.splice(randomIndex, 1); // Remove the processed wall node
            return true;
        }
        return false;
    }

    mergeAreas(wallNode, nodeA, nodeB) {
        if (nodeA && nodeB && nodeA.areaId !== nodeB.areaId) {
            this.setAreaIdByAreaId(nodeA.areaId, nodeB.areaId);
            this.nodes[wallNode.x][wallNode.y].areaId = nodeB.areaId;
            return true;
        }
        return false;
    }

    setAreaIdByAreaId(oldAreaId, newAreaId) {
        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                if (this.nodes[x][y].areaId === oldAreaId) {
                    this.nodes[x][y].areaId = newAreaId;
                }
            }
        }
    }

    getNode(x, y, dx, dy) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < this.sizeX && newY >= 0 && newY < this.sizeY && this.nodes[newX][newY].id !== this.obstacleId) {
            return this.nodes[newX][newY];
        }
        return null;
    }

    getGrid() {
        return this.nodes.map(row => row.map(node => node.id));
    }
}

module.exports = { MazeFusion };