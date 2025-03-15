const textInput = document.getElementById('textInput');
const excludeSpaces = document.getElementById('excludeSpaces');
const totalCharacters = document.getElementById('totalCharacters');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const readingTime = document.getElementById('readingTime');
const letterDensity = document.getElementById('letterDensity');

textInput.addEventListener('input', updateAnalysis);

function updateAnalysis() {
    const text = textInput.value;
    const textWithoutSpaces = text.replace(/\s+/g, '');
    const characters = excludeSpaces.checked ? textWithoutSpaces.length : text.length;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const readingMinutes = Math.ceil(words / 200);

    totalCharacters.textContent = characters.toString().padStart(2, '0');
    wordCount.textContent = words.toString().padStart(2, '0');
    sentenceCount.textContent = sentences.toString().padStart(2, '0');
    readingTime.textContent = `Approx. reading time: ${readingMinutes} minute${readingMinutes !== 1 ? 's' : ''}`;

    if (characters > 0) {
        const letterCounts = {};
        for (const char of textWithoutSpaces) {
            letterCounts[char] = (letterCounts[char] || 0) + 1;
        }
        const density = Object.entries(letterCounts)
            .map(([char, count]) => `${char}: ${count}`)
            .join(', ');
        letterDensity.textContent = density;
    } else {
        letterDensity.textContent = 'No characters found. Start typing to see letter density.';
    }
}