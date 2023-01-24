import React, { useState, useEffect, useRef } from "react";
import player from "./assets/player1.png";
import enemyImage from "./assets/enemy.png";
import bullet from "./assets/bullets.png";
import explosion from "./assets/explosion.png";

import song from "./audio/y2mate.com - Canción del GTA SA para ponerte carro volador o volar aviones.mp3";

import "./Juego.css";
import { CheckCollision } from "./components/bullets";
import Avion from "./components/avion";
import { useScore } from "./hooks/useScore";

function Juego() {
  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(50);
  const [enemies, setEnemies] = useState([
    { x: 100, y: 100 },
    { x: 200, y: 150 },
    { x: 300, y: 200 },
  ]);
  // const { score, setScore } = useScore();
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(120);
  const [bullets, setBullets] = useState([
    // {
    //   x: 450,
    //   y: 450,
    // },
  ]);
  const [explosions, setExplosions] = useState([]);
  // const audioRef = useRef(null);

  // useEffect(() => {
  //   audioRef.current = document.getElementById("song");
  // }, []);

  // useEffect(() => {
  //   audioRef.current.play();
  // }, []);

  // function Audio() {
  //   return (
  //     <audio id="song" ref={audioRef} loop={true} controls>
  //       <source src={song} type="audio/mpeg" />
  //     </audio>
  //   );
  // }
  const Avion = (props) => {
    let position;
    let rotation;
    if (props.isPlayer) {
      position = {
        bottom: props.y,
        left: props.x,
      };
    } else {
      position = {
        top: props.y,
        left: props.x,
      };
      rotation = "rotate(180deg)";
    }
    return (
      <img
        alt="avion"
        src={props.image}
        style={{
          position: "absolute",
          ...position,
          width: "10vw",
          height: "20vh",
          transform: rotation,
        }}
      />
    );
  };
  function handleShoot() {
    setBullets([...bullets, { x: playerX, y: playerY }]);
  }

  function moveBullets() {
    setBullets(
      bullets.map((bullet) => {
        bullet.y -= 5;
        return bullet;
      })
    );
  }
  function handleClick() {
    handleShoot();
    // moveBullets();
    // checkCollision();
  }

  function moveEnemies() {
    setEnemies(
      enemies.map((enemy) => {
        enemy.x += enemy.x < playerX ? 1 : -1;
        enemy.y += enemy.y < playerY ? 1 : -1;
        return enemy;
      })
    );
  }
  let distance;
  function checkCollision() {
    enemies.forEach((enemy, i) => {
      bullets.forEach((bullet, j) => {
        distance = Math.sqrt(
          Math.pow(enemy.x - bullet.x, 2) + Math.pow(enemy.y - bullet.y, 2)
        );
        if (distance < 30) {
          // alert("colisiono");
          setExplosions([...explosions, { x: enemy.x, y: enemy.y }]);
          setEnemies(enemies.filter((e, k) => k !== i));
          setBullets(bullets.filter((b, k) => k !== j));
          setScore((score) => score + 1);
          setExplosions([]);
        }
      });
    });
  }

  // useEffect(() => {
  //   return;
  // }, []);

  // const checkColissionPlayers = (intervalId) => {
  //   //colission from player to enemies
  //   enemies.forEach((enemy, i) => {
  //     const distance = Math.sqrt(
  //       Math.pow(enemy.x - playerX, 2) + Math.pow(enemy.y - playerY, 2)
  //     );
  //     if (distance < 0.5) {
  //       setExplosions([...explosions, { x: enemy.x, y: enemy.y }]);
  //       setEnemies(enemies.filter((e, k) => k !== i));
  //       setPlayerX(50);
  //       setPlayerY(50);
  //       alert("Game Over!");
  //       clearInterval(intervalId);
  //     }
  //   });
  // };
  function Explosion(props) {
    return (
      <img
        alt="explosion"
        src={explosion}
        style={{
          position: "absolute",
          left: props.x,
          top: props.y,
          width: "200px",
          height: "200px",
        }}
      />
    );
  }

  /*Crear un componente "Bullet" el cual se encargara 
    de simular los disparos y se encargara de detectar 
    cuando uno de los disparos colisiona con un avion enemigo.*/

  // function checkCollision(props) {
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
  //       src={bullet}
  //       style={{
  //         position: "absolute",
  //         left: props.x,
  //         top: props.y,
  //         width: "50px",
  //         height: "50px",
  //       }}
  //     />
  //   );
  // }
  function Bullet(props) {
    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     checkCollision();
    //     moveBullets();
    //   }, 100);

    //   return () => clearInterval(intervalId);
    // }, []);

    return (
      <img
        alt="bullet"
        src={bullet}
        style={{
          position: "absolute",
          left: props.x,
          top: props.y,
          width: "30px",
          height: "30px",
        }}
      />
    );
  }
  // function Bullet(props) {
  //   return checkCollision(props);
  // }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((time) => (time < 1 ? 5500 : time - 1));
      moveBullets();
      moveEnemies();
      checkCollision();
      // checkColissionPlayers(intervalId);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      setPlayerX(playerX - 10);
    } else if (event.key === "ArrowRight") {
      setPlayerX(playerX + 10);
    } else if (event.key === "ArrowUp") {
      setPlayerY(playerY + 10);
    } else if (event.key === "ArrowDown") {
      setPlayerY(playerY - 10);
    }
  }

  return (
    <div
      className="game-container"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* <Audio /> */}
      <Avion image={player} x={playerX} y={playerY} isPlayer />
      {enemies.map((enemy, index) => (
        <Avion
          key={index}
          image={enemyImage}
          x={enemy.x}
          y={enemy.y}
          style={{ marginLeft: 20 }}
          isPlayer={false}
        />
      ))}
      <div>Puntaje: {score}</div>
      <div>Tiempo: {time}</div>
      <div>Distancia: {Number(distance)}</div>
      {bullets.map((bullet, index) => (
        <Bullet key={index} x={bullet.x} y={bullet.y} />
      ))}
      {explosions.map((explosion, index) => (
        <Explosion key={index} x={explosion.x} y={explosion.y} />
      ))}
    </div>
  );
}
export default Juego;
