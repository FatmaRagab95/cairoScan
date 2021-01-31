if (0 != $("#Profile").length) {
	var ProfileApp = new Vue({
		el: "#Profile",
		data: { 
			oldPass: "",
			newPass: "",
			confirm: ""
		},
		methods: {
			updateInfo: function () {
				let info = {
					FullName: document.getElementById("FullName").value,
					Email:    document.getElementById("Email").value,
					Mobile_1: document.getElementById("Mobile_1").value,
					Mobile_2: document.getElementById("Mobile_2").value
				};
				
				if (info.FullName.length < 5 && !parseInt(info.FullName)) {
					swal({
						title: "Error!",
						text: "Sorry you have to fill the Full Name field with at least 5 characters!", icon: "warning", dangerMode: !0 
					});
				} else {
					$.ajax({
						type: "POST",
						url: "../Security/forgot_password.aspx/ChangeInfo",
						data: JSON.stringify({ info: info }),
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						beforSend: function () {
							swal("Please Wait!");
						},
						success: function () {
							swal("You have successfully updated your information!");
						},
						error: function () {
							swal({
								title: "Error!",
								text: "Something went wrong please try again later!", icon: "warning", dangerMode: !0 
							});
						}
					});
				}
			},
			changePass: function () {
				let a = this;
				a.newPass == a.confirm
					? a.newPass.length >= 6
					? $.ajax({
					type: "POST",
					url: "../Security/forgot_password.aspx/ChangePass",
					data: JSON.stringify({ pass: { pass_word: a.newPass, oldPass: a.oldPass } }),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (a) {
						"error" != a.d ? swal("Your password has been changed!") : swal({ title: "Error!", text: "Sorry the current password is incorrect!", icon: "warning", dangerMode: !0 });
					},
				})
				: swal({ title: "Error!", text: "Sorry the password have to contain at least 6 digits or characters!", icon: "warning", dangerMode: !0 })
				: swal({ title: "Error!", text: "Sorry the password doesn't match!", icon: "warning", dangerMode: !0 });
			},
		},
		created: function () {
			// pre loader
			var loader = document.querySelector(".status-loader");
			loader.classList.add("disappear-loader");
		},
	});
}