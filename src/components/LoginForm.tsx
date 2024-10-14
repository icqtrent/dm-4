"use client";

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PageWrapper } from './PageWrapper';
import GoogleIcon from './GoogleIcon';
import { useAuth } from '@/context/AuthContext';
import { LoginType } from '@/types/AuthTypes';
import { ChevronRight } from 'lucide-react';



const LoginForm = () => {
	const [data, setData] = useState<LoginType>({
		email: '',
		password: '',
	});
	const { signUp, logIn, loginWithGoogle, loginAnonymously } = useAuth();
	// Use the signIn method from the AuthContext
	
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const errorMessages: { [key: string]: string } = {
		'auth/popup-closed-by-user': 'La ventana de inicio de sesión se cerró antes de completar el proceso. Por favor, inténtalo de nuevo.',
		'auth/network-request-failed': 'Error de red. Por favor, verifica tu conexión a Internet e inténtalo de nuevo.',
		'auth/invalid-credential': 'Correo electrónico o contraseña incorrectos.',
		'auth/user-disabled': 'El usuario está deshabilitado.',
		'auth/user-not-found': 'Correo electrónico no registrado.',
		'auth/wrong-password': 'Contraseña incorrecta.',
		'auth/too-many-requests': 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.',
	  };

	const handleLogin = async (e: any) => {
		e.preventDefault();
		try {
			await logIn(data.email, data.password);
			router.push('/');
			setError(null)
		} catch (error: any) {
			console.log(error.message);
			const customErrorMessage = errorMessages[error.code] || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
			setError(customErrorMessage);
		}
	};

	// Destructure data from the data object
	const { ...allData } = data;

	// Disable submit button until all fields are filled in
	const canSubmit = [...Object.values(allData)].every(Boolean);

	const handleGoogleSignin = async () => {
		try {
			//throw new Error("google error")
			await loginWithGoogle();
			console.log(loginWithGoogle);
			router.push('/');
		} catch (error: any) {
			setError(error.message);
		}
	};


	return (
		<PageWrapper>
			<div className="flex justify-center items-center">
				<div className="w-full max-w-sm p-4 py-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 sm:py-10 md:p-8 md:py-14 dark:bg-gray-800 dark:border-gray-700">
					<form action="" onSubmit={handleLogin} className="group">
						<h5 className="text-2xl sm:text-3xl font-medium sm:font-semibold text-gray-900 dark:text-white text-center mb-2">
							Login
						</h5>
						<p className="text-center text-gray-500 dark:text-gray-200 text-md mb-8">
							Please enter your login credentials to login to the
							dashboard.
						</p>
						<div className="mb-5">
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Your email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
								autoComplete="off"
								required
								pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
								placeholder="name@company.com"
								onChange={(e: any) => {
									setData({
										...data,
										email: e.target.value,
									});
								}}
							/>
							<span className="mt-1 hidden text-sm text-red-400">
								Please enter a valid email address.{' '}
							</span>
						</div>
						<div className="mb-5">
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Your password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
								pattern=".{8,}"
								required
								onChange={(e: any) => {
									setData({
										...data,
										password: e.target.value,
									});
								}}
							/>
							<span className="mt-1 hidden text-sm text-red-400">
								Password must be at least 8 characters.{' '}
							</span>
						</div>

						<button
							type="submit"
							disabled={!canSubmit}
							className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mb-8 mt-2 disabled:bg-gradient-to-br disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed group-invalid:bg-gradient-to-br group-invalid:from-gray-100 group-invalid:to-gray-300 group-invalid:text-gray-400 group-invalid:pointer-events-none group-invalid:opacity-70"
						>
							Login to your account
						</button>
						<div className='pb-2'>
						{error && <p className="mt-4 text-red-500">{error}</p>}
						</div>
						<hr className="p-4" />

						<div className="mb-5">
							<button
								onClick={handleGoogleSignin}
								className="flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-4 w-full py-2.5 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
  						>
								<GoogleIcon />
								<span>Continue con Google</span>
							</button>
						</div>
						
						<div className="text-md font-medium text-gray-500 dark:text-gray-300 flex text-center justify-center items-center">
							<NextLink
								href="/register"
								className="text-gray-500 hover:text-gray-800 hover:underline dark:text-gray-200 dark:hover:text-white flex justify-between items-center w-20"
							>
								Register <ChevronRight className="text-lg" />
							</NextLink>
						</div>
						
					</form>
				</div>
			</div>
		</PageWrapper>
	);
};

export default LoginForm;
