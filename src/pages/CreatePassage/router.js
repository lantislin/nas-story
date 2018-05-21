import component from './CreatePassage.vue';

let router = [
  {
    path: '/CreatePassage/:args',
    name: 'CreatePassage',
    component: component,
    meta: { 
      keepAlive: true // 需要被缓存
    }
  }
]

export default router;