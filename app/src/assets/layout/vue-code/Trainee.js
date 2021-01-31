/******************** start Trainee *********************/
if ($('#Trainee').length != 0) {
	let Trainee = new Vue({

		el: '#Trainee',

		data: {
			adminusersData: [],
			getDeptsData: [],
			Lectures: [],
			editLecture: [],
			BranchData: [],
			Training_Lecture: [],
			Training_Attachments: [],
			lectureDetails: [],
			Training_JoinsData: [],
		},

		methods: {
			popUp: function (lec, popName) {
				lec['detailsPop'] = false;
				lec[popName] = true;
				this.lectureDetails = Object.assign({}, lec);

				setTimeout(function () {
					$('.' + popName).addClass('active');
				}, 500);
			},

			close: function () {
				this.lectureDetails = false;
			},

		},

		created: function () {
			let cobject = this;

			//get Training_Lecture
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Trainee.aspx/getTraining_LectureData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Lectures = JSON.parse(data.d);
					cobject.Training_Lecture = cobject.Lectures.filter(x => x.Hide == false).filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
					
					cobject.editLecture = cobject.Training_Lecture;

					cobject.editLecture.map(x => {x.LectureFor_Branch = x.LectureFor_Branch.split("#").filter(z => z != "" && z != ',' ? parseInt(z) : false); 
												  x.LectureFor_Department = x.LectureFor_Department.split("#").filter(z => z != "" && z != ',' ? z : false);
												  x.LectureFor_Group = x.LectureFor_Group.split("#").filter(z => z != "" && z != ',' ? z : false);
												  x.LectureFor_Role = x.LectureFor_Role.split("#").filter(z => z != "" && z != ',' ? z : false); 
												  x.LectureFor_Emp = x.LectureFor_Emp.split("#").filter(z => z != "" && z != ',' ? z : false)});
				}
			});
			
				//get getBranchData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Trainee.aspx/getBranchData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.BranchData = JSON.parse(data.d);
				}
			});
			
				//get Training_Joins
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Trainee.aspx/getTraining_JoinsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Training_JoinsData = JSON.parse(data.d);
				}
			});


			//get Training_Attachments
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Trainee.aspx/getTraining_AttachmentsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Training_Attachments = JSON.parse(data.d);
				}
			});
			
			//get getadminusersData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Trainee.aspx/getadminsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.adminusersData = JSON.parse(data.d);
				}
			});
			
			//get getDeptsData
			$.ajax({
				type: "POST", 
				url: "../Zoom_Training/Trainee.aspx/getDeptsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.DeptsData = JSON.parse(data.d);
				}
			});



		}

	});
}