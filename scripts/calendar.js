import Habit from "./Habit.js";

// Get the calendar container
const calendar = document.getElementById('calendar');
const calendarYear = document.getElementById('calendar-year');
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
// Get habits
const habits = Habit.allHabits;

// Get the current date
const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();
const currentDay = today.getDate();

function generateCalendar(month, year) {
  calendar.innerHTML = ''; // Clear existing calendar

  // Get the first day of the month and the number of days in the month
  const firstDay = (new Date(year, month)).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  // Create year element
  const yearEl = document.createElement('span');
  yearEl.textContent = `${monthNames[currentMonth - 1]} ${currentDay}, ${year}`;
  calendarYear.innerHTML = '';
  calendarYear.appendChild(yearEl);

  // Create calendar cells for each day
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.classList.add('day');

    cell.textContent = day;

    // Highlight current day, in the current month, in the current year
    if (
      day === currentDay &&
      month === currentMonth &&
      year === currentYear
    ) {
      cell.classList.add('current');
    }

    for (let j = 0; j < habits.length; j++) {
      if (habits[j].completedDays.includes(day)) {
        cell.classList.add('completed')
      }
    }

    calendar.appendChild(cell);
  }
}

// add completion event listener to habit
if (habits.length > 0) {
  habits.forEach((habit) => {
    const habitCompletionBtn = document.querySelector('.habit-complete-btn');
    habitCompletionBtn.addEventListener('click', () => {
      habit.handleHabitCompletion(habit);
      generateCalendar(currentMonth, currentYear);
    });
  })
}

// Initial calendar generation
generateCalendar(currentMonth, currentYear);