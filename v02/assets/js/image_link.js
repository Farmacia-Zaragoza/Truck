document.head.title.textContent = window.location.protocol + window.location.hostname;

	//	<img src="http://truck.vbrqx.com/img/trucks/truck_model_002_blue_left.svg" alt="truck">

var imgSelector = document.querySelector('.img_link');
console.log(imgSelector);

var imgLink = imgSelector.src;
var hostName = window.location.protocol + window.location.hostname;
//console.log(hostName);

//var replace = "regex";
var re = new RegExp(hostName,"g");

 //var re = /\hostName/;
 console.log(re.source)

//var strIndex = imgLink.search(re);
//console.log(strIndex);
//var sliceStr = imgLink.slice(0, strIndex);
//console.log(sliceStr);
//imgLink.replace(sliceStr, 'http://truck.vbrqx.com/img/');

// console.log(result);


var result = imgLink.replace(hostName, hostName);
	imgSelector.src = result;
//console.log(imgLink);
