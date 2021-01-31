/******************** start instructor *********************/
if ($('#instructor').length != 0) {
  let instructor = new Vue({

    el: '#instructor',
    data: {
		CoursesData: [],
		inprogress: [],
		finished: [],
		adminusersData: [],
		Courses_AttendanceData: [],
		Courses_RequestsData: [],
		Questions: [],
		Answers: [],
		pop:null,
		popComp:null,
		PopFiles: null,
		person:null,
		Attendance: {
			Course_id: null,
			Requester_id: [],
			Attend:false,
			Attend_date:null
		},
		evaluation: [],
		SeeEval: {
			Course_id:0,
			Emp_id:0
		},
		overallQs:0,
		Files: [],
		selectedFiles:[],
		
		attachmentFile: ''
	},
	 
	methods: {
		popUp: function (course) {
			this.pop = course;
			this.popComp = null;
			this.attachmentFile = '';
			this.PopFiles = null;
			let emps = this.Courses_RequestsData.filter(x => x.Course_id == course.id).map(x => x.Requester_id);
			
			Vue.set(this.pop, `emps`, emps);
		},		
		popUpComp: function (course) {
			this.popComp = course;
			this.pop = null;
			this.PopFiles = null;
			this.attachmentFile = '';
			let emps = this.Courses_RequestsData.filter(x => x.Course_id == course.id).map(x => x.Requester_id);
			this.SeeEval.Emp_id = 0;
			Vue.set(this.popComp, `emps`, emps);
			
			$('.submit-Evaluation-popup').find('textarea').val('');
			$('.submit-Evaluation-popup').find('input:checked').prop( "checked", false );
		},
		FilesPop: function (id) {
			this.popComp = null;
			this.pop = null;
			this.PopFiles = true;
			this.attachmentFile = '';
			
			this.selectedFiles =  this.Files.filter(x => id == x.Course_id);
		},
		
		Person: function (emp) {
			return this.adminusersData.filter(x => emp == x.admin_id);
		},		
		  
		// insert attendance
		attendanceFunc: function (courseId, attend) {

			attendance = Object.assign({}, this.Attendance);
			attendance.Course_id = courseId;
			attendance.Attend    = attend;

		  if (attendance.Attend_date) {

			attendance.Attend_date = attendance.Attend_date.split('-');

			attendance.Attend_date = (new Date(parseInt(attendance.Attend_date[0]), (parseInt(attendance.Attend_date[1]) - 1), parseInt(attendance.Attend_date[2]))).getTime();
			
			for (let i = 0; i < attendance.Requester_id.length; i++) {

				let days  = this.Courses_AttendanceData.filter(x => x.Course_id == attendance.Course_id && x.Attend_date == attendance.Attend_date && x.Requester_id == attendance.Requester_id[i]).length;
				let that  = this;
				
				if (this.Courses_AttendanceData.filter(x => x.Course_id == attendance.Course_id && x.Requester_id == attendance.Requester_id[i]).length < that.CoursesData.filter(x => x.id == courseId)[0].No_Days) {
					
					if (days == 0 ) {

						let obj = {"Course_id" :attendance.Course_id,
								   "Attend" :attendance.Attend,
								   "Attend_date" :attendance.Attend_date,
								   "Requester_id" :attendance.Requester_id[i]};
						$.ajax({
							type: "POST", 
							url:  "../Courses/admin.aspx/NewAttendance",
							data: JSON.stringify({"attendance": obj}),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								that.Courses_AttendanceData.push(obj);
								swal({
									title: 'Sweet!',
									text: "You successfully recorded the data of the day ...",
									icon: 'success',	
									dangerMode: true,
								});
						   },
						});

					} else {
						swal({
							title: "Error!",
							text: "You have already submitted a report for this date!",
							icon: "warning",
							dangerMode: true,
						});
					}
			    } else {
					swal({
							title: "Error!",
							text: "You have exceeded the number of days for this course!",
							icon: "warning",
							dangerMode: true,
						});
				}
			}
		
		   } else {
			   swal({
				   title: "Error!",
				   text: "You have to choose a date!",
				   icon: "warning",
				   dangerMode: true,
			   });
		   }
		},
		
		// evaluation
		evaluate: function (CourseId,person,type, el) {
			
			let answersArr = [];
			let inputs = $(el).closest('.submit-Evaluation-popup').find('input:checked, textarea');

			if ($(el).closest('.submit-Evaluation-popup').find('.special-padding-row').length == $(el).closest('.submit-Evaluation-popup').find('.special-padding-row input:checked').length) {

				for (let i = 0; i < inputs.length; i++) {
					answersArr.push({
						Course_id: CourseId,
						Emp_id: person,
						Evaluation_type: type,
						Answer: $(inputs).eq(i).val(),
						Question_id: ($(inputs).eq(i).closest('fieldset').find('.title-part').attr('id')).replace('x', '')
					});
				}
				
			   for (let i = 0; i < answersArr.length; i++) {
				let that = this;
				$.ajax({
					type: "POST",
					url: "../Courses/instractur.aspx/NewAnswer",
					data: JSON.stringify({ "answer": answersArr[i] }),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function () {
						if (i == answersArr.length - 1) {
							swal({
								title: 'Saved!',
								icon: 'success'
							});
							$('.submit-Evaluation-popup').find('textarea').val('');
							$('.submit-Evaluation-popup').find('input:checked').prop( "checked", false );
							that.Answers.push(answersArr[i]);
							location.reload();
						}
					}  
				});
			}
			} else {
				swal({
					title: 'Error!',
					text: 'You have to fill in all the fields!',
					dangerMode: true
				});
			}
		},
		
		// See Evaluation]
		SeeEvaluation: function (courseId, emp) {
			this.SeeEval.Course_id = courseId;
			this.SeeEval.Emp_id    = emp
		},
		
		// upload files
		UploadFiles: function (id) {
			let that = this;
			if (that.attachmentFile != '') {
				let uniqueName = Math.floor(Math.random() * 10000000000000000);
				that.attachmentFile = that.attachmentFile.split('.');
				that.attachmentFile[0] = uniqueName;
				that.attachmentFile = that.attachmentFile.join('.');
				
				$.ajax({
					type: "POST",
					url: "../Courses/instractur.aspx/UploadFile",
					data: JSON.stringify( { "file" : {"Course_id": id, "File_name": that.attachmentFile} }),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function () {
						swal({
							title: 'Uploading..!',
							text: 'Please wait for reloading to complete saving the file!',
							icon: 'success'
						}).then(() => {
						  $('.uploadBtn').click();
						});
					},
					error: function () {
						swal({
							title: 'Error!',
							text: "Something went wrong please try again!",
							icon: 'warning'
						});
					}
				});
			}
		},
		
		// delete files
		delFile: function (id) {
			let that = this;
			$.ajax({
					type: "POST",
					url: "../Courses/instractur.aspx/delFile",
					data: JSON.stringify( { "file" : {"id": id} }),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function () {
						swal({
							title: 'Deleted!',
							icon: 'success'
						}).then(() => {
							let i = that.Files.map((x, i) => x.id == id ? i : -1).filter(x => x > -1)[0],
								x = that.selectedFiles.map((x, i) => x.id == id ? i : -1).filter(x => x > -1)[0];
							that.Files.splice(i,1);
							that.selectedFiles.splice(x,1);
						});;
					},
					error: function () {
						swal({
							title: 'Error!',
							text: "Something went wrong please try again!",
							icon: 'warning'
						});
					}
				});
		}
	},

	created: function () {
      let cobject = this;

      //get Courses
      $.ajax({
        type: "POST", 
        url: "../Courses/instractur.aspx/getCoursesData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

          cobject.CoursesData = JSON.parse(data.d).filter(x => !(x.Hide == true));

		  cobject.inprogress = cobject.CoursesData.filter(x => x.Status_id == 8);		  
		  cobject.inprogress = cobject.inprogress.sort((a, b) => {
			  if (a.Date_From > b.Date_From)
				  return -1;
			  if (a.Date_From < b.Date_From)
				  return 1;
			  return 0;
		  });
		  cobject.finished = cobject.CoursesData.filter(x => x.Status_id == 9);		  
		  cobject.finished = cobject.finished.sort((a, b) => {
			  if (a.Date_To > b.Date_To)
				  return -1;
			  if (a.Date_To < b.Date_To)
				  return 1;
			  return 0;
		  });
        },
      });
		
		
	 //get adminusers
      $.ajax({
        type: "POST", 
        url: "../Courses/instractur.aspx/getadminusersData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
             cobject.adminusersData = JSON.parse(data.d);
        }
      });
		
	 //get Courses_Attendance
      $.ajax({
        type: "POST", 
        url: "../Courses/instractur.aspx/getCourses_AttendanceData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
             cobject.Courses_AttendanceData = JSON.parse(data.d);
        }
      });
		
	   //get Courses_Requests
       $.ajax({
        type: "POST",
        url: "../Courses/instractur.aspx/getCourses_RequestsData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
			
            cobject.Courses_RequestsData = JSON.parse(data.d);
			
			cobject.Requested = (cobject.Courses_RequestsData).filter(x => ([2,3,4,5,6].indexOf(x['Status_id']) > -1) && x.Hide != true);
			
			setTimeout(x => {
		
				cobject.RequestedBox = cobject.CoursesData.filter(z => z.Status_id != 8 && z.Status_id != 9 ).flat();
			}, 500);

        }
      });
		
	   //get Courses_Questions
       $.ajax({
        type: "POST",
        url: "../Courses/instractur.aspx/getQuestionsData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            cobject.Questions = JSON.parse(data.d);
			cobject.overallQs =  cobject.Questions.filter(x => x.Question_Type.trim() == 'overall')[0].id;
        }
      });
		
	   //get Courses_Answers
       $.ajax({
        type: "POST",
        url: "../Courses/instractur.aspx/getCourses_AnswersData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            cobject.Answers = JSON.parse(data.d);
        }
      });
		
	   //get Files
       $.ajax({
        type: "POST",
        url: "../Courses/instractur.aspx/getFilesData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            cobject.Files = JSON.parse(data.d);
        }
      });
		
		// pre loader
		var loader = document.querySelector(".status-loader");
		loader.classList.add("disappear-loader");
    }
	  
  });
}