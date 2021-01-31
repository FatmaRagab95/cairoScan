<template>
    <div>
        <!-- =========================== HEADER ==========================-->
        <div class="first-naav">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                    <div class="working-bars">
                        <ul class="main-links">
                            <li><a href="#"><span><i class="fa fa-home ico"></i></span>Home</a></li>
                            <li><a href="#"><span><i class="fa fa-envelope-open" aria-hidden="true"></i></span>Email</a></li>
                            <li><a href="#"><span><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>Registration</a></li>
                            <li><a href="#"><span><i class="fa fa-lock" aria-hidden="true"></i></span>Login</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header">
            <div class="mainbar gradient diagonal">
                <div class="container">
                    <div class="logo"><a href="https://www.cairoscan.com.eg/" class="brand"><img src="https://www.cairoscan.com.eg/assets/images/logo.png" alt="logo"></a></div>
                    <div class="menu_container">
                    <!-- ========================= NAVIGATION MENU ========================-->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="profile">
                                <div class="img-con">
                                <img src="../../assets/layout/img/user.jpg">
                                </div>
                                <div class="info">
                                <h3>Welcome</h3>
                                <h2>Ahmed Ali</h2>
                                <h3>Front End</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <nav>
                                <!--start new dropdown-->
                                <div class="dropdown g-menu">
                                <a class="dash dropdown-toggle" href="#" role="button" id="dropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-bars"></i>
                                </a>
                                <ul class="dropdown-menu submenu" aria-labelledby="dropdownMenuLink1">
                                    <li class="dropdown-item"><a href="..\external_pages\index.html" class="link">
                                        <span class="icon"><i class="fa fa-home con"></i></span>
                                        <span class="link-text">Dashboard</span></a>
                                    </li>
                                    <li class="dropdown-item">
                                        <a href="javascript:void();" class=" dropdown-toggle" data-toggle="dropdown" id="f1">
                                        <span class="icon"><i class="fa fa-check-square-o con"></i></span>
                                        <span class="link-text">Daily Tasks</span>                                   
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop" aria-labelledby="f1">
                                            <li class="dropdown-item"><a class="item" href="../DailyTasks/todo.html">To Do List</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item">
                                        <a href="javascript:void();" class="dropdown-toggle" data-toggle="dropdown" id="f1" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon"><i class="fa fa-hospital-o con"></i></span>
                                        <span class="link-text">Drugs</span>
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop" aria-labelledby="f2">
                                            <li class="dropdown-item "><a class="item" href="../Drugs/Search.aspx">Search</a></li>
                                        </ul>
                                    </li>
                                    <li class=" dropdown-item">
                                        <a href="javascript:void();" class="dropdown-toggle" id="f2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon"><i class="fa fa-sign-out con"></i></span>
                                        <span class="link-text">Discharge</span>                                
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop" aria-labelledby="f1">
                                            <li class="dropdown-item"><a class="item" href="../Discharge/discharge.html">Lorem</a></li>
                                        </ul>
                                    </li>
                                    <li class=" dropdown-item">
                                        <a href="javascript:void();" class="dropdown-toggle" id="f3" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon"><i class="fa fa-copy con"></i></span>
                                        <span class="link-text">General Forms</span>                                    
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop" aria-labelledby="f3">
                                            <li class="dropdown-item"><a class="item" href="../General_Forms/Departments_Cats.aspx">Departments</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item">
                                        <a href="javascript:void();" class="dropdown-toggle" id="f4" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon"><i class="fa fa-shield con"></i></span>
                                        <span class="link-text">OPD</span>                                   
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop" aria-labelledby="f4">
                                            <li class="dropdown-item"><a class="item" href="../OPD/custom.html">Lorem</a></li>
                                        </ul>
                                    </li>
                                    <li class=" dropdown-item">
                                        <a href="javascript:void();" class="dropdown-toggle" id="f5" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon"><i class="fa fa-shield con"></i></span>
                                        <span class="link-text">OR</span>                                
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop" aria-labelledby="f5">
                                            <li class="dropdown-item"><a class="item" href="../OR/custom.html">Lorem</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item">
                                        <a href="javascript:void();" class="dropdown-toggle" id="f6" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon"><i class="fa fa-heartbeat con"></i></span>
                                        <span class="link-text">Policies</span>                                  
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop" aria-labelledby="f6">
                                            <li class="dropdown-item"><a class="item" href="../Policies/custom.html">Policies</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item">
                                        <a href="javascript:void();" class="dropdown-toggle" id="f7" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon"><i class="fa fa-shield con"></i></span>
                                        <span class="link-text">Security</span>                                   
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop appear" aria-labelledby="f7">
                                            <li class="dropdown-item "><a class="item" href="../Security/AdminUsers.aspx">Users</a></li>
                                            <li class="dropdown-item "><a class="item" href="../Security/User_Previlidges.aspx">previlidges</a></li>
                                            <li class="dropdown-item"><a class="item" href="../Security/ChangePassword.aspx">change password</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item">
                                        <a href="javascript:void();" class="dropdown-toggle" id="f7" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon"><i class="fa fa-graduation-cap"></i></span>
                                        <span class="link-text">Survey</span>                                   
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop appear" aria-labelledby="f7">
                                            <li class="dropdown-item ">
                                            <a class="item" href="../Survey/OutSurvey_Branches.aspx">Branches</a>
                                            </li>
                                            <li class="dropdown-item ">
                                            <a class="item" a="" href="../Survey/SurOrCus.aspx">Choose Servey</a>
                                            </li>
                                            <li class="dropdown-item">
                                            <a class="item" href="../Survey/OutSurvey_PatientsList.aspx">user</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item">
                                        <a href="javascript:void();" class="dropdown-toggle" id="f8" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon"><i class="fa fa-graduation-cap con"></i></span>
                                        <span class="link-text">Training</span>                                    
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu other-drop" aria-labelledby="f8">
                                            <li class="dropdown-item"><a class="item" href="../Training/Admin_AddEditDelete_User.html">Admin Screen</a></li>
                                            <li class="dropdown-item">
                                            <a class="item" href="../Training/fir-page.aspx"> 
                                            E-Learning
                                            </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                </div>
                                <!--end new dropdown-->
                            </nav>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:"headerLayout",
    props:["username"],
    data() {
        return {

        }
    },
    methods: {
        Button_LogOut() {
            localStorage.removeItem('user');
            this.$router.push({name:'login'})
        }
    }
}
</script>

<style>

</style>