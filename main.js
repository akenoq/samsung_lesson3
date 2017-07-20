window.onload = function(){
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		alert("LEFT");
    		break;
    	case 38: //UP arrow
    		alert("UP");
    		break;
    	case 39: //RIGHT arrow
    		alert("RIGHT");
    		break;
    	case 40: //DOWN arrow
    		alert("DOWN");
    		break;
    	case 13: //OK button
    		alert("OK");
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
}