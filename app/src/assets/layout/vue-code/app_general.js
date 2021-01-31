let app_general = new Vue({
	el: '#app_general',
	data:{
		accessedPages: [],
		categories: [],
		pagesArr: []
	},
	methods: {
	},
	created: function () {
		let that = this;
		//get pages
		$.ajax({
			type: "POST",
			url: window.location + '/getPages',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				that.accessedPages = JSON.parse(data.d);
				
				// check if the user has access before proceeding
				let currentPage = window.location.href.split('/').pop();
				if ( currentPage != 'default.aspx' &&  window.location.href.indexOf('Courses') > -1 ) {
					for (let i = 0; i < that.accessedPages.length; i++) {
						if (i == that.accessedPages.length) {
							if (Object.values(that.accessedPages[i]).indexOf(currentPage) == -1) {
								window.location = 'default.aspx';
							}
						}
					}
				}
				
				let arr = that.accessedPages.map(x => x.CategoryId);
				arr = Array.from(new Set(that.accessedPages.map(x => x.CategoryId)));
	            that.pagesArr = arr.map(x => that.accessedPages.filter(z => z.CategoryId == x));
			}
		});
		
		//get categories
		$.ajax({
			type: "POST",
			url: window.location + '/getcatsData',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				that.categories = JSON.parse(data.d);
			}
		});
	}
});