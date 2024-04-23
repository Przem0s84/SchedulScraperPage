const hours = [
  '7:30-8:15',
  '8:15-9:00',
  '9:15-10:00',
  '10:00-10:45',
  '11:00-11:45',
  '11:45-12:30',
  '12:45-13:30',
  '13:30-14:15',
  '14:30-15:15',
  '15:15-16:00',
  '16:15-17:00',
  '17:00-17:45',
  '18:00-18:45',
  '18:45-19:30',
];

document.addEventListener('DOMContentLoaded', function () {
  CreateTable();
  getFromApi();
});

function getFromApi() {
  var deanGroupsSelect = document.getElementById('deanGroupsSelect').value;
  var labGroupsSelect = document.getElementById('labGroupsSelect').value;
  var projectGroupsSelect = document.getElementById(
    'projectGroupsSelect'
  ).value;
  var computerLabGroupsSelect = document.getElementById(
    'computerLabGroupsSelect'
  ).value;
  var weekTypeSelect = document.getElementById('weekTypeSelect').value;

  const apiUrl = `https://schedulescraperpw.azurewebsites.net/api/Schedule?LabGropName=${labGroupsSelect}&ProjGroupName=${projectGroupsSelect}&CompLabGroupName=${computerLabGroupsSelect}&WeekType=${weekTypeSelect}&TeamName=${deanGroupsSelect}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      generateSchedule(data, hours);
    });
}

function generateSchedule(data, hours) {
  const table = document.getElementById('myTable');
  table.style.display = 'none';
  const spinner = document.getElementById('loader');
  spinner.style.display = 'flex';
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName('td');
    for (let j = 0; j < cells.length; j++) {
      fillCells(j, cells, i, hours, data);
    }
  }

  table.style.display = 'table';
  spinner.style.display = 'none';
}

function fillCells(j, cells, i, hours, data) {
  if (j === 0) {
    const cell = cells[j];
    cell.textContent = i;
  } else if (j === 1) {
    cells[j].textContent = hours[i - 1];
  } else {
    const selectedCell = data.find(
      (ob) => ob.dayNr === j - 1 && ob.eventLP === i
    );
    if (!selectedCell) {
      cells[j].textContent = '';
    } else {
      cells[
        j
      ].textContent = `${selectedCell.name} ${selectedCell.eventType} ${selectedCell.location} `;
    }
  }
}

function CreateTable() {
  const table = document.getElementById('myTable');
  table.style.display = 'none';
  const tableBody = table.getElementsByTagName('tbody')[0];

  for (let i = 0; i < 14; i++) {
    const row = tableBody.insertRow();

    for (let j = 0; j < 7; j++) {
      const cell = row.insertCell();
      cell.textContent = '.';
    }
  }
}
