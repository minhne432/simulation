// Dữ liệu mặc định cho các phân tử
const moleculeData = {
  H2O: { angle: 104.5, bondLength: 0.96 },
  CO2: { angle: 180, bondLength: 1.16 },
  NH3: { angle: 107, bondLength: 1.01 },
  CH4: { angle: 109.5, bondLength: 1.09 },
};

let currentMolecule = "H2O";
let angle = moleculeData[currentMolecule].angle;
let bondLength = moleculeData[currentMolecule].bondLength;
const scale = 100;

// Các biến số cho hiệu ứng dao động
let angleOffset = 0; // Độ lệch góc dao động
let bondLengthOffset = 0; // Độ lệch độ dài liên kết dao động
let oscillationSpeed = 0.02; // Tốc độ dao động, có thể điều chỉnh
let angleAmplitude = 2; // Biên độ dao động góc, có thể điều chỉnh
let bondLengthAmplitude = 0.02; // Biên độ dao động độ dài liên kết, có thể điều chỉnh

function setup() {
  let canvas = createCanvas(400, 300);
  canvas.parent("canvas-container");
  angleMode(DEGREES);
  updateDisplay(); // Xử lý thay đổi phân tử từ dropdown

  document
    .getElementById("molecule-select")
    .addEventListener("change", function () {
      currentMolecule = this.value; // Cập nhật các tham số theo dữ liệu mặc định của phân tử được chọn
      angle = moleculeData[currentMolecule].angle;
      bondLength = moleculeData[currentMolecule].bondLength; // Cập nhật giá trị cho các slider
      document.getElementById("angle-slider").value = angle;
      document.getElementById("bond-length-slider").value = bondLength;
      updateDisplay();
      redraw();
    });
}

function draw() {
  // Cập nhật hiệu ứng dao động trước mỗi khung hình
  updateOscillation();
  drawMolecule();
}

function updateOscillation() {
  // Dao động góc - sử dụng hàm sin để tạo hiệu ứng mượt mà
  angleOffset = sin(frameCount * oscillationSpeed) * angleAmplitude; // Dao động độ dài liên kết - tương tự, nhưng biên độ nhỏ hơn
  bondLengthOffset =
    sin(frameCount * oscillationSpeed * 1.5) * bondLengthAmplitude; // Tốc độ có thể khác một chút // **Lưu ý:** Bạn có thể tùy chỉnh `oscillationSpeed`, `angleAmplitude`, và `bondLengthAmplitude` để thay đổi tốc độ và biên độ dao động.
}

function drawMolecule() {
  background(233);
  translate(width / 2, height / 2); // Gọi hàm vẽ phù hợp dựa theo loại phân tử

  switch (currentMolecule) {
    case "H2O":
      drawH2O();
      break;
    case "CO2":
      drawCO2();
      break;
    case "NH3":
      drawNH3();
      break;
    case "CH4":
      drawCH4();
      break;
    default:
      drawH2O();
  }
}

// Vẽ phân tử H2O
function drawH2O() {
  // Vẽ nguyên tử O (màu đỏ)
  fill(255, 0, 0);
  ellipse(0, 0, 40, 40); // Tính toán vị trí của hai nguyên tử H - Áp dụng độ lệch góc dao động

  let h1x =
    (bondLength + bondLengthOffset) * scale * cos((angle + angleOffset) / 2);
  let h1y =
    (bondLength + bondLengthOffset) * scale * sin((angle + angleOffset) / 2);
  let h2x =
    (bondLength + bondLengthOffset) * scale * cos((angle + angleOffset) / 2);
  let h2y =
    -(bondLength + bondLengthOffset) * scale * sin((angle + angleOffset) / 2); // Vẽ liên kết O-H

  stroke(0);
  strokeWeight(3);
  line(0, 0, h1x, h1y);
  line(0, 0, h2x, h2y); // Vẽ nguyên tử H (màu xanh)

  fill(0, 0, 255);
  ellipse(h1x, h1y, 20, 20);
  ellipse(h2x, h2y, 20, 20); // Nhãn

  fill(255);
  textSize(16);
  text("O", -8, 10);
  textSize(12);
  text("H", h1x - 6, h1y + 4);
  text("H", h2x - 6, h2y + 4);
}

// Vẽ phân tử CO2 (dạng thẳng)
function drawCO2() {
  // Vẽ nguyên tử Carbon ở giữa (màu xanh lá)
  fill(0, 255, 0);
  ellipse(0, 0, 40, 40); // Vẽ liên kết: hai nguyên tử Oxygen về hai bên - Áp dụng độ lệch độ dài liên kết dao động

  let ox = (bondLength + bondLengthOffset) * scale;
  stroke(0);
  strokeWeight(3);
  line(0, 0, ox, 0);
  line(0, 0, -ox, 0); // Vẽ nguyên tử Oxygen (màu đỏ)

  fill(255, 0, 0);
  ellipse(ox, 0, 30, 30);
  ellipse(-ox, 0, 30, 30); // Nhãn

  fill(255);
  textSize(16);
  text("C", -8, 10);
  textSize(12);
  text("O", ox - 6, 4);
  text("O", -ox - 6, 4);
}

