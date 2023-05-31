'use strict';

// TODO
// eslint-disable-next-line no-unused-vars
const objPoints = {
  group1: {
    student1: {
      set1task1: 10,
      set1task2: 8,
      set1task3: 7,
      set1task4: 6,
      set1task5: 4,
      set1task6: 12,
      set2task1: 10,
    },
    student2: {
      set1task1: 10,
      set1task2: 8,
      set1task3: 7,
      set1task4: 6,
      set1task5: 4,
      set1task6: 12,
      set2task1: 10,
    },
  },
  group2: {
    student1: {
      set1task1: 10,
      set1task2: 8,
      set1task3: 7,
      set2task1: 10,
      set2task2: 10,
    },
    student2: {
      set1task1: 10,
      set1task2: 8,
      set1task3: 7,
      set2task1: 10,
      set2task2: 10,
    },
  },
};

const maxPoints = {
  group1: {
    set1task1: 10,
    set1task2: 8,
    set1task3: 7,
    set1task4: 6,
    set1task5: 4,
    set1task6: 12,
    set2task1: 10,
  },
  group2: {
    set1task1: 10,
    set1task2: 10,
    set1task3: 10,
    set2task1: 10,
    set2task2: 10,
  },
};

// Set placeholders for the Grades
// document.getElementById(
//   `result-${dataGroupName}-student-${studentId}`
// ).innerText = 0; // set grades to 0
// document.getElementById(
//   `result-${dataGroupName}-student-${studentId}`
// ).innerText = 0; // set grades to 0

// collect points from the input fields from HTML
const getPoints = function () {
  const inputs = document.querySelectorAll('.grade-input'); // collect all inputs from HTML
  const points = {}; // create Object placeholder

  for (const input of inputs) {
    // Loop through all inputs and place in Object

    // console.log(input.name); // student-1-set1task0
    const dataGroup = input.dataset.group; // group1
    const studentId = input.name.split('-')[1]; // Student number in the list '1'
    const taskId = input.name.split('-')[2]; // Task name 'set1task1'
    const result = 'result'; // result entry for the grade

    if (!points[dataGroup]) {
      // If dataGroup is not created in the Object
      points[dataGroup] = {};
    }

    if (!points[dataGroup][studentId]) {
      // If studentId is not created in the Object
      points[dataGroup][studentId] = {};
    }

    if (!points[dataGroup][studentId][result]) {
      // If studentId is not created in the Object
      points[dataGroup][studentId][result] = 0; // placeholder for grade
    }

    points[dataGroup][studentId][taskId] = input.value; // Create Object
  }

  //   console.log(points);
  return points; // return object to calcGrades
};

