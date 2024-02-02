import { useEffect, useState } from 'react';
import './login.css';
import './alertLogIn/alertLogIn.css'
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import { useBetween } from 'use-between';
import { useSelector } from 'react-redux';
import axios from "axios";




const LogIn = () => {

    const state = useSelector((state) => state.data);

    const { alertLogIn, goToLogIn, userInfo, setuserInfo, userList, setUserList, setAlertLogIn, setUserLogIn,
        userConfirm, setUserConfirm, setCurrentUserId } = useBetween(state.useShareState);

    const [LogInOrRigester, setLogInOrRigester] = useState(true);
    const [err, setErr] = useState(false);
    const [err1, setErr1] = useState(false);


    const [success, setSuccess] = useState(false);

    const switchCard = () => {
        setErr(false)
        setErr1(false)

        setuserInfo((lastValue) => {
            return {
                ...lastValue,

                userName: "",
                userPhone: "",
                userPassword: "",
                userConfirmPassword: "",
            }
        });

        setLogInOrRigester(!LogInOrRigester)
    }




    const inputUserInfo = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setErr(false)
        setErr1(false)

        setuserInfo((lastValue) => {
            return {
                ...lastValue,
                [name]: value,
                _id: userList.length
            }
        });

    }
    // const goToRegister = () => {

    //     setLogIn(false)
    // }
    // const gotoLogIn = () => {
    //     setLogIn(true)
    // }
    // const showTheAlert = () => {
    //     setSuccess(true)
    // }


    const navigate = useNavigate();
    const ConfirmLogIn = () => {
        setErr(false)
        setErr1(false)


        const filteredProducts = userList.filter((item) => {
            const phone = item.userPhone;
            return phone == userInfo.userPhone;
        })

        setUserConfirm(filteredProducts);


        if ((filteredProducts.length != 0 && userInfo.userPassword == filteredProducts[0].userPassword)) {

            setUserLogIn(true)
            setAlertLogIn(false)

            userList.length ? userList.map((item, i) => {

                if (item._id == filteredProducts[0]._id) {
                    setCurrentUserId(i);

                }

            }) : <p></p>


        }
        else
            setErr(true)

    }

    const creatAccount = () => {
        setErr(false)
        setErr1(false)

        const filteredProducts = userList.filter((item) => {
            const phone = item.userPhone;
            return phone == userInfo.userPhone;
        })

        setUserConfirm(filteredProducts);
        // Use regex to check if the string contains a number
        const regex = /\d/;
        const hasNumber = regex.test(userInfo.userPassword);

        // Use regex to check if the string contains any character (non-numeric)

        const regex1 = /[a-zA-Z]/;
        const hasCharacter = regex1.test(userInfo.userPassword);
        const hasCharacter1 = regex1.test(userInfo.userPhone)



        if (userInfo.userPhone.length != 10 || userInfo.userPhone[0] != '0' || userInfo.userPhone[1] != '5' || hasCharacter1 == true
            || userInfo.userPassword != userInfo.userConfirmPassword || userInfo.userPassword.length < 8 || hasNumber == false || hasCharacter == false) {

            setErr(true)

        }

        else if (userConfirm.length != 0) {
            setErr1(true)
        }
        else {
            setErr(false);
            setErr1(false)
            setSuccess(true)
            setTimeout(function () { setSuccess(false); }, 3000);

            setUserList([...userList, userInfo]);
            const headers = {

                "content-type": "application/json;charset=UTF-8"
            };
            axios.post("http://localhost:5000/users", {data:userInfo} , { headers }).then(() => {


                console.log('success')

            }).catch((err) => {
                console.log(err)

            })

            setuserInfo((lastValue) => {
                return {
                    ...lastValue,

                    userName: "",
                    userPhone: "",
                    userPassword: "",
                    userConfirmPassword: "",
                }
            });



        }
    }


    // useEffect(() => {
    //     new WOW.WOW({
    //         live: false
    //     }).init();
    // }, [])
    
    useEffect(() => {

        const UsersData = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/users', {
                    responseType: 'json' // Ensure binary data is handled correctly

                })
   
                setUserList(data.data)
      

            }
            catch (error) {
                console.log(error)
            }

        }
       UsersData();


    }, [userList.length ])

    return (
        <>
            <div className='LogIn'>

                {LogInOrRigester && <div className='loginTitle'>Log <span>In</span></div>}
                {!LogInOrRigester && <div className='loginTitle'>Sign <span>Up</span></div>}

                {goToLogIn && LogInOrRigester && <p>Please use the information you entered when creating the account</p>}
                {goToLogIn && !LogInOrRigester && <p>  Please use this data while logging in </p>}

                <br />

                {err && <div className='err'>* Wrong entry</div>}
                {err1 && <div className='err'>* You have an account registered with the same number, you must enter another one</div>}



                {alertLogIn && !goToLogIn && <ul className='Benifit'>

                    <h3>Benefits of log in:</h3>
                    <li>Save all your Orders and have the ability to review them</li>
                    <li>Tracking your current order</li>
                    <li>Offers when you buy more than three times</li>
                </ul>
                }
                {goToLogIn && <div class="container">
                    {LogInOrRigester &&
                        <div class="card">

                            <form>
                                <label for="username">Phone Number</label>
                                <input type="text" id="phone" placeholder="05XXXXXXXX" name='userPhone' value={userInfo.userPhone} onChange={inputUserInfo} />

                                <label for="password">Password</label>
                                <input type="password" id="password" placeholder="Enter your password" name='userPassword' value={userInfo.userPassword} onChange={inputUserInfo} />

                                <div className='btn btn-calendar-modal-save' onClick={ConfirmLogIn}> LogIn</div>
                            </form>
                            <div class="switch">Don't have an account? <a onClick={switchCard}>Register here</a></div>
                        </div>
                    }
                    {LogInOrRigester == false &&
                        <div class="card" >
                            {success && <div class="main-container">
                                <div class="check-container">
                                    <div class="check-background">
                                        <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div class="check-shadow"></div>
                                </div>
                            </div>
                            }
                            <form>
                                <label for="fullname">Full Name</label>
                                <input type="text" id="fullname" placeholder="Enter your full name" name='userName' value={userInfo.userName} onChange={inputUserInfo} />

                                <label for="username">Phone Number</label>
                                <input type="text" id="phone" placeholder="05XXXXXXXX" name='userPhone' value={userInfo.userPhone} onChange={inputUserInfo} />

                                <label for="password">Password <span>(at least eight letters and numbers) </span></label>
                                <input type="password" id="password" placeholder="Enter your password" name='userPassword' value={userInfo.userPassword} onChange={inputUserInfo} />


                                <label for="new-password">Confirm Password</label>
                                <input type="password" id="new-password" placeholder="Confirm your new password" name='userConfirmPassword' value={userInfo.userConfirmPassword} onChange={inputUserInfo} />

                                <div className='btn btn-calendar-modal-save' onClick={creatAccount}>SignUp</div>
                            </form>
                            <div class="switch">Already have an account? <a onClick={switchCard}>Login here</a></div>
                        </div>
                    }
                </div>
                }
            </div>


        </>



    );
}

export default LogIn;