// Vẽ phân tử NH3 (dạng chóp tam giác)
function drawNH3() {
  // Vẽ nguyên tử Nitrogen ở giữa (màu tím)
  fill(128, 0, 128);
  ellipse(0, 0, 40, 40); // Tính vị trí các nguyên tử Hydrogen - Áp dụng độ lệch góc dao động // Ở đây, ta đặt một H ở phía trên và 2 H đối xứng bên trái, bên phải với góc lệch là angle/2 từ trục đứng.

  let r = (bondLength + bondLengthOffset) * scale;
  let hTopX = r * cos(90);
  let hTopY = r * sin(90);
  let hLeftX = r * cos(90 + (angle + angleOffset) / 2);
  let hLeftY = r * sin(90 + (angle + angleOffset) / 2);
  let hRightX = r * cos(90 - (angle + angleOffset) / 2);
  let hRightY = r * sin(90 - (angle + angleOffset) / 2);

  stroke(0);
  strokeWeight(3);
  line(0, 0, hTopX, hTopY);
  line(0, 0, hLeftX, hLeftY);
  line(0, 0, hRightX, hRightY);

  fill(0, 0, 255);
  ellipse(hTopX, hTopY, 20, 20);
  ellipse(hLeftX, hLeftY, 20, 20);
  ellipse(hRightX, hRightY, 20, 20); // Nhãn

  fill(255);
  textSize(16);
  text("N", -8, 10);
  textSize(12);
  text("H", hTopX - 6, hTopY + 4);
  text("H", hLeftX - 6, hLeftY + 4);
  text("H", hRightX - 6, hRightY + 4);
}

// Vẽ phân tử CH4 (dạng tứ diện chiếu 2D, minh họa bằng cách sắp xếp 4 H xung quanh C)
function drawCH4() {
  // Vẽ nguyên tử Carbon ở giữa (màu xanh lam nhạt)
  fill(0, 255, 255);
  ellipse(0, 0, 40, 40);

  let r = (bondLength + bondLengthOffset) * scale; // Đặt 4 nguyên tử Hydrogen theo 4 hướng: trên, dưới, trái, phải. - Áp dụng độ lệch độ dài liên kết dao động
  let hTopX = r * cos(90);
  let hTopY = r * sin(90);
  let hBottomX = r * cos(270);
  let hBottomY = r * sin(270);
  let hLeftX = r * cos(180);
  let hLeftY = r * sin(180);
  let hRightX = r * cos(0);
  let hRightY = r * sin(0);

  stroke(0);
  strokeWeight(3);
  line(0, 0, hTopX, hTopY);
  line(0, 0, hBottomX, hBottomY);
  line(0, 0, hLeftX, hLeftY);
  line(0, 0, hRightX, hRightY);

  fill(0, 0, 255);
  ellipse(hTopX, hTopY, 20, 20);
  ellipse(hBottomX, hBottomY, 20, 20);
  ellipse(hLeftX, hLeftY, 20, 20);
  ellipse(hRightX, hRightY, 20, 20); // Nhãn

  fill(255);
  textSize(16);
  text("C", -8, 10);
  textSize(12);
  text("H", hTopX - 6, hTopY + 4);
  text("H", hBottomX - 6, hBottomY + 4);
  text("H", hLeftX - 6, hLeftY + 4);
  text("H", hRightX - 6, hRightY + 4);
}

// Cập nhật hiển thị giá trị của các slider
function updateDisplay() {
  document.getElementById("angle-value").textContent = angle.toFixed(1) + "°";
  document.getElementById("bond-length-value").textContent =
    bondLength.toFixed(2) + " Å";
}

// Sự kiện thay đổi giá trị slider (chỉ áp dụng cho các phân tử mà cấu trúc có thể điều chỉnh)
document.getElementById("angle-slider").addEventListener("input", function () {
  angle = parseFloat(this.value);
  updateDisplay();
  redraw();
});

document
  .getElementById("bond-length-slider")
  .addEventListener("input", function () {
    bondLength = parseFloat(this.value);
    updateDisplay();
    redraw();
  });

// Nút Reset: đặt lại theo dữ liệu mặc định của phân tử hiện tại
document.getElementById("reset-button").addEventListener("click", function () {
  angle = moleculeData[currentMolecule].angle;
  bondLength = moleculeData[currentMolecule].bondLength;
  document.getElementById("angle-slider").value = angle;
  document.getElementById("bond-length-slider").value = bondLength;
  updateDisplay();
  redraw();
});
