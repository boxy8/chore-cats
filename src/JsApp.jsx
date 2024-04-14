import { useEffect, useState } from "react";
import AddChoreForm from "./components/AddChoreForm";
import ChoreList from "./components/ChoreList"
import styles from "./App.module.css";

// 1. Typing
// let NUM_CATS;
// NUM_CATS = 12;
// NUM_CATS = "weee";
// NUM_CATS = ["hi", "bye"]

const NUM_CATS = 12;

// 2. Interfaces
const initialChores = [
  { description: "Take out the trash", isComplete: false },
  { description: "Walk the dog", isComplete: true },
  { descrption: "Wash the dishes", isComplete: false },
  { description: "Smile", isComplete: false },
];

export default function JsApp() {
  const [chores, setChores] = useState(initialChores);
  const [completedChores, setCompletedChores] = useState(0);
  const [shuffledCatIndices, setshuffledCatIndices] = useState([]);

  useEffect(() => {
    const initialCompletedChores = initialChores.filter(chore => chore.isComplete).length;
    setCompletedChores(initialCompletedChores);

    const catIndices = Array.from({ length: NUM_CATS }, (_, index) => index);
    setshuffledCatIndices(catIndices.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    console.log(chores)
  });

  const handleChoreStatusChanged = (index, isComplete) => {
    const newChores = [...chores];
    newChores[index] = { ...chores[index], isComplete };
    setChores(newChores);

    if (isComplete) {
      setCompletedChores(completedChores + 1);
    } else {
      setCompletedChores(completedChores - 1);
    }
  }

  const handleRemoveChore = (index) => {
    const newChores = [...chores];
    newChores.splice(index, 1);
    setChores(newChores);
  }

  const handleAddChore = (description, category) => {
    const newChore = {
      description,
      category,
      isComplete: false,
    };
    setChores([...chores, newChore]);
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2>Chores:</h2>
        <div className={styles.choreListContainer}>
          <ChoreList
            chores={chores}
            onChoreStatusChanged={handleChoreStatusChanged}
            onRemove={handleRemoveChore}
          />
        </div>
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
      <h2 className={styles.counter}>Completed: {completedChores}</h2>
    </div>
  )
}
