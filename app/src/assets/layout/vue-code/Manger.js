/******************** start Manger *********************/
if ($('#Manger').length != 0) {
	let Manger = new Vue({

		el: '#Manger',

		data: {
			adminusersData: [],
			WorkRequests: [],
			VacRrq: [],
			allVacRrq: [],
			HR_Vacations_Period: [],
			HR_Employees_Vacation_Balance: [],
			Vacations_Requests:[],
			
			//filters
			oneCalendar: ['Casual','Annual', 'Mariage', 'PH'],
			twoCalendar: ['Sick Leave','Death','Military','Working Injury'],

			vacRequest: [],
			impRequest: [],
			viewFile: ''
		},

		methods: {
			popUp: function (req, popName) {
				this.viewFile = '';
				req['detailsPop'] = false;
				req[popName] = true;
				this.vacRequest = Object.assign({}, req);

				setTimeout(function () {
					$('.' + popName).addClass('active');
				}, 500);
			},

			close: function () {
				this.vacRequest = false;
			},
			impReqPopUp: function (req, popName) {
				req['impDetailsPop'] = false;
				//req['workRequestPop'] = false;
				req[popName] = true;
				this.impRequest = Object.assign({}, req);

				setTimeout(function () {
					$('.' + popName).addClass('active');
				}, 500);
			},

			closeimpReq: function () {
				this.workRequest = false;
			},

			updateWorkStatus: function (id, status) {
				let that = this;	

				// approve
				if (status == 2) {

					swal({
						title: "Are you sure?",
						buttons: true
					}) .then((confirm) => {

						if (confirm) {

							// render buttons in time
							that.WorkRequests.filter(x => x.id == id)[0].Status = status;
							$.ajax({
								type: "POST",
								url: "../Hr_Portal/Manger.aspx/updateStatus",
								data: JSON.stringify({"detail": {"id": id, "Status" : status}}),
								contentType: "application/json; charset=utf-8",
								dataType: "json",
							});
						}
					});

					// reject  
				} else if (status == 3) {  
					swal({
						title: "Are you sure?",
						icon: "warning",
						buttons: true,
						dangerMode: true,

					}) .then((willReject) => {

						if (willReject) {
							swal({
								title: 'Reason Of Rejection',
								content : 'input',
								showCancelButton: true,

							}).then(function(reason) {
								if (reason.trim()) {
									$.ajax({
										type: "POST",
										url: '../Hr_Portal/Manger.aspx/Rejection',
										data: JSON.stringify({ "request": {"Manager_Comment" : reason, "id":id, "Status": status} }),
										contentType: "application/json; charset=utf-8",
										dataType: "json",
										success: function () {
											// render buttons in time
											that.WorkRequests.filter(x => x.id == id)[0].Status = status;

											/**$.ajax({
												type: "POST",
												url: "../Hr_Portal/Manger.aspx/updateStatus",
												data: JSON.stringify({"detail": {"id": id, "Status" : status}}),
												contentType: "application/json; charset=utf-8",
												dataType: "json",
												success: function () {
													swal("This Request has been rejected!");
												}
											});**/

										}
									});
								} else {
									swal({
										title: 'Canceled',
										text : 'You did not write any reason!'
									});
								}
							});
						}
					});	  

				}

			},

			updateVacStatus: function (id, status) {
				let that = this;	

				// approve
				if (status == 2) {

					swal({
						title: "Are you sure?",
						buttons: true
					}) .then((confirm) => {

						if (confirm) {

							// render buttons in time
							that.VacRrq.filter(x => x.id == id)[0].Status = status;
							$.ajax({
								type: "POST",
								url: "../Hr_Portal/Manger.aspx/updateVacStatus",
								data: JSON.stringify({"detail": {"id": id, "Status" : status}}),
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function () {
									if (that.VacRrq.filter(x => x.id == id)[0].Vacation_Type_id == 103) {
										// update off days
										$.ajax({  
											type: "POST",
											url: "../Hr_Portal/Manger.aspx/updateStatus",
											data: JSON.stringify({ "detail": {"id":that.VacRrq.filter(x => x.id == id)[0].OFF_Day,"Status": 7} }),
											contentType: "application/json; charset=utf-8",
											dataType: "json",
											success: function () {
												swal({
													title: 'Sweet!',
													text: "You successfully approved this vacation request ...",
													icon: 'success',	
													dangerMode: true,
												});
											}
										});
									} else {
										swal({
											title: 'Sweet!',
											text: "You successfully approved this vacation request ...",
											icon: 'success',	
											dangerMode: true,
										});
									}

								}
							});
						}
					});

					// reject  
				} else if (status == 3) {  
					swal({
						title: "Are you sure?",
						icon: "warning",
						buttons: true,
						dangerMode: true,

					}) .then((willReject) => {

						if (willReject) {
							swal({
								title: 'Reason Of Rejection',
								content : 'input',
								showCancelButton: true,

							}).then(function(reason) {
								if (reason.trim()) {
									$.ajax({
										type: "POST",
										url: '../Hr_Portal/Manger.aspx/VacRejection',
										data: JSON.stringify({ "request": {"Manager_Comment" : reason, "id":id, "Status" : status } }),
										contentType: "application/json; charset=utf-8",
										dataType: "json",
										success: function () {
											// render buttons in time
											that.VacRrq.filter(x => x.id == id)[0].Status = status;

											if (that.VacRrq.filter(x => x.id == id)[0].Vacation_Type_id == 103) {
												// update off days
												$.ajax({  
													type: "POST",
													url: "../Hr_Portal/Manger.aspx/updateStatus",
													data: JSON.stringify({ "detail": {"id":that.VacRrq.filter(x => x.id == id)[0].OFF_Day,"Status": 4} }),
													contentType: "application/json; charset=utf-8",
													dataType: "json",
													success: function () {
														swal({
															text: "You Rejected this vacation request ...",
															icon: 'success',	
															dangerMode: true,
														});
													}
												});
											} else {
												swal({
													text: "You Rejected this vacation request ...",
													icon: 'success',	
													dangerMode: true,
												});
											}

										}
									});
								} else {
									swal({
										title: 'Canceled',
										text : 'You did not write any reason!'
									});
								}
							});
						}
					});	  

				}

			},
			deleteVacRequest: function (id, hide, i) {
               let cobject = this;
           	
				swal({
					title: "Are you sure you want to delete this vacation request?",
					icon: "warning",
					buttons: true,
					dangerMode: true,

			   }).then((result) => {
				  if (result) {
					 $.ajax({  
						 type: "POST",
						 url: "../Hr_Portal/Manger.aspx/updateHide",
						 data: JSON.stringify({ "detail": { "id": id, "Hide_Manager": hide } }),
						 contentType: "application/json; charset=utf-8",
						 dataType: "json",
						  success: function () {
							  cobject.VacRrq.splice(i, 1);

							   swal({
								  title: 'Sweet!',
								  text: "You successfully deleted this vacation request ...",
								  icon: 'success',	
								  dangerMode: true,
							  });

						  }
					  })
				  } else {
					  swal({
						  title: 'Canceled',
						  text : 'Sorry, you can not delete this vacation request!'
					  })
					}
				})		
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
						 url: "../Hr_Portal/Manger.aspx/updateWorkHide",
						 data: JSON.stringify({ "detail": { "id": id, "Manager_Hide": hide } }),
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
			//get adminusers
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Manger.aspx/getadminusersData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.adminusersData = JSON.parse(data.d);	
				}
			});

			//get Work_Request
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Manger.aspx/getrequestsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.requests = JSON.parse(data.d);
					cobject.WorkRequests = cobject.requests.filter(x => x.Canceled == false || x.Manager_Hide == false);

				}
			});	

			// get Vacations_Requests  
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Manger.aspx/getVacations_Requests",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Vacations_Requests = JSON.parse(data.d);
					cobject.allVacRrq = cobject.Vacations_Requests.filter(x => x.Hide == false);
					cobject.VacRrq = cobject.Vacations_Requests.filter(x => x.Hide == false || x.Hide_Manager == false);
				}
			});	
			
			// get HR_Employees_Vacation_BalanceI  
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Manger.aspx/getHR_Employees_Vacation_BalanceData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.HR_Employees_Vacation_Balance = JSON.parse(data.d);
				}
			});	
			
			// get HR_Vacations_Period  
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Manger.aspx/getHR_Vacations_PeriodData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.HR_Vacations_Period = JSON.parse(data.d);
				}
			});		


		}

	});
}