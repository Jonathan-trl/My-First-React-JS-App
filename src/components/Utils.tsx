import styled from 'styled-components';

export const Container = styled.div<{ padding?: string }>`
    padding: ${props => props.padding ? props.padding : 0};
`;

export const Flex = styled.div<{ justifyContent?: string, alignItems?: string, flexWrap?: string }>`
    display: flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : "flex-start"};
    align-items: ${props => props.alignItems ? props.alignItems : "center"};
    flex-wrap: ${props => props.flexWrap ? props.flexWrap : "wrap"};
`;

export const Input = styled.input`
    
`;