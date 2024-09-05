import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom'
import NavLayout from '../components/NavLayout'
import { useTranslation } from 'react-i18next'
import FloatingButton from '../components/FloatingButton'

const Login = () => {
  const [phone_number, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { t, i18n } = useTranslation();

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://dvlcadigitalkirkos.onrender.com/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('user', JSON.stringify(data));

        setPassword("")
        setPhoneNumber("")
        navigate("/dashboard")
        // Redirect to another page, for example, the dashboard
        // window.location.href = '/dashboard';
      } else {
        setError(data.detail || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <NavLayout>
      <FloatingButton/>
      <div className="flex  flex-col justify-center items-center px-6 pt-12 pb-72 lg:px-8 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="mx-auto" src={logo} alt="Company Logo"></img> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">ወደ መለያዎ ይግቡ</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900">ስልክ ቁጥር</label>
              <div className="mt-2">
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">የይለፍ ቃል
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                disabled={loading}
              >
                {loading ? 'በመግባት ላይ ።።።።።' : 'ይግቡ'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </NavLayout>

  )
}

export default Login
