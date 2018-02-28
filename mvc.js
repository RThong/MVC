class EventHub {
  constructor(){
    this.eventsList = {};
  }
  //绑定事件
  on(eventName, callback){
    if(!this.eventsList[eventName]){
      this.eventsList[eventName] = [];
    }
    this.eventsList[eventName].push(callback);
  }
  //触发事件
  trigger(eventName, ...rest){
    this.eventsList[eventName].map((fn)=>{
      fn.apply(null,rest);
    })
  }
}
class Model extends EventHub{
  constructor({resource, data}){
    super();
    this.resource = resource;
    this.data = data;
  }
  fetch(id){
    return axios.get(`/${this.resource}/${id}`).then((res)=>{
      this.data = res.data;
      this.trigger('updated');//变更数据就触发事件
    })
  }
  save(newData){
    let id = this.data.id;
    return axios.put(`/${this.resource}/${id}`, newData).then((res)=>{
      this.data.number = newData;
      this.trigger('updated');
    })
  }
};
class View {
  constructor({el,template}){
    this.$el = $(el),
    this.template = template;
  }
  render(data){
    let htmlStr = this.template;
    for(let key in data){
      htmlStr = htmlStr.replace(`__${key}__`, data[key]);
    }
    this.$el.html(htmlStr);
  }
};
class Controller {
  constructor({model,view,events,afterInit,...rest}){
    this.model = model;
    this.view = view;
    this.events = events;
    Object.assign(this, rest);
    this.init();
    // afterInit.bind(this)()
    afterInit.call(this);
  }
  init(){
    this.bindEvents();
    this.model.on('updated', ()=>{
      this.view.render(this.model.data);
    })
    this.view.render(this.model.data);
  }
  bindEvents(){
    this.events.map((event)=>{
      this.view.$el.on(event.eventType, event.selector, this[event.fn].bind(this))//动态绑定
    })
  }
};
export {Model,View,Controller};