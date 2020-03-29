import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { Button } from 'reactstrap';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.webClient = axios.create({
      baseURL: 'http://localhost:8080/INTPDemo/webresources'
    })

    this.state = {
      webResponse: null,
      id: "",
      isbn: "",
      author: "",
      description: "",
      title: "",
      showGet: false,
      showPost: false,
      showPut: false,
      showDelete: false
    }
  }

  onClickGet = () => {
    this.setState({ showGet: true });
  }

  onClickPost = () => {
    this.setState({ showPost: true });
  }

  onClickPut = () => {
    this.setState({ showPut: true });
  }

  onClickDelete = () => {
    this.setState({ showDelete: true });
  }

  changeId = (value) => {
    this.setState({ id: value });
  }

  changeISBN = (value) => {
    this.setState({ isbn: value });
  }

  changeAuthor = (value) => {
    this.setState({ author: value });
  }

  changeDesc = (value) => {
    this.setState({ description: value });
  }

  changeTitle = (value) => {
    this.setState({ title: value });
  }

  get = () => {
    this.webClient.get(`/models.book/${this.state.id}`)
      .then((result) => {
        this.setState({ webResponse: result.data });
        this.setState({ showGet: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  post = () => {
    this.webClient.post('/models.book', {
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      title: this.state.title
    })
      .then((result) => {
        this.setState({ webResponse: result.data });
        this.setState({ showPost: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  put = () => {
    this.webClient.put((`/models.book/${this.state.isbn}`), {
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      title: this.state.title
    })
      .then((result) => {
        this.setState({ webResponse: result.data });
        this.setState({ showPut: false });
      }) .catch((error) => {
        console.log(error);
      });
  }

  delete = () => {
    this.webClient.delete(`/models.book/${this.state.id}`)
      .then((result) => {
        this.setState({ webResponse: result.data });
        this.setState({ showDelete: false });
      }) .catch((error) => {
        console.log(error);
      });
  }

  render() {

    return (
      <div className="App d-flex align-items-center">
        <h1>Book Inventory</h1>
        <div className="outerContainer" style={{ display: "flex" }}>
          <div className="leftBox" style={styles.leftBoxStyle}>
            <Button style={styles.buttonStyle} onClick={this.onClickGet}>GET</Button>
            {this.state.showGet ?
              <div className="input" >
                Enter ISBN of book:<input type="text" onChange={e => this.changeId(e.target.value)}></input>
                <button onClick={this.get}>Get Book Info</button>
              </div> : null}
            <Button style={styles.buttonStyle} onClick={this.onClickPost}>POST</Button>
            {this.state.showPost ?
              <div className="input">
                <div style={styles.leftInput}>Enter ISBN of book:</div><input type="text" onChange={e => this.changeISBN(e.target.value)}></input><br></br>
                <div style={styles.leftInput}>Enter author of book:</div><input type="text" onChange={e => this.changeAuthor(e.target.value)}></input><br></br>
                <div style={styles.leftInput}>Enter description of book:</div><input type="text" onChange={e => this.changeDesc(e.target.value)}></input><br></br>
                <div style={styles.leftInput}>Enter title of book:</div><input type="text" onChange={e => this.changeTitle(e.target.value)}></input><br></br>
                <button onClick={this.post}>Add Book</button>
              </div> : null}
            <Button style={styles.buttonStyle} onClick={this.onClickPut}>PUT</Button>
            {this.state.showPut ?
              <div className="input">
                <div style={styles.leftInput}>Enter ISBN of book:</div><input type="text" onChange={e => this.changeISBN(e.target.value)}></input><br></br>
                <div style={styles.leftInput}>Enter author of book:</div><input type="text" onChange={e => this.changeAuthor(e.target.value)}></input><br></br>
                <div style={styles.leftInput}>Enter description of book:</div><input type="text" onChange={e => this.changeDesc(e.target.value)}></input><br></br>
                <div style={styles.leftInput}>Enter title of book:</div><input type="text" onChange={e => this.changeTitle(e.target.value)}></input><br></br>
                <button onClick={this.put}>Update Book</button>
              </div> : null}
            <Button style={styles.buttonStyle} onClick={this.onClickDelete}>DELETE</Button>
            {this.state.showDelete ?
              <div className="input" >
                Enter ISBN of book:<input type="text" onChange={e => this.changeId(e.target.value)}></input>
                <button onClick={this.delete}>Delete Book</button>
              </div> : null}
          </div>
          <div className="rightBox" style={styles.rightBoxStyle}>
            <h3>Results:</h3>
            <div style={{ backgroundColor: "white" }}>
              {this.state.webResponse ? JSON.stringify(this.state.webResponse, undefined, 4) : "Results will go here."}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  leftBoxStyle: {
    width: "50%",
    marginTop: "50px",
    flex: "left"
  },
  rightBoxStyle: {
    width: "50%",
    whiteSpace: "pre-wrap"
  },
  leftInput: {
    flex: "left"
  },
  rightInput: {
    width: "40%",
    whiteSpace: "pre-wrap"
  },
  buttonStyle: {
    backgroundColor: "#272D2D",
    border: "none",
    color: "white",
    borderRadius: "4px",
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    padding: "15px",
    width: "90%",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    marginTop: "10px"
  }
}


export default App;
