/******************** start Create new Course *********************/
if ($('#create').length != 0) {
  let create = new Vue({

    el: '#create',

    data: {
		
      newCourse: {
        Name:'',
        Description:'',
		Conditions:'',
        Limit:1,
		No_Days: 1,
		Branch:1,
		Branch_name: '',
        Date_From:(new Date()).getTime(),
        Date_To:(new Date((new Date()).getTime() + 1000*60*60*24*1)).getTime(),
        Location_Name:'',
        Location_id:1,
        Instructor:'',
        Active:false,
		Status_name: 'New',
		Progress: 0,
		Status_id: 1 ,
      },
		
	  Locations: null,
	  Branches: null
    },

    methods: {
	  
      OnSubmit: function () {
		var ObjectD = this.newCourse;
		if (typeof(ObjectD['Date_From']) != 'number' && typeof(ObjectD['Date_To']) != 'number') {
			let dateFrom = ObjectD['Date_From'].split('-'),
				dateTo   = ObjectD['Date_To'].split('-');
			ObjectD['Date_From'] = (new Date(parseInt(dateFrom[0]), (parseInt(dateFrom[1]) - 1), parseInt(dateFrom[2]))).getTime();
			ObjectD['Date_To'] = (new Date(parseInt(dateTo[0]), (parseInt(dateTo[1]) - 1), parseInt(dateTo[2]))).getTime();
		} else if (typeof (ObjectD['Date_From']) != 'number') {
            let dateFrom = ObjectD['Date_From'].split('-');
            ObjectD['Date_From'] = (new Date(parseInt(dateFrom[0]), (parseInt(dateFrom[1]) - 1), parseInt(dateFrom[2]))).getTime();
        } else if (typeof (ObjectD['Date_To']) != 'number') {
            let dateTo = ObjectD['Date_To'].split('-');
            ObjectD['Date_To'] = (new Date(parseInt(dateTo[0]), (parseInt(dateTo[1]) - 1), parseInt(dateTo[2]))).getTime();
        };
		  
		ObjectD['Location_Name'] = this.Locations.filter(x => x['id'] == ObjectD['Location_id' ])[0]['Name'];
		console.log(ObjectD);
		  
		  
		 if((new Date(ObjectD.Date_From)).getTime() >= (new Date(ObjectD.Date_To)).getTime()){
			 swal({
				 title: "Error!",
				 text: "Sorry the start date is after the end date",
				 icon: "warning",
				 dangerMode: true,
			 }); 
		  } else if (((new Date(this.newCourse.Date_To)).getTime() - (new Date(this.newCourse.Date_From)).getTime()) / 86400000 < this.newCourse.No_Days){
		     swal({
				 title: "Error!",
				 text: "Sorry the end date should be after that ! ",
				 icon: "warning",
				 dangerMode: true,
			 }); 
		 }else {
		      $.ajax({
				  type: "POST",
				  url: "../Courses/create_Course.aspx/NewCourse",
				  data: JSON.stringify({ "course": ObjectD }),
				  contentType: "application/json; charset=utf-8",
				  dataType: "json",
				  success: function () {
					  swal({
						  title: 'Sweet!',
						  text: "You successfully added anew course ...",
						  icon: 'success',	
						  dangerMode: true,
					  });
				  }  
              });
		 };
	    
      },
	  addLink: function () {
	     let courseType   = document.getElementById("course-type"),
		     zoomLink     = document.getElementById("zoom-link");
		  
		  courseType.classList.remove("col-md-12").classList.add("col-md-6");
		  zoomLink.classList.remove("d-none");
	  }
	},
	  
    created: function () {
      let cobject = this;

      //get Locations
      $.ajax({
        type: "POST", 
        url: "../Courses/create_Course.aspx/getLocationData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          cobject.Locations = JSON.parse(data.d);
          console.log(cobject.Locations);

        }
      });

		//get branches
      $.ajax({
        type: "POST", 
        url: "../Courses/create_Course.aspx/getBranchData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          cobject.Branches = JSON.parse(data.d);
          console.log(cobject.Branches);

        }
      });

    }

  });
}

