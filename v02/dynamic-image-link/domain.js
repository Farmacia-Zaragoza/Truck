	//	<img src="http://truck.vbrqx.com/img/trucks/truck_model_002_blue_left.svg" alt="truck">

var imgSelector = document.querySelector('.img_link');
console.log(imgSelector);
 var hostName = window.location.protocol + '//' + window.location.hostname; //current host
 console.log(hostName);

var imgLink = imgSelector.src; // img string http://truck.vbrqx.com/img/trucks/truck_model_002_blue_left.svg

 var replace = "http://truck.vbrqx.com";


//var re = new RegExp(replace,"g");

//  //var re = /hostName/;

// //var strIndex = imgLink.search(re);
// //console.log(strIndex);
// //var sliceStr = imgLink.slice(0, strIndex);
// //console.log(sliceStr);

var result;
if(hostName !== 'http://truck.vbrqx.com') {
	 result = imgLink.replace(replace, hostName);
	 console.log('dont match');
	 console.log(result);
}else {
	result = 'http://truck.vbrqx.com/img/trucks/truck_model_002_blue_left.svg';
	console.log('match');
}
// //imgLink.replace(sliceStr, 'http://truck.vbrqx.com/img/');

//  console.log(result);


//var result = imgLink.replace(hostName, hostName);
 imgSelector.src = result;
// console.log(imgLink);
