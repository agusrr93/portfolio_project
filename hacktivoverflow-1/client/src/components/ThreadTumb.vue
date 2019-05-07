<template>
    <div class="row" style="border:1px solid grey; margin:10px; border-radius:10px">
        <div class="col-md-2 my-1">
            <img :src="thread.author.img" alt="" class="img-thumbnail" style="height:60px; border-radius: 30px">
            <h5 class="text-center my-1" style="font-size:14px;">{{ thread.author.name }}</h5>
            <p class="text-center" style="font-size:12px;">Hacktiv Member</p>
        </div>
        <div class="col-md-10" style="">
            <div>
                <router-link :to="{ path: `/thread/${thread._id}`}">
                    <a class="text-left mx-3 my-auto" style="color: black"> <h5> {{ thread.title }} </h5> </a>
                </router-link>
            </div>
            <div class="row container" style="position: absolute; bottom: 0;">
                <div class="col-md-12">
                    <hr>
                    <i class="fas fa-poll" style="margin: auto 15px;"> {{ thread.upVotes.length + thread.downVotes.length }} votes </i>
                    <i class="fas fa-eye" style="margin: auto 15px;"> {{thread.views}} views </i>
                    <i class="fas fa-comment" style="margin: auto 15px;"> {{ thread.answers.length }} answers </i>
                    <i class="fas fa-window-close" v-if="thread.isSolved"> Solved </i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ThreadTumb',
    props: ['thread'],
    data() {
        return {
            
        }
    }
   
}
</script>

<style>

</style>
