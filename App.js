import React, { Component } from 'react';
import './App.css';

// Sample List Data
const listArray = [ { title: 'React', url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 1, objectID: 0, }, { title: 'Redux', url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2, points: 5, objectID: 1, }, ];

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// ES6
//const url = '${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

// ES5
//var url = PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + DEFAULT_QUERY;
console.log('URL ::',url);


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
           //list: listArray,
	   result: '',
           searchTerm: DEFAULT_QUERY,
        };
        // this is the class instance , in order to define function as class method bind it in constructor
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchField = this.onSearchField.bind(this);
	this.setSearchResult = this.setSearchResult.bind(this);
    }

    setSearchResult (result) {
      this.setState({result});
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
        const {result, searchTerm} = this.state;
	
        return (
           <div className="App">
               <Search
                   value={searchTerm}
                   onChange = {this.onSearchField}>
                   Search:
               </Search>
		{ result 
                  ? <List
                    searchValue={searchTerm}
                    onDismiss={this.onDismiss}
                    list={result.hits}
                   />
                : null
		}
             <h2> {helloWorld} </h2>
           </div>
      );
    }

  componentDidMount() {

    const {result, searchTerm} = this.state;

    // Native fetch API
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
   .then(response => response.json())
   .then(result => this.setSearchResult(result))
   .catch(error => error);

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
