/******************** start policies *********************/
if ($('#policies').length != 0) {
	let policies = new Vue({
		el: '#policies',

		data: {
			Departments: [],
			deptsPolicies: [],
		},

		methods: {
			
		},
		
		created: function () {
			
			let that = this;
			
			//get Departments
			$.ajax({
				type: "POST",
				url: '../Policy/policies.aspx/getDeptsData',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.Departments = JSON.parse(data.d);
				}
			});
			
			//get Policeis Procedures
			$.ajax({
				type: "POST",
				url: '../Policy/policies.aspx/getSelectedDepts',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.deptsPolicies = JSON.parse(data.d);
				}
				
			});

		}

	});
}