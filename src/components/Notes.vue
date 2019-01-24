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
      let note = {
        title: event.target.value,
        priority: 1,
        time: new Date().toDateString(),
        done: false
      };
      this.notes.push(note);
      event.target.value = "";
      localStorage.setItem("notes", JSON.stringify(this.notes));
    }
  }
};

Vue.component("button-counter", {
  data: function() {
    return {
      count: 0
    };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

var app = new Vue({
  el: "#app",
  data: {
    newTodoText: "",
    items: [
      {
        tarea: "Tarea 1",
        prioridad: "ALTA",
        fecha_creacion: new Date().getDate(),
        completada: false
      },
      {
        tarea: "Tarea 2",
        prioridad: "MEDIA",
        fecha_creacion: new Date().getDate(),
        completada: true
      }
    ]
  },
  methods: {
    addNewTodo: function() {
      nuevaTarea = {
        tarea: this.newTodoText,
        prioridad: "BAJA",
        fecha_creacion: new Date().getDate(),
        completada: false
      };
      this.items.push(nuevaTarea);
      this.newTodoText = "";
      localStorage.setItem("todos", JSON.stringify(this.items));
    }
  },
  computed: {
    completadas: function() {
      let list;
      list = this.items.filter(function(item) {
        return item.completada;
      });
      return list.length;
    }
  },
  mounted() {
    var items = JSON.parse(localStorage.getItem("todos"));
    if (items) {
      this.items = items;
    }
  }
});
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
