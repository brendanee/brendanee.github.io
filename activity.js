let activityList = [
  {
    name: "Cool Kid Club",
    grades: [5, 6, 7, 8],
    rank: null,
  },
  {
    name: "Lorem Ipsum Club",
    grades: [7, 8],
    rank: null,
  },
  {
    name: "Fifth Grade Only Club",
    grades: [5],
    rank: null,
  },
  {
    name: "Crumbl Cookie Club",
    grades: [5, 6, 7, 8],
    rank: null,
  },
  {
    name: "Another Club",
    grades: [5, 6, 7, 8],
    rank: null,
  },
  {
    name: "A Third Club",
    grades: [7],
    rank: null,
  },
  {
    name: "Qwertyuiop Club",
    grades: [6, 7, 8],
    rank: null,
  },
  {
    name: "Asdf Club",
    grades: [5, 6, 7, 8],
    rank: null,
  },
];
let myGrade = 6;

function drawActivities() {
  document.getElementById("choices").innerHTML = "";
  activityList.forEach((e, i) => {
    let wordGrade = "";
    switch (e.grades.length) {
      case 1:
        wordGrade = e.grades + "th Grade Only";
        break;
      case 4:
        wordGrade = "All Grades";
        break;
      default:
        wordGrade = "Grades " + e.grades;
        break;
    }

    let ele = document.createElement('div');
    if (e.grades.includes(myGrade)) {
      ele.innerHTML = `<div class="rank">${e.rank === null ? "" : e.rank}</div>${e.name}<br>${wordGrade}`;
      ele.className = e.rank === null ? "isNotRanked" : "isRanked";
      ele.addEventListener('click', () => setRank(i), false);
      document.getElementById("choices").prepend(ele);
    } else {
      ele.innerHTML = `<div class="rank"></div>${e.name}<br>${wordGrade}`;
      ele.className = 'cannotSelect';
      document.getElementById("choices").append(ele);
    }
  });
}

function setRank(index) {
  let cur = activityList[index];

  if (cur.rank === null) {
    let tryRank = 1;
    while (activityList.map((e) => e.rank).includes(tryRank) && tryRank <= 4) {
      tryRank++;
    }
    if (tryRank > 4) {
      window.alert("Please only select your top four choices.")
      return;
    }
    cur.rank = tryRank;
  } else {
    cur.rank = null;
  }
  drawActivities();
}



// Init call
drawActivities();