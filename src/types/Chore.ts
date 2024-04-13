export default interface Chore {
    description: string;
    isComplete: boolean;
    category: ChoreCategory;
}

export enum ChoreCategory {
    Outdoor = "Outdoor",
    Kitchen = "Kitchen",
    Household = "Household",
    Other = "Other"
}