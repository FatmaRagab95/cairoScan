if ($('#add_cat').length > 0) {
	let cat = new Vue({
		el: '#add_cat',
		data: {
			cat_name:'',
			cat_icon: ''
		},
		methods: {
			addCat: function () {
				let that = this;
				if (that.cat_name != "" && that.cat_icon != '') {
					$.ajax({
						type: "POST",
						url: '../controls/add_cat.aspx/addCat',
						data: JSON.stringify({ "cat": {name : that.cat_name , icon: that.cat_icon} }),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function () {
							swal("Saved!");

							that.cat_name = '';
							that.cat_icon = '';
						}
					});
			    } else {
					swal({
						 title: "Error!",
						 text: "You must fill in all the fields! ",
						 icon: "warning",
						 dangerMode: true,
					 }); 
				}
			}
		}
	});
}

// add page
if ($('#add_page').length > 0) {
	let cat = new Vue({
		el: '#add_page',
		data: {
			cats:null,
			newPage: {
				Name: '',
				Path: '',
				Icon:'',
				ParentID:0,
				CategoryId: 0,
				Enabled: true
			}
		},
		methods: {
			addPage: function () {
				let that = this;
				if (that.newPage.Name == '') {
					swal({
					  icon: 'error',
					  text: 'Type a name for this page!'
					});
				} else if (that.newPage.Path == '') {
					swal({
					  icon: 'error',
					  text: 'Type a Path for this page!'
					});
				} else if (that.newPage.CategoryId == 0) {
					swal({
					  icon: 'error',
					  text: 'Choose a category for this page!'
					});
				} else {
					$.ajax({
						type: "POST",
						url: '../controls/add_pages.aspx/addPage',
						data: JSON.stringify({ "page": that.newPage }),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function () {
							swal("Saved!");

							that.newPage = {};
						}
					});
				}
			}
		},
		created: function () {
			let that = this;
			//get cats
			$.ajax({
					type: "POST", 
					url: "../controls/add_pages.aspx/getcatsData",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (data) {
					that.cats = JSON.parse(data.d);

				}
			});
		}
	});
}

// add employee
if ($('#add_employee').length > 0) {
	let cat = new Vue({
		el: '#add_employee',
		data: {
			pages:[],
			cats:[],
			chosenCat:0,
			chosenPages: [],
			Employees: [],
			Branches: [],
			Departments: [],
			newEmp: {
				FullName: '',
				user_name: '',
				Role_id:1,
				Branch_ID: 0,
				Title: '',
				Job_Description: '',
				Dept_id: 0,
				Email:'',
				active: true,
				ManagerId:'',
				admin_id: 0
			},
			Manager: null
		},
		methods: {
			changeRole: function () {
				this.newEmp.Dept_id = 0;
				this.newEmp.Branch_ID = 0;
			},
			addEmp: function () {
				let numInputs     = $('#add_employee .cu-input input').length,
				    checkedInputs = Array.from($('#add_employee .cu-input input')).filter(x => $(x).val() != '').length,
					numSelects    = $('#add_employee .cu-field select').length,
					selected      = Array.from($('#add_employee .cu-field select')).filter(x => $(x).val()).length;
				
				if (numInputs == checkedInputs && numSelects == selected) {
					let that = this;
					that.Manager = that.Employees.filter(x => x.Role_id == (parseInt(that.newEmp.Role_id) + 1) && that.newEmp.Branch_ID == x.Branch_ID && that.newEmp.Dept_id == x.Dept_id).map(x => x.admin_id);

					if (that.Manager.length > 0) {
						that.newEmp.ManagerId = that.Manager.map(x => '#' + x + '#').join();
					}

					$.ajax({
						type: "POST",
						url: '../controls/add_employee.aspx/NewEmp',
						data: JSON.stringify({ "emp": that.newEmp }),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function () {

							for (let i = 0; i < that.chosenPages.length; i++) {
								$.ajax({
									type: "POST",
									url: '../controls/add_employee.aspx/addAuth',
									data: JSON.stringify({ "auth": {"admin_id": 0, "menu_id": that.chosenPages[i]} }),
									contentType: "application/json; charset=utf-8",
									dataType: "json",
									success: function () {
										if (i == that.chosenPages.length - 1) {
											swal("Saved!");
											that.newEmp = {};
											that.chosenPages = [];
										}
									}
								});
							}
						}
					});
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
			//get employee
			$.ajax({
					type: "POST", 
					url: "../controls/add_employee.aspx/getadminusersData",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (data) {
					that.Employees = JSON.parse(data.d);

				}
			});
			
			//get branches
			$.ajax({
					type: "POST", 
					url: "../controls/add_employee.aspx/getBranchData",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (data) {
					that.Branches = JSON.parse(data.d);
				}
			});
			
			//get pages
			$.ajax({
					type: "POST", 
					url: "../controls/add_employee.aspx/getpagesData",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (data) {
					that.pages = JSON.parse(data.d);

				}
			});
			
			//get cats
			$.ajax({
					type: "POST", 
					url: "../controls/add_pages.aspx/getcatsData",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (data) {
					that.cats = JSON.parse(data.d);
					that.chosenCat = that.cats.length ? that.cats[0].id : 0 
				}
			});

            //get Departments
			$.ajax({
				type: "POST",
				url: '../controls/add_employee.aspx/getDeptsData',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.Departments = JSON.parse(data.d);
				}
			});
		}
	});
}