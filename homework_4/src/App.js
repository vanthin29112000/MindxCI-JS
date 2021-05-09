import React from "react"
import './App.css';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      undone : ["Item 1","Item 2","Item 3","Item 4","Item 5"],
      done : [],
    };
  }
  renderUndoneList = ()=>{
    console.log(this.state.undone);
    return this.state.undone.map((Element,index)=>{
      return <li className = "selection" onClick = {()=>this.set_DoneList(Element)}>{Element}</li>
    });
  }
  
  renderDoneList = ()=>{
    console.log(this.state.done);
    return this.state.done.map((Element1,index)=>{
      return <li className = "selection selection-done" onClick = {()=>this.set_UnDoneList(Element1)}>{Element1}</li>
    });
  }

  set_DoneList = (option)=>{
    let temp = 0;
    for(let element of this.state.undone)
    {
      if(element === option)
      {
        this.state.undone.splice(temp,1);
        this.state.done.push(option);
        this.setState({
          undone: this.state.undone,
          done : this.state.done,
        });
      }
      temp ++;
    }
  }

  set_UnDoneList = (option)=>{
    let temp = 0;
    for(let element of this.state.done)
    {
      if(element === option)
      {
        this.state.done.splice(temp,1);
        this.state.undone.push(option);
        this.setState({
          undone: this.state.undone,
          done : this.state.done,
        });
      }
      temp ++;
    }
  }

  render(){
    return (
      <div className= "header">
        <div className="toDoList">
          <div className= "title-toDoList">
            <h2>Todo App</h2>
          </div>
          <div className = "box-toDoList">
            <div className= "undone">
              <p className= "title">TODO</p>
              <ul id = "list-todo" className="list-option">{this.renderUndoneList()}</ul>
            </div>
            <div className= "done">
              <p className= "title color-complete">COMPLETE</p>
              <ul id ="list-complete" className="list-option">{this.renderDoneList()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
} 

export default App;
