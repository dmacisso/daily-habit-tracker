// Import the functions.
import { dateTimeStamp, saveToStorage, deleteItemFromStorage, saveCheckedState, clearHabits } from "./utils.js";

// Reference to base elements
const habitInput = document.getElementById("habitInput");
const inputValue = habitInput.value;
const habitListUl = document.getElementById("habitList");
// const habitBtn = document.getElementById("addBtn");
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
      //MARK: Generate and save a DOM listing of habits;
      savedHabits.forEach((habit) => {
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
      }
      );

    } else {
      console.log("No name found in local storage.");
    }
  }
});


//MARK: Generate DOM:

//* This function generates the DOM

// function generateDOM(habits) {
//   console.log("Habits: ", habits, habits.length);
//   habits.forEach((habit) => {
//     // Create an Li element
//     const li = document.createElement("li");
//     li.textContent = `${habit.habit} - ${habit.date}`;
//     habitListUl.appendChild(li);

//     // Create a checkbox type input field
//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.checked = habit.checked;
//     checkbox.addEventListener('change', function () {
//       const checked = this.checked;
//       saveCheckedState(habit.habit, checked);
//     });
//     li.appendChild(checkbox);

//     //Create a clear habit button
//     const clearBtn = document.createElement("button");
//     clearBtn.textContent = "Clear Habit ✏️";
//     li.appendChild(clearBtn);
//     clearBtn.addEventListener("click", function () {
//       li.remove();
//     });

//     // Create a Delete Button
//     const delBtn = document.createElement("button");
//     delBtn.textContent = "Delete Habit ❌";
//     li.appendChild(delBtn);
//     delBtn.addEventListener('click', () => {
//       const habitToDelete = li.innerText.split('-')[0];
//       console.log(habitToDelete);
//       const target = habitToDelete.trim();
//       li.remove();// Remove the parent list item
//       deleteItemFromStorage(target);
//     });
//   }

// }






//MARK: Initialize habits array.
const habits = [];
const isChecked = true;

//***  Click the "Add Habit" button to add habit to DOM  ***/
formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = habitInput.value.trim().toLowerCase();
  if (!inputValue) return;
  habits.push(inputValue);

  // re-render the list from scratch to avoid reusing the same <li>
  habitListUl.innerHTML = "";

  //* populate DOM
  // generateDOM(habits);

  //MARK: populateDOM(habits);
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
  window.location.reload();
});