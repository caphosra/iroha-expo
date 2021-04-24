let jokes = [
    "30 Devices Run Maccha"
];

/**
 * Select a random joke of Maccha.
 */
export function getRandomJoke(): string {
    let random = Math.floor(Math.random() * Math.floor(jokes.length));
    return jokes[random];
}
