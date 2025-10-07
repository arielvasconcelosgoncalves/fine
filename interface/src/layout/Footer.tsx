

const Footer = () => {

    const currentYear = new Date().getFullYear();


    return(
        <footer className="bg-gray-800 border-t border-gray-700 py-4">
            <div className="container-app">
                <p className="text-sm text-gray-400 text-center">DevBills {currentYear} - Desenvolvido por <strong>Ariel Vasconcelos</strong> com{" "}
                <strong>Typescript</strong> & <strong>React</strong></p>
            </div>
        </footer>
    )
}

export default Footer;