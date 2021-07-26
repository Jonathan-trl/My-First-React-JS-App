import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Flex } from '../../utils/Flex';

interface IUser {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    selected: boolean;
}

const Container = styled.div`
    padding: 10px;
`;

const Header = styled.header`
    background-color: #2980b9;
`;

const Title = styled.h1`
    color: #fff;
`;

const Button = styled.button`
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 10px 15px;
`;

const ButtonAdd = styled(Button)`
    background-color: #27ae60;
    color: #fff;
`;

const ButtonDelete = styled(Button)`
    background-color: #c0392b;
    margin-right: 15px;
    color: #fff;
`;

const ManagementContainer = styled.div`
    padding: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const THead = styled.thead`
`;

const TBody = styled.tbody`
`;

const Tr = styled.tr`
    border-bottom: 1px solid #c2c2c2;
`;

const Td = styled.td<{ textAlign?: string }>`
    padding: 15px 7px;
    text-align: ${props => props.textAlign ? props.textAlign : "left"};
`;

const InputCheckbox = styled.input`
    border-radius: 100%;
`;

const UserManagement = () => {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {

        const newUsers = [
            {
                id: 1,
                name: "Jonathan",
                email: "jonathan.carvalho1807@gmail.com",
                address: "Lorena",
                phone: "(12) 99131-3223",
                selected: false
            },
            {
                id: 2,
                name: "Matheus",
                email: "matheus@gmail.com",
                address: "Lorena",
                phone: "(12) 99153-4231",
                selected: false
            },
            {
                id: 3,
                name: "André",
                email: "andre@gmail.com",
                address: "Guaratingueta",
                phone: "(12) 99163-6432",
                selected: false
            },
            {
                id: 4,
                name: "Guido",
                email: "guido@gmail.com",
                address: "Canas",
                phone: "(12) 99134-2314",
                selected: false
            },
            {
                id: 5,
                name: "Sandra",
                email: "sandra@gmail.com",
                address: "Lorena",
                phone: "(12) 99153-3426",
                selected: false
            }
        ];

        setUsers(newUsers);

    }, []);


    const [idsChecked, setIdsChecked] = useState<number[]>([]);

    const selectUser = (id: number, check: boolean) => {
        users.map(user => {
            if (user.id == id) {
                user.selected = check;
            }
        });

        setUsers([...users])
    }

    const checkId = (checked: boolean, id: number) => {
        if (checked) {
            idsChecked.indexOf(id) < 0 &&
                idsChecked.push(id);
                selectUser(id, true);
        }
        else {
            idsChecked.splice(idsChecked.indexOf(id), 1);
            selectUser(id, false);
        }

        setIdsChecked(idsChecked);
    }

    const checkAll = (e: boolean) => {
        users.map(user => {
            user.selected !== e && checkId(!user.selected, user.id);
        });
    }

    return (
        <>
            <Header>
                <Container>
                    <Flex justifyContent="space-between">
                        <Title>Gestão de usuários</Title>
                        <div>
                            <ButtonDelete>
                                Deletar
                            </ButtonDelete>
                            <ButtonAdd>Adicionar usuário</ButtonAdd>
                        </div>
                    </Flex>
                </Container>
            </Header>
            <ManagementContainer>
                <Table>
                    <THead>
                        <Tr>
                            <Td>
                                <InputCheckbox type="checkbox" onChange={e => checkAll(e.target.checked)} />
                            </Td>
                            <Td>Nome</Td>
                            <Td>Email</Td>
                            <Td>Endereço</Td>
                            <Td>Telefone</Td>
                            <Td textAlign="center" colSpan={2}>Ações</Td>
                        </Tr>
                    </THead>
                    <TBody>
                        {
                            users && users.map((user: IUser) => {
                                return (
                                    <Tr key={user.id}>
                                        <Td>
                                            <InputCheckbox
                                                type="checkbox"
                                                checked={user.selected}
                                                onChange={e => checkId(e.target.checked, user.id)}
                                            />
                                        </Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.address}</Td>
                                        <Td>{user.phone}</Td>
                                        <Td textAlign="center">
                                            <Button>Editar</Button>
                                        </Td>
                                        <Td textAlign="center">
                                            <Button>Remover</Button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </TBody>
                </Table>
            </ManagementContainer>
        </>
    )
}

export default UserManagement;