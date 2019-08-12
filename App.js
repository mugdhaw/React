import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const listArray = [ { title: 'React', url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 9, objectID: 0, }, { title: 'Redux', url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2, points: 5, objectID: 1, }, ];


class App extends Component {
  render () {
      var helloWorld = 'Test 1234';
   return (
       <div className="App">
           {listArray.map(function(item){
              return (
                  <div key={item.objectID}>
                      <span> <a href={item.url}>{item.title}</a> </span>
                      <span>{item.points}</span>
                  </div>
              );
           })}
         <h2> {helloWorld} </h2>
       </div>
   );
  }
}

export default App;