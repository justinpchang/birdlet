import { Card } from "@/store/useQuizStore";
import styles from "./Flashcard.module.css";

interface Props {
  card: Card;
  shouldShowAnswer: boolean;
}

export default function Flashcard({ card, shouldShowAnswer }: Props) {
  return (
    <div className={styles.card}>
      <img src={card.imageURL} alt="Could not load image" />
      {shouldShowAnswer && <h1>{card.bird.comName}</h1>}
    </div>
  );
}
