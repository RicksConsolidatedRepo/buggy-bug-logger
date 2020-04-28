<template>
  <div class="container-fluid card col-12 mr-1 border-0 rounded-lg">
    <div v-if="!editing">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <h6 class="col-12 p-0 mr-auto ml-4 mt-1 mb-1 text-info">{{profile.name}}</h6>
            <h6 class="col-7 p-0 mr-auto ml-4 mt-1 mb-1 text-info">{{noteData.title}}</h6>
            <div class="col-1 ml-auto mr-4 text-right">
              <button class="btn btn-sm" @click="deleteNote()" v-if="bug.closed == false">
                <i class="fas fa-trash-alt text-danger"></i>
              </button>
              <div v-else></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "note",
    props: ["noteData"],
    data() {
      return {
        editing: false
      };
    },
    computed: {
      profile() {
        return this.$store.state.profile;
      },
      bug() {
        return this.$store.state.activeBug
      }
    },
    methods: {
      deleteNote() {
        if (confirm("are you sure you want to delete this note?")) {
          this.$store.dispatch("deleteNote", this.noteData);
        }
      },
      editNote() {
        this.$store.dispatch("editNote", this.noteData);
        this.editing = false;
      }
    },
    components: {}
  };
</script>


<style scoped>
</style>