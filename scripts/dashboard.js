import Habit from "./Habit.js";

// Get habits
const habits = Habit.loadAllFromLocalStorage();
let selectedHabitName = null;


function generateHabitList() {
  habits.forEach((habit, i) => {
    habit.createHabitElement();
  });

  const habitLinkBtns = document.querySelectorAll('.habit-link');
  const habitCompleteBtns = document.querySelectorAll('.habit-complete-btn');

  if (habitLinkBtns.length > 0) {
    habitLinkBtns[0].classList.add('active');
    selectedHabitName = habitLinkBtns[0].textContent;

    habits.forEach((habit) => {
      if (habit.name === selectedHabitName) {
        habit.generateCalendar(habit.currentMonth, habit.currentYear, habit)
      }
    });

    habitLinkBtns.forEach((link, i) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        selectedHabitName = null;
        habitLinkBtns.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
        selectedHabitName = link.textContent;

        if (habits[i].name === selectedHabitName) {
          habits[i].generateCalendar(habits[i].currentMonth, habits[i].currentYear, habits[i]);
        }
      });
    });

    habitCompleteBtns.forEach((completeBtn, i) => {
      completeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const habitName = completeBtn.getAttribute('data-habit-name');

        if (habitName === habits[i].name) {
          // habits[i].generateCalendar(habits[i].currentMonth, habits[i].currentYear, habits[i]);
          habits[i].handleHabitCompletion();
        }
      });
    });
  }

}

generateHabitList();