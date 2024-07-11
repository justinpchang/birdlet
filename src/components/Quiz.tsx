import useQuizStore from "@/store/useQuizStore";
import { useState } from "react";
import Flashcard from "./Flashcard";
import InfoPanel from "./InfoPanel";
import styles from "./Quiz.module.css";

export default function Quiz() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [shouldShowAnswer, setShouldShowAnswer] = useState(false);
  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  const { cards, setCards } = useQuizStore();

  const currentCard = cards[currentCardIndex];

  const handleNextStep = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShouldShowAnswer(false);
      setShouldShowInfo(false);
    } else {
      // Reshuffle and start over
      setCards(cards);
      setCurrentCardIndex(0);
      setShouldShowAnswer(false);
      setShouldShowInfo(false);
    }
  };

  return (
    <div>
      <h2>Card {currentCardIndex + 1}</h2>
      <div className={styles.columns}>
        <div>
          <div
            onClick={() => {
              setShouldShowAnswer(!shouldShowAnswer);
              setShouldShowInfo(true);
            }}
          >
            <Flashcard card={currentCard} shouldShowAnswer={shouldShowAnswer} />
          </div>
          <button onClick={handleNextStep}>Next</button>
        </div>
        {shouldShowInfo ? (
          <InfoPanel card={currentCard} />
        ) : (
          <div>Click to reveal answer.</div>
        )}
      </div>
    </div>
  );
}
