/******************** start Employee vacation *********************/
if ($('#Employee_Vacation').length != 0) {
	new Vue({

		el: '#Employee_Vacation',

		data: {
			adminusersData: null,
			Vacations: null,
			daysOff: [],
			
			startDate: "",
			endDate: "",
			totalDayes: 0,
			
			//filters
			oneCalendar: ['Casual','Annual', 'Mariage', 'PH'],
			twoCalendar: ['Sick Leave','Death','Military','Working Injury','Maternity'],
			attach: ['Death','Military','Working Injury','Mariage','Sick Leave','Maternity'],
			
			multiDates: [],
			offDay:{chosen: '',checked: '' },
			Employees_Balance: [],
			
			NewHR_Vacations_Requests: {
				Delegation_EmpCode: 0,
				Delegation_EmpName: "",
				Deduction_id: 1,
				Deduction_name: "Paid",
				Vacation_Type_id: 1,
				Vacation_Type_name: "",
				Vacation_Type_Others: "",
				Start_date: "",
				End_date: "",
				Total_Days: 1,
				Emergency_Contact: "",
				Requester_Comment: "",
				Attach_File: "",
				OFF_Day:0,
				Status: 1
			},
		},

		methods: {

			checkDay: function (exp,day) {
					return ((new Date(exp) - new Date(day)) / (24*60*60*1000)) >= 0;
			},
			SubmitVacationRequest: function () {

				var ObjectD = Object.assign({}, this.NewHR_Vacations_Requests);
				
				let that     = this,
					today    = new Date().toISOString().substring(0,10),
					type     = ObjectD.Vacation_Type_name.trim(),
					Days     = that.multiDates,
					DaysNum  = Days.length;

		         // get multi dates from calendar
				 this.multiDates  = Array.from(new Set(this.multiDates));

				if(that.impId === "") {
					swal({
						title: "Error!",
						text: "Sorry, you should choose the employee Id ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Delegation_EmpName == "0" || ObjectD.Delegation_EmpName == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose a colleague to delegate the job to while you are absent! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Deduction_name == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the type of your vacation ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (type == "" && ObjectD.Vacation_Type_Others == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the purpose of the vacation or type another reason ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if ((that.twoCalendar.includes(type) || ObjectD.Deduction_name == "Unpaid") && !that.checkDay(ObjectD.End_date,ObjectD.Start_date)){
					swal({
						title: "Error!",
						text: "Sorry, the start date is after the end date ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Emergency_Contact == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose how to contact you during the vacation period ! ",
						icon: "warning",
						dangerMode: true,
					});  
				}else {
					// check dates with two calendars
					if (that.twoCalendar.includes(type) || ObjectD.Deduction_name == "Unpaid") {
						if (ObjectD.Start_date == 0){
							swal({
								title: "Error!",
								text: "Sorry you should pick the start date of your vacation ! ",
								icon: "warning",
								dangerMode: true,
							}); 
							return false;
						}else if (ObjectD.End_date == 0){
							swal({
								title: "Error!",
								text: "Sorry, you should pick the end date of your vacation! ",
								icon: "warning",
								dangerMode: true,
							}); 
							return false
						} else if (!that.checkDay(ObjectD.Start_date,today)){
							swal({
								title: "Error!",
								text: "Sorry, You can't pick a date before today's date!",
								icon: "warning",
								dangerMode: true,
							}); 
							return false
						} else {
							that.multiDates = [{'Date_from': ObjectD.Start_date, 'Date_to': ObjectD.End_date}]
						}
					}

					// check dates with one calendar
					if (that.oneCalendar.includes(type)) {
						
						that.totalDayes = that.multiDates.length;

						if (that.multiDates.length == 0){
							swal({
								title: "Error!",
								text: "Sorry, you should pick the date of your vacation ! ",
								icon: "warning",
								dangerMode: true,
							});
							return false;
						} else {
							// check if all the dates are valid
							for (let i = 0; i < that.multiDates.length; i++) {
								if (!that.checkDay(that.multiDates[i].Date_from,today)) {
									swal({
										title: "Error!",
										text: "Sorry, You can't pick a date before today's date! ",
										icon: "warning",
										dangerMode: true,
									});
									return false;
								}
							}
						}
					}

					// check attachment file
					if (that.attach.includes(ObjectD.Vacation_Type_name) || ObjectD.Deduction_name == "Unpaid") {
						if (ObjectD['Attach_File'] == '') {			
							swal({
								title: "Error!",
								text: "Sorry, you should attach a file! ",
								icon: "warning",
								dangerMode: true,
							});
							return false
						} else {
							ObjectD['Attach_File'] = ObjectD['Attach_File'].split('\\').slice(-1)[0];
						}
					} else {
						ObjectD['Attach_File'] = ''
					}
					
					// check dates with off day
					if (ObjectD.Vacation_Type_id == 103) {
						
						// validate the off day that has been checked
						$.ajax({
							type: "POST", 
							url: "../Hr_Portal/Employee_Vacation.aspx/getDaysOffData",
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function (data) {
								let checkedDay = JSON.parse(data.d).filter(x => x.id == that.offDay.checked)[0];
								if (that.offDay.chosen == ''){
									swal({
										title: "Error!",
										text: "Sorry you should pick the day you want to take as an off day! ",
										icon: "warning",
										dangerMode: true,
									}); 
									return false;
								}else if (that.offDay.checked == ''){
									swal({
										title: "Error!",
										text: "Sorry, you should check on one of your off days first! ",
										icon: "warning",
										dangerMode: true,
									}); 
									return false
								} else if (!checkedDay) {
									swal({
										title: "Error!",
										text: "Sorry, The day you picked as an off day is not found!",
										icon: "warning",
										dangerMode: true,
									}); 
									return false
								} else if (new Date(that.offDay.chosen) < new Date() ||
										   new Date(that.offDay.chosen) < new Date(checkedDay)){
									swal({
										title: "Error!",
										text: "Sorry, You can't pick a date before today's date or the day you checked!",
										icon: "warning",
										dangerMode: true,
									}); 
									return false
								} else if ((new Date(new Date().getTime() + (31*24*60*60*1000)) - new Date(that.offDay.chosen)) / (30*24*60*60*1000) < 0){
									swal({
										title: "Error!",
										text: "Sorry, You can't pick a date after 30 days of the off day!",
										icon: "warning",
										dangerMode: true,
									}); 
									return false
								} else {
									that.multiDates = [{'Date_from': that.offDay.chosen, 'Date_to': that.offDay.chosen}];
									ObjectD.OFF_Day = that.offDay.checked;
									that.totalDayes = that.multiDates.length;
									sending();
								}
							}
						});
					}

					// checking balance
					else if (type == "Annual" || type == "Casual") {

						$.ajax({
							type: "POST", 
							url: "../Hr_Portal/Employee_Vacation.aspx/checkBalance",
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function (data) {
								that.Employees_Balance = JSON.parse(data.d)[0];
								if (that.Employees_Balance) {
									let totalBalance  = that.Employees_Balance.Annual_Balance,
										casualBalance = that.Employees_Balance.Casual_Balance,
										expOldBalance = that.Employees_Balance['Old_Balance_ExpirationDate'],
										minusOldBalance = that.Employees_Balance['Old_Balance'],
										currentMonth    = new Date().getMonth() + 1;

									// if the type is annual check the days that before the expiration date of the old balance
									if (that.checkDay(expOldBalance,today) && type == "Annual") {
										for (let i=0; i < Days.length; i++) {
											if (that.checkDay(expOldBalance,Days[i].Date_from) && minusOldBalance > 0) {
												minusOldBalance--;
												DaysNum--;
											}
										}
										if (DaysNum == 0) {
											sending();
										}
									}

									// if the old balance is not enough we start decrease the totalBalance
									if (DaysNum > 0) {
										if (currentMonth < 4) { // q1
											let total = that.Employees_Balance['Q1'];
											decrease(total);

										} else if (currentMonth < 7) { // q2
											let total = that.Employees_Balance['Q1'] + that.Employees_Balance['Q2'];
											decrease(total);

										} else if (currentMonth < 10) { // q3
											let total = that.Employees_Balance['Q1'] + that.Employees_Balance['Q2'] + that.Employees_Balance['Q3'];
											decrease(total);

										} else { // q4
											let total = that.Employees_Balance['Q1'] + that.Employees_Balance['Q2'] + that.Employees_Balance['Q3'] + that.Employees_Balance['Q4'];
											decrease(total);
										}
									}

									//decreasing the balance
									function decrease (total) {

										// if the vacation is casual
										if (type == "Casual") {
											if (DaysNum > casualBalance || DaysNum > total) {
												alert();
											} else {
												// check if the requester had requested casual vacation more than two times in the same month
												$.ajax({
													type: "POST", 
													url: "../Hr_Portal/Employee_Vacation.aspx/getPeriodsData",
													data:JSON.stringify({"detail": {"Emp_id": ObjectD.Requester_id}}),
													contentType: "application/json; charset=utf-8",
													dataType: "json",
													success: function (data) {
														let Dates = JSON.parse(data.d).map(x => x['Date_From']);
														if (Dates.length == 0 ) {sending();}
														for (let i=0; i < Days.length; i++) {

															let month =  new Date(Days[i]['Date_from'].trim()).getMonth()  + 1;

															if (Dates.filter(x => new Date(x.trim()).getMonth()  + 1 == month).length >=2) {
																swal({
																	title: 'Not Allowed!',
																	text: "Sorry, You can't have casual vacation more than two days in the same month!",
																	icon: 'warning',	
																	dangerMode: true,
																});
																return false;
															} else {
																if (i == Days.length - 1) {
																	sending();
																}
															}
														}
														
													}
												});
											}
										} else {
											return total >= DaysNum ? sending() : alert();
										}
									}
								} else {
									swal({
										title: 'No Balance Found!',
										text: "Sorry, there was a problem finding your balance!",
										icon: 'warning',	
										dangerMode: true,
									});
									return false;
								}

							}
						});			
						//alert if the balance is not enough
						function alert () {
							swal({
								title: 'Not Allowed!',
								text: "The current vacation balance is not enough to accept this request!",
								icon: 'warning',	
								dangerMode: true,
							});
							return false;
						}
					} else {
						sending();
					}

					/******/

					function sending () {
						ObjectD.Total_Days = parseInt(that.totalDayes);

						swal({
							title: "Sending...",
							text: "Please wait",
							showConfirmButton: false,
							allowOutsideClick: false
						});

						$.ajax({  
							type: "POST",
							url: "../Hr_Portal/Employee_Vacation.aspx/NewHR_Vacations_Requests",
							data: JSON.stringify({ "HR_Vacations_Request": ObjectD }),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								function ajaxFunc () {
									if (ObjectD.Vacation_Type_id == 103) {
										// update off days
										return $.ajax({  
											type: "POST",
											url: "../Hr_Portal/Employee_Vacation.aspx/updateOffDays",
											data: JSON.stringify({ "updateDays": {"id":that.offDay.checked,"Status": 6} }),
											contentType: "application/json; charset=utf-8",
											dataType: "json"
										});
									} else {
										return true
									}
								}
								$.when(ajaxFunc()).done(function (a) {
									for (let i = 0; i < that.multiDates.length; i++) {
										$.ajax({  
											type: "POST",
											url: "../Hr_Portal/Employee_Vacation.aspx/NewHR_Vacations_Days",
											data: JSON.stringify({ "Vacations_Days": that.multiDates[i] }),
											contentType: "application/json; charset=utf-8",
											dataType: "json",
											success: function () {
												if (i == that.multiDates.length - 1) {
													swal({
														title: 'Done!',
														text: "You successfully added vacation request ...",
														icon: 'success',	
													}).then((result) => {
														if (result) {
															if (ObjectD['Attach_File'] != "") {
																$('.uploadBtn').click();
															} else {
																 location.reload(); 
															}

														}
													});
												}
											},
											error: function () {								
												swal({
													title: "Error!",
													text: "Something went wrong, please try again! ",
													icon: "warning",
													dangerMode: true,
												});
											}
										}); // end of inserting days by ajax
									}
								});
							},
							error: function () {								
								swal({
									title: "Error!",
									text: "Something went wrong, please try again! ",
									icon: "warning",
									dangerMode: true,
								});
							}
						}); // end of inserting request by ajax
					}
				}
			},
		}, 
		watch: {
			
			'NewHR_Vacations_Requests.End_date': function () {
				let	dateFrom = this.NewHR_Vacations_Requests.Start_date,
					dateTo   = this.NewHR_Vacations_Requests.End_date;
				
				if(this.NewHR_Vacations_Requests.Start_date.length > 0) {
					this.totalDayes = ((new Date(dateTo) - new Date(dateFrom)) / 86400000) + 1
				}
			}
		},

		created: function () {
			let cobject = this;

			//get adminusers
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Employee_Vacation.aspx/getadminusersData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.adminusersData = JSON.parse(data.d);
				}
			});

			//get Vacation types
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Employee_Vacation.aspx/gettypesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.types = JSON.parse(data.d);
					cobject.Vacations = cobject.types;

				}
			});

            //get daysOff
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Employee_Vacation.aspx/getDaysOffData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.daysOff = JSON.parse(data.d);
				}
			});
			
			
			// get multi dates from calendar 
			$('body').on('click', '.ui-state-default', function (e) {
				e.preventDefault();
				let date = $(this).closest('td').data('year') + '-' +  
					 (parseInt($(this).closest('td').data('month')) + 1) +
					  '-' + $(this).text();
				
				cobject.multiDates.push({'Date_from': date, 'Date_to': date});
			});
			
			$('body').on('click', '.ui-datepicker-clear-month', function () {
				cobject.multiDates = [];
			});
		}

	});
}