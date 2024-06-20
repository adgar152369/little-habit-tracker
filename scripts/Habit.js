export default class Habit {
  currentDay = new Date().getDate();
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();
  static allHabits = [];

  constructor
    (
      name,
      description,
      isCompletedToday = false,
      isAlarmSet = false,
      completedDays = [],
      missedDays = []
    ) {
    this._name = name;
    this._description = description;
    this._isAlarmSet = isAlarmSet;
    this._completedDays = completedDays;
    this._missedDays = missedDays;
    this._isCompletedToday = isCompletedToday;
    Habit.allHabits.push(this);
  }

  // Getters and Setters
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get description() {
    return this._description;
  }

  get completedDays() {
    return this._completedDays;
  }

  set completedDays(dates) {
    if (!Array.isArray(dates)) {
      this._completedDays.push(dates);
    }
    else {
      dates.forEach(date => this._completedDays.push(date));
    }
  }

  get missedDays() {
    return this._missedDays;
  }

  set missedDays(value) {
    this._missedDays.push(value);
  }

  get isCompletedToday() {
    return this._isCompletedToday;
  }

  set isCompletedToday(value) {
    this._isCompletedToday = value;
  }

  // Generate Habit calendar
  generateCalendar(month, year, habit) {
    const calendar = document.getElementById('calendar');
    const calendarYear = document.getElementById('calendar-year');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    calendar.innerHTML = ''; // Clear existing calendar
    // const firstDay = (new Date(year, month)).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    const yearEl = document.createElement('span');
    yearEl.textContent = `${monthNames[this.currentMonth - 1]} ${this.currentDay}, ${year}`;
    calendarYear.innerHTML = '';
    calendarYear.appendChild(yearEl);

    // // Create calendar cells for each day
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');
      cell.classList.add('day');

      cell.textContent = day;

      // Highlight current day, in the current month, in the current year
      if (
        day === this.currentDay &&
        month === this.currentMonth &&
        year === this.currentYear
      ) {
        cell.classList.add('current');
      }

      if (habit.completedDays.includes(day)) {
        cell.classList.add('completed')
      }

      calendar.appendChild(cell);
    }
  }


  // Create habit element 
  createHabitElement() {
    const habitsSection = document.querySelector('#habits');
    const habitsList = document.querySelector('.habits-list');
    const habitItem = document.createElement('li');
    const habitLinkContainer = document.createElement('a');
    const habitBtn = document.createElement('button');
    habitBtn.classList.add('habit-complete-btn');
    habitBtn.setAttribute('data-habit-name', this.name);
    habitLinkContainer.classList.add('habit-link')
    habitItem.classList.add('habit');

    habitBtn.textContent = `Complete`;
    habitLinkContainer.textContent = this.name;

    habitItem.appendChild(habitLinkContainer);
    habitItem.appendChild(habitBtn);
    habitsList.append(habitItem);
    habitsSection.appendChild(habitsList);
  }

  handleHabitCompletion() {
    if (this.completedDays.includes(this.currentDay)) {
      return; // Do nothing if the habit is already completed
    }
    if (this.isCompletedToday) this.isCompletedToday = false;
    this.isCompletedToday = true;
    this.completedDays = this.currentDay;
    this.saveToLocalStorage();
    this.generateCalendar(this.currentMonth, this.currentYear, this);
  }

  saveToLocalStorage() {
    const data = {
      completedDays: this.completedDays,
      missedDays: this.missedDays,
      name: this.name,
      description: this.description,
      todaysDate: this.currentDay,
      isCompletedToday: this.isCompletedToday,
      isAlarmSet: this._isAlarmSet
    };
    localStorage.setItem(`habit-${this.name}`, JSON.stringify(data));
  }

  static loadAllFromLocalStorage() {
    const keys = Object.keys(localStorage);
    const habits = [];
    let isHabitCompleted = false;

    for (const key of keys) {
      const habit = JSON.parse(localStorage.getItem(key));
      habits.push(habit);
    }

    // Transform localStorage habits into Habit instances
    return habits.map((habit) => new Habit(
      habit.name,
      habit.description,
      habit.isCompletedToday,
      habit.isAlarmSet,
      habit.completedDays,
      habit.missedDays
    ));
  }
}