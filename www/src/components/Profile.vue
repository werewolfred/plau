<template>
  <div class="profile">
    <v-layout row wrap>
      <v-flex v-if="loggedIn" xs12 sm5>

        <v-card dark class="mb-3 elevation-24">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media height="30vh" contain>
                  <v-avatar size="125">
                    <img src="http://www.ala-access.com/s/wp-content/uploads/2016/01/analyst-placeholder-avatar.png" alt="Profile Pic">
                  </v-avatar>
                </v-card-media>
              </v-flex>
              <v-flex xs7>
                <div>
                  <div class="headline blue--text text--darken-2"><strong>{{ activeUser.username }}</strong></div>
                  <div>{{ activeUser.firstname }} {{ activeUser.lastname }}</div>
                  <v-divider></v-divider>
                </div>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
            </v-layout>
            <v-divider></v-divider>
          </v-container>
          <v-btn flat small @click.prevent="logUserOut()">Log Out</v-btn>
        </v-card>


      </v-flex>


      <v-flex v-if="!loggedIn" xs12 sm6 offset-sm3>
        <v-switch color="blue darken-2" label="Log In/Register" v-model="showRegister"></v-switch>


        <form v-if="!showRegister">
          <h3>log in to <strong>plaü</strong></h3>
          <v-text-field required type="text" placeholder="Username" v-model="accountUser.username"></v-text-field>
          <v-text-field required type="password" placeholder="Password" v-model="accountUser.password"></v-text-field>
          <v-btn class="blue darken-2" flat type="submit" @click="logUserIn()">Log Me In</v-btn>
        </form>


        <form v-if="showRegister">
          <!-- REGISTER -->
          <h3>join <strong>plaü</strong></h3>
          <v-divider></v-divider>
          <h5>username, password, the basic stuff...</h5>
          <v-text-field required type="text" placeholder="Username" v-model="newUser.username"></v-text-field>
          <v-text-field required type="text" placeholder="email" v-model="newUser.email"></v-text-field>
          <v-text-field required type="password" placeholder="Password" v-model="newUser.password"></v-text-field>
          <v-text-field required type="password" placeholder="Confirm Password" v-model="confirmPassword"></v-text-field>
          <v-divider></v-divider>
          <h5>next, tell us about you...</h5>
          <v-text-field required type="text" placeholder="First Name" v-model="newUser.firstname"></v-text-field>
          <v-text-field required type="text" placeholder="Last Name" v-model="newUser.lastname"></v-text-field>
          <v-select required v-bind:items="genders" v-model="newUser.gender" label="Gender" single-line bottom></v-select>
          <!-- DATE OF BIRTH PICKER -->
          <v-flex xs12 sm6>
            <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40"
              max-width="290px">
              <v-text-field required slot="activator" v-model="newUser.dob" placeholder="Date of Birth"></v-text-field>
              <v-date-picker v-model="newUser.dob" no-title scrollable actions>
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <!-- END DOB PICKER -->
          <v-divider></v-divider>
          <h5>the important stuff...</h5>
          <v-text-field required type="text" placeholder="Street Address" v-model="newUser.streetAddress"></v-text-field>
          <v-text-field required type="text" placeholder="City" v-model="newUser.city"></v-text-field>
          <v-select required v-bind:items="continentalStates" v-model="newUser.continentalState" label="State" single-line bottom></v-select>
          <v-text-field required type="text" placeholder="ZIP" v-model="newUser.zipCode"></v-text-field>
          <v-btn class="blue darken-2" flat type="submit" @click="registerNewUser()">Register Me</v-btn>
        </form>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'profile',
    mounted() {
      // this.$store.dispatch('authenticate')
      console.log(this.currentDate)
    },
    data() {
      return {
        msg: 'Profile Goes Here',
        showRegister: false,
        menu: false,
        modal: false,
        toggle: true,
        confirmPassword: '',
        genders: ['Male', 'Female'],
        continentalStates: ["Alaska",
          "Alabama",
          "Arkansas",
          "American Samoa",
          "Arizona",
          "California",
          "Colorado",
          "Connecticut",
          "District of Columbia",
          "Delaware",
          "Florida",
          "Georgia",
          "Guam",
          "Hawaii",
          "Iowa",
          "Idaho",
          "Illinois",
          "Indiana",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Massachusetts",
          "Maryland",
          "Maine",
          "Michigan",
          "Minnesota",
          "Missouri",
          "Mississippi",
          "Montana",
          "North Carolina",
          " North Dakota",
          "Nebraska",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "Nevada",
          "New York",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Puerto Rico",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Virginia",
          "Virgin Islands",
          "Vermont",
          "Washington",
          "Wisconsin",
          "West Virginia",
          "Wyoming"],
        accountUser: {
          username: '',
          password: ''
        },
        newUser: {
          firstname: '',
          lastname: '',
          dob: '',
          gender: '',
          city: '',
          continentalState: '',
          zipCode: '',
          username: '',
          email: '',
          password: '',
          streetAddress: '',
        },
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn;
      },
      currentTime() {
        var time = new Date().getTime();
        return time;
      },
      activeUser() {
        return this.$store.state.activeUser;
      },
      currentDate() {
        Date.prototype.yyyymmdd = function () {
          var mm = this.getMonth() + 1; // getMonth() is zero-based
          var dd = this.getDate();

          return [this.getFullYear(),
          (mm > 9 ? '' : '0') + mm,
          (dd > 9 ? '' : '0') + dd
          ].join('');
        };

        var date = new Date();
        return date.yyyymmdd();
      }
    },
    methods: {

      logUserOut() {
        this.$store.dispatch('logout', this.accountUser)
      },

      logUserIn() {
        var user = { username: this.accountUser.username, password: this.accountUser.password }
        this.$store.dispatch('login', user).then(() => {
          this.resetFields()
        })
      },

      registerNewUser() {
        if (this.newUser.password === this.confirmPassword) {
          this.$store.dispatch('register', this.newUser).then(() => {
            this.resetFields()
          })
        } else {
          alert("Passwords do not match, please try again.")
          resetFields();
        }
      },

      resetFields() {
        this.newUser.firstname = ''
        this.newUser.lastname = ''
        this.newUser.dob = ''
        this.newUser.gender = ''
        this.newUser.city = ''
        this.newUser.continentalState = ''
        this.newUser.zipCode = ''
        this.newUser.username = ''
        this.newUser.email = ''
        this.newUser.password = ''
        this.newUser.agreement = false
        this.confirmPassword = ''
        this.accountUser.name = ''
        this.accountUser.password = ''
      },
      drinkOne(drink) {
        var user = this.$store.state.activeUser;
        var now = new Date().getTime();
        drink.timeConsumed = now
        user.isDrinking = drink;
        user.drunkLevel++
        this.$store.dispatch("updateUser", user);
      },
      removeDrink(index) {
        var user = this.$store.state.activeUser;
        user.drinks.splice(index, 1);
        this.$store.dispatch("updateUser", user);
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .drinks-list {
    height: 10vh;
  }
</style>