export default class Habit {
  _completedDays = [];
  _missedDays = [];
  currentDay = new Date().getDate();
  currentMonth = new Date().getMonth() + 1;
  static allHabits = [];

  constructor(name, description, isAlarmSet = false, completedDays) {
    this._name = name;
    this._description = description;
    this.isAlarmSet = isAlarmSet;
    this._completedDays = completedDays;
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


  // Create habit element 
  createHabitElement(name) {
    const habitsSection = document.querySelector('#habits');
    const habitsList = document.querySelector('.habits-list');
    const habitItem = document.createElement('li');
    const habitLinkContainer = document.createElement('a');
    const habitBtn = document.createElement('button');
    habitBtn.classList.add('habit-complete-btn');
    habitLinkContainer.classList.add('habit-name')

    habitBtn.textContent = `Complete`;
    habitLinkContainer.textContent = name;
    habitLinkContainer.href = "";
    habitItem.classList.add('habit');
    
    habitItem.appendChild(habitLinkContainer);
    habitItem.appendChild(habitBtn); 
    habitsList.append(habitItem);
    habitsSection.appendChild(habitsList);

  }

  handleHabitCompletion() {
    if (!this.completedDays.includes(this.currentDay)) {
      console.log(this)
      this.completedDays = this.currentDay;
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    const data = {
      completedDays: this.completedDays,
      missedDays: this.missedDays,
      name: this.name,
      description: this.description,
      todaysDate: this.currentDay,
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
    return habits.map((habit) => new Habit(habit.name, habit.description, false, habit.completedDays));
  }
}