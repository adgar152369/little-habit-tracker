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
  
  if (!habitName) {
    alert('Please input a name.');
    return;
  }
  
  habitNameInput.value = '';
  habitDescriptionInput.value = '';

  // create new Habit object
  const habit = new Habit(habitName, habitDescription);
  habit.saveToLocalStorage();
}