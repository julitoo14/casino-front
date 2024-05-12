<script setup>
import {onMounted, ref} from 'vue';
import {router} from "../routes.js";
const logged = ref(false);

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    logged.value = true;
  }
})
</script>

<template>
  <div class="not-logged-screen" v-if="!logged">
    <h1>Welcome to BetWild!</h1>
    <p>Login To Your Account And Start Having Fun With Us!</p>
  </div>

  <div v-else class="logged-screen">
    <h1>What whould you like to play today?</h1>
    <div class="game-card">
      <h2>Blackjack</h2>
      <p>Try your luck in a game of Blackjack!</p>
      <button @click="router.push('/blackjack')">Play Now</button>
    </div>
  </div>

</template>

<style scoped>
  *{
    color: white;
  }

  .not-logged-screen{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logged-screen{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .game-card {
    width: 200px;
    padding: 20px;
    border: 1px solid #000;
    border-radius: 10px;
    background-color: #7c6f6f;
    color: #000;
    text-align: center;
    margin: 20px;
  }

  .game-card h2 {
    margin: 0;
    padding: 0;
    font-size: 1.5em;
  }

  .game-card p {
    margin: 10px 0;
  }

  .game-card button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #373636;
    color: #f0f0f0;
    cursor: pointer;
  }
</style>