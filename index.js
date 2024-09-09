// 'SHRUGMAN' GAME  =>  index.js

// Goal of this file:
// --> To set up and run the Shrugman game.
// --> It initializes a new Shrugman game instance, prompts the user for guesses, updates the game state, and displays the results.

// Summary:
// - Imports dependencies and the Shrugman class
// - Defines utility functions for user input and random title selection
// - Lists categories and titles
// - Handles category selection
// - Manages the game setup and loop
// - Runs the main game loop with the option to play again

// ------------------------------------------------------------ import dependencies & other js file

import Shrugman from "./shrugman.js";
import readlineSync from "readline-sync";
import clear from "clear";
import chalk from "chalk";

// ------------------------------------------------------------ prompt user input

// Handles user input.

const prompt = (question) => readlineSync.question(question);

// ------------------------------------------------------------ random title choice

// Selects a random title from a list, ensuring variety in each game.

const getRandomTitle = (titles) => {
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
};

// ------------------------------------------------------------ 5 possible categories

//  Provides a collection of categories (movies, books, fictional characters, TV shows, songs) with associated titles, allowing players to choose a theme for the game.

const categories = {
  movies: [
    "The Matrix",
    "Titanic",
    "Pulp Fiction",
    "The Godfather",
    "The Shawshank Redemption",
    "Fight Club",
    "The Dark Knight",
    "Forrest Gump",
    "Inception",
    "Casablanca",
    "Jurassic Park",
    "Gladiator",
    "The Prestige",
    "The Lion King",
    "Avatar",
    "The Silence of the Lambs",
    "Braveheart",
    "Back to the Future",
  ],
  books: [
    "To Kill a Mockingbird",
    "The Great Gatsby",
    "Pride and Prejudice",
    "The Catcher in the Rye",
    "The Lord of the Rings",
    "The Hobbit",
    "The Chronicles of Narnia",
    "The Book Thief",
    "Brave New World",
    "Moby Dick",
    "The Road",
    "The Shining",
    "Little Women",
    "The Alchemist",
    "Gone with the Wind",
  ],
  fictionalCharacters: [
    "Harry Potter",
    "Sherlock Holmes",
    "Darth Vader",
    "Hannibal Lecter",
    "Frodo Baggins",
    "James Bond",
    "Spider Man",
    "Walter White",
    "Indiana Jones",
    "Batman",
    "Rick Grimes",
    "Superman",
    "Hermione Granger",
  ],
  tvShows: [
    "Breaking Bad",
    "Game of Thrones",
    "Stranger Things",
    "Friends",
    "The Office",
    "The Crown",
    "Sherlock",
    "The Simpsons",
    "Black Mirror",
    "The Walking Dead",
    "Narcos",
    "House of Cards",
    "Mad Men",
    "Lost",
    "Better Call Saul",
  ],
  songs: [
    "Bohemian Rhapsody",
    "Imagine",
    "Hotel California",
    "Sweet Child Of Mine",
    "Billie Jean",
    "Stairway to Heaven",
    "Hey Jude",
    "Like a Rolling Stone",
    "Let It Be",
    "I Will Always Love You",
    "Born to Run",
    "Superstition",
    "Piano Man",
    "I Want to Hold Your Hand",
    "Every Breath You Take",
    "Somebody to Love",
  ],
};

// ------------------------------------------------------------ choose category

// Prompts users to select a category by entering a number, ensuring valid input before proceeding.

const chooseCategory = () => {
  console.log(chalk.green.bold("\nChoose a category:"));
  console.log(chalk.green("   1. Movies"));
  console.log(chalk.green("   2. Books"));
  console.log(chalk.green("   3. Fictional Characters"));
  console.log(chalk.green("   4. TV Shows"));
  console.log(chalk.green("   5. Songs"));

  let categoryChoice;

  do {
    categoryChoice = parseInt(prompt("\nEnter the number of your choice: ")); // parseInt function ensures that 'categoryChoice' is a number (converting string into integer), which is then validated against the array [1, 2, 3, 4, 5]. This approach avoids issues that would arise from comparing a string directly to numbers.
  } while (![1, 2, 3, 4, 5].includes(categoryChoice));

  switch (categoryChoice) {
    case 1:
      return "movies";
    case 2:
      return "books";
    case 3:
      return "fictionalCharacters";
    case 4:
      return "tvShows";
    case 5:
      return "songs";
  }
};

// ------------------------------------------------------------ start game

// Initializes and runs a game session, including displaying rules, handling guesses, updating game state, and determining game outcomes.

const startGame = (category) => {
  clear();

  // Intro & rules
  const displayIntroAndRules = () => {
    console.log(chalk.blue.bold("Welcome to Shrugman!"));
    console.log(chalk.gray("\nRules of the Game:"));
    console.log(
      chalk.gray(
        "1. You will be given a title from a selected category with letters masked by underscores (_)."
      )
    );
    console.log(
      chalk.gray("2. Your task is to guess the letters in the title.")
    );
    console.log(
      chalk.gray(
        "3. Each incorrect guess will bring you one step closer to losing the game."
      )
    );
    console.log(chalk.gray("4. You can guess one letter at a time."));
    console.log(chalk.gray("\n============================================\n"));
  };

  // Display selected category during the game to keep user focused
  const displayCategory = () => {
    console.log(
      chalk.yellow.bold(
        `Category: ${
          category.charAt(0).toUpperCase() +
          category
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .trim()
        }\n`
      )
    );
  };

  displayIntroAndRules();
  displayCategory();

  const titleList = categories[category];
  const title = getRandomTitle(titleList);
  const game = new Shrugman(title);

  let message = ""; // Variable to hold invalid or repeated input messages

  // Main game loop
  while (true) {
    clear(); // Clear the console at the start of each turn

    // Display intro, rules, and game state
    displayIntroAndRules();
    displayCategory();
    game.displayGame();

    if (message) {
      console.log(message); // Display any message from the previous turn
    }

    // Prompt for user input
    const guess = prompt("Guess a letter: ").toLowerCase(); // Convert input to lowercase

    // Handle the result of the guess
    const result = game.makeGuess(guess);

    if (result === "Invalid input! Please enter a single letter.") {
      message = chalk.red("Invalid input. Please enter a single letter.");
    } else if (result === "Already guessed!") {
      message = chalk.yellow("You already guessed that letter.");
    } else if (result === "loss") {
      clear();
      displayIntroAndRules();
      displayCategory();
      game.displayGame();
      console.log(
        chalk.red.bold("Game Over! You lost.") +
          chalk.white(`\nThe title was: `) +
          chalk.blueBright.bold(title) +
          `\n`
      );
      break;
    } else if (result === "win") {
      clear();
      displayIntroAndRules();
      displayCategory();
      game.displayGame();
      console.log(chalk.green.bold("Congratulations! You won! 🎉\n"));
      break;
    } else {
      message = ""; // Clear the message if the input was valid
    }
  }
};

// ------------------------------------------------------------ main function to run the game

// Controls the overall game flow, including starting a new game, handling user decisions to play again, and managing game continuation.

const runGame = async () => {
  while (true) {
    const category = chooseCategory();
    startGame(category);

    let playAgain;

    // Loop until valid input is given
    do {
      playAgain = prompt("Do you want to play again? (yes/no): ").toLowerCase(); // Convert input to lowercase
    } while (playAgain !== "yes" && playAgain !== "no");

    if (playAgain === "no") {
      console.log(chalk.yellow.bold("See you next time! 👋"));
      break;
    }
    // If 'yes', start a new game
  }
};

// ------------------------------------------------------------ start the game

runGame();
