import { Card } from "@/store/useQuizStore";
import styles from "./InfoPanel.module.css";

interface Props {
  card: Card;
}

export default function InfoPanel({ card }: Props) {
  return (
    <div className={styles.container}>
      <iframe
        src={`https://ebird.org/species/${card.bird.speciesCode}`}
        className={styles.panel}
      />
    </div>
  );
}
