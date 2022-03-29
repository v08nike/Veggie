//直売所の最新情報を管理する
import firebase from '~/plugins/firebase'

const db = firebase.firestore()



const getDefaultState = () => ({
  posts: []
})

const state = () => ({
  posts: []
})

const mutations = { 
  SET_DIRECT_SALE_POSTS(state, docs){
   docs.forEach(doc => {
  　  state.posts.push(doc.data())
   });
   const posts = [...state.posts];
   posts.sort((a,b) => (b.createdAt > a.createdAt) ? 1 : ((a.createdAt > b.createdAt) ? -1 : 0))
   state.posts = posts
  },
  RESET_STATE_DIRECTSALEPOSTS(state){
    Object.assign(state, getDefaultState())
  },
}

const actions ={
  async getPostsByDirectSaleId({commit}, directSaleId){
    let postsRef = db.collection('direct_sale_posts')
    await postsRef.where("idDel", "==", directSaleId + 'false').onSnapshot(
      response => {
        commit('RESET_STATE_DIRECTSALEPOSTS')
        commit('SET_DIRECT_SALE_POSTS', response.docs)
      })
  },
}

const getters = {
  posts: state => state.posts,
}

const directSalePostsModule = {
  state,
  mutations,
  actions,
  getters
}

export default directSalePostsModule;