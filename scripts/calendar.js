import Habit from "./Habit.js";

// example data structure for habits
export const habits = [
  {
    habit: new Habit("Arts & Crafts", "Come up with new ideas each week with the kids.",true,false)
  },
  {
    habit: new Habit("Drink less coffee", "Drink one cup coffee per day.",false,false)
  },
]

// console.log(habits);

// Get the calendar container
const calendar = document.getElementById('calendar');
const calendarYear = document.getElementById('calendar-year');
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

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
  calendarYear.appendChild(yearEl);

  // Create calendar cells for each day
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.classList.add('day');

    // Highlight current day 
    if (
      day === today.getDate() &&
      month === today.getMonth() + 1 &&
      year === today.getFullYear()
    ) {
      cell.classList.add('current');
    }

    calendar.appendChild(cell);
  }
}

// Initial calendar generation
generateCalendar(currentMonth, currentYear);

// Add buttons for navigation (previous/next month)
// ... (Update month/year and regenerate the calendar)