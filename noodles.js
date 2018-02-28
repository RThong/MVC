Mock.mock('/books/1', {
  id: 1, 
  name: 'JavaScript高级程序设计', 
  number: 2
})

let model = {
  data: {
    id: null,
    name: '',
    number: 0
  },
  fetch(id){
    return axios.get(`/books/${id}`).then((res)=>{
      this.data = res.data;
    })
  },
  save(newData){
    let id = this.data.id;
    return axios.put(`/books/${id}`, newData).then((res)=>{
      this.data = res.data;
    })
  }
}

let view = {
  el: '#app',
  template: `
    <div>
      书名：《__name__》,
      数量：<span id="number">__number__</span>
    </div>
    <div class="actions">
      <button id="addOne">加1</button>
      <button id="minusOne">减1</button>
      <button id="square">平方</button>
      <button id="cube">立方</button>
      <button id="zero">归零</button>
    </div>
  `,
  render({name, number}){
    let htmlStr = this.template.replace('__name__', name)
                            .replace('__number__', number);
    $(this.el).html(htmlStr);
  }
}

let controller = {
  init({model, view}){
    this.model = model;
    this.view = view;
    // this.bindEvents();
    model.fetch(1).then(()=>{
      this.view.render(this.model.data);
      this.bindEvents();
    })
  },
  bindEvents(){
    //加1
    $('#addOne').on('click', ()=>{
      console.log(1)
      $number = $('#number');
      let newData = parseInt($number.text())+1;
      model.save(newData).then(()=>{
        $number.text(newData);
      })
    })
    //减1
    $('#minusOne').on('click', ()=>{
      $number = $('#number');
      let newData = parseInt($number.text())-1;
      model.save(newData).then(()=>{
        $number.text(newData);
      })
    })
    //平方
    $('#square').on('click', ()=>{
      $number = $('#number');
      let oldResult = parseInt($number.text())
      let newResult = Math.pow(oldResult, 2);
      model.save(newResult).then(()=>{
        $number.text(newResult);
      })
    })
    //立方
    $('#cube').on('click', ()=>{
      $number = $('#number');
      let oldResult = parseInt($number.text())
      let newResult = Math.pow(oldResult, 3);
      model.save(newResult).then(()=>{
        $number.text(newResult);
      })
    })
    //减1
    $('#zero').on('click', ()=>{
      $number = $('#number');
      let newData = 0;
      model.save(newData).then(()=>{
        $number.text(newData);
      })
    })
  }
}
controller.init({model, view})





