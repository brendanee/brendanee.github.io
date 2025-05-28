const backendURL = 'middleschool-514609687600.us-west1.run.app';
const studentDiv = document.getElementById('student');
const adminDiv = document.getElementById('admin');

// Filled by functions
let activityList = [];
let myGrade;

// Needed as loginCallback, which Google calls, needs to be a global function or something idk
window.loginCallback = loginCallback;

// On startup, if user has a token in localStorage
if (localStorage.getItem('JWTToken') !== null) {
  // Check token for validity
  fetch(`https://${backendURL}/api/auth/validate`, {
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
  })
  .catch((e) => {makePopup('Error while logging in: ' + e);});
}

document.getElementById('logout').addEventListener('click', logout, false);

/**
 * Called following student login from handleLogin, either from loginCallback or webpage load. 
 * Also called to refresh screen following data update (fetch load, click, etc.)
 * Also called when admin chooses to see student view
 * 
 * @param {Boolean} refreshActivity Whether or not to refresh the activityList, deleting rank data
 */
async function drawStudent(refreshActivity) {
  if (refreshActivity) {activityList = await getActivities(false)};

  adminDiv.innerHTML = "";
  studentDiv.innerHTML =  `<div id="student-wrapper"></div>`;
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
      ele.innerHTML = `<div class="rank">${e.rank === null ? "" : e.rank}</div>${e.name}<br>${wordGrade}<br>Max ${e.limit}`;
      ele.className = e.rank === null ? "isNotRanked" : "isRanked";
      ele.addEventListener('click', () => setRank(i), false);
      document.getElementById('student-wrapper').prepend(ele);
    } else {
      ele.innerHTML = `<div class="rank"></div>${e.name}<br>${wordGrade}<br>Max ${e.limit}`;
      ele.className = 'cannotSelect';
      document.getElementById('student-wrapper').append(ele);
    }
  });
  document.getElementById("message").innerHTML = `Rank your <strong>TOP FOUR</strong> choices for clubs. You cannot select a club you've already taken, or one that's not available for your grade.`;
  
  let btn = document.createElement('button');
  btn.id = 'student-submit';
  btn.innerHTML = "Submit";
  btn.addEventListener('click', studentSubmit, false);
  studentDiv.appendChild(btn);  
}

/**
 * Called on student activity option click
 * @param {Number} index The index of the activity in activityList the student clicked
 * @returns Nothing
 */
async function setRank(index) {
  let cur = activityList[index];

  if (cur.rank === null) {
    let tryRank = 1;
    while (activityList.map((e) => e.rank).includes(tryRank) && tryRank <= 4) {
      tryRank++;
    }
    if (tryRank > 4) {
      makePopup('Please only select your top four choices. Thank you!', false, '');
      return;
    }
    cur.rank = tryRank;
  } else {
    cur.rank = null;
  }
  drawStudent(false);
}

/**
 * Called when student hits submit, POSTs the result to server
 */
