/******************** start Employee_Balance *********************/

if ($('#Employee_Balance').length != 0) {
	let Employee_Balance = new Vue({

		el: '#Employee_Balance',

		data: {
			adminusersData: null,
			Employees_Balance: null,

			empBalance: "",
			newBalance: 0,
			quarterOne: 0,
			quarterTwo: 0,
			quarterThree: 0,
			quarterFour: 0,
			casualDays: 0,

			fewBalance: 21,
			larageBalance: 30,

			impId: 0,

			impName: "",
			impDisc: "",
			impBranch: "",
			impDept:"",

			displayTotalBalance: 0,
			displayOldBalance: 0,
			displayquarterOne: 0,
			displayquarterTwo: 0,
			displayquarterThree: 0,
			displayquarterFour: 0,
			displaycasualDays: 0,
			displayBalanceExpirationDate: "",

			EmpVacBalance: {
				Emp_id: 0,
				Annual_Balance: 0,
				Casual_Balance: 0,
				Q1: 1,                      
				Q1_DateTo: "31-3",                  
				Q2: 1,                        
				Q2_DateTo: "31-6",                 
				Q3: 1,                        
				Q3_DateTo: "31-9",                 
				Q4: 1,                       
				Q4_DateTo: "31-12", 
				Old_Balance: 0,
				Old_Balance_ExpirationDate: "",
			}
		},

		methods: {
			showEdid: function () {
				let insertBalance = document.getElementById("insert-balance"),
					editBalance = document.getElementById("edit-balance"),
					displayBalance = document.getElementById("display-balance");

				displayBalance.classList.add("d-none");
				editBalance.classList.remove("d-none");

			},
			edidBalance: function () {
				if ($('form').is(':valid')) {
					let sum = parseInt(this.displayquarterOne) +
						parseInt(this.displayquarterTwo) + parseInt(this.displayquarterThree) + parseInt(this.displayquarterFour),

						balance = {
						id: this.Employees_Balance.filter(x => x.Emp_id == this.impId)[0].id, 
						Emp_id: this.impId,
						Annual_Balance: this.displayTotalBalance,
						Casual_Balance: this.displaycasualDays,
						Q1: this.displayquarterOne,                              
						Q2: this.displayquarterTwo,                                         
						Q3: this.displayquarterThree,                                         
						Q4: this.displayquarterFour,                        
						Old_Balance: this.displayOldBalance,
						Old_Balance_ExpirationDate: this.displayBalanceExpirationDate,
						},
						Newbalance = Object.assign({}, balance);

					if (sum == this.displayTotalBalance) {
						swal({
							title: "Are you sure?",
							buttons: true
						}) .then((confirm) => {
							if (confirm) {
								$.ajax({
									type: "POST",
									url: "../Hr_Portal/Employee_Balance.aspx/updateDetails",
									data: JSON.stringify({ "detail": Newbalance }),
									contentType: "application/json; charset=utf-8",
									dataType: "json",
									success: function () {
										swal({
											title: 'Sweet!',
											text: "You successfully updated the employee balance ...",
											icon: 'success',	
											dangerMode: true,
										});

									}
								});
							}
						});
					} else {
						swal({
							title: "Error!",
							text: "The total balance should be the sum of the four quarters! ",
							icon: "warning",
							dangerMode: true,
						});
					}
				} else {
					swal({
						title: "Not Valid!",
						text: "Please check your inputs! ",
						icon: "warning",
						dangerMode: true,
					}); 
				}
			},
			setBalance: function () {
			  
				let ObjectD = Object.assign({}, this.EmpVacBalance), 
					that = this;

				if (that.impId == 0){
					swal({
						title: "Error!",
						text: "Sorry you should choose the Employee Id  ! ",
						icon: "warning",
						dangerMode: true,
					});  
				}else if (that.empBalance == "" && that.newBalance == 0){
					swal({
						title: "Error!",
						text: "Sorry you should choose the Employee Total Balance ! ",
						icon: "warning",
						dangerMode: true,
					});  
				}else if ($("form").is(':valid')) {
					if (this.empBalance == "other..." ) {
						if (this.newBalance == (this.quarterOne + this.quarterTwo + this.quarterThree + this.quarterFour)) {
							ObjectD.Annual_Balance = that.newBalance;
							sendData();
						} else {
							swal({
								title: "Error!",
								text: "The total balance should be the sum of the four quarters! ",
								icon: "warning",
								dangerMode: true,
							});
						}
					} else {
						if(this.empBalance == "21 days") {
							ObjectD.Annual_Balance = 21
						}else if(this.empBalance == "30 days"){
							ObjectD.Annual_Balance = 30
						}
						sendData();
					}
					function sendData () {
						ObjectD.Emp_id = that.impId;
						ObjectD.Q1 = that.quarterOne;
						ObjectD.Q2 = that.quarterTwo;
						ObjectD.Q3 = that.quarterThree;
						ObjectD.Q4 = that.quarterFour;
						ObjectD.Casual_Balance = that.casualDays;

						$.ajax({  
							type: "POST",
							url: "../Hr_Portal/Employee_Balance.aspx/EmpVacBalance",
							data: JSON.stringify({ "Balance": ObjectD }),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								swal({
									title: 'Good job!',
									text: "You successfully added an employee vacation balance ...",
									icon: 'success',	
								}).then((result) => {
									if (result) {
										window.location = "Employee_Balance.aspx";
									} else {
										swal({
											title: 'Canceled',
											text : 'Sorry, you can not add employee vacation balance !'
										})
									}
								})  
							}
						});
					}

				} else {
				  	swal({
						title: "Not Valid!",
						text: "Please check your inputs! ",
						icon: "warning",
						dangerMode: true,
					}); 
			  }
			},

		},
		watch: {
			impId: function () {
				let insertBalance = document.getElementById("insert-balance"),
					editBalance = document.getElementById("edit-balance"),
					displayBalance = document.getElementById("display-balance");

				this.impBranch = this.adminusersData.filter(x => x.Emp_ID == this.impId)[0].Branch_name;
				this.impName   = this.adminusersData.filter(x => x.Emp_ID == this.impId)[0].FullName;
				this.impDisc   = this.adminusersData.filter(x => x.Emp_ID == this.impId)[0].Job_Description;
				this.impDept   = this.adminusersData.filter(x => x.Emp_ID == this.impId)[0].Dept_name;

				if(this.Employees_Balance.filter(x => x.Emp_id == this.impId).length > 0){
					displayBalance.classList.remove("d-none");
					editBalance.classList.add("d-none");
					insertBalance.classList.add("d-none");
				}else{
					displayBalance.classList.add("d-none");
					editBalance.classList.add("d-none");
					insertBalance.classList.remove("d-none");
				};

				this.displayTotalBalance          = this.Employees_Balance.filter(x => x.Emp_id == this.impId)[0].Annual_Balance;
				this.displayOldBalance            = this.Employees_Balance.filter(x => x.Emp_id == this.impId)[0].Old_Balance;
				this.displayquarterOne            = this.Employees_Balance.filter(x => x.Emp_id == this.impId)[0].Q1;
				this.displayquarterTwo            = this.Employees_Balance.filter(x => x.Emp_id == this.impId)[0].Q2;
				this.displayquarterThree          = this.Employees_Balance.filter(x => x.Emp_id == this.impId)[0].Q3;
				this.displayquarterFour           = this.Employees_Balance.filter(x => x.Emp_id == this.impId)[0].Q4;
				this.displaycasualDays            = this.Employees_Balance.filter(x => x.Emp_id == this.impId)[0].Casual_Balance;
				this.displayBalanceExpirationDate = this.Employees_Balance.filter(x => x.Emp_id == this.impId)[0].Old_Balance_ExpirationDate;

			},
			empBalance: function () {
				
				if(this.empBalance == "21 days"){
					this.quarterOne = 5;
					this.quarterTwo = 5;
					this.quarterThree = 5;
					this.quarterFour = 6;
					this.casualDays = 6;

				}else if(this.empBalance == "30 days"){
					this.quarterOne = 7;
					this.quarterTwo = 7;
					this.quarterThree = 7;
					this.quarterFour = 9;
					this.casualDays = 7;

				}else{
					this.quarterOne = 0;
					this.quarterTwo = 0;
					this.quarterThree = 0;
					this.quarterFour = 0;
					this.casualDays = 0;
				}
			}
		},


		created: function () {
			let cobject = this;

			//get adminusers
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Employee_Balance.aspx/getadminusersData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.adminusersData = JSON.parse(data.d);	
				}
			});

			//get HR_Employees_Vacation_Balance
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Employee_Balance.aspx/getEmployees_BalanceData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Employees_Balance = JSON.parse(data.d);	
				}
			});

		}

	});
}