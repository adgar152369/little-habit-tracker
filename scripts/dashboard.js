import Habit from "./Habit.js";

const habitsList = document.querySelector('.habits-list');

// Get habits
const habits = Habit.loadAllFromLocalStorage();
let selectedHabitName = null;


function generateHabitList() {
  habits.forEach((habit, i) => {
    habit.createHabitElement();
  });

  const habitLinkBtns = document.querySelectorAll('.habit-link');
  const habitCompleteBtns = document.querySelectorAll('.habit-complete-btn');
  const lastHabitItem = habitsList.lastElementChild;
  console.log(lastHabitItem);

  if (habitLinkBtns.length > 0) {
    habitLinkBtns[0].classList.add('active');
    selectedHabitName = habitLinkBtns[0].textContent;

    habits.forEach((habit) => {
      if (habit.name === selectedHabitName) {
        habit.generateCalendar(habit.currentMonth, habit.currentYear, habit)
      }
    });

    // Active status btns
    habitLinkBtns.forEach((link, i) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        selectedHabitName = null;

        habitLinkBtns.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');

        // Scroll to the last item
        lastHabitItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        selectedHabitName = link.textContent;

        if (habits[i].name === selectedHabitName) {
          habits[i].generateCalendar(habits[i].currentMonth, habits[i].currentYear, habits[i]);
        }

      });
    });

    // Habit completion btns
    habitCompleteBtns.forEach((completeBtn, i) => {
      completeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const habitName = completeBtn.getAttribute('data-habit-name');

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

generateHabitList();