import React, { useState } from 'react';
import { InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Searchbar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // marginLeft: 0,
    width: '40%',
    height: '1.8rem',
    backgroundColor: '#E8E2E2',
    [theme.breakpoints.up('xs')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center'
    // justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
        marginTop: '-0.25rem',
        [theme.breakpoints.up('xs')]: {
            width: '0.1ch',
            '&:focus': {
                width: '16ch'
            }
        }
    }
}));

const Search = ({ searchChange }) => {
    const [expanded, setExpanded] = useState(false);

    const handleSearchClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Searchbar>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    onClick={handleSearchClick}
                    onChange={searchChange}
                    // style={{ fontSize: '10px' }}
                />
            </Searchbar>
        </>
    );
};
export default Search;
