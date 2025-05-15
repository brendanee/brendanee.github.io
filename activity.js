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

    if (e.grades.includes(myGrade)) {
      let ele = `<div onclick="setRank(${i})" class="${e.rank === null ? "isNotRanked" : "isRanked"}"><div class="rank">${e.rank === null ? "" : e.rank}</div>${e.name}<br>${wordGrade}</div>`;
      document.getElementById("choices").innerHTML = ele + document.getElementById("choices").innerHTML;
    } else {
      let ele = `<div class="cannotSelect"><div class="rank"></div>${e.name}<br>${wordGrade}</div>`;
      document.getElementById("choices").innerHTML += ele;
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