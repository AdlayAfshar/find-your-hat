const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  //   constructor(field) {
  //     this.field = field;
  //     this.row = -1;
  //     this.col = -1;
  //   }

  constructor() {
    this.rows = 3;
    this.col = -1;
    this.array = [];

    for (let i = 0; i < this.rows; i++) {
      this.array[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.array[i][j] = fieldCharacter;
      }
    }

    // this.print();
    this.generateField();
    // this.print();
  }

  print() {
    let str = this.array.map((arr) => arr.join("  "));
    // console.log(str);
    console.log(str.join("\n \n"));
  }

  find() {
    for (let i of this.array) {
      if (i.indexOf(pathCharacter) !== -1) {
        this.row = this.array.indexOf(i);
        this.col = i.indexOf(pathCharacter);
      }
    }
  }

  move() {
    let i = this.row;
    let j = this.col;
    let result = true;

    while (result === true) {
      if (this.field[i][j] === hat) {
        console.log("You Win!");
        break;
      } else if (this.field[i][j] === hole) {
        console.log("You Lost!");
        break;
      } else {
        this.field[i][j] = pathCharacter;
      }

      this.print();

      let n = prompt("Which way are you moving?");
      this.find();

      if (n === "w") {
        this.field[i][j] = fieldCharacter;
        if (i > 0) {
          i = i - 1;
          j = j;
        } else {
          result = false;
        }
      } else if (n === "d") {
        this.field[i][j] = fieldCharacter;
        if (j < this.field[0].length - 1) {
          i = i;
          j = j + 1;
        } else {
          console.log("fuuuck");

          result = false;
        }
      } else if (n === "s") {
        this.field[i][j] = fieldCharacter;
        if (i < this.field.length - 1) {
          i = i + 1;
          j = j;
        } else {
          result = false;
        }
      } else if (n === "a") {
        this.field[i][j] = fieldCharacter;
        if (j > 0) {
          i = i;
          j = j - 1;
        } else {
          result = false;
        }
      } else {
        console.log("pls enter the correct direction!");
      }
    }

    if (!result) {
      console.log("You Lost!");
    }
  }

  generateField() {
    // hat random place
    // const rowRandomHat = Math.floor(Math.random() * 3);
    // const colRandomHat = Math.floor(Math.random() * 3);
    let rowRandomHat;
    let colRandomHat;

    do {
      rowRandomHat = Math.floor(Math.random() * 3);
      colRandomHat = Math.floor(Math.random() * 3);
      console.log(`do : ${rowRandomHat}`, colRandomHat);
    } while (rowRandomHat === 1 && colRandomHat === 1);
    
    {
      this.array[rowRandomHat].splice(colRandomHat, 1, hat);
      console.log(rowRandomHat, colRandomHat);
    }
    console.log(`end : ${rowRandomHat}`, colRandomHat);

    // pathCharacter random place
    let rowRandomPath;
    let colRandomPath;

    do {
      rowRandomPath = Math.floor(Math.random() * 3);
      colRandomPath = Math.floor(Math.random() * 3);
      console.log(`path : ${rowRandomPath}`, colRandomPath);
    } while (
        // The random path should not be at the center and it should not have the same position as the the hat
      (rowRandomPath === rowRandomHat && colRandomPath === colRandomHat) ||
      (rowRandomPath === 1 && colRandomPath === 1)
    );

    {
      this.array[rowRandomPath].splice(colRandomPath, 1, pathCharacter);
      console.log(rowRandomPath, colRandomPath);
    }

    console.log(`end : ${rowRandomPath}`, colRandomPath);

    // hole random place
    let rowRandomHole;
    let colRandomHole;

    do {
      rowRandomHole = Math.floor(Math.random() * 3);
      colRandomHole = Math.floor(Math.random() * 3);
      console.log(`hole : ${rowRandomHole}`, colRandomHole);
    } while (
      (rowRandomHole === rowRandomHat && colRandomHole === colRandomHat) ||
      (rowRandomHole === rowRandomPath && colRandomHole === colRandomPath)
    );
    {
      this.array[rowRandomHole].splice(colRandomHole, 1, hole);
      console.log(rowRandomHole, colRandomHole);
    }

    this.print();
  }
}

// const myField = new Field([
//   ["░", "░", "O"],
//   ["░", "O", "*"],
//   ["░", "^", "░"],
// ]);

const myField = new Field();

// console.log(myField.array);

myField.find();
// myField.move();
