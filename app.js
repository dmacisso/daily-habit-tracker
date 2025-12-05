
// Reference to base elements
const habitInput = document.getElementById("habitInput");
const inputValue = habitInput.value;
const habitListUl = document.getElementById("habitList");
const habitBtn = document.getElementById("addBtn");
const restoreBtn = document.getElementById("restore-data");
const deleteAllBtn = document.getElementById('delete-all');
const clearBtn = document.getElementById("clear-all");
const formElement = document.getElementById('habit-form');

// console.log(typeof reloadDOM);

//* reload data on DOM reload

document.addEventListener("DOMContentLoaded", function () {
  const storedHabitItems = localStorage.getItem("habit-items");
  if (storedHabitItems) {
    // Use the stored habit-list to update the UI or application state
    let savedHabits = localStorage.getItem('habit-items');
    // console.log("Saved Habits: ", savedHabits)
    if (savedHabits) {
      savedHabits = JSON.parse(savedHabits);

      // 
      // generate and save a DOM listing of habits;
      savedHabits.forEach((habit) => {

        // Create an Li element
        const li = document.createElement("li");
        li.textContent = habit.habit;
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
          const habitToDelete = li.innerText.split('D')[0];
          const target = habitToDelete.trim();
          li.remove();// Remove the parent list item
          deleteItemFromStorage(target);
        });
        // console.log(checkbox);
        // const saveBtn = document.createElement("button");
        // saveBtn.textContent = 'Save 💾';
        // li.appendChild(saveBtn);
        // saveBtn.addEventListener("click", () => saveToStorage(habit.habit, checkbox));
      }
      );

    } else {
      console.log("No name found in local storage.");
    }
  }
});

//MARK: Generate DOM:

//* This function generates the DOM

function generateDOM(habits) {
  console.log("Habits: ", habits, habits.length);
  habits.forEach(habit => {
    const li = document.createElement("li");

    li.textContent = habit;

    habitListUl.appendChild(li);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(checkbox);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Del";
    li.appendChild(delBtn);
    delBtn.addEventListener('click', () => {
      const habitToDelete = li.innerText.split('D')[0];
      const target = habitToDelete.trim();
      // const target = li.innerText
      console.log(target);
      li.remove();// Remove the parent list item
      deleteItemFromStorage(target);
    });
    const saveBtn = document.createElement("button");
    saveBtn.textContent = 'Save';
    li.appendChild(saveBtn);
    saveBtn.addEventListener("click", () => saveToStorage(habit, isChecked));
  });
}

//MARK: Save Function
//*** This function will SAVE (add) habit to local storage.
function saveToStorage(habit, checkbox) {

  // console.log(checkbox.checked);

  // Initialize and array of habit item objects
  let existingHabitItems = JSON.parse(localStorage.getItem("habit-items")) || [];

  // console.log(existingHabitItems);

  // check for duplicate.
  const isDuplicate = existingHabitItems.some(item => item.habit === habit);


  const newHabitItem = {
    date: new Date().toISOString(),
    habit,
    checked: checkbox.checked
  };


  const idx = existingHabitItems.findIndex((item) => item.habit === newHabitItem.habit);

  if (!isDuplicate) {
    // console.log("Not Duplicate");
    existingHabitItems.push(newHabitItem);
    localStorage.setItem('habit-items', JSON.stringify(existingHabitItems));
    // console.log(`Habit ${habit} added successfully`);
  } else {
    const idx = existingHabitItems.findIndex((item) => item.habit === newHabitItem.habit);
    console.log(idx);
    if (idx !== -1) {
      existingHabitItems[idx] = newHabitItem;
      localStorage.setItem('habit-items', JSON.stringify(existingHabitItems));
      // console.log("replaced");
    }
  }
  window.location.reload();


  //This is a New test.



  habitInput.value = "";
}

//*** This function deletes a habit from local storage ***/
function deleteItemFromStorage(target) {
  let existingHabitItems = JSON.parse(localStorage.getItem("habit-items")) || [];
  const newList = existingHabitItems.filter((item) => item.habit !== target);
  localStorage.setItem('habit-items', JSON.stringify(newList));
}

//MARK: Save checked state
//*** This function saves the changed state of the checkbox */
function saveCheckedState(habit, checked) {
  console.log(`${habit} checked? ${checked}`);
  let existingHabitItems = JSON.parse(localStorage.getItem("habit-items")) || [];

  const newHabitItem = {
    date: new Date().toISOString(),
    habit,
    checked

  };

  const idx = existingHabitItems.findIndex((item) => item.habit === newHabitItem.habit);

  if (idx !== -1) {
    existingHabitItems[idx] = newHabitItem;
    localStorage.setItem('habit-items', JSON.stringify(existingHabitItems));
    // console.log("replaced");
  }

}


//MARK: Clear All  Habits from screen
function clearHabits() {
  const allHabits = document.querySelectorAll("li");
  console.log(allHabits);

}

// clearHabits();

//MARK: Initialize habits array.
const habits = [];
const isChecked = true;

//***  Click the "Add Habit" button to add habit to DOM  ***/
// habitBtn.addEventListener("click", function () {
formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = habitInput.value.trim();
  if (!inputValue) return;
  habits.push(inputValue);

  // re-render the list from scratch to avoid reusing the same <li>
  habitListUl.innerHTML = "";

  //* populate DOM
  // generateDOM(habits);

  // populateDOM(habits);
  habits.forEach(habit => {
    const li = document.createElement("li");
    li.textContent = habit;
    habitListUl.appendChild(li);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    // checkbox.addEventListener('change', function () {
    //   checkbox.checked ? true : false;

    // });
    li.appendChild(checkbox);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete ❌";
    li.appendChild(delBtn);
    delBtn.addEventListener('click', () => {
      const habitToDelete = li.innerText.split('D')[0];
      const target = habitToDelete.trim();
      // const target = li.innerText
      console.log(target);
      li.remove();// Remove the parent list item
      deleteItemFromStorage(target);
    });


    //* save on add
    saveToStorage(habit, checkbox);


    //* create and append a save button. 
    // const saveBtn = document.createElement("button");
    // saveBtn.textContent = 'Save 💾';
    // li.appendChild(saveBtn);
    // saveBtn.addEventListener("click", () => saveToStorage(habit, checkbox));
  });
  habitInput.value = "";

});


// MARK: Buttons

clearBtn.addEventListener("click", function () {
  const allHabits = document.querySelectorAll("li");
  allHabits.forEach(habit => { habit.remove(); });
});


restoreBtn.addEventListener("click", function () {
  window.location.reload();
});

deleteAllBtn.addEventListener("click", function () {
  localStorage.removeItem('habit-items');
});