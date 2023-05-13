import React, { useState } from 'react'
import { Row, Col, Form, InputGroup, Card, Button } from 'react-bootstrap'
import { app } from '../firebaseInit'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth' //파이어 베이스 인증 함수들이 들어있음
import{Link} from 'react-router-dom'
const LoginPage = ({history}) => {
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const [ form, setForm ] = useState({
        email: 'test@inha.com',
        password: '12341234'
    });
    const { email, password } = form;
    const onChange =(e)=> {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    const onLogin =() => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then(success=>{
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('uid',success.user.uid);
            setLoading(false);
            history.push('/') //로그인 되면 루트 페이지로 이동 (히스토리 객체 이용)
        })
        .catch(error=>{
            alert('로그인 실패 :' + error.message);
            setLoading(false);
        });
    }
    if(loading) return<h1 className='text-center my-5'>로딩중입니다...</h1>
    return (
        <Row className='justify-content-center my-5'>
            <Col md={5}>
                <h1 className='text-center'>로그인</h1>
                <Card className='p-3'>
                    <Form>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>E-mail</InputGroup.Text>
                            <Form.Control value={email}
                                onChange={onChange}name='email'/>
                        </InputGroup>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>Password</InputGroup.Text>
                            <Form.Control value={password} type ="password"
                                onChange={onChange}name='password'/>
                        </InputGroup>
                        <Button
                            onClick={onLogin}
                            className='w-100'>로그인</Button>
                        <div className='text-center my-5'>
                        <Link to= "/Join">회원가입</Link>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage