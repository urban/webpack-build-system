import styles from './styles.css'
import React from 'react'

export default class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = { count: 0 }
  }

  render () {
    const {count} = this.state
    return (
      <div className={styles.component}>
        <header role="banner">
          <h1>Assets Only Example</h1>
        </header>
        <p>This is a <em>simple</em> example that uses <a href="http://facebook.github.io/react/">React.js</a> and only generates <code>CSS</code> and <code>JavaScript</code>.</p>
        <div className={styles.counter}>
          <h2>Clicked {this.state.count} times.</h2>
          <button onClick={this.handleClick}>Click me!</button>
        </div>
      </div>
    )
  }

  handleClick = (event) => {
    event.preventDefault()
    this.setState({ count: this.state.count + 1 })
  }
}

if (typeof document !== 'undefined') {
  React.render(<App/>, document.querySelector('#content'))
}
