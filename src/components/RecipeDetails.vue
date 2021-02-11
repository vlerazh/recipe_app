<template>
    <div class="recipe-details" v-if="recipe">
        <h1>Recipe {{ recipe.name }}</h1>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name:'RecipeDetails',
    data(){
        return{
            recipe: null
        }
    },
    created(){
        let ref= db.collection('recipes').where('slug','==',this.$route.params.id)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.recipe = doc.data()
                this.recipe.id = doc.id
            })
        }).catch(err =>{
            console.log(err)
        })
    }
}
</script>

<style>

</style>