// document.getElementById('info_mini_right_icon').addEventListener('mouseover', runTruck);

// var info_mini_icon = document.getElementById('info_mini_right_icon_img');
// var toggled = false;
// function runTruck() {
// 	if(!toggled) {
// 		toggled = true;
// 		info_mini_icon.src = './assets/truck/truckcircle_head_pink_hover_01_2017.png';
// 		return;
		
// 	}
// 	if(toggled){
// 		toggled = false;
// 		info_mini_icon.src = './assets/truck/truckcircle_head_pink_01_2017.png';
// 		return;
	
// 	}
// }

document.querySelector('.left-sidebar').addEventListener('mouseover', showInfoTruck);


function showInfoTruck() {
	var truck_info_area = document.querySelector('.truck_info_area');
	var info_mini_right_icon_img = document.getElementById('info_mini_right_icon_img');
	document.querySelector('.info_mini_right_icon').style.zIndex = 110;
	document.querySelector('.page_info_modal').style.display = 'block';
	//document.querySelector('.page_info_modal').style.zIndex = 110;
	info_mini_right_icon_img.src = 'http://truck.dbrqx.com/index1/img/truck/truckcircle_head_pink_hover_01_2017.png';
}



$(document).ready(function() {
$('.page_info_modal').on('click', runTruck);
$('#info_mini_right_icon_img').on('click', runTruck);
function runTruck() {
	$('.page_info_modal').hide();
	$('#info_mini_right_icon_img').hide();
	// $('#info_close_truck_head').show();
	$('.running_truck').show();
	$('.running_truck').show();
	$('.running_truck').animate({
		right: '72%'
	},{
		duration: 9000,
		easing: 'linear'
	});
};

$('.info_btn').on('click', function() {
	$('.show_it').show();
});

});

document.querySelector('.info_btn').addEventListener('click', function(){
	document.querySelector('.show_status').style.display = 'block';
	document.querySelector('.show_status_symbol').style.display = 'block';
	document.querySelector('#info_close_truck_head').style.display = 'block';
	//console.log(document.getElementsByClassName('show_it'));
	document.querySelector('.info_mini_right_icon').style.display = 'block';
	document.querySelector('.info_mini_right_icon').style.zIndex = 110;
	document.getElementById('info_mini_right_icon_img').src = 'http://truck.dbrqx.com/index1/img/truck/truck_head_toolbox_red_mini_01_2017.png';
	document.querySelector('.truck_info_area').classList.add('truck_ifo_bg');
	document.getElementById('info_mini_right_icon_img').className = 'info_close_truck_head';
});

document.getElementById('info_close_truck_head').addEventListener('click', function(){
	document.querySelector('.show_status').style.display = 'none';
	document.querySelector('.show_status_symbol').style.display = 'none';
	document.querySelector('#info_close_truck_head').style.display = 'none';
	document.querySelector('.info_mini_right_icon').style.display = 'block';
	document.querySelector('#info_mini_right_icon_img').style.display = 'block';
	document.querySelector('.info_mini_right_icon').style.zIndex = 0;
	document.querySelector('.running_truck').style.right = '-27%';
	document.querySelector('.truck_info_area').classList.remove('truck_ifo_bg');
	document.getElementById('info_mini_right_icon_img').src = 'http://truck.dbrqx.com/index1/img/truck/truckcircle_head_pink_01_2017.png';
});
$('#info_close_truck_head').on('click', function() {
	$('.show_it').hide();
});
// $('#info_mini_right_icon_img, .show_status').on('blur', function() {
// // 	alert('dhdhdh');
// // });
// document.getElementById('info_close_truck_head').addEventListener('blur', function() {
// 	alert('hhd');
// });