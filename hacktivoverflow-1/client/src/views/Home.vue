<template>
  <div class="container">
    <div class="row">
      <!-- <div class="col-md-2"></div> -->
      <div class="col-md-10" >
        
          <ThreadList></ThreadList>
        
      </div>
      <div class="col-md-2">
        <div>
          <div id="openweathermap-widget-15"></div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThreadList from '@/components/ThreadList'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'home',
  components: {
    ThreadList
  },
  data(){
    return {

    }
  },
  methods: {
    ...mapActions(['getThreads']),
    getLocation(){
      axios({
        method: 'GET',
        url: `http://ip-api.com/json`
      })
      .then((result) => {
        axios({
          method: 'GET',
          url: `http://api.openweathermap.org/data/2.5/weather?q=${result.data.city}&APPID=e2af7a34c74e1c7658bd1416f7ee40e1`
        })
        .then((data) => {
        window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 15,cityid: data.data.id,appid: 'e2af7a34c74e1c7658bd1416f7ee40e1',units: 'metric',containerid: 'openweathermap-widget-15',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();
        })
        
      }).catch((err) => {
        console.log(err);
        
      });
    }
    
  },
  computed: {
    ...mapState(['user'])
  },
  created(){
    this.getThreads(),
    this.getLocation()
  }
}
</script>
