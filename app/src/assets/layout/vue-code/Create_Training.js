/******************** start Create_Training *********************/
if ($('#Create_Training').length != 0) {
	new Vue({

		el: '#Create_Training',

		data: {
			adminusersData: [],
			DeptsData: [],
			BranchData: [],
			RolesData: [],

			group: [],
			branches: [],
			departmens: [],
			roles: [],
			employees: [],

			New_Lecture: {
				Lecture_Title: "",
				Description: "",
				Instructor: "",

				Date: "",
				Time_From: "",
				Time_to: "",
				Total_Hours: 0,

				LectureFor_Group: "",
				LectureFor_Branch: "",
				LectureFor_Department: "",
				LectureFor_Role: "",
				LectureFor_Emp: "",

				Status_name: "pendding",
				Active: false,
				Condition:''
			},

			selectedName: "",
			Names: [],
			selectedEmail: "",
			Emails: [],
			selectedId: "",
			ids: [],
			selectedMobile: "",
			mobiles: [],

			branchEmps: [],

			employeeRole: [],
			employeeDepart: [],
		},

		watch: {
			group: function () {
				if(this.group.length == 0){
					let empty = this.branches;
					this.branches = [];
				}
			},
			
			branches: function () {
				this.branchEmps = this.adminusersData.filter(x => this.branches.includes(x.Branch_ID));
			},
		},


		methods: {
			goBack () {
				let selectForm    = document.getElementById("select-form"),
					submitLecture = document.getElementById("submit-lecture");
				
				submitLecture.classList.add("d-none");
				selectForm.classList.remove("d-none");
				
			},
			checkGroub (){
				if(this.group == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should select group first ! ",
						icon: "warning",
						dangerMode: true,
					});  
				}
			},
			filterNames(list, value){
				return list.filter(x => x.FullName.toLowerCase().indexOf(value) > -1)
			},
			namesList(event){
				if(event.key == "Enter"){this.Names.push(this.selectedName)}
			},
			filterEmails(list, value){
				return list.filter(x => x.Email.toLowerCase().indexOf(value) > -1)
			},
			emailsList(event){
				if(event.key == "Enter"){this.Emails.push(this.selectedEmail)}
			},
			filterId(list, value){
				return list.filter(x => x.Emp_id.toString().indexOf(value) > -1)
			},
			idList(event){
				if(event.key == "Enter"){this.ids.push(this.selectedId)}
			},
			filterMobile(list, value){
				return list.filter(x => x.Mobile_1.toString().indexOf(value) > -1)
			},
			mobileList(event){
				if(event.key == "Enter"){this.mobiles.push(this.selectedMobile)}
			},

			rolePopup: function (role) {
				this.employeeRole = this.branchEmps.filter(x => x.Role_id == role)
			},
			departmentPopup: function (dept) {
				this.employeeDepart = this.branchEmps.filter(x => x.Dept_id == dept)
			},

			SubmitLacture: function () {
				let ObjectD = Object.assign({}, this.New_Lecture),
					that = this;
				if(ObjectD.Instructor === "") {
					swal({
						title: "Error!",
						text: "Sorry, you should type the instructor name ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Lecture_Title == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should type the lecture title ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Description == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should type the lecture description ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Date == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture date ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Time_From == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture start time ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Time_to == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture end time ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Total_Hours == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture total hours ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else {	
					ObjectD.LectureFor_Group = that.group.map(x => x = "#" + x + "#").join("");
					ObjectD.LectureFor_Branch = that.branches.map(x => x = "#" + x + "#").join("");
					ObjectD.LectureFor_Department = that.departmens.map(x => x = "#" + x + "#").join("");
					ObjectD.LectureFor_Role = that.roles.map(x => x = "#" + x + "#").join("");
					ObjectD.LectureFor_Emp = that.employees.map(x => x = "#" + x + "#").join("");

					swal({
						title: "Are you sure you entered all data required for creating this lecture?",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					}).then((result) => {
						if (!result) {
							swal({
								title: 'Canceled',
								text : 'Sorry, the creation of this lecture has been cancelled!'
							})
						} else {
							$.ajax({  
								type: "POST",
								url: "../Zoom_Training/Create_Training.aspx/NewLecture",
								data: JSON.stringify({ "lecture": ObjectD }),
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function () {
									swal({
										title: 'Sweet!',
										text: "You successfully added anew lecture ...",
										icon: 'success',	
										dangerMode: true,
									});
									window.location = "Admin_Training.aspx";	  
								}
							})
						}
					})
				};
			},

			filterData: function () {
				let that          = this,
					selectForm    = document.getElementById("select-form"),
					submitLecture = document.getElementById("submit-lecture");
				if(that.group == false) {
					swal({
						title: "Error!",
						text: "Sorry, you should select group ! ",
						icon: "warning",
						dangerMode: true,
					});  
				}else if (that.branches.length == 0){
					swal({
						title: "Error!",
						text: "Sorry, you should choose at least one branch ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else {
					swal({
						title: "Are you sure from your selection?",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					}).then((result) => {
						if (!result) {
							swal({
								title: 'Canceled',
								text : 'Sorry, review your selection again!'
							})
						} else {
							submitLecture.classList.remove("d-none");
							selectForm.classList.add("d-none");
						}
					})
				}
			},
		},

		created: function () {
			let cobject = this;

			//get getDeptsData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Create_Training.aspx/getDeptsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.DeptsData = JSON.parse(data.d);
				}
			});


			//get getBranchData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Create_Training.aspx/getBranchData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.BranchData = JSON.parse(data.d);
				}
			});


			//get getRolesData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Create_Training.aspx/getRolesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.RolesData = JSON.parse(data.d);
				}
			});

			//get getadminusersData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Create_Training.aspx/getadminusersData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.adminusersData = JSON.parse(data.d);
				}
			});


		}

	});
}