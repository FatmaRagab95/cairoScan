/******************** start Vacation_type *********************/
if ($('#Vacation_type').length != 0) {
	let Vacation_type = new Vue({

		el: '#Vacation_type',

		data: {
			Vacations: null,

			NewHR_Vacation_Type: {
				Type_Name: '',
			},
		},

		methods: {
			SubmitVacationType: function () {
				let that = this;
				var ObjectD = Object.assign({}, this.NewHR_Vacation_Type);

				if(ObjectD.Type_Name == ""){
					swal({
						title: "Error!",
						text: "Sorry you should type the vacation type ! ",
						icon: "warning",
						dangerMode: true,
					});  
				} else {
					//ObjectD['Type_Name'] = this.types.filter(x => x['id'] == ObjectD['Type_Name'])[0].Type_Name;

					$.ajax({  
						type: "POST",
						url: "../Hr_Portal/Vacation_type.aspx/NewHR_Vacation_Type",
						data: JSON.stringify({ "Vacation_Type": ObjectD }),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function () {
							swal({
								title: 'Good job!',
								text: "You successfully added vacation type ...",
								icon: 'success',	
							}).then((result) => {
								if (result) {
									window.location = "Vacation_type.aspx";
								} else {
									swal({
										title: 'Canceled',
										text : 'Sorry, you can not add vacation type !'
									})
								}
							})  
						}
					})
				}
			},
			
			 deleteVacation: function (id, hide) {
               
                $.ajax({
                    type: "POST",
                    url: "../Hr_Portal/Vacation_type.aspx/updateHide",
                    data: JSON.stringify({ "detail": { "id": id, "Hide": hide } }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {
						swal({
							 title: 'Success!',
                            text: "You successfully cleared the vacation type ...",
                            icon: 'success',	
						}).then((result) => {
							if (result) {
								window.location = "Vacation_type.aspx";
							} else {
								swal({
									title: 'Canceled',
									text : 'Sorry, you can not delete the vacation type !'
								})
							}
						})		
                    }
                });
            },

		},
	

		created: function () {
			let cobject = this;

			//get Vacation types
			$.ajax({
				type: "POST", 
				url: "../Hr_Portal/Vacation_type.aspx/gettypesData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.types = JSON.parse(data.d);
					cobject.Vacations = cobject.types.filter(x => x.Hide == false );

				}
			});		

		}

	});
}