window.onload = function () {
	crear_select();
}

$(function () {
	
	// vars
	let topBarMenu = $('.topbar .menu .main-menu'),
		pageCont   = $('.page-container'),
		sidebar    = $('.sideBar');

	// sideBar
	$('.toggleBar').click(function () {
		$(sidebar).toggleClass('collapsed');
		if ($(window).width() > 767) {
			$(pageCont).toggleClass('expand');
		}
		$(sidebar).css("position","fixed")  
	});
	$('.close-btn').click(function () {
		$(sidebar).removeClass('collapsed'); 
	});

	$('body').on('click', '.sideBar ul li .sid-links', function (e) {
		$('.sideBar').find('.main-menu').removeClass('open');
		$(this).closest('.sideBar').find('.sub-menu').slideUp();
		$(this).closest('.sideBar').find('.sid-links').removeClass('for-a-active');
		$(this).addClass('for-a-active');
		$(this).find('> ul').slideToggle().parent().siblings().find('ul').slideUp();
	});

	// topBar
	$(topBarMenu).click(function (e) {
		e.stopPropagation();
		$(this).toggleClass('active');
		$(this).siblings().removeClass('active');
	});
	$('body').click(function () {
		$(topBarMenu).removeClass('active')
	});
	//choose-opd
	$(document).ready(function() {
		$('.nice-select').val('');
		$('.nice-select').on('change', function(){
			if ($(this).val() == 1) {
				$('.sub-table').fadeIn();
			} else {
				$('.sub-table').fadeOut();
			}

		});
	});
	$(document).ready(function() {
		$('.choose-opd').siblings().on('click touchstart', function(){
			$('.sub-table').css("display","none");
		});
	});

	// dashboard
	function init_flot_chart() {

		if (typeof ($.plot) === 'undefined') { return; }

		var randNum = function () {
			return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
		};

		var chart_plot_02_data = [];

		for (var i = 0; i < 30; i++) {
			chart_plot_02_data.push([new Date(Date.today().add(i).days()).getTime(), randNum() + i + i + 10]);
		}

		var chart_plot_02_settings = {
			grid: {
				show: true,
				aboveData: true,
				color: "#888",
				labelMargin: 10,
				axisMargin: 0,
				borderWidth: 0,
				borderColor: null,
				minBorderMargin: 5,
				clickable: true,
				hoverable: true,
				autoHighlight: true,
				mouseActiveRadius: 100
			},
			series: {
				lines: {
					show: true,
					fill: true,
					lineWidth: 2,
					steps: false
				},
				points: {
					show: true,
					radius: 4.5,
					symbol: "circle",
					lineWidth: 3.0
				}
			},
			legend: {
				position: "ne",
				margin: [0, -25],
				noColumns: 0,
				labelBoxBorderColor: null,
				labelFormatter: function (label, series) {
					return label + '&nbsp;&nbsp;';
				},
				width: 40,
				height: 1
			},
			colors: ['#26c677', '#3F97EB', '#00b85d', '#6f7a8a', '#f7cb38', '#046132', '#2c7282'],
			shadowSize: 0,
			tooltip: true,
			tooltipOpts: {
				content: "%s: %y.0",
				xDateFormat: "%d/%m",
				shifts: {
					x: -30,
					y: -50
				},
				defaultTheme: false
			},
			yaxis: {
				min: 0
			},
			xaxis: {
				mode: "time",
				minTickSize: [1, "day"],
				timeformat: "%d/%m/%y",
				min: chart_plot_02_data[0][0],
				max: chart_plot_02_data[20][0]
			}
		};

		if ($(".active .chart-box").length) {
			$.plot($(".active .chart-box"), 
				   [{
					   label: "Revenue",
					   data: chart_plot_02_data,
					   lines: {
						   fillColor: "rgba(0,184,93,.12)"
					   },
					   points: {
						   fillColor: "#fff"
					   }
				   }], chart_plot_02_settings);
		}
	}

	init_flot_chart();

	/******** internal pages ********/

	$('.internal-page .new').on("click", function (e) {
		e.preventDefault();
		if ($(this).hasClass('show')) {
			$(this).find('span').text('+')
		} else {
			$(this).find('span').text('-')
		}
		$(this).toggleClass('hide show');
		$(this).siblings('.new-form').slideToggle();
	});

	// table grid
	let checkedInputs = $('.internal-page .table-grid tr input:checked');
	for (let i = 0 ; i < checkedInputs.length; i++) {
		$($(checkedInputs)[i]).closest('tr').addClass('checked');
	} 

	$('.internal-page .table-grid tr').click(function () {
		if ($(this).hasClass('checked')) {
			$(this).find('input[type="checkbox"]').prop( "checked", false );
		} else {
			$(this).find('input[type="checkbox"]').prop( "checked", true );
		}
		$(this).toggleClass('checked');
	});

	/************ custom form *************/
	$('.cu-form-group.with-title').each(function (i,le) {
		$(le).prepend(`<div class='title'><span>${i + 1}</span></div>`)
	});

});

