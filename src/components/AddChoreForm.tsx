import { useState } from "react";
import { ChoreCategory } from "../types/Chore";
import styles from "./AddChoreForm.module.css";

const AddChoreForm = ({ onAddChore }: { onAddChore: (description: string, category?: ChoreCategory) => void}) => {
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState<ChoreCategory | "">(ChoreCategory.Household)

    const handleAddChore = () => {
        if (description.trim()) {
            if (category == "") {
                onAddChore(description);
            } else {
                onAddChore(description, category);
            }
            setDescription("");
        }
    }

    return (
        <form className={styles.form}>
            <input 
                type="text" 
                value={description} 
                placeholder="New chore"
                onInput={(e) => setDescription(e.currentTarget.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value as ChoreCategory)}>
                {Object.values(ChoreCategory).map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
                <option value={""}>None</option>
            </select>
            <button 
                type="submit" 
                onClick={(e) => {
                    e.preventDefault();
                    handleAddChore();
                }}
            >
                Add
            </button>
        </form>
    );
}

export default AddChoreForm;
