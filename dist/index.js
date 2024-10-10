"use strict";
/**
 * Maze generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeFusion = void 0;
var MazeFusion = /** @class */ (function () {
    function MazeFusion(sizeX, sizeY, obstacleId, passableId) {
        if (obstacleId === void 0) { obstacleId = 1; }
        if (passableId === void 0) { passableId = 0; }
        this.nbArea = 0;
        this.wallNodes = [];
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.obstacleId = obstacleId;
        this.passableId = passableId;
        this.nodes = Array.from({ length: sizeX }, function () { return new Array(sizeY); });
        this.initNodes();
    }
    MazeFusion.prototype.initNodes = function () {
        this.nbArea = 0;
        this.wallNodes = [];
        for (var x = 0; x < this.sizeX; x++) {
            for (var y = 0; y < this.sizeY; y++) {
                if (x % 2 === 0 || y % 2 === 0) {
                    this.nodes[x][y] = { id: this.obstacleId, areaId: -1 };
                }
                else {
                    this.nbArea++;
                    this.nodes[x][y] = { id: this.passableId, areaId: this.nbArea };
                }
                if ((x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)) {
                    this.wallNodes.push({ x: x, y: y });
                }
            }
        }
    };
    MazeFusion.prototype.generate = function () {
        while (this.nbArea > 1) {
            this.fusionRandomArea();
        }
        return this.getGrid();
    };
    MazeFusion.prototype.fusionRandomArea = function () {
        var randomIndex = Math.floor(Math.random() * this.wallNodes.length);
        var wallNode = this.wallNodes[randomIndex];
        var isMerged = false;
        if (wallNode.x % 2 === 0) {
            isMerged = this.mergeAreas(wallNode, this.getNode(wallNode.x, wallNode.y, -1, 0), this.getNode(wallNode.x, wallNode.y, 1, 0));
        }
        else {
            isMerged = this.mergeAreas(wallNode, this.getNode(wallNode.x, wallNode.y, 0, -1), this.getNode(wallNode.x, wallNode.y, 0, 1));
        }
        if (isMerged) {
            this.nodes[wallNode.x][wallNode.y].id = this.passableId;
            this.nbArea--;
            this.wallNodes.splice(randomIndex, 1); // Remove the processed wall node
            return true;
        }
        return false;
    };
    MazeFusion.prototype.mergeAreas = function (wallNode, nodeA, nodeB) {
        if (nodeA && nodeB && nodeA.areaId !== nodeB.areaId) {
            this.setAreaIdByAreaId(nodeA.areaId, nodeB.areaId);
            this.nodes[wallNode.x][wallNode.y].areaId = nodeB.areaId;
            return true;
        }
        return false;
    };
    MazeFusion.prototype.setAreaIdByAreaId = function (oldAreaId, newAreaId) {
        for (var x = 0; x < this.sizeX; x++) {
            for (var y = 0; y < this.sizeY; y++) {
                if (this.nodes[x][y].areaId === oldAreaId) {
                    this.nodes[x][y].areaId = newAreaId;
                }
            }
        }
    };
    MazeFusion.prototype.getNode = function (x, y, dx, dy) {
        var newX = x + dx;
        var newY = y + dy;
        if (newX >= 0 && newX < this.sizeX && newY >= 0 && newY < this.sizeY && this.nodes[newX][newY].id !== this.obstacleId) {
            return this.nodes[newX][newY];
        }
        return null;
    };
    MazeFusion.prototype.getGrid = function () {
        return this.nodes.map(function (row) { return row.map(function (node) { return node.id; }); });
    };
    return MazeFusion;
}());
exports.MazeFusion = MazeFusion;
