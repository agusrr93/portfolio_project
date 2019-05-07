<template>
    <div class="container">
        <audio controls>
            <source :src="audio" type="audio/mpeg">
            Your browser does not support the audio tag.
        </audio>
        <div class="row" style="border: 1px solid grey; margin: 20px 0px; border-radius:5px;">
            <div class="col-md-2 my-2">
                <img :src="img" alt="" class="img-thumbnail" style="height:90px; border-radius: 30%; margin-bottom:10px;">
                <div class="form-inline" id="reputation"> 
                    <div class="kotak"></div>
                    <div class="kotak"></div>
                    <div class="kotak"></div>
                    
                </div>
                
                <h5 class="text-center" style="font-size:15px;">{{ author }}</h5>
                <p class="text-center" style="font-size:12px;">Hacktiv Member</p>
            </div>
            <div class="col-md-10" >
                <div class="row">
                    <div class="col-md-12">
                        <div class="my-auto" style=" height:30px">
                            <span v-if="score === 0" class="text-leftrounded float-left"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <span v-if="score === 1" class="text-leftrounded float-left"><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star"></i><i class="fas fa-star" ></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <span v-if="score === 2" class="text-leftrounded float-left"><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" ></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <span v-if="score === 3" class="text-leftrounded float-left"><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <span v-if="score === 4" class="text-leftrounded float-left"><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star"></i></span>
                            <span v-if="score === 5" class="text-leftrounded float-left"><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i><i class="fas fa-star" style="color:orange"></i></span>
                            <span class="text-leftrounded float-left mx-3">{{upVotes.length}} <i class="far fa-thumbs-up"></i> / {{upVotes.length + downVotes.length}} votes</span>
                            <!-- <span class="text-leftrounded float-left mx-3"> <i class="far fa-thumbs-up">{{upVotes.length}}</i> - <i class="far fa-thumbs-down">{{downVotes.length}}</i></span> -->
                            <div class="d-flex justify-content-end small text-muted" style="">{{time.slice(0, 10)}}</div>
                        </div>
                        <div class="" >
                            <h5 class="text-left my-1 font-weight-bold">{{title}}</h5><hr>
                            <div v-html="question" class="text text-left"></div>
                            <br>
                        </div>
                    </div>
                </div>
                <div class="row" style="">
                    <div class="col-md-12 my-2" style="height:35px">
                        <div class="align-middle" >
                            <audio autoplay="autoplay" v-if="audioDesc" :src="audioDesc" preload="auto" controls></audio>
                            <button class="btn btn-primary" @click="textToSpeech">Text to speech</button>
                            <button v-if="user && authorId !== user.id && statusUp" class="fas fa-thumbs-up btn btn-primary" style="margin:0px 5px" @click="upThread"></button>
                            <button v-if="user && authorId !== user.id && !statusUp" class="fas fa-thumbs-up btn btn-primary" style="margin:0px 5px" @click="upThread" disabled></button>

                            <!-- <button class="btn btn-primary" @click="upThread">UpVote </button> -->
                            <button v-if="isSolved" class="btn btn-danger" disabled>SOLVED</button>
                            <button v-if="user && authorId !== user.id && statusDown" class="fas fa-thumbs-down btn btn-primary" style="margin:0px 5px" @click="downThread"></button>
                            <button v-if="user && authorId !== user.id && !statusDown" class="fas fa-thumbs-down btn btn-primary" style="margin:0px 5px" @click="downThread" disabled></button>
                            <a  class="twitter-share-button fab fa-twitter btn btn-primary" :href="'https://twitter.com/intent/tweet?text=Please help us to answer this problem... https://hacktiv.ndiw.online/thread/' + threadId  " data-size="large" style="margin:0px 5px"></a>
                            <button v-if="user && authorId === user.id && !isSolved" style="margin:0px 5px" class="fas fa-edit btn btn-primary" data-toggle="modal" data-target="#modal-edit" @click="getThread(threadId)"></button>
                            <button v-if="user && authorId === user.id" style="margin:0px 5px" class="fas fa-trash-alt btn btn-primary" @click="deleteThread"></button>
                            <button v-if="user && authorId === user.id && !isSolved" style="margin:0px 5px" class="fas fa-window-close btn btn-primary" @click="closeThread"></button>

                        </div>
                        <!-- button edit/delete -->
                        <div v-if="user && authorId === user.id">
                            <!-- modal Edit -->
                            <div id="modal-edit" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
                                aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content" style="padding: 5% 10%;">

                                        <!-- form  -->
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Title</label>
                                            <input type="text" class="form-control" id="exampleInputEmsacasail1"
                                                aria-describedby="emailHelp" placeholder="Judul" v-model="editTitle">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1">Question Detail</label>
                                            <wysiwyg v-model='editQuestion' />
                                            <!-- <textarea class="form-control" id="exampleFormControlsacTextarea1" rows="20" v-html="editQuestion"></textarea> -->
                                        </div>
                                        <button class="btn btn-primary" data-dismiss="modal" @click="editThread">Submit</button>

                                        <!--  -->
                                    </div>
                                </div>
                            </div>
                            <!-- akhir modal -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row ">
            <div class="col-md-10 offset-md-1">
                <AnswerThumb :isSolved="isSolved" :user="user" v-for="(answer, index) in answers" :key="index" :answer="answer" @get-thread="getThread(threadId)"></AnswerThumb>
                <AddComment v-if="user && !isSolved" :threadId="threadId" @get-thread="getThread(threadId)"></AddComment>
            </div>
        </div>
    </div>
