import React, { Component } from 'react';
import './App.css';


const listArray = [ { title: 'React', url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 1, objectID: 0, }, { title: 'Redux', url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2, points: 5, objectID: 1, }, ];


function getSearchValue(searchTerm) {
    return function (item) {
        // ES5 function
        // return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;

        // ES6 function
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
           list: listArray,
            searchTerm: '',
        };
        // this is the class instance , in order to define function as class method bind it in constructor
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchField = this.onSearchField.bind(this);
    }

    // This is EC6 definatio of function
    onDismiss(id) {
        console.log('onDismiss', id);
        function isNotId(item) {
            return item.objectID !== id;
        }
        const updatedList = this.state.list.filter(isNotId);
        this.setState({ list: updatedList });
    }

    onSearchField(event) {
        this.setState({searchTerm: event.target.value });
    }
    render () {
      var helloWorld = 'Test 1234';
      // Object initialization in Ec5
      const name = 'Mugdha';
      const user = {
          name: name,
      }
      return (
           <div className="App">
               <form>
                   <input type="text" onChange={this.onSearchField}/>
               </form>
               {this.state.list.filter(getSearchValue(this.state.searchTerm)).map(item => {
                  return (
                      <div key={item.objectID}>
                          <span> <a href={item.url}>{item.title}</a> </span>
                          <span>{item.points}</span>
                          <span>{item.author}</span>
                          <span>{item.num_comments}</span>
                          <span>
                              <button type="button" onClick={() => this.onDismiss(item.objectID)}> Dismiss </button>
                          </span>
                      </div>
                  );
               })}
             <h2> {helloWorld} </h2>
           </div>
      );
    }
}

export default App;
