import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
  } from "@apollo/client";


import Home from "../pages/home";
import List from "../pages/List"; 
import Detail from "../pages/Detail";
import App from "../App";
import MyList from "../pages/MyList";

afterEach(() => {
    cleanup();
});
test('home page should render', () => {
    
    render(
    <Router>
        <Home />
    </Router>
    );
    const element = screen.getByTestId('show-home-page');
    expect(element).toBeInTheDocument();
})

test('list page with apollo should render', () => {
    const client = new ApolloClient({
        uri: 'https://beta.pokeapi.co/graphql/v1beta',
        cache: new InMemoryCache()
    });
    render(
    <ApolloProvider client={client}>
        <List />
    </ApolloProvider>
    );
    const element = screen.getByTestId('show-list-page');
    expect(element).toBeInTheDocument();
})

test('detail page with apollo should render', () => {
    const client = new ApolloClient({
        uri: 'https://beta.pokeapi.co/graphql/v1beta',
        cache: new InMemoryCache()
    });
    render(
    <ApolloProvider client={client}>
        <Detail />
    </ApolloProvider>
    );
    const element = screen.getByTestId('show-detail-page');
    expect(element).toBeInTheDocument();
})

test('mylist page with apollo should render', () => {
    render(<MyList />);
    const element = screen.getByTestId('show-mylist-page');
    expect(element).toBeInTheDocument();
})

test('all page should render', () => {
    const client = new ApolloClient({
        uri: 'https://beta.pokeapi.co/graphql/v1beta',
        cache: new InMemoryCache()
    });
    render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
    );
    const element = screen.getByTestId('show-entire-page');
    expect(element).toBeInTheDocument();
})
