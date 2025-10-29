const textInput = document.getElementById('textInput');
const excludeSpaces = document.getElementById('excludeSpaces');
const totalCharacters = document.getElementById('totalCharacters');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const readingTime = document.getElementById('readingTime');
const letterDensity = document.getElementById('letterDensity');

// Small fade animation helper
function animateNumber(element, newValue) {
  element.classList.add('scale-110', 'transition-transform', 'duration-200');
  setTimeout(() => {
    element.textContent = newValue.toString().padStart(2, '0');
    element.classList.remove('scale-110');
  }, 150);
}

textInput.addEventListener('input', updateAnalysis);
excludeSpaces.addEventListener('change', updateAnalysis);

function updateAnalysis() {
  const text = textInput.value;
  const textWithoutSpaces = text.replace(/\s+/g, '');
  const characters = excludeSpaces.checked ? textWithoutSpaces.length : text.length;
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  const readingMinutes = Math.ceil(words / 200);

  animateNumber(totalCharacters, characters);
  animateNumber(wordCount, words);
  animateNumber(sentenceCount, sentences);

  readingTime.textContent = `Approx. reading time: ${readingMinutes} minute${readingMinutes !== 1 ? 's' : ''}`;

  // Show letter density
  if (characters > 0) {
    const letterCounts = {};
    for (const char of textWithoutSpaces) {
      letterCounts[char] = (letterCounts[char] || 0) + 1;
    }

    const density = Object.entries(letterCounts)
      .map(([char, count]) => `<span class="text-purple-300">${char}</span>: ${count}`)
      .join(', ');
    letterDensity.innerHTML = density;
    letterDensity.classList.remove('opacity-0');
    letterDensity.classList.add('opacity-100');
  } else {
    letterDensity.innerHTML = 'No characters found. Start typing to see letter density.';
    letterDensity.classList.add('opacity-0');
  }
}
