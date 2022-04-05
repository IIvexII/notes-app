const fs = require("fs");
const chalk = require("chalk");

const readNote = (title) => {
  const notes = fetchNotes();
  const foundNote = notes.find(note => note.title === title);

  if (foundNote) {
    console.log(chalk.blue.bold(foundNote.title));
    console.log(chalk.cyanBright.bold(foundNote.body));
    console.log(chalk.green.inverse.bold("Successfully Found Notes!"));
  } else {
    console.log(chalk.red.inverse.bold("Note not found!"));
  }
}

const listNotes = () => {
  const notes = fetchNotes();

  notes.forEach(val => {
    console.log(chalk.blue.bold(val.title));
    console.log(chalk.greenBright(val.body));
  });

}

const addNotes = (title, body) => {
  const notes = fetchNotes();  
  const isDuplicate = notes.some(v => v.title === title );

  if (isDuplicate === true) {
    console.log(chalk.yellow.inverse.bold.yellow("Duplicate Title is not allowed!"));
    return;
  }

  notes.push({
    title:title,
    body:body
  });

  writeToFile(notes);
  console.log(chalk.green.bold.inverse("Notes Added Successfully!"));
}

const removeNotes = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter( value => value.title !== title);

  if (notes.length !== filteredNotes.length) {
    writeToFile(filteredNotes);
    console.log(chalk.green.inverse.bold("Notes Removed Successfully!"));
  } else {
    console.log(chalk.red.inverse.bold("Unable to find those notes to remove."));
  }
}

const fetchNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return []
  }
}
const writeToFile = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
}

module.exports = {
  listNotes:listNotes,
  readNote:readNote,
  addNotes:addNotes,
  removeNotes:removeNotes
};