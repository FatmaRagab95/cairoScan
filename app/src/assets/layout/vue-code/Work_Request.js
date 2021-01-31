/******************** start Work_Request *********************/
if ($('#Work_Request').length != 0) {
	let Work_Request = new Vue({

		el: '#Work_Request',

		data: {
			multiDates: [],
			WorkRequests: [],

			NewHR_DaysOFF_Requests: {
				//Emp_id: 1,
				Date_From: "",
				Date_To: "",
				Requester_Comment: "",
				Status: 1,
			},
		},

		methods: {
			SubmitWorkRequest: function () {
				let that    = this,
					ObjectD = Object.assign({}, this.NewHR_DaysOFF_Requests);

				// get multi dates from calendar
				that.multiDates  = Array.from(new Set(that.multiDates));

				if(this.multiDates == ""){
					swal({
						title: "Error!",
						text: "Sorry you should pick at least one day ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (that.multiDates.filter(x => new Date(x).getTime() < new Date().getTime()).length > 0 ){
					swal({
						title: "Error!",
						text: "Sorry, You can't pick a date before today's date! ",
						icon: "warning",
						dangerMode: true,
					});
				}else if (that.multiDates.filter(x => that.WorkRequests.filter(z => z.Date_From == x).length > 0 ).length > 0){
					swal({
						title: "Error!",
						text: "Sorry, You picked this day once before! ",
						icon: "warning",
						dangerMode: true,
					});
				} else {
					for(let i = 0; i < that.multiDates.length ; i++){

						//ObjectD.Emp_id = this.adminusersData[0].admin_id;
						ObjectD.Date_From = this.multiDates[i];
						ObjectD.Date_To = this.multiDates[i];

						$.ajax({  
							type: "POST",
							url: "../Hr_Portal/Work_Request.aspx/NewHR_DaysOFF_Requests",
							data: JSON.stringify({ "HR_DayOFF_Request": ObjectD }),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								if(i == that.multiDates.length - 1 ){
									swal({
										title: 'Good job!',
										text: "You successfully added a work request ...",
										icon: 'success',	
									}).then((result) => {
										if (result) {
											window.location = "Work_Request.aspx";
										} else {
											swal({
												title: 'Canceled',
												text : 'Sorry, you can not add work request !'
											})
										}
									})  
								}

							}
						})
					}
				}

			},

			deleteWorkRequest: function (id, hide, i) {
				let cobject = this;
				swal({
					title: "Are you sure you want to delete this work request?",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				}).then((result) => {
					if (result) {
						$.ajax({  
							type: "POST",
							url: "../Hr_Portal/Work_Request.aspx/updateHide",
							data: JSON.stringify({ "detail": { "id": id, "Canceled": hide } }),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								cobject.WorkRequests.splice(i, 1);

								swal({
									title: 'Sweet!',
									text: "You successfully deleted this work request ...",
									icon: 'success',	
									dangerMode: true,
								});

							}
						})
					} else {
						swal({
							title: 'Canceled',
							text : 'Sorry, you can not delete this work request!'
						})
					}
				})
			},
		},


		created: function () {
			let cobject = this;

			//get Work_Request
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Work_Request.aspx/getrequestsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.requests = JSON.parse(data.d);
					cobject.WorkRequests = cobject.requests;

				}
			});		

			// get multi dates from calendar 
			$('body').on('click', '.ui-state-default', function (e) {
				e.preventDefault();
				cobject.multiDates.push($(this).closest('td').data('year') + '-' +  
										(parseInt($(this).closest('td').data('month')) + 1) +
										'-' + $(this).text());
			});

			$('body').on('click', '.ui-datepicker-clear-month', function () {
				cobject.multiDates = [];
			});

		}

	});
}