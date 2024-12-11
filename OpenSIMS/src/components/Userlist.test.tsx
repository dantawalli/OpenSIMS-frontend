import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Userlist from '../components/Userlist'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';


const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  const wrapper = ({
    children } : { children: React.ReactNode }) => (
      <QueryClientProvider client = {
        queryClient}>{children}
      </QueryClientProvider>);
  
describe("Userlist tests", () => {
  test("component renders", () => {
    render(<Userlist />, { wrapper });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
})

    test("Users are fetched", async () => {
        render(<Userlist />, { wrapper });
        await waitFor(() => screen.getByText(/New User/i));
        expect(screen.getByText(/aishanasirahmad@gmail.com/i)).toBeInTheDocument();
      })

    test("Open new user modal", async () => {
        render(<Userlist />, { wrapper });
        await waitFor(() => screen.getByText(/New User/i));
        await userEvent.click(screen.getByText(/New User/i));
        expect(screen.getByText(/Save/i)).toBeInTheDocument();
      })
});
