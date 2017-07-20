function onetime(){
	window.navigator.vibrate(200);
}

function melody(){
	window.navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]);
}

function stopVib(){
	window.navigator.vibrate(0);
}