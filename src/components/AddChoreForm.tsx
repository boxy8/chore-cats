import { useState } from "react";
import styles from "./AddChoreForm.module.css";

const AddChoreForm = ({ onAddChore }: { onAddChore: (description: string) => void}) => {
    const [description, setDescription] = useState("")

    return (
        <form className={styles.form}>
            <input 
                type="text" 
                value={description} 
                placeholder="New chore"
                onInput={(e) => setDescription(e.currentTarget.value)}
            />
            <button 
                type="submit" 
                onClick={(e) => {
                    e.preventDefault();
                    onAddChore(description);
                    setDescription("");
                }}
            >
                Add
            </button>
        </form>
    );
}

export default AddChoreForm;
