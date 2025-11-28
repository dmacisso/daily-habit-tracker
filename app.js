
// Reference to base elements
const habitInput = document.getElementById("habitInput");
const inputValue = habitInput.value;
const habitListUl = document.getElementById("habitList");
const habitBtn = document.getElementById("addBtn");
const restoreBtn = document.getElementById("restore-data");

// console.log(typeof reloadDOM);

//* reload data on DOM reload

document.addEventListener("DOMContentLoaded", function () {
  const storedHabitItems = localStorage.getItem("habit-items");
  if (storedHabitItems) {
    // Use the stored habit-list to update the UI or application state
    let savedHabits = localStorage.getItem('habit-items');
    if (savedHabits) {
      savedHabits = JSON.parse(savedHabits);
      // console.log(savedHabits);

      //Generate a DOM
      savedHabits.forEach((habit) => {
        // console.log(habit.habit, habit.checked);
        const li = document.createElement("li");
        // console.log(habit[0]);
        li.textContent = habit[0].habit;
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

      });

    } else {
      console.log("No name found in local storage.");
    }
  }
});

// initialize a habits array.
const habits = [];

//*** This function deletes a habit from local storage ***/
function deleteItemFromStorage(target) {
  let existingHabitItems = JSON.parse(localStorage.getItem("habit-items")) || [];
  const newList = existingHabitItems.filter((item) => item[0].habit !== target);
  localStorage.setItem('habit-items', JSON.stringify(newList));
}


//***  Click the "Add Habit" button to add habit to DOM  ***/
habitBtn.addEventListener("click", function () {
  const inputValue = habitInput.value.trim();
  if (!inputValue) return;
  habits.push(inputValue);

  // re-render the list from scratch to avoid reusing the same <li>
  habitListUl.innerHTML = "";

  //* populate DOM
  // populateDOM(habits)
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
  });
  // console.log(habits);

  // Add habit to local storage.
  // Initialize and array of habit item objects
  let existingHabitItems = JSON.parse(localStorage.getItem("habit-items")) || [];
  // console.log(habitInput.value)

  const newHabitItems = [{
    date: new Date().toISOString(),
    habit: habitInput.value,
    checked: false
  }];

  existingHabitItems.push(newHabitItems);

  localStorage.setItem('habit-items', JSON.stringify(existingHabitItems));
  habitInput.value = "";

});



restoreBtn.addEventListener("click", function () {
  window.location.reload();
  let savedHabits = localStorage.getItem('habit-items');
  if (savedHabits) {
    savedHabits = JSON.parse(savedHabits);
    // console.log(savedHabits);

    //Generate a DOM
    savedHabits.forEach((habit) => {
      // console.log(habit.habit, habit.checked);
      const li = document.createElement("li");
      // console.log(habit[0]);
      li.textContent = habit[0].habit;
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

    });

  } else {
    console.log("No name found in local storage.");
  }
});