const { DATA_ENDPOINT } = require('../config/apiConfig');

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  // ... (other initializations) ...

  var calendar = new FullCalendar.Calendar(calendarEl, {
    // ... (calendar options) ...
    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    views: {
      dayGridMonth: {
        buttonText: 'Month',
        dayMaxEventRows: 3,
        dayMaxEvents: true,
      },
      dayGridWeek: {
        buttonText: 'Week',
      },
      dayGridDay: {
        buttonText: 'Day',
      },
    },
    initialView: 'dayGridMonth',
    navLinks: true,

    // eventSources: [
    //   { events: regularEvents, color: '#378006', id: 'regularEvents' },
    //   { events: holidayEvents, color: 'red', id: 'holidayEvents' }
    //   // Add more event sources as needed
    // ],

    // Add your event handlers here
    eventClick: function (info) {
      alert(
        '{{FileMaker Script Here}} Event: ' +
        info.event.title +
        ' ID: ' +
        info.event.id
      );
      info.el.style.borderColor = 'red';
    },
    eventMouseEnter: function (info) {
      info.el.classList.add('pointer-cursor');
    },
    eventMouseLeave: function (info) {
      info.el.classList.remove('pointer-cursor');
    },
  });

  // load events from json files
  loadEventsFromFile();
  loadHolidayEvents();

  calendar.render();

  // Example function to load events from a File
  function loadEventsFromFile() {
    var jsonFile = './json/sample.json';
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        allEvents = data;
        // Optional: Render these events initially
        calendar.removeAllEventSources();
        calendar.addEventSource({ events: allEvents });
        console.log('All Events:', allEvents);
      })
      .catch(error => console.error('Error fetching events:', error));
  }

  // Example function to load events from a File
  function loadHolidayEvents() {
    var jsonFile = './json/holidays.json';
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        // Modify each holiday event to have the "display": "background" property
        const holidaysWithDisplay = data.map(event => ({
          ...event,
          display: 'background',
        }));

        // Now add these events to the calendar
        calendar.addEventSource({
          events: holidaysWithDisplay,
          //color: "red",
          // You can set the color for background events here if needed
          id: 'holidayEvents',
        });
        console.log("Holiday Events:", holidayEvents)
      })
      .catch(error => console.error('Error fetching holiday events:', error));
  }

  // Example function to determine color based on event type
  function getColorForEventType(eventType) {
    return eventType === 'regularEvents' ? '#378006' : 'red';
  }

  var loadRegularEventsButton = document.getElementById(
    'loadRegularEventsButton'
  );
  loadRegularEventsButton.addEventListener('click', function () {
    loadEventsFromFile();
  });
  var loadHolidayEventsButton = document.getElementById(
    'loadHolidayEventsButton'
  );
  var testapi = document.getElementById('testapi');
  var holidayEventsVisible = true; // Track the visibility state of holiday events


  testapi.addEventListener('click', function () {
    console.log('fetching data....')
    fetch(process.env.URL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error fetching events:', error));
  })

  loadHolidayEventsButton.addEventListener('click', function () {
    loadHolidayEvents();
    // Assuming 'holidayEvents' contains your holiday data with the 'display' property
    holidayEvents.forEach(event => {
      // Find the event in the calendar and toggle its display property
      let calendarEvent = calendar.getEventById(event.id);
    });
    // Toggle the visibility state
    holidayEventsVisible = !holidayEventsVisible;
  });

  var allEvents = []; // Populate this with your event data
  var filterMenuButton = document.getElementById('filterMenuButton');
  var filterMenu = document.getElementById('filterMenu');
  var closeFilterMenuButton = document.getElementById('closeFilterMenu'); // Ensure this variable is defined
  var applyFilterButton = document.getElementById('applyFilterButton');

  filterMenuButton.addEventListener('click', function () {
    if (
      filterMenu.style.display === 'none' ||
      filterMenu.style.display === ''
    ) {
      filterMenu.style.display = 'block';
    } else {
      filterMenu.style.display = 'none';
    }
  });

  // Close the filter menu on button click
  closeFilterMenuButton.addEventListener('click', function () {
    filterMenu.style.display = 'none';
  });

  applyFilterButton.addEventListener('click', function () {
    var selectedOffices = Array.from(
      document.querySelectorAll('input[name="officeFilter"]:checked')
    ).map(c => c.value);
    var selectedDivisions = Array.from(
      document.querySelectorAll('input[name="divisionFilter"]:checked')
    ).map(c => c.value);
    console.log('Selected Offices:', selectedOffices);
    console.log('Selected Divisions:', selectedDivisions);
    filterEvents(selectedOffices, selectedDivisions);
    filterMenu.style.display = 'none';
  });

  //the function that filters the events
  function filterEvents(selectedOffices, selectedDivisions) {
    console.log('Filtering with:', selectedOffices, selectedDivisions);
    var filteredEvents = allEvents.filter(function (event) {
      console.log('Event:', event);
      return (
        (selectedOffices.length === 0 ||
          selectedOffices.includes(event.office)) &&
        (selectedDivisions.length === 0 ||
          selectedDivisions.includes(event.division))
      );
    });
    console.log('Filtered Events:', filteredEvents);
    calendar.removeAllEventSources();
    calendar.addEventSource({ events: filteredEvents });
  }

  var clearFilterButton = document.getElementById('clearFilterButton');
  clearFilterButton.addEventListener('click', function () {
    // Remove all event sources and re-add the initial sources
    calendar.removeAllEventSources();
    console.log('clearing filter');
    // Add initial event sources or all event sources
    calendar.addEventSource({
      events: regularEvents,
      color: '#378006',
      id: 'regularEvents',
    });
    calendar.addEventSource({
      events: holidayEvents,
      color: 'red',
      id: 'holidayEvents',
    });
    calendar.addEventSource({ events: allEvents });
  });
}); // End of DOMContentLoaded

