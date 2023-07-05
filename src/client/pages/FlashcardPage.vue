
<template>
  <div>
    <h1>Welcome to the New Page!</h1>
    <p>{{ message }}</p>
    <button @click="updateMessage">Update Message</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            message: "Initial message"
        };
    },
    methods: {
        updateMessage() {
            this.message = "Updated message";
        }
    }
};
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
