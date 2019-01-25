<template>
  <div>
    <input type="text" @keyup.enter="addNote">
    <br>
    {{ completed }} tareas completadas de un total de {{ notes.length }} |
    <span
      class="removeCompleted"
      @click="deleteCompleted"
    >Borrar tareas completadas</span>
    <div id="list">
      <!-- List Item -->
      <transition-group name="list" tag="p">
        <div class="list-item" v-for="note in notes" :key="note.noteId">
          <!-- Notes Input -->
          <input type="checkbox" v-model="note.done" @change="updateLocalStorage()">

          <!-- Note content -->
          {{ note.title }}
          <!-- Delete button -->
          <input type="button" @click="deleteNote(note)" value="Borrar">

          <!-- Proridad -->
          <br>Prioridad:
          <!-- Radio Group -->
          <div class="radio-group" @change="updateLocalStorage()">
            <!-- Baja -->
            <input
              class="lowPr"
              type="radio"
              :id="'low' + note.noteId"
              :name="note.noteId"
              v-model="note.priority"
              v-bind:value="3"
            >
            <label :for="'low' + note.noteId">Baja</label>

            <!-- Media -->
            <input
              class="midPr"
              type="radio"
              :id="'mid' + note.noteId"
              :name="note.noteId"
              v-model="note.priority"
              v-bind:value="2"
            >
            <label :for="'mid' + note.noteId">Media</label>

            <!-- Alta -->
            <input
              class="highPr"
              type="radio"
              :id="'hi' + note.noteId"
              :name="note.noteId"
              v-model="note.priority"
              v-bind:value="1"
            >
            <label :for="'hi' + note.noteId">Alta</label>
          </div>
          A&ntilde;adida hace {{ note.time | moment("from", "now", true) }}
        </div>
      </transition-group>
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
    updateLocalStorage: function() {
      this.sortNotes();
      localStorage.removeItem("notes");
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    sortNotes() {
      this.notes.sort(function(a, b) {
        if (a.priority > b.priority) {
          return 1;
        }
        if (a.priority < b.priority) {
          return -1;
        }
        return 0;
      });
    },
    addNote: function(event) {
      let date = new Date();
      let note = {
        title: event.target.value,
        priority: 2,
        time: date.toISOString(),
        done: false,
        noteId: date.valueOf()
      };
      this.notes.unshift(note);
      event.target.value = "";
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    deleteNote: function(note) {
      let i = 0;
      this.notes.forEach(n => {
        if (note.noteId == n.noteId) {
          this.notes.splice(i, 1);
        }
        i++;
      });
      this.updateLocalStorage();
    },
    deleteCompleted: function() {
      let aux = this.notes.filter(function(note) {
        if (!note.done) {
          return note;
        }
      });
      this.notes = aux;
      this.updateLocalStorage();
    }
  },
  computed: {
    completed: function() {
      let list;
      list = this.notes.filter(function(note) {
        return note.done;
      });
      return list.length;
    },
    added: function(note) {
      return note.time;
    }
  },
  mounted() {
    var notes = JSON.parse(localStorage.getItem("notes"));
    if (notes) {
      this.notes = notes;
      this.sortNotes();
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

.removeCompleted:hover {
  cursor: pointer;
  text-decoration: underline;
}

.list-item {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-active {
  position: absolute;
}

@import url("https://fonts.googleapis.com/css?family=Roboto");
body {
  background: #332f35;
  font-family: roboto;
}
input[type="radio"] {
  position: absolute;
  visibility: hidden;
  display: none;
}
label {
  color: #9a929e;
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 20px;
}
input[type="radio"]:checked + label {
  color: #ccc8ce;
  background: #675f6b;
}
label + input[type="radio"] + label {
  border-left: solid 3px #675f6b;
}
.radio-group {
  border: solid 3px #675f6b;
  display: inline-block;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
