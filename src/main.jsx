import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // the amount of time the data stay fresh... max. time the data stay before re-fetching.(staleTime)!
            staleTime: 60 * 1000
        }
    }
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster 
                position="top-center" //position of the toast
                gutter={12} //space between the toast
                containerStyle={{ //style of the toast container
                    margin: '8px' //margin of the toast container
                }}
                toastOptions={{ // toast options (success, error)
                    success: {
                        duration: 3000, //success toast duration (3s)
                    },
                    error: {
                        duration: 3000, //error toast duration (5s)
                    },
                    style: { //style of the toast
                        fontSize: '16px',
                        maxWidth: '500px',
                        padding: '16px 24px',
                        backgroundColor: '#000',
                        color: '#fff',
                        borderRadius: '4px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }
                }}
            />
        </QueryClientProvider>
    </StrictMode>,
)
