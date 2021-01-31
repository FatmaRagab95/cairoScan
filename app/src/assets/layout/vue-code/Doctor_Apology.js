/******************** start Doctor_Apology *********************/
if ($('#Doctor_Apology').length != 0) {
	let Doctor_Apology = new Vue({

		el: '#Doctor_Apology',

		data: {
			Specialities: null,
			Doctors_AppologizeFor: null,
			adminusersData: null,
			Doctors_AppologizeApp: null,

			NewDoctors_AppologizeApp: {
				Doctor_name: '',
				Doctor_id: 1,
				Specialty_name:'',
				Specialty_id: 1,
				AppologizeFor_Desc: '',
				AppologizeFor_id: 1,
				Appologize_DateFrom: '',
				Appologize_TimeFrom: '',
				Appologize_DateTo: '',
				Appologize_TimeTo: '',
				Reason_id: 1,
				Reason_Desc: '',
				Notes: '',
			},
		},

		methods: {

			OnSubmit: function () {
				let that = this;
				var ObjectD = Object.assign({}, this.NewDoctors_AppologizeApp);

				ObjectD['Doctor_name'] = this.adminusersData[0].FullName;
				ObjectD['Doctor_id'] = this.adminusersData[0].admin_id;

				//ObjectD['Doctor_name'] = this.adminusersData.filter(x => x['admin_id'] == ObjectD['Doctor_id'])[0]['FullName'];
				
				
				if(ObjectD.Specialty_name == ""){
					swal({
						title: "Error!",
						text: "Sorry you should choose the speciality name ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if(ObjectD.AppologizeFor_Desc == ""){
					swal({
						title: "Error!",
						text: "Sorry you should choose from the apologize for field ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if(ObjectD.Appologize_TimeFrom == ""){
					swal({
						title: "Error!",
						text: "Sorry the time from field is empty ! ",
						icon: "warning",
						dangerMode: true,
					});  
				}  else if(ObjectD.Appologize_TimeTo == ""){
					swal({
						title: "Error!",
						text: "Sorry the time to field is empty ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else if(ObjectD.Appologize_DateFrom == ""){
					swal({
						title: "Error!",
						text: "Sorry the date from field is empty ! ",
						icon: "warning",
						dangerMode: true,
					});  
				}else if(ObjectD.Reason_Desc == ""){
					swal({
						title: "Error!",
						text: "Sorry you should enter the reason for this apology ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else {
					ObjectD['Specialty_name'] = this.Specialities.filter(x => x['Spcy_id'] == ObjectD['Specialty_name'])[0].Spcy_name_En;
					ObjectD['AppologizeFor_Desc'] = this.Doctors_AppologizeFor.filter(x => x['id'] == ObjectD['AppologizeFor_Desc'])[0].Name;
					
					$.ajax({  
						type: "POST",
						url: "../OPD/Doctor_Apology.aspx/NewDoctors_AppologizeApp",
						data: JSON.stringify({ "Doctor_AppologizeApp": ObjectD }),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function () {
							swal({
								title: 'Good job!',
								text: "You successfully added doctor apology ...",
								icon: 'success',	
							}).then((result) => {
								if (result) {
									window.location = "Doctor_Apology.aspx";
								} else {
									swal({
										title: 'Canceled',
										text : 'Sorry, you can not add your apology !'
									})
								}
							})  
						}
					})

				}

				/**$.ajax({  
						type: "POST",
						url: "../OPD/Doctor_Apology.aspx/NewDoctors_AppologizeApp",
						data: JSON.stringify({ "Doctor_AppologizeApp": ObjectD }),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function () {
							swal({
								title: 'Good job!',
								text: "You successfully added doctor apology ...",
								icon: 'success',	
							}).then((result) => {
								if (result) {
									window.location = "Doctor_Apology.aspx";
								} else {
									swal({
										title: 'Canceled',
										text : 'Sorry, you can not add your apology !'
									})
								}
							})  
						}
					})**/

			}  
		},	

		created: function () {
			let cobject = this;

			//get adminusers
			$.ajax({
				type: "POST", 
				url: "../OPD/Doctor_Apology.aspx/getadminusersData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.adminusersData = JSON.parse(data.d);
					console.log(cobject.adminusersData);	
				}
			});

			//get Specialities
			$.ajax({
				type: "POST", 
				url: "../OPD/Doctor_Apology.aspx/getSpecialitiesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Specialities = JSON.parse(data.d);

				}
			});

			//get Doctors_AppologizeFor
			$.ajax({
				type: "POST", 
				url: "../OPD/Doctor_Apology.aspx/getDoctors_AppologizeForData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Doctors_AppologizeFor = JSON.parse(data.d);

				}
			});
			
				//get Doctors_AppologizeApp
			$.ajax({
				type: "POST", 
				url: "../OPD/Doctor_Apology.aspx/getDoctors_AppologizeAppData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Doctors_AppologizeApp = JSON.parse(data.d);

				}
			});



		}

	});
}