import { activityList, myGrade } from "./main";

const studentDiv = document.getElementById('student');
const adminDiv = document.getElementById('admin');

async function drawActivities() {
  adminDiv.innerHTML = "";
  studentDiv.innerHTML =  `<div id="activity-wrapper"></div>`;
  document.querySelector('html').className = '';

  activityList.forEach((e, i) => {
    let wordGrade = "";
    switch (e.grade.length) {
      case 1:
        wordGrade = e.grade + "th Grade Only";
        break;
      case 4:
        wordGrade = "All Grades";
        break;
      default:
        wordGrade = "Grades " + e.grade;
        break;
    }

    let ele = document.createElement('div');
    if (e.grade.includes(myGrade) && 0 !== e.limit) {
      ele.innerHTML = `<div class="rank">${e.rank === null ? "" : e.rank}</div>${e.name}<br>${wordGrade}<br>${e.limit - 0} spot${e.limit - 0 === 1 ? "" : "s"} left`;
      ele.className = e.rank === null ? "isNotRanked" : "isRanked";
      ele.addEventListener('click', () => setRank(i), false);
      document.getElementById('activity-wrapper').prepend(ele);
    } else {
      ele.innerHTML = `<div class="rank"></div>${e.name}<br>${wordGrade}<br>${e.limit - 0} spot${e.limit - 0 === 1 ? "" : "s"} left`;
      ele.className = 'cannotSelect';
      document.getElementById('activity-wrapper').append(ele);
    }
  });
  document.getElementById("message").innerHTML = `Rank your <strong>TOP FOUR</strong> choices for clubs this quater. You cannot select a club you've already taken, or one that's not available for your grade.`;
  
  let btn = document.createElement('button');
  btn.id = 'student-submit';
  btn.innerHTML = "Submit";
  btn.addEventListener('click', studentSubmit, false);
  studentDiv.appendChild(btn);  
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

function studentSubmit() {
  document.writeln(`Pretend this is a message to the server<br><br>`);
  document.writeln('token: ' + localStorage.getItem('JWTToken') + '<br>');
  activityList.filter((e) => e.rank !== null).sort((a, b) => a.rank - b.rank) .forEach((e, i) => {document.writeln(`choice #${i}: ${e.name}<br>`)});
}

export { drawActivities }