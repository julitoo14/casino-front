<script setup>
import BlackjackGame from "../components/BlackjackGame.vue";
</script>

<template>
    <div class="game-screen">
      <BlackjackGame/>
    </div>
</template>

<style scoped>
.game-screen{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #025718;
  height: calc(100vh - 90px - 60px);

  overflow: auto;
  margin-top: 90px;
}

</style>