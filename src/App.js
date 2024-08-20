import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  const handleAdd = () => {
    const sum = parseInt(num1) + parseInt(num2);
    setResult(sum);
  };

  return (
    <div>
      <h1>Cộng hai số </h1>
      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
      <button onClick={handleAdd}>Tính</button>
      <p>Kết quả phép tính: {result}</p>
    </div>
  );
}

export default App;