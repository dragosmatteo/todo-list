const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const clearAll = document.querySelector(".footer button");
const pending = document.querySelector(".pending");
var listArr = [];

let getLocalStorage = localStorage.getItem("New Task");

if (getLocalStorage) {
   listArr = JSON.parse(getLocalStorage);
}

inputBox.onkeyup = () => {
   let userData = inputBox.value;

   if (userData.length > 0) {
      addBtn.classList.add("active");
   } else {
      addBtn.classList.remove("active");
   }
};

showTasks();

addBtn.onclick = () => {
   let userData = inputBox.value;

   if (userData.length > 0) {
      listArr.push(userData);
      localStorage.setItem("New Task", JSON.stringify(listArr));
      addBtn.classList.remove("active");
   }

   showTasks();
};

// inputBox.addEventListener("keyup", (event) => {
//    let userData = inputBox.value;

//    if (event.keyCode === "13") {
//       event.preventDefault();

//       listArr.push(userData);
//       localStorage.setItem("New Task", JSON.stringify(listArr));
//       addBtn.classList.remove("active");
//    }

//    showTasks();
// });

function showTasks() {
   pending.textContent = listArr.length;

   let newLiTag = "";
   listArr.forEach((element, index) => {
      newLiTag += ` <li> ${element}<span onclick ="deleteTask(${index})"><i class="fas fa-trash-alt"></i></span></li>`;
   });

   todoList.innerHTML = newLiTag;
   inputBox.value = "";

   if (listArr.length > 0) {
      clearAll.classList.add("active");
   } else {
      clearAll.classList.remove("active");
   }
}

function deleteTask(index) {
   // listArr = listArr.filter((el,i) => i != index);
   listArr.splice(index, 1);

   localStorage.setItem("New Task", JSON.stringify(listArr));
   showTasks();
}

clearAll.onclick = () => {
   listArr = [];

   localStorage.setItem("New Task", JSON.stringify(listArr));
   showTasks();
};
