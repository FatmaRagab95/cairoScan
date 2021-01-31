if ($('#createPolicy').length > 0) {
	new Vue({
		el: '#createPolicy',
		data: {
			Departments: [],
			newPolicy: {
				Policy_Title: '',
				Policy_Type: '',
				SN: '',
				Policy_Type: '',
				Policy_Number: '',
				JCI_Chapter:'',
				Issue_date:'',
				Version_No:'',
				Effective_date:'',
				Due_Revision_date:'',
				Department:[],
				Repared_By:'',
				Revised_By:'',
				Approved_By:'',
				File_Path:''
			}
		},
		methods: {
			OnSubmit: function () {
				let numInputs     = $('.Policy .cu-input input').length,
				    checkedInputs = Array.from($('.Policy .cu-input input')).filter(x => $(x).val() != '').length,
					numSelects    = $('.Policy .cu-field select').length,
					selected      = Array.from($('.Policy .cu-field select')).filter(x => $(x).val()).length;
				
				if (numInputs == checkedInputs && numSelects == selected) {
					  let that = this;
					  //that.newPolicy.Department =  this.newPolicy.Department.map(x => '#' + x + '#').join();
					  (that.newPolicy).File_Path = (that.newPolicy).File_Path.split('/').slice(-2,-1)[0];
					
					  $.ajax({  
						  type: "POST",
						  url: "../Policy/create.aspx/NewPolicy",
						  data: JSON.stringify({ "policy": that.newPolicy }),
						  contentType: "application/json; charset=utf-8",
						  dataType: "json",
						  success: function () {
							  swal({
								  title: 'Saved!',
								  text: "You successfully added a new policy ...",
								  icon: 'success',	
								  dangerMode: true,
							  }).then(() => {
								  location.reload();
							  }); 
						  },
						  error: function () {
							  that.newPolicy.Department = [];
						  }
					  })
				} else {
					swal({
						 title: "Error!",
						 text: "You must fill in all the fields! ",
						 icon: "warning",
						 dangerMode: true,
					 });
				}
			}
		},
		created: function () {
			let that = this;
			//get Departments
			$.ajax({
				type: "POST",
				url: '../Policy/create.aspx/getDeptsData',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.Departments = JSON.parse(data.d);
				}
			});
		}
	});
}