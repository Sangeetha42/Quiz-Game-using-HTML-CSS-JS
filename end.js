const finalScore = document.getElementById("finalScore");
const username = document.getElementById("username");
const saveScoreForm = document.getElementById("saveScoreForm");

const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = `Your Score: ${mostRecentScore}`;

const saveHighScore = (e) => {
  e.preventDefault();

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const score = {
    score: mostRecentScore,
    name: username.value
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score); // sort high to low
  highScores.splice(5); // keep top 5

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("highscore.html"); // go to leaderboard
};

saveScoreForm.addEventListener("submit", saveHighScore);
