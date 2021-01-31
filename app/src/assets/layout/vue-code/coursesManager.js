/*************courses_manger**************/

if ($('#manger').length != 0) {
  let status = new Vue({

    el: '#manger',

     data: {
      CoursesData: [],
	  Courses_RequestsData: [],
	  Emp_Requests: [],
	  adminusersData: [],
	  Courses_AttendanceData: [],
		 
	  Courses_AnswersData: [],
	  Courses_QuestionsData: [],
		
	  New: [],
	  Requested: [],
	  inprogress: [],
	  finished: [],
		 
	  Files: [],
		
      updatedCourse:null,
	  updatedCourseReq: null,
	  selectedEmp: null,
		 
	  employee: [],
	  
	  New_rec: []
    },

    methods: {
        monthFunc: function (month) {
			return moment(new Date(month)).format("MMM")
		},
		popUp: function (course, popName) {
			this.selectedEmp = null;
			let emps = this.Emp_Requests.filter(x => x.Course_id == course.id).map(x => x.Requester_id);
			let courses = this.Emp_Requests.filter(x => emps.indexOf(x.Requester_id) > -1 && x.Status_id == 9);
			this.selectedEmp = emps[0];
			
			course['detailsPop'] = false;
			course['evaluationPop'] = false;
			course[popName] = true;
			this.updatedCourse = course;
			this.updatedCourseReq = null;

			Vue.set(this.updatedCourse, `emps`, emps);
			Vue.set(this.updatedCourse, `courses`, courses);
		},
		close: function () {
			this.updatedCourse = false;
		},
		popUpEval: function (trainee, popName) {
			trainee['instructorEvalPop'] = false;
			trainee['traineeEvalPop'] = false;
			trainee[popName] = true;
			this.employee = {
				Emp_id:trainee,
				instructorEvalPop: true,
				traineeEvalPop: true
			};
			
			
			setTimeout(function () {
				$('.' + popName).addClass('active');
			}, 500);

		},
		closeEval: function () {
			this.employee = false;
		},
	
		popUpReq: function (courseReq, popName) {
			let requests = this.Emp_Requests.filter(x => x.Requester_id == courseReq.Requester_id && x.Status_id == 9);
			
			courseReq['detailsPop'] = false;
			courseReq['evaluationPop'] = false;
			courseReq[popName] = true;
			this.updatedCourse = null;
			this.updatedCourseReq = courseReq;
			//this.Person.splice(this.Person.length + 1);

			Vue.set(this.updatedCourseReq, `requests`, requests);
			
			setTimeout(function () {
				$('.' + popName).addClass('active');
			}, 500);
		},

		closePop: function () {
			this.updatedCourseReq = false;
		},
		
		
		waitFilter(id){
            return this.Waiting_list.filter(x => x.Course_id == id.Course_id).map(x => x = x.Requester_id)
									.map(x => x = this.adminusersData.filter(z => z.admin_id == x));
        },
		progFilter(id){
			let requester = this.Courses_RequestsData.filter(x => x.Course_id == course.id);
            return requester.map(x => x = x.Requester_id)
									.map(x => x = this.adminusersData.filter(z => z.admin_id == x));
        },
		compFilter(id){
            return this.finished.filter(x => x.Course_id == id.Course_id).map(x => x = x.Requester_id)
									.map(x => x = this.adminusersData.filter(z => z.admin_id == x));
        },
		reqFilter(id){
            return this.Requested.filter(x => x.Course_id == id.Course_id).map(x => x = x.Requester_id)
									.map(x => x = this.adminusersData.filter(z => z.admin_id == x));
        },
		EmpHistory(id){
            return this.finished.filter(x => x.Course_id == id.Course_id).map(x => x = x.Requester_id)
									.map(x => x = this.adminusersData.filter(z => z.admin_id == x));
        },
		
	   updateStatus: function (id, status) {
		   let that = this;	

		   // approve
		   if (status == 3) {

				swal({
					title: "Are you sure?",
					buttons: true
				}) .then((confirm) => {

					if (confirm) {
						
					   // render buttons in time
					   that.Emp_Requests.filter(x => x.id == id)[0].Status_id = status;
					   $.ajax({
						   type: "POST",
						   url: "../Courses/courses_manger.aspx/updateStatus",
						   data: JSON.stringify({"detail": {"id": id, "Status_id" : status}}),
						   contentType: "application/json; charset=utf-8",
						   dataType: "json",
					   });
					}
				});

			// reject  
		   } else if (status == 4) {  
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
							url: '../Courses/courses_manger.aspx/Rejection',
							data: JSON.stringify({ "request": {Dept_Comment : reason, id:id } }),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function () {
								// render buttons in time
								that.Emp_Requests.filter(x => x.id == id)[0].Status_id = status;

								$.ajax({
								   type: "POST",
								   url: "../Courses/courses_manger.aspx/updateStatus",
								   data: JSON.stringify({"detail": {"id": id, "Status_id" : status}}),
								   contentType: "application/json; charset=utf-8",
								   dataType: "json",
									success: function () {
										swal("This Request has been rejected!");
									}
								});

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
	   next: function () {
	       this.sliderIndex = this.sliderIndex + 1;

	       this.trackOffset = this.sliderStep * this.sliderIndex;
	       var cssProp = 'translateX(-' + this.trackOffset + '%)';
	       this.styleTrack = {
	           'transform': cssProp
	       }
	   },
	   prev: function () {
	       this.sliderIndex = this.sliderIndex - 1;
	       this.sliderIndex = this.sliderIndex < 0 ? 0 : this.sliderIndex;

	       this.trackOffset = this.sliderStep * this.sliderIndex;
	       var cssProp = 'translateX(' + this.trackOffset + '%)';
	       this.styleTrack = {
	           'transform': cssProp
	       }
	   }
    },
    mounted: function () {
        this.sliderStep = 100 / 3;
    },
   
    created: function () {
		// pre loader
		var loader = document.querySelector(".status-loader");
		loader.classList.add("disappear-loader");

		let cobject = this;

      //get Courses
      $.ajax({
        type: "POST", 
        url: "../Courses/courses_manger.aspx/getCoursesData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

          cobject.CoursesData = JSON.parse(data.d).filter(x => x.Hide != true);
		  cobject.CoursesData = cobject.CoursesData.sort((a, b) => {
			  if (a.id > b.id)
				  return -1;
			  if (a.id < b.id)
				  return 1;
			  return 0;
		  });
		  cobject.New = cobject.CoursesData.filter(x => x.Status_id == 1); 
		  cobject.New = cobject.New.sort((a, b) => {
			  if (a.id > b.id)
				  return -1;
			  if (a.id < b.id)
				  return 1;
			  return 0;
		  });
			
		  cobject.inprogress = (cobject.CoursesData).filter(x => x.Status_id == 8);
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
        }
      });
		
		
	 //get adminusers
      $.ajax({
        type: "POST", 
        url: "../Courses/courses_manger.aspx/getadminusersData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
             cobject.adminusersData = JSON.parse(data.d);
        }
      });
		
	    //get Courses_Attendance
      $.ajax({
        type: "POST", 
        url: "../Courses/courses_manger.aspx/getCourses_AttendanceData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
             cobject.Courses_AttendanceData = JSON.parse(data.d);
        }
      });
		
		
		//get Courses_Answers
      $.ajax({
        type: "POST", 
        url: "../Courses/courses_manger.aspx/getCourses_AnswersData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
             cobject.Courses_AnswersData = JSON.parse(data.d);
        }
      });
		
      //get Courses_QuestionsData
      $.ajax({
        type: "POST", 
        url: "../Courses/courses_manger.aspx/getCourses_QuestionsData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
             cobject.Courses_QuestionsData = JSON.parse(data.d);
        }
      });
		
		
		
	   //get all Courses_Requests not from manager
       $.ajax({
        type: "POST",
        url: "../Courses/courses_manger.aspx/getallCourses_RequestsData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
			
            cobject.Emp_Requests = JSON.parse(data.d);
			
			cobject.Requested = (cobject.Emp_Requests).filter(x => ( [2,3,4,5,6,7].indexOf(x['Status_id'])  > -1 )  && x.Hide != true );
			cobject.Requested = cobject.Requested.sort((a, b) => {
			  if (a.id > b.id)
				  return -1;
			  if (a.id < b.id)
				  return 1;
			  return 0;
		  });
        }
      });
		
	   //get all Courses_Requests from manager
       $.ajax({
        type: "POST",
        url: "../Courses/courses_manger.aspx/getCourses_RequestsData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
			
            cobject.Courses_RequestsData = JSON.parse(data.d);		

        }
      });
		
		//get Files
		$.ajax({
			type: "POST",
			url: "../Courses/courses_manger.aspx/getFilesData",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				cobject.Files = JSON.parse(data.d);
			}
		});

    }

  });
}