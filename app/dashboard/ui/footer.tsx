import React from 'react'

const Footer = () => {
    return (
        <footer className="footer p-10 flex-shrink footer-center  bg-base-300 text-base-content px-10">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by ReceiptsVault</p>
            </aside>
        </footer>
    )
}

export default Footer