import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../../../pages/LandingPage';

jest.mock('../../../components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer Component</div>;
  };
});

jest.mock('../../../components/LandingPage/Features', () => {
  return function MockFeatures() {
    return <div data-testid="features">Features Component</div>;
  };
});

jest.mock('../../../components/LandingPage/Jumbotron', () => {
  return function MockJumbotron() {
    return <div data-testid="jumbotron">Jumbotron Component</div>;
  };
});

jest.mock('../../../components/LandingPage/LandingPageNavbar', () => {
  return function MockLandingPageNavbar() {
    return <div data-testid="navbar">LandingPageNavbar Component</div>;
  };
});

jest.mock('../../../components/LandingPage/Pricing', () => {
  return function MockPricing() {
    return <div data-testid="pricing">Pricing Component</div>;
  };
});

describe('LandingPage Component', () => {
  it('renders all required components', () => {
    render(<LandingPage />);
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('jumbotron')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('pricing')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders components in correct order', () => {
    render(<LandingPage />);
    
    const container = screen.getByTestId('navbar').parentElement;
    const children = Array.from(container.children);
    
    expect(children[0]).toHaveAttribute('data-testid', 'navbar');
    expect(children[1]).toHaveAttribute('data-testid', 'jumbotron');
    expect(children[2]).toHaveAttribute('data-testid', 'features');
    expect(children[3]).toHaveAttribute('data-testid', 'pricing');
    expect(children[4]).toHaveAttribute('data-testid', 'footer');
  });

  it('renders within a div container', () => {
    render(<LandingPage />);
    
    const container = screen.getByTestId('navbar').parentElement;
    expect(container.tagName).toBe('DIV');
  });
}); 