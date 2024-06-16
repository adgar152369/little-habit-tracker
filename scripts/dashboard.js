const habitsSection = document.querySelector('#habits');

const keys = Object.keys(localStorage);
const habits = [];
for (const key of keys) {
  const habit = JSON.parse(localStorage.getItem(key));
  habits.push(habit);
}

function createHabitElement() {
  habits.forEach((habit, i) => {
    // check if habit is completed first
    if (habit.isCompletedToday) {
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
  
    // add event listener to habit btns
    habitBtn.addEventListener('click', () => habitCompleteHandler(habit));
  });
}


function habitCompleteHandler(habit) {
  if (!habit.isCompletedToday) {
    habit.isCompletedToday = true;
    habit.completedDays = new Date().getDate();
    habit.saveToLocalStorage();
    fillCompletedDay(habit.completedDays);
  }
}

function fillCompletedDay(completedHabits) {
  const calendar = document.querySelector('#calendar');
  const days = Array.from(calendar.children);
  
  days.forEach((day, index) => {
    const date = index + 1;
    if (completedHabits.includes(date)) {
      day.classList.add('completed');
    }
  })
}

createHabitElement();