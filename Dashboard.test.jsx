import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  it('should render the main heading', () => {
    // Arrange: Render the component
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Act & Assert: Check if the heading is in the document
    expect(screen.getByRole('heading', { name: /Your Learning Journey/i })).toBeInTheDocument();
  });
});