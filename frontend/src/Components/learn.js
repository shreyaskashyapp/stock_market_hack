import react from 'react'
import '../css/learn.css';



export default function Learn() {
  return (
    <div>
    <div>
        <h1>What is the Stock Market</h1>
      </div>
      <div className="videos">
        <button onClick={()=>window.location = '/sec_intro'} className='intro'> Intro to Stock Market</button>
        <iframe width="310" height="200" src="https://www.youtube.com/embed/p7HKvqRI_Bo" title="YouTube video player" allowFullScreen></iframe>
        <iframe width="310" height="200" src="https://www.youtube.com/embed/aRlWle9smww" title="YouTube video player" allowFullScreen></iframe>
        <button onClick={()=>window.location = '/sec_learn'} className='quizbutt'> Take A Quiz</button>
      </div>

      <div>
        <h1>SMA Stratergy</h1>
      </div>
      <div className="videos">
        <button onClick={()=>window.location = '/sma_intro'} className='intro'> Intro to SMA Stratergy</button>
        <button onClick={()=>window.location = '/sma_learn'} className='learner'> Learn SMA Stratergy</button>
        <iframe width="310" height="200" src="https://www.youtube.com/embed/r3Ulu0jZCJI" title="YouTube video player" allowFullScreen></iframe>
        <button onClick={()=>window.location = '/sma_quiz'} className='quizbutt'> Take A Quiz</button>
      </div>

      

    </div>

  )
}