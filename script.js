const toolBox = document.querySelector(".toolbox");
const tabs = document.querySelectorAll(".tab");
let undobutton = document.querySelector(".undo-icon");
let logoInput = document.getElementById("logoInput").value;
let titleInput = document.getElementById("titleInput").value;
let dateInput = document.getElementById("dateInput").value;
let color = "blue";
let restore_array = [];
let index = -1;
let canvasCount = 1;
let start_pos = { x: 0, y: 0 };
const downloadBtn = document.querySelector(".downloadBtn");
const downloadPDF = document.querySelector(".downloadPDF");

let textareaInput = document.getElementById("textareaInput").value;

var radialGrad = i2d.canvasLayer(null, {}, { enableResize: false });
radialGrad.setPixelRatio(1);
radialGrad.setSize(100,100);
var LinearGrad1 = i2d.canvasLayer(null, {}, { enableResize: false });
LinearGrad1.setPixelRatio(1);
LinearGrad1.setSize(256, 1);
var LinearGrad2 = i2d.canvasLayer(null, {}, { enableResize: false });
LinearGrad2.setPixelRatio(1);
LinearGrad2.setSize(256, 1);
var LinearGrad3 = i2d.canvasLayer(null, {}, { enableResize: false });
LinearGrad3.setPixelRatio(1);
LinearGrad3.setSize(256, 1);
var LinearGrad4 = i2d.canvasLayer(null, {}, { enableResize: false });
LinearGrad4.setPixelRatio(1);
LinearGrad4.setSize(256, 1);

var globalRenderer;
var globalShadowCanvas;

function setRender() {
  var renderer = i2d.canvasLayer("#myCanvas", {}, { enableResize: false });
  // console.log(renderer.height, renderer.width)
  renderer.setPixelRatio(1);
  var shadowCanvas = i2d.canvasLayer(null, {}, { enableResize: false });
  shadowCanvas.setPixelRatio(1);
  shadowCanvas.setSize(renderer.width, renderer.height);

  globalRenderer = renderer;
  globalShadowCanvas = shadowCanvas;
}

setRender();

let isDrawing = false;
let mode;
let drawable = true;

var squareOrigin = [];
var circleOrigin = [];
let squarecheck = 0;
let circlecheck = 0;

var radialGradiant = radialGrad.createRadialGradient({
  innerCircle: { x: 50, y: 50, r: 0 },
  outerCircle: { x: 50, y: 50, r: 50 },
  mode: "percent",
  colorStops: [
    { color: "rgba(0, 0, 0, 0.05)", value: 0 },
    { color: "rgba(0, 0, 0, 0)", value: 100 },
  ],
});

var linearGradiant1 = LinearGrad1.createLinearGradient({
  x1: 0,
  y1: 0,
  x2: 255,
  y2: 0,
  mode: "absolute",
  colorStops: [
    { color: "rgba(0, 0, 50, 1)", value: 0 },
    { color: "rgba(0, 0, 100, 1)", value: 0.25 },
    { color: "rgba(0, 0, 150, 1)", value: 0.5 },
    { color: "rgba(0, 0, 200, 1)", value: 0.75 },
    { color: "rgba(0, 0, 250, 1)", value: 1 },
  ],
});

var linearGradiant2 = LinearGrad2.createLinearGradient({
  x1: 0,
  y1: 0,
  x2: 255,
  y2: 0,
  mode: "absolute",
  colorStops: [
    { color: "rgba(0, 50, 0, 1)", value: 0 },
    { color: "rgba(0, 100, 0, 1)", value: 0.25 },
    { color: "rgba(0, 150, 0, 1)", value: 0.5 },
    { color: "rgba(0, 200, 0, 1)", value: 0.75 },
    { color: "rgba(0, 250, 0, 1)", value: 1 },
  ],
});

var linearGradiant3 = LinearGrad3.createLinearGradient({
  x1: 0,
  y1: 0,
  x2: 255,
  y2: 0,
  mode: "absolute",
  colorStops: [
    { color: "rgba(100, 0, 0, 1)", value: 0 },
    { color: "rgba(140, 0, 0, 1)", value: 0.25 },
    { color: "rgba(180, 0, 0, 1)", value: 0.5 },
    { color: "rgba(220, 0, 0, 1)", value: 0.75 },
    { color: "rgba(255, 0, 0, 1)", value: 1 },
  ],
});

var linearGradiant4 = LinearGrad4.createLinearGradient({
  x1: 0,
  y1: 0,
  x2: 255,
  y2: 0,
  mode: "absolute",
  colorStops: [
    { color: "rgba(50, 50, 0, 1)", value: 0 },
    { color: "rgba(100, 100, 0, 1)", value: 0.25 },
    { color: "rgba(150, 150, 0, 1)", value: 0.5 },
    { color: "rgba(200, 200, 0, 1)", value: 0.75 },
    { color: "rgba(250, 250, 0, 1)", value: 1 },
  ],
});

