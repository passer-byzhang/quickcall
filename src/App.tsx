import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './utils/web3'
import  Header from './components/Header'
import {LaunchApp} from './components/launchApp'

const queryClient = new QueryClient()



function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <Header /> 
        <LaunchApp/>
      </QueryClientProvider> 
    </WagmiProvider>
  )
}
export default App
