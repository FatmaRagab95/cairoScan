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
		Total_Hours: 1,
		No_Days: 1,
		CourseType_id: 1,
		CourseType_name: '',
		Zoom_Link: '',
		Room_id: 1,
		Room_name: '',
		Branch:1,
		Branch_name: '',
        Date_From: 0,
        Date_To: 0,
		Final_JoinDate: 0,
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
		let that = this;
		var ObjectD = Object.assign({}, this.newCourse);

		if (typeof(ObjectD['Date_From']) != 'number' && typeof(ObjectD['Date_To']) != 'number' && typeof(ObjectD['Final_JoinDate']) != 'number') {
			
			let dateFrom      = ObjectD['Date_From'].split('-'),
				finalJoinDate = ObjectD['Final_JoinDate'].split('-'),
				dateTo        = ObjectD['Date_To'].split('-');
			
			ObjectD['Date_From']       = (new Date(parseInt(dateFrom[0]), (parseInt(dateFrom[1]) - 1), parseInt(dateFrom[2]))).getTime();
			ObjectD['Final_JoinDate']  = (new Date(parseInt(finalJoinDate[0]), (parseInt(finalJoinDate[1]) - 1), parseInt(finalJoinDate[2]))).getTime();
			ObjectD['Date_To']         = (new Date(parseInt(dateTo[0]), (parseInt(dateTo[1]) - 1), parseInt(dateTo[2]))).getTime();
			
		} else if (typeof (ObjectD['Date_From']) != 'number') {
            let dateFrom = ObjectD['Date_From'].split('-');
            ObjectD['Date_From'] = (new Date(parseInt(dateFrom[0]), (parseInt(dateFrom[1]) - 1), parseInt(dateFrom[2]))).getTime();
			
        } else if (typeof (ObjectD['Final_JoinDate']) != 'number') {
            let finalJoinDate = ObjectD['Final_JoinDate'].split('-');
            ObjectD['Final_JoinDate'] = (new Date(parseInt(finalJoinDate[0]), (parseInt(finalJoinDate[1]) - 1), parseInt(finalJoinDate[2]))).getTime();
			
        }else if (typeof (ObjectD['Date_To']) != 'number') {
            let dateTo = ObjectD['Date_To'].split('-');
            ObjectD['Date_To'] = (new Date(parseInt(dateTo[0]), (parseInt(dateTo[1]) - 1), parseInt(dateTo[2]))).getTime();
        };
		  
		ObjectD['Location_Name'] = this.Locations.filter(x => x['id'] == ObjectD['Location_id' ])[0]['Name'];
		ObjectD['Branch_name'] = this.Branches.filter(x => x['id'] == ObjectD['Branch' ])[0]['Branch_EName'];
		  
		if (ObjectD.Name == ""){
		     swal({
				 title: "Error!",
				 text: "Sorry there is no title for this course ! ",
				 icon: "warning",
				 dangerMode: true,
			 });  
		 } else if (ObjectD.Description == ""){
		     swal({
				 title: "Error!",
				 text: "Sorry there is no Description for this course ! ",
				 icon: "warning",
				 dangerMode: true,
			 }); 
			 
		 }else if (ObjectD.Room_name == ""){
		     swal({
				 title: "Error!",
				 text: "Sorry there is no training space has been selected ! ",
				 icon: "warning",
				 dangerMode: true,
			 }); 
			 
		 }else if (ObjectD.CourseType_name == ""){
		     swal({
				 title: "Error!",
				 text: "Sorry you did not select a course method for this course ! ",
				 icon: "warning",
				 dangerMode: true,
			 }); 
			 
		 }else if (ObjectD.Date_From == 0){
		     swal({
				 title: "Error!",
				 text: "Sorry you did not pick a start date for this course ! ",
				 icon: "warning",
				 dangerMode: true,
			 });
			 
		 }else if (ObjectD.Date_To == 0){
		     swal({
				 title: "Error!",
				 text: "Sorry you did not pick an end date for this course ! ",
				 icon: "warning",
				 dangerMode: true,
			 }); 
			 
		 }else if (ObjectD.Instructor == ""){
		     swal({
				 title: "Error!",
				 text: "Sorry you did not name the instructor for this course ! ",
				 icon: "warning",
				 dangerMode: true,
			 }); 
			 
		 }else if (ObjectD.Final_JoinDate == 0){
		     swal({
				 title: "Error!",
				 text: "Sorry there is no final join date for this course ! ",
				 icon: "warning",
				 dangerMode: true,
			 }); 
			 
		 }else if((new Date().getTime()) > (new Date(ObjectD.Final_JoinDate).getTime() + (1000 * 60)) && 
				  new Date(ObjectD.Final_JoinDate).toDateString() != new Date().toDateString()  ){ 
				 swal({
					 title: "Error!",
					 text: "Sorry the final join date is before today's date ",
					 icon: "warning",
					 dangerMode: true,
				 }); 
			
		 }else if((new Date(ObjectD.Date_From)).getTime() > (new Date(ObjectD.Date_To)).getTime()){
			 swal({
				 title: "Error!",
				 text: "Sorry the start date is after the end date",
				 icon: "warning",
				 dangerMode: true,
			 }); 
		  } /*else if (((new Date(this.newCourse.Date_To)).getTime() - (new Date(this.newCourse.Date_From)).getTime()) / 86400000 < this.newCourse.No_Days){
		     swal({
				 title: "Error!",
				 text: "Sorry the end date should be after that ! ",
				 icon: "warning",
				 dangerMode: true,
			 }); 
		 } */else if((new Date(ObjectD.Final_JoinDate)).getTime() > (new Date(ObjectD.Date_From)).getTime()){
			 swal({
				 title: "Error!",
				 text: "Sorry the final join date is after the beginning of the course ",
				 icon: "warning",
				 dangerMode: true,
			 }); 
		 } else {
			 
			  swal({
				  title: "Are you sure you entered all data required for creating this course?",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,

			  }).then((result) => {
				  if (!result) {
					  
					  swal({
						  title: 'Canceled',
						  text : 'Sorry, the creation of this course has been cancelled!'
					 
					  })
				  } else {
					  
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
							  window.location = "admin.aspx";	  
						  }
					  })

				  }
			  })

			 
		  /**    $.ajax({
				  type: "POST",
				  url: "../Courses/create_Course.aspx/NewCourse",
				  data: JSON.stringify({ "course": ObjectD }),
				  contentType: "application/json; charset=utf-8",
				  dataType: "json",
				  success: function () {
					  
					  ObjectD.Date_To = 0;
					  ObjectD.Date_From = 0;
					  ObjectD.Final_JoinDate = 0;
					  
					  swal({
						  title: 'Sweet!',
						  text: "You successfully added anew course ...",
						  icon: 'success',	
						  dangerMode: true,
					  });
				  }  
              });**/
		 };    
      },
		
		
	  addLink: function () {
	     let courseType   = document.getElementById("course-type"),
		     zoomLink     = document.getElementById("zoom-link");
		  
		  if(this.newCourse.CourseType_name == "On line course"){
			  courseType.classList.remove("col-md-12");
			  courseType.classList.add("col-md-6");
			  zoomLink.classList.remove("d-none");
		  }else{
			  courseType.classList.add("col-md-12");
			  courseType.classList.remove("col-md-6");
			  zoomLink.classList.add("d-none");
		  }
		  
	
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

    }

  });
}