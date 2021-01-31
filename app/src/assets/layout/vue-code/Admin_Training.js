/******************** start Admin_Training *********************/
if ($('#Admin_Training').length != 0) {
	let Admin_Training = new Vue({

		el: '#Admin_Training',

		data: {
			Lectures: [],
			Training_Lecture: [],
			editLecture: [],

			Training_Attachments: [],
			Training_JoinsData: [],

			adminusersData: [],
			DeptsData: [],
			BranchData: [],
			RolesData: [],

			checkAttach: "",

			File_Type: "",
			File_Name: "",
			File_URL: "",

			Attach: {
				File_Type: "",
				File_Name: "",
				File_URL: "",
				Zoom_link: "",
				Zoom_Uname: "",
				Zoom_Password: "",
				File_Ext: "",
				Training_id: 0,
			},

			lectureDetails: [],

			selectedName: "",
			Names: [],
			selectedEmail: "",
			Emails: [],
			selectedId: "",
			ids: [],
			selectedMobile: "",
			mobiles: [],

			branches: [],
			branchEmps: [],

			employeeRole: [],
			employeeDepart: [],

			employees: [],
			zoomLinkDetails: [],
		},

		watch: {
			branches: function () {
				this.updateEmps();
			},
		},

		methods: {
			zoomLinkPop (link){
				this.zoomLinkDetails = Object.assign({}, link);
			},
			checkGroub (group){
				if(group == ""){
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
			popUp: function (lec, popName, branches) {
				lec['detailsPop'] = false;
				lec['editPop'] = false;
				lec['attachPop'] = false;
				lec[popName] = true;
				this.lectureDetails = Object.assign({}, lec);

				this.branches = lec['LectureFor_Branch'].map(x => parseInt(x));
				this.updateEmps();
				this.employees = lec['LectureFor_Emp'];

				setTimeout(function () {
					$('.' + popName).addClass('active');
				}, 500);
			},

			close: function () {
				this.lectureDetails = false;
			},

			updateEmps() {
				this.branchEmps = this.adminusersData.filter(x => this.branches.includes(x.Branch_ID));
			},

			/**	deleteLacture: function (id, hide, i) {
				let cobject = this;

				swal({
					title: "Are you sure you want to delete this lecture ?",
					icon: "warning",
					buttons: true,
					dangerMode: true,

				}).then((result) => {
					if (result) {
						$.ajax({  
							type: "POST",
							url: "../Zoom_Training/Display_Training.aspx/updateHide",
							data: JSON.stringify({ "detail": { "ID": id, "Hide": hide } }),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								cobject.Training_Lecture.splice(i, 1);
								swal({
									title: 'Sweet!',
									text: "You successfully deleted this lecture ...",
									icon: 'success',	
									dangerMode: true,
								});

							}
						})
					} else {
						swal({
							title: 'Canceled',
							text : 'Sorry, you can not delete this lecture!'
						})
					}
				})		
			},**/

			deleteLacture: function (id, hide, i) {
				let cobject = this,
					nowDate = new Date().toISOString().substring(0,10);
				swal({
					title: "Are you sure you want to delete this lecture ?",
					icon: "warning",
					buttons: true,
					dangerMode: true,

				}).then((willDelete) => {
					if (willDelete) {
						swal({
							title: 'Reason Of Deletion',
							content: 'input',
							showCancelButton: true,

						}).then(function (reason) {
							if (reason.trim()) {
								$.ajax({
									type: "POST",
									url: "../Zoom_Training/Admin_Training.aspx/updateHide",
									data: JSON.stringify({ "detail": { "ID": id, "Hide": hide, "Delete_reason": reason, "Deleted_date": nowDate} }),
									contentType: "application/json; charset=utf-8",
									dataType: "json",
									success: function () {
										cobject.Training_Lecture.splice(i, 1);
										swal({
											title: 'Sweet!',
											text: "You successfully deleted this lecture ...",
											icon: 'success',	
											dangerMode: true,
										});

									}
								});
							} else {
								swal({
									title: 'Canceled',
									text: 'You did not write any reason!'
								});
							}
						});
					} else {
						swal("this action has been canceled!");
					}
				});
			},

			updateStatus: function (id, status) {
				let that = this;	
				swal({
					title: "Are you sure?",
					buttons: true
				}) .then((confirm) => {
					if (confirm) {
						$.ajax({
							type: "POST",
							url: "../Zoom_Training/Admin_Training.aspx/updateStatus",
							data: JSON.stringify({"detail": {"ID": id, "Status_name" : status}}),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								swal({
									title: 'Sweet!',
									text: "You successfully updated the lecture status ...",
									icon: 'success',	
									dangerMode: true,
								});
								window.location = "Admin_Training.aspx";	  
							}
						});
					}
				});
			},

			editLacture: function (ID, Lecture_Title, Description, Date, Time_From, Time_to, Total_Hours, Instructor, group, branch, depart, role, emp) {
				let that = this,
					updatedLecture = {
						"ID": ID,
						"Lecture_Title": Lecture_Title,
						"Description": Description,
						"Date": Date,
						"Time_From": Time_From,
						"Time_to": Time_to,
						"Total_Hours": Total_Hours,
						"Instructor": Instructor,
						"LectureFor_Group": group,
						"LectureFor_Branch": branch,
						"LectureFor_Department": depart,
						"LectureFor_Role": role,
						"LectureFor_Emp": emp
					};

				if(updatedLecture.Instructor === "") {
					swal({
						title: "Error!",
						text: "Sorry, you should type the instructor name ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (updatedLecture.Lecture_Title == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should type the lecture title ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (updatedLecture.Description == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should type the lecture description ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (updatedLecture.Date == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture date ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (updatedLecture.Time_From == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture start time ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (updatedLecture.Time_to == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture end time ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (updatedLecture.Total_Hours == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture total hours ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (updatedLecture.LectureFor_Group.length == 0){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture for ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (this.branches.length == 0){
					swal({
						title: "Error!",
						text: "Sorry, you should choose at least one branch ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else {
					updatedLecture.LectureFor_Group = updatedLecture.LectureFor_Group.map(x => x = "#" + x + "#").join("");
					updatedLecture.LectureFor_Branch = this.branches.map(x => x = "#" + x + "#").join("");
					updatedLecture.LectureFor_Emp = this.employees.map(x => x = "#" + x + "#").join("");
					updatedLecture.LectureFor_Department = updatedLecture.LectureFor_Department.map(x => x = "#" + x + "#").join("");
					updatedLecture.LectureFor_Role = updatedLecture.LectureFor_Role.map(x => x = "#" + x + "#").join("");

					swal({
						title: "Are you sure?",
						buttons: true
					}) .then((confirm) => {
						if (confirm) {
							$.ajax({
								type: "POST",
								url: "../Zoom_Training/Admin_Training.aspx/updateLecture",
								data: JSON.stringify({"detail": updatedLecture}),
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function () {
									swal({
										title: 'Sweet!',
										text: "You successfully updated this lecture ...",
										icon: 'success',	
										dangerMode: true,
									});
									window.location = "Admin_Training.aspx";	  
								}
							});
						}
					});
				}
			},

			updateActive: function (id, active) {
				let that = this;	
				swal({
					title: "Are you sure?",
					buttons: true
				}) .then((confirm) => {
					if (confirm) {
						$.ajax({
							type: "POST",
							url: "../Zoom_Training/Admin_Training.aspx/updateActive",
							data: JSON.stringify({"detail": {"ID": id, "Active" : active}}),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								swal({
									title: 'Sweet!',
									text: "You successfully activate this lecture ...",
									icon: 'success',	
									dangerMode: true,
								});
								window.location = "Admin_Training.aspx";	  
							}
						});
					}
				});
			},

			submitAttach: function (id) {
				let ObjectD = Object.assign({}, this.Attach),
					that = this;

				if (ObjectD.Zoom_link == ""){
					swal({
						title: "Error!",
						text: "Sorry, please enter the zomm link for the licture ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Zoom_Uname == ""){
					swal({
						title: "Error!",
						text: "Sorry, please enter the zomm link's user name ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if (ObjectD.Zoom_Password == ""){
					swal({
						title: "Error!",
						text: "Sorry, please enter the zomm link's password ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else {	
					ObjectD.Training_id = id;
					ObjectD.File_Ext = ObjectD.File_URL.substr(ObjectD.File_URL.indexOf('.') + 1);
					ObjectD['File_URL'] = ObjectD['File_URL'].split('\\').slice(-1)[0];

					swal({
						title: "Are you sure you entered all data required ..",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					}).then((result) => {
						if (!result) {
							swal({
								title: 'Canceled',
								text : 'Sorry, the process has been cancelled!'
							})
						} else {
							$.ajax({  
								type: "POST",
								url: "../Zoom_Training/Admin_Training.aspx/AttachFiles",
								data: JSON.stringify({ "lecture": ObjectD }),
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function () {
									$('.uploadBtn').click();
									swal({
										title: 'Sweet!',
										text: "You successfully added an Attachment ...",
										icon: 'success',
									});  
									window.location = "Admin_Training.aspx";
								}
							})
						}
					})
				};
			},

			addAttach: function (id, lec) {
				let that = this,
				File_Ext = this.File_URL.substr(this.File_URL.indexOf('.') + 1);
				
				swal({
					title: "Are you sure?",
					buttons: true
				}) .then((confirm) => {
					if (confirm) {
						$.ajax({
							type: "POST",
							url: "../Zoom_Training/Admin_Training.aspx/updateAttach",
							data: JSON.stringify({"detail": {"id": id, "Training_id" : lec, "File_Type" : that.File_Type,"File_Name": that.File_Name ,"File_Ext": File_Ext, "File_URL": that.File_URL }}),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								swal({
									title: 'Sweet!',
									text: "You successfully add an attachment ...",
									icon: 'success',	
									dangerMode: true,
								});
								window.location = "Admin_Training.aspx";	  
							}
						});
					}
				});
			},


		},

		created: function () {
			let cobject = this;

			//get Training_Lecture
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Admin_Training.aspx/getTraining_LectureData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Lectures = JSON.parse(data.d);
					cobject.Training_Lecture = cobject.Lectures.filter(x => x.Hide == false);

					cobject.editLecture = cobject.Training_Lecture;

					cobject.editLecture.map(x => {x.LectureFor_Branch = x.LectureFor_Branch.split("#").filter(z => z != "" && z != ',' ? parseInt(z) : false); 
												  x.LectureFor_Department = x.LectureFor_Department.split("#").filter(z => z != "" && z != ',' ? z : false);
												  x.LectureFor_Group = x.LectureFor_Group.split("#").filter(z => z != "" && z != ',' ? z : false);
												  x.LectureFor_Role = x.LectureFor_Role.split("#").filter(z => z != "" && z != ',' ? z : false); 
												  x.LectureFor_Emp = x.LectureFor_Emp.split("#").filter(z => z != "" && z != ',' ? z : false)});
				}
			});

			//get Training_Attachments
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Admin_Training.aspx/getTraining_AttachmentsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Training_Attachments = JSON.parse(data.d);
				}
			});

			//get getDeptsData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Admin_Training.aspx/getDeptsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.DeptsData = JSON.parse(data.d);
				}
			});


			//get getBranchData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Admin_Training.aspx/getBranchData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.BranchData = JSON.parse(data.d);
				}
			});


			//get getRolesData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Admin_Training.aspx/getRolesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.RolesData = JSON.parse(data.d);
				}
			});


			//get getadminusersData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Admin_Training.aspx/getadminusersData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.adminusersData = JSON.parse(data.d);
				}
			});

			//get Training_Joins
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Admin_Training.aspx/getTraining_JoinsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Training_JoinsData = JSON.parse(data.d);
				}
			});



		}

	});
}