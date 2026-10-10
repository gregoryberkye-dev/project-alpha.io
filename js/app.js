function validate(){
  let input = document.querySelector("input")
  if(input.value.trim() == "" || !input.value){
    return false
  }
  else return true
}

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

    let data = []
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
          <button>Delete</button>
        </div>
        `
  })
  noteBox.innerHTML = note
  
}