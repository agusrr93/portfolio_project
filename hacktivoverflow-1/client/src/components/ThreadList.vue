<template>
    <div class="container" style="">
        <thread-tumb v-for="(thread,index) in threads" :key="index" :thread="thread" ></thread-tumb>
    </div>
</template>

<script>
import config from '@/assets/config.js'
import ThreadTumb from '@/components/ThreadTumb.vue'
import {mapState, mapActions} from 'vuex'

const { host } = config

export default {
    name: 'ThreadList',
    components: {
        ThreadTumb
    },
    props: [],
    created(){
        this.getThreads()
    },
    data() {
        return {
           allThreads: []
        }
    },
    computed: {
        ...mapState(['threads'])
    },
    methods: {
        ...mapActions(['getThreads']),
        
    }
}
</script>

<style>
</style>
