/******************** start IT_Training *********************/
if ($('#IT_Training').length != 0) {
	let IT_Training = new Vue({

		el: '#IT_Training',

		data: {
			Lectures: [],
			Training_Lecture: [],
			lectureDetails: [],
		},

		methods: {
			popUp: function (lec, popName) {
				lec['detailsPop'] = false;
				lec['editPop'] = false;
				lec[popName] = true;
				this.lectureDetails = Object.assign({}, lec);

				setTimeout(function () {
					$('.' + popName).addClass('active');
				}, 500);
			},

			close: function () {
				this.lectureDetails = false;
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
									url: "../Zoom_Training/IT_Training.aspx/updateHide",
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
							url: "../Zoom_Training/IT_Training.aspx/updateStatus",
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
								window.location = "Display_Training.aspx";	  
							}
						});
					}
				});
			},
			editLacture: function (ID, Lecture_Title, Description, Date, Time_From, Time_to, Total_Hours, Zoom_Link, Final_JoinDate, Instructor, Lecture_For) {
				let that = this,
					updatedLecture = {
						"ID": ID,
						"Lecture_Title": Lecture_Title,
						"Description": Description,
						"Date": Date,
						"Time_From": Time_From,
						"Time_to": Time_to,
						"Total_Hours": Total_Hours,
						"Zoom_Link": Zoom_Link,
						"Final_JoinDate": Final_JoinDate,
						"Instructor": Instructor,
						"Lecture_For": Lecture_For	
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
				}else if (updatedLecture.Zoom_Link == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should type the lecture zoom link ! ",
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
				} else if (updatedLecture.Final_JoinDate == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture final join date ! ",
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
				} else if (updatedLecture.Lecture_For == ""){
					swal({
						title: "Error!",
						text: "Sorry, you should choose the lecture for ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else {
					swal({
						title: "Are you sure?",
						buttons: true
					}) .then((confirm) => {
						if (confirm) {
							$.ajax({
								type: "POST",
								url: "../Zoom_Training/IT_Training.aspx/updateLecture",
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
									window.location = "Display_Training.aspx";	  
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
							url: "../Zoom_Training/IT_Training.aspx/updateActive",
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
								window.location = "Display_Training.aspx";	  
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
				url: "../Zoom_Training/IT_Training.aspx/getTraining_LectureData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Lectures = JSON.parse(data.d);
					cobject.Training_Lecture = cobject.Lectures.filter(x => x.Hide == false);
				}
			});

		}

	});
}