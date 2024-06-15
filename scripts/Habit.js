export default class Habit {
  constructor(name, description, isAlarmSet = false, isCompleted) {
    this.name = name;
    this.description = description;
    this.isAlarmSet = isAlarmSet;
    this.isCompleted = isCompleted;
  }
  completedDays = [];
  missedDays = [];

  static createHabit(name, desc, isAlarmSet = false) {

  }

  editHabit(newName, newDesc, newIsAlarmSet, newIsCompleted) {
    this.name = newName;
    this.description = newDesc;
    this.isAlarmSet = newIsAlarmSet;
    this.isCompleted = newIsCompleted;
  }
}