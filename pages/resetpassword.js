import React from 'react'
import Hero from '../src/components-home/Hero'
import ForgotPasswordForm from '../src/components-login/ForgotPassword';

const ForgotPassword = (props) => {
    return (
        <main>
            <Hero
                url='/img/cover.jpg'
            >
                <ForgotPasswordForm {...props}/>
            </Hero>
        </main>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    const { code, email } = query;
    return {
        props: {
            code: code || null,
            email: email || null
        }
    }
}

export default ForgotPassword;