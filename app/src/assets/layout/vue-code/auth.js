if ($('#auth').length > 0) {
	let cat = new Vue({
		el: '#auth',
		data: {
			pages:[],
			cats:[],
			chosenCat:0,
			chosenPages: [],
			Branches: [],
			Departments: [],
			Roles: [],
			All:'11',
			Branch_ID:0,
			Dept_id:0,
			Role_id:[],
			Emp_ID:0,
			searchBy:'',
			SearchPhase:true,
			viewPhase:false,
			addPhase:false,
			authorisedPages:[],
			loading:false,
			cond:'',
			newAuth: {
				page:0,
				control:true
			}
		},
		methods: {
			// get authorised pages
			search() {
				if (this.searchBy != '' && !!this[this.searchBy] && [this[this.searchBy]].flat().length > 0) {

					let that = this;
					that.cond = that.searchBy + '=' + that[that.searchBy];
					if (that.searchBy == 'Role_id' && typeof(that[that.searchBy]) != 'string') {
						that[that.searchBy] = that[that.searchBy].join();
						that.cond = "@Role_id LIKE '%' + CONVERT(varchar, Role_id)+ '%'";
					} else if (that.searchBy == 'All') {
						that.cond = '1=1'
					}

					that.loading = true;
					$.ajax({
						type: "POST", 
						url:"../controls/auth.aspx/getAuthPages",
						data:JSON.stringify({"c":{"cond": that.cond,"Role_id":that[that.searchBy], 'forSearch': that.searchBy}}),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function (data) {
							let arr = [];
							that.authorisedPages = JSON.parse(data.d);
							that.authorisedPages = that.authorisedPages.filter(x => !arr.includes(x.menu_id) ? arr.push(x.menu_id) : false)
						},
						complete: function () {
							that.loading = false;
							that.SearchPhase = false;
							that.addPhase = false;
							that.viewPhase = true;
						}
					});
				}
			},
			addPage() {
				let that = this;
				$.ajax({
					type: "POST", 
					url:"../controls/auth.aspx/getadminusersData",
					data:JSON.stringify({"auth":{"menu_id": that.newAuth.page,
												 "For_Search":that.searchBy,
												 'control':  that.newAuth.control,
												 'condition': that.cond,
												 "Role_id":that[that.searchBy]
												}}),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					beforeSend() {
						swal({
							title: "Sending...",
							text: "Please wait",
							showConfirmButton: false,
							allowOutsideClick: false
						});
					},
					error() {
						swal({
							title: 'Error!',
							text: "Something went wrong please try again later!",
							icon: 'warning',	
							dangerMode: true,
						});
					},
					complete: function (data) {
						swal({
							title: 'Done!',
							text: "You successfully added authority",
							icon: 'success',	
						}).then((result) => {
							if (result) {
								that.search();
							}
						});
					}
				});
			},
			deleteAuth(menu_id, For_Search) {
				let that = this;
				that.Role_id = typeof(that.Role_id) == 'string' ? that.Role_id : 1;
				swal({
					title: "Are you sure?",
					buttons: true,
					icon: 'warning',
				}) .then((confirm) => {
					if (confirm) {
						$.ajax({
							type: "POST", 
							url: "../controls/auth.aspx/deleteAuth",
							data:JSON.stringify({"auth": {"menu_id": menu_id, "For_Search": For_Search, "condition": that.cond,"Role_id":that.Role_id }}),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function (data) {
								swal({
									title: 'Done!',
									icon: 'success',	
								});
								that.authorisedPages = that.authorisedPages.filter(x => x.menu_id != menu_id)
							}
						});
					}
				});

			}
		},
		created: function () {
			let that = this;

			//get branches
			$.ajax({
				type: "POST", 
				url: "../controls/auth.aspx/getBranchData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.Branches = JSON.parse(data.d);
				}
			});

			//get branches
			$.ajax({
				type: "POST", 
				url: "../controls/auth.aspx/getRolesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.Roles = JSON.parse(data.d);
				}
			});

			//get Departments
			$.ajax({
				type: "POST",
				url: '../controls/auth.aspx/getDeptsData',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.Departments = JSON.parse(data.d);
				}
			});

			//get pages
			$.ajax({
				type: "POST", 
				url: "../controls/auth.aspx/getpagesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.pages = JSON.parse(data.d);

				}
			});

			//get cats
			$.ajax({
				type: "POST", 
				url: "../controls/auth.aspx/getcatsData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					that.cats = JSON.parse(data.d);
					that.chosenCat = that.cats.length ? that.cats[0].id : 0 
				}
			});
		}
	});
}