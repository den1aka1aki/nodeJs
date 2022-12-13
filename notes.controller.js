const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const {bgBlue} = require("chalk");

const notesPath = path.join(__dirname, 'db.json')
async function addNote (title) {
    const notes = await getNotes()
    const note = {
     title,
     id: Date.now().toString()
 }
 notes.push(note)
   await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green.inverse('Note was added!'))
}
async function remove(id){
    const notes = await getNotes();
    const newNotes = notes.filter((n)=> n.id != id);
    await fs.writeFile(notesPath, JSON.stringify(newNotes))
    console.log(chalk.bgRedBright(`Note with id:${id} has been deleted!`))
}

async function getNotes(){
    const notes = await fs.readFile(notesPath, {encoding:"utf-8"})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}
async function printNotes (){
    const notes = await getNotes()
    console.log(chalk,bgBlue('Here there is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id + ' ' + note.title))
    })
}
module.exports={
    addNote, getNotes
}
