import {WalletOptions} from './wallet-options'
const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white">
      <div className="flex items-center justify-center text-2xl font-semibold text-gray-900">
        quickCall
      </div>
      <div className="flex items-center">
        <WalletOptions/>
      </div>
    </header>
  );
};

export default Header;