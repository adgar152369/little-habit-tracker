export default class Habit {
  _completedDays = [];
  _missedDays = [];
  _isCompletedToday = false;
  currentDay = new Date().getDate();
  static allHabits = [];

  constructor(name, description, isAlarmSet = false) {
    this._name = name;
    this._description = description;
    this.isAlarmSet = isAlarmSet;
    Habit.allHabits.push(this);
  }

  createHabitElement(name, isCompleted) {
    // Create habit element 
    const habitsSection = document.querySelector('#habits');
    const habitsList = document.createElement('ul');
    const habitItem = document.createElement('li');
    const habitBtn = document.createElement('button');
    habitBtn.textContent = `Complete`;
    habitItem.textContent = name;
    habitItem.appendChild(habitBtn);
    habitsList.append(habitItem);
    habitsSection.appendChild(habitsList);
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
      console.log(dates)
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

  /**
   * @param {boolean} value
   */
  set isCompletedToday(value) {
    this._isCompletedToday = value;
    this.completedDays.push(this.currentDay);
    // set isCompletedToday back to false
    // this._isCompletedToday = false;
  }

  get isCompletedToday() {
    return this._isCompletedToday;
  }

  editHabit(newName, newDesc, newIsAlarmSet) {
    this.name = newName;
    this.description = newDesc;
    this.isAlarmSet = newIsAlarmSet;
    this.isCompleted = newIsCompleted;
  }

  saveToLocalStorage() {
    const data = {
      completedDays: this.completedDays,
      missedDays: this.missedDays,
      isCompletedToday: this._isCompletedToday,
      name: this.name,
      description: this.description,
      todaysDate: this.currentDay,
    };
    localStorage.setItem(`habit-${this.name}`, JSON.stringify(data));
  }

  static loadAllFromLocalStorage() {
    const keys = Object.keys(localStorage);
    const habits = [];
    for (const key of keys) {
      const habit = JSON.parse(localStorage.getItem(key));
      habits.push(habit);
    }

    // Transform localStorage habits into Habit instances
    habits.forEach((habit) => new Habit(habit.name, habit.description))

    return Habit.allHabits;
  }
}