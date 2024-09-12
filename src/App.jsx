import {
	useState,
	useEffect,
	useContext,
	useRef,
	useReducer,
	useMemo,
	useCallback,
} from "react";
import "./App.css";
import KoucodeContext from "./main";
import SomeChild from "./SomeChild";
import useLocalStorage from "./useLocalStorage";

// useReducerの第1引数に渡す関数
const reducer = (state, action) => {
	switch (action.type) {
		case "increment":
			return state + 1;
		case "decrement":
			return state - 1;
		default:
			return state;
	}
};

function App() {
	// useStateは関数の中でしか使えない
	// useStateはレンダリングをトリガーする(引き起こす)
	const [count, setCount] = useState(0); // 0 is the initial value of count
	const koucodeInfo = useContext(KoucodeContext);
	const ref = useRef(); //useRefはDOM要素をref(参照)するために使う
	// useReducerの第1引数にreducer関数、第2引数に初期値を渡す
	const [state, dispatch] = useReducer(reducer, 0); //useReducerは可変のstateを持つために使う

	const handleClick = () => {
		setCount(count + 1);
	};

	useEffect(() => {
		//発火タイミングを第2引数の[]に入れることで決めることができる
		console.log("useEffect");
		// ダメな例：setCount(count + 1) //これだと無限ループになる
	}, [count]); //countが変わった時だけ発火する

	const handleRef = () => {
		console.log(ref);
		console.log(ref.current.value);
	};

	// useMemo
	const [count01, setCount01] = useState(0);
	const [count02, setCount02] = useState(0);
	// count01が変更された時だけsquareを再計算する
	// 後から関数に対してuseMemo(,[])で囲むことで、その関数が再計算されるのを防ぐことができる
	const square = useMemo(() => {
		let i = 0;
		while (i < 200000000) i++;
		return count01 * count01;
	}, [count01]);

	// useCallback 関数のメモ化
	const [counter, setCounter] = useState(0);

	// const showCount = () => {
	// 	alert("これは重い処理です");
	// };
	// 解説不十分！わからん！
	// const showCount = useCallback(() => {
	// 	alert("これは重い処理です");
	// },[counter]);

	// カスタムフック
	//  key: "age", defaultValue: 22
	const [age, setAge]=useLocalStorage("age", 22)

	return (
		<div className="App">
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

			<hr />
			{/* Reactのパフォーマンスを上げるために用いる */}
			<h1>useReducer</h1>
			<p>{state}</p>
			<button onClick={() => dispatch({ type: "increment" })}>+</button>
			<button onClick={() => dispatch({ type: "decrement" })}>-</button>

			<hr />
			<h1>useMemo</h1>
			<div>カウント1: {count01}</div>
			<div>カウント2: {count02}</div>
			<div>結果: {square} </div>
			<button onClick={() => setCount01(count01 + 1)}> +</button>
			<button onClick={() => setCount02(count02 + 1)}>+</button>

			<hr />
			<h1>useCallBack</h1>
			<p>useCallBackはuseMemoと似ているが、関数をメモ化する</p>
			{/* <SomeChild showCount={showCount} />
			<button onClick={() => setCounter(counter + 1)}>＋</button> */}

			<hr />
			<h1>カスタムフック</h1>
			<p>{age}</p>
			<button onClick={()=>setAge(80)}>年齢をセット</button>
		</div>
	);
}

export default App;
