import { drone_graph } from './temp_graph_db.js';

let lastConfirmedNode: string | null = "node1";

let currentTargetNode: string | null = "node3";

/**
 * Finds the shortest path between two nodes using Dijkstra's algorithm.
 * @param startNodeId - The ID of the starting node.
 * @param endNodeId - The ID of the target node.
 * @returns An array of node IDs representing the shortest path, or an empty array if no path exists.
 */
export function getShortestPath(startNodeId: string, endNodeId: string): string[] {
    if (!drone_graph[startNodeId] || !drone_graph[endNodeId]) {
        console.warn("Invalid node IDs");
        return [];
    }

    const distances: Record<string, number> = {};
    const previousNodes: Record<string, string | null> = {};
    const unvisitedNodes = new Set<string>();

    for (const nodeId in drone_graph) {
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

        for (const neighbor of drone_graph[currentNodeId].connections) {
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

export function getGraph() {
    return drone_graph;
}
