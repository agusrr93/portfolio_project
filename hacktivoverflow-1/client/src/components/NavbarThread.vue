<template>
    <div class="container" style="margin-top: 40px;">
        <nav class="navbar navbar-light bg-light">
            <div class="nav-item">
                <a href="#" class="btn" @click="allThreads">All Threads</a>
            </div>
            <div class="nav-item">
                <a href="#" class="btn" v-if="user" @click="myThread">My Threads</a>
            </div>
            <div class="nav-item">
                <a href="#" class="btn" data-toggle="modal" data-target="#create-thread" v-if="user">Create New Thread</a>
            </div>
            <div class="form-inline">
                <input class="form-control mr-sm-3" type="search" placeholder="search thread" aria-label="Search"
                    @keyup.enter="search" v-model="inputSearch">
                <button class="btn btn-outline-dark my-0 my-sm-0" @click="search">Search</button>
            </div>
        </nav>

        <!-- modal create thread -->
        <div id="create-thread" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="padding: 5% 10%;">
                    <!-- form  -->
                    <div class="form-group">
                        <div class="alert alert-warning" role="alert" v-if="notifFail">{{ notifFail }}</div>
                        <label for="exampleInputEmail1">Title</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Judul" v-model="inputTitle">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Text From Image (if needed. will attach to input question field)</label>
                         <input type="file" id="inputImage" name="avatar" accept="image/png, image/jpeg, image/jpg" @change="onFileChange">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Question</label>
                        <vue-editor v-model="inputQuestion"/>
                    </div>
                    <button class="btn btn-dark" @click="addThread">Submit</button>
                    <!--  -->
                </div>
            </div>
        </div>
        <!-- akhir modal -->
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor'
    import {mapActions, mapState} from 'vuex'
    import config from '@/assets/config.js'
    const {host} = config

    export default {
        name: 'NavbarThread',
        components: {
            VueEditor
        },
        computed: {
            ...mapState(['user'])
        },
        data() {
            return {
                inputSearch: '',
                notifFail: '',
                inputTitle: '',
                inputQuestion: '',
                inputImage: ''
            }
        },
        methods: {
            ...mapActions(['getThreads', 'getMyThreads', 'getSearch']),
            addThread(){
                 if(this.inputTitle === '' || this.inputQuestion === ''){
                    this.notifFail = 'All Field Must be Filled'
                } else {
                    axios({
                        method: 'POST',
                        url: `${host}/threads`,
                        headers: {
                            token: localStorage.getItem('tokenHO')
                        },
                        data: {
                            title: this.inputTitle,
                            question: this.inputQuestion
                        }
                    })
                    .then((result) => {
                        this.inputTitle = ''
                        this.inputQuestion = ''
                        this.notifFail = ''
                        $('#create-thread').modal('hide')
                        this.$router.push(`/thread/${result.data.result._id}`)
                    })
                    .catch((err) => {
                        console.log(err.response);
                        this.notifFail = err.response
                    })
                }
            },
            getTextFromImg(){
                let formData = new FormData()
                formData.append('imageFile', this.inputImage)

                axios.post(`https://api.cloudmersive.com/ocr/image/toText`, formData, {
                    headers: {
                        Apikey: 'a738fbdc-a6f6-422c-992a-7a663b8b85e8'
                    }
                })
                .then((result) => {
                    // console.log(result.data.TextResult);
                    this.inputQuestion = result.data.TextResult
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            onFileChange(event){
                this.inputImage = event.target.files[0]
                this.getTextFromImg()
            },
            search(){
                if(this.inputSearch === ''){
                    this.getThreads()
                } else {
                    this.getSearch(this.inputSearch)
                    this.$router.push(`/`)
                }
            },
            myThread(){
                this.getMyThreads()
                this.$router.push(`/`)
            },
            allThreads(){
                this.getThreads()
                this.$router.push(`/`)
            }
        }
    }
</script>

<style>

</style>