/******************** start admin *********************/
if ($('#admin').length != 0) {
  let admin = new Vue({

    el: '#admin',

    data: {
      CoursesData: null,
	  Courses_RequestsData: null,
	  RequestedBox: [],
	  adminusersData: null,
	  Courses_AttendanceData: null,
		
	  Locations: null,
	  Branches: null,
		
	  New: [],
	  Requested: [],
	  Waiting_list: [],
	  inprogress: [],
	  finished: [],
		
	  Started: null,
	  Completed: null,
		
      updatedCourse:null,
	  updatedCourseReq: null,
	  
	  New_rec: null,
	  Person:[],
	  Evaluation: 'Bad',
	  Attendance: {
		  Course_id: null,
		  Requester_id: [],
		  Attend:false,
		  Attend_date:null
	  }
    },

    methods: {
		
         updateStatus: function (course, id, status) {
		   if (status == 5) {
			   if (this.Courses_RequestsData.filter(x => x.Status_id == 5 && x.Course_id == course.id).length < course.Limit) {

				   // render buttons in time
				   this.updatedCourseReq.requests.filter(x => x.id == id)[0].Status_id = status;

				   $.ajax({
					   type: "POST",
					   url: "../Courses/admin.aspx/updateStatus",
					   data: JSON.stringify({"detail": {"id": id, "Status_id" : status}}),
					   contentType: "application/json; charset=utf-8",
					   dataType: "json",
				   });

			   } else {
					 swal({
						title: "Error!",
						text: "Sorry the number of trainees joined this course reached its limit!",
						icon: "warning",
						dangerMode: true,
					});
			   }
		   } else {
			   	// render buttons in time
			   this.updatedCourseReq.requests.filter(x => x.id == id)[0].Status_id = status;

			   $.ajax({
				   type: "POST",
				   url: "../Courses/admin.aspx/updateStatus",
				   data: JSON.stringify({"detail": {"id": id, "Status_id" : status}}),
				   contentType: "application/json; charset=utf-8",
				   dataType: "json",
			   });
		   }



		},
		
		updateNewStatus: function (course, id, i, status) {
			let that = this;
			let req  = that.Courses_RequestsData.filter(x => x["Status_id"] == 5 && x.Course_id == id);

		   if (req.length > 0) {
			   
			   if (course.No_Days == 0) {
				   swal({
					   title: "Error!",
					   text: "You can not start a course with 0 number of days!",
					   icon: "warning",
					   dangerMode: true,
				   });
			   } else {
				   update();
			   }
			   
			   function update () {
				   $.ajax({
					   type: "POST",
					   url: "../Courses/admin.aspx/updateNewStatus",
					   data: JSON.stringify({"detail": {"id": id, "Status_id" : status}}),
					   contentType: "application/json; charset=utf-8",
					   dataType: "json",
					   success: function () {

						   that.New.splice(i, 1);
						   that.inprogress.push(course);
						    swal({
								title: 'Sweet!',
								text: "This courrse has begun ...",
								icon: 'success',	
								dangerMode: true,
							});

						   for(let i = 0; i < req.length; i++ ) {
							   $.ajax({
								   type: "POST",
								   url: "../Courses/admin.aspx/updateStatus",
								   data: JSON.stringify({"detail": {"id": req[i].id, "Status_id" : status}}),
								   contentType: "application/json; charset=utf-8",
								   dataType: "json"
							   });
						   }

					   }
				   });
			   }
		   } else {
			     swal({
					title: "Error!",
					text: "No one has joined the course yet!",
					icon: "warning",
					dangerMode: true,
				});
		   }
		},
		
		updateActive: function (id, active) {
			// render buttons in time
		    this.CoursesData.filter(x => x.id == id)[0].Active = active;
		   $.ajax({
				type: "POST",
				url: "../Courses/admin.aspx/updateActive",
				data: JSON.stringify({"detail": {"id": id, "Active" : active}}),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
			    success: function () {
			    swal({
				  title: 'Sweet!',
				  text: "You successfully acvtivated this course ...",
				  icon: 'success',	
				  dangerMode: true,
			  });
		  }
		    });
		},
		 
		popUp: function (course, popName, tableType) {
			course['detailsPop'] = false;
			course['editPop']    = false;
			course['attendancePop']    = false;
			course[popName] = true;
			
			this.updatedCourseReq = null;
			this.updatedCourse    = null;
			this.updatedCourse = Object.assign({}, course);
			this.Person = [];

			 if (popName == 'editPop') { 
                  (this.updatedCourse).Date_From = new Date(course.Date_From + (1000 * 60 * 60 * 24)).toISOString().slice(0, 10);
                  (this.updatedCourse).Date_To = new Date(course.Date_To + (1000 * 60 * 60 * 24)).toISOString().slice(0, 10);
			 }
			
			this.Attendance.Requester_id = [];
			this.Attendance.Attend_date = null;

			if (tableType == 'completed') {
				let completed  = this.Courses_RequestsData.filter(x => course.id == x.Course_id && x.Status_id == 9);
				Vue.set(this.updatedCourse, `completed`, completed);
		    }
			
		},
		personalInfo: function (person) {
			this.Person.push(person);
		},
		close: function () {
			this.updatedCourse = false;
		},
		popUpReq: function (courseReq, popName, tableType) {

			courseReq['detailsPop'] = false;
			courseReq[popName] = true;
			this.updatedCourseReq = courseReq;
			this.updatedCourse    = null;
			
			if (tableType == 'waiting') {
				
				let waiting  = this.Courses_RequestsData.filter(x => courseReq.id == x.Course_id && x.Status_id == 7);
				Vue.set(this.updatedCourseReq, `waiting`, waiting);
				if (this.updatedCourseReq.requests) {this.updatedCourseReq.requests = null}
				
			} else if (tableType == 'requests') {
				
				let requests = this.Courses_RequestsData.filter(x => courseReq.id == x.Course_id && x.Status_id != 7);
				Vue.set(this.updatedCourseReq, `requests`, requests);
				if (this.updatedCourseReq.waiting) {this.updatedCourseReq.waiting = null}

		    }
			
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
			let requester = this.Courses_RequestsData.filter(x => x.Course_id == id.id);
			console.log(requester.map(x => x = x.Requester_id)
									.map(x => x = this.adminusersData.filter(z => z.admin_id == x)));

            return requester.map(x => x = x.Requester_id)
									.map(x => x = this.adminusersData.filter(z => z.admin_id == x));
        },
		reqFilter(requests){
            let requester = requests.Requester_id;
			return this.adminusersData.filter(z => z.admin_id == requester);
        },

		/*progress bar*/
		progress: function (width) {
			this.updatedCourse.Progress = width;
			console.log(this.updatedCourse);
		},
		inputProgress: function (val, index, cat) {
			this[cat][index].Old_Prog = val;
		},
		
        /*update course*/
		updateCourse: function (course, i) {
			let that = this;
			if (typeof (course['Date_From']) != 'number' && typeof (course['Date_To']) != 'number') {
				let dateFrom = course['Date_From'].split('-'),
					dateTo = course['Date_To'].split('-');

				course['Date_From'] = (new Date(parseInt(dateFrom[0]), (parseInt(dateFrom[1]) - 1), parseInt(dateFrom[2]))).getTime();
				course['Date_To'] = (new Date(parseInt(dateTo[0]), (parseInt(dateTo[1]) - 1), parseInt(dateTo[2]))).getTime();
			};
			
			if (course.Progress == 100) {
				course.Status_id = 9;
		    };

			$.ajax({
				type: "POST",
				url: "../Courses/admin.aspx/updateDetails",
				data: JSON.stringify({ "detail": course }),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function () {
					let CourseIndex = that.CoursesData.map((x,i) => x.id == course.id ? i : -1).filter(x => x > -1)[0],
					    req  = that.Courses_RequestsData.filter(x => x.Course_id == course.id);
					swal({
						title: 'Sweet!',
						text: "You successfully updated this course ...",
						icon: 'success',	
						dangerMode: true,
					});

					that.CoursesData[CourseIndex].Active        = course.Active;
					that.CoursesData[CourseIndex].Name          = course.Name;
					that.CoursesData[CourseIndex].Description   = course.Description;
					that.CoursesData[CourseIndex].Conditions    = course.Conditions;
					that.CoursesData[CourseIndex].Limit         = course.Limit;
					that.CoursesData[CourseIndex].Branch        = course.Branch;
					that.CoursesData[CourseIndex].Date_From     = course.Date_From;
					that.CoursesData[CourseIndex].Date_To       = course.Date_To;
					that.CoursesData[CourseIndex].Instructor    = course.Instructor;
					that.CoursesData[CourseIndex].Location_id   = course.Location_id;
					that.CoursesData[CourseIndex].Location_Name = course.Location_Name;
					that.CoursesData[CourseIndex].Progress      = course.Progress;
					that.CoursesData[CourseIndex].Status_id     = course.Status_id;
					that.CoursesData[CourseIndex].Status_name   = course.Status_name;
					that.CoursesData[CourseIndex].No_Days       = course.No_Days;

					if (that.CoursesData[CourseIndex].Progress == 100) {
						that.updatedCourse.Status_id = 9;
						course.Status_id = 9;
						//let i = that.inprogress.map((x,i) => x.id == course.id ? i : -1).filter(x => x > -1)[0];
						that.inprogress.splice(i, 1);
						that.finished.push(course);
						

						// update table Courses requests
						for(let i = 0; i < req.length; i++ ) {
							$.ajax({
								type: "POST",
								url: "../Courses/admin.aspx/updateStatus",
								data: JSON.stringify({"detail": {"id": req[i].id, "Status_id" : 9}}),
								contentType: "application/json; charset=utf-8",
								dataType: "json"
							});
						}
					} 
				}});
		},
			
		delCourse: function (path, id) {
			$.ajax({
				type: "GET",
				url: path,
				success: function () {
				  location.reload();
				}
			});
			 swal({
				 title: 'Sweet!',
				 text: "The course was successfully cleared ...",
				 icon: 'success',	
				 dangerMode: true,
			 });
		},

		attendanceFunc: function (courseId, attend) {

			let attendance = Object.assign({}, this.Attendance);
			    attendance.Course_id = courseId;
			    attendance.Attend    = attend;

			attendance.Attend_date = attendance.Attend_date.split('-');

			attendance.Attend_date = (new Date(parseInt(attendance.Attend_date[0]), (parseInt(attendance.Attend_date[1]) - 1), parseInt(attendance.Attend_date[2]))).getTime();
			
			for (let i = 0; i < attendance.Requester_id.length; i++) {
				
				if (this.Courses_AttendanceData.filter(x => 
			        x.Course_id == attendance.Course_id && x.Attend_date == attendance.Attend_date && x.Requester_id == attendance.Requester_id[i]).length == 0 ) {
					
					$.ajax({
						type: "POST", 
						url:  "../Courses/admin.aspx/NewAttendance",
						data: JSON.stringify({"attendance": {"Course_id" :attendance.Course_id,
															 "Attend" :attendance.Attend,
															 "Attend_date" :attendance.Attend_date,
															 "Requester_id" :attendance.Requester_id[i]}}),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function () {
                            swal({
							title: 'Sweet!',
							text: "You successfully recorded the data of the day ...",
							icon: 'success',	
							dangerMode: true,
						});
					   }
					});
					
				} else {
					
					 swal({
						title: "Error!",
						text: "You have already submitted a report for this date!",
						icon: "warning",
						dangerMode: true,
					});
				}
			}
				

		},
		Evaluate: function (person,i) {
			let that = this;
			(that.updatedCourse).completed[that.Person[1]].Evaluation = that.Evaluation;
			

			// update table Courses requests
			$.ajax({
				type: "POST",
				url: "../Courses/admin.aspx/updateEvaluation",
				data: JSON.stringify({"detail": {"id": that.Person[0].id, "Evaluation" : that.Evaluation}}),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function () {
					that.Person = [];
					that.Evaluation = 'Bad';
				}
			});
		}
    },

    created: function () {
      let cobject = this;

      //get Courses
      $.ajax({
        type: "POST", 
        url: "../Courses/admin.aspx/getCoursesData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

          cobject.CoursesData = JSON.parse(data.d).filter(x => !(x.Hide == true));
          
		  cobject.New = cobject.CoursesData.filter(x => x.Status_id == 1);
		  console.log(cobject.New);
			
		  cobject.inprogress = cobject.CoursesData.filter(x => x.Status_id == 8);
		  console.log(cobject.inprogress);
			
		  cobject.finished = cobject.CoursesData.filter(x => x.Status_id == 9);
		  console.log(cobject.finished);
        }
      });
		
		
	 //get adminusers
      $.ajax({
        type: "POST", 
        url: "../Courses/admin.aspx/getadminusersData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
             cobject.adminusersData = JSON.parse(data.d);
             console.log(cobject.adminusersData);	
        }
      });
		
	 //get Courses_Attendance
      $.ajax({
        type: "POST", 
        url: "../Courses/admin.aspx/getCourses_AttendanceData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
             cobject.Courses_AttendanceData = JSON.parse(data.d);
             console.log(cobject.Courses_AttendanceData);	
        }
      });
		
	   //get Courses_Requests
       $.ajax({
        type: "POST",
        url: "../Courses/admin.aspx/getCourses_RequestsData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
			
            cobject.Courses_RequestsData = JSON.parse(data.d);
            console.log(cobject.Courses_RequestsData);
		
			//cobject.Waiting_list = (cobject.Courses_RequestsData).filter(x => x['Status_id'] == 7 && x.Hide != true);
			//console.log(cobject.Waiting_list);
			
			cobject.Requested = (cobject.Courses_RequestsData).filter(x => ([3,5,6].indexOf(x['Status_id']) > -1) && x.Hide != true);
			console.log(cobject.Requested);
			
			setTimeout(x => {
				
				// waiting list box
				cobject.Waiting_list = (cobject.Courses_RequestsData.map(x => 
					   cobject.CoursesData.filter(z => (z.Status_id != 8 && z.Status_id != 9) )))[0].flat();
				
				cobject.RequestedBox = cobject.CoursesData.filter(z => z.Status_id != 8 && z.Status_id != 9 ).flat();
				console.log(cobject.CoursesData.filter(z => z.Status_id != 8 && z.Status_id != 9 ))
			}, 500);

        }
      });
		
	   //get Locations
      $.ajax({
        type: "POST", 
        url: "../Courses/create_Course.aspx/getLocationData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          cobject.Locations = JSON.parse(data.d);
          console.log(cobject.Locations);

        }
      });
		//get branches
      $.ajax({
        type: "POST", 
        url: "../Courses/create_Course.aspx/getBranchData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          cobject.Branches = JSON.parse(data.d);
          console.log(cobject.Branches);

        }
      });
    }

	  
  });
}

