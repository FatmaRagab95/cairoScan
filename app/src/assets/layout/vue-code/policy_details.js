/******************** start policies *********************/
if ($('#policies_details').length != 0) {
	new Vue({
		el: '#policies_details',

		data: {
			Policeis_Procedures: [],
			viewFile: '',
			policy: false,
			Departments: [],
			pagesArr: [],
			depts: []
		},

		methods: {
			popUp: function (file) {
				//this.policy = false;
				this.viewFile = file.endsWith("/preview") ? file : "https://drive.google.com/file/d/" + file + "/preview";
			},
			popDetails: function (policy) {
				this.policy = Object.assign({},policy);
				Departments = this.depts.filter(z => z.policy_id == this.policy.P_id).map(dep => (this.Departments.filter(x => x.dept_id == dep.dept_id)[0].dept_id));
				Vue.set(this.policy, 'Departments', Departments);
				this.policy.File_Path  = "https://drive.google.com/file/d/" + (this.policy.File_Path.endsWith("/preview") ? this.policy.File_Path + "" : this.policy.File_Path + "/preview");
			},
			close: function () {
				this.viewFile = '';
				this.policy = false;
			},
			OnSubmit: function (policyId) {
				let policyIndex = this.Policeis_Procedures.map((x, i) => x.P_id == policyId ? i : -1).filter(x => x > -1)[0];
				    this.Policeis_Procedures[policyIndex] = this.policy,
					numInputs     = $('.Policy .cu-input input').length,
				    checkedInputs = Array.from($('.Policy .cu-input input')).filter(x => $(x).val() != '').length,
					numSelects    = $('.Policy .cu-field select').length,
					selected      = Array.from($('.Policy .cu-field select')).filter(x => $(x).val()).length,
					that = this;
				
				if (numInputs == checkedInputs && numSelects == selected) {
					  let oldDepts = this.depts.filter(z => z.policy_id == this.policy.P_id).map(dep => (this.Departments.filter(x => x.dept_id == dep.dept_id)[0].dept_id)),
						  newDepts = this.policy.Departments;
					  (that.policy).File_Path = (that.policy).File_Path.split('/').slice(-2,-1)[0];
					
					  $.ajax({  
						  type: "POST",
						  url: "../Policy/policy_details.aspx/updatePolicy",
						  data: JSON.stringify({ "policy": that.policy }),
						  contentType: "application/json; charset=utf-8",
						  dataType: "json",
						  success: function () {
							  // insert new departments
							  for (let i = 0; i < newDepts.length; i++) {
								  if (oldDepts.indexOf(newDepts[i]) == -1) {
										$.ajax({  
										  type: "POST",
										  url: "../Policy/policy_details.aspx/updateDepts",
										  data: JSON.stringify({ "dept": {"dept_id":newDepts[i],"policy_id": that.policy.P_id} }),
										  contentType: "application/json; charset=utf-8",
										  dataType: "json"
									    });
								  }
							  }
							  
							  for (let i = 0; i < oldDepts.length; i++) {
								  if (newDepts.indexOf(oldDepts[i]) == -1) {
									  let id = that.depts.filter(x => x.dept_id == oldDepts[i] && that.policy.P_id == x.policy_id)[0].id;
									  $.ajax({  
										  type: "POST",
										  url: "../Policy/policy_details.aspx/deleteDepts",
										  data: JSON.stringify({ "dept": {"id":id} }),
										  contentType: "application/json; charset=utf-8",
										  dataType: "json",
									  });
								  }
							  }

							  that.policy.Departments =  newDepts;

							  swal({
								  title: 'Saved!',
								  icon: 'success',	
								  dangerMode: true,
							  }).then(() => {
								  //$('.popup').removeClass('active');
								  location.reload()
							  }); 
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
			},

            delPolicy: function (path) {
				swal({
					title: "Are you sure?",
					icon: "warning",
					buttons: true,
					dangerMode: true,

				}).then((willDelete) => {

					if (willDelete) {
						$.ajax({
							type: "GET",
							url: path,
							success: function () {
								swal("Deleted!", {
									icon: "success",
								}).then(() => {
									location.reload();
								});
							}
						});
					} else {
						swal("This policy is safe!");
					}
				});


            }
		},
		
		created: function () {
			
			let that = this;

			//get pages
			$.ajax({
				type: "POST",
				url: '../Policy/policy_details.aspx/getPages',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					let accessedPages = JSON.parse(data.d);
					let arr = accessedPages.map(x => x.CategoryId);
					arr = Array.from(new Set(JSON.parse(data.d).map(x => x.CategoryId)));
					that.pagesArr = arr.map(x => accessedPages.filter(z => z.CategoryId == x));
				}
			});

			//get Policeis Procedures
			var qString =  "?" + window.location.href.split("?")[1];
			console.log(qString);
            $.ajax({ 
              url: "../Policy/policy_details.aspx/getPoliceis_ProceduresData" + qString,
              data: {},
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              type: "POST",
              success: function(data){
				that.Policeis_Procedures = JSON.parse(data.d);
			  }
             });

			//get Departments
			$.ajax({
				type: "POST",
				url: '../Policy/policy_details.aspx/getDeptsData',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.Departments = JSON.parse(data.d);
				}
			});
			
			//get selected Departments
			$.ajax({
				type: "POST",
				url: '../Policy/policy_details.aspx/getSelectedDepts',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.depts = Array.from(new Set(JSON.parse(data.d)));
				}
			});

		}

	});
}