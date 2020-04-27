import React from 'react';
import Hero from '../src/components-home/Hero';
import Toolbar from '@material-ui/core/Toolbar';
import LoginForm from '../src/components-login/LoginForm';

const LoginPage = (props) => {
    const { redirect } = props;
    return (
        <main>
            <Hero
                url='/img/cover.jpg'
            >
                <Toolbar />
                <div style={{
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <LoginForm redirect={redirect} />
                </div>
            </Hero>
        </main>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    const { redirect } = query;
    return {
        props: {
            redirect: redirect || null,
        }
    }
}

export default LoginPage