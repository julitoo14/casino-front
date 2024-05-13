<script setup>
import Card from "../components/Card.vue";
import { ref } from 'vue';
import axios from 'axios';

const croupierHand = ref([]);
const playerHand = ref([]);
const playing = ref(false);
const resultado = ref('');
const puntajeCroupier = ref(0);
const puntajeJugador = ref(0);
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
  playing.value = true;
  resultado.value = '';
  puntajeJugador.value = res.data.puntajeJugador;
  puntajeCroupier.value = res.data.puntajeCroupier;
}

const hit = async () => {
  const currentGame = localStorage.getItem('currentGame');
  const res = await axios.put(`http://localhost:3000/api/hit/${currentGame}`,{}, config);
  croupierHand.value = res.data.manoCroupier;
  playerHand.value = res.data.manoJugador;
  puntajeJugador.value = res.data.puntajeJugador;
  puntajeCroupier.value = res.data.puntajeCroupier;
  if (res.data.resultado === 'PERDIDA'){
    playing.value = false;
    resultado.value = res.data.resultado;
  }
}

const stand = async () => {
  const currentGame = localStorage.getItem('currentGame');
  const res = await axios.put(`http://localhost:3000/api/stand/${currentGame}`,{}, config);
  croupierHand.value = res.data.manoCroupier;
  playerHand.value = res.data.manoJugador;
  console.log(res);
  playing.value = false;
  resultado.value = res.data.resultado;
  puntajeJugador.value = res.data.puntajeJugador;
  puntajeCroupier.value = res.data.puntajeCroupier;
}

</script>

<template>
    <div class="game-screen">

      <div class="croupier-hand">
        <div class="cards">
          <div v-for="card in croupierHand" :key="card._id">
            <Card :suit="card.palo" :value="card.figura"></Card>
          </div>
        </div>
        <h2>{{puntajeCroupier}}</h2>
      </div>

      <div class="player-hand">
        <div class="cards">
          <div v-for="card in playerHand" :key="card._id" >
            <Card :suit="card.palo" :value="card.figura"></Card>
          </div>
        </div>
        <h2>{{puntajeJugador}}</h2>

      </div>

      <h2 v-if="resultado">{{resultado}}</h2>
      <button v-if="playing" class="play-button" @click="hit">Hit</button>
      <button v-if="playing" class="play-button" @click="stand">Stand</button>
      <button v-else class="play-button" @click="play">Play</button>

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cards{
  display: flex;
  gap: 10px;
}
</style>