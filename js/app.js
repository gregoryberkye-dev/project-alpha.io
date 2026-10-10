 function validate(){
  let input = document.querySelector("input")
  if(input.value.trim() == "" || !input.value){
    return false
  }
  else return true
}

let data = []
function saveNote(){
  let valid = validate()
  let message =""
  let messageBox = document.querySelector(".input .message")
  let input = document.querySelector("input")
  
  if (valid == false) {
    message = "Note can't be empty"
    messageBox.classList.add("error")
  }else{
    message = "Note saved"
    messageBox.classList.add("success")

    let note = {
      id : Math.floor(Math.random() * 1000000),
      message : input.value,
    }
    data.push(note)
    localStorage.setItem("notes", JSON.stringify(data))

    input.value = ""
    retriveNote()
  }
  messageBox.textContent = message
  
  setTimeout(()=>{
    messageBox.classList.remove("error")
    messageBox.classList.remove("success")
  }, 1000)
}

function retriveNote(){
  let notes = localStorage.getItem("notes")
  let data = JSON.parse(notes || [])
  let noteBox = document.querySelector(".notes")
  let note = data.map(i=>{
    return `
        <div class="note">
          <p class="content">
          ${i.message}
          </p>
          <button onclick="deleteNote(${i.id})">Delete</button>
        </div>
        `
  }).join("")
  noteBox.innerHTML = note
  
}

retriveNote()

function deleteNote(id){
  let notes = JSON.parse(localStorage.getItem("notes") || [])
  let newNote = notes.filter(i=> i.id !== id)
  localStorage.setItem('notes', JSON.stringify(newNote))
  retriveNote()
}