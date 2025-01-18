export function isDev() : boolean {
    return process.env.NODE_ENV == "development";
}

export type Node = {
    id: string;
    latitude: number;
    longitude: number;
    altitude: number;
    connections: string[];
};

export type Graph = {
    [nodeId: string]: Node;
};