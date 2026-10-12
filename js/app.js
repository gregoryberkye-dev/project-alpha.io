 function validate(){
  let note = document.querySelector("textarea")
  let title = document.querySelector("input")
  if(title.value.trim() == "" && note.value.trim() == "" || !note.value && !title.value){
    return false
  }
  else return [title, note]
}

let data = []
function saveNote(){
  let valid = validate()
  
  if (valid == false) {
    return
  }else{
     let title = valid[0].value
     let note = valid[1].value
    let date = new Date()
    let newNote = {
      id : Math.floor(Math.random() * 10000000),
      title : !title ? "" : title,
      note : !note ? "" : note,
      date : `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      time : `${date.getHours()} : ${ date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()}`
    }
    data.push(newNote)
    localStorage.setItem('notes', JSON.stringify(data))
    retriveNote()
  }
    
    
}

function retriveNote(){
  let notes = localStorage.getItem("notes")
  let data = JSON.parse(notes || [])
  let noteBox = document.querySelector(".notes")
  let note = data.map(i=>{
    let noteText = i.note.substring(0, 50)
    return `
       <div class="note" onclick="getNote(${i.id})">
          <div class="title">
            ${i.title}
          </div>
          <div class="sub-note">
            ${i.note.length < 50 ? i.note : noteText+"..."}
          </div>
          <button onclick="deleteNote(${i.id})"><i class="fa fa-trash"></i></button>
        </div>
      `
  }).join("")
  noteBox.innerHTML = note
  
}

retriveNote()


function deleteNote(id){
  let notes = JSON.parse(localStorage.getItem("notes") || [])
  let newNote = notes.filter(i => i.id !== id)
  localStorage.setItem('notes', JSON.stringify(newNote))
  retriveNote()
}

function navigatePage(url){
  location.href=url
}

function getNote(id){
  let notes = JSON.parse(localStorage.getItem("notes") || [])
  let note = notes.filter(i=> i.id === id)
  let href = location.host+`/get-note.html`
  location.href = href

  let titleBox = document.querySelector(".get-title")
  let noteBox = document.querySelector("#get-note")
  
  titleBox.value = note.title
}

