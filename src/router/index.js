import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'
import home from '@/components/home'
import mainView from '@/components/mainView'
import login from '@/components/login'
import userInfo from '@/components/userInfo'
import forum from '@/components/forum'
import foot from '@/components/foot'
import videoPlayer from '@/components/videoPlayer'
import video from '@/components/video'
import showImage from '@/components/showImage'
import demo from '@/components/demo'




import image from '@/components/image'
import smheader from '@/components/cpt/smheader'
import userBaseInfo from '@/components/cpt/userBaseInfo'
import changeUserPhoto from '@/components/cpt/changeUserPhoto'
import registered from '@/components/registered'
import changePass from '@/components/changePass'





Vue.use(Router)

export default new Router({
  mode: "hash",
  routes: [
    {
      path: '/',
      components: {
        default: mainView,
        header: header,
        foot: foot
      },
      children: [
        {
          path: '/',
          name: "home",
          component: home
        },

        {
          path: '/forum',
          name: "forum",
          component: forum
        },
        {
          path: '/video',
          name: 'video',
          component: video
        },
        {
          path: '/image',
          name: image,
          component: image
        }
      ]
    },
    {
      path: '/login',
      name: "login",
      components: {
        header: smheader,
        default: login,
        foot: foot
      }
    },
    {
      path: '/registered',
      name: "registered",
      components: {
        header: smheader,
        default: registered,
        foot: foot
      }
    },
    {
      path: '/videoPlayer/:av',
      name: "videoPlayer",
      components: {
        header: smheader,
        default: videoPlayer,
        foot:foot
      }
    }, {
      path: '/changePass',
      name: "changePass",
      components: {
        header: smheader,
        default: changePass,
        foot: foot
      }
    },
    {
      path: '/userInfo/:userId',
      // name: "userInfo",
      components: {
        header: smheader,
        default: userInfo,
        foot: foot
      },
      children:[
        {
          path:'/',
          name:"userBaseInfo",
          component:userBaseInfo
        },
        {
          path:'/userInfo/:userId/changeUserPhoto',
          name:"changeUserPhoto",
          component:changeUserPhoto
        }
      ]
    },
    {
      path:'/showImage/:imgId',
      name:"showImage",
      components:{
        header:smheader,
        default:showImage,
        foot:foot
      }
    },
    {
      path:'/demo',
      name:"demo",
      components:{
        header:header,
        default:demo,
        foot:foot
      }
    }
  ]
})