/************ popup *************/
$('body').on('click', '.open-pop', function (e) {

	e.preventDefault();
	$('.popup').removeClass('active');
	$('.' + $(this).data('pop-name')).addClass('active');

	if (!$(this).hasClass('stopProp')) {
		if ($('.tablinks').length > 0) {
			$('.tablinks').removeClass("stylish");
			$(".tabcontent").removeClass("active");

			$('.tablinks').eq(0).addClass("stylish");
			$(".tabcontent").eq(0).addClass("active");
		}
	}

});

$('body').on('click', '.popup, .popup .close-pop', function () {
	$(this).removeClass('active');
	$(this).closest('.popup').removeClass('active');
});
$('body').on('click', '.popup-body', function (e) {
	e.stopPropagation();
	$('.popup-body .dropdown-menu').removeClass('show');
});
$('body').on('click', '.popup-body .btn', function (e) {
	e.stopPropagation();
	$(this).siblings('.dropdown-menu').toggleClass('show');
});
$('body').on('click', '.open-pop.stopProp', function () {
	$(this).closest('.popup').addClass('active');
});

/************ progress bar auto *************/

$('body').on('click','.niceProgress span', function () {
	let num = $(this).data('num');
	$(this).closest('.progress-con').find('.niceProgress .niceProg').css('width', num + '%');
	$(this).closest('.progress-con').find('.progress-input').val(num);
});
$('body').on('change','.progress-input', function () {
	let num = $(this).val();
	$(this).closest('.progress-con').find('.niceProgress .niceProg').css('width', num + '%');
});
$('body').on('keyup','.progress-input', function () {
	let num = $(this).val();
	$(this).closest('.progress-con').find('.niceProgress .niceProg').css('width', num + '%');
});
$('body').on('change', '.Courses .progress-input', function () {
	$(this).closest('.grouped').find('.save-btn').addClass('active');
});
$('body').on('click', '.Courses .progress_span', function () {
	$(this).closest('.grouped').find('.save-btn').addClass('active');
});

/************ checkall_field *************/

$('body').on('click', '.checkall_field .checkall', function () {
	if ($(this).is(':checked')) {
		$(this).closest('.checkall_field').find('.checkall-inputs input[type="checkbox"]').prop( "checked", true );
	} else {
		$(this).closest('.checkall_field').find('.checkall-inputs input[type="checkbox"]').prop( "checked", false );
	}
});

$('body').on('click', '.checkall_field .checkall-inputs input[type="checkbox"]', function () {
	let num = $(this).closest('.checkall_field').find('.checkall-inputs input[type="checkbox"]').length;

	if ($(this).closest('.checkall_field').find('.checkall-inputs input:checked').length == num) {

		$(this).closest('.checkall_field').find('.checkall').prop( "checked", true );

	} else {
		$(this).closest('.checkall_field').find('.checkall').prop( "checked", false );
	}

});

