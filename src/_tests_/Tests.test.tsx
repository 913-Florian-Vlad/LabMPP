/// <reference types="jest" />
/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { expect, test, vi, vitest ,describe,beforeEach} from 'vitest';
import axios from 'axios';
import Home from "../components/home";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import  '@testing-library/jest-dom/vitest'; // Import the toBeInTheDocument function
import { BrowserRouter } from 'react-router-dom';
import Create from "../components/create";
import Edit from '../components/edit';
import Games from '../components/Games';
import array from '../components/array';

const MocktestHome =()=>{
  return(
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  )
}

const MocktestCreate =()=>{
  return (
    <BrowserRouter>
      <Create/>
    </BrowserRouter>
  )
}

const MocktestEdit =()=>{
  return (
    <BrowserRouter>
      <Edit/>
    </BrowserRouter>
  )
}


const mockedData = [
  {
    id: '1',
    name: 'Game 1',
    release_date: '2022-01-01',
    genre: 'Action',
  },
  // Add more mocked data as needed
];

vi.mock('axios'); // Mock axios module

describe('Home Component', () => {
  beforeEach(() => {
    (axios.get as any).mockResolvedValue({ data: mockedData }); // Type casting for clarity
    render(<MocktestHome />);
  });

  test('renders table with data', async () => {
   
    const nameCell = await screen.findByText('The Elder Scrolls V: Skyrim');
    expect(nameCell).toBeInTheDocument();
  });
  test('clicking delete button calls Delete function', async () => {
    const deleteButton = await screen.findAllByText('Delete');
    fireEvent.click(deleteButton[0]);
    
  });
  
});

describe("Create Component",()=>{
  test('renders form fields properly', () => {
    const { getByLabelText } = render(<MocktestCreate />);
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Release Date')).toBeInTheDocument();
    expect(getByLabelText('Genre')).toBeInTheDocument();
    expect(getByLabelText('Size')).toBeInTheDocument();
  });

  test('handles input changes properly', () => {
    const { getByLabelText } = render(<MocktestCreate />);
    const nameInput = getByLabelText('Name');
    const releaseInput = getByLabelText('Release Date');
    const genreInput = getByLabelText('Genre');
    const sizeInput = getByLabelText('Size');

    fireEvent.change(nameInput, { target: { value: 'Test Game' } });
    fireEvent.change(releaseInput, { target: { value: '2024-03-21' } });
    fireEvent.change(genreInput, { target: { value: 'Action' } });
    fireEvent.change(sizeInput, { target: { value: 1 } });

    expect(nameInput).toHaveValue('Test Game');
    expect(releaseInput).toHaveValue('2024-03-21');
    expect(genreInput).toHaveValue('Action');
    expect(sizeInput).toHaveValue(1);
  });

  test('submits form correctly', () => {
    const mockNavigate = vi.fn();
    const {getByLabelText,getAllByText } = render(<MocktestCreate />);
    const nameInput = getByLabelText('Name');
    const releaseInput = getByLabelText('Release Date');
    const genreInput = getByLabelText('Genre');
    const createButton = getAllByText('Create');
    const sizeInput = getByLabelText('Size');

    fireEvent.change(nameInput, { target: { value: 'Test Game' } });
    fireEvent.change(releaseInput, { target: { value: '2024-03-21' } });
    fireEvent.change(genreInput, { target: { value: 'Action' } });
    fireEvent.change(sizeInput, { target: { value: 1 } });
    fireEvent.click(createButton[0]);

  });

});

describe("Games Class",()=>{
  test('Games setters and getters work correctly', () => {
    const game = new Games("Test Game","Action", "2024-03-21",1, "1");
    expect(game.getGameName()).toBe('Test Game');
    expect(game.getGameReleaseDate()).toBe('2024-03-21');
    expect(game.getGameGenre()).toBe('Action');
    expect(game.getGameId()).toBe('1');
    expect(game.getGameSize()).toBe(1);

    game.setGameName('New Game');
    game.setGameReleaseDate('2025-03-21');
    game.setGameGenre('Adventure');
    game.setGameId('2');
    game.setGameSize(2);

    expect(game.getGameName()).toBe('New Game');
    expect(game.getGameReleaseDate()).toBe('2025-03-21');
    expect(game.getGameGenre()).toBe('Adventure');
    expect(game.getGameSize()).toBe(2);
    expect(game.getGameId()).toBe('2');

  });
});

describe("Edit Component",()=>{
   const array = [new Games("1", "Test Game", "2024-03-21", 1,"Action")];
    test('renders form fields properly', () => {
      const { getByLabelText } = render(<MocktestEdit />);
      expect(getByLabelText('Name')).toBeInTheDocument();
      expect(getByLabelText('Release Date')).toBeInTheDocument();
      expect(getByLabelText('Genre')).toBeInTheDocument();
      expect(getByLabelText('Size')).toBeInTheDocument();
    });
  
    test('handles input changes properly', () => {
      const { getByLabelText } = render(<MocktestEdit />);
      const nameInput = getByLabelText('Name');
      const releaseInput = getByLabelText('Release Date');
      const genreInput = getByLabelText('Genre');
      const sizeInput = getByLabelText('Size');
  
      fireEvent.change(nameInput, { target: { value: 'Test Game' } });
      fireEvent.change(releaseInput, { target: { value: '2024-03-21' } });
      fireEvent.change(genreInput, { target: { value: 'Action' } });
      fireEvent.change(sizeInput, { target: { value: 1 } });
  
      expect(nameInput).toHaveValue('Test Game');
      expect(releaseInput).toHaveValue('2024-03-21');
      expect(genreInput).toHaveValue('Action');
      expect(sizeInput).toHaveValue(1);
    });
  
    test('submits form correctly', () => {
      const mockNavigate = vi.fn();
      const {getByLabelText,getAllByText } = render(<MocktestEdit />);
      const nameInput = getByLabelText('Name');
      const releaseInput = getByLabelText('Release Date');
      const genreInput = getByLabelText('Genre');
      const updateButton = getAllByText('Update');
      const sizeInput = getByLabelText('Size');
  
      fireEvent.change(nameInput, { target: { value: 'Test Game' } });
      fireEvent.change(releaseInput, { target: { value: '2024-03-21' } });
      fireEvent.change(genreInput, { target: { value: 'Action' } });
      fireEvent.change(sizeInput, { target: { value: 1 } });
      fireEvent.click(updateButton[0]);
  
    });
});