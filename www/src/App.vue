<template>
  <v-app id="app" dark toolbar>
    <v-navigation-drawer v-if="loggedIn" temporary v-model="drawer" dark overflow fixed>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="http://www.ala-access.com/s/wp-content/uploads/2016/01/analyst-placeholder-avatar.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Current User</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <div v-for="item in items" :key="item.title">
          <router-link :to="item.routerLink">
            <v-list-tile @click="" class="no-underline">
              <v-list-tile-action>
                <v-icon class="no-underline">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="toolbar-main elevation-8">
      <v-toolbar-side-icon v-if="loggedIn" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><strong>plaü</strong></v-toolbar-title><i class="material-icons">ac_unit</i>
    </v-toolbar>
    <main>
      <v-flex xs12>



        <router-view></router-view>



      </v-flex>
    </main>
  </v-app>
</template>

<script>
  import Profile from './components/Profile'
  import Settings from './components/Settings'

  export default {
    components: {
      Profile,
      Settings
    },
    mounted() {
      let street = this.$children[0].$children.find(c => c.$el.id == 'street');
      this.$store.dispatch('authenticate', { cb: street.initMap })
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn
      }
    },
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: true,
        items: [
          { icon: 'person_pin', title: 'Me', routerLink: '/' },
          { icon: 'place', title: 'Street', routerLink: '/street' },
          { icon: 'ac_unit', title: 'Settings', routerLink: '/settings' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
      }
    }
  }

</script>
<style>
  * {
    text-decoration: none !important;
  }

  * strong {
    font-weight: 700 !important;
    color: #1976d2;
  }

  .toolbar-main {
    background: rgba(0, 0, 0, 0) !important;
  }

  #app {
    background-position: fixed !important;
    background-size: cover !important;
    overflow-y: scroll !important;
    -webkit-scrollbar-width: 0;
  }

  #app::-webkit-scrollbar {
    display: none;
  }
</style>

<style lang="stylus">
  @import './stylus/main'
</style>