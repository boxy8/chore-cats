import Chore from "../types/Chore";
import ChoreListItem from "./ChoreListItem";
import styles from "./ChoreList.module.css";

interface ChoreListProps {
    chores: Chore[];
    onChoreStatusChanged: (index: number, isComplete: boolean) => void;
    onRemove: (index: number) => void;
}

/**
 * ChoreList component displays a list of chores.
 *
 * @component
 * @param {Chore[]} chores - The array of chores to display.
 * @param {(index: number, isComplete: boolean) => void} onChoreStatusChanged - The function to call when the status of a chore is changed.
 * @param {(index: number) => void} onRemove - The function to call when a chore is removed.
 * @returns {JSX.Element} The ChoreList component.
 */
const ChoreList = ({ chores, onChoreStatusChanged, onRemove }: ChoreListProps) => {    
    return (
            <>
                <ul className={styles.list}>
                    {chores.map((chore, index) => (
                        <ChoreListItem
                            key={index}
                            chore={chore}
                            onChange={(e) => onChoreStatusChanged(index, e.currentTarget.checked)}
                            onRemove={() => onRemove(index)}
                        />
                    ))}
                </ul>
            </>
    )
}

export default ChoreList;