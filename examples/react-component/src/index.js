import styles from './styles.css'
import React from 'react'

class HelloWorld extends React.Component {

  render () {
    return (
      <div className={styles.component}>
        <header role="banner">
          <h1>React component example</h1>
        </header>
        <p className={styles.text}>This is a <em>simple</em> <a href="http://facebook.github.io/react/">React.js</a> example.</p>
        <p className={styles.text}>This build only generates <code>CSS</code> and <code>JavaScript</code>.</p>
      </div>
    )
  }
}

// export default HelloWorld
React.render(<HelloWorld/>, document.body)
