// Reference to base elements
const habitBtn = document.getElementById("addBtn");
const habitInput = document.getElementById("habitInput");
const habitListUl = document.getElementById("habitList");
const saveBtn = document.getElementById("save-data");
const restoreBtn = document.getElementById("restore-data");

const inputValue = habitInput.value;

// initialize a habits array.
const habits = [];

habitBtn.addEventListener("click", function () {
  const inputValue = habitInput.value.trim();
  if (!inputValue) return;
  habits.push(inputValue);


  // re-render the list from scratch to avoid reusing the same <li>
  habitListUl.innerHTML = "";
  habits.forEach(habit => {
    const li = document.createElement("li");
    li.textContent = habit;
    habitListUl.appendChild(li);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(checkbox);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Del";
    delBtn.addEventListener('click', () => {
      li.remove(); // Remove the parent list item
    });
    li.appendChild(delBtn);
  });
  // habitInput.value = "";
  // console.log(habits);



  //* Selects all input elements of type checkbox
  // const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // console.log(checkboxes)

  // Initialize and array of habit item objects
  let existingHabitItems = JSON.parse(localStorage.getItem("habit-items")) || [];

  const newHabitItems = [{
    date: new Date().toISOString(),
    habit: habitInput.value,
    checked: false
  }];

  existingHabitItems.push(newHabitItems);

  localStorage.setItem('habit-items', JSON.stringify(existingHabitItems));
  habitInput.value = "";

});



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


restoreBtn.addEventListener("click", function () {
  let savedHabits = localStorage.getItem('habit-items');
  if (savedHabits) {
    savedHabits = JSON.parse(savedHabits);
    // console.log(savedHabits);

    //Generate a DOM
    savedHabits.forEach((habit) => {
      // console.log(habit.habit, habit.checked);
      const li = document.createElement("li");
      console.log(habit[0])
      li.textContent = habit[0].habit;
      habitListUl.appendChild(li);
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      li.appendChild(checkbox);
      const delBtn = document.createElement("button");
      delBtn.textContent = "Del";
      delBtn.addEventListener('click', () => {
        li.remove(); // Remove the parent list item
      });
      li.appendChild(delBtn);

    });

  } else {
    console.log("No name found in local storage.");
  }
})

