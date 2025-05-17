let activityList = [];
  /*{
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
    filledSpots: 19,
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
  },*/

let myGrade;
const studentDiv = document.getElementById('student');
const adminDiv = document.getElementById('admin');

function drawActivities() {
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

function drawAdmin() {
  adminDiv.innerHTML =  `<div id="admin-activity-wrapper"></div><div id="sidebar"><div id="add-activity"><b>+</b> Add Activity</div></div>`;
  studentDiv.innerHTML = "";
  document.querySelector('html').className = 'admin';

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
    ele.className = 'adminChoice';
    ele.innerHTML = `${e.name} (${e.id}) - ${wordGrade}<div class="studentList">${0} signed up (max ${e.limit})</div>`;
    document.getElementById('admin-activity-wrapper').append(ele);
  });
  document.getElementById('add-activity').addEventListener('click', showAddActivity, false);
  document.getElementById("message").innerHTML = `View what clubs the students have choosen here, and modeify them. Insert fancy admin stuff here.`;        
}

function showAddActivity() {
  document.getElementById('sidebar').innerHTML += `
    <label for="activity-name">Activity Name:</label>
    <input type="text" placeholder="i.e. Cool Kid's Club" name="activity-name" id="activity-name">
    <label for="activity-name">Veracross ID:</label>
    <input type="text" placeholder="i.e. MATH:3900" name="activity-name" id="activity-name">
    <label for="total-spots">Max particapants:</label>
    <input type="number" placeholder="15" name="total-spots" id="total-spots">
    <label for="5">5th</label>
    <input checked type="checkbox" name="5" id="5">
    <label for="6">6th</label>
    <input checked type="checkbox" name="6" id="6">
    <label for="7">7th</label>
    <input checked type="checkbox" name="7" id="7">
    <label for="8">8th</label>
    <input checked type="checkbox" name="8" id="8">
    <button id="submit">Submit</button>
  `;
  document.getElementById('submit').addEventListener('click', handleAddActivity, false);
}

function handleAddActivity() {
  let gradeList = [];
  document.getElementById('5').checked ? gradeList.push(5) : '';
  document.getElementById('6').checked ? gradeList.push(6) : '';
  document.getElementById('7').checked ? gradeList.push(7) : '';
  document.getElementById('8').checked ? gradeList.push(8) : '';
  
  let object = {
    name: document.getElementById('activity-name').value,
    grade: gradeList,
    id: Date.now(),
    limit: document.getElementById('total-spots').value,
  }
  
  fetch('https://aitoolft.com/api/admin/elective/add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('JWTToken')}`},
    body: JSON.stringify(object),
  })
  .then(res => res.status)
  .then(code => {
    console.log(`sucess` + code);
  });
}

// After Google login flow
function loginCallback(response) {
  // Don't decode
  const decoded = response.credential;
  // Saving name to localStorage - untrusted
  localStorage.setItem('name', decodeJwtResponse(decoded).name);
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

// Called when logged in (or loaded and logged in) and server-side validated
async function handleLogin(jwt) {
  const decoded = decodeJwtResponse(jwt);

  myGrade = await getGrade(decoded.sub);
  activityList = await getActivities();
    document.getElementById('header-message').innerHTML = `Welcome, ${localStorage.getItem('name')}!`;

    // Hide google sign in, show log out
    document.getElementById('google-wrapper').style.display = 'none';
    document.getElementById('logout').style.display = 'block';

    // User is an admin
    if (decoded.sub.includes("@charleswright.org")) {
      drawAdmin();
      return;
    } 

    // User is an student
    if (decoded.sub.includes("@tarriers.org")) {
      drawActivities();
      return;
    }
}

async function getGrade(email) {
  return fetch(`https://aitoolft.com/api/students/info?email=${email}`, {method: 'GET'}) 
  .then(res => {
    if (res.status === 404) {
      console.warn("No grade found, using test grade of 6th. Failed email: " + email);
      return {'grade': 6,}
    } else {
      res.json();
    }
  })
  .then(data => data.grade);
}

async function getActivities() {
  return fetch('https://aitoolft.com/api/admin/elective/getall', {
    method: 'GET',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('JWTToken')}`},
  })
  .then(res => res.json())
  .then(data => {data.forEach((e) => e.rank = null); return data;});
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
  localStorage.clear();
  location.reload();
}

// Needed as loginCallback, which Google calls, needs to be a global function or something idk
window.loginCallback = loginCallback;

// On startup, if user is 
if (localStorage.getItem('JWTToken') !== null) {
  // Check token for validity
  fetch('https://aitoolft.com/api/auth/validate', {
    method: 'GET',
    headers: {'Authorization': "Bearer " + localStorage.getItem('JWTToken')},
  })
  .then(res => res.status)
  .then(code => {
    if (code === 200) {
      handleLogin(localStorage.getItem('JWTToken'));
    }
    if (code === 401) {
      logout();
    }
  });
}

document.getElementById('logout').addEventListener('click', logout, false);