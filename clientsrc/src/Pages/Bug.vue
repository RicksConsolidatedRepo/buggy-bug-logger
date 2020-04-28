<template>
  <div class="board container-fluid bg-dimg">
    <div class="row">
      <div class="mt-2 card align-items-center mx-auto">
        <div class="card">
          <h4 class="text-danger text-center" v-if="bug.closed">Closed
            <p>No further work allowed</p>
          </h4>
          <h4 class="text-success" v-else>Open</h4>
        </div>
        <div class="card" v-if="!edit">
          <div class="text-primary mx-auto">
            <p class="text-info">Bug</p>
          </div>
          <h4 class="text-primary">
            {{bug.title}}
            <button class="btn btn-sm" @click="edit = true" v-if="bug.closed == false">
              <i class="fas fa-pencil-alt text"></i>
            </button>
          </h4>
        </div>
        <div v-else>
          <form @submit.prevent="editBug()">
            <input type="text" v-model="bug.title" />
            <button class="btn text-warning">submit</button>
          </form>
        </div>
        <p class="text-primary mx-auto">
          <span class="text-info">Created By</span>
        </p>
        <h4>{{profile.name}}</h4>
        <div class="card">
          <div v-if="!editing">
            <h5 class="px-2">{{bug.description}}</h5>
            <button class="btn btn-sm" @click="editing = true" v-if="bug.closed == false">
              <i class="fas fa-pencil-alt"></i>
            </button>
          </div>
          <div v-else>
            <form @submit.prevent="editBug()">
              <input type="text" v-model="bug.description" />
              <button class="btn text-warning">submit</button>
            </form>
          </div>
        </div>
        <div class="card">
          <div class="col-12">
            <div id="card-display" class="card border-1 bg-transparent text-light">
              <note v-for="note in notes" :noteData="note" :key="note._id"></note>
            </div>
          </div>
        </div>
        <div class="pd-3" v-if="bug.closed == false">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editor">Add
            Note</button>
          <button class="btn btn-danger" @click="closeBug()">Close Bug</button>
          <div class="modal fade" id="editor" tabindex="-1" role="dialog" aria-labelledby="editorLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <form @submit.prevent="addNewNote()">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editorLabel">
                      <h6 class="text-center mx-auto">Created by {{ profile.name }}</h6>
                      <div class="col-12 input-group text-center m-auto">
                        <input type="text" class="form-control" placeholder="Add note..." v-model="newNote.title"
                          required />
                      </div>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Create Note</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>


<script>
  import Note from "../components/Note";
  export default {
    name: "bug",
    props: ["bugData"],

    data() {
      return {
        newNote: {},
        editing: false,
        edit: false,
        closed: false
      };
    },
    mounted() {
      this.$store.dispatch("getProfile");
      this.$store.dispatch("getBug", this.$route.params.bugId);
      this.$store.dispatch("getNoteByBugId", this.$route.params.bugId);
    },
    computed: {
      bug() {
        return this.$store.state.activeBug;
      },
      profile() {
        return this.$store.state.profile;
      },
      notes() {
        return this.$store.state.notes;
      }
    },
    methods: {
      addNewNote() {
        this.newNote.bugId = this.$route.params.bugId;
        this.newNote.creatorEmail = this.bug.creatorEmail;
        console.log("addNewNote", this.newNote.creatorEmail);
        this.$store.dispatch("addNewNote", this.newNote);
        this.newNote = {};
        $("#editor").modal("hide");
      },
      closeBug() {
        if (confirm("Are you sure you want to close this task? No further work will be allowed.")) {
          this.bug.closed = true;
          this.$store.dispatch("editBug", this.bug);
        }
      },
      editBug() {
        this.$store.dispatch("editBug", this.bug);
        this.editing = false;
        this.edit = false;
      }
    },
    components: {
      Note
    }
  };
</script>


<style scoped>
</style>