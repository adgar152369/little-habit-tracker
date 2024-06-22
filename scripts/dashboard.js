import Habit from "./Habit.js";
import generateSuccessChart from "./successChart.js";


// Get habits
let habits = Habit.loadAllFromLocalStorage();
const habitsList = document.querySelector('.habits-list');
let selectedHabitName = null;


function generateHabitList() {
  habits.forEach((habit, i) => {
    habit.createHabitElement();
  });

  const habitLinkBtns = document.querySelectorAll('.habit-link');
  const habitItems = habitsList.querySelectorAll('.habit');
  const habitCompleteBtns = document.querySelectorAll('.habit-complete-btn');


  // give first habit loaded the active class
  if (habitItems.length > 0) {
    habitItems[0].classList.add('active');
    selectedHabitName = habitLinkBtns[0].textContent;

    habits.forEach((habit) => {
      if (habit.name === selectedHabitName) {
        habit.generateCalendar(habit.currentMonth, habit.currentYear, habit);
        generateSuccessChart(habit);
      }
    });

    // Active status btns
    habitItems.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        selectedHabitName = null;

        habitItems.forEach((habit) => habit.classList.remove('active'));
        item.classList.add('active');

        // Find the clicked habit
        const habitName = item.querySelector('.habit-link').textContent;
        const selectedHabit = habits.find(h => h.name === habitName);

        if (selectedHabit) {
          e.target.scrollIntoView({
            behavior: 'smooth', // Use smooth scrolling
            block: 'center',   // Center the element in the viewport (vertically and horizontally)
            inline: 'center'   // Center the element in the viewport horizontally
          });
          selectedHabit.generateCalendar(selectedHabit.currentMonth, selectedHabit.currentYear, selectedHabit);
          generateSuccessChart(selectedHabit);
        }
      });
    });

    // Edit habit btns
    habitLinkBtns.forEach((link, i) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const selectedHabit = habits.find(h => h.name === link.textContent);
        if (selectedHabit) {
          selectedHabit.editHabit();
        }
      });
    });

    // Habit completion btns
    habitCompleteBtns.forEach((completeBtn, i) => {
      completeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const habitName = habitItems[i].getAttribute('data-habit-name');

        if (habitName === habits[i].name) {
          habits[i].handleHabitCompletion();
        }
      });
    });
  }

  // createIntersectionObserver(habitLinkBtns);
}

function createIntersectionObserver(links) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      // Check if a habit link is intersecting (visible) within the viewport
      if (entry.isIntersecting) {
        // Remove 'active' class from all links
        links.forEach((link) => link.classList.remove('active'));
        // Add 'active' class to the visible link
        entry.target.classList.add('active');

        // Get the habit name from the data attribute
        const habitName = entry.target.nextSibling.dataset.habitName;
        selectedHabitName = habits.find(h => h.name === habitName);

        if (selectedHabitName) {
          // console.log(this);
          selectedHabitName.generateCalendar(
            selectedHabitName.currentMonth,
            selectedHabitName.currentYear,
            selectedHabitName
          );
        }
      }
    });
  }, {
    root: habitsList, // Observe within the habitsList container
    threshold: 0.5 // Trigger when 50% or more of the element is visible
  });

  links.forEach((link) => observer.observe(link))
}

if (habits.length > 0) {
  generateHabitList();
}