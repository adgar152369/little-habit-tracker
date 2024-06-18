import Habit from './Habit.js';

const habitNameInput = document.querySelector('input[name="habitName"]');
const habitDescriptionInput = document.querySelector('textarea[name="habitDescription"]');
const newHabitForm = document.querySelector('.new-habit-form');


// Habit stuff
if (newHabitForm) {
  newHabitForm.addEventListener('submit', (e) => createHabit(e));
}

function createHabit(e) {
  e.preventDefault();
  // get input values
  const habitName = habitNameInput.value.trim();
  const habitDescription = habitDescriptionInput.value.trim();
  // basic input validation
  if (!habitName) {
    alert('Please input a name.');
    return;
  }
  // create new habits array
  let newHabits = [];
  newHabits.push(habitName, habitDescription);
  // Clear form fields (optional)
  habitNameInput.value = '';
  habitDescriptionInput.value = '';

  // create new Habit objects
  newHabits.forEach((habit, i) => {
    habit = new Habit(habitName, habitDescription);
    habit.saveToLocalStorage();
  });
}

if (window.location.pathname == "/pages/dashboard.html") {
  const habits = Habit.loadAllFromLocalStorage();
  habits.forEach(habit => habit.createHabitElement(habit.name, habit.description, habit.isCompletedToday))
}