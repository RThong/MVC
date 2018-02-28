import {Model,View,Controller} from './mvc.js'
Mock.mock('/books/1', {
  id: 1, 
  name: 'JavaScript高级程序设计', 
  number: 2
});

// function Model(resource, data){
//   this.resource = resource;
//   this.data = data;
// }
// Model.prototype.fetch = function(id){
//   return axios.get(`/${this.resource}/${id}`).then((res)=>{
//     this.data = res.data;
//   })
// };
// Model.prototype.save = function(newData){
//   let id = this.data.id;
//   return axios.put(`/${this.resource}/${id}`, newData).then((res)=>{
//     this.data.number = newData
//   })
// };
// class Model {
//   constructor({resource, data}){
//     this.resource = resource;
//     this.data = data;
//   }
//   fetch(id){
//     return axios.get(`/${this.resource}/${id}`).then((res)=>{
//       this.data = res.data;
//     })
//   }
//   save(newData){
//     let id = this.data.id;
//     return axios.put(`/${this.resource}/${id}`, newData).then((res)=>{
//       this.data.number = newData
//     })
//   }
// }
// class View {
//   constructor({el,template}){
//     this.$el = $(el),
//     this.template = template;
//   }
//   render(data){
//     let htmlStr = this.template;
//     for(let key in data){
//       htmlStr = htmlStr.replace(`__${key}__`, data[key]);
//     }
//     this.$el.html(htmlStr);
//   }
// }
// class Controller {
//   constructor({model,view,events,afterInit,...rest}){
//     this.model = model;
//     this.view = view;
//     this.events = events;
//     Object.assign(this, rest);
//     this.init();
//     // afterInit.bind(this)()
//     afterInit.call(this)
//   }
//   init(){
//     this.bindEvents()
//     this.view.render(this.model.data)
//   }
//   bindEvents(){
//     this.events.map((event)=>{
//       this.view.$el.on(event.eventType, event.selector, this[event.fn].bind(this))//动态绑定
//     })
//   }
// }

let model = new Model({
  resource: 'books', 
  data:{
    id: null,
    name: '',
    number: 0
  }
});
let view = new View({
  el: '#app',
  // data: {

  // },
  template: `
    <div>
      书名：《__name__》,
      数量：__number__
    </div>
    <div class="actions">
      <button id="addOne">加1</button>
      <button id="minusOne">减1</button>
      <button id="square">平方</button>
      <button id="cube">立方</button>
      <button id="zero">归零</button>
    </div>
  `
});
let controller = new Controller({
  model,
  view,
  events: [
    {eventType: 'click', selector: '#addOne', fn: 'addOne'},
    {eventType: 'click', selector: '#minusOne', fn: 'minusOne'},
    {eventType: 'click', selector: '#square', fn: 'square'},
    {eventType: 'click', selector: '#cube', fn: 'cube'},
    {eventType: 'click', selector: '#zero', fn: 'zero'}
  ],
  afterInit(){
    this.fetchData(1)
  },
  //加1
  addOne(){
    let newResult = this.model.data.number+1;
    this.updateData(newResult);  
  },
  //减1
  minusOne(){
    let newResult = this.model.data.number-1;
    this.updateData(newResult);
  },
  //平方
  square(){
    let newResult = Math.pow(this.model.data.number, 2);
    this.updateData(newResult);
  },
  //立方
  cube(){
    let newResult = Math.pow(this.model.data.number, 3);
    this.updateData(newResult);
  },
  //归零
  zero(){
    let newResult = 0;
    this.updateData(newResult);
  },
  fetchData(id){
    this.model.fetch(id);
  },
  updateData(newResult){
    this.model.save(newResult);
  }
});



