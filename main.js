let result = [
    ["I", "Q", "E", "E", "N"],
    ["P", " ", "P", " ", "Y"],
    ["P", " ", "S", " ", "T"],
    ["E", "R", "E", "W", "D"],
    ["U", " ", "A", " ", "S"],
  ];
  
  let solved = [
    ["S", "Q", "U", "A", "D"],
    ["E", " ", "P", " ", "I"],
    ["N", " ", "P", " ", "R"],
    ["S", "W", "E", "E", "T"],
    ["E", " ", "R", " ", "Y"],
  ];

  function scramble(arr) {
    //what the solved array looks like flat
    //console.log(solved.flat()) = ['S', 'Q', 'U', 'A', 'D', 'E', ' ', 'P', ' ', 'I', 'N', ' ', 'P', ' ', 'R', 'S', 'W', 'E', 'E', 'T', 'E', ' ', 'R', ' ', 'Y']
    let res = arr.flat();
    var scrambled = new Array();
    //counts the amount of times a letter is swapped and counts if the optimizes (will need work)
    var opt = 0;
    //uses the soultion array and makes a maps of locations that can be swapped around
    for (let i = 0; i < res.length; i++){
        if(res[i] !== " "){
            //should generate an array of that lists where letters are
            scrambled.push(i, res[i]); //makes it dynamic?
        };
    };

    //shifts the item key
    for (let i = 0; i < scrambled.length; i++){
      let b = Math.floor(Math.random() * scrambled.length);
      let temp = scrambled[i][i];
      scrambled[i][i] = scrambled[i][b];
      scrambled[i][b] = temp;
      opt++;
    }


    console.log(scrambled);
  }
  

  let score = [];
  
  let Running = true;
  let moves = 0;
  
  let letterMoving = "";
  let dropLetter = "";
  
  function setboard() {
    if (checkWin()) {
      score.shift();
      console.log(score);
  
      let s = document.getElementById("score");
      s.style.display = "flex";
  
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
      setTimeout(shoot, 300);
    }
    let board = document.getElementById("gameboard");
    board.innerHTML = "";
    result.forEach((item, idx) => {
      item.forEach((letter, idx2) => {
        board.appendChild(createPeice(letter, [], idx, idx2));
      });
    });
  }
  
  function checkWin() {
    let amount = document.querySelectorAll("#gameboard > .peice");
    let correct = document.querySelectorAll("#gameboard > .correct");
    let partial = document.querySelectorAll("#gameboard > .partial");
  
    score.push((correct.length + partial.length / 2) / amount.length);
    console.log(score);
    return solved
      .map((row, i) => {
        return row.map((cell, j) => cell === result[i][j]).every(Boolean);
      })
      .every(Boolean);
  }
  
  function checkPeice(item) {
    if (Running) {
      let pos1 = item.getAttribute("pos1");
      let pos2 = item.getAttribute("pos2");
      let letter = item.innerHTML;
      const letterSolved = solved[pos1][pos2];
  
      let lettersToCheck = [];
      let row = solved[pos1];
      let col = [];
      solved.forEach((i) => col.push(i[pos2]));
  
      lettersToCheck = [
        [...getReleventLetters(row, pos1, letter)],
        [...getReleventLetters(col, pos2, letter)],
      ];
      console.log(letter);
      console.log(lettersToCheck);
      if (letter == letterSolved) {
        return "correct";
      }
      if (lettersToCheck.flat().includes(letter)) {
        return "partial";
      }
    }
  }
  
  function getReleventLetters(arr, pos, letter) {
    // if no spaces then return full row,
    // if a space on both sides just retrun the letter
      let res = []
    if (!arr.some((item) => item == " ")) {
      res +=  arr;
    } else {
      res += "";
    }
  
    return res
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drop(ev) {
    let movesDOM = document.getElementById("moves");
    dropLetter = ev.target;
    let LMpos1 = letterMoving.getAttribute("pos1");
    let LMpos2 = letterMoving.getAttribute("pos2");
  
    let DLpos1 = dropLetter.getAttribute("pos1");
    let DLpos2 = dropLetter.getAttribute("pos2");
  
    let temp = result[DLpos1][DLpos2];
  
    result[DLpos1][DLpos2] = result[LMpos1][LMpos2];
  
    result[LMpos1][LMpos2] = temp;
    if (letterMoving != dropLetter) {
      moves += 1;
      movesDOM.innerHTML = moves;
    }
  
    setboard();
  }
  
  function drag(ev) {
    letterMoving = ev.target;
  }
  
  function touchMove(ev) {
    ev.preventDefault();
    let touch = ev.touches[0];
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    target.style.position = "relative";
    target.style.left = ev.clientX - target.offsetWidth / 2 + "px";
    target.style.top = ev.clientY - target.offsetHeight / 2 + "px";
  
    target.style;
    if (target && target.classList.contains("peice")) {
      dropLetter = target;
    }
  }
  
  function touchEnd(ev) {
    ev.preventDefault();
    if (dropLetter) {
      let LMpos1 = letterMoving.getAttribute("pos1");
      let LMpos2 = letterMoving.getAttribute("pos2");
  
      let DLpos1 = dropLetter.getAttribute("pos1");
      let DLpos2 = dropLetter.getAttribute("pos2");
  
      let temp = result[DLpos1][DLpos2];
  
      result[DLpos1][DLpos2] = result[LMpos1][LMpos2];
      result[LMpos1][LMpos2] = temp;
      if (letterMoving != dropLetter) {
        moves += 1;
        let movesDOM = document.getElementById("moves");
        movesDOM.innerHTML = moves;
      }
  
      setboard();
    }
  }
  
  function createPeice(content, classes = [], pos1, pos2) {
    let peice = document.createElement("div");
    if (content != " ") {
      classes.push("peice");
  
      peice.innerText = content;
  
      peice.setAttribute("pos1", pos1);
      peice.setAttribute("pos2", pos2);
      peice.addEventListener("touchstart", drag, false);
      peice.addEventListener("touchmove", touchMove, false);
      peice.addEventListener("touchend", touchEnd, false);
      peice.pos2 = pos2;
      peice.ondragstart = drag;
      peice.ondrop = drop;
      peice.ondragover = allowDrop;
      peice.draggable = true;
      classes.push(checkPeice(peice));
      peice.classList.add(...classes);
    }
    return peice;
  }
  
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["a7c957", "f3de2c"],
  };
  
  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });
  
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }
  
  function copyScore() {
    let date = new Date();
    let res = `CrossDrop Score for ${date.getMonth() + 1}/${date.getDate()}\n`;
    console.log(score);
    score.forEach((percentage, idx) => {
      let rating = ["🟥", "🟨", "🤏"];
      res += `turn ${idx + 1}: ${percentage * 100}%\n`;
    });
  
    res += "Crossdrop: https://ham80234.github.io/Game";
    navigator.clipboard.writeText(res);
    let checkmark = document.getElementById("checkmark");
    checkmark.style.opacity = 100;
    setTimeout();
  }