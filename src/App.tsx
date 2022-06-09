import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`hello ${value}`);
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} type="text" placeholder='username'></input>
        <button>Login</button>
      </form>
    </>
  );
}

export default App;
