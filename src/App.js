import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    // server url is not working so taking payload from local
    fetch("./response.json")
      .then((res) => res.json())
      .then((response) => {
        const list = response.map((player) => {
          return {
            ...player,
            formattedDate: moment(player.date).format("DD-MM-YYYY h:mm:ss a"),
            profile: require(`../public/player-images/${player.Id}.jpg`),
          };
        });
        list.sort((a, b) => a.value - b.value);
        setPlayers(list);
        setPlayerData(list);
      });
  }, []);

  function getInput(e) {
    // server url not working so filtering data from local payload
    const value = e.target.value.toLowerCase();
    if (value) {
      setPlayers(
        playerData.filter((item) => item.PFName.toLowerCase().includes(value))
      );
    } else {
      setPlayers(playerData);
    }
  }

  return (
    <div className="main-container">
      <h3 className="heading">
        Api url given assignment is not working so data shown is local data
      </h3>
      <div className="input-container">
        <input
          type="text"
          className="input-box"
          onChange={getInput}
          placeholder="Enter player name"
        />
      </div>
      <div className="main-content">
        {players.map((player) => (
          <div className="box" key={player.Id}>
            <img
              className="player-img"
              alt={player.PFName}
              src={player.profile}
            />
            <div className="content">
              <p className="title">Name:{player.PFName}</p>
              <p className="skill">Game:{player.SkillDesc}</p>
              <p className="player-value">Value:${player.value}Million</p>
              <p className="match">Next Match:{player.formattedDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