// Path: filter.js

document.getElementById('westButton').addEventListener('click', function () {
  selectRegion('west');
  console.log('west button clicked');
});

document.getElementById('centralButton').addEventListener('click', function () {
  selectRegion('central');
});

document.getElementById('eastButton').addEventListener('click', function () {
  selectRegion('east');
});

document.getElementById('clearButton').addEventListener('click', function () {
  clearSelection();
});

function selectRegion(region) {
  clearSelection(); // Clear before selecting new region
  document
    .querySelectorAll('.' + region + ' input[type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.checked = true;
    });
}

function clearSelection() {
  document
    .querySelectorAll('.office-wrapper input[type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });
}

// Fetch the JSON data and populate the staffName dropdown
fetch('staff.json')
  .then(response => response.json())
  .then(data => {
    const staffNameSelect = document.getElementById('staffName');
    console.log(data);
    data.forEach(staffMember => {
      const option = document.createElement('option');
      option.value = staffMember.id; // Assuming each staff member has an ID
      option.textContent = staffMember.name; // Assuming each staff member has a name field
      staffNameSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error loading staff data:', error));

fetch('offices.json')
  .then(response => response.json())
  .then(data => {
    const sortedOffices = data.sort((a, b) => a.name.localeCompare(b.name));
    const officeColumns = chunkArray(sortedOffices, 8);
    officeColumns.forEach(column => {
      const columnDiv = document.createElement('div');
      columnDiv.className = 'column';

      column.forEach(office => {
        const label = document.createElement('label');
        label.classList.add('filter-option', office.region); // Add the region class here
        label.innerHTML = `<input type="checkbox" name="officeFilter" value="${office.name}"> ${office.name}`;
        columnDiv.appendChild(label);
      });

      document.querySelector('.office-wrapper .row').appendChild(columnDiv);
    });
  });

fetch('divisions.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const sortedDivisions = data.sort((a, b) => a.name.localeCompare(b.name));
    const divisionColumns = chunkArray(sortedDivisions, 16);
    divisionColumns.forEach(column => {
      const columnDiv = document.createElement('div');
      columnDiv.className = 'column';

      column.forEach(division => {
        const label = document.createElement('label');
        label.classList.add('filter-option', 'divisioncolumn');
        label.innerHTML = `<input type="checkbox" name="divisionFilter" value="${division.name}"> ${division.name}`;
        // Add tooltip using the title attribute
        label.title = division.fullName;
        columnDiv.appendChild(label);
      });

      document.querySelector('.division-wrapper .row').appendChild(columnDiv);
    });
  });

fetch('status.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const sortedStatus = data.sort((a, b) => a.name.localeCompare(b.name));
    const statusColumns = chunkArray(sortedStatus, 16);
    statusColumns.forEach(column => {
      const columnDiv = document.createElement('div');
      columnDiv.className = 'column';

      column.forEach(status => {
        const label = document.createElement('label');
        label.classList.add('filter-option', 'statuscolumn');
        label.innerHTML = `<input type="checkbox" name="statusFilter" value="${status.name}"> ${status.name}`;
        columnDiv.appendChild(label);
      });

      document.querySelector('.status-wrapper .row').appendChild(columnDiv);
    });
  });

function chunkArray(array, size) {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
}
