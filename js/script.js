document.addEventListener('DOMContentLoaded', function(){
	// put your functions here
	
	// what does this one do?
	// open a video in the canvas element and then make a png for every frame until the end of the file. I have the feeling it's going to be huge so *first* estimate the number of files before doing it.
	// get the video element
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	// introduce the context
	var context = canvas.getContext('2d');
	var captureTimer = "";
	var i = 0;
	var imgArr = [];
	// var theImage = "";
	var arrSize = 0;
	var arrStr = "";
	var entryLen = 0;
	video.addEventListener('play', function(){
		// make the canvas the same size as the video
		var vidH = video.videoHeight;
		var vidW = video.videoWidth;
		canvas.height = vidH;
		canvas.width = vidW;
		draw(this, context, vidW, vidH);
                captureTimer = setInterval(function(){
			// theImage = canvas.toDataURL("image/png;base64;");
			imgArr.push(canvas.toDataURL("image/png;base64;"));
			arrStr = imgArr[i];
			entryLen = arrStr.length;;
			arrSize = arrSize + entryLen;
			console.log((entryLen / 1024) + 'kb', ((arrSize / 1024) / 1024) + ' mb');
			i++;
		}, 40); // apparently that's about 25 frames a second
	}, false);

	function draw(canvas, video, vidW, vidH) {
		if (video.paused || video.ended) return false;
		context.drawImage(canvas, 0, 0, vidW, vidH);
		setTimeout(draw, 20, canvas, video, vidW, vidH);
	}
	video.addEventListener('pause', function(){
		clearInterval(captureTimer);
	});
	video.addEventListener('ended', function(){
		console.log(imgArr[i-1]);
		// console.log(theImage);
		//doPost();
	});

	function doPost(){
		var xhr = new XMLHttpRequest();
		var url = 'saveimage.php';
		xhr.open("POST", url, true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function(){
			if(xhr.readystate == 4 && xhr.status == 200) {
				var return_data = xhr.responseText;
				console.log(return_data);
			}
		}
		xhr.send(theImage);
		console.log('sending');
	}

});
