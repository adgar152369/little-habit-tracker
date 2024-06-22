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
    const storedData = localStorage.getItem(`habit-${this.name}`);
    if (storedData) {
      console.log(storedData);
      this._name = storedData.name;
      this._description = storedData.description;
      this._isAlarmSet = storedData.isAlarmSet;
      this._completedDays = storedData.completedDays || [];
      this._missedDays = storedData.missedDays || [];
      this._isCompletedToday = storedData.isCompletedToday || false;
      this.createdDate = new Date(storedData.createdDate).toLocaleDateString();
    }
    else {
      // console.log(this);
      this._name = name;
      this._description = description;
      this._isAlarmSet = isAlarmSet;
      this._completedDays = completedDays;
      this._missedDays = missedDays;
      this._isCompletedToday = isCompletedToday;
      this.createdDate = new Date().toLocaleDateString();
      Habit.allHabits.push(this);
    }

  }

  // Getters and Setters
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  set createdDate(value) {
    this._createdDate = value;
  }

  get createdDate() {
    return this._createdDate;
  }

  get description() {
    return this._description;
  }

  set description(newDescription) {
    this._description = newDescription.trim();
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

  set missedDays(date) {
    if (!Array.isArray(date)) {
      this._missedDays.push(date);
    }
    else {
      date.forEach(d => this._missedDays.push(d));
    }
  }

  get isCompletedToday() {
    return this._isCompletedToday;
  }

  set isCompletedToday(value) {
    this._isCompletedToday = value;
  }

  getMissedDaysForMonth() {
    const daysInMonth = 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);

      console.log(date);
    }
  }

  // Generate Habit calendar
  generateCalendar(month, year, habit) {
    const calendar = document.getElementById('calendar');
    const calendarYear = document.getElementById('calendar-year');
    const calendarContainer = document.querySelector('.calendar-container');
    const creationDate = document.createElement('span');
    creationDate.id = 'habitCreationDate';
    creationDate.textContent = `Habit created: ${this.createdDate}`;
    calendarContainer.appendChild(creationDate);

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
    const habitLink = document.createElement('a');
    const habitBtn = document.createElement('button');
    habitBtn.classList.add('habit-complete-btn');
    habitItem.setAttribute('data-habit-name', this.name);
    habitLink.classList.add('habit-link');
    habitItem.classList.add('habit');

    habitBtn.textContent = `C`;
    habitLink.textContent = this.name;

    habitItem.appendChild(habitLink);
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

  editHabit() {
    // Create the dialog element
    const modal = document.createElement('dialog');
    modal.classList.add('edit-modal');

    // Modal content
    modal.innerHTML = `
      <form method="dialog"> 
        <div class="modal-content">
          <h2>Edit Habit: ${this.name}</h2>
          <input type="text" id="edit-name" value="${this.name}" placeholder="Habit name">
          <textarea id="edit-description" placeholder="Habit description">${this.description}</textarea>
          <button class="" id="save-changes" value="save">Save Changes</button>
          <button class="basic-btn" id="cancel-edit" value="cancel">Cancel</button>
        </div>
      </form>
    `;
    document.body.appendChild(modal);

    // Event listeners for modal buttons
    const saveButton = document.getElementById('save-changes');
    const cancelButton = document.getElementById('cancel-edit');
    const nameInput = document.getElementById('edit-name');
    const descriptionInput = document.getElementById('edit-description');

    saveButton.addEventListener('click', () => {
      console.log(this);
      // const habitToEdit = this.loadHabitFromLocalStorage(this.name);

      // Get updated name and description
      const newName = nameInput.value.trim();
      const newDescription = descriptionInput.value.trim();

      if (newName !== this.name || newDescription !== this.description) {
        localStorage.removeItem(`habit-${this.name}`);
        this.name = newName;

        // Remove from allHabits Array
        const oldHabitIndex = Habit.allHabits.findIndex(h => h.name === this.name);
        if (oldHabitIndex !== -1) { // if match is found
          Habit.allHabits.splice(oldHabitIndex, 1);
        }
        this.description = newDescription;
        this.saveToLocalStorage();

        //Update allHabits Array
        Habit.allHabits.push(this);

        // refresh the page to update content
        location.reload();
      }

      modal.close('save');
    });

    cancelButton.addEventListener('click', () => {
      modal.close('cancel');
    });

    modal.showModal();
  }

  saveToLocalStorage() {
    const data = {
      createdDate: this.createdDate,
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

  loadHabitFromLocalStorage(habitName) {
    const storedHabit = localStorage.getItem(`habit-${habitName}`);
    if (storedHabit) {
      const data = JSON.parse(storedHabit);
      const habit = new Habit(
        data.name,
        data.description,
        data.isCompletedToday,
        data.isAlarmSet,
        data.completedDays,
        data.missedDays
      )
      return habit;
    }
    else {
      return null;
    }
  }

  static loadAllFromLocalStorage() {
    const keys = Object.keys(localStorage);
    const habits = [];

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