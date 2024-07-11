import useQuizStore from "@/store/useQuizStore";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function NewQuizForm() {
  const [regionID, setRegionID] = useState("L3601258");

  const { setCards } = useQuizStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Fetch relevant birds with images
    const quizBirds = await axios.get("/api/quiz", {
      params: {
        regionID,
      },
    });

    // Create quiz flashcards
    const cards = quizBirds.data.birds.flatMap((bird: any) =>
      bird.imageURLs.map((imageURL: string) => ({
        imageURL,
        bird,
      }))
    );

    setCards(cards);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Region ID:{" "}
        <input
          type="text"
          value={regionID}
          onChange={(e) => setRegionID(e.target.value)}
        />
      </label>
      <button type="submit">Start quiz</button>
    </form>
  );
}
