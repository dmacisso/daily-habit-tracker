const habitBtn = document.getElementById("addBtn");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");

const saveBtn = document.getElementById("save-checked");

// const habitElementLi = document.createElement("li");
const inputValue = habitInput.value;




const habits = [];

habitBtn.addEventListener("click", function () {
  const inputValue = habitInput.value.trim();
  if (!inputValue) return;
  habits.push(inputValue);

  // re-render the list from scratch to avoid reusing the same <li>
  habitList.innerHTML = "";
  habits.forEach(habit => {
    const li = document.createElement("li");
    li.textContent = habit;
    habitList.appendChild(li);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(checkbox);

  });
  habitInput.value = "";
  console.log(habits);
});


saveBtn.addEventListener('click', () => {

  // Selects all input elements of type checkbox
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Initialize and array of habit item objects
  let habitItems = [{
    date: "",
    habit: "",
    checked: false
  }];


  checkboxes.forEach(cb => {
    const parent = cb.parentElement;
    const habit = parent.textContent;
    const checked = cb.checked;
    // console.log(parent.textContent);
    // console.log(cb.checked); // Logs name and checked status

    habitItems = { ...habitItems, habit, checked };

    console.log(habitItems)

  });

})




