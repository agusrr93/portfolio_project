<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark static-top sb-navbar" style="height:20px" >
            <div class="container">
                <a class="navbar-brand" href="#">
                    <router-link :to="{ path: '/' }"> Hacktiv Overflow </router-link>        
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <audio src="http://streaming.sim-indonesia.com:8000/genfm" type="audio/aacp" preload="auto" controls="controls" aria-placeholder="GEN"></audio>
                        </li>
                        <li class="nav-item">
                            <audio src="http://sgp1.onlivestreaming.net:9696/stream" preload="auto" controls></audio>
                        </li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <login></login>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import config from '@/assets/config.js'
    import Login from '@/components/Login.vue'

    const {host} = config

    export default {
        name: 'NavBar',
        components: {
            Login
        },
        data(){
            return {
            
            }
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            ...mapActions(['getUser', 'getSearch']),
        },
        created(){
            this.getUser()
        }
    }
</script>

<style>

</style>