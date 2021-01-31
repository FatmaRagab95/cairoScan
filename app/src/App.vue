<style src='./assets/layout/css/bootstrap-material-datetimepicker.css'></style>
<style src='./assets/layout/css/bootstrap.min.css'></style>
<style src='./assets/layout/css/jQuery-UI.css'></style>
<style src='./assets/layout/css/jquery-ui.multidatespicker.css'></style>
<style src='./assets/layout/css/material-icons.css'></style>
<style src='./assets/layout/css/MaterialDesignIcons.css'></style>
<style src='./assets/layout/css/nice-select.css'></style>
<style src='./assets/layout/css/style-redEN.css'></style>
<style src='./assets/layout/css/style-red.css'></style>
<style src='./assets/layout/css/main.css'></style>


<template>
<div id="app">
<headerLayout v-if='user' :username='user.FullName'></headerLayout>
<div :class='user ? "page-container" : ""'>
    <div :class='user ? "main-contnet" : ""'>
        <router-view/>
        <footerLayout v-if='user' :username='user.FullName'></footerLayout>
    </div> 
</div>
</div>
</template>

<script>


import headerLayout from '@/components/layout/header'
import footerLayout from '@/components/layout/footer'

export default {
name: 'App',
components: {headerLayout,footerLayout},
data() {
return {
    user: JSON.parse(localStorage.getItem('user'))
}
},
watch: {
    $route: function(to, from) {
    this.user = JSON.parse(localStorage.getItem('user'));
    }
},
created() {
}
}
</script>


<style>
.loader-container {
    background-color: #7da4d0;
    padding: 10px 25px;
    border-radius: 5px;
    box-shadow: 0 2px 5px 1px #c8c8c8;
    color: #fff;
    display: inline-block;
    word-spacing: 15px;
}
.loader-f {
    animation: loader 800ms step-end infinite;
    width: 40px;
    height: 40px;
    transform: rotate(0deg);
}
.loader-f path {
    fill: #4468d6;
}

@keyframes loader {
    12.5% {
        transform: rotate(45deg);
    }
    25% {
        transform: rotate(90deg);
    }
    37.5% {
        transform: rotate(135deg);
    }
    50% {
        transform: rotate(180deg);
    }
    62.5% {
        transform: rotate(225deg);
    }
    75% {
        transform: rotate(270deg);
    }
    87.5% {
        transform: rotate(315deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
