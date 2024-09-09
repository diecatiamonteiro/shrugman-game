// 'SHRUGMAN' GAME  =>  shrugman.js

// Goal of this file:
// --> It defines the 'Shrugman' class, which tracks the movie title, masked title, guessed letters, and wrong guesses, and determines the game's progress and outcome.
// --> To manage the core game logic and state.

// Summary:
// -Shrugman class: Manages the state and logic of the game. Includes everything in this file - displayGame(), makeGuess(), updateMaskedTitle(), isGameOver():

// --- Constructor: Initializes game variables, including movie title, masked title, guessed letters, and wrong guesses.
// --- displayGame(): Shows the current game state, including the masked title, guessed letters, and the shrugman emoji.
// --- makeGuess(letter): Processes a player's letter guess, updates game state, and checks game status.
// --- updateMaskedTitle(letter): Reveals correctly guessed letters in the masked title (letter instead of _).
// --- isGameOver(): Determines if the game is over (win, loss, or ongoing) and returns the result.

import chalk from "chalk";

// ------------------------------------------------------------ class shrugman

// This class defines the structure and behavior of the game. It allows us to manage and control the game logic, including initializing the game, processing guesses, and displaying game status. It also allow us to create multiple game instances.

export default class Shrugman {
  constructor(movieTitle) {
    this.movieTitle = movieTitle.toLowerCase(); // Stores the original movie title in lowercase
    this.maskedTitle = movieTitle.replace(/[a-zA-Z]/g, "_"); // Replace movie title letters by underscores
    this.guessedLetters = []; // An array to track letters the player has guessed
    this.wrongGuesses = 0; // A counter to track incorrect guesses
    this.shrugmanStages = [
      "", // 0 wrong guesses
      "¯", // 1 wrong guess
      "¯\\", // 2 wrong guesses
      "¯\\_", // 3 wrong guesses
      "¯\\_(", // 4 wrong guesses
      "¯\\_(ツ", // 5 wrong guesses
      "¯\\_(ツ)_", // 6 wrong guesses
      "¯\\_(ツ)_/", // 7 wrong guesses
      "¯\\_(ツ)_/¯", // 8 wrong guesses
      "¯\\_(ツ)_/¯", // 9 wrong guesses (full emoji)
    ]; // An array that represent the number of wrong guesses
  }

  // ------------------------------------------------------------ class method displayGame()

  // Displays the current game state, including the masked title with spaces, guessed letters, and the shrugman emoji representing the number of wrong guesses.

  displayGame() {
    const formattedMaskedTitle = this.maskedTitle
      .split("")
      .map((char) => (char === "_" ? "_ " : char + " "))
      .join(""); // Add spaces between characters in the maskedTitle

    const formattedMaskedTitleWithSpaces = formattedMaskedTitle.replace(
      / {2,}/g,
      "   "
    ); // Replace multiple spaces with triple spaces

    console.log(
      chalk.blueBright.bold("\n", formattedMaskedTitleWithSpaces.trim())
    );
    // console.log(this.shrugmanStages[this.wrongGuesses]);
    console.log(`\nGuessed Letters: ${this.guessedLetters.join(", ")}`);
    console.log(
      chalk.bold.redBright(`\n${this.shrugmanStages[this.wrongGuesses]}\n`)
    );
  }

  // ------------------------------------------------------------ class method makeGuess()

  // Processes the player's letter guess, updates the game state (masked title and wrong guesses), and determines if the game is won, lost, or still ongoing.

  makeGuess(letter) {
    letter = letter.toLowerCase();

    // Check if input is valid (single letter from A-Z)
    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
      return "Invalid input! Please enter a single letter.";
    }

    // Check if letter has already been guessed
    if (this.guessedLetters.includes(letter)) {
      return "Already guessed!";
    }

    // Add guessed letter to the guessedLetters array
    this.guessedLetters.push(letter);

    // If the guessed letter is in the movie title, update the masked title
    if (this.movieTitle.includes(letter)) {
      this.updateMaskedTitle(letter);
    } else {
      // Otherwise, increment wrong guesses counter
      this.wrongGuesses++;
    }

    // Check if the game is over and return the result (win, loss, or ongoing)
    return this.isGameOver();
  }

  // ------------------------------------------------------------ class method updateMaskedTitle()

  // Reveals correctly guessed letters in the masked title, updating it based on the latest guess.

  updateMaskedTitle(letter) {
    let updatedTitle = "";

    for (let i = 0; i < this.movieTitle.length; i++) {
      updatedTitle +=
        this.movieTitle[i] === letter ? letter : this.maskedTitle[i];
    }

    this.maskedTitle = updatedTitle; // Update the masked title
  }

  // ------------------------------------------------------------ class method isGameOver()

  // Checks if the game has ended, returning the result as "win", "loss", or "ongoing" based on the game state and number of wrong guesses.

  isGameOver() {
    if (this.wrongGuesses >= this.shrugmanStages.length - 1) {
      return "loss"; // Game lost if wrong guesses reach the maximum
    }

    return this.maskedTitle.includes("_") ? "ongoing" : "win"; // Game won if no underscores are left, ongoing otherwise
  }
}
