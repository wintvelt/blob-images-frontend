const preventDefault = e => e.preventDefault();

const TermsLink = () => {
    return <Link href='/termsandconditions' color='primary'
        onClick={preventDefault} target='_blank' rel='noopener noreferrer'>
        algemene voorwaarden
</Link>
}

export default TermsLink;