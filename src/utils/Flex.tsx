import styled from 'styled-components';

export const Flex = styled.div<{justifyContent?: string, alignItems?: string, flexWrap?: string}>`
    display: flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : "flex-start"};
    align-items: ${props => props.alignItems ? props.alignItems : "center"};
    flex-wrap: ${props => props.flexWrap ? props.flexWrap : "wrap"};
`;