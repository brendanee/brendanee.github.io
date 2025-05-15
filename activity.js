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
// Testing only
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

function drawAdmin() {
  document.getElementById("admin").innerHTML = "";
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
    ele.className = 'adminChoice';
    ele.innerHTML = `${e.name} - ${wordGrade}<div class="studentList"><i>NO students sgined up</i></div>`;
    document.getElementById('admin').append(ele);
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

// After Google login flow
function loginCallback(response) {
  /* CALLBACK FUNCTION RETURNS AN OBJECT WE ONLY WANT ONE VALUE FROM */
  const decoded = decodeJwtResponse(response.credential);
  
  handleLogin(decoded);
}

function handleLogin(decoded) {
  if (decoded.exp < Date.now) {
    // Token expired
    localStorage.removeItem('JWTToken');
  } else {
    // User logged in
    localStorage.setItem('JWTToken', JSON.stringify(decoded));

    /* Show class selector */
    document.getElementById("google-wrapper").style.display = 'none';
    // User is an student
    if (decoded.hd === "tarriers.org") {
      drawActivities();
      document.getElementById("message").innerHTML = `Welcome, ${decoded.name}! <span id="logout">Logout</span><br> Rank your <strong>TOP FOUR</strong> choices for clubs this quater. You cannot select a club you've already taken, or one that's not available for your grade.`;
      document.getElementById('logout').addEventListener('click', logout, false);
    }
    // User is an admin
    if (decoded.hd === "charleswright.org" || decoded.email === "brendanee314@gmail.com") {
      drawAdmin();
      document.getElementById("message").innerHTML = `Welcome, ${decoded.name}! <span id="logout">Logout</span><br> View what clubs the students have choosen here, and modeify them. Insert fancy admin stuff here.`;
      document.getElementById('logout').addEventListener('click', logout, false);
    } 
  }
}

// Shamelessly stolen from Google, all rights to them or whatever
function decodeJwtResponse(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function logout() {
  localStorage.removeItem('JWTToken');
  location.reload();
}

// Needed as loginCallback, which Google calls, needs to be a global fucntion or something idk
window.loginCallback = loginCallback;


if (localStorage.getItem('JWTToken') !== null) {
  handleLogin(JSON.parse(localStorage.getItem('JWTToken')));
}