import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '@/features/auth/authActions'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
export default function RegisterComponent(){
  const [customError, setCustomError] = useState(null)

  const { register, handleSubmit } = useForm()
  const router=useRouter()
  const dispatch = useDispatch()


  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )


    useEffect(() => {
        // redirect authenticated user to profile screen
        if (userInfo) router.push('/dashboard')
        // redirect user to login page if registration was successful
        if (success) router.push('/login')
      }, [router, userInfo, success])

      const submitForm = (data) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
          setCustomError('Password mismatch')
          return
        }
        // transform email string to lowercase to avoid case sensitivity issues in login
        data.email = data.email.toLowerCase()
    
        dispatch(registerUser(data))
      }



    return (
      <form onSubmit={handleSubmit(submitForm)}>
      {error && <div>{error}</div>}
      {customError && <div>{customError}</div>}
      <div className='form-group'>
        <label htmlFor='username'>First Name</label>
        <input
          type='text'
          className='form-input'
          {...register('username')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className='form-input'
          {...register('email')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-input'
          {...register('password')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Confirm Password</label>
        <input
          type='password'
          className='form-input'
          {...register('confirmPassword')}
          required
        />
      </div>
      <button type='submit' className='button' disabled={loading}>
        {loading ? 'Cargando' : 'Register'}
      </button>
    </form>)
}