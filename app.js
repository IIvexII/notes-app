const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// Add Command
yargs.command({
  command: "add",
  describe: "Add New Notes",
  builder: {
    title: {
      describe: "Title of Notes",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Notes Content/Body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  }
});
yargs.command({
  command: "remove",
  describe: "Remove existing notes",
  builder: {
    title: {
      describe: "title of note.",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  }
});
yargs.command({
  command: "list",
  describe: "List All Notes",
  handler() {
    notes.listNotes();
  }
});
yargs.command({
  command: "read",
  describe: "Read Some Notes",
  builder: {
    title: {
      describe: "Read a spacific note by title",
      demandOption: true,
      type:"string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

yargs.argv