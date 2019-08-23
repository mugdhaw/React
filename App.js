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

    onSearchField(e) {
        // e is a synthetic event
        this.setState({searchTerm: e.target.value });
    }
    render () {
      var helloWorld = 'Test 1234';
      // Object initialization in Ec5
      const name = 'Mugdha';
      const user = {
          firstName: 'Mugdha',
          lastName: 'Wadhokar'
      }
        // ES5
       // var firstname = user.firstName;
       // var lastname = user.lastName;

        // ES6
        const {firstName, lastName} = user;
        console.log(firstName + ' ' + lastName);
        const {list, searchTerm} = this.state;

        return (
           <div className="App">
               <Search
                   value={searchTerm}
                   onChange = {this.onSearchField}>
                   Search:
               </Search>
               <List
                   searchValue={searchTerm}
                   onDismiss={this.onDismiss}
                   list={list}
               />
             <h2> {helloWorld} </h2>
           </div>
      );
    }
}

// Converted class component to functional component as there is no state update required in this component , same can be done with List but for e.f purpose it is keep in class state
function Search (props) {
    // we can write our code here if any logic
    const {value, onChange, children} = props;
    return (
        <form>
            {children} <input type="text" value = {value} onChange={onChange}/>
        </form>
    );
}

class List extends Component {
    render () {
        const {searchValue, onDismiss, list} = this.props;
        return (
            <div>
                {list.filter(getSearchValue(searchValue)).map(item =>
                    <div key={item.objectID}>
                        <span> <a href={item.url}>{item.title}</a> </span>
                        <span>{item.points}</span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>
                            <button type="button" onClick={() => onDismiss(item.objectID)}> Dismiss </button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}
export default App;
