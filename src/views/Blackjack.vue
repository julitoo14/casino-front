<script setup>
import Card from "../components/Card.vue";
import { ref } from 'vue';

const croupierHand = ref([
  {id: 1, suit: 'hearts', value: '8'},
  {id: 2, suit: 'clubs', value: '2'},
]);

</script>

<template>
    <div class="game-screen">

      <div class="croupier-hand">
        <div v-for="card in croupierHand" :key="card.id">
          <Card :suit="card.suit" :value="card.value"></Card>
        </div>
      </div>

      <div class="player-hand">
        <Card suit="diamonds" value="K"></Card>
        <Card suit="hearts" value="A"></Card>
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

.player-hand, .croupier-hand{
  margin: 10px;
  display: flex;
  gap: 10px;
}



</style>