function studentSubmit() {
  let object = {electives: [],}
  activityList
  .filter((e) => e.rank !== null)
  .sort((a, b) => a.rank - b.rank)
  .forEach((e) => {object.electives.push(e.id);});

  fetch(`https://${backendURL}/api/students/submit`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('JWTToken')}`},
    body: JSON.stringify(object),
  })
  .then(res => res.status)
  .then(code => {
    if (code === 200) {
      makePopup(`Successfuly submitted your activity choices!`);
    } else {
      makePopup('An error occurred: Code ' + code);
    }
  })
  .catch((e) => makePopup('An error occured: ' + e));
  
}

/**
 * Called following admin login from handleLogin, either from loginCallback or webpage load. 
 * Also called to refresh screen following data update (activity creation/deletion, etc.)
 */
async function drawAdmin() {
  activityList = await getActivities(true);

  adminDiv.innerHTML =  `
    <div id="admin-activity-wrapper"></div>
    <div id="sidebar">
      <button id="activity-add"><b>+</b> Add Activity</button>
      <button onclick="drawStudent(true)" id="view-student">View Student Interface</button>
      <button onclick="makePopup('All about this little piece of code! Will be expanded later, and include links and resources for at some point, and a link to relavent Google Sheets/stuff');" id="admin-about">About</button>
      <button onclick="drawSort()" id="draw-sort">View Activity Assignments</button>
    </div>`;
  studentDiv.innerHTML = "";
  document.querySelector('html').className = 'admin';

  activityList.forEach((e) => {
    let formattedGrade = "";
    if (e.grade.length === 2){
      formattedGrade = e.grade[0] + " & " + e.grade[1];
    } else {
      formattedGrade = e.grade.join(" ");
    }

    let ele = document.createElement('div');
    ele.className = 'admin-choice';
    ele.innerHTML = `
      
      <div class="admin-choice-grade">${formattedGrade}<br><button class="admin-choice-more">More</button></div>
      <div class="admin-choice-name truncate">${e.name}</div>
      <div class="admin-choice-id">${e.id}</div>
      <div>${e.interested.length} interested, maximum students ${e.limit}</div>
      <div class="admin-choice-student truncate">Interested: ${e.interested.length === 0 ? '<i>None</i>' : e.interested.join(', ')} <span class="admin-choice-delete" onclick="makePopup('Are you sure want to delete ${e.name}? This action cannot be undone.', true, 'deleteActivity(\`${e.id}\`)');">Delete</span></div> 
      `;
    document.getElementById('admin-activity-wrapper').append(ele);
  });
  document.getElementById('activity-add').addEventListener('click', showAddActivity, false);
  document.getElementById("message").innerHTML = `Manage activites, add activities, below. Use the blue button on the right to add activites.`;        
}

/**
 * Called when Add Activity button's clicked, literally adds the HTML for the form to the sidebar
 */
function showAddActivity() {
  document.getElementById('sidebar').innerHTML = `
    <div id="activity-add-wrapper">
      <label for="activity-name">Activity Name:</label>
      <input type="text" placeholder="i.e. Cool Kid's Club" name="activity-name" id="activity-name">
      <label for="activity-id">Veracross ID:</label>
      <input type="text" placeholder="i.e. MATH:3900" name="activity-id" id="activity-id">
      <label for="total-spots">Maximum participants:</label>
      <input type="number" placeholder="i.e. 15" name="total-spots" id="total-spots">
      Allowed Grades:<br>
      <label for="5">5th</label>
      <input checked type="checkbox" name="5" id="5">
      <label for="6">6th</label>
      <input checked type="checkbox" name="6" id="6">
      <br>
      <label for="7">7th</label>
      <input checked type="checkbox" name="7" id="7">
      <label for="8">8th</label>
      <input checked type="checkbox" name="8" id="8"><br>
      <button id="activity-submit">Submit Activity</button>
    </div>
  ` + document.getElementById('sidebar').innerHTML;
  document.getElementById('activity-add').style.display = 'none';
  document.getElementById('activity-submit').addEventListener('click', handleAddActivity, false);
}

/**
 * Called when admin submits form to create new activity, gets HTML stuff and POSTs it
 * @returns Nothing
 */
function handleAddActivity() {
  let gradeList = [];
  document.getElementById('5').checked ? gradeList.push(5) : '';
  document.getElementById('6').checked ? gradeList.push(6) : '';
  document.getElementById('7').checked ? gradeList.push(7) : '';
  document.getElementById('8').checked ? gradeList.push(8) : '';

  const activityName = document.getElementById('activity-name').value;
  const activityId = document.getElementById('activity-id').value;
  const limit = document.getElementById('total-spots').value;
  if (activityName === "") {
    makePopup('Activity name must not be blank.');
    return;
  }
  if (activityId === "") {
    makePopup('Veracross ID must not be blank.');
    return;
  }
  if (limit < 1) {
    makePopup('Maximum number of students cannot be blank or zero. If activity has no participant limit, enter a large number.');
    return;
  }
  let object = {
    name: activityName,
    grade: gradeList,
    id: activityId,
    limit: limit,
  }
  
  fetch(`https://${backendURL}/api/admin/elective/add`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('JWTToken')}`},
    body: JSON.stringify(object),
  })
  .then(res => res.status)
  .then(code => {
    if (code === 200) {
      // getActivities is async net request, we need another nested dot then for after it's done
      getActivities(true).then((a) => {
        activityList = a;
        drawAdmin();
        document.getElementById('activity-add').style.display = 'none';
        document.getElementById('activity-add-wrapper').remove();
        makeToast(`Successfully created ${activityName}!`);
      });
    } else {
      makePopup('An error occurred: Code ' + code);
    }
  })
  .catch(e => makePopup("An error ocurred: " + e));
}

