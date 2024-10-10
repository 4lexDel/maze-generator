/**
 * Maze generator
 */

type Node = {
    id: number;
    areaId: number;
};

class MazeFusion {
    sizeX: number;
    sizeY: number;
    obstacleId: number;
    passableId: number;
    nodes: Node[][];
    nbArea: number = 0;
    wallNodes: { x: number; y: number; }[] = [];

    constructor(sizeX: number, sizeY: number, obstacleId: number = 1, passableId: number = 0) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.obstacleId = obstacleId;
        this.passableId = passableId;

        this.nodes = Array.from({ length: sizeX }, () => new Array<Node>(sizeY));
        this.initNodes();
    }

    initNodes(): void {
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

    generate(): number[][] {
        while (this.nbArea > 1) {
            this.fusionRandomArea();
        }

        return this.getGrid();
    }

    fusionRandomArea(): boolean {
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

    mergeAreas(wallNode: { x: number; y: number }, nodeA: Node | null, nodeB: Node | null): boolean {
        if (nodeA && nodeB && nodeA.areaId !== nodeB.areaId) {
            this.setAreaIdByAreaId(nodeA.areaId, nodeB.areaId);
            this.nodes[wallNode.x][wallNode.y].areaId = nodeB.areaId;
            return true;
        }
        return false;
    }

    setAreaIdByAreaId(oldAreaId: number, newAreaId: number): void {
        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                if (this.nodes[x][y].areaId === oldAreaId) {
                    this.nodes[x][y].areaId = newAreaId;
                }
            }
        }
    }

    getNode(x: number, y: number, dx: number, dy: number): Node | null {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < this.sizeX && newY >= 0 && newY < this.sizeY && this.nodes[newX][newY].id !== this.obstacleId) {
            return this.nodes[newX][newY];
        }
        return null;
    }

    getGrid(): number[][] {
        return this.nodes.map(row => row.map(node => node.id));
    }
}

export { MazeFusion };
