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
  $('.sideBar ul li.main-menu.open').find('> ul').slideToggle().parent().siblings().find('ul').slideUp();

  $('.sideBar ul li.main-menu').on('click', function () {
    $(this).siblings().removeClass('open');
    $(this).toggleClass('open');
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

	$('.internal-page tr').click(function () {console.log(1)});

  // Daily Tasks
  let tabs = $('.todo-list .todo-tabs li'),
  submit = $('.todo-list input[type="submit"]');

  $(tabs).click(function () {
    $(tabs).removeClass('active');
    $(this).addClass('active');
    $('.todo-tables .table').removeClass('active');
    $($(this).data('tab')).addClass('active');
  });

  $('.todo-list .todo-tables .comment p').click(function () {
    $(this).addClass('hidden');
    $('.todo-list .todo-tables .comment .cu-input').removeClass('hidden');
  });

  $('.todo-list .table input').keyup(function () {
    for (let i = 0; i < $('.todo-list .table input').length; i++) {
      
      if ($($('.todo-list .table input')[i]).val()) {
        $(submit).addClass('active');
        return 0
      } else {
        if (i == $('.todo-list .table input').length - 1)
            $(submit).removeClass('active');
      }
    }
  });

  $('.select_mate').click(function () {
    $('.select_mate[data-selec-open="true"] li').click(function () {
      $(submit).addClass('active');
    });
  });
	
  /************ custom form *************/
  $('.cu-form-group.with-title').each(function (i,le) {
    $(le).prepend(`<div class='title'><span>${i + 1}</span></div>`)
  });

});
	
/************ popup *************/
$('.open-pop').click(function () {
	$($(this).data('pop-name')).addClass('active');
});

$('.popup, .popup .close-pop').click(function () {
	$(this).removeClass('active');
});
$('.popup-body').click(function (e) {
	e.stopPropagation();
});

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
window.onload = function () {
  crear_select();
}

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
})



$('.responsive').slick({
  dots: true,
  infinite: true,
  speed: 300,
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
//# sourceMappingURL=main.js.map
