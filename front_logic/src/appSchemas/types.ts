export type CompleteRank = {
    empService: {
        id: string;
        name: string;
    } | null;
    id: string;
    name: string;
}
export type Rank = {
    id: string;
    name: string;  
    empServiceId : number;
}

export type empService = {
    id: string;
    name: string;
}