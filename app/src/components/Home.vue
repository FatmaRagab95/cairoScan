<template>
  <div class="internal-page">

      <div class="gh_home">
          <div class="container">
              <div class="row">
              <div class="col-lg-12">
                  <div class="gh_info">
                      <h2>Welcom To CairoScan Group</h2>
                  </div>
              </div>
              </div>
              <div class="row">
              <div class="col-lg-4">
                  <div class="gh_source">
                      <div class="gh_logo one">
                          <i class="fa fa-server" aria-hidden="true"></i>
                      </div>
                      <h4>preparation Test</h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
              </div>
              <div class="col-lg-4">
                  <div class="gh_source">
                      <div class="gh_logo two">
                          <i class="fa fa-server" aria-hidden="true"></i>
                      </div>
                      <h4>Trainee</h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
              </div>
              <div class="col-lg-4">
                  <div class="gh_source">
                      <div class="gh_logo three">
                          <i class="fa fa-server" aria-hidden="true"></i>
                      </div>
                      <h4>cairoscan source</h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
              </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .gh_home {
    background:  url('../assets/layout/img/backforhome.png') center no-repeat;	
    background-size: cover;
    height: 937px;		}
    .gh_info {
    height: 372px;
    padding: 153px 0;	
    } 
    .gh_info h2{
    font-size: 51px;	
    }
    .gh_source {
    text-align: center;
    display: revert;
    background-color: #fff;
    box-shadow: 15px -20px 112px -63px #eaeaea, 3px 8px 15px #eaeaea;
    padding: 31px;
    border-radius: 40px;	
    }
    .gh_source .gh_logo {
    width: 62px;
    height: 62px;
    border-radius: 38%;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    padding-top: 16px;
    font-size: 23px;
    }
    .gh_source .one {
    background-color: #0098d1;
    }
    .gh_source .two {
    background-color: #e03b32;
    }
    .gh_source .three {
    background-color: #ffd600;
    }
    .gh_source h4{
    font-size: 30px;
    font-weight: bold;
    margin: 17px;
    }
    .gh_source p{
    color: #8a8a8a;
    letter-spacing: .5px;
    padding: 0 20px;
    }
    @media (max-width: 991.98px) { 
    .gh_info h2{
    text-align:center;
    }
    .gh_source {
    margin:20px auto;
    width: 70%;
    }
    .gh_home {
    height: auto;
    }
    }
    @media (max-width: 767.98px) { 
    .gh_source {
    width: 100%;
    }
    }
</style>
