/******************** start Hr_home *********************/
if ($('#Hr_home').length != 0) {
	let Hr_home = new Vue({

		el: '#Hr_home',

		data: {
			adminusersData: null,
			calendar:[],
			Month: moment(new Date()).format("MMM"),
			daysNames : ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'],
			firstDay: 0,
			today: new Date().getDate() - 1
		},

		methods: {
		},

		created: function () {
			let cobject = this;
			//get adminusers
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Hr_home.aspx/getadminusersData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.adminusersData = JSON.parse(data.d);
					console.log(cobject.adminusersData);	
				}
			});
			
			 function getMonths(month,year){
				 var arr = [];
				 var start = moment(year+"-"+month,"YYYY-MMM");
				 for(var end = moment(start).add(1,'month');  start.isBefore(end); start.add(1,'day')){
					 arr.push(start.format('D-ddd'));
				 }
				 return arr;
			 }
			this.calendar = getMonths(moment(new Date()).format("MMM"),new Date().getFullYear());
			let str = (this.calendar[0]).split('-')[1];
			this.firstDay = this.daysNames.indexOf(str);

		}

	});
}