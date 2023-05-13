import React, { useState, useEffect } from 'react'
import {Row, Col, Form, Button, InputGroup} from 'react-bootstrap'
import ModalPostcode from './ModalPostcode'
import {app} from '../firebaseInit'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'


const MyPage = ({ history }) => {
    const uid =sessionStorage.getItem("uid");
    const [loading, setLoading] = useState(false);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const[image, setImage] = useState('https://via.placeholder.com/200x200')
    const [file, setFile] = useState(null);

    const [form, setForm] = useState({
        name:'이소영',
        address: '인천 서구 마전동',
        phone: '010-1010-1010',
        photo: '',
    });

    const  {name, address, phone, photo} = form;
    const onChangeFile = (e) => {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
    
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const getUser = async() => {
        setLoading(true)
        const user=await getDoc(doc(db,'user',uid));
        console.log(user.data());
        setForm(user.data());
        setLoading(false);
    }
    const onUpdate =() =>{
        if(!window.confirm('수정된 내용을 저장하실래요?')) return;
        setDoc(doc(db,'user',uid),form)
    }

    useEffect(()=>{
        getUser();

    },[]);

    if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
    return (
        <Row className='my-5'>
            <Col>
                <h1 className='text-center mb-5'>회원정보</h1>
                <Form className='px-3'>
                     <InputGroup className='my-2'>
                        <InputGroup.Text className='px-5'>메일</InputGroup.Text>
                        <Form.Control value={sessionStorage.getItem('email')}
                            name="name" onChange={onChange}/>
                    </InputGroup>
                    <InputGroup className='my-2'>
                        <InputGroup.Text className='px-5'>성 명</InputGroup.Text>
                        <Form.Control value={name}
                            name="name" onChange={onChange}/>
                    </InputGroup>
                    <Row>
                            <InputGroup className='my-2'>
                                <InputGroup.Text className='px-5'>주 소</InputGroup.Text>
                                <Form.Control value={address}
                                    name="address" onChange={onChange}/>
                            </InputGroup>
                    </Row>
                    <InputGroup className='my-2'>
                        <InputGroup.Text className='px-5'>전 화</InputGroup.Text>
                        <Form.Control value={phone}
                            name="phone" onChange={onChange}/>
                    </InputGroup>
                    <div>
                        <img className='my-2' 
                            src={image} width="20%"/>
                        <Form.Control onChange={onChangeFile}
                            type="file"/>
                    </div>
                    <div className='text-center my-3'>
                        <Button onClick={onUpdate}
                            className='px-5'>정보저장</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
export default MyPage