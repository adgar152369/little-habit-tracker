import Habit from './Habit.js';

const habitsSection = document.querySelector('#habits');
const habitNameInput = document.querySelector('input[name="habitName"]');
const habitDescriptionInput = document.querySelector('textarea[name="habitDescription"]');
const newHabitForm = document.querySelector('.new-habit-form');


// Habit stuff
if (newHabitForm) {
  newHabitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get input values
    const habitName = habitNameInput.value.trim();
    const habitDescription = habitDescriptionInput.value.trim();

    // basic input validation
    if (!habitName) {
      alert('Please input a name.');
      return;
    }

    // create new Habit object
    let newHabits = [];
    newHabits.push(new Habit(habitName, habitDescription));

    // Clear form fields (optional)
    habitNameInput.value = '';
    habitDescriptionInput.value = '';

    createHabit(newHabits);
  })
}

function createHabit(habits) {
  console.log(habits)
  habits.forEach((habit, i) => {
    if (!habit.isCompletedToday) {
      habit.saveToLocalStorage();
    }
  });
}

function createHabitElement(habits, isCompleted) {

  habits.forEach((habit, i) => {
    // create habit instances again
    habit = new Habit(habit.name, habit.desc);

    if (isCompleted) {
      habit.isCompletedToday = true;
    }
    console.log(habit);
    // check if habit is completed first
    if (habit.isCompletedToday) {
      // habit.isCompletedToday = true;
      habit.completedDays = new Date().getDate();
      fillCompletedDay(habit.completedDays);
    }

    const habitsList = document.createElement('ul');
    const habitItem = document.createElement('li');
    const habitBtn = document.createElement('button');
    habitBtn.textContent = `Complete`;
    habitItem.textContent = habit.name;
    habitItem.appendChild(habitBtn);
    habitsList.append(habitItem);
    habitsSection.appendChild(habitsList);
    // add event listener to habit btns if habit is completed for the day
    if (!habit.isCompletedToday) {
      habitBtn.addEventListener('click', () => habitCompleteHandler(habit));
    }

    // else {
    //   const habitsList = document.createElement('ul');
    //   const habitItem = document.createElement('li');
    //   const habitBtn = document.createElement('button');
    //   habitBtn.textContent = `Complete`;
    //   habitItem.textContent = habit.name;
    //   habitItem.appendChild(habitBtn);
    //   habitsList.append(habitItem);
    //   habitsSection.appendChild(habitsList);
    //   // add event listener to habit btns
    //   habitBtn.addEventListener('click', () => habitCompleteHandler(habit));
    // }

  });
}


function habitCompleteHandler(habit) {
    habit.isCompletedToday = true;
    habit.completedDays = new Date().getDate();
    fillCompletedDay(habit.completedDays);
    habit.saveToLocalStorage();
}

function fillCompletedDay(completedHabits) {
  // console.log(completedHabits)
  const calendar = document.querySelector('#calendar');
  const days = Array.from(calendar.children);

  days.forEach((day, index) => {
    const date = index + 1;
    if (completedHabits.includes(date)) {
      day.classList.add('completed');
    }
  })
}

if (window.location.pathname == "/pages/dashboard.html") {
  // check for saved habits in localStorage
  const keys = Object.keys(localStorage);
  const habits = [];
  let isHabitCompleted = false;
  for (const key of keys) {
    const habit = JSON.parse(localStorage.getItem(key));
    habits.push(habit);
    habit.isCompletedToday ? isHabitCompleted = true : false;
  }
  if (habits.length) {
    createHabitElement(habits, isHabitCompleted);
  }
}