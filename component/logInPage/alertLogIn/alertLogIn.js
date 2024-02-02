import { useEffect, useState } from 'react';


import { useBetween } from 'use-between';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LogIn from '../login';
import '../../css/bootstrap.css'
import './alertLogIn.css'



const AlertLogIn = () => {

    const state = useSelector((state) => state.data);
    const { alertLogIn, setAlertLogIn, goToLogIn, setGoToLogIn, setContinueWithLogIn } = useBetween(state.useShareState);

    useEffect(() => {
        setAlertLogIn(false)
    }, [])

    return (
        <>

            <Modal show={alertLogIn} onHide={() => setAlertLogIn(false)} size='lg' className='Model'>

                <Modal.Body>
                    <LogIn props={'-1'} />
                </Modal.Body>
                <Modal.Footer dir="auto">
                    {!goToLogIn && <Button variant="primary" className="btn btn-calendar-modal-save"
                        onClick={() => setGoToLogIn(true)}
                    >
                        LogIn
                    </Button>
                    }
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={() => { setAlertLogIn(false); setGoToLogIn(false); setContinueWithLogIn(true) }}  >
                        Continue Without LogIn
                    </Button>

                </Modal.Footer>
            </Modal>


        </>



    );
}

export default AlertLogIn;
