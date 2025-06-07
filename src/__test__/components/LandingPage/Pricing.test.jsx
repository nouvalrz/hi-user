import React from 'react';
import { render, screen } from '@testing-library/react';
import Pricing from '@/components/LandingPage/Pricing';

describe('Pricing Component', () => {
  it('renders the pricing section with correct heading and description', () => {
    render(<Pricing />);
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Here are our packages')).toBeInTheDocument();
  });

  it('renders all three pricing plans', () => {
    render(<Pricing />);
    expect(screen.getByText('Basic Plan – $29/month')).toBeInTheDocument();
    expect(screen.getByText('Perfect for individuals or small teams just getting started.')).toBeInTheDocument();
    expect(screen.getByText('Pro Plan – $79/month')).toBeInTheDocument();
    expect(screen.getByText('Ideal for growing teams that need collaboration features.')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Plan – $199/month')).toBeInTheDocument();
    expect(screen.getByText('Designed for large teams with advanced security and customization needs.')).toBeInTheDocument();
  });

  it('renders all features for Basic Plan', () => {
    render(<Pricing />);
    const basicPlanFeatures = [
      'Core biodata management',
      'Up to 500 entries',
      'Single user access',
      'Standard email support',
      'Weekly backups'
    ];
    basicPlanFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders all features for Pro Plan', () => {
    render(<Pricing />);
    const proPlanFeatures = [
      'Everything in Basic',
      'Up to 5,000 entries',
      'Up to 5 user accounts',
      'Real-time team collaboration',
      'Priority email support',
      'Daily backups'
    ];
    proPlanFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders all features for Enterprise Plan', () => {
    render(<Pricing />);
    const enterprisePlanFeatures = [
      'Everything in Pro',
      'Unlimited entries',
      'Unlimited users',
      'Custom role & permission settings',
      'Audit logs and advanced analytics',
      'Dedicated account manager',
      '24/7 support and SLA guarantee'
    ];
    enterprisePlanFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('applies correct styling classes', () => {
    render(<Pricing />);
    const container = screen.getByText('Pricing').closest('div').parentElement;
    expect(container).toHaveClass(
      'container',
      'mx-auto',
      'px-4'
    );
    const pricingSection = screen.getByText('Pricing').closest('div');
    expect(pricingSection).toHaveClass(
      'bg-sky-600',
      'px-6',
      'md:px-8',
      'lg:px-10',
      'rounded-lg',
      'py-12',
      'mb-12'
    );
    const cardsContainer = screen.getByText('Basic Plan – $29/month').closest('div').parentElement;
    expect(cardsContainer).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'gap-8',
      'w-full',
      'max-w-[1000px]',
      'mx-auto',
      'mt-12'
    );
    const pricingCard = screen.getByText('Basic Plan – $29/month').closest('div');
    expect(pricingCard).toHaveClass(
      'rounded-lg',
      'bg-white',
      'p-5',
      'flex',
      'flex-col',
      'items-center',
      'hover:scale-105',
      'transition'
    );
  });
}); 