/**
 * Takes an ID to delete an activity, called by delete button
 * @param {String} id The ID of the activity to be deleted
 */
function deleteActivity(id) {
  fetch(`https://${backendURL}/api/admin/elective/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('JWTToken')}`},
  })
  .then(res => res.status)
  .then(code => {
    if (code === 200) {
      getActivities(true).then((a) => {
        activityList = a;
        drawAdmin();
        makeToast(`Successfully deleted ${id}.`);
      });
    } else {
      makePopup('An error occurred: Code ' + code);
    }
  });
}

/**
 * Draws the sorted students interface. Called on button press on admin side
 */
function drawSort() {
  document.getElementById('sort')?.remove();

  let ele = document.createElement('div');
  ele.id = 'sort';
  ele.innerHTML = `
    <header>
      <button onclick="loadSort(true)">Sort Students</button>
      <button onclick="alert('don\'t worry, I have silly idea for this');">Export Image</button>
      <button onclick="alert('get csv or whatrever, still working on it');">Export CSV</button>
      <button onclick="document.getElementById('sort').remove();">Close</button>
    </header>
    <p id="sort-tagline">Students storted into various elective, based on grade priority and preference. Drag any name to move the student. Note that re-sorting with new student responses will rmeove all manual changes</p>
    <div id="sort-wrapper"></div>
  `;
  adminDiv.append(ele);

  activityList.forEach((e) => {
    e.studentFormatted = e.students.map((e2) => `<div draggable="true" ondragstart="handleDragStart(event)" class="sort-student">${e2}</div>`);

    let ele = document.createElement('div');
    ele.className = 'sort-activity';
    ele.addEventListener('drop', (ev) => handleDragDrop(ev), false);
    ele.addEventListener('dragover', (ev) => handleDragOver(ev), false);
    ele.addEventListener('dragenter', (ev) => handleDragEnter(ev), false);
    ele.addEventListener('drageleave', (ev) => handleDragLeave(ev), false);
    ele.innerHTML = `
      <div class="admin-choice-name truncate">${e.name}</div>
      <i>None</i>${e.studentFormatted.join('')}`;
    document.getElementById('sort-wrapper').append(ele);
  });
}

/**
 * Finds data somewhere, parses it into the drag and drop we know and love
 */
async function loadSort() {
  let sortCode = await fetch(`https://${backendURL}/api/admin/elective/compute`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${localStorage.getItem('JWTToken')}`},
  })
  .then(res => (res.status))
  .catch((e) => {makePopup(`Getting sorted list failed, error code ${e}.`);})
  
  if (sortCode === 200) {
    activityList = await getActivities(true);
    drawSort();
  }
}

function testSort() {
  activityList = [
      {
        name: 'Activity One',
        grades: [5, 6, 7, 8],
        students: ['John Doe', 'Janes Doe', 'Brendan Ee', 'Silly Kid'],
      },
      {
        name: 'Activity Two',
        grades: [7, 8],
        students: ['Someone Else', 'Another Person', 'Fake Data', 'Funny Story'],
      },
      {
        name: 'Activity Three',
        grades: [5, 6, 7, 8],
        students: ['Random Person', 'Subsquent To-The', 'Events U-Have', 'Just Witnessed'],
      },
    ];
    drawSort();
}

let currentDragged = null;
function handleDragStart(event) {
  currentDragged = event.target;
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragEnter(event) {
  let node;
  if (event.target.className !== 'sort-activity') {
    node = event.target.parentNode;
  } else {
    node = event.target;
  }
}

function handleDragLeave(event) {
  let node;
  if (event.target.className !== 'sort-activity') {
    node = event.target.parentNode;
  } else {
    node = event.target;
  }
}

function handleDragDrop(event) {
  event.preventDefault();
  let node;
  if (event.target.className !== 'sort-activity') {
    node = event.target.parentNode;
  } else {
    node = event.target;
  }
  node.appendChild(currentDragged);
  
  console.log(`network request: moving ${currentDragged.innerHTML} to activity named ${node.childNodes[1].innerHTML}`);
}

function calculateFull(activityID) {

}

/**
 * After Google login flow, google callback. This function is made global.
 * @param {Object} response Response object from server with smaller JWT and other stuff
 */
function loginCallback(response) {
  // Don't decode
  const decoded = response.credential;
  // Saving name to localStorage - untrusted
  localStorage.setItem('name', decodeJwtResponse(decoded).name);
  // Send token to backend
  fetch(`https://${backendURL}/api/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({token: decoded})
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('JWTToken', data.token);
    // On message back from server, run log in client side
    handleLogin(data.token);
  });
}
 
