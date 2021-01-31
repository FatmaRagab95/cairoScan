/*************courses-status**************/
if ($('#status').length != 0) {
	// fetch data from database
    let CoursesData = [],
        All = [],
        Courses_AnswersData = [],
        Courses_AttendanceData = [],
        AllCourses_RequestsData = [],
        adminusersData = [],
        Courses_QuestionsData = [],
		Courses_RequestsData  = [],
		req_box = [],
		progress_box = [],
		completed_box = [],
		New = [],
		Files= [];
	
    function ajax1() {
        ////get Courses
        return 	$.ajax({
			type: "POST", 
			url: "../Courses/courses_status.aspx/getCoursesData",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {

				CoursesData = JSON.parse(data.d).filter(x => x.Hide != true);
				CoursesData = CoursesData.sort((a, b) => {
					if (a.id > b.id)
						return -1;
					if (a.id < b.id)
						return 1;
					return 0;
				});
				All = JSON.parse(data.d).filter(x => x.Hide != true );
				All = All.sort((a, b) => {
					if (a.id > b.id)
						return -1;
					if (a.id < b.id)
						return 1;
					return 0;
				});
			}
		});
    }
	
    function ajax2() {
		//get Courses_Answers
        return 	$.ajax({
			type: "POST", 
			url: "../Courses/courses_status.aspx/getCourses_AnswersData",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Courses_AnswersData = JSON.parse(data.d);
			}
		});
    }
	
    function ajax3() {
		//get Courses_Attendance
			return $.ajax({
			type: "POST", 
			url: "../Courses/courses_status.aspx/getCourses_AttendanceData",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Courses_AttendanceData = JSON.parse(data.d);
			}
		});
    }
	
    function ajax4() {
		//get adminusers
		return $.ajax({
			type: "POST", 
			url: "../Courses/courses_status.aspx/getadminusersData",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				adminusersData = JSON.parse(data.d);
			}
		});
    }
	
    function ajax5() {
		//get alll courses requests
		return $.ajax({
			type: "POST", 
			url: "../Courses/courses_status.aspx/getAllCourses_RequestsData",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				AllCourses_RequestsData = JSON.parse(data.d);
				AllCourses_RequestsData = AllCourses_RequestsData.sort((a, b) => {
					if (a.id > b.id)
						return -1;
					if (a.id < b.id)
						return 1;
					return 0;
				});
			}
		});
    }
	
    function ajax6() {
		//get Courses_QuestionsData
		return $.ajax({
			type: "POST", 
			url: "../Courses/courses_status.aspx/getCourses_QuestionsData",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Courses_QuestionsData = JSON.parse(data.d);
			}
		});
    }
	
	function ajax7() {
		//get Courses_Requests
		return $.ajax({
			type: "POST",
			url: "../Courses/courses_status.aspx/getCourses_RequestsData",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Courses_RequestsData = JSON.parse(data.d).filter(x => x.Hide == false);
				req_box = Courses_RequestsData.filter(x => [2, 3, 4, 5, 6, 7].indexOf(x['Status_id'] && (x.Hide == false)));
			}
		});
	}
	
	function ajax8() {
		//get Files
		return $.ajax({
			type: "POST",
			url: "../Courses/courses_status.aspx/getFilesData",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Files = JSON.parse(data.d);
			}
		});
	}

	  let status = new Vue({

		el: '#status',

		data: {

		  CoursesData: [],
		  Courses_RequestsData: [],
		  AllCourses_RequestsData: [],
		  Courses_AttendanceData: [],
		  adminusersData: [],
		  Courses_QuestionsData: [],
		  Courses_AnswersData: [],

		  NewReq: null,
		  All:[],
		  New: [],
		  req_box: [],
		  progress_box: [],
		  completed_box: [],

		  Files: [],

		  updatedCourse:null,
		  updatedCourseReq: null,
		},
		methods: {
			submitEvaluate: function (CourseId, person, type, el) {	
				let answersArr = [];
				let inputs = $(el).closest('.details-popup #Evaluation').find('input:checked, textarea');

				if ($(el).closest('.details-popup #Evaluation').find('.special-padding-row').length == $(el).closest('.details-popup #Evaluation').find('.special-padding-row input:checked').length){

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

					$.ajax({
						type: "POST",
						url: "../Courses/courses_status.aspx/NewAnswer",
						data: JSON.stringify({ "answer": answersArr[i] }),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function () {
							if (i == answersArr.length - 1) {
								let evalButton = document.getElementById("submitEval");

								evalButton.classList.add("d-none");

								swal({
									title: 'Saved!',
									text: "You successfully saved your evaluation",
									icon: 'success',	
									dangerMode: true
								});
								$('.details-popup #Evaluation').find('textarea').val('');
								$('.details-popup #Evaluation').find('input:checked').prop( "checked", false );

								 location.reload();
							}
						}  
					});
				  }
				}else {
					swal({
						title: 'Error!',
						text: 'You have to fill in all the fields!',
						dangerMode: true
					});
				}
			},

			newRequest: function (courseId,Emp_id, i) {
				let ObjectD = this.NewReq;
				let cobject = this;

				ObjectD = {
					Course_id: courseId,
					Requester_id: Emp_id,
					Status_id: 2
				};

			   swal({
					title: "Do youe accept all the conditions of this course?",
					icon: "warning",
					buttons: true,
					dangerMode: true,

			   }).then((result) => {
				  if (result) {
					 $.ajax({  
						  type: "POST",
						  url: "../Courses/courses_status.aspx/NewReq",
						  data: JSON.stringify({ "request": ObjectD }),
						  contentType: "application/json; charset=utf-8",
						  dataType: "json",
						  success: function () {
							  cobject.New.splice(i, 1);
							  cobject.req_box.unshift(ObjectD);

							   swal({
								  title: 'Sweet!',
								  text: "You successfully send a request for this course ...",
								  icon: 'success',	
								  dangerMode: true,
							  });

						  }
					  })
				  } else {
					  swal({
						  title: 'Canceled',
						  text : 'Sorry, you can not join this course, You did not accept the conditions!'
					  })
					}
				})

			},

			monthFunc: function (month) {
				return moment(new Date(month)).format("MMM")
			},

			popUp: function (course, popName) {
				course['detailsPop']  = false;
				course[popName]       = true;
				this.updatedCourse    = course;
				this.updatedCourseReq = null;

				setTimeout(function () {
					$('.' + popName).addClass('active');
				}, 500);
			},
			close: function () {
				this.updatedCourse = false;
			},

			popUpReq: function (courseReq, popName) {
				courseReq['detailsPop'] = false;
				courseReq[popName]    = true;
				this.updatedCourseReq = courseReq;
				this.updatedCourse    = null,
				that = this;

				setTimeout(function () {
					let attendance = Math.round(that.Courses_AttendanceData.filter(x =>
					( x.Requester_id == that.updatedCourseReq.Requester_id && x.Course_id
					== that.updatedCourseReq.Course_id ) && x.Attend == true).length / that.CoursesData.filter(x =>
					x["id"] == that.updatedCourseReq.Course_id)[0].No_Days * 100);

				Vue.set(that.updatedCourseReq, `attendance`, attendance);
					$('.' + popName).addClass('active');
				}, 1000);
			},

			closePop: function () {
				this.updatedCourseReq = false;
			}
		},
		created: function () {
			let that = this;
			$.when(ajax1(),ajax2(), ajax3(), ajax4(),ajax5(),ajax6(), ajax7(), ajax8()).done(function (a1, a2, a3, a4, a5, a6, a7, a8) {
				
			// pre loader
			var loader = document.querySelector(".status-loader");
			loader.classList.add("disappear-loader");

			  that.CoursesData = CoursesData;
			  that.Courses_RequestsData= Courses_RequestsData;
			  that.AllCourses_RequestsData= AllCourses_RequestsData;
			  that.Courses_AttendanceData= Courses_AttendanceData;
			  that.adminusersData= adminusersData;
			  that.Courses_QuestionsData= Courses_QuestionsData;
			  that.Courses_AnswersData= Courses_AnswersData;
			  that.All=All;
			  that.req_box= req_box;
			  that.progress_box= progress_box;
			  that.completed_box= completed_box;
			  that.Files = Files;
				
			setTimeout(x => {
                
				for (let i = 0; i < that.req_box.length; i++) {
					let attendance = Math.round(that.Courses_AttendanceData.filter(x => ( x.Requester_id == that.req_box[i].Requester_id && x.Course_id ==        that.req_box[i].Course_id ) && x.Attend == true).length / that.CoursesData.filter(x => x["id"] == that.req_box[i].Course_id)[0].No_Days * 100);

					Vue.set(that.req_box[i], `attendance`, attendance);
				}
			} ,1000);

			that.progress_box = that.Courses_RequestsData.filter(x => x['Status_id']  == 8 && x.Hide != true );

			that.completed_box = that.Courses_RequestsData.filter(x => x['Status_id'] == 9  && x.Hide != true );
			
			that.completed_box = that.completed_box.sort((a, b) => {
				if (a.id > b.id)
					return -1;
				if (a.id < b.id)
					return 1;
				return 0;
			});
				
			that.progress_box = that.progress_box.sort((a, b) => {
				if (a.id > b.id)
					return -1;
				if (a.id < b.id)
					return 1;
				return 0;
			});

			setTimeout(function () {
				let available = that.All.map(x => x.id);
				that.progress_box = that.progress_box.filter(x => available.indexOf(x.Course_id) > -1);
				that.New = All.filter(z =>  that.Courses_RequestsData.map(x => x.Course_id).indexOf(z['id']) == -1);
				that.New = that.New.filter(x =>  x.Status_id == 1);
				
			}, 1500);
			});	
		}

	  });
}




