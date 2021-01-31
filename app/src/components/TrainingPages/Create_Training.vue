<template>
<div class='Courses internal-page Create_Training' id='Create_Training'>

		<div class="custom-form create-course">
			<div class="cu-container" style="min-height: 100vh">
				
				<!-------------------------- start select form page --------------------->

				<div class="cu-form-group special shadow mt-5" id="select-form">
					<div class="title">
						<span class="bg-secondary">select form</span>
					</div>

					<!-- select group -->
					<div class="grouped shadow-sm rounded Courses mt-3">
						<label class="cu-label">
							<span>Select Group :</span>
						</label>
						<ul class="list-unstyled checkbox-group row">
							<li class="col-md-12">
								<input id="1" type="checkbox" name="role" value="1" v-model="group"> 
								<label for="1">
									<div class="cu-input cu-checkbox normal">
										<div class="contain">
											<span class="fa fa-check"></span> 
											<div>Dar Al Fouad  Group</div>
										</div>
									</div>
								</label>
							</li>
						</ul>
					</div>

					<!-- select branch -->
					<div class="grouped shadow-sm rounded Courses mt-1" v-if="group.length == 0">
						<label class="cu-label">
							<span>Select Branch :</span>
						</label>
						<ul class="list-unstyled checkbox-group row">
							<li class="col-md-6" v-for='branch in BranchData' v-on:click.prevent="checkGroub()" :key='branch.Branch_EName'>
								<input :id="branch.Branch_EName" type="checkbox" name="role" :value="branch.id" v-model="branches"> 
								<label :for="branch.Branch_EName">
									<div class="cu-input cu-checkbox normal">
										<div class="contain">
											<span class="fa fa-check"></span> 
											<div>{{branch.Branch_EName}}</div>
										</div>
									</div>
								</label>
							</li>
						</ul>
					</div>

					<div class="grouped shadow-sm rounded Courses mt-1" v-else>
						<label class="cu-label">
							<span>Select Branch :</span>
						</label>
						<ul class="list-unstyled checkbox-group row">
							<li class="col-md-6" v-for='branch in BranchData' :key='branch.id'>
								<input :id="branch.Branch_EName" type="checkbox" name="role" :value="branch.id" v-model="branches"> 
								<label :for="branch.Branch_EName">
									<div class="cu-input cu-checkbox normal">
										<div class="contain">
											<span class="fa fa-check"></span> 
											<div>{{branch.Branch_EName}}</div>
										</div>
									</div>
								</label>
							</li>
						</ul>
					</div>

					<div class="container">
						<div class="row" id="accordion">
							<div class="grouped shadow-sm rounded Courses mt-1 col-md-6 text-center btn select-hover">
								<div class="card-header mb-0 cu-label open-pop" data-pop-name="names-popup">
									<div class="pt-2 pb-2" style="font-size: 18px">Select By Names</div>
								</div>
							</div>

							<div class="grouped shadow-sm rounded Courses mt-1 col-md-6 text-center btn select-hover">
								<div class="card-header mb-0 cu-label open-pop" data-pop-name="emails-popup">
									<div class="pt-2 pb-2" style="font-size: 18px">Select By Emails</div>
								</div>
							</div>

							<div class="grouped shadow-sm rounded Courses mt-1 col-md-6 text-center btn select-hover">
								<div class="card-header mb-0 cu-label open-pop" data-pop-name="id-popup">
									<div class="pt-2 pb-2" style="font-size: 18px">Select By ID</div>
								</div>
							</div>

							<div class="grouped shadow-sm rounded Courses mt-1 col-md-6 text-center btn select-hover">
								<div class="card-header mb-0 cu-label open-pop" data-pop-name="mobile-popup">
									<div class="pt-2 pb-2" style="font-size: 18px">Select By Mobile</div>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="grouped shadow-sm rounded Courses mt-1 col-md-12 text-center">
								<div class="card-header" id="headingFive">
									<h5 class="mb-0 cu-label">
										<span class="btn btn-link cu-label" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="headingFive" v-on:keydown.enter.prevent>
											Select By Role
										</span>
									</h5>
								</div>
								<div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
									<div class="card-body">
										<ul class="list-unstyled checkbox-group row">
											<li class="col-md-6" value="1" 
                                            v-for="role in RolesData.filter(x => x.id != 7 && x.id!=8 && x.id!=9)"
                                            :key='role.Name'>
												<input :id="role.Name" type="checkbox" name="role" :value="role.id" v-model="roles"> 
												<label :for="role.Name">
													<div class="cu-input cu-checkbox normal">
														<div class="contain">
															<span class="fa fa-check"></span> 
															<div data-pop-name="roles-popup" v-on:click="rolePopup(role.id)" class="open-pop">{{role.Name}}</div>
														</div>
													</div>
												</label>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="grouped shadow-sm rounded Courses mt-1 col-md-12 text-center">
								<div class="card-header" id="headingSix">
									<h5 class="mb-0 cu-label">
										<span class="btn btn-link cu-label" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="headingSix" v-on:keydown.enter.prevent>
											Select By Department
										</span>
									</h5>
								</div>
								<div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
									<div class="card-body">
										<ul class="list-unstyled checkbox-group row">
											<li class="col-md-6" v-for='depart in DeptsData' :key='depart.Department_Ename'>
												<input :id="depart.Department_Ename" type="checkbox" name="role" :value="depart.dept_id" v-model="departmens"> 
												<label :for="depart.Department_Ename">
													<div class="cu-input cu-checkbox normal">
														<div class="contain">
															<span class="fa fa-check"></span> 
															<div data-pop-name="depart-popup" v-on:click="departmentPopup(depart.dept_id)" class="open-pop">{{depart.Department_Ename}}</div>
														</div>
													</div>
												</label>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- submit-->
					<div class='text-center pt-3 pb-3'>
						<button class="btn btn-secondary" type="button" v-on:click="filterData()">select</button>
					</div>

				</div>

				<!-------------------------- end select form page --------------------->

				<!-------------------------- start creat lecture page --------------------->

				<div class="cu-form-group special shadow d-none" id="submit-lecture" style="margin: 15px auto;">

					<div class="title">
						<span class="bg-secondary">Zoom Training</span>
					</div>

					<div class='cu-field'>
						<div class='row'>
							<div class='cu-input cu-checkbox col-md-2 col-xs-6 mt-3'>
								<div class='contain'>  
									<input id='active'
										   type="checkbox"
										   name='active'
										   value='true'
										   v-model='New_Lecture.Active'>
									<label for="active">
										<span class="fa fa-check"></span>
										<div>Active</div>
									</label>
								</div>
							</div>
							<div class='cu-input cu-checkbox col-md-8 col-xs-6 mt-3'>	
							</div>
							<div class='cu-input cu-checkbox col-md-2 col-xs-6 mt-3'>
								<button class="btn btn-secondary btn-sm" v-on:click.prevent="goBack"><i class="fa fa-arrow-left mr-2" aria-hidden="true"></i>Back</button>
							</div>
						</div>
					</div>


					<div class='grouped shadow-sm rounded mt-2'>
						<div class='row'>

							<!-- Instuctor Name -->
							<div class="cu-field col-md-6">
								<h3 class="cu-label">
									<label>Instuctor Name:</label>
								</h3>
								<div class="cu-input text-box">
									<span class="fa fa-edit"></span>
									<input type="text" v-model="New_Lecture.Instructor">
								</div>
							</div>

							<!-- Lecture Title -->
							<div class="cu-field col-md-6">
								<h3 class="cu-label">
									<label>Lecture Title:</label>
								</h3>
								<div class="cu-input text-box">
									<span class="fa fa-edit"></span>
									<input type="text" v-model="New_Lecture.Lecture_Title">
								</div>
							</div>

							<!-- Lecture Discription -->
							<div class="cu-field col-md-12">
								<h3 class="cu-label">
									<label>Lecture Discription:</label>
								</h3>
								<div class="cu-input text-box" style="max-width: 100%;">
									<span class="fa fa-edit"></span>
									<textarea v-model="New_Lecture.Description"></textarea>
								</div>
							</div>
			
						</div>
					</div>

					<!-- lecture time -->
					<div class='grouped shadow-sm rounded'>
						<div class='row'>
							<!-- lecture date -->
							<div class='col-md-6'>
								<div class="cu-field">
									<label class="cu-label">
										<span>Lecture Date :</span>
									</label>
									<div class="cu-input text-box">
										<span class="fa fa-calendar"></span>
										<input type='date' :min="new Date().toISOString().substring(0,10)" v-model="New_Lecture.Date">
									</div>
								</div>
							</div>

							<!--total time -->
							<div class='col-md-6'>
								<div class="cu-field">
									<label class="cu-label">
										<span>Total Time :</span>
									</label>
									<div class="cu-input text-box">
										<span class="fa fa-clock-o p-2" style="line-height: 16px"></span>
										<input type="number" v-model="New_Lecture.Total_Hours">
									</div>
								</div>
							</div>

							<!-- start time -->
							<div class='col-md-6'>
								<div class="cu-field">
									<label class="cu-label">
										<span>Start On :</span>
									</label>
									<div class="cu-input text-box">
										<span class="fa fa-clock-o"></span>
										<input type='time' v-model="New_Lecture.Time_From">
									</div>
								</div>
							</div>

							<!-- End time -->
							<div class='col-md-6'>
								<div class="cu-field">
									<label class="cu-label">
										<span>End On :</span>
									</label>
									<div class="cu-input text-box">
										<span class="fa fa-clock-o"></span>
										<input type='time' v-model="New_Lecture.Time_to">
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Lecture For -->	
					<div class="grouped shadow-sm rounded Courses bg-light">
						<label class="cu-label">
							<span>Lecture For :</span>
						</label>
						<ul class="list-unstyled checkbox-group row">
							<li class="col-md-12 mt-2"> 
								<span class="text-dark">Group : </span><span class="text-secondary">Dar Elfouad Group</span>
							</li>
							
							<li class="col-md-12 mt-2"> 
								<span class="text-dark">Branch : </span>
								<span class="text-secondary" v-for="branch in branches" :key='branch.id'>{{BranchData.filter(x => x.id == branch)[0].Branch_EName}} ... </span>
							</li>
							
							<li class="col-md-12 mt-2" v-if="departmens.length == 0"> 
								<span class="text-dark">Departments : </span>
								<span class="text-secondary">No Departments Have Been Selected</span>
							</li>
							<li class="col-md-12 mt-2" v-else> 
								<span class="text-dark">Departments : </span>
								<span class="text-secondary" v-for="depart in departmens" :key='depart.id'>{{DeptsData.filter(x => x.dept_id == depart)[0].Department_Ename}} ... </span>
							</li>
							
							<li class="col-md-12 mt-2" v-if="roles.length == 0"> 
								<span class="text-dark">Roles : </span>
								<span class="text-secondary">No Roles Have Been Selected</span>
							</li>
							<li class="col-md-12 mt-2" v-else> 
								<span class="text-dark">Roles : </span>
								<span class="text-secondary" v-for="role in roles" :key='role.id'>{{RolesData.filter(x => x.id == role)[0].Name}} ... </span>
							</li>
							
							<li class="col-md-12 mt-2" v-if="employees.length == 0"> 
								<span class="text-dark">Specific Names : </span>
								<span class="text-secondary">No Specific Names Have Been Selected</span>
							</li>
							<li class="col-md-12 mt-2" v-else> 
								<span class="text-dark">Specific Names : </span>
								<span class="text-secondary" v-for="emp in employees" :key='emp.Emp_id'>{{branchEmps.filter(x => x.Emp_id == emp)[0].FullName}} ... </span>
							</li>
							
						</ul>
					</div>

					<!-- submit-->
					<div class='text-center pt-3 pb-3'>
						<button class="btn btn-secondary" type="button" v-on:click="SubmitLacture">Submit</button>
					</div>
				</div>

				<!-------------------------- end creat lecture page --------------------->
			</div>
		</div>


		<!-- start roles popup-->
		<div class='roles-popup popup'>
			<div class='popup-body' style="max-width: 1000px;top: 50%; transform: translateY(-50%);">
				<div class='container-fluid custom-form m-auto pb-4' style="max-width: 800px">
					<div class="cu-container">
						<span class='close-pop'>Close</span>
						<div class="social-timeline-card shadow">
							<div class="card-body" >
								<div class="general info tabcontent active overflow-auto" style="max-height:450px">
									<div class="grouped shadow-sm rounded Courses bg-light">
										<ul class="list-unstyled checkbox-group row" v-if="employeeRole.length > 0">
											<li class="col-md-6" v-for="employee in employeeRole" :key='employee.Emp_id'>
												<input :id="employee.Emp_id" type="checkbox" name="role" :value="employee.Emp_id" v-model="employees"> 
												<label :for="employee.Emp_id">
													<div class="cu-input cu-checkbox normal">
														<div class="contain">
															<span class="fa fa-check"></span> 
															<div>{{employee.FullName}}</div>
														</div>
													</div>
												</label>
											</li>
										</ul>
										<div class="text-center pt-3 pb-3 bg-light" v-else>No Avaliable Data</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>   
			</div>
		</div>

		<!-- end roles popup -->


		<!-- start depart popup-->
		<div class='depart-popup popup'>
			<div class='popup-body' style="max-width: 1000px;top: 50%; transform: translateY(-50%);">
				<div class='container-fluid custom-form m-auto pb-4' style="max-width: 800px">
					<div class="cu-container">
						<span class='close-pop'>Close</span>
						<div class="social-timeline-card shadow">
							<div class="card-body" >
								<div class="general info tabcontent active overflow-auto" style="max-height:450px">
									<div class="grouped shadow-sm rounded Courses bg-light">
										<ul class="list-unstyled checkbox-group row" v-if="employeeDepart.length > 0">
											<li class="col-md-6" v-for="employee in employeeDepart" :key='employee.FullName'>
												<input :id="employee.Emp_id" type="checkbox" name="role" :value="employee.Emp_id" v-model="employees"> 
												<label :for="employee.Emp_id">
													<div class="cu-input cu-checkbox normal">
														<div class="contain">
															<span class="fa fa-check"></span> 
															<div>{{employee.FullName}}</div>
														</div>
													</div>
												</label>
											</li>
										</ul>
										<div class="text-center pt-3 pb-3 bg-light" v-else>No Avaliable Data</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>   
			</div>
		</div>

		<!-- end depart popup -->

		<!-- start names search popup-->
		<div class='names-popup popup'>
			<div class='popup-body' style="max-width: 1000px;top: 50%; transform: translateY(-50%);">
				<div class='container-fluid custom-form m-auto pb-4' style="max-width: 800px">
					<div class="cu-container">
						<span class='close-pop' >Close</span>
						<div class="social-timeline-card shadow">
							<div class="card-body" >
								<div class="general info tabcontent active overflow-auto" style="max-height:550px">

									<div class='grouped' v-if="branchEmps.length > 0">
										<div class='row bg-light p-2 shadow-sm'>
											<div class="cu-field col-md-12">
												<h3 class="cu-label">
													<label>Write Name :</label>
												</h3>
												<div class="cu-input text-box" style="max-width: 100%">
													<span class="fa fa-edit"></span>
													<input type="text" v-model="selectedName" v-on:keyup="namesList" v-on:keydown.enter.prevent>
												</div>
											</div>
										</div>

										<div class='row bg-light overflow-auto mt-3 p-2 shadow-sm' style="max-height:200px">
											<table class="table table-striped text-secondary table-sm table-bordered">
												<thead>
													<tr>
														<th scope="col">#</th>
														<th scope="col">Full Name</th>
														<th scope="col">Department</th>
													</tr>
												</thead>
												<tbody>
													<tr class="list-unstyled checkbox-group" 
														v-for="(name, i) in filterNames(branchEmps, selectedName.toLowerCase())" :value="name.Emp_id" :key='name.Emp_id'>
														<td>{{i + 1}}</td>
														<td>
															<input :id="name.Emp_id" type="checkbox" name="role" :value="name.Emp_id" v-model="employees"> 
															<label :for="name.Emp_id">
																<div class="cu-input cu-checkbox normal">
																	<div class="contain">
																		<span class="fa fa-check"></span> 
																		<div>{{name.FullName}}</div>
																	</div>
																</div>
															</label>
														</td>
														<td>{{name.Dept_name}}</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div class='row bg-light mt-3 p-2 shadow-sm'>
											<div class="cu-field col-md-12">
												<h3 class="cu-label">
													<label>Selected Names :</label>
												</h3>
												<div class="cu-input text-box mb-1" 
                                                v-for="name in employees" :key='name' style="max-width: 100%">
													<span class="fa fa-edit"></span>
													<div>{{branchEmps.filter(x => x.Emp_id == name)[0].FullName}}</div>
												</div>
											</div>
										</div>
									</div>

									<div class="text-center pt-3 pb-3 bg-light" v-else>No Avaliable Data</div>

								</div>
							</div>
						</div>
					</div>
				</div>   
			</div>
		</div>

		<!-- end names search popup -->

		<!-- start emails search popup-->
		<div class='emails-popup popup'>
			<div class='popup-body' style="max-width: 1000px;top: 50%; transform: translateY(-50%);">
				<div class='container-fluid custom-form m-auto pb-4' style="max-width: 800px">
					<div class="cu-container">
						<span class='close-pop' >Close</span>
						<div class="social-timeline-card shadow">
							<div class="card-body" >
								<div class="general info tabcontent active overflow-auto" style="max-height:550px">

									<div class='grouped' v-if="branchEmps.length > 0">
										<div class='row bg-light p-2 shadow-sm'>
											<div class="cu-field col-md-12">
												<h3 class="cu-label">
													<label>Write Email :</label>
												</h3>
												<div class="cu-input text-box" style="max-width: 100%">
													<span class="fa fa-edit"></span>
													<input type="text" v-model="selectedEmail" v-on:keyup="emailsList" v-on:keydown.enter.prevent>
												</div>
											</div>
										</div>

										<div class='row bg-light overflow-auto mt-3 p-3 shadow-sm' style="max-height:200px">
											<table class="table table-striped text-secondary table-sm table-bordered">
												<thead>
													<tr>
														<th scope="col">#</th>
														<th scope="col">Emails</th>
														<th scope="col">Name</th>
														<th scope="col">Department</th>
													</tr>
												</thead>
												<tbody>
													<tr class="list-unstyled checkbox-group" 
														v-for="(name, i) in filterEmails(branchEmps, selectedEmail.toLowerCase())" :key='name.Emp_id' :value="name.Emp_id">
														<td>{{i + 1}}</td>
														<td>
															<input :id="name.Emp_id" type="checkbox" name="role" :value="name.Emp_id" v-model="employees"> 
															<label :for="name.Emp_id">
																<div class="cu-input cu-checkbox normal">
																	<div class="contain">
																		<span class="fa fa-check"></span> 
																		<div>{{name.Email}}</div>
																	</div>
																</div>
															</label>
														</td>
														<td>{{name.FullName}}</td>
														<td>{{name.Dept_name}}</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div class='row bg-light mt-3 p-2 shadow-sm'>
											<div class="cu-field col-md-12">
												<h3 class="cu-label">
													<label>Selected Names :</label>
												</h3>
												<div class="cu-input text-box mb-1" 
                                                v-for="email in employees" :key='email' style="max-width: 100%">
													<span class="fa fa-edit"></span>
													<div>{{branchEmps.filter(x => x.Emp_id == email)[0].FullName}}</div>
												</div>
											</div>
										</div>
									</div>

									<div class="text-center pt-3 pb-3 bg-light" v-else>No Avaliable Data</div>

								</div>
							</div>
						</div>
					</div>
				</div>   
			</div>
		</div>

		<!-- end emails search popup -->

		<!-- start id search popup-->
		<div class='id-popup popup'>
			<div class='popup-body' style="max-width: 1000px;top: 50%; transform: translateY(-50%);">
				<div class='container-fluid custom-form m-auto pb-4' style="max-width: 800px">
					<div class="cu-container">
						<span class='close-pop' >Close</span>
						<div class="social-timeline-card shadow">
							<div class="card-body" >
								<div class="general info tabcontent active overflow-auto" style="max-height:550px">

									<div class='grouped' v-if="branchEmps.length > 0">
										<div class='row bg-light p-2 shadow-sm'>
											<div class="cu-field col-md-12">
												<h3 class="cu-label">
													<label>Write ID :</label>
												</h3>
												<div class="cu-input text-box" style="max-width: 100%">
													<span class="fa fa-edit"></span>
													<input type="number" v-model="selectedId" v-on:keyup="idList" v-on:keydown.enter.prevent>
												</div>
											</div>
										</div>

										<div class='row bg-light overflow-auto mt-3 p-2 shadow-sm' style="max-height:200px">
											<table class="table table-striped text-secondary table-sm table-bordered">
												<thead>
													<tr>
														<th scope="col">#</th>
														<th scope="col">Full Name</th>
														<th scope="col">ID</th>
														<th scope="col">Department</th>
													</tr>
												</thead>
												<tbody>
													<tr class="list-unstyled checkbox-group" 
														v-for="(name, i) in filterId(branchEmps, selectedId)" :value="name.Emp_id" :key='name'>
														<td>{{i + 1}}</td>
														<td>
															<input :id="name.Emp_id" type="checkbox" name="role" :value="name.Emp_id" v-model="employees"> 
															<label :for="name.Emp_id">
																<div class="cu-input cu-checkbox normal">
																	<div class="contain">
																		<span class="fa fa-check"></span> 
																		<div>{{name.FullName}}</div>
																	</div>
																</div>
															</label>
														</td>
														<td>{{name.Emp_id}}</td>
														<td>{{name.Dept_name}}</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div class='row bg-light mt-3 p-2 shadow-sm'>
											<div class="cu-field col-md-12">
												<h3 class="cu-label">
													<label>Selected Names :</label>
												</h3>
												<div class="cu-input text-box mb-1" 
                                                v-for="id in employees" :key='id' style="max-width: 100%">
													<span class="fa fa-edit"></span>
													<div>{{branchEmps.filter(x => x.Emp_id == id)[0].FullName}}</div>
												</div>
											</div>
										</div>
									</div>

									<div class="text-center pt-3 pb-3" v-else>No Avaliable Data</div>

								</div>
							</div>
						</div>
					</div>
				</div>   
			</div>
		</div>

		<!-- end id search popup -->
		
		<!-- start mobile search popup-->
		<div class='mobile-popup popup'>
			<div class='popup-body' style="max-width: 1000px;top: 50%; transform: translateY(-50%);">
				<div class='container-fluid custom-form m-auto pb-4' style="max-width: 800px">
					<div class="cu-container">
						<span class='close-pop' >Close</span>
						<div class="social-timeline-card shadow">
							<div class="card-body" >
								<div class="general info tabcontent active overflow-auto" style="max-height:550px">

									<div class='grouped' v-if="branchEmps.length > 0">
										<div class='row bg-light p-2 shadow-sm'>
											<div class="cu-field col-md-12">
												<h3 class="cu-label">
													<label>Write Mobile :</label>
												</h3>
												<div class="cu-input text-box" style="max-width: 100%">
													<span class="fa fa-edit"></span>
													<input type="number" v-model="selectedMobile" v-on:keyup="mobileList" v-on:keydown.enter.prevent>
												</div>
											</div>
										</div>

										<div class='row bg-light overflow-auto mt-3 p-2 shadow-sm' style="max-height:200px">
											<table class="table table-striped text-secondary table-sm table-bordered">
												<thead>
													<tr>
														<th scope="col">#</th>
														<th scope="col">Mobile Number</th>
														<th scope="col">Name</th>
														<th scope="col">Department</th>
														
													</tr>
												</thead>
												<tbody>
													<tr class="list-unstyled checkbox-group" 
														v-for="(name, i) in filterMobile(branchEmps, selectedMobile)" :key='name' :value="name.Emp_id">
														<td>{{i + 1}}</td>
														<td>
															<input :id="name.Emp_id" type="checkbox" name="role" :value="name.Emp_id" v-model="employees"> 
															<label :for="name.Emp_id">
																<div class="cu-input cu-checkbox normal">
																	<div class="contain">
																		<span class="fa fa-check"></span> 
																		<div>{{name.Mobile_1}}</div>
																	</div>
																</div>
															</label>
														</td>
														<td>{{name.FullName}}</td>
														<td>{{name.Dept_name}}</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div class='row bg-light mt-3 p-2 shadow-sm'>
											<div class="cu-field col-md-12">
												<h3 class="cu-label">
													<label>Selected Names :</label>
												</h3>
												<div class="cu-input text-box mb-1" 
                                                v-for="mobile in employees" :key='mobile' style="max-width: 100%">
													<span class="fa fa-edit"></span>
													<div>{{branchEmps.filter(x => x.Emp_id == mobile)[0].FullName}}</div>
												</div>
											</div>
										</div>
									</div>

									<div class="text-center pt-3 pb-3" v-else>No Avaliable Data</div>

								</div>
							</div>
						</div>
					</div>
				</div>   
			</div>
		</div>

		<!-- end mobil search popup -->


	</div>
