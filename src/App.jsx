import { useCallback, useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$&_!+";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="bg-black h-[90vh] w-[100vh] mt-[20px] rounded-[12px]">
        <div>
          <h1 className="mt-[10px] text-white">Password Generator</h1>
        </div>
        <div>
          <input
            className="h-[50px] w-[360px] rounded-[8px] ml-[-50px] mt-[8px] text-black bg-white px-2"
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 h-[50px] ml-1.5 px-4 rounded"
          >
            Copy
          </button>
        </div>
        <div className="flex ml-[210px] items-center">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(parseInt(e.target.value));
            }}
            className="mr-[10px] mt-3"
          />
          <h5 className="mt-[7px] ml-[10px] text-orange-600">
            Length: {length}
          </h5>
          <div className="flex items-center ml-[20px]">
            <input
              type="checkbox"
              checked={numAllowed}
              id="inputNum"
              onChange={() => setNumAllowed((prev) => !prev)}
              className="mt-[8px]"
            />
            <label
              className="text-orange-600 mt-[8px] ml-[5px]"
              htmlFor="inputNum"
            >
              Numbers
            </label>
          </div>
          <div className="flex items-center ml-[20px]">
            <input
              type="checkbox"
              checked={charAllowed}
              id="inputChar"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="mt-[8px]"
            />
            <label
              className="text-orange-600 mt-[8px] ml-[5px]"
              htmlFor="inputChar"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;