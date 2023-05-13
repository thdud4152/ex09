import React, { useState } from 'react'
import { Col, Row, Card, Button, Form, InputGroup} from 'react-bootstrap'
import {app} from '../firebaseInit'
import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { getFirestore,doc,setDoc } from 'firebase/firestore'

const JoinPage = ({history}) => {
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [form, setForm] = useState({
        email:'test2@inha.com',
        password: '12341234'
    });

    const {email, password} = form; //할당할때 중괄호 
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const onClickJoin = () => {
        if (!window.confirm('회원으로 등록 하시겠습니까?')) return;
        if (email === '' || password === '') {
            alert('아이디 또는 비밀번호를 입력하세요.');
        } else {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then(async success => {
                    console.log('success....', success);
                    const uid = success.user.uid;
                    await setDoc(doc(db, 'user' ,uid), {
                        email: email,
                        name: '홍길동',
                        address: '인천 부평구 삼산동',
                        phone: '010-6768-1111',
                        photo: ''
                    });

                    setLoading(false);
                    history.push('/login'); //회원가입 후 로그인창으로 이동
                })
                .catch(error=>{
                    setLoading(false);
                    alert('로그인 실패:' + error.message);
                });
            }

        }

    if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
    return (
        <Row className='my-5 justify-content-center'>
            <Col lg={5} xs={8}>
                <h1 className='text-center mb-5'>회원가입</h1>
                <Card className='p-3'>
                    <Form>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>아 이 디</InputGroup.Text>
                            <Form.Control name="email" onChange={onChange}
                                value={email}/>
                        </InputGroup>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>비밀번호</InputGroup.Text>
                            <Form.Control name="password" onChange={onChange}
                                value={password} type="password"/>
                        </InputGroup>
                        <div className='text-center my-3'>
                            <Button onClick={onClickJoin}
                                className='w-100'>회원가입</Button>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default JoinPage