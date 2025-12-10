

//MARK: DateTime Function
//**  This function returns date time in "month/day/year hour:min:seconds" format   **//
export const dateTimeStamp = () => {

  // Get the current date and time
  const now = new Date();

  // Extract hours, minutes, and seconds
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Format the time string with leading zeros
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString()}`;

  // console.log(formattedTime);

  // Get the full year
  let year = now.getFullYear();

  // Get the current month
  let month = now.getMonth();

  // Get the day
  let day = now.getDate();

  // Format the date string
  const formattedDate = `${month + 1}/${day}/${year}`;

  // console.log(formattedDate)

  // console.log(`${formattedDate} ${formattedTime}`)
  return `${formattedDate} ${formattedTime}`;

};


//MARK: Save to Storage
//*** This function will SAVE (add) habit to local storage.
export const saveToStorage = (habit, checkbox) => {

  // console.log(checkbox.checked);

  // Initialize and array of habit item objects
  let existingHabitItems = JSON.parse(localStorage.getItem("habit-items")) || [];
  const newHabitItem = {
    date: dateTimeStamp(),
    habit,
    checked: checkbox.checked
  };

  existingHabitItems.push(newHabitItem);
  localStorage.setItem('habit-items', JSON.stringify(existingHabitItems));
  window.location.reload();
  habitInput.value = "";
};

//MARK: Delete Item from Storage
//*** This function deletes a habit from local storage ***/
export const deleteItemFromStorage = (target) => {
  let existingHabitItems = JSON.parse(localStorage.getItem("habit-items")) || [];
  const newList = existingHabitItems.filter((item) => item.habit !== target);
  localStorage.setItem('habit-items', JSON.stringify(newList));
  window.location.reload();
};

//MARK: Save checked state
//*** This function saves the changed state of the checkbox */
export const saveCheckedState = (habit, checked) => {
  console.log(`${habit} checked? ${checked}`);
  let existingHabitItems = JSON.parse(localStorage.getItem("habit-items")) || [];
  const newHabitItem = {
    date: dateTimeStamp(),
    habit,
    checked

  };

  const idx = existingHabitItems.findIndex((item) => item.habit === newHabitItem.habit);

  if (idx !== -1) {
    existingHabitItems[idx] = newHabitItem;
    localStorage.setItem('habit-items', JSON.stringify(existingHabitItems));
    // console.log("replaced");
  }

  window.location.reload();

};

//MARK: Clear All  Habits from screen
export const clearHabits = () => {
  const allHabits = document.querySelectorAll("li");
  console.log(allHabits);

};

//MARK: Generate DOM:
//* This function generates the DOM
export const generateDOM = (habits) => {
  console.log("Habits: ", habits, habits.length);
  habits.forEach((habit) => {
    // Create an Li element
    const li = document.createElement("li");
    li.textContent = `${habit.habit} - ${habit.date}`;
    habitListUl.appendChild(li);

    // Create a checkbox type input field
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = habit.checked;
    checkbox.addEventListener('change', function () {
      const checked = this.checked;
      saveCheckedState(habit.habit, checked);
    });
    li.appendChild(checkbox);

    //Create a clear habit button
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Habit ✏️";
    li.appendChild(clearBtn);
    clearBtn.addEventListener("click", function () {
      li.remove();
    });

    // Create a Delete Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete Habit ❌";
    li.appendChild(delBtn);
    delBtn.addEventListener('click', () => {
      const habitToDelete = li.innerText.split('-')[0];
      console.log(habitToDelete);
      const target = habitToDelete.trim();
      li.remove();// Remove the parent list item
      deleteItemFromStorage(target);
    });
  });
};