</template>

<script>
export default {
    name:'Create_Training',
    data() {
        return {
			adminusersData: [],
			DeptsData: [],
			BranchData: [],
			RolesData: [],

			group: [],
			branches: [],
			departmens: [],
			roles: [],
			employees: [],

			New_Lecture: {
				Lecture_Title: "",
				Description: "",
				Zoom_Link: "",
				Instructor: "",

				Date: "",
				Time_From: "",
				Time_to: "",
				Total_Hours: 0,

				LectureFor_Group: "",
				LectureFor_Branch: "",
				LectureFor_Department: "",
				LectureFor_Role: "",
				LectureFor_Emp: "",

				Status_name: "pendding",
				Active: false,
			},

			selectedName: "",
			Names: [],
			selectedEmail: "",
			Emails: [],
			selectedId: "",
			ids: [],
			selectedMobile: "",
			mobiles: [],

			branchEmps: [],

			employeeRole: [],
			employeeDepart: [],
        }
    },
    watch: {
        branches: function () {
            this.branchEmps = this.adminusersData.filter(x => this.branches.includes(x.Branch_ID));
        },
    },


    methods: {
        goBack () {
            let selectForm    = document.getElementById("select-form"),
                submitLecture = document.getElementById("submit-lecture");
            
            submitLecture.classList.add("d-none");
            selectForm.classList.remove("d-none");
            
        },
        checkGroub (){
            if(this.group == ""){
                swal({
                    title: "Error!",
                    text: "Sorry, you should select group first ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            }
        },
        filterNames(list, value){
            return list.filter(x => x.FullName.toLowerCase().indexOf(value) > -1)
        },
        namesList(event){
            if(event.key == "Enter"){this.Names.push(this.selectedName)}
        },
        filterEmails(list, value){
            return list.filter(x => x.Email.toLowerCase().indexOf(value) > -1)
        },
        emailsList(event){
            if(event.key == "Enter"){this.Emails.push(this.selectedEmail)}
        },
        filterId(list, value){
            return list.filter(x => x.Emp_id.toString().indexOf(value) > -1)
        },
        idList(event){
            if(event.key == "Enter"){this.ids.push(this.selectedId)}
        },
        filterMobile(list, value){
            return list.filter(x => x.Mobile_1.toString().indexOf(value) > -1)
        },
        mobileList(event){
            if(event.key == "Enter"){this.mobiles.push(this.selectedMobile)}
        },

        rolePopup: function (role) {
            this.employeeRole = this.branchEmps.filter(x => x.Role_id == role)
        },
        departmentPopup: function (dept) {
            this.employeeDepart = this.branchEmps.filter(x => x.Dept_id == dept)
        },

        SubmitLacture: function () {
            let ObjectD = Object.assign({}, this.New_Lecture),
                that = this;
            if(ObjectD.Instructor === "") {
                swal({
                    title: "Error!",
                    text: "Sorry, you should type the instructor name ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            } else if (ObjectD.Lecture_Title == ""){
                swal({
                    title: "Error!",
                    text: "Sorry, you should type the lecture title ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            } else if (ObjectD.Description == ""){
                swal({
                    title: "Error!",
                    text: "Sorry, you should type the lecture description ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            } else if (ObjectD.Date == ""){
                swal({
                    title: "Error!",
                    text: "Sorry, you should choose the lecture date ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            } else if (ObjectD.Time_From == ""){
                swal({
                    title: "Error!",
                    text: "Sorry, you should choose the lecture start time ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            } else if (ObjectD.Time_to == ""){
                swal({
                    title: "Error!",
                    text: "Sorry, you should choose the lecture end time ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            } else if (ObjectD.Total_Hours == ""){
                swal({
                    title: "Error!",
                    text: "Sorry, you should choose the lecture total hours ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            } else {	
                ObjectD.LectureFor_Group = that.group.map(x => x = "#" + x + "#").join("");
                ObjectD.LectureFor_Branch = that.branches.map(x => x = "#" + x + "#").join("");
                ObjectD.LectureFor_Department = that.departmens.map(x => x = "#" + x + "#").join("");
                ObjectD.LectureFor_Role = that.roles.map(x => x = "#" + x + "#").join("");
                ObjectD.LectureFor_Emp = that.employees.map(x => x = "#" + x + "#").join("");

                swal({
                    title: "Are you sure you entered all data required for creating this lecture?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((result) => {
                    if (!result) {
                        swal({
                            title: 'Canceled',
                            text : 'Sorry, the creation of this lecture has been cancelled!'
                        })
                    } else {
                        $.ajax({  
                            type: "POST",
                            url: "../Zoom_Training/Create_Training.aspx/NewLecture",
                            data: JSON.stringify({ "lecture": ObjectD }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function () {
                                swal({
                                    title: 'Sweet!',
                                    text: "You successfully added anew lecture ...",
                                    icon: 'success',	
                                    dangerMode: true,
                                });
                                window.location = "Admin_Training.aspx";	  
                            }
                        })
                    }
                })
            };
        },

        filterData: function () {
            let that          = this,
                selectForm    = document.getElementById("select-form"),
                submitLecture = document.getElementById("submit-lecture");
            if(that.group == false) {
                swal({
                    title: "Error!",
                    text: "Sorry, you should select group ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            }else if (that.branches.length == 0){
                swal({
                    title: "Error!",
                    text: "Sorry, you should choose at least one branch ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            } else {
                swal({
                    title: "Are you sure from your selection?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((result) => {
                    if (!result) {
                        swal({
                            title: 'Canceled',
                            text : 'Sorry, review your selection again!'
                        })
                    } else {
                        submitLecture.classList.remove("d-none");
                        selectForm.classList.add("d-none");
                    }
                })
            }
        },

        /**	filterData: function () {
            let that     = this,
                branches = this.branches.join(""),
                departmens = this.departmens.join(""),
                roles = this.roles.join("");

            if(that.group == "") {
                swal({
                    title: "Error!",
                    text: "Sorry, you should select group ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            }else if (that.branches.length == 0){
                swal({
                    title: "Error!",
                    text: "Sorry, you should choose at least one branch ! ",
                    icon: "warning",
                    dangerMode: true,
                });  
            } else {
                let condition = [];

                if(this.branches.length > 0)
                {
                    branches = this.branches.map(x => x = "#" + x + "#").join("");
                    condition.push("@Branch_ID LIKE '%' + CONVERT(varchar, Branch_ID) + '%'")
                }

                if(this.departmens.length > 0)
                {
                    departmens = this.departmens.map(x => x = "#" + x + "#").join("");
                    condition.push("@Dept_id LIKE '%' + CONVERT(varchar, Dept_id) + '%'")
                }

                if(this.roles.length > 0)
                {
                    roles = this.roles.map(x => x = "#" + x + "#").join("");
                    condition.push("@Role_id LIKE '%' + CONVERT(varchar, Role_id) + '%'")
                }

                condition = condition.length > 0 ? 'where ' + condition.map((x,i) => i != 0 ? ' and ' + x : x).join("") : "";


                //get getadminusersData
                $.ajax({
                    type: "POST", 
                    url: "../Zoom_Training/Create_Training.aspx/getadminusersData",
                    data: JSON.stringify({"detail": {"Branch_ID" : branches, "Dept_id" : departmens, "Role_id": roles, "condition": condition}}),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        that.data_filter = JSON.parse(data.d);
                        if(that.data_filter.length == 0){
                            swal({
                                title: 'Oops...!',
                                text: "There is no available data ...",
                                icon: 'warning',	
                                dangerMode: true,
                            });
                        } else {
                            swal({
                                title: 'Sweet!',
                                text: "Now you can create a new lecture ...",
                                icon: 'success',	
                                dangerMode: true,
                            });
                        }
                    }
                });
            }
        }**/
    },

    created: function () {
        let cobject = this;

        //get getDeptsData
        $.ajax({
            type: "POST", 
            url: "../Zoom_Training/Create_Training.aspx/getDeptsData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                cobject.DeptsData = JSON.parse(data.d);
            }
        });


        //get getBranchData
        $.ajax({
            type: "POST", 
            url: "../Zoom_Training/Create_Training.aspx/getBranchData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                cobject.BranchData = JSON.parse(data.d);
            }
        });


        //get getRolesData
        $.ajax({
            type: "POST", 
            url: "../Zoom_Training/Create_Training.aspx/getRolesData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                cobject.RolesData = JSON.parse(data.d);
            }
        });

        //get getadminusersData
        $.ajax({
            type: "POST", 
            url: "../Zoom_Training/Create_Training.aspx/getadminusersData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                cobject.adminusersData = JSON.parse(data.d);
            }
        });


    }
}
</script>

<style scoped>

</style>