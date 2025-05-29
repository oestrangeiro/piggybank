import PiggyBankIcon from '../assets/piggy-bank-fill.svg?react';
import { Link } from 'react-router-dom';
import '../index.css';


export default function Header() {
    return (
        <header>
            <nav className='navbar navbar-expand-lg top-navbar'>
                <div className="container-fluid ps-5">
                    <Link to='/' className="navbar-brand">
                        <PiggyBankIcon style={{ fill: 'var(--piggy-icon-color)', width: '40px', height: '40px' }} />
                        PiggyBank
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" >
                        <ul className='navbar-nav'>
                             <li className='nav-item'>
                                <Link to='/campanhas' className='nav-link'>Campanhas</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/divulgue' className='nav-link'>Divulgue conosco</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/' className='nav-link'>Notícias</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/' className='nav-link'>Sobre nós</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/suporte' className='nav-link'>Suporte</Link>
                            </li>
                        </ul>
                    </div>
                    {/* perfil */}
                </div>
            </nav>
        </header>
        
    )
}