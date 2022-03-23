import React from 'react'
import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        comfirmation: '',
    })
    const { name, email, password, comfirmation } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    )
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
    const onChnage = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== comfirmation) {
            toast.error('Password do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please Create a Account</p>
            </section>
            <section className="Form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name here"
                            onChange={onChnage}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email here"
                            onChange={onChnage}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password here"
                            onChange={onChnage}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="comfirmation"
                            name="comfirmation"
                            value={comfirmation}
                            placeholder="Comfirm your password again"
                            onChange={onChnage}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
