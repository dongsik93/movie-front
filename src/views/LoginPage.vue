<template>
  <div>
    <v-app id="inspire" style="font-family: 'Poor Story', cursive;">
        <v-parallax dark src="https://img1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/liveboard/h21/8c2be2ede24845dca9c4056cd5d70849.JPG" style="height:100%">
            <h3 style="margin-left:15px; font-family: 'Pacifico', cursive;">Recommand Movie</h3>
            <v-layout   justify-start >
                <v-container style="margin-left:0px;">
                        <v-flex style="margin-top:25px;">
                            <h1 class="mb-3" style="font-family: 'Poor Story', cursive; font-size:50px;">내가 추천하는</h1>
                        </v-flex>
                        <v-flex>
                            <h1 class="mb-3" style="font-family: 'Poor Story', cursive; font-size:50px;">영화 평점 사이트</h1>
                        </v-flex>
                        <v-flex>
                            <h3>Watch movie & Recommand  !</h3>
                        </v-flex>
                        <v-flex style="margin-top:25px;">
                            <v-dialog v-model="dialog" width="500">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="grey lighten-2" dark v-on="on" style="color:black">
                                        Login
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-toolbar cards >
                                        <v-card-title class="title font-weight-regular">Login</v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-btn icon v-model="dialog" @click="dialog = false">
                                            <v-icon>fas fa-times</v-icon>
                                        </v-btn>

                                    </v-toolbar>
                                    <v-form
                                    ref="form1"
                                    v-model="form1"
                                    class="pa-3 pt-4"
                                    lazy-validation
                                        >
                                        <v-card-text>
                                            <v-text-field
                                            v-model="loginUsername"
                                            label="User Name"
                                            color="deep-purple"
                                            required
                                            ></v-text-field>
                                        </v-card-text>

                                        <v-card-text>
                                            <v-text-field
                                            v-model="loginEmail"
                                            label="Email Address"
                                            color="deep-purple"
                                            required
                                            ></v-text-field>
                                        </v-card-text>
                                        <v-card-text>
                                            <v-text-field
                                            v-model="loginPassword"
                                            :counter="20"
                                            label="password"
                                            color="deep-purple"
                                            required
                                            type="password"
                                            @keyup.enter="login"
                                            ></v-text-field>
                                        </v-card-text>
                                    </v-form>
                                    <v-divider></v-divider>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="deep-purple" class="white--text" :disabled="!form1" depressed  @click="login">
                                            submit
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <SignUp></SignUp>
                          </v-flex>
                    </v-container>
            </v-layout>
        </v-parallax>
    </v-app>
    </div>
  </div>
</template>

<script>
import SignUp from '../components/SignUp'
import LoginService from '@/service/LoginService'
import store from '../store'
import GetData from '@/service/GetData'

export default {
  name: 'LoginPage',
  store,
  data: () =>({
    dialog : false,
    form1 : false,
    loginUsername :'data',
    loginPassword :'1',
    loginEmail  :'data@naver.com',
    token :'',
    movies:[{}],
    totalMovies:[{}],
  }),
  components: {
    SignUp,
  },
  methods :{

    login () {
        console.log("여기 111")
        const username = this.loginUsername;
        const password = this.loginPassword;
        const email = this.loginEmail;
        if (!username || !password ||  !email) {
            return false;
        }
        const res =  LoginService.PageLogin(username, password, email)
        res.then((res) => {
            if (res.status === 200) {
                  this.token = res.data.token
                  store.state.accessToken = this.token
                  store.state.user = this.username
                  const data = GetData.getData(this.token)
                  data.then( (r) => {
                    const mas = r.data
                    this.movies = mas.map(function(m){
                        const part = m.Participating * 1
                        const reple = eval(m.score_reples)
                        const genre = eval(m.genres)
                        const act_img = eval(m.actors_img)
                        const actor = eval(m.actors)
                        const actor_img = eval(m.actors_img)
                        const act_role = eval(m.actors_role)
                        const large_img = eval(m.large_image)
                        const score_reple_id = eval(m.score_reple_id)
                        const score_reple_like = eval(m.score_reple_like)
                        const currentItem = 'tab-기본정보'
                        return {...m, newScore:0,dialog:false,
                                    Participating:part,score_reples:reple,genres:genre,
                                    actors_img:act_img, actors_role:act_role,actors:actor,
                                    large_image:large_img,score_reple_id:score_reple_id, score_reple_like:score_reple_like,
                                    actors_img:actor_img, currentItem:currentItem,
                                    show1:false,show2:false}
                    })
                    store.state.movies = this.movies
                  })

                  const data2 = GetData.getTotalData(this.token)
                  data2.then( (r) => {
                    this.length = r.data.length
                    const mas = r.data
                    this.totalMovies = mas.map(function(m){
                        const part = m.Participating * 1
                        const reple = eval(m.score_reples)
                        const genre = eval(m.genres)
                        const act_img = eval(m.actors_img)
                        const actor = eval(m.actors)
                        const actor_img = eval(m.actors_img)
                        const act_role = eval(m.actors_role)
                        const large_img = eval(m.large_image)
                        const score_reple_id = eval(m.score_reple_id)
                        const score_reple_like = eval(m.score_reple_like)
                        const currentItem = 'tab-기본정보'
                        return {...m, newScore:0,dialog:false,
                                    Participating:part,score_reples:reple,genres:genre,
                                    actors_img:act_img, actors_role:act_role,actors:actor,
                                    large_image:large_img,score_reple_id:score_reple_id, score_reple_like:score_reple_like,
                                    actors_img:actor_img, currentItem:currentItem,
                                    show1:false,show2:false}
                    })
                    store.state.totalMovies = this.totalMovies
                  })
                  this.$router.push({
                    name:'Home',
                })
              }
        })

      },
    }
  }
</script>
