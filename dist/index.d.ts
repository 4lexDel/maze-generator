/**
 * Maze generator
 */
type Node = {
    id: number;
    areaId: number;
};
declare class MazeFusion {
    sizeX: number;
    sizeY: number;
    obstacleId: number;
    passableId: number;
    nodes: Node[][];
    nbArea: number;
    wallNodes: {
        x: number;
        y: number;
    }[];
    constructor(sizeX: number, sizeY: number, obstacleId?: number, passableId?: number);
    initNodes(): void;
    generate(): number[][];
    fusionRandomArea(): boolean;
    mergeAreas(wallNode: {
        x: number;
        y: number;
    }, nodeA: Node | null, nodeB: Node | null): boolean;
    setAreaIdByAreaId(oldAreaId: number, newAreaId: number): void;
    getNode(x: number, y: number, dx: number, dy: number): Node | null;
    getGrid(): number[][];
}
export { MazeFusion };
