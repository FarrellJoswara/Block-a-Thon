"use client";

const LoginButton = () => {
return (
    <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded "
        onClick={() => alert("Login button clicked")}
    >
        Login
    </button>
)
}
export default LoginButton;