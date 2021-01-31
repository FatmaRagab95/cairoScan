/******************** start Employee *********************/
if ($('#Employee').length != 0) {

	let months = [{id:"Jan",name:"January"},
				  {id:"Feb",name:"February"},
				  {id:"Mar",name:"March"},
				  {id:"Apr",name:"April"},
				  {id:"May",name:"May"},
				  {id:"Jun",name:"June"},
				  {id:"Jul",name:"July"},
				  {id:"Aug",name:"August"},
				  {id:"Sep",name:"September"},
				  {id:"Oct",name:"October"},
				  {id:"Nov",name:"November"},
				  {id:"Dec",name:"December"}];

	let Employee = new Vue({

		el: '#Employee',

		data: {
			vacationsRequests: [],
			vacationsPeriods: [],
			WorkRequests: [],
			vacationsTypes: [],
			tasksChartData: null,
			calendar:[],
			Months:months,
			Month: moment(new Date()).format("MMM"),
			daysNames : ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'],
			firstDay: 0,
			today: new Date().getDate() - 1,
			vacRequest:null,
			viewFile:''
		},

		methods: {
			popUp: function (req, popName) {
				let that = this;
				that.viewFile = '';
				req[popName] = true;
				this.vacRequest = Object.assign({}, req);

				setTimeout(function () {
					$('.' + popName).addClass('active');
				}, 500);
			},

			close: function () {
				this.vacRequest = false;
			},
			vacationsType: function (type) {
				let num = this.vacationsRequests.filter(x => x.Status == 4 && x['Vacation_Type_name'].trim() == type.trim())
				return num.length > 0 ? num.reduce((a,b) => a + b.Total_Days, 0) : 0;
			},
			
			// delete vacation
			deleteVac (id) {
				let that = this;
				swal({
					title: "Are you sure?",
					buttons: true
				}) .then((confirm) => {
					if (confirm) {

						$.ajax({
							type: "POST", 
							url: "../Hr_Portal/Employee.aspx/deleteVac",
							data:JSON.stringify({"id": {"id": id}}),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function (data) {
								that.vacationsRequests = that.vacationsRequests.filter(x => x.id != id)
							}
						});
					}
				});
			},

			// changing month on the calendar
			getMonths: function (month,year) {
				var arr = [];
				var start = moment(year+"-"+month,"YYYY-MMM");
				for(var end = moment(start).add(1,'month');  start.isBefore(end); start.add(1,'day')){
					arr.push(start.format('Y-M-D'));
				}
				this.calendar = arr;
				let str = moment((this.calendar[0])).format('ddd');
				this.firstDay = this.daysNames.indexOf(str);
			},
			
			filterCalendar: function (day) {
				let vac = this.vacationsPeriods.filter(x => new Date(day) >= new Date(x.Date_from.trim()) &&  new Date(day) <= new Date(x.Date_to.trim()));
				vac = vac.length > 0 ? 
					this.vacationsRequests.map(x => vac.filter(z => z.Request_id == x.id && x.Status == 4).length > 0 ? x : false ).filter(l => l) 
				: false;
				return vac.length > 0 ? vac : false;
			},

			createChart(chartId, chartData) {
				const ctx = document.getElementById(chartId);
				const myChart = new Chart(ctx, {
					type: chartData.type,
					data: chartData.data,
					options: chartData.options,
				});
			}
		},

		created: function () {
			let that = this;			

			//get [vacations Types] then get [vacations requests]
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Employee.aspx/gettypesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.vacationsTypes = JSON.parse(data.d).filter(x => !x.Hide);
				},
				complete: function () {
					setTimeout(function () {
						$('.responsive1').slick({
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
						// pre loader
						var loader = document.querySelector(".status-loader");
						loader.classList.add("disappear-loader");
					}, 1000);

					//get Vacations Requests
					$.ajax({
						type: "POST", 
						url: "../Hr_Portal/Employee.aspx/getVacations_Requests",
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function (data) {
							that.vacationsRequests = JSON.parse(data.d);
						},
						complete: function () {

							// dynamic chart shows a pie chart of Employee's vacations
							var ctx = document.getElementById('tasks-chart').getContext('2d'),
								color = [],
								labels = [],
								nums = [],
								dynamicColors = function() {
									var r = Math.floor(Math.random() * 255),
										g = Math.floor(Math.random() * 255),
										b = Math.floor(Math.random() * 255);
									return "rgb(" + r + "," + g + "," + b + ")";
								};
							for (var i in that.vacationsTypes) {
								labels.push(that.vacationsTypes[i].Type_Name);
								nums.push(that.vacationsType(that.vacationsTypes[i].Type_Name));
								color.push(dynamicColors());
							}

							var myChart = new Chart(ctx, {
								type: 'pie',
								data: {
									labels: labels,
									datasets: [{
										label: '# of vacations',
										data: nums,
										backgroundColor: color
									}]
								},
								options: {
									scales: {
										yAxes: [{
											ticks: {
												beginAtZero: true
											}
										}]
									},
									responsive:true,
									maintainAspectRatio:false
								}
							});
						}
					});

					//get Work_Request
					$.ajax({
						type: "POST", 
						url: "../Hr_Portal/Employee.aspx/getrequestsData",
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function (data) {
							that.requests = JSON.parse(data.d);
							that.WorkRequests = that.requests.filter(x => x.Canceled == false );

						}
					});
					
					//get getHR_Vacations_PeriodData
					$.ajax({
						type: "POST", 
						url: "../Hr_Portal/Employee.aspx/getHR_Vacations_PeriodData",
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function (data) {
							that.vacationsPeriods = JSON.parse(data.d);
						}
					});	


				}
			});


			//start calender
			this.getMonths(moment(new Date()).format("MMM"),new Date().getFullYear());
		}

	});
}