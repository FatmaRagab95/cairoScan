<template>
    <header class="topbar">
        <i class="toggleBar fa fa-exchange"></i>
        <ul class="list-unstyled menu pull-right align-items-center">
            <li class="main-menu"><i class="fa fa-bell-o"></i><span class="num">4</span>
                <ul class="list-unstyled sub-menu">
                    <li><a class="notfi" href="#">
                        <div class="row align-items-center">
                            <div class="col-12">
                                <div class="info">
                                    <span class="time">3 min ago</span>
                                    <h3>Fatma Ragab</h3>
                                    <p>lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum</p>
                                </div>
                            </div>
                        </div>
                    </a></li>
                    <li><a class="notfi" href="#">
                        <div class="row align-items-center">
                            <div class="col-12">
                                <div class="info">
                                    <span class="time">3 min ago</span>
                                    <h3>Fatma Ragab</h3>
                                    <p>lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum</p>
                                </div>
                            </div>
                        </div>
                    </a></li>
                    <li><a class="notfi" href="#">
                        <div class="row align-items-center">
                            <div class="col-12">
                                <div class="info">
                                    <span class="time">3 min ago</span>
                                    <h3>Fatma Ragab</h3>
                                    <p>lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum</p>
                                </div>
                            </div>
                        </div>
                    </a></li>
                    <li class="text-center"><a class="msg" href="#">View All</a></li>
                </ul>
            </li>
            <li class="main-menu">
                <i class="fa fa-envelope-o"></i><span class="num">13</span>
                <ul class="list-unstyled sub-menu">
                    <li><a class="msg" href="#">
                        <div class="row align-items-center">
                            <div class="col-3">
                                <img class="rounded-circle img-fluid" src="../../assets/layout/img/user.jpg"></div>
                            <div class="col-9">
                                <div class="info">
                                    <span class="time">3 min ago</span>
                                    <h3>Fatma Ragab</h3>
                                    <p>lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum</p>
                                </div>
                            </div>
                        </div>
                    </a></li>
                    <li><a class="msg" href="#">
                        <div class="row align-items-center">
                            <div class="col-3">
                                <img class="rounded-circle img-fluid" src="../../assets/layout/img/user.jpg"></div>
                            <div class="col-9">
                                <div class="info">
                                    <span class="time">3 min ago</span>
                                    <h3>Fatma Ragab</h3>
                                    <p>lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum</p>
                                </div>
                            </div>
                        </div>
                    </a></li>
                    <li><a class="msg" href="#">
                        <div class="row align-items-center">
                            <div class="col-3">
                                <img class="rounded-circle img-fluid" src="../../assets/layout/img/user.jpg"></div>
                            <div class="col-9">
                                <div class="info">
                                    <span class="time">3 min ago</span>
                                    <h3>Fatma Ragab</h3>
                                    <p>lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum</p>
                                </div>
                            </div>
                        </div>
                    </a></li>
                    <li class="text-center"><a class="msg" href="#">View All</a></li>
                </ul>
            </li>
            <li class="main-menu">
                        
                    <div class="row align-items-center">
                        <div class="profile">
                            <img class="rounded-circle img-fluid" src="../../assets/layout/img/user.jpg"></div>
                        <div class="p-0"><span>{{username}}</span></div>
                    </div>
                    <ul class="list-unstyled sub-menu profile-menu">
                        <li><a href="../Security/forgot_password.aspx"><i class="fa fa-user-circle"></i><span>Profile</span></a></li>
                        <li><a href="#"><i class="fa fa-gear"></i><span>Settings</span></a></li>
                        <li>
                            <input type="submit" @click.prevent="Button_LogOut" value="Log Out">
                        </li>
                    </ul>
            </li>
        </ul>
        <div class="clearfix"></div>
    </header>
</template>

<script>

export default {
    name:"upperNav",
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