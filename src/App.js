import { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      query: "tags=front_page",
      searchResults: [],
    }
  }

  onChangeHandler = ({ target }) => {
    console.log(target.value);
    this.setState({
      query: target.value,
    })
  }

  // http://hn.algolia.com/api/v1/search?query=${this.state.query}}&tags=story

  componentDidMount() {
    fetch(`https://hn.algolia.com/api/v1/search?query=${this.state.query}&tags=story`)
      .then(res => {
        return res.json()
      }).then(data => {
        console.log(data)
        this.setState({
          searchResults: data.hits
        })
      })
  }

  componentWillUpdate(prevProps, prevState) {
    console.log(prevState);
    // if (!this.state.searchResults[0]?.objectID || !prevState.searchResults[0]?.objectID) return;

    if (this.state.query !== prevState.query) {
      console.log('they matchhhhhhhhhhhhhh')
      fetch(`https://hn.algolia.com/api/v1/search?query=${this.state.query}&tags=story`)
        .then(res => {
          return res.json()
        }).then(data => {
          console.log(data)
          this.setState({
            searchResults: data.hits
          })
        })
      return;
    }
    return;
  }

  render() {
    return (
      <div className="App">
        <header className="Search-header">
          <span>
            <img class="Logo-Image" alt="White H inside a white outlined square with an orange background" src="https://hn.algolia.com/packs/media/images/logo-hn-search-a822432b.png" />
            <span class="Logo-Label">
              Search
              <br />
              Hacker News
            </span>
          </span>
          <input class="Search-Bar" type="text" onChange={(e) => this.onChangeHandler(e)}></input>
        </header>
        <main>
          <ul>
            {this.state.searchResults.map((res, idx) => {
              return (
                <li key={idx}>
                  <a href={res.url} target='_blank' rel='noreferrer'>{res.title}{' '}</a>
                </li>
              )

            })}
          </ul>
        </main>
      </div>
    );
  }

}

export default App;