/*************courses-status**************/
if ($('#status').length != 0) {
  let status = new Vue({

    el: '#status',

    data: {
      CoursesData: null,
	  Courses_RequestsData: null,
	  Courses_AttendanceData: null,
		
	  NewReq: null,
	  All:[],
	  New: [],
	  req_box: null,
	  progress_box: null,
	  completed_box: null,
		
      updatedCourse:null,
	  updatedCourseReq: null,
    },

    methods: {
		newRequest: function (courseId,Emp_id, i) {
			let ObjectD = this.NewReq;
			let cobject = this;
			
			ObjectD = {
				Course_id: courseId,
				Requester_id: Emp_id,
				Status_id: 2
			};
			
		  $.ajax({  
			  type: "POST",
			  url: "../Courses/courses_status.aspx/NewReq",
			  data: JSON.stringify({ "request": ObjectD }),
			  contentType: "application/json; charset=utf-8",
			  dataType: "json",
			  success: function () {
				  cobject.New.splice(i, 1);
				  cobject.req_box.push(ObjectD)
			  }
		  });
			
			
		},
		
		monthFunc: function (month) {
			return moment(new Date(month)).format("MMM")
		},
		
		popUp: function (course, popName) {
			course['detailsPop'] = false;
			course[popName] = true;
			this.updatedCourse = course;

			setTimeout(function () {
				$('.' + popName).addClass('active');
			}, 500);
		},
		close: function () {
			this.updatedCourse = false;
		},
		
		popUpReq: function (courseReq, popName) {
			courseReq['detailsPop'] = false;
			courseReq[popName] = true;
			this.updatedCourseReq = courseReq;
			
			let attendance = Math.round(this.Courses_AttendanceData.filter(x =>
							( x.Requester_id == this.updatedCourseReq.Requester_id && x.Course_id
							 == this.updatedCourseReq.Course_id ) && x.Attend == true).length / this.CoursesData.filter(x =>
							x["id"] == this.updatedCourseReq.Course_id)[0].No_Days * 100);

			Vue.set(this.updatedCourseReq, `attendance`, attendance);
			
			setTimeout(function () {
				$('.' + popName).addClass('active');
			}, 500);
		},
		
		closePop: function () {
			this.updatedCourseReq = false;
		},
    },

    created: function () {
      let cobject = this;

      //get Courses
      $.ajax({
        type: "POST", 
        url: "../Courses/courses_status.aspx/getCoursesData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

          cobject.CoursesData = JSON.parse(data.d).filter(x => x.Hide != true);
		  cobject.All = JSON.parse(data.d).filter(x => x.Hide != true );
		  console.log(cobject.CoursesData);
        }
      });
		
	    //get Courses_Attendance
      $.ajax({
        type: "POST", 
        url: "../Courses/courses_status.aspx/getCourses_AttendanceData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
             cobject.Courses_AttendanceData = JSON.parse(data.d);
             console.log(cobject.Courses_AttendanceData);	
        }
      });
		
		
	 //get Courses_Requests
       $.ajax({
        type: "POST",
        url: "../Courses/courses_status.aspx/getCourses_RequestsData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

          cobject.Courses_RequestsData = JSON.parse(data.d).filter(x => x.Hide == false);	
          console.log(cobject.Courses_RequestsData);

          cobject.req_box = cobject.Courses_RequestsData.filter(x => [2, 3, 4, 5, 6, 7].indexOf(x['Status_id'] && (x.Hide == false)));
          console.log(cobject.req_box);
			setTimeout(x =>{
				for (let i = 0; i < cobject.req_box.length; i++) {
					let attendance = Math.round(cobject.Courses_AttendanceData.filter(x =>
								( x.Requester_id == cobject.req_box[i].Requester_id && x.Course_id
								== cobject.req_box[i].Course_id ) && x.Attend == true).length / cobject.CoursesData.filter(x =>
								x["id"] == cobject.req_box[i].Course_id)[0].No_Days * 100);

					Vue.set(cobject.req_box[i], `attendance`, attendance);
				}
			} ,1000)

          cobject.progress_box = cobject.Courses_RequestsData.filter(x => x['Status_id']  == 8 && x.Hide != true );
		  console.log(cobject.progress_box);
			
          cobject.completed_box = cobject.Courses_RequestsData.filter(x => x['Status_id'] == 9  && x.Hide != true );
		  console.log(cobject.completed_box);
			
		    setTimeout(function () {
		        cobject.New = cobject.All.filter(z =>  cobject.Courses_RequestsData.map(x => x.Course_id).indexOf(z['id']) == -1);
				console.log(cobject.New)
			}, 500)
						
        }
      });

    }

  });
}


