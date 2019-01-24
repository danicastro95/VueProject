<template>
  <div>
    <li>{{ note.title }}</li>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: ["note"]
};
</script>