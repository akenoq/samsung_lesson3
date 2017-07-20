
window.onload = function () {
	
	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "hidden";
	

};


var baseName 	  = "WebBase1";
var storeName 	  = "WebBaseStore";



function getFeed(){
	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "visible";
    	var width = screen.width;
    	var arr = [];
    	var i=0;
	 var FEED_URL = "http://www.3dnews.ru/news/rss/";
	 
	 
	 
	 $(document).ready(function () {
		    $.ajax({
		        type: "GET",
		        url: FEED_URL,
		        dataType: "xml",
		        error: 	 getStorage,  
		        success: xmlParser
		    });
		});

		function xmlParser(xml) {

			indicator.style.display = "none";

		    $(xml).find("item").each(function () {
		    	  var url =  $(this).find("enclosure").attr('url');

			       /* $("#rssContent").append('<div class="feed"><div class="imgcont"><img src=' + url + ' width=' + width + 'px /></div><div class="title"> Title:' + $(this).find("title").text() 
			        		+ '</div><br><div class="description">Desc: ' + $(this).find("description").text() + '</div><div class="date">Date: ' + $(this).find("pubDate").text() + '</div></div>');
*/				   
		    	  var id_img = i.toString();
		    	  
		    	  console.log("aaaa");
		    	  
		    	  //нужно взять текущий id
		    	  
		    	  /* $("#rssContent").append('<div class="feed"><div class="imgcont"> <canvas id="myCan'+id_img+'" width="350" height="200"> <img id="myImg'+id_img+'" src=' + url + ' style="display: none" /> </div><div class="title"> Title:' + $(this).find("title").text() 
			        		+ '</div><br><div class="description">Desc: ' + $(this).find("description").text() + '</div><div class="date">Date: ' + $(this).find("pubDate").text() + '</div></div>');*/
		    	  
		    	  
		    	  $("#rssContent").append('<div class="feed"><div class="imgcont"><canvas id="myCan'+id_img+'" width="350" height="200"> </canvas><img id="myImg'+id_img+'" src=' + url + ' style="display: none" /></div><div class="title"> Title:' + $(this).find("title").text() 
			        		+ '</div><br><div class="description">Desc: ' + $(this).find("description").text() + '</div><div class="date">Date: ' + $(this).find("pubDate").text() + '</div></div>');

		    	  console.log(document.getElementById("myImg"+id_img).id);
		    	  
		    	  function drawImg(){
		    		  var canvas = document.getElementById("myCan"+id_img);
		    		  var holst = canvas.getContext("2d");
		    		  var img = document.getElementById("myImg"+id_img);
		    		  holst.drawImage(img, 0, 0);  		  
		    	  }
		    	  
		    	  drawImg();
		          		    	  
		    	  function Base123(img) {  
		    		    // создаем канвас элемент  
		    		    var canvas = document.getElementById("myCan"+id_img);
		    		    var holst = canvas.getContext("2d");
		    		  
		    		    // Получаем data-URL отформатированную строку  
		    		    // Firefox поддерживает PNG и JPEG.   
		    		    var dataURL = canvas.toDataURL("image/png");  
		    		    return dataURL;
		    		    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");  
		    		}  

		    	  setData($(this).find("title").text(), $(this).find("description").text(), Base123(document.getElementById("myImg"+id_img)), $(this).find("pubDate").text()); // чем плоха данная схема? переделать на передачу массива.
		          
		    	  
		          i++;
		    });
		    
		    getStorage();
		}

		 var db = openDatabase(baseName, '1.0', 'Test DB', 2 * 1024 * 1024);
		 if(!db){alert("Failed to connect to database.");}
         var msg;
         
     	function onError( err ){
    		console.log( err )
    	}
     	
     	
         
         function setData(title_, description_, image_, date_){

        	 db.transaction(function (tx) {
 tx.executeSql('CREATE TABLE IF NOT EXISTS ' + storeName + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, image TEXT, date TEXT)', [],
		 null,
		 null);            
 //?,?,? так как используются placeholder, понижается риск иньекций
  tx.executeSql('INSERT INTO ' + storeName + ' (title, description, image, date) VALUES (?, ?, ?, ?)', [title_, description_, image_, date_], null, onError);
         });
         };
         
         function getStorage(){
         db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM ' + storeName, [], function (tx, results) {
               var len = results.rows.length, i;
               msg = "<p>Found rows: " + len + "</p>";
               $("#rssContent").append(msg);
					
               for (i = 0; i < len; i++){
                  msg = "<p><b>" + results.rows.item(i).title + "</b></p>";
                  $("#rssContent").append(msg);
               }
            }, onError);
         });
         };
}
