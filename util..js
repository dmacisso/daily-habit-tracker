// Local Storage
// saveBtn.addEventListener('click', () => {

//   // Selects all input elements of type checkbox
//   const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Initialize and array of habit item objects
//   let habitItems = [{
//     date: "",
//     habit: "",
//     checked: false
//   }];


//   checkboxes.forEach(cb => {
//     const parent = cb.parentElement;
//     const habit = parent.textContent;
//     const checked = cb.checked;
//     // console.log(parent.textContent);
//     // console.log(cb.checked); // Logs name and checked status

//     habitItems = { ...habitItems, habit, checked };

//     console.log(habitItems);

//   });

// });


//* Selects all input elements of type checkbox

// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// console.log(checkboxes)


//***  function to populate the DOM  ***//
function populateDOM(habitsArray) {
  habitsArray.forEach((habit) => {
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
      const target = li.innerText.split('D')[0];
      li.remove();// Remove the parent list item
      deleteItemFromStorage(target);
    });
  });
}

function reloadDOM() {
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
          const target = li.innerText.split('D')[0];
          li.remove();// Remove the parent list item
          deleteItemFromStorage(target);
        });

      });

    } else {
      console.log("No name found in local storage.");
    }
  }
}

module.exports = {
  populateDOM: populateDOM,
  reloadDOM: reloadDOM

};