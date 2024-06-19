import Habit from './Habit.js';

const habitNameInput = document.querySelector('input[name="habitName"]');
const habitDescriptionInput = document.querySelector('textarea[name="habitDescription"]');
const newHabitForm = document.querySelector('.new-habit-form');


// Habit stuff
if (newHabitForm) {
  newHabitForm.addEventListener('submit', (e) => createHabitInstance(e));
}

function createHabitInstance(e) {
  e.preventDefault();
  // get input values
  const habitName = habitNameInput.value.trim();
  const habitDescription = habitDescriptionInput.value.trim();
  // basic input validation
  if (!habitName) {
    alert('Please input a name.');
    return;
  }
  // Clear form fields (optional)
  habitNameInput.value = '';
  habitDescriptionInput.value = '';

  // create new Habit objects
  const habit = new Habit(habitName, habitDescription, false, []);
  habit.saveToLocalStorage();
}

// Load existing habits from localStorage
if (window.location.pathname == "/pages/dashboard.html") {
  const habits = Habit.loadAllFromLocalStorage();
  // list exisitng habits

  // console.log(habits)
  
  habits.forEach(habit => {
    habit.createHabitElement(habit.name)
  })
}