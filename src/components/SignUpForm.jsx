import { useState } from "react";

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        if (password.length !== 8) {
            setPasswordError("Password must be eight characters.");
            return;
        } else {
                setPasswordError(null);
            }
            fetch ("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
            });
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            console.log(result);
            setToken(result.token); // Is there where this belongs?

        } catch (error) {
            setError(error.message);
        }    
    } 
    return (
        <>
        <h2>Sign Up!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:{" "}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}
          </label>
          <button type="submit">Submit</button>
        </form>
      </>
    );
}
