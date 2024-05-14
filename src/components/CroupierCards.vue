<template>
  <div class="croupier-hand">
    <div class="cards">
      <div v-for="(card, index) in props.croupierHand" :key="card._id">
        <Card v-if="props.croupierReveal || index === 0" :suit="card.palo" :value="card.figura"></Card>
        <img v-else src="/back.png" class="card-back" draggable="false">
      </div>
    </div>
    <h2 style="text-align: center" v-if="puntajeCroupier!=0 && props.croupierReveal">{{props.puntajeCroupier}}</h2>
  </div>
</template>
<script setup>
import Card from './Card.vue';
const props = defineProps(['croupierHand', 'croupierReveal', 'puntajeCroupier']);


</script>
<style scoped>

.card-back {
  width: 130px;
  height: 200px;
  background-color: #1f1f1f;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  animation: fadeIn 1s ease-in
}

@keyframes fadeIn {
  0% {opacity: 0; visibility: hidden}
  1% {visibility: visible}
  100% {opacity: 1; visibility: visible}
}


.cards {
  display: flex;
  gap: 10px;
}


</style>