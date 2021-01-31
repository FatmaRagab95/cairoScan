/******************** start Hr *********************/
if ($('#Hr').length != 0) {
	let Hr = new Vue({

		el: '#Hr',

		data: {
			adminusersData: [],
			HR_Vacation_Type: [],
			allVacRrq: [],
			VacRrq: null,
	
			Unpaid: [],

			WorkRequests: [],
			Employees_Balance: [],
			HR_Vacations_Period: [],

			vacRequest: [],
			activeType:'Annual',
			viewFile: ''
		},

		methods: {
			popUp: function (req, popName) {
				let that = this;
				that.viewFile = '';
				req['detailsPop'] = false;
				req[popName] = true;
				this.vacRequest = Object.assign({}, req);

				setTimeout(function () {
					$('.' + popName).addClass('active');
				}, 500);
				$.ajax({
					type: "POST", 
					url: "../Hr_Portal/Hr.aspx/checkBalance",
					data:JSON.stringify({"detail": {"Emp_id": that.vacRequest.Requester_id}}),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (data) {
						that.Employees_Balance = JSON.parse(data.d)[0];
					}
				});
			},

			close: function () {
				this.vacRequest = false;
			},

			updateWorkStatus: function (id, status, requester,dateTo) {
				let that = this;

				// approve
				if (status == 4) {
					swal({
						title: "Are you sure?",
						buttons: true
					}) .then((confirm) => {
						if (confirm) {
							let ExpirationDate = new Date(new Date(dateTo.trim()).getTime() + (31*24*60*60*1000)).toISOString().substr(0,10);
							$.ajax({
								type: "POST", 
								url: "../Hr_Portal/Hr.aspx/checkBalance",
								data:JSON.stringify({"detail": {"Emp_id": requester}}),
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function (data) {
									that.Employees_Balance = JSON.parse(data.d)[0];
									if (data.d.length > 0) {
										let OffBalance  = that.Employees_Balance.Off_Balance;
										
										// render buttons in time
										that.WorkRequests.filter(x => x.id == id)[0].Status = status;
										$.ajax({
											type: "POST",
											url: "../Hr_Portal/Hr.aspx/updateStatus",
											data: JSON.stringify({"detail": {"id": id, "Status" : status, "ExpirationDate": ExpirationDate}}),
											contentType: "application/json; charset=utf-8",
											dataType: "json",
										});

										$.ajax({
											type: "POST",
											url: "../Hr_Portal/Hr.aspx/updateOffDays",
											data: JSON.stringify({"detail": {"Emp_id": requester, "Off_Balance" : OffBalance + 1 }}),
											contentType: "application/json; charset=utf-8",
											dataType: "json",
										});
									}
								}
							});
						}
					});

					// reject  
				} else if (status == 5) {  
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
										url: '../Hr_Portal/Hr.aspx/Rejection',
										data: JSON.stringify({ "request": {"HR_Comment" : reason, "id":id, "Status": status} }),
										contentType: "application/json; charset=utf-8",
										dataType: "json",
										success: function () {
											// render buttons in time
											that.WorkRequests.filter(x => x.id == id)[0].Status = status;
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

			// a method for checking the expiration date
			checkDay: function (exp,day) {
				return ((new Date(exp) - new Date(day)) / (24*60*60*10000)) >= 0;
			},

			updateVacStatus: function (id, status, requester) {
				let that      = this,
					type      = that.allVacRrq.filter(x => x.id == id)[0].Vacation_Type_name.trim(),
					offDays   = 0;
											
				// approve
				if (status == 4) {
					swal({
						title: "Are you sure?",
						buttons: true
					}) .then((confirm) => {
						if (confirm) {
							// render buttons in time
							//that.allVacRrq.filter(x => x.id == id)[0].Status = status;

							// check dates with off day
							if (type == "OFFDayes") {
								$.ajax({
									type: "POST", 
									url: "../Hr_Portal/Hr.aspx/checkBalance",
									data:JSON.stringify({"detail": {"Emp_id": requester}}),
									contentType: "application/json; charset=utf-8",
									dataType: "json",
									success: function (data) {
										that.Employees_Balance = JSON.parse(data.d)[0];
										if (data.d.length > 0) {
											offDays = 1;
											updateBalance();
										} else {
											swal({
												title: 'No Balance Found!',
												text: "Sorry, there was a problem finding the balance for this employee!",
												icon: 'warning',	
												dangerMode: true,
											});
											return false;
										}
									}
								});
							}
						  else if (type == "Annual" || type == "Casual") {

							$.ajax({
								type: "POST", 
								url: "../Hr_Portal/Hr.aspx/checkBalance",
								data:JSON.stringify({"detail": {"Emp_id": requester}}),
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function (data) {
									that.Employees_Balance = JSON.parse(data.d)[0];
									if (data.d.length > 0) {
										let totalBalance  = that.Employees_Balance.Annual_Balance,
											casualBalance = that.Employees_Balance.Casual_Balance,
											Days          = that.HR_Vacations_Period.filter(x => x.Request_id == id).map(x => x.Date_from),
											DaysNum       = Days.length,
											expOldBalance = that.Employees_Balance['Old_Balance_ExpirationDate'],
											minusOldBalance = that.Employees_Balance['Old_Balance'],
											today           = new Date().toISOString().substring(0,10),
											currentMonth    = new Date().getMonth() + 1;

										// if the type is annual check the days that before the expiration date of the old balance
										if (that.checkDay(expOldBalance,today) && type == "Annual") {
											for (let i=0; i < Days.length; i++) {
												if (that.checkDay(expOldBalance,Days[i]) && minusOldBalance > 0) {
												    minusOldBalance--;
													DaysNum--;
												}
											}
											that.Employees_Balance['Old_Balance'] = minusOldBalance;
											if (DaysNum == 0) {
												updateBalance()
											}
										}
										
										// if the old balance is not enough we start decrease the totalBalance
										if (DaysNum > 0) {
											if (currentMonth < 4) { // q1
												let total = that.Employees_Balance['Q1'];
												decrease(total,1);

											} else if (currentMonth < 7) { // q2
												let total = that.Employees_Balance['Q1'] + that.Employees_Balance['Q2'];
												decrease(total,2);

											} else if (currentMonth < 10) { // q3
												let total = that.Employees_Balance['Q1'] + that.Employees_Balance['Q2'] + that.Employees_Balance['Q3'];
												decrease(total,3);

											} else { // q4
												let total = that.Employees_Balance['Q1'] + that.Employees_Balance['Q2'] + that.Employees_Balance['Q3'] + that.Employees_Balance['Q4'];
												decrease(total,4);
											}
										}

										//decreasing the balance
										function decrease (total,numOfq) {
											
											// if the vacation is casual
										  if (type == "Casual") {
											if (DaysNum > casualBalance || DaysNum > total) {
												alert();
											} else {
												// check if the requester had requested casual vacation more than two times in the same month
												$.ajax({
													type: "POST", 
													url: "../Hr_Portal/Hr.aspx/getPeriodsData",
													data:JSON.stringify({"detail": {"Emp_id": requester}}),
													contentType: "application/json; charset=utf-8",
													dataType: "json",
													success: function (data) {
														let Dates = JSON.parse(data.d).map(x => x['Date_from']);
														if (Dates.length == 0 ) {decQ();}
														for (let i=0; i < Days.length; i++) {

															let month =  new Date(Days[i]).getMonth()  + 1;

															if (Dates.filter(x => new Date(x.trim()).getMonth()  + 1 == month).length >=2) {
																swal({
																	title: 'Not Allowed!',
																	text: "Sorry, This Employee can't have casual vacation more than two days in the same month!",
																	icon: 'warning',	
																	dangerMode: true,
																});
																return false;
															} else {
																if (i == Days.length - 1) {
																	decQ();
																}
															}
														}
														
													}
												});
											}
										} else {
											return total >= DaysNum ? decQ() : alert();
										}
											
											// decreasing the quarters
											function decQ () {
												if (total >= DaysNum) {
													for (let i = 1; i <= numOfq; i++) {
														if (DaysNum > 0) {
															let Num = DaysNum  - that.Employees_Balance['Q'+ i];
															that.Employees_Balance['Q' + i] = that.Employees_Balance['Q' + i] < DaysNum ?
																0 : that.Employees_Balance['Q'+ i] - DaysNum;
															DaysNum = Num;
														} else {
															//update balance
															updateBalance();
															return false;
														}
													}
													if (DaysNum <= 0) {
														updateBalance();
													}

												} else {
													alert();
												}
											}
											
										}
										
										//alert if the balance is not enough
										function alert () {
											swal({
												title: 'Not Allowed!',
												text: "The current vacation balance for this Employee is not enough to accept this request!",
												icon: 'warning',	
												dangerMode: true,
											});
											return false;
										}
									} else {
										swal({
											title: 'No Balance Found!',
											text: "Sorry, there was a problem finding the balance for this employee!",
											icon: 'warning',	
											dangerMode: true,
										});
										return false;
									}

								}
							});
						  } else {
							  updateStatus();
						  } 
					
					//updateBalance
					function updateBalance() {
						that.Employees_Balance['Annual_Balance'] = that.Employees_Balance['Q1'] + that.Employees_Balance['Q2'] + that.Employees_Balance['Q3'] + that.Employees_Balance['Q4'];
						that.Employees_Balance['Off_Balance'] = that.Employees_Balance['Off_Balance'] - offDays;

						$.ajax({
							type: "POST",
							url: "../Hr_Portal/Hr.aspx/updateBalance",
							data: JSON.stringify({"detail": that.Employees_Balance}),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								updateStatus();
							},
							error: function () {
								swal({
									title: 'Error!',
									text: "Something went wrong, Please try again later!",
									icon: 'warning',	
									dangerMode: true,
								});
							}
						});
				  }
				
				function updateStatus () {

					that.allVacRrq.filter(x => x.id == id)[0].Status = status;

					$.ajax({
						type: "POST",
						url: "../Hr_Portal/Hr.aspx/updateVacStatus",
						data: JSON.stringify({"detail": {"id": id, "Status" : status}}),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function () {
							if (type != "Annual" || type != "Casual") {
								swal({
									title: 'Sweet!',
									text: "You successfully approved this vacation request ...",
									icon: 'success'
								});
							}
							
							if (that.VacRrq.filter(x => x.id == id)[0].Vacation_Type_id == 103) {
								let DayId = that.VacRrq.filter(x => x.id == id)[0].OFF_Day;
								let ExpirationDate = that.WorkRequests.filter(x => x.id == DayId)[0].ExpirationDate;

								// update off days
								$.ajax({  
									type: "POST",
									url: "../Hr_Portal/Hr.aspx/updateStatus",
									data: JSON.stringify({"detail": {"id": DayId, "Status" : 8, "ExpirationDate": ExpirationDate}}),
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
							}
							
							// render buttons in time
							that.allVacRrq.filter(x => x.id == id)[0].Status = status;
						}
					}); 
					}
				}
			  });
			 }
				// reject  
             else if (status == 5) {  
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
										url: '../Hr_Portal/Hr.aspx/VacRejection',
										data: JSON.stringify({ "request": {"HR_Comment" : reason, "id":id, "Status" : status } }),
										contentType: "application/json; charset=utf-8",
										dataType: "json",
										success: function () {
											// render buttons in time
											that.allVacRrq.filter(x => x.id == id)[0].Status = status;
											
											if (that.VacRrq.filter(x => x.id == id)[0].Vacation_Type_id == 103) {
												let DayId = that.VacRrq.filter(x => x.id == id)[0].OFF_Day;
												let ExpirationDate = that.WorkRequests.filter(x => x.id == DayId)[0].ExpirationDate;

												// update off days
												$.ajax({  
													type: "POST",
													url: "../Hr_Portal/Hr.aspx/updateStatus",
													data: JSON.stringify({"detail": {"id": DayId, "Status" : 4, "ExpirationDate": ExpirationDate}}),
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
							url: "../Hr_Portal/Hr.aspx/updateHide",
							data: JSON.stringify({ "detail": { "id": id, "HR_Hide": hide } }),
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
						 url: "../Hr_Portal/Hr.aspx/updateWorkHide",
						 data: JSON.stringify({ "detail": { "id": id, "HR_Hide": hide } }),
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
				url: "../Hr_Portal/Hr.aspx/getadminusersData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.adminusersData = JSON.parse(data.d);
				}
			});

			// get Vacations_Requests  
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Hr.aspx/getVacations_Requests",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Vacations_Requests = JSON.parse(data.d);
					cobject.allVacRrq = cobject.Vacations_Requests.filter(x => x.Hide == false && (x.Status == 2 || x.Status == 4 || x.Status == 5));
					cobject.VacRrq = cobject.Vacations_Requests.filter(x => x.Hide == false || x.HR_Hide == false);

					cobject.Unpaid = cobject.allVacRrq.filter(x => x.Deduction_name.trim() == 'Unpaid');

				}
			});

			//get Work_Request
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Hr.aspx/getrequestsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.requests = JSON.parse(data.d);
					cobject.WorkRequests = cobject.requests.filter(x => (x.Status == 2 || x.Status == 4 || x.Status == 5 || x.Status == 6 || x.Status == 7 || x.Status == 8 || x.Canceled == false || x.HR_Hide == false));

				}
			});	

			// get HR_Vacations_Period  
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Hr.aspx/getHR_Vacations_PeriodData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.HR_Vacations_Period = JSON.parse(data.d);

				}
			});

			// get HR_Vacation_Type
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Hr.aspx/gettypesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.HR_Vacation_Type = JSON.parse(data.d).filter(x => x.Hide != true);
				}
			});	
			
		}

	});
}