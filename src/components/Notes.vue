<template>
  <div>
    <input type="text" @keyup.enter="addNote">
    <div id="list">
      <ul>
        <li v-for="(note, index) in notes" :key="index">{{ note.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notes",
  data() {
    return {
      notes: []
    };
  },
  methods: {
    addNote: function(event) {
      this.notes.push({title: event.target.value});
      event.target.value = '';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
