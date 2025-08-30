let currentQuestion = 0;
let answers = [];

const questionText = document.getElementById("question-text");
const slider = document.getElementById("answer-slider");
const likertDiv = document.getElementById("likert-input");
const genderDiv = document.getElementById("gender-input");
const ageDiv = document.getElementById("age-input");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");

function loadQuestion() {
    if (currentQuestion < questions.length) {
        let q = questions[currentQuestion];
        questionText.innerText = q.name;

        // hide all input types first
        likertDiv.classList.add("hidden");
        genderDiv.classList.add("hidden");
        ageDiv.classList.add("hidden");

        if (q.type === "likert") {
            likertDiv.classList.remove("hidden");
        } else if (q.type === "gender") {
            genderDiv.classList.remove("hidden");
        } else if (q.type === "age") {
            ageDiv.classList.remove("hidden");
        }
    } else {
        submitAnswers();
    }
}

document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        answers.push(btn.dataset.value);
        currentQuestion++;
        loadQuestion();
    });
});

nextBtn.addEventListener("click", () => {
    let q = questions[currentQuestion];

    if (q.type === "likert") {
        answers.push(parseInt(slider.value));
    } else if (q.type === "age") {
        let val = document.getElementById("age-field").value;
        if (!val) return alert("Please enter age");
        answers.push(parseInt(val));
    }
    currentQuestion++;
    loadQuestion();
});

function submitAnswers() {
    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answers })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("question-box").classList.add("hidden");
        resultBox.classList.remove("hidden");
        resultBox.style.backgroundColor = data.color;
        resultBox.innerHTML = `${data.emoji} ${data.prediction}`;
    })
    .catch(err => console.error(err));
}

loadQuestion();

// Background music toggle
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
music.volume = 0.2;
musicToggle.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicToggle.textContent = "🔊";
    } else {
        music.pause();
        musicToggle.textContent = "🔇";
    }
});
