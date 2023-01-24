// import React, { useState } from "react";
// import bullets from "../assets/bullets.png";
// import { useScore } from "../hooks/useScore";

// export function CheckCollision(props) {
//   const { score, setScore } = useScore();
//   const [enemies, setEnemies] = useState([
//     { x: 100, y: 100 },
//     { x: 200, y: 150 },
//     { x: 300, y: 200 },
//   ]);

//   let newEnemies = enemies.filter((enemy) => {
//     const distance = Math.sqrt(
//       Math.pow(enemy.x - props.x, 2) + Math.pow(enemy.y - props.y, 2)
//     );
//     if (distance > 30) {
//       return true;
//     } else {
//       setScore((score) => score + 1);
//       return false;
//     }
//   });
//   setEnemies(newEnemies);

//   return (
//     <img
//       alt="bullet"
//       src={bullets}
//       style={{
//         position: "absolute",
//         left: props.x,
//         top: props.y,
//         width: "10px",
//         height: "10px",
//       }}
//     />
//   );
// }
