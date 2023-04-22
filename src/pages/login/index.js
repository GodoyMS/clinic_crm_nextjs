import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, userLogin, userLogout } from '@/features/auth/authActions'
import { use, useEffect, useState } from 'react'
import { logout } from '@/features/auth/authSlice'
import { useGetUserInfoQuery } from '@/service/authService'
import { useLoginQuery } from '@/service/loginService'
import { setCredentials } from '@/features/auth/authSlice'

const Login = () => {
  {/**
  const { loading, authorization, error } = useSelector((state) => state.auth)
  const dispatch=useDispatch();
  const router = useRouter()
  const { register, handleSubmit } = useForm()


  const submitForm =  (data) => {
     dispatch(userLogin(data));
  }

  useEffect(() => {
    if (authorization) {
      //
    }
  }, [authorization])

   */}
   const { loading, authorization, error } = useSelector((state) => state.auth)


   console.log(authorization)




  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const submitForm =  (formData) => {    
     dispatch(userLogin(formData))
    // await login(data).unwrap();
  }



  if(authorization){
    router.push('/dashboard')
  }

 

  const Dispatchlogout=()=>{
    dispatch(userLogout())
  }



  return (
    <>
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <div>{error}</div>}
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
      <button type='submit' className='button' disabled={loading}>
        {loading ? 'Cargando' : 'Login'}
      </button>
    </form>
    <button onClick={Dispatchlogout}>
      Logout

    </button>
    
  

    
    </>
  )
}

export default Login
