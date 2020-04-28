<template>
  <div class="pt-5 bugs bg-primary text-center">
    <h1 class="text-light">Here are your bugs</h1>
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editor">Create New Bug</button>
    <div class="modal fade" id="editor" tabindex="-1" role="dialog" aria-labelledby="editorLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form @submit="addBug()">
            <div class="modal-header">
              <h5 class="modal-title" id="editorLabel">

                <div class="col-12 input-group text-center m-auto">
                  <input type="text" class="form-control" placeholder="Bug" v-model="newBug.title" required />
                </div>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control" placeholder="Descriptive the bug" v-model="newBug.description" />
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Create Bug</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="card-deck container-fluid mt-3">

      <div class="card">

        <Bug v-for="bug in bugs" :bugData="bug" :key="bug.id"></Bug>

      </div>

    </div>
  </div>
</template>

<script>
  import Bug from "../components/Bug";
  export default {
    name: "bugs",

    mounted() {
      this.$store.dispatch("getBugs");
    },
    created() {
      this.$store.dispatch("getBugs");
    },
    data() {
      return {
        newBug: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      bugs() {
        return this.$store.state.bugs;
      },
      profile() {
        return this.$store.state.profile
      }
    },
    methods: {
      addBug() {
        this.$store.dispatch("addBug", this.newBug);
        this.newBug = { title: "", description: "" };
        $('#editor').modal('hide');
      }
    },
    components: {
      Bug
    }
  };
</script>