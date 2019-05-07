<template>
    <div class="row" style="margin-top: 30px;">
        <div class="col-md-12">
            <!-- <wysiwyg /> -->
            <VueEditor v-model='text'/>
            <!-- <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="text"></textarea> -->
            <button class="btn btn-sm btn-primary my-1" @click="comment">POST</button>
        </div> <hr>
    </div>
</template>

<script>
import config from '@/assets/config.js'
import {VueEditor} from 'vue2-editor'

const { host } = config

export default {
    name: 'AddComment',
    props: ['threadId'],
    components: {
        VueEditor
    },
    data(){
        return {
            text: ''
        }
    },
    methods: {
        comment(){            
            axios({
                method: 'POST',
                url: `${host}/answers`,
                headers: {
                    token: localStorage.getItem('tokenHO')
                },
                data: {
                    text: this.text,
                    threadId: this.threadId
                }
            })
            .then((result) => {
                this.text = ''
                this.$emit('get-thread')
                console.log('comment sukses', result);               
            }).catch((err) => {
                console.log(err);
                
            });
            
        }
    }
}
</script>
<style>

</style>
