import Chore from "./types/Chore";
import ChoreList from "./components/ChoreList"
import { useState } from "react";

const initialChores: Chore[] = [
  { description: "Take out the trash", isComplete: false },
  { description: "Walk the dog", isComplete: true },
  { description: "Do the dishes", isComplete: false },
];

function App() {
  const [chores, setChores] = useState(initialChores);

  const handleChoreStatusChanged = (index: number, isComplete: boolean) => {
    const newChores = [...chores];
    newChores[index] = { ...chores[index], isComplete };
    setChores(newChores);
  }

  const handleRemoveChore = (index: number) => {
    const newChores = [...chores];
    newChores.splice(index, 1);
    setChores(newChores);
  }

  return (
    <>
      <ChoreList 
        chores={chores} 
        onChoreStatusChanged={handleChoreStatusChanged}
        onRemove={handleRemoveChore}
      />
    </>
  )
}

export default App
