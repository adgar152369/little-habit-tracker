export default class Habit {
  _completedDays = [];
  _missedDays = [];
  _isCompletedToday = false;
  static allHabits = [];

  constructor(name, description, isAlarmSet = false) {
    this.name = name;
    this.description = description;
    this.isAlarmSet = isAlarmSet;
    Habit.allHabits.push(this);
  }

  static getAllHabits() {
    return Habit.allHabits;
  }

  static createHabit(name, desc, isAlarmSet = false) {

  }

  get completedDays() {
    return this._completedDays;
  }

  set completedDays(value) {
    this._completedDays.push(value);
    // Perform additional logic or side effects here
    // For example, you could update streak calculations, save to storage, etc.
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
    this.completedDate = this._isCompletedToday ? new Date().getDate() : false;
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
      desc: this.description
    };
    localStorage.setItem(`habit-${this.name}`, JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const storedHabits = Habit.getAllHabits();
    console.log(storedHabits);
    if (storedHabits) {
      const data = JSON.parse(...storedHabits);
      this._completedDays = data.completedDays || [];
      this._missedDays = data.missedDays || [];
    }
  }
}