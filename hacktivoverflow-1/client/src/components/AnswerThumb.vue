<template>
    <div class="container" id="comments" style="border:1px solid grey; margin: 10px 0px; border-radius:5px">
        <div class="small text-right">{{answer.updatedAt.slice(0, 10)}}</div>
        <div class="row">
            <div class="comment-avatar col-md-2 col-sm-2 text-center">
                <img :src="answer.user.img" alt="" class="img-thumbnail" style="height:60px; border-radius: 30%; margin-bottom:10px;">
                <h5 class="text-center" style="font-size:15px;">{{ answer.user.name }}</h5>
                <p class="text-center" style="font-size:12px;">Hacktiv Member</p>
            </div>
            <div class="comment-content col-md-10">
                <div class="text-left text my-2" style="padding:10px" v-html="answer.text"></div>

                <div class="align-bottom">
                    <button class="fas fa-thumbs-up btn btn-primary mx-2 my-1 " @click="upVote" v-if="user && user.id !== answer.user._id && statusUp"> {{ answer.upVotes.length }} </button>
                    <button class="fas fa-thumbs-up btn btn-primary mx-2 my-1 " @click="upVote" v-if="user && user.id !== answer.user._id && !statusUp" disabled> {{ answer.upVotes.length }} </button>

                    <button class="fas fa-thumbs-down btn btn-primary mx-2 my-1" @click="downVote" v-if="user && user.id !== answer.user._id && statusDown"> {{ answer.downVotes.length }} </button>
                    <button class="fas fa-thumbs-down btn btn-primary mx-2 my-1" @click="downVote" v-if="user && user.id !== answer.user._id && !statusDown" disabled> {{ answer.downVotes.length }} </button>

                    <button class="fas fa-thumbs-up btn btn-primary mx-2 my-1" v-if="user && user.id === answer.user._id" disabled> {{ answer.upVotes.length }} </button>
                    <button class="fas fa-thumbs-down btn btn-primary mx-2 my-1" v-if="user && user.id === answer.user._id" disabled> {{ answer.downVotes.length }} </button>
                    <button class="fas fa-edit btn btn-primary mx-2 my-1" data-toggle="modal" data-target="#modal-edit-answer" v-if="user && user.id === answer.user._id && !isSolved"></button>

                </div>
            </div>
        </div>
        

        <!-- modal Edit answer -->
        <div id="modal-edit-answer" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="padding: 5% 10%;">
                    <!-- form  -->
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Your Answer</label>
                        <!-- <wysiwyg v-model='editAnswer' /> -->
                        <VueEditor v-model='editAnswer'/>
                    </div>
                    <button class="btn btn-primary" data-dismiss="modal" @click="updateAnswer">Submit</button>
                    <!--  -->
                </div>
            </div>
        </div>
        <!-- akhir modal -->
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor'
    import config from '@/assets/config.js'

    const {host} = config

    export default {
        name: 'AnswerThumb',
        props: ['answer', 'user', 'isSolved'],
        components: {
            VueEditor
        },
        data() {
            return {
                editAnswer: this.answer.text,
                statusUp: true,
                statusDown: true
            }
        },
        created(){
            this.cekStatus()
        },
        methods: {
            cekStatus(){
                if(this.user){
                    this.answer.upVotes.forEach(data => {
                        if(data === this.user.id){
                            this.statusUp = false
                        }
                    });
                    this.answer.downVotes.forEach(data => {
                        if(data === this.user.id){
                            this.statusDown = false
                        }
                    });
                }
            },
            updateAnswer() {
                axios({
                    method: 'PUT',
                    url: `${host}/answers/${this.answer._id}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    },
                    data: {
                        text: this.editAnswer
                    }
                })
                .then((result) => {
                    console.log('berhasil bang', result);
                    this.$emit('get-thread')
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            upVote() {
                axios({
                    method: 'POST',
                    url: `${host}/answers/upvote/${this.answer._id}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    }
                })
                .then((result) => {
                    console.log(result);
                    this.$emit('get-thread')
                    this.statusUp = false
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            downVote() {
                axios({
                    method: 'POST',
                    url: `${host}/answers/downvote/${this.answer._id}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    }
                })
                .then((result) => {
                    console.log(result);
                    this.$emit('get-thread')
                    this.statusDown = false

                }).catch((err) => {
                    console.log(err);
                });
            }

        }
    }
</script>

<style>

</style>