/************ checkall_field *************/

/********start felp*******/
$('body').on('click', '.rosey', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$(".felp").toggleClass("active");
	$(this).siblings().removeClass("active");

});


/**** email-li-active****/
$('body').on('click', '.email-wrapper .mail-sidebar .menu-bar .menu-items li', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('.email-wrapper .mail-sidebar .menu-bar .menu-items li').addClass("active");
	$(this).siblings().removeClass("active");

});
/********start task-add*******/
$('body').on('click', '.tasks', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$(".add-task").toggleClass("active");
	$(this).siblings().removeClass("active");

});
/********start note-add*******/
$('body').on('click', '.notes', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$(".add-note").toggleClass("active");
	$(this).siblings().removeClass("active");

});
/******** btn-defult active *********/
$('body').on('click', '.btn-default', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('.btn-default').addClass("active");
	$(this).siblings().removeClass("active");

});
/************ tabs *************/

$('body').on('click', '.tablinks', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$(".tabcontent").removeClass("active");
	$($(this).data('tab')).addClass("active");
	console.log($($(this).data('tab')));
});
$('body').on('click', '.tablinks', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('.tablinks').removeClass("stylish");
	$(this).addClass("stylish");
	console.log($($(this).data('tab')));
});
/*****tabs for survey dashbord *****/
$('body').on('click', '.one .tablin', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$(".one .tabcon").removeClass("active");
	$($(this).data('tab')).addClass("active");
	console.log($($(this).data('tab')));
});
$('body').on('click', '.tablin', function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('.tablin').removeClass("stylish");
	$(this).addClass("stylish");
	console.log($($(this).data('tab')));
});
/************ tabs *************/

/************ calendar *************/

$('.picked-date').val('');

$('#date-end').bootstrapMaterialDatePicker({ weekStart : 0, time: false });
$('#date-start').bootstrapMaterialDatePicker({ weekStart : 0, time: false });

$('.picked-date').change(function () {
	let that = $(this);
	if ($(that).val() != '') {
		$(that).siblings('.picked').addClass('active')
	}
});
/******************Time************************/

$('#time-start1').bootstrapMaterialDatePicker({ date: false ,format : 'HH:mm' });
$('#time-end1').bootstrapMaterialDatePicker({ date: false ,format : 'HH:mm' });

/************ custom selectbox *************/

var li = new Array();
function crear_select() {
	var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
	var select_ = '';
	for (var e = 0; e < div_cont_select.length; e++) {
		div_cont_select[e].setAttribute('data-indx-select', e);
		div_cont_select[e].setAttribute('data-selec-open', 'false');
		var ul_cont = document.querySelectorAll("[data-indx-select='" + e + "'] > .cont_list_select_mate > ul");
		select_ = document.querySelectorAll("[data-indx-select='" + e + "'] >select")[0];

		var select_optiones = select_.options;
		document.querySelectorAll("[data-indx-select='" + e + "']  > .selecionado_opcion ")[0].setAttribute('data-n-select', e);
		document.querySelectorAll("[data-indx-select='" + e + "']  > .icon_select_mate ")[0].setAttribute('data-n-select', e);
		for (var i = 0; i < select_optiones.length; i++) {
			li[i] = document.createElement('li');
			if (select_optiones[i].selected == true || select_.value == select_optiones[i].innerHTML) {
				li[i].className = 'active';
				document.querySelector("[data-indx-select='" + e + "']  > .selecionado_opcion ").innerHTML = select_optiones[i].innerHTML;
			};
			li[i].setAttribute('data-index', i);
			li[i].setAttribute('data-selec-index', e);
			// funcion click al selecionar 
			li[i].addEventListener('click', function () { _select_option(this.getAttribute('data-index'), this.getAttribute('data-selec-index')); });

			li[i].innerHTML = select_optiones[i].innerHTML;
			ul_cont[0].appendChild(li[i]);

		}; // end For select_optiones
	}; // end for divs_cont_select
} // end Function 



