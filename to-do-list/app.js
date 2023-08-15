// Load tasks from local storage
let storedTasks = JSON.parse(localStorage.getItem("tasks"))
if(storedTasks){
  for (let i = 0; i < storedTasks.length; i++) {
    addNewItem(storedTasks[i])
  }
} else {
  storedTasks = []
}

// Add subtext button
document.querySelectorAll("[data-expand]").forEach(article => {
  article.addEventListener('click', e => {
    e.target.closest('article').classList.toggle("show-text")
    if(e.target.classList[1] === "fa-square-plus"){
      e.target.style.display = "none"
      e.target.nextElementSibling.removeAttribute("style")
    }
    if(e.target.classList[1] === "fa-square-minus"){
      e.target.style.display = "none"
      e.target.previousElementSibling.removeAttribute("style")
    }
  });
}); 

//Adds listners to pased attribute with specific value to track listners
function addAttributeEvent(attribute){
  let elements = document.querySelectorAll("["+attribute+"]")
  if(elements){
    for (let i = 0; i < elements.length; i++) {
      if(elements[i].getAttribute(attribute) === "delete"){
        // Add delete function to elements 
        elements[i].addEventListener('click', e => {
          e.target.closest("article").remove()
          removeTasks(e.target.closest("article").getElementsByTagName('p')[0].childNodes[1].nodeValue)
          addNumber()
        },{once:true})
        elements[i].setAttribute(attribute, "deleteSet")
      } else if (elements[i].getAttribute(attribute) === "drag"){
        // Add dragging class to elements
        elements.forEach(draggable => {
          draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
          })
        
          draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
          })
        })

        elements[i].setAttribute(attribute, "draggableSet")
      }
    }
  }
}

function addNewItem(item) {
  let newItem = document.querySelector('.input').value
  if (newItem != '') {
    saveTasks(newItem)
  }
  // Save task to local storage
  if(item){
    console.log(item)
    newItem = item
  }
  if (newItem != '') {
    // Render task
    document.querySelector('.input').value = ''
    let items = document.querySelector(".section-center")
    let articleNode = document.createElement("article")
    articleNode.setAttribute('draggable', 'true')
    articleNode.setAttribute('data-drag', 'drag')
    articleNode.classList.add('draggable', 'question')

    articleNode.append(document.createElement("div"))
    articleNode.lastChild.classList.add("question-title")
    
    articleNode.lastChild.append(document.createElement("p"))
    articleNode.getElementsByTagName("p")[0].innerHTML = newItem;

    articleNode.lastChild.append(document.createElement("button"))
    articleNode.lastChild.lastChild.setAttribute('data-delete','delete')
    articleNode.lastChild.lastChild.setAttribute('type','button')
    articleNode.lastChild.lastChild.setAttribute('class','btn shake')
    articleNode.lastChild.lastChild.setAttribute('aria-label','Delete')
    articleNode.lastChild.lastChild.append(document.createElement("i"))
    articleNode.lastChild.lastChild.lastChild.setAttribute('class','fa-solid fa-trash')

    items.append(articleNode)
    addNumber()
    addAttributeEvent("data-delete")
    addAttributeEvent('data-drag')
  }
}

function addNumber() {
  let items = document.querySelectorAll(".question-title")
  for (let i = 0; i < items.length; i++) {
    if(items[i].querySelector("[data-index]")){
      items[i].querySelector("[data-index]").innerHTML = i+1+". "
    } else {
      items[i].getElementsByTagName("p")[0].innerHTML = "<span data-index>"+(i+1)+". </span>"+items[i].getElementsByTagName("p")[0].innerHTML
    }
  }
}

document.getElementById('add').addEventListener('click', () => addNewItem())
addNumber()
addAttributeEvent("data-delete")
addAttributeEvent('data-drag')

//Drag and drop + Creation
const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.section-center')

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const draggable = document.querySelector('.dragging')
    if(draggable===null){
      console.log('Error: Element missing dragable class')
    } else {
      const afterElement = getDragAfterElement(container, e.clientY)
      if (afterElement == null) {
        container.append(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
      addNumber()
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

function saveTasks(newTask){
  storedTasks.push(newTask)
  localStorage.setItem("tasks", JSON.stringify(storedTasks))
}
// Remove tasks from local storage
function removeTasks(match){
  for(let i = 0; i < storedTasks.length; i++){           
    if (storedTasks[i] === match) { 
      storedTasks.splice(i, 1); 
      i--; 
    }
  }
  localStorage.setItem("tasks", JSON.stringify(storedTasks))
}