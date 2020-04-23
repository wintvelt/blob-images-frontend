import React from 'react'
import Hero from '../src/components-home/Hero'
import LoginForm from '../src/components-login/LoginForm';

const LoginPage = (props) => {
    const { redirect } = props;
    return (
        <main>
            <Hero
                url='/img/cover.jpg'
            >
                <LoginForm redirect={redirect}/>
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