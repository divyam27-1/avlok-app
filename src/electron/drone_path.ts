import {Graph, Node} from './utils.js'

const graph: Graph = {
    "node1": {
        id: "node1",
        latitude: 12.9716,
        longitude: 77.5946,
        altitude: 300,
        connections: ["node2", "node3"],
    },
    "node2": {
        id: "node2",
        latitude: 12.2958,
        longitude: 76.6394,
        altitude: 320,
        connections: ["node1", "node4"],
    },
    "node3": {
        id: "node3",
        latitude: 13.0827,
        longitude: 80.2707,
        altitude: 350,
        connections: ["node1"],
    },
};

let lastConfirmedNode: string | null = "node1";

let currentTargetNode: string | null = "node3";

/**
 * Finds the shortest path between two nodes using Dijkstra's algorithm.
 * @param startNodeId - The ID of the starting node.
 * @param endNodeId - The ID of the target node.
 * @returns An array of node IDs representing the shortest path, or an empty array if no path exists.
 */
export function getShortestPath(startNodeId: string, endNodeId: string): string[] {
    if (!graph[startNodeId] || !graph[endNodeId]) {
        console.warn("Invalid node IDs");
        return [];
    }

    const distances: Record<string, number> = {};
    const previousNodes: Record<string, string | null> = {};
    const unvisitedNodes = new Set<string>();

    for (const nodeId in graph) {
        distances[nodeId] = Infinity;
        previousNodes[nodeId] = null;
        unvisitedNodes.add(nodeId);
    }
    distances[startNodeId] = 0;

    while (unvisitedNodes.size > 0) {
        const currentNodeId = Array.from(unvisitedNodes).reduce((closest, node) =>
            distances[node] < distances[closest] ? node : closest
        );

        if (currentNodeId === endNodeId) {
            const path: string[] = [];
            let current: string | null = endNodeId;
            while (current) {
                path.unshift(current);
                current = previousNodes[current];
            }
            return path;
        }

        unvisitedNodes.delete(currentNodeId);

        for (const neighbor of graph[currentNodeId].connections) {
            if (!unvisitedNodes.has(neighbor)) continue;

            const newDistance = distances[currentNodeId] + 1;
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previousNodes[neighbor] = currentNodeId;
            }
        }
    }

    return [];
}

/**
 * Gets the last confirmed node the drone was at.
 * @returns The node ID of the last confirmed position, or null if not set.
 */
export function getLastConfirmedNode(): string | null {
    return lastConfirmedNode;
}

/**
 * Gets the node the drone is currently heading to.
 * @returns The node ID of the target position, or null if not set.
 */
export function getCurrentTargetNode(): string | null {
    return currentTargetNode;
}