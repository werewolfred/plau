<template>
  <div id="settings">
    
  </div>
</template>
<script>
  export default {
    name: 'settings',
    data() {
      return {
        query: ''
      }
    },
    computed: {
      results() {
        return Object.freeze(this.$store.state.results)
        console.log(Object.Freeze(this.$store.state.results))
      },
      resultImgUrl() {
        return this.$store.state.resultImgUrl
        console.log(this.$store.state.resultImgUrl)
      }
    },
    methods: {
      searchDrinks() {
        this.$store.dispatch('clearResults');
        this.$store.dispatch('search', this.query.replace(/\s+/g, '-').toLowerCase());
      },
      addToMyDrinks(drink) {
        var user = this.$store.state.activeUser;
        user.drinks.push(drink)
        this.$store.dispatch("updateUser", user);
      }
    },
  }

</script>
<style>
  /* .result-display {
    height: 50vh;
    overflow: hidden;
    overflow-y: scroll !important;
    -webkit-scrollbar-width: 0px;
  } */

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }

    50% {
      opacity: 1;
    }
  }

  .zoomIn {
    animation-name: zoomIn;
    animation-duration: 500ms;
  }
</style>