// Quiz Questions and Answers
const quizQuestions = [
    {
        question: "Humara first Kiss Kaha hua hai?",
        options: { a: "Tumhare Ghar mai", b: "Mere ghar mai", c: "Mamma ke ghar mai" },
        answer: "c" // You can change this to the correct answer for your girlfriend!
    },
    {
        question: "Pyaar hone se pehle kitna gussa aat tha mere pr jb hum arham ko maarte the😂"?",
        options: { a: "Thora sa", b: "Tabhi bhi pyaar krte the😂", c: "Bht gussa krte the" },
        answer: "a" // You can change this!
    },
    {
        question: "Sach batana Mohtarma app apne aap ko fit sirf mere liye rakhna chahti ho na😂?",
        options: { a: "HAAA😂", b: "HAAA😂", c: "Chup rahiye Aap😂😂" },
        answer: "b" // You can change this!
    },
    {
        question: "Mujse Icecream kyu nhi share krna chahti Apna😄?",
        options: { a: "Pura kha jaate h issilye😂", b: "Meri cheez mai kyu doon😄", c: "Aap bht gande hai😄" },
        answer: "c" // You can change this!
    }
];

// Function to show a specific section and hide others
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Confetti effect
function triggerConfetti() {
    const colors = ['#ffcc00', '#ff66b2', '#66ccff', '#99ff66', '#cc66ff']; // Festive colors
    for (let i = 0; i < 100; i++) { // Generate 100 confetti pieces
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Random color
        confetti.style.animationDelay = Math.random() * 2 + 's'; // Stagger animations
        confetti.style.transform = `scale(${Math.random() * 0.8 + 0.2})`; // Random size
    document.body.appendChild(confetti);

        // Remove confetti after animation to prevent DOM clutter
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

// Image slider logic (retained from previous version)
let slideIndex = 0;
const sliderImagesContainer = document.getElementById('imageSlider');
let images = []; // Will be populated on window.onload

function showSlides() {
    if (images.length === 0) return;
    if (slideIndex >= images.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = images.length - 1; }
    sliderImagesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
}

function changeSlide(n) {
    slideIndex += n;
    showSlides();
    resetAutoSlide();
}

let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Surprise button click -> go to quiz
    document.getElementById('surpriseButton').addEventListener('click', function() {
        triggerConfetti(); // Still trigger confetti on the birthday page
        setTimeout(() => { // Give a moment for confetti to show before transitioning
            showSection('quiz-section');
        }, 500);
    });

    // Quiz form submission
    document.getElementById('birthdayQuiz').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        let score = 0;
        const quizReviewDiv = document.getElementById('quiz-review');
        quizReviewDiv.innerHTML = '<h3 class="text-2xl font-bold text-purple-600 mb-4">Your Answers:</h3>'; // Clear previous content

        quizQuestions.forEach((q, index) => {
            const questionNumber = index + 1;
            const selectedOptionInput = document.querySelector(`input[name="q${questionNumber}"]:checked`);
            const selectedValue = selectedOptionInput ? selectedOptionInput.value : 'not answered';
            const selectedText = selectedOptionInput ? selectedOptionInput.nextElementSibling.textContent : 'Not Answered';
            const correctAnswerText = q.options[q.answer];

            if (selectedValue === q.answer) {
                score++;
            }

            // Append question review to the score card
            const questionReviewHtml = `
                <div class="mb-4 p-3 border-b border-gray-200 last:border-b-0">
                    <p class="font-semibold text-gray-800">${questionNumber}. ${q.question}</p>
                    <p class="text-gray-700 ml-4">Your Answer: <span class="${selectedValue === q.answer ? 'text-green-600' : 'text-red-600'} font-medium">${selectedText}</span></p>
                    <p class="text-gray-700 ml-4">Correct Answer: <span class="text-blue-600 font-medium">${correctAnswerText}</span></p>
                </div>
            `;
            quizReviewDiv.insertAdjacentHTML('beforeend', questionReviewHtml);
        });

        document.getElementById('quiz-score').textContent = `Your Score: ${score}/${quizQuestions.length}`;
        showSection('score-card-section');
        triggerConfetti(); // Trigger confetti again on score card
    });

    // Back to birthday message button
    document.getElementById('backToBirthdayButton').addEventListener('click', function() {
        showSection('birthday-message-section');
        resetAutoSlide(); // Restart auto-slide if going back
    });

    // Initialize on window load
    const today = new Date();
    const birthdayMonth = 6; // July is 6 (0-indexed)
    const birthdayDay = 20;
    const birthdayYear = 2025; // Specific year for the birthday

    if (today.getMonth() === birthdayMonth &&
        today.getDate() === birthdayDay &&
        today.getFullYear() === birthdayYear) {
        document.getElementById('special-date-message').classList.remove('hidden');
    }

    // Initialize the slider after images are loaded
    images = document.querySelectorAll('#imageSlider img');
    if (images.length > 0) {
        showSlides(); // Display the first slide
        startAutoSlide(); // Start automatic slideshow
    }
});
