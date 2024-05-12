<script setup>
import { computed } from 'vue';

const props = defineProps(['suit', 'value']);

const cardColor = computed(() => {
  return props.suit === 'hearts' || props.suit === 'diamonds' ? 'red' : 'black';
});

const suitSymbol = computed(() => {
  switch (props.suit) {
    case 'hearts': return '&hearts;';
    case 'diamonds': return '&diams;';
    case 'clubs': return '&clubs;';
    case 'spades': return '&spades;';
    default: return '';
  }
});
</script>

<template>
  <div class="card" :style="{ color: cardColor }">
    <div class="card-value">{{ value }}</div>
    <div class="card-suit" v-html="suitSymbol"></div>
    <div class="card-value card-value-bottom">{{ value }}</div>
  </div>
</template>

<style scoped>
.card {
  width: 120px;
  height: 200px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  position: relative;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
}

.card-value {
  position: absolute;
  font-size: 40px;
  font-weight: bold;
  top: 5px;
  left: 5px;
}

.card-suit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 75px;
}

.card-value-bottom {
  bottom: 5px;
  right: 5px;
  transform: rotate(180deg);
}
</style>