LinearGrad1.createEl({
  el: "rect",
  attr: {
    x: 0,
    y: 0,
    width: 256,
    height: 1,
  },
  style: {
    fillStyle: linearGradiant1,
  },
});
LinearGrad2.createEl({
  el: "rect",
  attr: {
    x: 0,
    y: 0,
    width: 256,
    height: 1,
  },
  style: {
    fillStyle: linearGradiant2,
  },
});
LinearGrad3.createEl({
  el: "rect",
  attr: {
    x: 0,
    y: 0,
    width: 256,
    height: 1,
  },
  style: {
    fillStyle: linearGradiant3,
  },
});
LinearGrad4.createEl({
  el: "rect",
  attr: {
    x: 0,
    y: 0,
    width: 256,
    height: 1,
  },
  style: {
    fillStyle: linearGradiant4,
  },
});

radialGrad.createEl({
  el: "circle",
  attr: {
    r: 50,
    cx: 50,
    cy: 50,
  },
  style: {
    fillStyle: radialGradiant,
  },
});

downloadPDF.addEventListener('click', function exportpdf() {
    let titleInput = document.getElementById("titleInput").value;
    let dateInput = document.getElementById("dateInput").value;
    let textareaInput = document.getElementById("textareaInput").value;
    
    // Get the logo file
    let logoInput = document.getElementById("logoInput");
    let logoFile = logoInput.files[0];
    if (logoFile instanceof Blob) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var logoDataURL = event.target.result;
            var docDefinition = {
                content: [
                    {
                        text: 'Input Info',
                        fontSize: 20,
                        margin: [0, 0, 0, 10]
                    },
                    {
                        image: logoDataURL,
                        width: 50,
                        height: 50
                    },
                    {
                        text: 'title: ' + titleInput,
                        fontSize: 14
                    },
                    {
                        text: 'date: ' + dateInput,
                        fontSize: 14
                    },
                    {
                        text: 'textarea: ' + textareaInput,
                        fontSize: 14
                    },
                    {
                        image: 'added',
                        width: 500,
                        height: 263,
                        alignment: 'center',
                        margin: [0, 20, 0, 0]
                    },
                    {
                        image: globalRenderer.toDataURL(),
                        width: 500,
                        height: 263,
                        alignment: 'center',
                        margin: [-500, -263, 0, 0]
                    }
                ],
                images: {
                  added: "https://vistao.co/hub/analytics/pitch-tracker/asset/img/pitch.jpg"  
                }
            };
            
            // Generate the PDF as a blob object
            pdfMake.createPdf(docDefinition).getBlob(function(blob) {
                // Create a temporary link element to initiate the download
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'info.pdf';
            
                // Append the link to the document and trigger the download
                document.body.appendChild(link);
                link.click();
            
                // Clean up the object URL and remove the link from the document
                document.body.removeChild(link);
            });
        };
        reader.readAsDataURL(logoFile);
    } else {
        alert("Logo file is not a valid Blob object.");
    }
});

LinearGrad1.execute();
LinearGrad2.execute();
LinearGrad3.execute();
LinearGrad4.execute();
radialGrad.execute();

let gradPallet1 = LinearGrad1.getPixels(0, 0, 256, 1).imageData.data;
let gradPallet2 = LinearGrad2.getPixels(0, 0, 256, 1).imageData.data;
let gradPallet3 = LinearGrad3.getPixels(0, 0, 256, 1).imageData.data;
let gradPallet4 = LinearGrad4.getPixels(0, 0, 256, 1).imageData.data;

function start(e) {
  if (e.button == 2 || e.button == 1) return;
  isDrawing = true;
  circleOrigin[0] = squareOrigin[0] = e.clientX;
  circleOrigin[1] = squareOrigin[1] = e.clientY;
  draw(e);
}

function draw(e) {
  globalRenderer.ctx.lineWidth = 10;
  if ((isDrawing) && (drawable)) {
    if (mode === "pen") {
      globalShadowCanvas
        .createEl({
          el: "image",
          attr: {
            x: e.offsetX - 50,
            y: e.offsetY - 50,
            width: 100,
            height: 100,
            src: radialGrad,
          },
        })
        .execute();

      let rawPixels = globalShadowCanvas.getPixels(
        e.offsetX - 50,
        e.offsetY - 50,
        radialGrad.width,
        radialGrad.height
      );
      let pixeldata = rawPixels.imageData.data;
      let temp;
      
      switch(color){
        case "blue" :
          temp = gradPallet1;
          break;
        case "green" :
          temp = gradPallet2;
          break;
        case "red" :
          temp = gradPallet3;
          break;
        case "yellow" :
          temp = gradPallet4;
          break;
      }
      // console.log(temp);
      for (let i = 3, len = pixeldata.length; i < len; i += 4) {
        pixeldata[i - 1] = temp[pixeldata[i] * 4 + 2];
        pixeldata[i - 2] = temp[pixeldata[i] * 4 + 1];
        pixeldata[i - 3] = temp[pixeldata[i] * 4];
      }
      globalRenderer.putPixels(rawPixels, e.offsetX - 50, e.offsetY - 50);
    } else if (mode === "square") {
      squarecheck = 1;
    } else if (mode == "circle") {
      circlecheck = 1;
    }
  }
}

