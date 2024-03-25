import {WalletOptions} from './wallet-options'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub,faTelegram } from '@fortawesome/free-brands-svg-icons'
const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white">
      <div className='flex items-center justify-center '>
      <div className="text-2xl font-semibold text-gray-900 font-mono">
        quickCall
      </div>
      <a href="https://github.com/passer-byzhang/quickcall" target="_blank" rel="noopener noreferrer" className='ml-2'>
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a href="https://t.me/AlvanZhang" target="_blank" rel="noopener noreferrer" className='ml-2'>
        <FontAwesomeIcon icon={faTelegram} />
      </a>
      </div>  

      <div className="flex items-center">
        <WalletOptions/>
      </div>
    </header>
  );
};

export default Header;