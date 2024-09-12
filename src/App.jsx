import { useState, useEffect, useContext, useRef } from 'react'
import './App.css'
import KoucodeContext from './main'

function App() {
  // useStateは関数の中でしか使えない
  // useStateはレンダリングをトリガーする(引き起こす)
  const [count, setCount] = useState(0) // 0 is the initial value of count
  const koucodeInfo = useContext(KoucodeContext)
  const ref=useRef() //useRefはDOM要素を参照するために使う

  const handleClick = () => {
    setCount(count +1)
  }
  useEffect(() => { //発火タイミングを第2引数の[]に入れることで決めることができる
    console.log('useEffect')
    // ダメな例：setCount(count + 1) //これだと無限ループになる
  }, [count]) //countが変わった時だけ発火する

  const handleRef = () => {
    console.log(ref)
    console.log(ref.current.value)
  }

  return (
    <div className='App'>
      <h1>useState</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>

      <hr />
      <h1>useContext</h1>
      <p>{koucodeInfo.name}</p>
      <p>{koucodeInfo.age}</p>
      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>useRef</button>
    </div>
  )
}

export default App
