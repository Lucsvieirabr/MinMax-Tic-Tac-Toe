function drawnLine(x1, y1, x2, y2, color){
    let old = canvasContext.strokeStyle;
    canvasContext.beginPath();
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.strokeStyle = color;
    canvasContext.stroke();
    canvasContext.strokeStyle = old;
}

function drawRect(x, y, width, height, color){
    let old = canvasContext.fillStyle;
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
    canvasContext.fillStyle = old;
}

function write_text(x, y, text, color, fontSize, font){
    let old = canvasContext.fillStyle;
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y);
    canvasContext.fillStyle = old;
}

function drawnScenery(){
    
    drawnLine(canvas.width/3, 0, canvas.width/3, canvas.height, 'black');
    drawnLine(canvas.width/3*2, 0, canvas.width/3*2, canvas.height, 'black');

    drawnLine(0, canvas.height/3, canvas.width, canvas.height/3, 'black');
    drawnLine(0, canvas.width/3*2, canvas.width, canvas.height/3*2, 'black');

    
}