var cont_slc = 0;
function open_select(idx) {
	var idx1 = idx.getAttribute('data-n-select');
	var ul_cont_li = document.querySelectorAll("[data-indx-select='" + idx1 + "'] .cont_select_int > li");
	var hg = 0;
	var slect_open = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].getAttribute('data-selec-open');
	var slect_element_open = document.querySelectorAll("[data-indx-select='" + idx1 + "'] select")[0];

	for (var i = 0; i < ul_cont_li.length; i++) {
		hg += ul_cont_li[i].offsetHeight;
	};

	if (slect_open == 'false') {
		document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'true');
		document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = hg + "px";
		document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(180deg)';
		document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.top = '5px';
	} else {
		document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'false');
		document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
		document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.top = '0px';
		document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
	}

} // end function open_select

function salir_select(indx) {
	var select_ = document.querySelectorAll("[data-indx-select='" + indx + "'] > select")[0];
	document.querySelectorAll("[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
	document.querySelector("[data-indx-select='" + indx + "'] > .icon_select_mate").style.transform = 'rotate(0deg)';
	document.querySelectorAll("[data-indx-select='" + indx + "']")[0].setAttribute('data-selec-open', 'false');
}


function _select_option(indx, selc) {

	var select_ = document.querySelectorAll("[data-indx-select='" + selc + "'] > select")[0];

	var li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
	var p_act = document.querySelectorAll("[data-indx-select='" + selc + "'] > .selecionado_opcion")[0].innerHTML = li_s[indx].innerHTML;
	var select_optiones = document.querySelectorAll("[data-indx-select='" + selc + "'] > select > option");
	for (var i = 0; i < li_s.length; i++) {
		if (li_s[i].className == 'active') {
			li_s[i].className = '';
		};
		li_s[indx].className = 'active';

	};
	select_optiones[indx].selected = true;
	select_.selectedIndex = indx;
	select_.onchange();
	salir_select(selc);
}

//closing the dropdown if clicking anywhere else
var div_cont_select = document.querySelectorAll("[data-mate-select='active']"),
	customSelect    = document.querySelectorAll(".select_mate");
if (div_cont_select) {
	window.onclick = function () {
		for (let i = 0; i < div_cont_select.length; i++) {
			div_cont_select[i].setAttribute('data-selec-open', 'false');
			document.querySelectorAll("[data-indx-select='" + i + "'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
			document.querySelectorAll("[data-indx-select='" + i + "'] > .icon_select_mate")[0].style.top = '5px';
			document.querySelectorAll("[data-indx-select='" + i + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
		}
	}
}
customSelect.forEach((el,x) => {
	el.onclick = function (e) {
		e.stopPropagation();
		for (let i = 0; i < div_cont_select.length; i++) {
			if (i != x) {
				div_cont_select[i].setAttribute('data-selec-open', 'false');
				document.querySelectorAll("[data-indx-select='" + i + "'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
				document.querySelectorAll("[data-indx-select='" + i + "'] > .icon_select_mate")[0].style.top = '5px';
				document.querySelectorAll("[data-indx-select='" + i + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
			}
		}

		return false;
	}
});

$('.responsive').slick({
	dots: true,
	infinite: true,
	speed: 300,
	autoplaySpeed: 2000,
	slidesToShow: 3,
	slidesToScroll: 3,
	responsive: [
		{
			breakpoint: 1299,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

// multi date picker
var myDates = [];
 for (var j = 0; j <= 11; j++) {
     myDates[j] = [];
 }

$(function() {
    $('#calendar').datepicker();
    initCalendar();
});

$('body').on('click','.ui-datepicker-calendar tr td a',function (e) {e.preventDefault();});

function initCalendar() {
    $('div.ui-widget-header').append('\
        <a class="ui-datepicker-clear-month" title="Clear month">\
            X\
        </a>\
    ');

    var thisMonth = $($($('#calendar tbody tr')[2]).find('td')[0]).attr('data-month');
    var dateDragStart = undefined; // We'll use this variable to identify if the user is mouse button is pressed (if the user is dragging over the calendar)
    var thisDates = [];
    var calendarTds = $('.ui-datepicker-calendar td:not(.ui-datepicker-unselectable)');
    $('#calendar td').attr('data-event', '');
    $('#calendar td').attr('data-handler', '');
    $('#calendar td a').removeClass('ui-state-active');
    $('#calendar td a.ui-state-highlight').removeClass('ui-state-active').removeClass('ui-state-highlight').removeClass('ui-state-hover');
    $('#calendar td').off();
    for (var i = 0; i < myDates[thisMonth].length; i++) { // Repaint
        var a = calendarTds.find('a').filter('a:textEquals(' + myDates[thisMonth][i].getDate() + ')').addClass('ui-state-active');
        thisDates.push(new Date(a.parent().attr('data-year'), thisMonth, a.html()));
    }

    $('#calendar td').mousedown(function () {  // Click or start of dragging
        dateDragStart = new Date($(this).attr('data-year'), $(this).attr('data-month'), $(this).find('a').html());
        $(this).find('a').addClass('ui-state-active');
        return false;
    });

    $('#calendar td').mouseup(function () {
        thisDates = [];
        $('#calendar td a.ui-state-active').each(function () { //Save selected dates
            thisDates.push(new Date($(this).parent().attr('data-year'), $(this).parent().attr('data-month'), $(this).html()));
        });
        dateDragStart = undefined;
        return false;
    });
    $(document).mouseup(function () {
        dateDragStart = undefined;
    });

    $('#calendar td').mouseenter(function() {  // Drag over day on calendar
        var thisDate = new Date($(this).attr('data-year'), $(this).attr('data-month'), $(this).find('a').html());
        if (dateDragStart !== undefined && thisDate > dateDragStart) {  // We are dragging forwards
            for (var d = new Date(dateDragStart); d <= thisDate; d.setDate(d.getDate() + 1)) {
                calendarTds.find('a').filter('a:textEquals(' + d.getDate() + ')').addClass('ui-state-active');
            }
            $(this).find('a').addClass('ui-state-active');
        } else if (dateDragStart !== undefined && thisDate < dateDragStart) {  // We are dragging backwards
            for (var d = new Date(dateDragStart); d >= thisDate; d.setDate(d.getDate() - 1)) {
                calendarTds.find('a').filter('a:textEquals(' + d.getDate() + ')').addClass('ui-state-active');
            }
            $(this).find('a').addClass('ui-state-active');
        }
    });

    $('#calendar td').mouseleave(function() {
        var thisDate = new Date($(this).attr('data-year'), $(this).attr('data-month'), $(this).find('a').html());
        if (dateDragStart !== undefined && thisDate > dateDragStart) {
            for (var d = new Date(dateDragStart); d <= thisDate; d.setDate(d.getDate() + 1)) {
                if (thisDates.find( item => item.getTime() == d.getTime()) === undefined) {
                    calendarTds.find('a').filter('a:textEquals(' + d.getDate() + ')').removeClass('ui-state-active');
                }
            }
        } else if (dateDragStart !== undefined && thisDate < dateDragStart) {
            for (var d = new Date(dateDragStart); d >= thisDate; d.setDate(d.getDate() - 1)) {
                if (thisDates.find( item => item.getTime() == d.getTime()) === undefined) {
                    calendarTds.find('a').filter('a:textEquals(' + d.getDate() + ')').removeClass('ui-state-active');
                }
            }
        }
    });

    $('.ui-datepicker-clear-month').click(function () {
        thisDates = [];
        calendarTds.find('a').removeClass('ui-state-active');
    });

    $('a.ui-datepicker-next, a.ui-datepicker-prev').click(function() {
        myDates[thisMonth] = thisDates;
        initCalendar();
    });
}

$.expr[':'].textEquals = function(el, idx, selector) {
    var regExp = new RegExp('^' + selector[3] + '$');
    return regExp.test($(el).text());
};

/******** ris dashboed chart ********/
if (document.getElementById("chartjs-1gh")) {
	new Chart(document.getElementById("chartjs-1gh"),
		  {"type":"bar",
		   "data":{
			   "labels":["January","February","March","April","May","June","July"],
			   "datasets":[{"label":"My First Dataset","data":[60,59,80,81,56,55,40],
							"fill":false,
							"backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],
							"borderColor":["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"],"borderWidth":1}]},
		   "options": { "scales": { "yAxes": [{ "ticks": { "beginAtZero": true } }] } }
		  });
}
if (document.getElementById("chartjs-1gh")) {
	new Chart(document.getElementById("chartjs-2gh"),
		  {"type":"bar",
		   "data":{
			   "labels":["Jan","February","March","April","May","June","July"],
			   "datasets":[{"label":"My First Dataset","data":[80,10,80,81,50,5,30],
							"fill":false,
							"backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],
							"borderColor":["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"],"borderWidth":1}]},
		   "options": { "scales": { "yAxes": [{ "ticks": { "beginAtZero": true } }] } }
		  });
}
if (document.getElementById("chartjs-1gh")){
	new Chart(document.getElementById("chartjs-5gh"),
			  {
		"type":"doughnut",
		"data":{"labels":["Happy","Normal","Sad"],
				"datasets":[{"label":"My First Dataset","data":[300,50,100],
							 "backgroundColor": ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"]
							}]
			   }
	});
}

//**********************/
var randomScalingFactor = function() {
	return Math.round(Math.random() * 100);
};
if (document.getElementById('chart-area')){
	var ghPie = document.getElementById('chart-area').getContext('2d');
	var myChart = new Chart(ghPie, {
		type: 'pie',
		data: {
			labels: ['New', 'In Progress', 'Completed'],
			datasets: [{
				label: '# of Votes',
				data: [10, 30, 50],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'#04E474'
				]
			}]
		}
	});
}

/********** other chart********/
var barChartData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [{
		label: 'Cairoscan',
		backgroundColor: [
			window.chartColors.red,
			window.chartColors.orange,
			window.chartColors.yellow,
			window.chartColors.green,
			window.chartColors.blue,
			window.chartColors.purple,
			window.chartColors.red
		],
		yAxisID: 'y-axis-1',
		data: [
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor()
		]
	}, {
		label: 'Technoscan',
		backgroundColor: window.chartColors.grey,
		yAxisID: 'y-axis-2',
		data: [
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor()
		]
	}]

};

if (document.getElementById('canvasgh')) {
	window.onload = function() {
	var ctx = document.getElementById('canvasgh').getContext('2d');
	window.myBar = new Chart(ctx, {
		type: 'bar',
		data: barChartData,
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Patient rate for'
			},
			tooltips: {
				mode: 'index',
				intersect: true
			},
			scales: {
				yAxes: [{
					type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
					display: true,
					position: 'left',
					id: 'y-axis-1',
				}, {
					type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
					display: true,
					position: 'right',
					id: 'y-axis-2',
					gridLines: {
						drawOnChartArea: false
					}
				}],
			}
		}
	});
	};
}


/******ris dashboed chart *******/
var presets = window.chartColors;
var utils = Samples.utils;
var inputs = {
	min: 8,
	max: 16,
	count: 8,
	decimals: 2,
	continuity: 1
};

function generateData() {
	// radar chart doesn't support stacked values, let's do it manually
	var values = utils.numbers(inputs);
	inputs.from = values;
	return values;
}

function generateLabels() {
	return utils.months({count: inputs.count});
}

utils.srand(42);

var data = {
	labels: generateLabels(),
	datasets: [{
		backgroundColor: utils.transparentize(presets.red),
		borderColor: presets.red,
		data: generateData(),
		label: 'D0'
	}, {
		backgroundColor: utils.transparentize(presets.orange),
		borderColor: presets.orange,
		data: generateData(),
		hidden: true,
		label: 'D1',
		fill: '-1'
	}, {
		backgroundColor: utils.transparentize(presets.yellow),
		borderColor: presets.yellow,
		data: generateData(),
		label: 'D2',
		fill: 1
	}, {
		backgroundColor: utils.transparentize(presets.green),
		borderColor: presets.green,
		data: generateData(),
		label: 'D3',
		fill: false
	}, {
		backgroundColor: utils.transparentize(presets.blue),
		borderColor: presets.blue,
		data: generateData(),
		label: 'D4',
		fill: '-1'
	}, {
		backgroundColor: utils.transparentize(presets.purple),
		borderColor: presets.purple,
		data: generateData(),
		label: 'D5',
		fill: '-1'
	}]
};

var options = {
	maintainAspectRatio: true,
	spanGaps: false,
	elements: {
		line: {
			tension: 0.000001
		}
	},
	plugins: {
		filler: {
			propagate: false
		},
		'samples-filler-analyser': {
			target: 'chart-analyser'
		}
	}
};

var chart = new Chart('chart-0gh', {
	type: 'radar',
	data: data,
	options: options
});

// eslint-disable-next-line no-unused-vars
function togglePropagate(btn) {
	var value = btn.classList.toggle('btn-on');
	chart.options.plugins.filler.propagate = value;
	chart.update();
}

// eslint-disable-next-line no-unused-vars
function toggleSmooth(btn) {
	var value = btn.classList.toggle('btn-on');
	chart.options.elements.line.tension = value ? 0.4 : 0.000001;
	chart.update();
}

// eslint-disable-next-line no-unused-vars
function randomize() {
	inputs.from = [];
	chart.data.datasets.forEach(function(dataset) {
		dataset.data = generateData();
	});
	chart.update();
}
// hr sid links slide left and right

$(document).ready(function(){
        var boxWidth = $(".sub-menu").width();
        $(".panel-theme").mouseenter(function(){
            $(".sub-menu").animate({
                width: "270px",
  
            });
		
			
        });
     $(".panel-theme").mouseleave(function(){
           $(".sub-menu").animate({
                width: 0
            });
      
			
        });
       
    });

/**start qr code **/
// Function to HTML encode the text 
    // This creates a new hidden element, 
    // inserts the given text into it  
    // and outputs it out as HTML 
    function htmlEncode(value) { 
      return $('<div/>').text(value) 
        .html(); 
    } 
  
    $(function () { 
  
      // Specify an onclick function 
      // for the generate button 
      $('#generate').click(function () { 
  
        // Generate the link that would be 
        // used to generate the QR Code 
        // with the given data  
        let finalURL = 
'https://chart.googleapis.com/chart?cht=qr&chl=' + 
          htmlEncode($('#content').val()) + 
          '&chs=160x160&chld=L|0' 
  
        // Replace the src of the image with 
        // the QR code image 
        $('.qr-code').attr('src', finalURL); 
      }); 
    }); 
/** start steps for cteate **/
$(function(){
	$("#wizard").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 500,
       
    });
    $('.steps li a').click(function(){
    	$(this).parent().addClass('checked');
		$(this).parent().prevAll().addClass('checked');
		$(this).parent().nextAll().removeClass('checked');
    });
	// Custome Jquery Step Button
    
  
})
// nice select 
$(document).ready(function(){
 
  $('#seluser').niceSelect();
 
});
$(document).ready(function(){
 
  $('#seluser2').niceSelect();
 
});
// upload img as background in create exam
var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
	 document.getElementById("give_height").style.height = "200px"; 
};
// change img in create exam

// remove img in create exam
function myFunction() {
  var remove = document.getElementById("output");
  remove.src = "";
}
// togglle list of answer in create exam
function myFunction_open() {
  var x = document.getElementById("g_func");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
