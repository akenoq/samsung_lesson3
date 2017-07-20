var startTime;
var checkTime;

//Initialize function
var init = function () {
	// TODO:: Do your initialization job
	console.log("init() called");

	// add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (error) {
				console.error("getCurrentApplication(): " + error.message);
			}
		}
	});
};
// window.onload can work without <body onload="">
window.onload = init;

function startTime() {
	var today = new Date();
	var h = today.getHours();

	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('divbutton1').innerHTML="Current time: " + h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 250);
}

function checkTime(i) {
	if (i < 10) {
		i="0" + i;
	}
	return i;
}



function getBase64Image(img) {  
    // создаем канвас элемент  
    var canvas = document.createElement("canvas");  
    canvas.width = img.width;  
    canvas.height = img.height;  
  
    // Копируем изображение на канвас  
    var ctx = canvas.getContext("2d");  
    ctx.drawImage(img, 0, 0);  
  
    // Получаем data-URL отформатированную строку  
    // Firefox поддерживает PNG и JPEG.   
    var dataURL = canvas.toDataURL("image/png");  
  
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");  
}  
  
function getBase64ImageById(id){  
   return getBase64Image(document.getElementById(id));  
}  
