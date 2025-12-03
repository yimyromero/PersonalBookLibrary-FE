import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link, useLocation  } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    if (isLoading) return <p>Loading...</p>

    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value)

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername('');
            setPassword('');

            const redirectTo = location.state?.from?.pathname || '/dash';
            navigate(redirectTo);
            
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            //errRef.current.focus();
        }
    }
    const canSave = [username, password].every(Boolean);
    
    const content = (
        <section className="flex justify-center items-center flex-col h-screen overflow-scroll py-10">
            <header><h1 className="text-2xl text-center font-bold text-slate-800">Sign in</h1></header>
            <main className="flex items-center justify-center flex-col w-full max-w-md mx-auto">
                <div className="absolute bg-yellow-100">
                    <p ref={errRef} className="text-red-500" aria-live="assertive">{errMsg}</p>
                </div>
                <form className="flex flex-col px-3 pt-7 bg-white w-full" onSubmit={handleSubmit}>
                    <label className="text-gray-600 text-sm font-bold pb-1" htmlFor="username">Username:</label>
                    <input
                        className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                        placeholder="username"
                    />
                    <label className="text-gray-600 text-sm font-bold pb-1" htmlFor="password">Password:</label>
                    <input
                        className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePwdInput}
                        autoComplete="off"
                        required
                        placeholder="password"
                    />
                    <div className="mt-4">
                        <button className="flex w-full justify-center gap-2 items-center text-white py-2 px-4 bg-red-400 hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" title="Save" disabled={!canSave}>
                                Sign In
                        </button>
                    </div>
                    <div className="pt-7">
                        <p className="text-center text-gray-600">Don't have an account?</p>
                    </div>
                    <div className="mt-4">
                        <button className="flex w-full text-gray-800 justify-center gap-2 items-center outline-gray-600 outline-2 -outline-offset-2 py-2 px-4 bg-white hover:bg-gray-600 hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" title="Create account">
                                Create Account
                        </button>
                    </div>
                </form>
            </main>
            <footer className="flex items-center gap-2 mt-10 text-gray-600 hover:text-gray-800">
                <ArrowLeftIcon className="size-5" /> <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )
    return content;
}

export default Login;