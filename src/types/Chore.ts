export default interface Chore {
    description: string;
    isComplete: boolean;
    category?: ChoreCategory;
}

export enum ChoreCategory {
    Household = "Household",
    Outdoor = "Outdoor",
    Kitchen = "Kitchen"
}