function clearCanvas() {
  globalRenderer.ctx.clearRect(0, 0, globalRenderer.width, globalRenderer.height);
  globalShadowCanvas.ctx.clearRect(0, 0, globalRenderer.width, globalRenderer.height);
}

function stop(e) {
  isDrawing = false;
  x = e.clientX;
  y = e.clientY;
  if (mode == "square") {
      if (squarecheck == 1){
          // ctx.clearRect(squareOrigin[0], squareOrigin[1], x - squareOrigin[0], y - squareOrigin[1]);
          globalRenderer.ctx.fillStyle = 'transparent';
          globalRenderer.ctx.strokeStyle = color;
          globalRenderer.ctx.lineCap = "round";
  
          globalRenderer.ctx.beginPath();
          globalRenderer.ctx.rect(squareOrigin[0] - 70, squareOrigin[1], x - squareOrigin[0], y - squareOrigin[1]);
          globalRenderer.ctx.fill();
          globalRenderer.ctx.stroke();
          squarecheck = 0;
      }
  }
  if (mode == "circle") {
      if (circlecheck == 1){
          let radius = Math.sqrt((x - circleOrigin[0]) * (x - circleOrigin[0]) + (y - circleOrigin[1]) * (y - circleOrigin[1]));
          globalRenderer.ctx.globalCompositeOperation = "source-over";
          globalRenderer.ctx.lineCap = "round";
          globalRenderer.ctx.beginPath();
          globalRenderer.ctx.arc(circleOrigin[0] - 70, circleOrigin[1], radius, 0, 2 * Math.PI);
          globalRenderer.ctx.closePath();
          globalRenderer.ctx.fillStyle = 'transparent';
          globalRenderer.ctx.strokeStyle = color;
          globalRenderer.ctx.stroke();
          circlecheck = 0;
      }
  }
  globalRenderer.ctx.beginPath();
  restore_array.push(globalRenderer.getPixels(0, 0, globalRenderer.width, globalRenderer.height));
  index += 1;

}

const closeAllTabs = () => {
  drawable = true;
  for (const tab of tabs) {
    tab.style.display = "none";
  }
};

const openTab = (tab) => {
  if (!tab) return;
  closeAllTabs();
  const el = document.querySelector(`.${tab}`);
  el.style.display = "block";
  el.style.left = toolBox.offsetWidth + 10 + "px";
  drawable = false;
};

const setblue = () => {
  color = "blue";
  // globalShadowCanvas.ctx.clearRect(0, 0, globalRenderer.width, globalRenderer.height);
};

const setgreen = () => {
  color = "green";
  // globalShadowCanvas.ctx.clearRect(0, 0, globalRenderer.width, globalRenderer.height);
};

const setred = () => {
  color = "red";
  // globalShadowCanvas.ctx.clearRect(0, 0, globalRenderer.width, globalRenderer.height);
};

const setyellow = () => {
  color = "yellow";
  // globalShadowCanvas.ctx.clearRect(0, 0, globalRenderer.width, globalRenderer.height);
};

const changeBrush = (brush) => {
  if (!brush) return;
  mode = brush;
};

document.addEventListener("keydown", (e) => {
  const keys = ["z", "s"];
  const key = e.key.toLowerCase();
  const ctrl = e.ctrlKey;
  if (key == "z" && ctrl) return undo();
  if (e.key == "s" && ctrl) return downloadBtn.click();
});

document.addEventListener("mousedown", (e) => {
  if(e.clientX > 66){
    start_pos.x = e.clientX;
    start_pos.y = e.clientY;
    isDrawing = true;
    start(e);
  }
});

document.addEventListener("mousemove", (e) => {
  if (isDrawing && (e.clientX > 66)) {
    draw(e);
  }
});

document.addEventListener("mouseup", (e) => {
  if(isDrawing) {
    stop(e);
    var newDiv = document.createElement('div');
    newDiv.id = `myCanvas${canvasCount}`;
    newDiv.className = 'vistao-canvas';
    var parentDiv = document.getElementById('container');
    parentDiv.appendChild(newDiv);

    var renderer = i2d.canvasLayer(`#myCanvas${canvasCount}`, {}, { enableResize: false });
    renderer.setPixelRatio(1);
    var shadowCanvas = i2d.canvasLayer(null, {}, { enableResize: false });
    shadowCanvas.setPixelRatio(1);
    shadowCanvas.setSize(renderer.width, renderer.height);

    globalRenderer = renderer;
    globalShadowCanvas = shadowCanvas;

    globalShadowCanvas.style.backgroundColor = 'rgba(0, 0, 0, 0)';    
    canvasCount ++;
    isDrawing = false;
  
  }

});

const undo = () => {
  if (index <= 0) {
  } else {
    index -= 1;
    restore_array.pop();
    globalRenderer.putPixels(restore_array[index], 0, 0);
  }
};

undobutton.addEventListener("click", function(){
  undo();
  undo();
})
