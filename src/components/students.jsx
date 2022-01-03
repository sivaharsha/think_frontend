import React, { useEffect,useState } from "react";
import { Table, td,tr,thead,tbody,Container,Row,Button,Col,Modal,Form} from 'react-bootstrap';
import axios from 'axios'


function Students(){

    const [data,setData] = useState([])
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [photo,setPhoto] = useState('')
    const [degree,setDegree] = useState('')
    const [show,setShow] =useState(false)

    


    useEffect(() => {
        axios.get('http://localhost:3001/students')
        .then(response=>setData(response.data))
        .catch(e=> console.log('error'))
    }, [])

    function showModal(){
       setShow(true)
    }
     const closeModal = () =>setShow(false)

     function submit(){
        const allData = {
            name,
            email,
            phone,
            photo,
            degree
        }
        axios.post('http://localhost:3001/students',allData).then((val)=>{
            setData([...data,val.data])
            setShow(false)
        })
    }

    return (
        <div>
            <Container>
                <Row className="mt-3">
                <Col xs={6}> <Button variant="secondary" onClick={showModal}>Add</Button></Col>
                    <Table striped bordered hover className="mt-3" >
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Photo</th>
                        <th>Degree</th>
                        </tr>
                    </thead>
                    <tbody>
                    { data.map((item, i) => {
                        return (
                        <tr>
                        <td>{++i}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.photo}</td>
                        <td>{item.degree}</td>
                        </tr>
                    )
                }) }
                    </tbody>
                    </Table> 
                </Row>
            </Container>


            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="John" onChange={(e)=>setName(e.target.value)} />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your phone number" onChange={(e)=>setPhone(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control type="text" placeholder="Photo url" onChange={(e)=>setPhoto(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Degree</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your degree name" onChange={(e)=>setDegree(e.target.value)} />
                                </Form.Group>
                            </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={submit}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}

export default Students 
