import { useState } from "react";

const AddChoreForm = ({ onAddChore }: { onAddChore: (description: string) => void}) => {
    const [description, setDescription] = useState("")

    return (
        <form>
            <input 
                type="text" 
                value={description} 
                placeholder="Chore description"
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
