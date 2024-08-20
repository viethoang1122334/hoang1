import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function App() {
  const [name, setName] = useState('');
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumber1Change = (e) => {
    setNumber1(Number(e.target.value));
  };

  const handleNumber2Change = (e) => {
    setNumber2(Number(e.target.value));
  };

  const handleSubmit = async () => {
    // Đọc file Excel template từ thư mục 'calculator'
    const response = await fetch('congso.xlsx');
    const arrayBuffer = await response.arrayBuffer();

    // Tải workbook từ file template
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Chọn sheet đầu tiên trong workbook
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Chuyển đổi sheet thành JSON để thêm dữ liệu mới
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Thêm dữ liệu mới
    data.push({ Ten: name, So1: number1, So2: number2, Tong: number1 + number2 });

    // Chuyển đổi dữ liệu trở lại worksheet
    const newWorksheet = XLSX.utils.json_to_sheet(data);

    // Thay thế worksheet cũ trong workbook bằng worksheet mới
    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

    // Xuất workbook thành file Excel
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    saveAs(blob, 'updated_congso.xlsx');
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>App nhập thông tin</h2>
      <input 
        type="text" 
        value={name} 
        onChange={handleNameChange} 
        placeholder="Điền tên của bạn" 
      />
      <br />
      <input 
        type="number" 
        value={number1} 
        onChange={handleNumber1Change} 
        placeholder="Điền số đầu tiên" 
      />
      <br />
      <input 
        type="number" 
        value={number2} 
        onChange={handleNumber2Change} 
        placeholder="Điền số thứ hai" 
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Submit
      </button>
    </div>
  );
}

export default App;
