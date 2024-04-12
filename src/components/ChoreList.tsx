import Chore from "../types/Chore";
import ChoreListItem from "./ChoreListItem";
import styles from "./ChoreList.module.css";

interface ChoreListProps {
    chores: Chore[];
    onChoreStatusChanged: (index: number, isComplete: boolean) => void;
    onRemove: (index: number) => void;
}

const ChoreList = ({ chores, onChoreStatusChanged, onRemove }: ChoreListProps) => {    
    return (
        <div className={styles.container}>
            <div className={styles.content}>
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
            </div>
        </div>
    )
}

export default ChoreList;