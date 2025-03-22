const startBtn = document.getElementById("start-btn");
const questionArea = document.getElementById("question-area");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const introEl = document.getElementById("intro");

// Mảng chứa các câu hỏi và đáp án
const questions = [
  {
    type: 1, // Loại câu hỏi: Định nghĩa và biểu diễn tập hợp
    text: "Cho tập hợp A = {x | x là số tự nhiên chẵn, x < 10}.  Hãy biểu diễn tập hợp A bằng cách liệt kê các phần tử.",
    options: [
      "{0, 2, 4, 6, 8}",
      "{2, 4, 6, 8}",
      "{0, 2, 4, 6, 8, 10}",
      "{1, 3, 5, 7, 9}",
    ],
    answer: 0, // Chỉ số của đáp án đúng trong mảng options
  },
  {
    type: 1,
    text: "Tập hợp B gồm các chữ cái trong từ 'TOÁN HỌC'.  Cách viết nào sau đây đúng?",
    options: [
      "B = {T, O, A, N, H, O, C}",
      "B = {T, O, Á, N, H, C}",
      "B = {T, O, A, N, H, O, C}",
      "B = {T, O, A, N, H, C}",
    ],
    answer: 3,
  },
  {
    type: 2, // Loại câu hỏi:  Phép toán trên tập hợp
    text: "Cho A = {1, 2, 3, 4}, B = {3, 4, 5, 6}.  Tập hợp A ∪ B (A hợp B) là:",
    options: ["{3, 4}", "{1, 2, 5, 6}", "{1, 2, 3, 4, 5, 6}", "{5, 6}"],
    answer: 2,
  },
  {
    type: 2,
    text: "Cho A = {1, 2, 3, 4}, B = {3, 4, 5, 6}. Tập hợp A ∩ B (A giao B) là:",
    options: ["{1, 2}", "{3, 4}", "{1, 2, 3, 4, 5, 6}", "{5,6}"],
    answer: 1,
  },
  {
    type: 2,
    text: "Cho A = {1, 2, 3, 4}, B = {3, 4, 5, 6}.  Tập hợp A \\ B (A trừ B) là:",
    options: ["{1, 2}", "{3, 4}", "{5, 6}", "{1, 2, 3, 4}"],
    answer: 0,
  },
  {
    type: 2,
    text: "Cho A = {0,1,2,3,4}, B={2,3,7}. B\\A bằng:",
    options: ["{7}", "{0,1,4}", "{2,3}", "{0,1,2,3,4,7}"],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

// Hàm hiển thị câu hỏi
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.text;
  optionsEl.innerHTML = ""; // Xóa các lựa chọn cũ

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add(
      "bg-gray-200",
      "hover:bg-gray-300",
      "py-2",
      "px-4",
      "rounded"
    );
    button.addEventListener("click", () => checkAnswer(index));
    optionsEl.appendChild(button);
  });
}

// Hàm kiểm tra đáp án
function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.answer) {
    feedbackEl.textContent = "Chính xác!";
    feedbackEl.classList.add("text-green-500");
    feedbackEl.classList.remove("text-red-500");
    score++;
  } else {
    feedbackEl.textContent = `Sai rồi. Đáp án đúng là: ${
      currentQuestion.options[currentQuestion.answer]
    }`;
    feedbackEl.classList.add("text-red-500");
    feedbackEl.classList.remove("text-green-500");
  }

  // Vô hiệu hóa các nút chọn sau khi trả lời
  const optionButtons = optionsEl.querySelectorAll("button");
  optionButtons.forEach((button) => (button.disabled = true));

  nextBtn.classList.remove("hidden"); // Hiện nút "Câu tiếp theo"
}

function showResult() {
  questionArea.classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.textContent = `Bạn đã trả lời đúng ${score} / ${questions.length} câu hỏi.`;
}

// Sự kiện click nút "Bắt đầu"
startBtn.addEventListener("click", () => {
  introEl.classList.add("hidden");
  questionArea.classList.remove("hidden");
  displayQuestion();
});

// Sự kiện click nút "Câu tiếp theo"
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    feedbackEl.textContent = ""; // Xóa phản hồi
    nextBtn.classList.add("hidden"); // Ẩn nút "Câu tiếp theo"
  } else {
    showResult();
  }
});
