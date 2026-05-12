import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:3000";

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await fetch(`${BACKEND_URL}/api/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    navigate("/signin");
  }
  return (
    <div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-6">
        <div className="text-center text-cyan-700 font-mono font-semibold text-2xl mb-4">Signup Here</div>
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        <div className="text-sm text-black text-center mt-4 font-thin">
          Already have an account? <span className="text-blue-800 cursor-pointer" onClick={() => navigate('/signin')}>Sign in </span>
        </div>
        <div className="flex justify-center pt-4 font-mono">
          <Button
            onClick={signup}
            variant="primary"
            text="Signup"
          />
        </div>
        <div className="text-sm text-black text-center mt-4 font-thin">
          Want to go back ? <span className="text-blue-800 cursor-pointer" onClick={() => navigate('/')}>Home Page</span>
        </div>
      </div>
    </div>
  );
}