import React from 'react'
import styles from './Card.module.css'

export default function Card(props) {

  // RENDER HTML STRING TO A REACT COMPONENT
  function Description(){
    const text = props.jobDescription
    return <p dangerouslySetInnerHTML={{__html:text}} />
  }

  return (
    <li className={styles.card}>
        <div className={styles.titleColumn}>
            <h3>{props.jobTitle}</h3>
            <label>{props.companyName}</label>
        </div>
        <article className={styles.cardDescription}>
            <Description/>
        </article>
    </li>
  )
}
