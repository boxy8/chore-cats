import Chore from "../types/Chore";
import ChoreListItem from "./ChoreListItem";

interface ChoreListProps {
    chores: Chore[];
    onChoreStatusChanged: (index: number, isComplete: boolean) => void;
    onRemove: (index: number) => void;
}

const ChoreList = ({ chores, onChoreStatusChanged, onRemove }: ChoreListProps) => {    
    return (
        <ul>
            {chores.map((chore, index) => (
                <ChoreListItem
                    key={index}
                    chore={chore}
                    onChange={(e) => onChoreStatusChanged(index, e.currentTarget.checked)}
                    onRemove={() => onRemove(index)}
                />
            ))}
        </ul>
    )
}

export default ChoreList;