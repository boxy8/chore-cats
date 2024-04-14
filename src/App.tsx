// import Chore from "./types/Chore";
// import { ChoreCategory } from "./types/Chore";
import AddChoreForm from "./components/AddChoreForm";
import ChoreList from "./components/ChoreList"
import { useEffect, useState } from "react";
import styles from "./App.module.css";

// 1. Typing
// let NUM_DOGS: number = 12;
// NUM_DOGS = "heyyy"

const NUM_CATS = 12;

// 2. Interfaces
interface Chore {
  description: string,
  isComplete: boolean,
  category?: ChoreCategory
}

// 3. Enums
enum ChoreCategory {
  Household = "Household",
  Outdoor = "Outdoor",
  Kitchen = "Kitchen"
}

// 4. Union types and Literal types
// let NumberOrString: number | string;
// NumberOrString = 12;
// NumberOrString = "twelve";

// let SimpleChoreCategory: "Household" | "Outdoor" | "Kitchen";

const initialChores: Chore[] = [
  { description: "Take out the trash", isComplete: false, category: ChoreCategory.Outdoor },
  { description: "Walk the dog", isComplete: true, category: ChoreCategory.Outdoor },
  { description: "Do the dishes", isComplete: false, category: ChoreCategory.Kitchen },
  { description: "Smile", isComplete: false },
];

/**
 * App component is the root component of the app. It displays the list of chores, a form for adding new chores, and cat images.
 * @returns The App component.
 */
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

  
  /**
   * This function will be called when a chore item's checkbox is clicked.
   * We will modify the clicked to-do item's isComplete status.
   * 
   * @param index - The index of the chore item in the chores array.
   * @param isComplete - The new isComplete status of the chore item.
   */
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

  /**
   * This function will be called when a chore item's remove button is clicked.
   * We will remove the clicked to-do item from the chores array.
   * 
   * @param index - The index of the chore item in the chores array.
   */
  const handleRemoveChore = (index: number) => {
    const newChores = [...chores];
    newChores.splice(index, 1);
    setChores(newChores);
  }

  // 3. Functions
  /**
   * This function will be called when a new chore is added.
   * We will add the new chore to the chores array.
   * 
   * @param description - The description of the new chore.
   * @param category - The category of the new chore.
   */
  const handleAddChore = (description: string, category?: ChoreCategory) => {
    const newChore: Chore = {
      description,
      isComplete: false,
      category
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

export default App
