<template>
    <div class="banner">
        <div class="row">
            <div class="col s5">
                <h1>Save All Your Recipes</h1>
                <button class="btn btn-large">Add Recipe</button>
            </div>
            <div class="col s7 banner_img"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Banner',
    data(){
        return{

        }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");
.banner h1{
    font-family: 'Source Serif Pro', serif;
    padding: 5% 5% 2% 5%;
    margin: 10% 10% 2% 10%;
}
.banner button{
    margin-left:15%;
    width: 40%;
    border-radius: 15px;
    font-size: 18px;
    font-weight: 500;
}
.banner .banner_img{
    background: url('../assets/banner_img.jpg');
    background-repeat:no-repeat ;
    background-size:100% ;
    background-position: right;
    height: 550px;
}
</style>