<template>
  <div class="player-hand">
    <div class="cards">
      <div v-for="(card, index) in props.playerHand" :key="card._id" >
          <Card :suit="card.palo" :value="card.figura" :index="index" ></Card>
      </div>
    </div>
    <h2 v-if="puntajeJugador!=0" style="text-align: center">{{props.puntajeJugador}}</h2>

  </div>

</template>
<script setup>
import Card from './Card.vue';
const props = defineProps(['playerHand', 'puntajeJugador']);


</script>
<style scoped>

.cards {
  display: flex;
  gap: 10px;
}



</style>