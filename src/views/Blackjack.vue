<script setup>
import Card from "../components/Card.vue";
import { ref } from 'vue';
import axios from 'axios';

const croupierHand = ref([]);
const playerHand = ref([]);
const config = {headers: {
    Authorization: `${localStorage.getItem('token')}`,
  }
};

const play = async () => {
  const token = localStorage.getItem('token');
  //decode token
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.id;
  const res = await axios.post(`http://localhost:3000/api/play/${userId}`,{}, config);
  localStorage.setItem('currentGame', res.data._id);
  croupierHand.value = res.data.manoCroupier;
  playerHand.value = res.data.manoJugador;
}

</script>

<template>
    <div class="game-screen">

      <button class="play-button" @click="play">Play</button>

      <div class="croupier-hand">
        <div v-for="card in croupierHand" :key="card._id">
          <Card :suit="card.palo" :value="card.figura"></Card>
        </div>
      </div>

      <div class="player-hand">
        <div v-for="card in playerHand" :key="card._id" >
          <Card :suit="card.palo" :value="card.figura"></Card>
        </div>
      </div>


    </div>
</template>

<style scoped>
.game-screen{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 80vh;
  background-color: #025718;
}

.play-button{
  padding: 10px;
  font-size: 1.5em;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
}

.player-hand, .croupier-hand{
  margin: 10px;
  display: flex;
  gap: 10px;
}



</style>