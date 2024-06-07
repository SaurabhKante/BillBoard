import React from 'react'

function Home(props) {

  return (
    <main className='main-container'>
        <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {props.title}
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" >{props.item1}</a></li>
    <li><a className="dropdown-item" >{props.item2}</a></li>
    <li><a className="dropdown-item" >{props.item3}</a></li>
  </ul>
</div>
    </main>
  )
}

export default Home