/**
 * Called when logged in (or loaded and logged in) and server-side validated, calls drawStudent/Admin
 * @param {String} jwt JWT token
 * @returns Nothing
 */
async function handleLogin(jwt) {
  const decoded = decodeJwtResponse(jwt);
  const email = decoded.sub;
  myGrade = await getGrade(email);

  document.getElementById('header-message').innerHTML = `Welcome, ${localStorage.getItem('name')}!`;

  // Hide google sign in, show log out
  document.getElementById('google-wrapper').style.display = 'none';
  document.getElementById('logout').style.display = 'block';

  // User is an admin
  if (email.includes("@charleswright.org")) {
    drawAdmin();
    return;
  } 

  // User is an student
  if (email.includes("@tarriers.org")) {
    drawStudent(true);
    return;
  }
}

/**
 * Fetch request to get the user's grade
 * @param {String} email User's email
 * @returns The user's grade, as a number. Default is 6 
 */
async function getGrade(email) {
  return fetch(`https://${backendURL}/api/students/info?email=${email}`, {method: 'GET'}) 
  .then(res => {
    if (res.status === 404) {
      console.warn("No grade found, using test grade of 6th. Failed email: " + email);
      return {'grade': 6,}
    } else {
      return res.json();
    }
  })
  .then(data => data.grade);
}

/**
 * Gets the 
 * @param {Boolean} isAdmin Whether the user is an admin
 * @returns An array of objects, each w/ info about an activity
 */
async function getActivities(isAdmin) {
  return fetch(`https://${backendURL}/api/${isAdmin ? 'admin' : 'students'}/elective/getall`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('JWTToken')}`},
  })
  .then(res => {
    if (res.status !== 200) {
      makePopup('Error getting activities list, Code ' + res.status);
    } else {
      return res.json();
    }
  })
  .then(data => {data.forEach((e) => e.rank = null); return data;});
}

/**
 * Takes JWT Token, spits out important stuff
 * Shamelessly stolen from Google, all rights to them or whatever
 * @param {String} token JWT Token
 * @returns 
 */
function decodeJwtResponse(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

/**
 * Deletes saved stuff and reloads, called on. log out or invalid JWT
 */
function logout() {
  localStorage.clear();
  location.reload();
}

/**
 * Makes a customizable popup appear on-screen
 * @param {String} message The message shown to the user.
 * @param {boolean} showCancel Whether to show the cancel button or not
 * @param {String} confirmAction The action taken following an ok button press
 */
function makePopup(message, showCancel, confirmAction) {
  const popup = document.getElementById('popup');
  popup.innerHTML = `${message}<button onclick="document.getElementById('popup').style.display = 'none';" id="popup-cancel">Cancel</button><button id="popup-ok">Ok</button>`;
  if (!showCancel) {
    document.getElementById('popup-cancel').style.display = 'none';
  }
  document.getElementById('popup-ok').setAttribute('onclick', `document.getElementById('popup').style.display = 'none';${confirmAction}`);
  popup.style.display = 'block';
}

function makeToast(message) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `${message}<button onclick="hideToast()">Ok</button>`;
  setTimeout(hideToast, 5000);
  toast.style.display = 'block';
}

function hideToast() {
  document.getElementById('toast').style.display = 'none';
}