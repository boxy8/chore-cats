import { ChangeEvent } from "react";
import Chore, { ChoreCategory } from "../types/Chore";
import styles from "./ChoreListItem.module.css";

interface ChoreListItemProps {
    chore: Chore;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
}

const categoryIcons: Record<ChoreCategory, string> = {
    [ChoreCategory.Household]: 'household-icon.svg',
    [ChoreCategory.Kitchen]: 'kitchen-icon.svg',
    [ChoreCategory.Outdoor]: 'outdoor-icon.svg'
};

/**
 * ChoreListItem component displays a single chore item.
 * 
 * @component
 * @param {ChoreListItemProps} props - The props for the ChoreListItem component.
 * @param {Chore} props.chore - The chore object containing the chore details.
 * @param {function} props.onChange - The function to handle the change event when the checkbox is toggled.
 * @param {function} props.onRemove - The function to handle the remove button click event.
 * @returns {JSX.Element} The ChoreListItem component.
 */
const ChoreListItem = ({
    chore,
    onChange,
    onRemove,
}: ChoreListItemProps) => {
    return (
        <li className={styles.item}>
            <label className={`${styles.description} ${chore.isComplete ? styles.done : undefined}`}>
                <input
                    type="checkbox"
                    checked={chore.isComplete}
                    onChange={onChange}
                />
                {chore.description.toLowerCase()}
                {chore.category && <img src={categoryIcons[chore.category]} alt={chore.category}/>}
            </label>
            <button onClick={onRemove}>Remove</button>
        </li>
    );
};

export default ChoreListItem;
