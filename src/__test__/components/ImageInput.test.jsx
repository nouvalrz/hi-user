import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageInput from '../../components/ImageInput';

describe('ImageInput Component', () => {
  const defaultProps = {
    label: 'Profile Image',
    name: 'profile-image',
    onChange: jest.fn(),
    value: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.URL.createObjectURL = jest.fn(() => 'mock-url');
  });

  afterEach(() => {
    window.URL.createObjectURL.mockReset();
  });

  it('renders label when provided', () => {
    render(<ImageInput {...defaultProps} />);
    
    expect(screen.getByText('Profile Image')).toBeInTheDocument();
    expect(screen.getByText('Profile Image')).toHaveAttribute('for');
  });

  it('does not render label when not provided', () => {
    render(<ImageInput {...defaultProps} label={null} />);
    
    const label = screen.queryByText('Profile Image');
    expect(label).not.toBeInTheDocument();
  });

  it('renders upload placeholder when no image is selected', () => {
    render(<ImageInput {...defaultProps} />);
    
    expect(screen.getByText('Upload image')).toBeInTheDocument();
  });

  it('renders image preview when value is provided', () => {
    render(<ImageInput {...defaultProps} value="https://example.com/image.jpg" />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders error message when provided', () => {
    const errorMessage = 'Please upload an image';
    render(<ImageInput {...defaultProps} errorMessage={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-600');
  });

  it('does not render error message when not provided', () => {
    render(<ImageInput {...defaultProps} />);
    
    const errorMessage = screen.queryByText(/error/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('calls onChange when file is selected', () => {
    render(<ImageInput {...defaultProps} />);
    
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByRole('button');
    
    fireEvent.click(input);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('renders with correct container styling', () => {
    render(<ImageInput {...defaultProps} />);
    
    const container = screen.getByTestId('image-input-container');
    expect(container).toHaveClass('w-36');
    expect(container).toHaveClass('h-36');
    expect(container).toHaveClass('object-cover');
    expect(container).toHaveClass('overflow-clip');
    expect(container).toHaveClass('bg-gray-100');
    expect(container).toHaveClass('border-gray-300');
    expect(container).toHaveClass('border-2');
    expect(container).toHaveClass('rounded-full');
    expect(container).toHaveClass('border-dashed');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('cursor-pointer');
    expect(container).toHaveClass('mt-4');
  });

  it('renders label with correct styling', () => {
    render(<ImageInput {...defaultProps} />);
    
    const label = screen.getByText('Profile Image');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('text-gray-600');
  });

  it('renders upload text with correct styling', () => {
    render(<ImageInput {...defaultProps} />);
    
    const uploadText = screen.getByText('Upload image');
    expect(uploadText).toHaveClass('text-xs');
  });

  it('renders image preview with correct styling', () => {
    render(<ImageInput {...defaultProps} value="https://example.com/image.jpg" />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveClass('w-36');
    expect(image).toHaveClass('h-36');
    expect(image).toHaveClass('object-cover');
  });
}); 