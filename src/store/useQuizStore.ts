import { RawBird } from "@/requests/ebird";
import _ from "lodash";
import { create } from "zustand";

export interface Card {
  imageURL: string;
  bird: RawBird;
  isPlaying: boolean;
}

interface QuizState {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  isPlaying: boolean;
}

const useQuizStore = create<QuizState>()((set) => ({
  cards: [],
  setCards: (cards: Card[]) =>
    set({ cards: _.shuffle(cards), isPlaying: true }),
  isPlaying: false,
}));

export default useQuizStore;
