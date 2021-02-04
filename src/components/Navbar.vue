<template>
    <div class="navbar">
          <nav class="white">
            <div class="nav-wrapper">
            <router-link :to="{ name: 'Index'}">
                <img src="../assets/logo.jpg" alt="" class="logo">
                <span class="brand-logo black-text">Food Recipes</span>
            </router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><router-link :to="{name: 'Index'}">Home</router-link></li>
                <li v-if="user"><router-link :to="{name: 'UserProfile', params:{ id: username }}">Your Profile</router-link></li>
                <li v-if="!user"><router-link :to="{name: 'Login'}">Login</router-link></li>
                <li  v-if="user"><a @click="logout">Logout</a></li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name:'Navbar',
    data(){
        return{
            user: null,
            username: null,
        }
    },
    methods:{
        logout(){
            firebase.auth().signOut().then(()=>{
                this.$router.push({name: 'Login'})
            })
        }
    },
    created(){
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.user = user               
            }else{
                this.user = null
            }
        })

        let user = firebase.auth().currentUser
        db.collection('users').where('user_id', '==', user.uid).get()
            .then(snapshot=>{
                snapshot.forEach((doc) =>{
                   this.username = doc.id
                })
        })
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");
.navbar .logo{
    width: 70px;
    margin: 15px;
}
.navbar nav{
    height: 100px;
}
.navbar ul{
    margin-right: 25px;
    margin-top: 10px;
}
.navbar ul li a{
    color: black;
    font-family: 'Source Serif Pro', serif;
    text-transform: uppercase;
    font-size:18px ;
}
.navbar .brand-logo{
    font-family: 'Dancing Script';
    margin: 12px 5px;
}
</style>