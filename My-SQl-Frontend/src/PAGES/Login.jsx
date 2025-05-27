import { useState } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../API/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const HandleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginAPI({ email, password });
            if (response.message) {
                alert(response.message);
                navigate('/');
            } else {
                setError('Login failed. Check credentials');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login error');
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4 text-center">Admin Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={HandleFormSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
