/******************** start admin *********************/
$(function () {
if ($('#admin').length != 0) {
	
    let admin = new Vue({

        el: '#admin',

        data: {
            CoursesData: null,
            Courses_RequestsData: [],
            RequestedBox: [],
            adminusersData: null,
            Courses_AttendanceData: null,

            Courses_AnswersData: null,
            Courses_QuestionsData: null,

            Locations: null,
            Branches: null,

            New: [],
            Requested: [],
            Waiting_list: [],
            inprogress: [],
            finished: [],

            Started: null,
            Completed: null,

            employee: null,
            selectedEmp: null,
			Files: [],

            updatedCourse: null,
            updatedCourseReq: null,

            New_rec: null,
            Person: [],
            Evaluation: 'Bad',
            Attendance: {
                Course_id: null,
                Requester_id: [],
                Attend: false,
                Attend_date: null
            }
        },

        methods: {

            addLinkEdit: function (course) {
                let courseTypeEdit = document.getElementById("course-type-edit"),
                    zoomEdit = document.getElementById("zoom-edit");

                if (course.CourseType_name == "On line course") {
                    courseTypeEdit.classList.remove("col-md-12");
                    courseTypeEdit.classList.add("col-md-6");
                    zoomEdit.classList.remove("d-none");
                } else {
                    courseTypeEdit.classList.add("col-md-12");
                    courseTypeEdit.classList.remove("col-md-6");
                    zoomEdit.classList.add("d-none");
                }


            },

            updateStatus: function (course, id, status, type) {

                // accept
                if (status == 5) {
                    if (this.Courses_RequestsData.filter(x => x.Status_id == 5 && x.Course_id == course.id).length < course.Limit) {

                        swal({
                            title: "Are you sure?",
                            buttons: true
                        }).then((confirm) => {

                            if (confirm) {

                                // render buttons in time
                                if (type == "waiting") {
                                    this.updatedCourseReq.waiting.filter(x => x.id == id)[0].Status_id = status;
                                }
                                else {
                                    this.updatedCourseReq.requests.filter(x => x.id == id)[0].Status_id = status;
                                }

                                if (course.Status_id != 9) {
                                    $.ajax({
                                        type: "POST",
                                        url: "../Courses/admin.aspx/updateStatus",
                                        data: JSON.stringify({ "detail": { "id": id, "Status_id": status } }),
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                    });
                                }
                            }
                        });

                    } else {
                        swal({
                            title: "Error!",
                            text: "Sorry the number of trainees joined this course reached its limit!",
                            icon: "warning",
                            dangerMode: true,
                        });
                    }

                    // reject  
                } else if (status == 6) {
                    let that = this;
                    swal({
                        title: "Are you sure?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,

                    }).then((willReject) => {

                        if (willReject) {
                            swal({
                                title: 'Reason Of Rejection',
                                content: 'input',
                                showCancelButton: true,

                            }).then(function (reason) {
                                if (reason.trim()) {
                                    $.ajax({
                                        type: "POST",
                                        url: '../Courses/admin.aspx/Rejection',
                                        data: JSON.stringify({ "request": { Admin_Comment: reason, id: id } }),
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function () {
                                            // render buttons in time
                                            that.updatedCourseReq.requests.filter(x => x.id == id)[0].Status_id = status;

                                            $.ajax({
                                                type: "POST",
                                                url: "../Courses/admin.aspx/updateStatus",
                                                data: JSON.stringify({ "detail": { "id": id, "Status_id": status } }),
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
                                        text: 'You did not write any reason!'
                                    });
                                }
                            });
                        }
                    });

                } else {
                    // render buttons in time
                    this.updatedCourseReq.requests.filter(x => x.id == id)[0].Status_id = status;

                    $.ajax({
                        type: "POST",
                        url: "../Courses/admin.aspx/updateStatus",
                        data: JSON.stringify({ "detail": { "id": id, "Status_id": status } }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                    });
                }

            },

            updateNewStatus: function (course, id, i, status) {
                let that = this,
                    req = that.Courses_RequestsData.filter(x => x["Status_id"] == 5 && x.Course_id == id),
                    limit = course.Limit,
                    today = new Date(new Date().getTime()).toISOString().slice(0, 10),
                    dateForm = new Date(course.Date_From + (1000 * 60 * 60 * 24)).toISOString().slice(0, 10),
                    remain = that.Courses_RequestsData.filter(x => x["Status_id"] == 3 && x.Course_id == id).length;

                if (remain > 0) {
                    swal({
                        title: "Error!",
                        text: "There is " + remain + " number of requests waiting for you!",
                        icon: "warning",
                        dangerMode: true,
                    });
                } else {

                    if (Math.round(req.length / limit) == 1) {

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

                        function update() {
                            $.ajax({
                                type: "POST",
                                url: "../Courses/admin.aspx/updateNewStatus",
                                data: JSON.stringify({ "detail": { "id": id, "Status_id": status } }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function () {

                                    course.Status_id = 8;
                                    that.New.splice(i, 1);
                                    that.inprogress.unshift(course);

                                    swal({
                                        title: 'Sweet!',
                                        text: "This course has begun ...",
                                        icon: 'success',
                                        dangerMode: true,
                                    });

                                    for (let i = 0; i < req.length; i++) {

                                        that.Courses_RequestsData.find(x => x["Status_id"] == 5 && x.Course_id == id).Status_id = status;

                                        $.ajax({
                                            type: "POST",
                                            url: "../Courses/admin.aspx/updateStatus",
                                            data: JSON.stringify({ "detail": { "id": req[i].id, "Status_id": status } }),
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
                            text: "The course can not be started without at least 50% joined in!",
                            icon: "warning",
                            dangerMode: true,
                        });
                    }
                }
            },

            updateActive: function (id, active) {
                // render buttons in time
                this.CoursesData.filter(x => x.id == id)[0].Active = active;
                $.ajax({
                    type: "POST",
                    url: "../Courses/admin.aspx/updateActive",
                    data: JSON.stringify({ "detail": { "id": id, "Active": active } }),
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

                //let emps = this.Courses_RequestsData.filter(x => x.Course_id == course.id).map(x => x.Requester_id);

                this.selectedEmp = null;
                let emps = this.Courses_RequestsData.filter(x => x.Course_id == course.id).map(x => x.Requester_id);
                let courses = this.Courses_RequestsData.filter(x => emps.indexOf(x.Requester_id) > -1 && x.Status_id == 9);
                this.selectedEmp = emps[0];

                course['detailsPop'] = false;
                course['editPop'] = false;
                course['attendancePop'] = false;
                course['evaluationPop'] = false;
                course[popName] = true;
                this.updatedCourseReq = null;
                this.updatedCourse = null;
                this.updatedCourse = Object.assign({}, course);
                this.Person = [];

                //Vue.set(this.updatedCourse, `emps`, emps);

                Vue.set(this.updatedCourse, `emps`, emps);
                Vue.set(this.updatedCourse, `courses`, courses);

                if (popName == 'editPop') {
                    (this.updatedCourse).Date_From = new Date(course.Date_From + (1000 * 60 * 60 * 24)).toISOString().slice(0, 10);
                    (this.updatedCourse).Date_To = new Date(course.Date_To + (1000 * 60 * 60 * 24)).toISOString().slice(0, 10);
                    (this.updatedCourse).Final_JoinDate = new Date(course.Final_JoinDate + (1000 * 60 * 60 * 24)).toISOString().slice(0, 10);
                }

                this.Attendance.Requester_id = [];
                this.Attendance.Attend_date = null;

                if (tableType == 'completed') {
                    let completed = this.Courses_RequestsData.filter(x => course.id == x.Course_id && x.Status_id == 9);
                    Vue.set(this.updatedCourse, `completed`, completed);

                }

            },
            popUpEval: function (trainee, popName) {
                trainee['instructorEvalPop'] = false;
                trainee['traineeEvalPop'] = false;
                trainee[popName] = true;
                this.employee = {
                    Emp_id: trainee,
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
            personalInfo: function (person) {
                this.Person = [];
                this.Person.push(person);
            },
            close: function () {
                this.updatedCourse = false;
            },
            popUpReq: function (courseReq, popName, tableType) {

                courseReq['detailsPop'] = false;
                courseReq['requestsPop'] = false;
                courseReq[popName] = true;
                this.updatedCourseReq = courseReq;
                this.updatedCourse = null;
                if (tableType == 'waiting') {

                    let waiting = this.Courses_RequestsData.filter(x => courseReq.id == x.Course_id && x.Status_id == 7);
                    Vue.set(this.updatedCourseReq, `waiting`, waiting);
                    if (this.updatedCourseReq.requests) { this.updatedCourseReq.requests = null }

                } else if (tableType == 'requests') {

                    let requests = this.Courses_RequestsData.filter(x => courseReq.id == x.Course_id && x.Status_id != 7);
                    Vue.set(this.updatedCourseReq, `requests`, requests);
                    if (this.updatedCourseReq.waiting) { this.updatedCourseReq.waiting = null }

                }

                setTimeout(function () {
                    $('.' + popName).addClass('active');
                }, 500);
            },

            closePop: function () {
                this.updatedCourseReq = false;
            },

            waitFilter(id) {

                return this.Waiting_list.filter(x => x.Course_id == id.Course_id).map(x => x = x.Requester_id)
                                        .map(x => x = this.adminusersData.filter(z => z.admin_id == x));
            },
            progFilter(id) {
                let requester = this.Courses_RequestsData.filter(x => x.Course_id == id.id && x.Status_id == 8);

                return requester.map(x => x = x.Requester_id)
                                        .map(x => x = this.adminusersData.filter(z => z.admin_id == x));
            },
            reqFilter(requests) {
                let requester = requests.Requester_id;
                return this.adminusersData.filter(z => z.admin_id == requester);
            },

            /*progress bar*/
            progress: function (width) {
                this.updatedCourse.Progress = width;
            },
            inputProgress: function (val, index, cat) {
                this[cat][index].Old_Prog = val;
            },

            /*update course*/
            updateCourse: function (course, status) {
                let that = this;

                if (status == 9 || course.Progress == 100) {

                    status = 9;

                    let today = new Date(new Date().getTime()).toISOString().slice(0, 10),
                        DateTo = new Date(course.Date_To + (1000 * 60 * 60 * 24)).toISOString().slice(0, 10);

                    if (today == DateTo || new Date().getTime() > course.Date_To) {

                        course.Progress = 100;
                        course.Status_id = 9;

                        swal({
                            title: "Are you sure you want to finish this course?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,

                        }).then((result) => {
                            if (!result) {

                                swal({
                                    title: 'Canceled',
                                    text: 'Sorry, this action has been cancelled!'

                                })
                            } else {
                                update();
                            }
                        });

                    } else {
                        swal({
                            title: "Not Yet!",
                            text: "The course can not be completed until " + DateTo + "!",
                            icon: "warning",
                            dangerMode: true,
                        });
                    }

                } else {
                    update();
                }

                function update() {
                    let req = [],
                        dateFrom = course['Date_From'],
                        dateTo = course['Date_To'],
                        joinDate = course['Final_JoinDate'];

                    if (typeof (dateFrom) != 'number' && typeof (dateTo) != 'number' && typeof (joinDate) != 'number') {
                        dateFrom = course['Date_From'].split('-');
                        dateTo = course['Date_To'].split('-');
                        joinDate = course['Final_JoinDate'].split('-');

                        dateFrom = (new Date(parseInt(dateFrom[0]), (parseInt(dateFrom[1]) - 1), parseInt(dateFrom[2]))).getTime();
                        dateTo = (new Date(parseInt(dateTo[0]), (parseInt(dateTo[1]) - 1), parseInt(dateTo[2]))).getTime();
                        joinDate = (new Date(parseInt(joinDate[0]), (parseInt(joinDate[1]) - 1), parseInt(joinDate[2]))).getTime();
                    }

                    let CourseIndex = that.CoursesData.map((x, i) => x.id == course.id ? i : -1).filter(x => x > -1)[0];


                    if (course.Progress == 0) {
                        req = that.Courses_RequestsData.filter(x => x.Course_id == course.id);
                    } else if (course.Progress < 100) {
                        req = that.Courses_RequestsData.filter(x => x.Course_id == course.id && x.Status_id == 5);
                    } else {
                        req = that.Courses_RequestsData.filter(x => x.Course_id == course.id && x.Status_id == 8);
                    }

                    that.CoursesData[CourseIndex].Active = course.Active;
                    that.CoursesData[CourseIndex].Name = course.Name;
                    that.CoursesData[CourseIndex].Description = course.Description;
                    that.CoursesData[CourseIndex].Conditions = course.Conditions;
                    that.CoursesData[CourseIndex].Limit = course.Limit;
                    that.CoursesData[CourseIndex].Branch = course.Branch;
                    that.CoursesData[CourseIndex].Date_From = dateFrom;
                    that.CoursesData[CourseIndex].Date_To = dateTo;
                    that.CoursesData[CourseIndex].Instructor = course.Instructor;
                    that.CoursesData[CourseIndex].Location_id = course.Location_id;
                    that.CoursesData[CourseIndex].Location_Name = course.Location_Name;
                    that.CoursesData[CourseIndex].Progress = course.Progress;
                    that.CoursesData[CourseIndex].Status_id = course.Status_id;
                    that.CoursesData[CourseIndex].Status_name = course.Status_name;
                    that.CoursesData[CourseIndex].No_Days = course.No_Days;
                    that.CoursesData[CourseIndex].Total_Hours = course.Total_Hours;
                    that.CoursesData[CourseIndex].CourseType_id = course.CourseType_id;
                    that.CoursesData[CourseIndex].CourseType_name = course.CourseType_name;
                    that.CoursesData[CourseIndex].Final_JoinDate = joinDate;
                    that.CoursesData[CourseIndex].Zoom_Link = course.Zoom_Link;
                    that.CoursesData[CourseIndex].Room_id = course.Room_id;
                    that.CoursesData[CourseIndex].Room_name = course.Room_name;
                    that.CoursesData[CourseIndex].Branch_name = course.Branch_name;

                    if (course['editPop'] == true) {

                        if (course.Name == "") {
                            swal({
                                title: "Error!",
                                text: "Sorry there is no title for this course ! ",
                                icon: "warning",
                                dangerMode: true,
                            });
                        } else if (course.Description == "") {
                            swal({
                                title: "Error!",
                                text: "Sorry there is no Description for this course ! ",
                                icon: "warning",
                                dangerMode: true,
                            });

                        } else if (course.Room_name == "") {
                            swal({
                                title: "Error!",
                                text: "Sorry there is no Room has been selected ! ",
                                icon: "warning",
                                dangerMode: true,
                            });

                        } else if (course.CourseType_name == "") {
                            swal({
                                title: "Error!",
                                text: "Sorry you did not select a type for this course ! ",
                                icon: "warning",
                                dangerMode: true,
                            });

                        } else if (dateFrom == 0) {
                            swal({
                                title: "Error!",
                                text: "Sorry you did not pick a start date for this course ! ",
                                icon: "warning",
                                dangerMode: true,
                            });

                        } else if (dateTo == 0) {
                            swal({
                                title: "Error!",
                                text: "Sorry you did not pick an end date for this course ! ",
                                icon: "warning",
                                dangerMode: true,
                            });

                        } else if (course.Instructor == "") {
                            swal({
                                title: "Error!",
                                text: "Sorry you did not name the instructor for this course ! ",
                                icon: "warning",
                                dangerMode: true,
                            });

                        } else if (joinDate == 0) {
                            swal({
                                title: "Error!",
                                text: "Sorry there is no final join date for this course ! ",
                                icon: "warning",
                                dangerMode: true,
                            });

                        } else if (new Date().getTime() > joinDate && new Date(joinDate).toDateString() != new Date().toDateString()) {
                            swal({
                                title: "Error!",
                                text: "Sorry the final join date is before today's date ",
                                icon: "warning",
                                dangerMode: true,
                            });
                        } else if (dateFrom > dateTo) {
                            swal({
                                title: "Error!",
                                text: "Sorry the start date is after the end date",
                                icon: "warning",
                                dangerMode: true,
                            });
                        }/** else if (((new Date(course.Date_To)).getTime() - (new Date(course.Date_From)).getTime()) / 86400000 < course.No_Days){
						swal({
							title: "Error!",
							text: "Sorry the end date should be after that ! ",
							icon: "warning",
							dangerMode: true,
						}); 
					}**/else if (joinDate > dateFrom) {
					    swal({
					        title: "Error!",
					        text: "Sorry the final join date is after the beginning of the course ",
					        icon: "warning",
					        dangerMode: true,
					    });
					} else {
					    let Newcourse = Object.assign({}, course);
					    Newcourse.Final_JoinDate = joinDate;
					    Newcourse.Date_From = dateFrom;
					    Newcourse.Date_To = dateTo;
					    $.ajax({

					        type: "POST",
					        url: "../Courses/admin.aspx/updateDetails",
					        data: JSON.stringify({ "detail": Newcourse }),
					        contentType: "application/json; charset=utf-8",
					        dataType: "json",
					        success: function () {

					            swal({
					                title: 'Sweet!',
					                text: "You successfully updated this course ...",
					                icon: 'success',
					                dangerMode: true
					            });

					            if (that.CoursesData[CourseIndex].Progress == 100) {
					                let i = that.inprogress.indexOf(that.inprogress.find(x => x.id == course.id));
					                if (that.updatedCourse) { that.updatedCourse.Status_id = 9 }
					                course.Status_id = 9;
					                that.inprogress.splice(i, 1);
					                that.finished.push(course);

					                // update table Courses requests
					                for (let i = 0; i < req.length; i++) {
					                    that.Courses_RequestsData.find(x => x["Status_id"] == 8 && x.Course_id == course.id).Status_id = status;
					                    req[i].Status_id = status;
					                    $.ajax({
					                        type: "POST",
					                        url: "../Courses/admin.aspx/updateStatus",
					                        data: JSON.stringify({ "detail": { "id": req[i].id, "Status_id": status } }),
					                        contentType: "application/json; charset=utf-8",
					                        dataType: "json"
					                    });
					                }
					            }
					        }
					    });
					}
                    }
                        // for progress bar
                    else {
                        let Newcourse = Object.assign({}, course);
                        $.ajax({

                            type: "POST",
                            url: "../Courses/admin.aspx/updateDetails",
                            data: JSON.stringify({ "detail": Newcourse }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function () {

                                if (that.CoursesData[CourseIndex].Progress == 100) {
                                    let i = that.inprogress.indexOf(that.inprogress.find(x => x.id == course.id));
                                    if (that.updatedCourse) { that.updatedCourse.Status_id = 9 }
                                    course.Status_id = 9;
                                    that.inprogress.splice(i, 1);
                                    that.finished.unshift(course);

                                    swal({
                                        title: 'Sweet!',
                                        text: "You successfully completed this course ...",
                                        icon: 'success',
                                        dangerMode: true,
                                    });

                                    // update table Courses requests
                                    for (let i = 0; i < req.length; i++) {
                                        that.Courses_RequestsData.find(x => x["Status_id"] == 8 && x.Course_id == course.id).Status_id = status;
                                        req[i].Status_id = status;
                                        $.ajax({
                                            type: "POST",
                                            url: "../Courses/admin.aspx/updateStatus",
                                            data: JSON.stringify({ "detail": { "id": req[i].id, "Status_id": status } }),
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "json"
                                        });
                                    }
                                } else {

                                    swal({
                                        title: 'Sweet!',
                                        text: "Progress-Bar has been updated ...",
                                        icon: 'success',
                                        dangerMode: true
                                    });

                                }
                            }
                        });


                    };



                }
            },

            delCourse: function (path, course) {
                let Course = course,
                    joined = this.Courses_RequestsData.filter(x => x.Status_id == 5 && x.Course_id == Course.id).length;

                if (joined == 0) {
                    swal({
                        title: "Are you sure?",
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
                                        url: '../Courses/admin.aspx/DelReason',
                                        data: JSON.stringify({ "course": { Delete_reason: reason, id: course.id } }),
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function () {
                                            $.ajax({
                                                type: "GET",
                                                url: path,
                                                success: function () {
                                                    swal("This Course has been deleted!", {
                                                        icon: "success",
                                                    }).then(() => {
                                                        location.reload();
                                                    });
                                                }
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
                            swal("Your Course is safe!");
                        }
                    });
                } else {
                    swal({
                        title: "Sorry!",
                        text: "You can not delete a course that has people joined in!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                }


            },

            attendanceFunc: function (courseId, attend) {

                attendance = Object.assign({}, this.Attendance);
                attendance.Course_id = courseId;
                attendance.Attend = attend;

				if (attendance.Attend_date) {
                attendance.Attend_date = attendance.Attend_date.split('-');

                attendance.Attend_date = (new Date(parseInt(attendance.Attend_date[0]), (parseInt(attendance.Attend_date[1]) - 1), parseInt(attendance.Attend_date[2]))).getTime();

                for (let i = 0; i < attendance.Requester_id.length; i++) {

                    let days = this.Courses_AttendanceData.filter(x => x.Course_id == attendance.Course_id && x.Attend_date == attendance.Attend_date && x.Requester_id == attendance.Requester_id[i]).length;
                    let that = this;

                    if (this.Courses_AttendanceData.filter(x => x.Course_id == attendance.Course_id && x.Requester_id == attendance.Requester_id[i]).length < that.CoursesData.filter(x => x.id == courseId)[0].No_Days) {

                        if (days == 0) {

                            let obj = {
                                "Course_id": attendance.Course_id,
                                "Attend": attendance.Attend,
                                "Attend_date": attendance.Attend_date,
                                "Requester_id": attendance.Requester_id[i]
                            };
                            $.ajax({
                                type: "POST",
                                url: "../Courses/admin.aspx/NewAttendance",
                                data: JSON.stringify({ "attendance": obj }),
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
            Evaluate: function (person, i) {
                let that = this;
                (that.updatedCourse).completed[that.Person[1]].Evaluation = that.Evaluation;


                // update table Courses requests
                $.ajax({
                    type: "POST",
                    url: "../Courses/admin.aspx/updateEvaluation",
                    data: JSON.stringify({ "detail": { "id": that.Person[0].id, "Evaluation": that.Evaluation } }),
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
			
		    // pre loader
			var loader = document.querySelector(".status-loader");
			loader.classList.add("disappear-loader");

            //get Courses
            $.ajax({
                type: "POST",
                url: "../Courses/admin.aspx/getCoursesData",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    cobject.CoursesData = JSON.parse(data.d).filter(x => !(x.Hide == true));
                    cobject.New = cobject.CoursesData.filter(x => x.Status_id == 1);
                    cobject.New = cobject.New.sort((a, b) => {
                        if (a.id > b.id)
                            return -1;
                        if (a.id < b.id)
                            return 1;
                        return 0;
                    });
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
					

					//get Courses_Requests
					$.ajax({
						type: "POST",
						url: "../Courses/admin.aspx/getCourses_RequestsData",
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function (data) {

							cobject.Courses_RequestsData = JSON.parse(data.d);
							cobject.Requested = (cobject.Courses_RequestsData).filter(x => ([2, 3, 4, 5, 6].indexOf(x['Status_id']) > -1) && x.Hide != true);

							// waiting list box
							cobject.Waiting_list = (cobject.Courses_RequestsData.map(x =>
																					 cobject.CoursesData.filter(z => (z.Status_id != 9))))[0].flat();

							cobject.RequestedBox = cobject.CoursesData.filter(z => z.Status_id != 8 && z.Status_id != 9).flat();

						}
					});
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
                }
            });


            //get Courses_Answers
            $.ajax({
                type: "POST",
                url: "../Courses/admin.aspx/getCourses_AnswersData",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    cobject.Courses_AnswersData = JSON.parse(data.d);
                }
            });

            //get Courses_QuestionsData
            $.ajax({
                type: "POST",
                url: "../Courses/admin.aspx/getCourses_QuestionsData",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    cobject.Courses_QuestionsData = JSON.parse(data.d);
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

                }
            });
			

		
			//get Files
			$.ajax({
				type: "POST",
				url: "../Courses/admin.aspx/getFilesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Files = JSON.parse(data.d);
				}
			});
        }


    });
}
});