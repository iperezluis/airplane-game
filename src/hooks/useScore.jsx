import { useState } from "react";

export const useScore = () => {
  const [score, setScore] = useState(0);

  return { score, setScore };
};