/*************courses_manger**************/

if ($('#manger').length != 0) {
  let status = new Vue({

    el: '#manger',

     data: {
      CoursesData: null,
	  Courses_RequestsData: null,
	  Emp_Requests: null,
	  adminusersData: null,
	  Courses_AttendanceData: null,
		
	  New: null,
	  Requested: null,
	  inprogress: null,
	  finished: null,
		
      updatedCourse:null,
	  updatedCourseReq: null,
	  
	  New_rec: null
    },

    methods: {
        monthFunc: function (month) {
			return moment(new Date(month)).format("MMM")
		},
		popUp: function (course, popName) {
			course['detailsPop'] = false;
			course[popName] = true;
			this.updatedCourse = course;
			
		},
		close: function () {
			this.updatedCourse = false;
		},
		popUpReq: function (courseReq, popName) {
			courseReq['detailsPop'] = false;
			courseReq[popName] = true;
			this.updatedCourseReq = courseReq;
			//this.Person.splice(this.Person.length + 1);

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
			console.log(requester.map(x => x = x.Requester_id)
									.map(x => x = this.adminusersData.filter(z => z.admin_id == x)));
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
		
	   updateStatus: function (id, status) {
		   this.Emp_Requests.filter(x => x.id == id)[0].Status_id = status;
		   $.ajax({
				type: "POST",
				url: "../Courses/courses_manger.aspx/updateStatus",
				data: JSON.stringify({"detail": {"id": id, "Status_id" : status}}),
				contentType: "application/json; charset=utf-8",
				dataType: "json"
		    });
		},
    },
   
    created: function () {
      let cobject = this;

      //get Courses
      $.ajax({
        type: "POST", 
        url: "../Courses/courses_manger.aspx/getCoursesData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

          cobject.CoursesData = JSON.parse(data.d).filter(x => x.Hide != true);
          console.log(cobject.CoursesData);
			
		  cobject.New = cobject.CoursesData.filter(x => x.Status_id == 1);
		  console.log(cobject.New)
			
		  cobject.finished = cobject.CoursesData.filter(x => x.Status_id == 9);
		  console.log(cobject.finished);
			
		  cobject.inprogress = (cobject.CoursesData).filter(x => x.Status_id == 8);
		  console.log(cobject.inprogress);
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
             console.log(cobject.adminusersData);	
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
             console.log(cobject.Courses_AttendanceData);	
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
			
			//cobject.inprogress = (cobject.Emp_Requests).filter(x => x['Status_id'] == 8 && x.Hide != true);
			//console.log(cobject.inprogress);
			
			//cobject.finished = (cobject.Emp_Requests).filter(x => x['Status_id'] == 9 && x.Hide != true);
			//onsole.log(cobject.finished);
			
			cobject.Requested = (cobject.Emp_Requests).filter(x => ( [2,3,4,5,6,7].indexOf(x['Status_id'])  > -1 )  && x.Hide != true );
			console.log(cobject.Requested);
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
            console.log(cobject.Courses_RequestsData);
			
			/*cobject.inprogress = (cobject.Courses_RequestsData).filter(x => x['Status_id'] == 8);
			console.log(cobject.inprogress);*/
			
			/*cobject.Requested = (cobject.Courses_RequestsData).filter(x => ( [2,3,4].indexOf(x['Status_id'])  > -1 )  && x.Hide != true );
			console.log(cobject.Requested);*/
			
			/*cobject.finished = (cobject.Courses_RequestsData).filter(x => x['Status_id'] == 9 && x.Hide != true);
			console.log(cobject.finished);*/
			
			/*setTimeout(function () {
		        cobject.New = cobject.CoursesData.filter(z =>  cobject.Courses_RequestsData.map(x => x.Course_id).indexOf(z['id']) == -1);
				console.log(cobject.New)
			}, 500)*/
        }
      });

    }

	  

  });
}