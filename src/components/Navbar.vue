<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
import {router} from "../routes.js";

const userName = ref('');
const password = ref('');
const logged = ref(false);

const login =async () => {

  try{
    const res = await axios.post('http://localhost:3000/auth/login', {
      userName: userName.value,
      password: password.value
    })

    const token = res.data.token;
    localStorage.setItem('token', token);
    logged.value = true;


    console.log(res);
    router.go('/');
  }
  catch (error) {
    console.error(error);
  }
}

const logout = () => {
  localStorage.removeItem('token');
  logged.value = false;
  router.go('/');
}

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    logged.value = true;
  }
})

</script>

<template>
  <header class="header">
    <img class="logo" src="/cards.png" alt="Logo">
    <h1 class="title">BetWild</h1>
    <div class="login">
      <div v-if="!logged" class="inputs">
        <input type="text" v-model="userName" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">
      </div>
      <button v-if="logged" @click="logout" >Logout</button>
      <button v-else @click="login">Login</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  background-color: #f0f0f0;
  padding: 5px;
}

.logo {
  width: 50px;
  height: 50px;
  grid-column: 1;
}

.title {
  text-align: center;
  grid-column: 2;
  font-size: 2.4em;
}

.login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  grid-column: 3;
}

.inputs {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

input {
  padding: 5px;
  font-size: 1em;
}

button {
  padding: 5px;
  font-size: 1em;
  background-color: #373636;
  border: 1px solid #000;
  color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}

</style>