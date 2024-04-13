import Chore from "./types/Chore";
import AddChoreForm from "./components/AddChoreForm";
import ChoreList from "./components/ChoreList"
import { useEffect, useState } from "react";
import styles from "./App.module.css";

const initialChores: Chore[] = [
  { description: "Take out the trash", isComplete: false },
  { description: "Walk the dog", isComplete: true },
  { description: "Do the dishes", isComplete: false },
];

const NUM_CATS = 12;

function App() {
  const [chores, setChores] = useState(initialChores);
  const [completedChores, setCompletedChores] = useState(0);
  const [shuffledCatIndices, setshuffledCatIndices] = useState<number[]>([]);

  useEffect(() => {
    const initialCompletedChores = initialChores.filter(chore => chore.isComplete).length;
    setCompletedChores(initialCompletedChores);

    const catIndices = Array.from({ length: NUM_CATS }, (_, index) => index);
    setshuffledCatIndices(catIndices.sort(() => Math.random() - 0.5));
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
    <div className={styles.background}>
      <div className={styles.container}>
        <ChoreList
          chores={chores}
          onChoreStatusChanged={handleChoreStatusChanged}
          onRemove={handleRemoveChore}
        />
        <AddChoreForm onAddChore={handleAddChore} />
      </div>
      <div className={styles.catContainer}>
      {
        Array.from({ length: NUM_CATS }, (_, index) => index).map((index) => (
          <img
            key={index}
            src={`/cats/cat${index}.png`}
            alt={`Cat ${index}`}
            className={`${styles.catImg} ${!shuffledCatIndices.slice(0, completedChores).includes(index) && styles.hide}`}
          />
        ))
      }
    </div>
      <h1 className={styles.counter}>Completed: {completedChores}</h1>
    </div>
  )
}

export default App
