<template>
  <div class="sideBar" id="app_general">
    <i class="fa fa-times close-btn hidden"></i>
    <div class="app-logo text-center">
      <img class="img-fluid" alt="logo" src="../../assets/layout/img/logo.png" />
    </div>
    <div class="profile">
      <div class="container">
        <div class="row">
          <div class="col-4">
            <div class="img">
              <img class="rounded-circle" src="../../assets/layout/img/user.jpg" />
            </div>
          </div>
          <div class="col-8">
            <div class="info">
              <span>Welcome,</span>
              <h4>{{ username }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ul class="list-unstyled">
      <li class="remove-open">
        <router-link :to="{ name: 'home' }" class="sid-links for-a-active">
          <i class="fa fa-home"></i>
          <span class="link-text">Dashboard</span>
        </router-link>
      </li>

      <li class="main-menu">
        <a class="sid-links" @click.prevent>
          <span class="link-text">Hr_Portal</span>
          <span class="icon fa fa-chevron-down pull-right"></span>
        </a>
        <ul class="list-unstyled sub-menu">
          <li>
            <router-link :to="{ name: 'workRequest' }">
              <span class="link-text">Work Request</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Employee' }">
              <span class="link-text">Employee</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'vacationRequest' }">
              <span class="link-text">Vacation Request</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'employeeVacation' }">
              <span class="link-text">Employee Vacation</span>
            </router-link>
          </li>
        </ul>
      </li>

      <li class="main-menu">
        <a class="sid-links" @click.prevent>
          <span class="link-text">Endoresment</span>
          <span class="icon fa fa-chevron-down pull-right"></span>
        </a>
        <ul class="list-unstyled sub-menu">
          <li>
            <router-link :to="{ name: 'addPatient' }">
              <span class="link-text">Addmition Form</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'viewPatients' }">
              <span class="link-text">Patients</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>

    <!-- <ul class="list-unstyled">
            <li class="remove-open">
                <a href="http://stroketest.daralfouad.org/cpanel/Courses/default.aspx"class="sid-links for-a-active">
                    <i class="fa fa-home"></i>
                    <span class="link-text">Dashboard</span>
                </a>
            </li>

            <li class="main-menu" v-for='category in pagesArr'> 
                <a class="sid-links" @click.prevent>
                    <i :class="categories.filter(x => x.id == category[0].CategoryId)[0].Icon + ' fa'"></i>
                    <span class="link-text">{{categories.filter(x => x.id == category[0].CategoryId)[0].Name}}</span>
                    <span class="icon fa fa-chevron-down pull-right"></span>
                </a>
                <ul class="list-unstyled sub-menu" v-for='page in category'>
                    <li>
                        <a :href="'http://stroketest.daralfouad.org/cpanel/' + categories.filter(x => x.id == page.CategoryId)[0].Name + '/' + page.Path">
                            <span class="link-text">{{page.Name}}</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul> -->
  </div>
</template>

<script>
$(".sideBar ul li.main-menu.open")
  .find("> ul")
  .slideToggle()
  .parent()
  .siblings()
  .find("ul")
  .slideUp();

$("body").on("click", ".sideBar ul li.main-menu", function () {
  $(this).siblings().removeClass("open");
  $(this).toggleClass("open");
  $(this).find("> ul").slideToggle().parent().siblings().find("ul").slideUp();
});

export default {
  name: "sideBar",
  props: ["username"],
  data() {
    return {};
  },
};
</script>

<style></style>
