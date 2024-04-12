import Chore from "../types/Chore";
import ChoreListItem from "./ChoreListItem";

interface ChoreListProps {
    chores: Chore[];
    onChoreStatusChanged: (index: number, isComplete: boolean) => void;
    onRemove: (index: number) => void;
}

const ChoreList = ({ chores, onChoreStatusChanged, onRemove }: ChoreListProps) => {    
    return chores.map((chore, index) => (
        <ChoreListItem
            key={index}
            chore={chore}
            onChange={(e) => onChoreStatusChanged(index, e.target.checked)}
            onRemove={() => onRemove(index)}
        />
    ))
}

export default ChoreList;
