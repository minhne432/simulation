// Danh sách câu hỏi
// Thêm thuộc tính "explanation" để giải thích khi sai
const questions = [
  {
    question: "She ___ to school every day. (go)",
    answer: "goes",
    explanation:
      "Với chủ ngữ 'she', động từ 'go' cần thêm 'es' -> goes. Đây là quy tắc chia thì hiện tại đơn.",
  },
  {
    question: "I ___ football on Sundays. (play)",
    answer: "play",
    explanation:
      "Với chủ ngữ 'I', động từ 'play' giữ nguyên. Vì ‘I’, ‘you’, ‘we’, ‘they’ dùng động từ nguyên mẫu.",
  },
  {
    question: "He ___ a car. (have)",
    answer: "has",
    explanation:
      "Chủ ngữ 'He' (ngôi thứ ba số ít) cần dùng 'has' thay vì 'have'.",
  },
  {
    question: "They ___ at home on weekends. (stay)",
    answer: "stay",
    explanation:
      "Với chủ ngữ 'They' (số nhiều), động từ ‘stay’ không thêm 's' hoặc 'es'.",
  },
];

// Chỉ số câu hỏi hiện tại
let currentQuestionIndex = 0;
// Điểm số
let score = 0;

// Mảng để lưu các câu sai
let wrongAnswers = [];

// Tải câu hỏi đầu tiên
window.onload = loadQuestion;

// Hàm load câu hỏi
function loadQuestion() {
  const questionElement = document.getElementById("question");
  questionElement.textContent = questions[currentQuestionIndex].question;
}

// Kiểm tra câu trả lời
function checkAnswer() {
  const userAnswer = document
    .getElementById("answer")
    .value.trim()
    .toLowerCase();
  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
  const feedbackElement = document.getElementById("feedback");

  // Xử lý phản hồi
  if (userAnswer === correctAnswer) {
    // Correct
    feedbackElement.textContent = "✅ Correct!";
    feedbackElement.classList.remove("text-red-500");
    feedbackElement.classList.add("text-green-500");

    // Phát âm thanh đúng
    document.getElementById("correct-sound").play();

    // Tính điểm
    score += 10;
  } else {
    // Wrong
    feedbackElement.textContent = `❌ Wrong! Correct answer: ${correctAnswer}`;
    feedbackElement.classList.remove("text-green-500");
    feedbackElement.classList.add("text-red-500");

    // Phát âm thanh sai
    document.getElementById("wrong-sound").play();

    // Tính điểm
    score -= 5;

    // Lưu lại câu sai kèm giải thích
    wrongAnswers.push({
      question: questions[currentQuestionIndex].question,
      userAnswer: userAnswer,
      correctAnswer: correctAnswer,
      explanation: questions[currentQuestionIndex].explanation,
    });
  }

  // Cập nhật điểm hiển thị
  document.getElementById("score").textContent = `Score: ${score}`;

  // Chuyển sang câu tiếp theo sau 1 giây
  nextQuestion();
}

function nextQuestion() {
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      document.getElementById("feedback").textContent = "";
      document.getElementById("answer").value = "";
    } else {
      finishGame();
    }
  }, 1000);
}

// Kết thúc trò chơi
function finishGame() {
  // Ẩn nội dung câu hỏi
  document.getElementById("question-container").innerHTML =
    "<p class='text-lg font-bold'>🎉 You've completed the game!</p>";
  document.getElementById("answer").style.display = "none";
  document.querySelector("button").style.display = "none";

  // Hiển thị phần review các câu sai, nếu có
  const reviewContainer = document.getElementById("review-container");
  reviewContainer.classList.remove("hidden");

  // Nếu người chơi sai câu nào, show chi tiết
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = "";

  if (wrongAnswers.length === 0) {
    // Không sai câu nào
    reviewList.innerHTML = "<li>Perfect! No mistakes.</li>";
  } else {
    // Liệt kê các câu sai
    wrongAnswers.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("mb-2");
      li.innerHTML = `
        <strong>Question:</strong> ${item.question} <br/>
        <strong>Your answer:</strong> ${item.userAnswer} <br/>
        <strong>Correct answer:</strong> ${item.correctAnswer} <br/>
        <em>${item.explanation}</em>
      `;
      reviewList.appendChild(li);
    });
  }
}

// Toggle dark/light theme
document.getElementById("theme-toggle").addEventListener("click", () => {
  // Lấy thẻ html
  const htmlEl = document.documentElement;

  // Nếu đang dark thì chuyển sang light, ngược lại thì chuyển lại dark
  // Tailwind dark mode sử dụng class 'dark' trên <html> (hoặc <body>)
  if (htmlEl.classList.contains("dark")) {
    htmlEl.classList.remove("dark");
  } else {
    htmlEl.classList.add("dark");
  }
});
