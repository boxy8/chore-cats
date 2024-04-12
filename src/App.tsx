import Chore from "./types/Chore";
import AddChoreForm from "./components/AddChoreForm";
import ChoreList from "./components/ChoreList"
import { useEffect, useState } from "react";

const initialChores: Chore[] = [
  { description: "Take out the trash", isComplete: false },
  { description: "Walk the dog", isComplete: true },
  { description: "Do the dishes", isComplete: false },
];

function App() {
  const [chores, setChores] = useState(initialChores);
  const [completedChores, setCompletedChores] = useState(0);

  useEffect(() => {
    const initialCompletedChores = initialChores.filter(chore => chore.isComplete).length;
    setCompletedChores(initialCompletedChores);
  }, []);

  const handleChoreStatusChanged = (index: number, isComplete: boolean) => {
    const newChores = [...chores];
    newChores[index] = { ...chores[index], isComplete };
    setChores(newChores);
    
    if (isComplete) {
      setCompletedChores(completedChores + 1);
    } else {
      setCompletedChores(completedChores - 1);
    }
  }

  const handleRemoveChore = (index: number) => {
    const newChores = [...chores];
    newChores.splice(index, 1);
    setChores(newChores);
  }

  const handleAddChore = (description: string) => {
    const newChore: Chore = {
      description,
      isComplete: false,
    };
    setChores([...chores, newChore]);
  }

  return (
    <>
      <ChoreList
        chores={chores}
        onChoreStatusChanged={handleChoreStatusChanged}
        onRemove={handleRemoveChore}
      />
      <AddChoreForm onAddChore={handleAddChore} />
      <h1>Completed: {completedChores}</h1>
    </>
  )
}

export default App
