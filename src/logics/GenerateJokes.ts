let jokes = [
    "30 Devices Run Iroha"
];

/**
 * Select a random joke of Iroha.
 */
export function getRandomJoke(): string {
    let random = Math.floor(Math.random() * Math.floor(jokes.length));
    return jokes[random];
}
