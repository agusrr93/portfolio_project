<template>
    
</template>

<script>
    import config from '@/assets/config.js'
    const {host} = config

    export default {
        name: 'Verification',
        created() {
            console.log(this.$route.params.id);
            axios({
                method: 'GET',
                url: `${host}/users/verification/${this.$route.params.id}`
            })
            .then((result) => {
                this.$router.push(`/`)
                console.log('verification success');
                
            }).catch((err) => {
                console.log(err);
            });
            
        }
        
    }
</script>

<style>

</style>
