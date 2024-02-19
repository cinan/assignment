import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

it('renders initial screen', () => {
  render(<QueryClientProvider client={queryClient}>
    <App /></QueryClientProvider>);
  const header = screen.getByText(/Currency converter/i);
  expect(header).toBeInTheDocument();
});
