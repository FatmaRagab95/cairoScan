/******************** start _Display_Apologies *********************/
if ($('#Display_Apologies').length != 0) {
	
	let Display_Apologies = new Vue({

		el: '#Display_Apologies',

		data: {
			Doctors_AppologizeApp: null,
			Requestes: null,
		},

		methods: {
			
			 deleteApology: function (id, hide) {
               
                $.ajax({
                    type: "POST",
                    url: "../OPD/Display_Apologies.aspx/updateHide",
                    data: JSON.stringify({ "detail": { "id": id, "Hide": hide } }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {
						swal({
							 title: 'Success!',
                            text: "You successfully cleared the apology request ...",
                            icon: 'success',	
						}).then((result) => {
							if (result) {
								window.location = "Display_Apologies.aspx";
							} else {
								swal({
									title: 'Canceled',
									text : 'Sorry, you can not delete your apology !'
								})
							}
						})
						
						
                    }
                });
            },

		},
		
		created: function () {
			let cobject = this;
			
			//get Doctors_AppologizeApp
			$.ajax({
				type: "POST", 
				url: "../OPD/Display_Apologies.aspx/getDoctors_AppologizeAppData",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					cobject.Doctors_AppologizeApp = JSON.parse(data.d);
					cobject.Requestes = cobject.Doctors_AppologizeApp.filter(x => x.Hide == false );
				}
			});

		}

	});
}