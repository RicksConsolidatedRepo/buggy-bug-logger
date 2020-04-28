<template>
  <div class="row border-0">
    <div class="col-4 mt-2">
      <form type="button" @click="selectBug()">
        <div class="card align-items-center">
          <div class="card col-12">
            <div class="card" v-if="bugData.closed"><img class="gotb img-fluid bz mr-3" alt="Closed bug"
                src="../assets/closed.png"></div>
            <div class="card" v-else><img class="gotb img-fluid bz mr-3" alt="Buggy Bug logo"
                src="../assets/buggy-bug.jpg"></div>
          </div>
          <div class="card-title bg-secondary">
            <div class="card-text text-dark">Bug</div>
            <h4 class="text-primary">
              {{bugData.title}}
            </h4>
          </div>
          <div class="card col-12">
            <div class="card-text text-dark">Created By</div>
            <p class="text-info">{{bugData.creatorEmail}}</p>
          </div>
          <div class="card col-12 bg-secondary">
            <div class="card-text text-dark">Last change</div>
            <h6 class="text-info">{{bugData.updatedAt}}</h6>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bug",
    props: ["bugData"],

    data() {
      return {};
    },
    computed: {},
    methods: {
      selectBug() {
        this.$store.commit("setActiveBug", {});
        this.$router.push({
          name: "bug",
          params: { bugId: this.bugData.id }
        });
      }
    }
  };
</script>

<style scoped>
</style>