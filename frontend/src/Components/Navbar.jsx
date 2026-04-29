import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate('/')
    const handleLogout = async() => {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            navigate('/')
    }
    return (
        <nav className='h-30 w-full bg-[#000] flex text-white'>
            <div className='h-30 w-100  flex items-center justify-center'>
                <h1 className='poppins-thin text-4xl'>Gestão de faxina</h1>
            </div>
            <div className='h-30 w-300  flex items-center justify-center'>
                <ul className='flex gap-10'>
                    <li>
                        <Link to='/privateRoute/home' className='hover:text-4xl transition-all duration-300 text-xl '>Página inicial</Link>
                    </li>
                    <li>
                        <Link to='/privateRoute/cadastrosAgendamentos' className='hover:text-4xl transition-all duration-300 text-xl '>Registrar agendamento</Link>
                    </li>
                    <li>
                        <Link to='/privateRoute/gestaoAgendamento' className='hover:text-4xl transition-all duration-300 text-xl '>Gestão de agendamentos</Link>
                    </li>
                </ul>
            </div>
           
            <div className='w-50 h-30   flex items-center justify-center'>
                <button className='border p-2 rounded bg-red-500 border-red-500 cursor-pointer hover:scale-110 transition duration-300 ease-in-out' onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
