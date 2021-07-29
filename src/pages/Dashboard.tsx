import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Container, Flex, Input } from "../components/Utils";
import IUser from "../Models/User";
import UserService from "../Services/User";
import { useHistory } from "react-router-dom";

const Spacing = styled.div`
  padding: 10px;
`;

const Header = styled.header`
  background-color: #2980b9;
`;

const Title = styled.h1`
  color: #fff;
`;

const Label = styled.label`
  margin-right: 10px;
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

const ButtonSubmit = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #27ae60;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ManagementContainer = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const THead = styled.thead``;

const TBody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid #c2c2c2;
`;

const Td = styled.td<{ textAlign?: string }>`
  padding: 15px 7px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
`;

const UserManagement = () => {
  const history = useHistory();

  const [visibleBoxAddUser, setVisibleBoxAddUser] = useState(false);

  const { register, handleSubmit } = useForm<IUser>();

  const [users, setUsers] = useState<IUser[]>([]);

  const [idsChecked, setIdsChecked] = useState<any>([]);

  const [checkedAll, setCheckedAll] = useState(false);

  const selectUser = (id: number, check: boolean) => {
    users.map((user) => {
      if (user.id === id) {
        user.selected = check;
      }
    });

    setUsers([...users]);
  };

  const checkId = (checked: boolean, id: number) => {
    if (checked) {
      idsChecked.indexOf(id) < 0 && idsChecked.push(id);
      selectUser(id, true);
    } else {
      idsChecked.splice(idsChecked.indexOf(id), 1);
      selectUser(id, false);
    }

    setIdsChecked(idsChecked);
  };

  const checkAll = (e: boolean) => {
    setCheckedAll(true);
    users.map((user) => {
      user.selected !== e && checkId(!user.selected, user.id);
    });
  };

  const getUsers = () => {
    UserService.getAll().then((response) => {
      const users = response.data;
      users.map((user: IUser) => {
        user.selected = false;
        return user;
      });
      setUsers(users);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUsers = () => {
    const newIdsChecked = idsChecked.map((id: number) => {
      return {
        id,
      };
    });
    UserService.delete(newIdsChecked).then((response) => {
      if (response.status === "success") {
        getUsers();
      }
    });

    setCheckedAll(false);
  };

  const storeUser: SubmitHandler<IUser> = (data) => {
    UserService.store(data).then((response) => {
      if (response.status === "success") {
        getUsers();
      }
    });
    
  };

  return (
    <Container>
      <Header>
        <Spacing>
          <Flex justifyContent="space-between">
            <Title>Gestão de usuários</Title>
            <div>
              <ButtonDelete onClick={() => deleteUsers()}>Deletar</ButtonDelete>
              <ButtonAdd
                onClick={() => setVisibleBoxAddUser(!visibleBoxAddUser)}
              >
                Adicionar usuário
              </ButtonAdd>
            </div>
          </Flex>
        </Spacing>
      </Header>

      {visibleBoxAddUser && (
        <Container padding="10px 30px">
          <form onSubmit={handleSubmit(storeUser)}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex>
                <Label>Nome:</Label>
                <Input type="text" {...register("name", { required: true })} />
              </Flex>
              <Flex>
                <Label>Email:</Label>
                <Input type="text" {...register("email", { required: true })} />
              </Flex>
              <Flex>
                <Label>Telefone:</Label>
                <Input type="text" {...register("phone", { required: true })} />
              </Flex>
              <Flex>
                <Label>Senha:</Label>
                <Input
                  type="text"
                  {...register("password", { required: true })}
                />
              </Flex>
              <ButtonSubmit>+</ButtonSubmit>
            </Flex>
          </form>
        </Container>
      )}

      <ManagementContainer>
        <Table>
          <THead>
            <Tr>
              <Td>
                <Input
                  type="checkbox"
                  checked={checkedAll}
                  onChange={(e) => checkAll(e.target.checked)}
                />
              </Td>
              <Td>Nome</Td>
              <Td>Email</Td>
              <Td>Endereço</Td>
              <Td>Telefone</Td>
              <Td textAlign="center" colSpan={2}>
                Ações
              </Td>
            </Tr>
          </THead>
          <TBody>
            {users &&
              users.map((user: IUser) => {
                return (
                  <Tr key={user.id}>
                    <Td>
                      <Input
                        type="checkbox"
                        checked={user.selected}
                        onChange={(e) => checkId(e.target.checked, user.id)}
                      />
                    </Td>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phone}</Td>
                    <Td textAlign="center">
                      <Button onClick={() => history.push(`/users/`)}>
                        Editar
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button>Remover</Button>
                    </Td>
                  </Tr>
                );
              })}
          </TBody>
        </Table>
      </ManagementContainer>
    </Container>
  );
};

export default UserManagement;
