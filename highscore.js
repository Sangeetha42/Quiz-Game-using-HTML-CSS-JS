const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(s => `<li>${s.name} - ${s.score}</li>`)
  .join("");
