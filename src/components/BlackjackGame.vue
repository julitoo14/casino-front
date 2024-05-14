<template>
  <CroupierCards :croupierHand="croupierHand" :croupierReveal="croupierReveal" :puntajeCroupier="puntajeCroupier" />
  <PlayerCards :playerHand="playerHand" :puntajeJugador="puntajeJugador" />
  <h2 class="saldo">Saldo: {{saldo}}</h2>
  <p v-if="!playing" class="apuesta"  >Bet: {{apuesta}} </p>
  <div v-if="!playing" class="chip-buttons">
    <button class="clear alt-button" @click="clearBet">Clear</button>
    <button class="chip-button chip-100" @click="addBet(100)">100</button>
    <button class="chip-button chip-500" @click="addBet(500)">500</button>
    <button class="chip-button chip-1000" @click="addBet(1000)">1000</button>
    <button class="max alt-button" @click="maxBet">Max bet</button>
  </div>


  <div>
    <button v-if="playing" class="hit-button" @click="hit">Hit</button>
    <button v-if="playing" class="stand-button" @click="stand">Stand</button>
    <button v-else class="play-button" @click="play">Play</button>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import CroupierCards from "./CroupierCards.vue";
import PlayerCards from "./PlayerCards.vue";
import { app } from '../main';

const apuesta = ref(0);
const saldo = ref(0);
const croupierHand = ref([]);
const playerHand = ref([]);
const playing = ref(false);
const croupierReveal = ref(false);
const resultado = ref('');
const puntajeCroupier = ref(0);
const puntajeJugador = ref(0);
const config = {headers: {
    Authorization: `${localStorage.getItem('token')}`,
  }
};

onMounted(() => {
  updateSaldo();
});




  const showAlert = (message) => {
  app.config.globalProperties.$swal(message);
};


const updateSaldo = async () => {
  const token = localStorage.getItem('token');
  //decode token
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.id;
  const res = await axios.get(`http://localhost:3000/auth/user/${userId}`, config);
  saldo.value = res.data.user.saldo;
  console.log(res.data.user);
}

const addBet = (amount) => {
  apuesta.value += amount;
}

const clearBet = () => {
  apuesta.value = 0;
}

const maxBet = () => {
  apuesta.value = saldo.value;
}

const play = async () => {
  const token = localStorage.getItem('token');
  //decode token
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.id;
  await updateSaldo();
  const res = await axios.post(`http://localhost:3000/api/play/${userId}`,{apuesta: apuesta.value}, config);
  saldo.value -= apuesta.value;
  localStorage.setItem('currentGame', res.data._id);

  croupierHand.value = res.data.manoCroupier;
  playerHand.value = res.data.manoJugador;
  playing.value = true;
  resultado.value = '';
  puntajeJugador.value = res.data.puntajeJugador;
  puntajeCroupier.value = res.data.puntajeCroupier;
  croupierReveal.value = false;

  if(playerHand.value.length === 2 && puntajeJugador.value === 21){
    stand();
  }

}

const hit = async () => {
  const currentGame = localStorage.getItem('currentGame');
  const res = await axios.put(`http://localhost:3000/api/hit/${currentGame}`,{}, config);
  croupierHand.value = res.data.manoCroupier;
  playerHand.value = res.data.manoJugador;
  puntajeJugador.value = res.data.puntajeJugador;
  puntajeCroupier.value = res.data.puntajeCroupier;
  if(res.data.resultado === 'PERDIDA'){
    playing.value = false;
    resultado.value = res.data.resultado;
    croupierReveal.value = true;
    await updateSaldo();
    showAlert('You lost!');
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
  croupierReveal.value = true;
  await updateSaldo();
}

</script>

<style scoped>

.saldo {
  font-size: 1.3em;
  position: absolute;
  top: 95px;
  right: 10px;
}

.apuesta{
  font-size: 1.3em;
  color: white;
}

.play-button, .hit-button, .stand-button {
  font-size: 1.5em;
  background-color: #242524; /* Green background */
  color: white; /* White text */
  border: none; /* Remove border */
  padding: 15px 32px; /* Some padding */
  text-align: center; /* Centered text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display inline-block */
  font-size: 16px; /* Change text size */
  margin: 4px 10px; /* Some margin */
  cursor: pointer; /* Mouse pointer on hover */
  border-radius: 12px; /* Rounded corners */
  transition-duration: 0.4s; /* Transition effect */
}

.alt-button {
  background-color: rgba(50, 48, 48, 0.82);
  color: white;
  border-radius: 20px;
  height: 60px;
  width: 60px;
  margin: 4px 10px;
}

.play-button:hover, .hit-button:hover {
  background-color: #45a049; /* Green background on hover */
}

.stand-button:hover {
  background-color: #f44336; /* Red background on hover */
}

.chip-button {
  border-radius: 50%; /* Make the buttons round */
  width: 75px; /* Set a fixed width */
  height: 75px; /* Set a fixed height */
  color: white; /* White text */
  border: 3px solid white; /* Remove border */
  text-align: center; /* Centered text */
  font-size: 16px; /* Change text size */
  cursor: pointer; /* Mouse pointer on hover */
  transition-duration: 0.4s; /* Transition effect */
  margin: 4px 10px; /* Some margin */
}

.chip-100 {
  background-color: #4CAF50; /* Green background */
}

.chip-500 {
  background-color: #2196F3; /* Blue background */
}

.chip-1000 {
  background-color: #F44336; /* Red background */
}

.chip-button:hover {
  transform: scale(1.1); /* Enlarge the chip on hover */
}

</style>