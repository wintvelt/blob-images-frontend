import React from 'react'
import Hero from '../src/components-home/Hero'
import SignupVerify from '../src/components-login/SignupVerify';

const VerifySignup = (props) => {
    return (
        <main>
            <Hero
                url='/img/cover.jpg'
            >
                <SignupVerify {...props}/>
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

export default VerifySignup