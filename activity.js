let activityList = [
  {
    name: "Cool Kid Club",
    grades: [5, 6, 7, 8],
    rank: null,
    filledSpots: 5,
    totalSpots: 20,
  },
  {
    name: "Lorem Ipsum Club",
    grades: [7, 8],
    rank: null,
    filledSpots: 5,
    totalSpots: 10,
  },
  {
    name: "Fifth Grade Only Club",
    grades: [5],
    rank: null,
    filledSpots: 5,
    totalSpots: 20,
  },
  {
    name: "Crumbl Cookie Club",
    grades: [5, 6, 7, 8],
    rank: null,
    filledSpots: 18,
    totalSpots: 20,
  },
  {
    name: "Another Club",
    grades: [5, 6, 7, 8],
    rank: null,
    filledSpots: 5,
    totalSpots: 20,
  },
  {
    name: "A Third Club",
    grades: [6, 7],
    rank: null,
    filledSpots: 15,
    totalSpots: 20,
  },
  {
    name: "Qwertyuiop Club",
    grades: [6, 7, 8],
    rank: null,
    filledSpots: 5,
    totalSpots: 20,
  },
  {
    name: "Asdf Club",
    grades: [5, 6, 7, 8],
    rank: null,
    filledSpots: 17,
    totalSpots: 17,
  },
];
// Testing only
let myGrade = 6;

function drawActivities() {
  document.getElementById("student").innerHTML = "";
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
    if (e.grades.includes(myGrade) && e.filledSpots !== e.totalSpots) {
      ele.innerHTML = `<div class="rank">${e.rank === null ? "" : e.rank}</div>${e.name}<br>${wordGrade}<br>${e.totalSpots - e.filledSpots} spots left`;
      ele.className = e.rank === null ? "isNotRanked" : "isRanked";
      ele.addEventListener('click', () => setRank(i), false);
      document.getElementById("student").prepend(ele);
    } else {
      ele.innerHTML = `<div class="rank"></div>${e.name}<br>${wordGrade}<br>${e.totalSpots - e.filledSpots} spots left`;
      ele.className = 'cannotSelect';
      document.getElementById("student").append(ele);
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

function studentSubmit() {
  document.writeln(`THIS IS A SERVER MESSAGE`);
  document.writeln(`{<br>`)
  document.writeln('jwt: ' + localStorage.getItem('JWTToken') + '<br>');
  activityList.filter((e) => e.rank !== null).sort((a, b) => a.rank - b.rank) .forEach((e, i) => {document.writeln(`choice #${i}: ${e.name}<br>`)});
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
    ele.innerHTML = `${e.name} - ${wordGrade}<div class="studentList">${e.filledSpots} signed up (max ${e.totalSpots})</div>`;
    document.getElementById('admin').append(ele);
  });
}

// After Google login flow
function loginCallback(response) {
  // Don't decode
  const decoded = response.credential;
  
  // Send token to backend
  fetch('https://aitoolft.com/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({token: decoded})
  })
  .then(res => res.json())
  .then(data => {
    console.log(`Login success, token from server ${data.token}`);
    localStorage.setItem('JWTToken', data.token);
    // On message back from server, run log in client side
    handleLogin(data.token);
  });
}

function handleLogin(jwt) {
  const decoded = decodeJwtResponse(jwt);
  if (decoded.exp < Date.now / 1000) {
    // Token expired
    localStorage.removeItem('JWTToken');
  } else {
    // User logged in
    /* Show class selector */
    // User is an student
    if (decoded.sub.includes("@tarriers.org")) {
      drawActivities();
      document.getElementById("message").innerHTML = `Welcome, ${decoded.sub}! <span id="logout">Logout</span><br> Rank your <strong>TOP FOUR</strong> choices for clubs this quater. You cannot select a club you've already taken, or one that's not available for your grade.`;
      document.getElementById('logout').addEventListener('click', logout, false);
      let btn = document.createElement('button');
      btn.id = 'student-submit';
      btn.innerHTML = "Submit";
      btn.addEventListener('click', studentSubmit, false);
      document.getElementById('student').insertAdjacentElement('afterend', btn);
    }
    // User is an admin
    if (decoded.sub.includes("@charleswright.org")) {
      drawAdmin();
      document.getElementById("message").innerHTML = `Welcome, ${decoded.sub}! <span id="logout">Logout</span><br> View what clubs the students have choosen here, and modeify them. Insert fancy admin stuff here.`;
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

// Needed as loginCallback, which Google calls, needs to be a global function or something idk
window.loginCallback = loginCallback;

// On startup, if user is 
if (localStorage.getItem('JWTToken') !== null) {
  handleLogin(localStorage.getItem('JWTToken'));
}
/*
  fetch('http://aitoolft.com/api/auth/validate', {
    method: 'GET',
    headers: {'bearer': "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZWJyZUB0YXJyaWVycy5vcmciLCJpYXQiOjE3NDczNjc0NzEsImV4cCI6MTc0NzQ1Mzg3MX0.DuaJ-6hl8PdWoLxLtVOn2xcIOScKOXMGVNrVqEx7mJo"},
  })*/