</template>
<script>
    import config from '@/assets/config.js'
    import {mapActions, mapState} from 'vuex'
    import AnswerThumb from '@/components/AnswerThumb.vue'
    import AddComment from '@/components/AddComment.vue'

    const {host} = config

    export default {
        name: 'ThreadDetail',
        props: [],
        components: {
            AnswerThumb,
            AddComment
        },
        data() {
            return {
                title: '',
                author: '',
                img: '',
                question: '',
                upVotes: '',
                downVotes: '',
                time: '',
                threadId: '',
                authorId: '',
                editTitle: '',
                editQuestion: '',
                editTags: '',
                answers: [],
                statusUp: true,
                statusDown: true,
                score: '',
                isSolved: '',
                audioDesc: '',
                audio: ''
            }
        },
        methods: {
            getThread(id) {
                console.log(id);
                
                axios({
                        method: 'GET',
                        url: `${host}/threads/${id}`
                    })
                    .then((result) => {
                        console.log(result.data);
                        this.threadId = result.data._id
                        this.title = result.data.title
                        this.question = result.data.question
                        this.author = result.data.author.name
                        this.img = result.data.author.img
                        this.upVotes = result.data.upVotes
                        this.downVotes = result.data.downVotes
                        this.authorId = result.data.author._id
                        this.time = result.data.createdAt
                        this.editQuestion = result.data.question
                        this.editTitle = result.data.title
                        this.answers = result.data.answers
                        this.isSolved = result.data.isSolved
                        this.getStatusVote()
                        this.getScore()
                    }).catch((err) => {
                        console.log(err);
                    });
            },
            getStatusVote() {
                if(this.user){
                    this.upVotes.forEach(data => {
                        if(data === this.user.id){
                            this.statusUp = false
                        }
                    });
                    this.downVotes.forEach(data => {
                        if(data === this.user.id){
                            this.statusDown = false
                        }
                    })
                }
            },
            editThread() {
                axios({
                    method: 'PUT',
                    url: `${host}/threads/${this.threadId}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    },
                    data: {
                        title: this.editTitle,
                        text: this.editQuestion
                    }
                })
                .then((result) => {
                    this.getThread(this.threadId)
                    // this.$emit('get-all-articles')
                }).catch((err) => {
                    console.log(err);
                });
            },
            deleteThread() {
                axios({
                    method: 'DELETE',
                    url: `${host}/threads/${this.threadId}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    }
                })
                .then((result) => {
                    console.log('hapus sukses', result);
                    this.$router.push({path: '/'})
                }).catch((err) => {
                    console.log(err);
                });
            },
            closeThread(){
                axios({
                    method: 'PUT',
                    url: `${host}/threads/solved/${this.threadId}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    }
                })
                .then((result) => {
                    console.log(result);
                    this.getThread(this.threadId)
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            upThread() {
                axios({
                    method: 'POST',
                    url: `${host}/threads/upvote/${this.threadId}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    }
                })
                .then((result) => {
                    this.getThread(this.$route.params.id)
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            downThread() {
                axios({
                    method: 'POST',
                    url: `${host}/threads/downvote/${this.threadId}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    }
                })
                .then((result) => {
                    this.getThread(this.$route.params.id)
                }).catch((err) => {
                    console.log(err);
                });
            },
            getScore(){
                let a = this.upVotes.length + this.downVotes.length
                if(a === 0){
                    this.score = 0
                } else {
                    this.score = Math.round(((this.upVotes.length/a) / 2) * 10)
                }
            },
            textToSpeech(){
                // console.log(this.question);
                // axios.post('https://api.cloudmersive.com/speech/speak/text/basicVoice/mp3', this.question, {
                //     headers: {
                //         'Apikey': 'a738fbdc-a6f6-422c-992a-7a663b8b85e8'
                //     },
                // })
                // .then((result) => {
                //     console.log(result);
                    
                // }).catch((err) => {
                //     console.log(err.response);
                    
                // });
                // axios({
                //     method: 'POST',
                //     url: `https://api.cloudmersive.com/speech/speak/text/basicVoice/mp3`,
                //     headers: {
                //         Apikey: 'a738fbdc-a6f6-422c-992a-7a663b8b85e8',
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     },
                //     data: {
                //         '': `The quick brown fox jumps over the lazy dog`
                //     }
                // })
                // .then((result) => {
                //     // console.log(result);
                //     this.audioDesc = result
                // }).catch((err) => {
                //     console.log(err.response);
                    
                // });

                let formData = new FormData()
                formData.append('', `The quick brown fox jumps over the lazy dog`)

                axios.post(`https://api.cloudmersive.com/speech/speak/text/basicVoice/mp3`, `"Hello there"`, {
                    headers: {
                        'Apikey': 'a738fbdc-a6f6-422c-992a-7a663b8b85e8',
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    // console.log(response.data);
                    var blob=new Blob([response.data], {type : 'audio/mp3'});
                    var blobUrl = URL.createObjectURL(blob);
                    console.log(blobUrl);
                    // const url = window.URL.createObjectURL(new Blob([response.data]));
                    // const link = document.createElement('a');
                    // console.log(blob)
                    // link.href = url;
                    // link.setAttribute('download', 'file.mp3');
                    // document.body.appendChild(link);
                    // link.click();
                    this.audioDesc = blobUrl
                    this.audio = response.data
                }).catch((err) => {
                    console.log(err.response);
                });



            }
        },
        created() {
            this.getThread(this.$route.params.id)
        },
        computed: {
            ...mapState(['user']),
            getParamsId: function () {
                return this.$route.params.id
            }
        },
        watch: {
            getParamsId: function (val) {
                this.getThread(val)
            }
        }
    }
</script>
<style>
    .text {
        min-height: 30px;
        background-color: aliceblue;
        padding: 10px;
    }
    .kotak {
        height: 15px;
        width: 5px;
        background-color: limegreen;
        margin: 5px 1px;
    }
</style>