// eslint-disable-next-line no-unused-vars
const calcGrades = async function (arr, set1weight, set2weight) {
  let arrPts = {};

  set1weight = set1weight || 0.4; // set1 weight to default 0.4 if no argument in function call
  set2weight = set2weight || 0.6;

  if (typeof arr === 'undefined') {
    // is there an object in the function call?
    arrPts = getPoints(); // if no object in the argument get the points from the function
    console.log('getPoints'); // log getPoints was used
  } else {
    arrPts = arr; // if function call had an object in the argument
    console.log('objPoints'); // log object in the call function
  }
  //   console.log(arrPts);

  const dataGroup = arrPts; // create dataGroup to make clearer
  //   console.log(Object.entries(dataGroup));
  //   for (const [dataGroupName, tasks] of Object.entries(dataGroup)) {
  for (const [dataGroupName, students] of Object.entries(dataGroup)) {
    // loop through the groups
    console.log(`Data Group: ${dataGroupName}`); // log which group being processed
    if (dataGroupName.startsWith('group1')) {
      // process group1
      processGroup(dataGroupName, students);
    } else if (dataGroupName.startsWith('group2')) {
      // process group2
      processGroup(dataGroupName, students);
    }
  }

  //function to process group
  function processGroup(dataGroupName, students) {
    for (const [studentId, tasks] of Object.entries(students)) {
      // process students
      let pointsPercent = 0;
      let totalPointsSet1 = 0;
      let totalPointsSet2 = 0;
      let counterSet1 = 0;
      let counterSet2 = 0;
      console.log(`studentId: ${studentId}`); // log which student being processed
      for (const [taskName, taskValue] of Object.entries(tasks)) {
        // console.log(`taskName: ${taskName}`);
        // console.log(`taskValue: ${taskValue}`);

        // loop through the tasks
        if (taskName.startsWith('set1Task0') || taskName.startsWith('result'))
          continue; // no calculation on student id
        const max = maxPoints[dataGroupName][taskName]; // set the maxpoints from object maxPoints
        //   console.log(
        // `Group: ${dataGroupName} StudentId: ${studentId} Task: ${taskName} | Points: ${taskValue}`
        //   );
        if (taskName.startsWith('set1')) {
          // process set1 tasks
          pointsPercent = 10 * (taskValue / max);
          totalPointsSet1 += pointsPercent * set1weight;
          counterSet1++;
          //   console.log('counter1 ' + counterSet1);
        } else {
          // process set2 tasks
          pointsPercent = 10 * (taskValue / max);
          totalPointsSet2 += pointsPercent * set2weight;
          counterSet2++;
          //   console.log('counter2 ' + counterSet2);
        }
        // console.log(totalPointsSet1, counterSet1, totalPointsSet2, counterSet2);
      }
      // calculate the grade
      let averagePointsGroup = Math.round(
        totalPointsSet1 / counterSet1 + totalPointsSet2 / counterSet2
      );
      //   console.log(`result-${dataGroupName}-student-${studentId}`);

      // place grade in HTML
      document.getElementById(
        `result-${dataGroupName}-student-${studentId}`
      ).innerHTML = averagePointsGroup;
      dataGroup[dataGroupName][studentId].result = averagePointsGroup;
      calcGrades.averagePointsGroup = averagePointsGroup; // create Object name to be used outside this function
      calcGrades.dataGroupName = dataGroupName; // create Object name to be used outside this function
      calcGrades.studentId = studentId; // create Object name to be used outside this function
      // INFO
      // console.log(dataGroup[dataGroupName][studentId].result);
    }
  }
  calcGrades.arrPts = arrPts; // create Object name to be used outside this function

  //   return calcGrades.averagePointsGroup1, calcGrades.averagePointsGroup2; // return values to function call. Not consumed with the button function used, so return; only can be used
  return;
};

// eslint-disable-next-line no-unused-vars
function resetGrades() {
  // reset the HTML inputs and Object
  console.log('Reset');
  calcGrades.arrPts = {}; // reset object
  const results = document.querySelectorAll('div[id^="result"]');
  for (const result of results) {
    // reset result text in grades
    result.textContent = 0;
  }
  const inputs = document.querySelectorAll('input');
  for (const input of inputs) {
    // reset input values on HTML
    input.value = '';
  }
}

// eslint-disable-next-line no-unused-vars
function saveData() {
  // Export Object to JSON
  let arr; // create an array

  arr = // if object is empty run getPoints, otherwise calcGrades function
    typeof calcGrades.arrPts === 'undefined'
      ? (arr = getPoints(arr))
      : (arr = calcGrades.arrPts);

  let jsonData = JSON.stringify(arr, null, 2); // convert from JS Object to JSON
  let blob = new Blob([jsonData], { type: 'application/json' }); // set the type of data to save
  // eslint-disable-next-line no-undef
  saveAs(blob, 'data.json'); // popup a SaveAs dialog to save with proposed data.json file name

  console.log('data saved!'); // log this function has been processed
}

calcGrades(); // called from a button on HTML. Used when testing to not need to press button
// console.log(getPoints());
// console.log(calcGrades.averagePointsGroup);
// console.log(calcGrades.dataGroupName);
// console.log(calcGrades.studentId);

// Another code for a button
// const button = document.getElementById('submit');
// button.addEventListener('click', function () {
//   const points = getPoints();
//   const grades = calcGrades(points, 0.4, 0.6);
//   console.log(grades);
// });
