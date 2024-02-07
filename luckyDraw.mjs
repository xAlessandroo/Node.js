
function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

const players = ['Joe', 'Caroline', 'Sabrina']
function LuckyDraw(player){
   luckyDraw(player)
   .then((value) => console.log(value))
   .catch((err) => console.error(err))
}

players.forEach((player) => {
   LuckyDraw(player)
})
