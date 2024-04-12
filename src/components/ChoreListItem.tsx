import { ChangeEvent } from "react";
import Chore from "../types/Chore";
import styles from "./ChoreListItem.module.css";

interface ChoreListItemProps {
    chore: Chore;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
}

const ChoreListItem = ({
    chore,
    onChange,
    onRemove,
}: ChoreListItemProps) => {
    return (
        <li>
            <label className={chore.isComplete ? styles.done : undefined}>
                {chore.description}{" "}
                <input
                    type="checkbox"
                    checked={chore.isComplete}
                    onChange={onChange}
                />
            </label>
            <button onClick={onRemove}>Remove</button>
        </li>
    );
};

export default ChoreListItem;
